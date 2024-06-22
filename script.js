// Selecione elementos do formulário.
const amount = document.getElementById("amount");

// Captura evento de input para formatar o valor
amount.oninput = () => {
  // Obtém o valor do input e remove todos os caracteres não numéricos.
  let value = amount.value.replace(/\D/g, "");

  // Transforma o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$ 1,50).
  value = Number(value) / 100;

  // Atualiza o valor do input.
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // Formata o valor para a moeda brasileira.
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Retorna o valor formatado.
  return value;
}
