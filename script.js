document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("button");
  const taskField = document.getElementById("text");
  const pendingTasks = document.getElementById("pendingTasks");
  const completedTasks = document.getElementById("completedTasks");

  // Function to add a task to the Pending List
  addButton.addEventListener("click", function () {
    const taskText = taskField.value.trim();
    if (taskText !== "") {
      const taskElement = createTaskElement(taskText, false);
      pendingTasks.appendChild(taskElement);
      taskField.value = "";
    }
  });

  // Function to create a task element (either for pending or completed)
  function createTaskElement(taskText, isCompleted) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
  
    const taskContent = `
      <span class="addedTask">${taskText}</span>
      <span class="taskTime">${new Date().toLocaleString()}</span>
      ${isCompleted ? "" : '<button class="completeButton"><i class="ri-check-line"></i></button>'}
      ${isCompleted ? "" : '<button class="editButton"><i class="ri-pencil-line"></i></button>'}
      <button class="deleteButton"><i class="ri-delete-bin-line"></i></button>
    `;
    taskElement.innerHTML = taskContent;
  
    taskElement.querySelector(".deleteButton").addEventListener("click", function () {
      taskElement.remove();
    });
  
    if (!isCompleted) {
      taskElement.querySelector(".editButton").addEventListener("click", function () {
        const taskInput = prompt("Edit Task:", taskText);
        if (taskInput) {
          taskElement.querySelector(".addedTask").textContent = taskInput;
        }
      });
  
      taskElement.querySelector(".completeButton").addEventListener("click", function () {
        taskElement.remove();
        const completedTask = createTaskElement(taskText, true);
        completedTasks.appendChild(completedTask);
      });
    }
  
    return taskElement;
  }  
});
