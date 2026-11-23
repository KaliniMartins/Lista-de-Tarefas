const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];  // cada item: { texto: "...", concluida: false }

const lista = document.querySelector("#lista-tarefas");
const contador = document.querySelector("#contador");
const contadorCaracteres = document.querySelector("#contador-caracteres");
const prioridade = document.querySelector("#prioridade");

const salvarTarefas = () => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
};

const renderizar = () => {
  lista.innerHTML = "";

  let tarefasFiltradas = tarefas;

  if (filtroAtual === "pendentes") {
    tarefasFiltradas = tarefas.filter((tarefa) => !tarefa.concluida);
  } else if (filtroAtual === "concluidas") {
    tarefasFiltradas = tarefas.filter((tarefa) => tarefa.concluida);
  }

tarefasFiltradas.forEach((tarefa) => {
  const li = document.createElement("li");
  li.textContent = tarefa.texto;

  // Verifica se a tarefa está concluída
  if (tarefa.concluida) {
    li.classList.add("concluida");
  }

  // Identifica a prioridade
  if (tarefa.prioridade === "alta") {
    li.classList.add("alta");
  }

  if (tarefa.prioridade === "media") {
    li.classList.add("media");
  }

  if (tarefa.prioridade === "baixa") {
    li.classList.add("baixa");
  }

  // Marca ou desmarca como concluída
  li.addEventListener("click", () => {
    tarefa.concluida = !tarefa.concluida;

    salvarTarefas();
    renderizar();
  });

  lista.appendChild(li);
});

  const pendentes = tarefas.filter((t) => !t.concluida).length;
  contador.textContent = `${pendentes} pendente(s) de ${tarefas.length}`;
};

let filtroAtual = "todos";

const btnTodos = document.querySelector("#todos");
const btnPendentes = document.querySelector("#pendentes");
const btnConcluidas = document.querySelector("#concluidas");

btnTodos.addEventListener("click", () => {
  filtroAtual = "todos";
  renderizar();
});

btnPendentes.addEventListener("click", () => {
  filtroAtual = "pendentes";
  renderizar();
});

btnConcluidas.addEventListener("click", () => {
  filtroAtual = "concluidas";
  renderizar();
});


const campo = document.querySelector("#campo-tarefa");
const btnAdicionar = document.querySelector("#btn-adicionar");

const adicionar = () => {
  const texto = campo.value.trim();
  if (texto === "") return;                          

tarefas.push({
  texto: texto,
  concluida: false,
  prioridade: prioridade.value
});           
 salvarTarefas();

  campo.value = "";
  campo.focus();

  renderizar();                
};

campo.addEventListener("input", () => {
  const restantes = 140 - campo.value.length;

  contadorCaracteres.textContent = `${restantes} caracteres restantes`;

  if (restantes < 0) {
    contadorCaracteres.classList.add("erro");
  } else {
    contadorCaracteres.classList.remove("erro");
  }
});

btnAdicionar.addEventListener("click", adicionar);

campo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    adicionar();
    campo.value = "";
  }
});

renderizar();   // primeira renderização (lista vazia + contador)

const btnLimpar = document.querySelector("#btn-limpar");

const limparConcluidos = () => {
  for (let i = tarefas.length - 1; i >= 0; i--) {
    if (tarefas[i].concluida) {
      tarefas.splice(i, 1);
    }
  }

  salvarTarefas();
  renderizar();
};

btnLimpar.addEventListener("click", limparConcluidos);
