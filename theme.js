// ========= APPLY SAVED SETTINGS =========
function applySettings() {
    const darkMode = localStorage.getItem("darkMode") === "true";
    const navbarColor = localStorage.getItem("navbarColor");

    if (darkMode) {
        document.documentElement.style.setProperty("--bg-color", "#1c1c1c");
        document.documentElement.style.setProperty("--text-color", "#ffffff");
    } else {
        document.documentElement.style.setProperty("--bg-color", "#ffffff");
        document.documentElement.style.setProperty("--text-color", "#000000");
    }

    if (navbarColor) {
        document.documentElement.style.setProperty("--navbar-color", navbarColor);
    }
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

