document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('task-list');
  const addTaskBtn = document.getElementById('add-task-btn');
  const newTaskInput = document.getElementById('new-task-input');

  let tasks = [
    { name: "Acheter du café", status: "Terminée" },
    { name: "Répondre aux e-mails", status: "En cours" },
    { name: "Terminer le projet Angular", status: "Urgente" }
  ];

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        ${task.name}
        <span class="badge rounded-pill ${getBadgeClass(task.status)}">${task.status}</span>
        <button class="btn btn-sm btn-danger ms-2">Supprimer</button>
      `;

      li.querySelector('button').addEventListener('click', () => {
        tasks.splice(index, 1);
        renderTasks();
      });

      taskList.appendChild(li);
    });
  }

  function getBadgeClass(status) {
    if(status === "Terminée") return "bg-success";
    if(status === "En cours") return "bg-warning";
    if(status === "Urgente") return "bg-danger";
    return "bg-secondary";
  }

  // === Ici le listener mis à jour ===
  addTaskBtn.addEventListener('click', () => {
    console.log("Bouton cliqué"); // Vérifie si ça s'affiche
    const taskName = newTaskInput.value.trim();
    if(taskName) {
      tasks.push({ name: taskName, status: "En cours" });
      newTaskInput.value = '';
      renderTasks();
    }
  });

  renderTasks();
});
