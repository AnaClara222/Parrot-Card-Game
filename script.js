const imagens = [
    'bobrossparrot.gif', 'bobrossparrot.gif',
    'explodyparrot.gif', 'explodyparrot.gif',
    'fiestaparrot.gif', 'fiestaparrot.gif',
    'metalparrot.gif', 'metalparrot.gif',
    'revertitparrot.gif', 'revertitparrot.gif',
    'tripletsparrot.gif', 'tripletsparrot.gif',
    'unicornparrot.gif', 'unicornparrot.gif'
];



let cartasEscolhidas = [], jogadas = 0, paresCombinados = 0, numPares;

function embaralhar() { 
    return Math.random() - 0.5; 
}

function iniciarJogo() {
    let numCartas;
    do {
        numCartas = parseInt(prompt("Com quantas cartas deseja jogar? (4 a 14, apenas pares)"));
    } while (isNaN(numCartas) || numCartas < 4 || numCartas > 14 || numCartas % 2 !== 0);

    numPares = numCartas / 2;
    const tabuleiro = document.getElementById('tabuleiro-jogo');
    tabuleiro.innerHTML = '';

    const imagensSelecionadas = imagens.slice(0, numCartas).sort(embaralhar);

    imagensSelecionadas.forEach(imagem => {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.innerHTML = `
            <div class="face face-frente">
                <div class="conteudo-carta">
                    <img src="./imagens/back.png" alt="Frente da carta" />
                </div>
            </div>
            <div class="face face-verso">
                <div class="conteudo-carta">
                    <img src="./imagens/${imagem}" alt="Papagaio" />
                </div>
            </div>
        `;

        carta.addEventListener('click', () => virarCarta(carta, imagem));
        tabuleiro.appendChild(carta);
        
        
    });
}

function virarCarta(carta, imagem) {
    if (carta.classList.contains('virada') || cartasEscolhidas.length === 2) return;

    carta.classList.add('virada');
    jogadas++;
    cartasEscolhidas.push({ carta, imagem });

    if (cartasEscolhidas.length === 2) {
        if (cartasEscolhidas[0].imagem === cartasEscolhidas[1].imagem) {
            paresCombinados++;
            cartasEscolhidas = [];
            if (paresCombinados === numPares) {
                setTimeout(() => alert(`Você ganhou em ${jogadas} jogadas!`), 500);
            }
        } else {
            setTimeout(() => {
                cartasEscolhidas.forEach(item => item.carta.classList.remove('virada'));
                cartasEscolhidas = [];
            }, 1000);
        }
    }
}

document.addEventListener('DOMContentLoaded', iniciarJogo);
