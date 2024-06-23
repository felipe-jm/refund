// Selecione elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

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

// Captura evento de submit do formulário.
form.onsubmit = (event) => {
  // Previne o comportamento padrão do formulário.
  event.preventDefault();

  // Cria um novo objeto com os detalhes da despesa.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    amount: amount.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    created_at: new Date(),
  };

  // Chama a função para adicionar a despesa.
  addExpense(newExpense);
};

// Adiciona um novo item na lista.
function addExpense(newExpense) {
  try {
    // Cria o elemento (li) para adicionar na lista de despesas (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria o ícone da categoria.
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Cria a info da despesa.
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Cria o nome da despesa.
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa.
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona name e category na div das informações da despesa.
    expenseInfo.append(expenseName, expenseCategory);

    // Cria o valor da despesa.
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    // Cria o ícone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Adicione o item na lista.
    expenseList.append(expenseItem);

    // Limpa o formulário.
    clearForm();

    // Atualiza os totais.
    updateTotals();
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}

// Atualiza os totais.
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul).
    const items = expenseList.children;

    // Atualiza quantidade de itens da lista.
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    // Variável para incrementar o total.
    let total = 0;

    // Percorre todos os itens da lista.
    for (let item of items) {
      // Obtém o valor da despesa.
      const itemAmount = item.querySelector(".expense-amount");

      // Remove caracteres não números e substitui a vírgula por ponto.
      let value = itemAmount.textContent.replace(/\D/g, "");

      // Converte o valor para float.
      value = parseFloat(value / 100);

      // Verifica se é um número válido.
      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor não parece ser um número."
        );
      }

      // Cria a span para adicionar o R$ formatado.
      const symbolBRL = document.createElement("small");
      symbolBRL.textContent = "R$";

      // Soma o valor total.
      total += value;

      // Formata o valor e remove o R$.
      totalValue = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

      // Limpa o conteúdo do elemento.
      expensesTotal.innerHTML = "";

      // Adiciona o símbolo da moeda e o valor total formatado.
      expensesTotal.append(symbolBRL, totalValue);
    }
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais.");
  }
}

// Evento que captura o clique nos itens da lista.
expenseList.addEventListener("click", (event) => {
  // Verifica se o elemento clicado é o ícone de remover.
  if (event.target.classList.contains("remove-icon")) {
    // Obtem a li pai do element clicado.
    const item = event.target.closest(".expense");

    // Remove item da lista.
    item.remove();

    // Atualiza os totais.
    updateTotals();
  }
});

function clearForm() {
  // Limpa os inputs.
  expense.value = "";
  category.value = "";
  amount.value = "";

  // Coloca o foco no input de expense.
  expense.focus();
}
