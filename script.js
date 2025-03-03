const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create a new list item
  const li = document.createElement("li");
  li.textContent = taskText;

  // Add a delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "deleteBtn";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });

  // Mark task as completed
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Append the delete button to the list item
  li.appendChild(deleteBtn);

  // Add the list item to the task list
  taskList.appendChild(li);

  // Clear the input field
  taskInput.value = "";
}

// Event listener for the "Add Task" button
addTaskBtn.addEventListener("click", addTask);

// Allow pressing "Enter" to add a task
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
      tasks.push({
        text: li.textContent.replace("Delete", "").trim(),
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) {
        li.classList.add("completed");
      }
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "deleteBtn";
      deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        saveTasks();
      });
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }
  
  // Call loadTasks when the page loads
  window.addEventListener("load", loadTasks);
  
  // Update saveTasks when a task is added, completed, or deleted
  addTaskBtn.addEventListener("click", () => {
    addTask();
    saveTasks();
  });
  
  taskList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("completed");
      saveTasks();
    }
  });

  const clearAllBtn = document.getElementById("clearAllBtn");
clearAllBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
});