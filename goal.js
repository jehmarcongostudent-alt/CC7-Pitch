// 1. Roadmap Database
const roadmaps = {
    "IT": [
        "Learn HTML, CSS & JavaScript Basics",
        "Understand Version Control (Git/GitHub)",
        "Master one Programming Language (Java/Python)",
        "Learn Database Management (SQL)",
        "Build a Personal Portfolio Project"
    ],
    "Engineering": [
        "Master CAD Software (AutoCAD/SolidWorks)",
        "Advanced Mathematics (Calculus/Physics)",
        "Learn Material Science Fundamentals",
        "Project Management Certification",
        "Hands-on Workshop Internship"
    ],
    "Arts": [
        "Master Adobe Creative Suite",
        "Learn Color Theory & Typography",
        "Build a Digital Art Portfolio",
        "Learn Basic 3D Modeling",
        "Freelance Project Experience"
    ]
};

let goals = JSON.parse(localStorage.getItem("goals")) || [];

window.onload = function () {
    displayGoals();
    updateProgressBar();
};

function loadRoadmap() {
    const selected = document.getElementById("careerSelect").value;
    if (!selected || !roadmaps[selected]) return;

    // Ask for confirmation if they already have items
    if (goals.length > 0 && !confirm("This will add roadmap skills to your current list. Continue?")) return;

    roadmaps[selected].forEach(skill => {
        // Prevent duplicates
        if (!goals.some(g => g.text === skill)) {
            goals.push({ text: skill, completed: false });
        }
    });

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
                    ${goal.completed ? "Undo" : "Check"}
                </button>
                <button class="delete-btn" onclick="deleteGoal(${index})">×</button>
            </div>
        `;
        list.appendChild(item);
    });
    updateProgressBar();
}

function updateProgressBar() {
    if (goals.length === 0) {
        document.getElementById("progressBarFill").style.width = "0%";
        document.getElementById("progressPercent").innerText = "0%";
        return;
    }

    const completedCount = goals.filter(g => g.completed).length;
    const percentage = Math.round((completedCount / goals.length) * 100);
    
    document.getElementById("progressBarFill").style.width = percentage + "%";
    document.getElementById("progressPercent").innerText = percentage + "%";
}

// Keep your existing addGoal, toggleComplete, deleteGoal, and saveGoals functions below...
function addGoal() {
    const text = document.getElementById("goalText").value.trim();
    if (text === "") return;
    goals.push({ text: text, completed: false });
    document.getElementById("goalText").value = "";
    saveGoals();
    displayGoals();
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