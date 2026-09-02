const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");

if (toggle && links) {
    toggle.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
    });

    links.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            links.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
}

function updateThemeButton(theme) {
    if (!themeToggle) {
        return;
    }
    const next = theme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${next} mode`);
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeButton(theme);
}

if (themeToggle) {
    updateThemeButton(currentTheme());
    themeToggle.addEventListener("click", () => {
        setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
}
