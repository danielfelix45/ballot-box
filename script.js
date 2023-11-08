// Seleção de elementos
const seuVotoPara = document.querySelector('.d-1-1 span');
const cargo = document.querySelector('.d-1-2 span');
const descricao = document.querySelector('.d-1-4');
const aviso = document.querySelector('.d-2');
const lateral = document.querySelector('.d-1-right');
const numeros = document.querySelector('.d-1-3');

// Variáveis
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

// Função para iniciar a etapa
function comecarEtapa() {
    const etapa = etapas[etapaAtual];
    
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }
    
    seuVotoPara.style.display = 'none';
    cargo.textContent = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

// Função para atualizar a interface
function atualizaInterface() {
    const etapa = etapas[etapaAtual];
    const candidato = etapa.candidatos.find(item => item.numero === numero);

    if (candidato) {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        let fotosHtml = '';

        for (const foto of candidato.fotos) {
            const classe = foto.small ? 'small' : '';
            fotosHtml += `<div class="d-1-image ${classe}"><img src="images/${foto.url}" alt="" />${foto.legenda}</div>`;
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

// Função para tratar o clique nos números
function clicou(n) {
    const elNumero = document.querySelector('.numero.pisca');

    if (elNumero) {
        elNumero.textContent = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        const proximoNumero = elNumero.nextElementSibling;

        if (proximoNumero) {
            proximoNumero.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

// Função para votar em branco
function branco() {
    numero = '';
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}

// Função para corrigir o voto
function corrige() {
    comecarEtapa();
}

// Função para confirmar o voto
function confirma() {
    const etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco) {
        votoConfirmado = true;
        votos.push({ etapa: etapa.titulo, voto: 'branco' });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({ etapa: etapa.titulo, voto: numero });
    }

    if (votoConfirmado) {
        etapaAtual++;

        if (etapas[etapaAtual]) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

// Iniciar a primeira etapa
comecarEtapa();
