let goals = JSON.parse(localStorage.getItem("goals")) || [];

window.onload = function () {
    displayGoals();
};

function addGoal() {
    const text = document.getElementById("goalText").value.trim();
    if (text === "") return;

    goals.push({ text: text, completed: false });
    document.getElementById("goalText").value = "";

    saveGoals();
    displayGoals();
}

function displayGoals() {
    const list = document.getElementById("goalList");
    list.innerHTML = "";

    goals.forEach((goal, index) => {
        const item = document.createElement("li");
        item.className = "goal-item" + (goal.completed ? " completed" : "");

        item.innerHTML = `
            <span>${goal.text}</span>
            <div class="goal-buttons">
                <button class="complete-btn" onclick="toggleComplete(${index})">
                    ${goal.completed ? "Undo" : "Complete"}
                </button>
                <button class="delete-btn" onclick="deleteGoal(${index})">Delete</button>
            </div>
        `;

        list.appendChild(item);
    });
}

function toggleComplete(index) {
    goals[index].completed = !goals[index].completed;
    saveGoals();
    displayGoals();
}

function deleteGoal(index) {
    goals.splice(index, 1);
    saveGoals();
    displayGoals();
}

function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(goals));
}