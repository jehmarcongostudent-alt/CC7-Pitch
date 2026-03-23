// ========= APPLY SAVED SETTINGS =========
function applySettings() {
    const darkMode = localStorage.getItem("darkMode") === "true";
    const navbarColor = localStorage.getItem("navbarColor") || "#1468a2";

    if (darkMode) {
        document.documentElement.style.setProperty("--bg-color", "#121212");
        document.documentElement.style.setProperty("--text-color", "#ffffff");
        document.documentElement.style.setProperty("--card-bg", "#1e1e1e"); // Boxes turn dark!
    } else {
        document.documentElement.style.setProperty("--bg-color", "#e9f3ff");
        document.documentElement.style.setProperty("--text-color", "#333333");
        document.documentElement.style.setProperty("--card-bg", "#ffffff"); // Boxes turn white!
    }

    document.documentElement.style.setProperty("--navbar-color", navbarColor);
}

// Apply settings immediately on load
applySettings();


// ========= SETTINGS PAGE LOGIC =========
document.addEventListener("DOMContentLoaded", () => {

    const darkModeCheckbox = document.getElementById("darkMode");
    const navbarColorPicker = document.getElementById("navbarColor");
    const saveBtn = document.getElementById("saveBtn");

    // If page is NOT the settings page, stop here
    if (!darkModeCheckbox || !navbarColorPicker || !saveBtn) return;

    // Load saved values into controls
    darkModeCheckbox.checked = localStorage.getItem("darkMode") === "true";
    navbarColorPicker.value =
        localStorage.getItem("navbarColor") || "#1e1e1e";

    // Save settings
    saveBtn.addEventListener("click", () => {
        localStorage.setItem("darkMode", darkModeCheckbox.checked);
        localStorage.setItem("navbarColor", navbarColorPicker.value);

        applySettings(); // Apply instantly

        alert("Settings saved!");
    });

});

document.getElementById("resetBtn").addEventListener("click", () => {
    
    // Remove saved settings
    localStorage.removeItem("theme");
    localStorage.removeItem("navbarColor");

    // Reset HTML to match defaults
    document.body.setAttribute("data-theme", "light");
    document.documentElement.style.setProperty("--navbar-color", "#1468a2");

    // Reload to apply everything cleanly
    location.reload();
});

document.getElementById("resetBtn").addEventListener("click", () => {
    // Clear everything related to settings
    localStorage.removeItem("darkMode");
    localStorage.removeItem("navbarColor");

    // Force values back to defaults
    document.documentElement.style.setProperty("--bg-color", "#ffffff");
    document.documentElement.style.setProperty("--text-color", "#000000");
    document.documentElement.style.setProperty("--navbar-color", "#1468a2");

    alert("Settings Reset!");
    location.reload();
});

