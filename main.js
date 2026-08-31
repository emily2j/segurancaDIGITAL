const campoSenha = document.querySelector("#campo-senha");
const mensagem = document.querySelector("#mensagem");
const numeroSenha = document.querySelector("#numero-senha");
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "#+-*?!@%$&";
const tamanhoMinimo = 8;
const tamanhoMaximo = 20;




let tamanhoSenha = 8;


const gruposDeCaracteres = {
    maiusculas: letrasMaiusculas,
    minusculas: letrasMinusculas,
    numeros,
    simbolos
};


geraSenha();




function geraSenha() {
   const opcoesSelecionadas = [...document.querySelectorAll(".opcao-caracteres:checked")];
   const gruposSelecionados = opcoesSelecionadas.map((opcao) => gruposDeCaracteres[opcao.value]);


   if (gruposSelecionados.length === 0) {
       campoSenha.value = "";
       mensagem.textContent = "Selecione pelo menos uma opção.";
       return;
   }


   const alfabeto = gruposSelecionados.join("");
   const valores = new Uint32Array(tamanhoSenha);
   crypto.getRandomValues(valores);
   const senha = gruposSelecionados.map((grupo, indice) => grupo[valores[indice] % grupo.length]);




   for (let i = senha.length; i < tamanhoSenha; i++) {
       senha.push(alfabeto[valores[i] % alfabeto.length]);
   }


   for (let i = senha.length - 1; i > 0; i--) {
       const indice = valores[i] % (i + 1);
       [senha[i], senha[indice]] = [senha[indice], senha[i]];
   }




   campoSenha.value = senha.join("");
   mensagem.textContent = "";
}


function diminuiTamanho() {
   if (tamanhoSenha > tamanhoMinimo) {
       tamanhoSenha--;
       atualizaSenha();
   }
}




function aumentaTamanho() {
   if (tamanhoSenha < tamanhoMaximo) {
       tamanhoSenha++;
       atualizaSenha();
   }
}




function atualizaSenha() {
   numeroSenha.textContent = tamanhoSenha;
   geraSenha();
}




document.querySelector("#botao-gerar").addEventListener("click", geraSenha);
document.querySelector("#botao-diminuir").addEventListener("click", diminuiTamanho);
document.querySelector("#botao-aumentar").addEventListener("click", aumentaTamanho);
document.querySelectorAll(".opcao-caracteres").forEach((opcao) => {
    opcao.addEventListener("change", geraSenha);
});
document.querySelector("#botao-copiar").addEventListener("click", async () => {
   if (!navigator.clipboard) {
       mensagem.textContent = "Copie a senha manualmente.";
       return;
   }




   try {
       await navigator.clipboard.writeText(campoSenha.value);
       mensagem.textContent = "Senha copiada.";
   } catch {
       mensagem.textContent = "Copie a senha manualmente.";
   }
});




