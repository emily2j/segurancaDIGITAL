/*
INTEGRANTES:
manuella schueda ferst 26
emily kuginharski gomes 12
TURMA: 3ª Série J
*/




const campoSenha = document.querySelector("#campo-senha");
const botaoGerar = document.querySelector("#botao-gerar");
const botaoMenos = document.querySelector("#botao-menos");
const botaoMais = document.querySelector("#botao-mais");
const textoQuantidade = document.querySelector(".parametro-senha__texto");

const checkboxMaiusculo = document.querySelector("#maiusculo");
const checkboxMinusculo = document.querySelector("#minusculo");
const checkboxNumero = document.querySelector("#numero");
const checkboxSimbolo = document.querySelector("#simbolo");

let quantidadeCaracteres = 12;

const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%" + "&*?"; // Dividido para evitar problemas de string

function caractereAleatorio(caracteres) {
    const indice = Math.floor(Math.random() * caracteres.length);
    return caracteres[indice];
}

function embaralharSenha(senha) {
    const caracteres = senha.split("");
    for (let i = caracteres.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [caracteres[i], caracteres[j]] = [caracteres[j], caracteres[i]];
    }
    return caracteres.join("");
}

// SUA FUNÇÃO CORRIGIDA: Testa se a senha possui sequências proibidas
function testarSenha(senha) {
    if (senha.includes("12345")) { return false; }
    if (senha.includes("abcdef")) { return false; }
    if (senha.includes("ABCDEF")) { return false; }
    
    return true; // Senha aprovada
}

function gerarSenha() {
    let caracteresDisponiveis = "";
    let senha = "";

    if (checkboxMaiusculo.checked) {
        caracteresDisponiveis += letrasMaiusculas;
        senha += caractereAleatorio(letrasMaiusculas);
    }

    if (checkboxMinusculo.checked) {
        caracteresDisponiveis += letrasMinusculas;
        senha += caractereAleatorio(letrasMinusculas);
    }

    if (checkboxNumero.checked) {
        caracteresDisponiveis += numeros;
        senha += caractereAleatorio(numeros);
    }

    if (checkboxSimbolo.checked) {
        caracteresDisponiveis += simbolos;
        senha += caractereAleatorio(simbolos);
    }

    if (caracteresDisponiveis === "") {
        campoSenha.value = "";
        return;
    }

    while (senha.length < quantidadeCaracteres) {
        senha += caractereAleatorio(caracteresDisponiveis);
    }

    senha = embaralharSenha(senha);

    // INTEGRAÇÃO: Se a senha falhar no teste, gera outra novamente (recursão)
    if (!testarSenha(senha)) {
        return gerarSenha(); 
    }

    campoSenha.value = senha;
    calcularForca(senha);
}

function calcularForca(senha) {
    const forca = document.querySelector(".forca");
    const entropia = document.querySelector(".entropia");
    let tiposSelecionados = 0;

    if (checkboxMaiusculo.checked) tiposSelecionados++;
    if (checkboxMinusculo.checked) tiposSelecionados++;
    if (checkboxNumero.checked) tiposSelecionados++;
    if (checkboxSimbolo.checked) tiposSelecionados++;

    const tamanho = senha.length;
    const points = tamanho + (tiposSelecionados * 5);

    forca.classList.remove("fraca", "media", "forte");

    if (points < 20) {
        forca.classList.add("fraca");
        entropia.textContent = "Senha fraca";
    } else if (points < 35) {
        forca.classList.add("media");
        entropia.textContent = "Senha média";
    } else {
        forca.classList.add("forte");
        entropia.textContent = "Senha forte";
    }
}

botaoMenos.addEventListener("click", function () {
    const tiposAtivos = [checkboxMaiusculo, checkboxMinusculo, checkboxNumero, checkboxSimbolo].filter(cb => cb.checked).length;
    const minimoPermitido = Math.max(4, tiposAtivos);

    if (quantidadeCaracteres > minimoPermitido) {
        quantidadeCaracteres--;
        textoQuantidade.textContent = quantidadeCaracteres;
        gerarSenha();
    }
});

botaoMais.addEventListener("click", function () {
    if (quantidadeCaracteres < 30) {
        quantidadeCaracteres++;
        textoQuantidade.textContent = quantidadeCaracteres;
        gerarSenha();
    }
});

botaoGerar.addEventListener("click", gerarSenha);
checkboxMaiusculo.addEventListener("change", gerarSenha);
checkboxMinusculo.addEventListener("change", gerarSenha);
checkboxNumero.addEventListener("change", gerarSenha);
checkboxSimbolo.addEventListener("change", gerarSenha);

gerarSenha();