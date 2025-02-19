// Lista de músicas
let musicas = [
    { titulo: 'Sangue Latino', artista: 'Kalana', src: 'musicas/musica1.mp3', img: 'imagens/img1.jpg' },
    { titulo: 'Beauty And A Beat', artista: 'Cat', src: 'musicas/musica2.mp3', img: 'imagens/img2.jpg' },
    { titulo: 'CHIHIRO', artista: 'Ana Carolina', src: 'musicas/musica3.mp3', img: 'imagens/img3.jpg' },
    { titulo: 'Jardim da Fantasia', artista: 'Marinna', src: 'musicas/musica4.mp3', img: 'imagens/img4.jpg' },
    { titulo: 'Via Láctea', artista: 'Aninha', src: 'musicas/musica5.mp3', img: 'imagens/img5.jpg' },
    { titulo: 'Delicate', artista: 'Rosana', src: 'musicas/musica6.mp3', img: 'imagens/img6.jpg' },
    { titulo: 'Viva La Vida', artista: 'Rosana', src: 'musicas/musica7.mp3', img: 'imagens/img7.jpg' },
    { titulo: 'Save Your Tears', artista: 'Rosana', src: 'musicas/musica8.mp3', img: 'imagens/img8.jpg' },
    { titulo: 'BIRDS OF A FEATHER', artista: 'Bia', src: 'musicas/musica9.mp3', img: 'imagens/img9.jpg' },
    { titulo: 'When We Were Young', artista: 'Bia', src: 'musicas/musica10.mp3', img: 'imagens/img10.jpg' },
    { titulo: 'Tudo', artista: 'Marinna', src: 'musicas/musica11.mp3', img: 'imagens/img11.jpg' },
    { titulo: 'Sorriso de Pérola', artista: 'Marinna', src: 'musicas/musica12.mp3', img: 'imagens/img12.jpg' },
    { titulo: 'Ter o coração no chão', artista: 'Marinna', src: 'musicas/musica13.mp3', img: 'imagens/img13.jpg' },
    { titulo: 'Garganta', artista: 'Veruska', src: 'musicas/musica14.mp3', img: 'imagens/img14.jpg' },
    { titulo: 'Quando A Chuva Passar', artista: 'Márcia', src: 'musicas/musica15.mp3', img: 'imagens/img15.jpg' },
    { titulo: 'Se... ', artista: 'Cukis', src: 'musicas/musica16.mp3', img: 'imagens/img16.jpg' },
    { titulo: 'Quem tem um amigo (tem tudo)', artista: 'Vini', src: 'musicas/musica17.mp3', img: 'imagens/img17.jpg' }
];

// Seleção de elementos do DOM
let musica = document.querySelector('audio');
let barraProgresso = document.querySelector('#barraProgresso');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let duracaoMusica = document.querySelector('.fim');

// Variáveis de controle
let indexMusica = 0;
let primeiraMusica = true;

// Função para renderizar a música atual
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

        if (primeiraMusica) {
            musica.currentTime = 0;
            pausarMusica();
            primeiraMusica = false;
        } else {
            tocarMusica();
        }
    });
}

// Funções de controle de reprodução
function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

// Função para atualizar a barra de progresso
function atualizarBarra() {
    barraProgresso.value = (musica.currentTime / musica.duration) * 100;
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

// Função para converter segundos em minutos
function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }
    return campoMinutos + ':' + campoSegundos;
}

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica = (indexMusica - 1 + musicas.length) % musicas.length;
    renderizarMusica(indexMusica);
});
document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica = (indexMusica + 1) % musicas.length;
    renderizarMusica(indexMusica);
});

// Barra de progresso
musica.addEventListener('timeupdate', atualizarBarra);
barraProgresso.addEventListener('input', () => {
    let tempoSelecionado = (barraProgresso.value / 100) * musica.duration;
    musica.currentTime = tempoSelecionado;
});

// Inicialização
renderizarMusica(indexMusica);