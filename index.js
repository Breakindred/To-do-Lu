// Função para obter as tarefas do localStorage
function getTasksFromLocalStorage() {
  const tasksJSON = localStorage.getItem("tasks");
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}

// Função para salvar as tarefas no localStorage
function saveTasksToLocalStorage(tasks) {
  const tasksJSON = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksJSON);
}

// Carregar tarefas do localStorage
function loadTasks() {
  var tasks = getTasksFromLocalStorage();
  tasks.forEach(function (task) {
    createTaskElement(task);
  });
}

// Função para criar um elemento de tarefa
function createTaskElement(task) {
  var li = document.createElement("li");
  var t = document.createTextNode(task);
  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Adicionar evento de clique para exclusão da tarefa
  span.addEventListener("click", function () {
    var div = this.parentElement;
    div.style.display = "none";

    // Remover a tarefa do localStorage
    var tasks = getTasksFromLocalStorage();
    var taskIndex = tasks.indexOf(task);
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
      saveTasksToLocalStorage(tasks);
    }
  });
}

// Adicionar uma nova tarefa
function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    var tasks = getTasksFromLocalStorage();
    tasks.push(inputValue);
    saveTasksToLocalStorage(tasks);
    createTaskElement(inputValue);
    document.getElementById("myInput").value = "";
  }
}

// Carregar as tarefas salvas ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});
