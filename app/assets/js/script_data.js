const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const hoje = new Date();
const dia = String(hoje.getDate()).padStart(2, '0');
const mes = meses[hoje.getMonth()];
const ano = hoje.getFullYear();
const dataFormatada = `${dia} ${mes} ${ano}`;

document.querySelector(".rodape-direita p").textContent = dataFormatada;