(function () {
    "use strict";

    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const themeToggle = document.querySelector(".theme-toggle");
    const header = document.querySelector(".site-header");
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = Array.from(document.querySelectorAll("main section[id]"));

    /* ── Mobile navigation ── */
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const open = navLinks.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(open));
            document.body.classList.toggle("nav-open", open);
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("nav-open");
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navLinks.classList.contains("open")) {
                navLinks.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("nav-open");
            }
        });
    }

    /* ── Theme toggle ── */
    function currentTheme() {
        return document.documentElement.getAttribute("data-theme") === "dark"
            ? "dark"
            : "light";
    }

    function updateThemeButton(theme) {
        if (!themeToggle) return;
        const next = theme === "dark" ? "light" : "dark";
        themeToggle.setAttribute("aria-label", `Switch to ${next} mode`);
    }

    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        try {
            localStorage.setItem("theme", theme);
        } catch (_) {}
        updateThemeButton(theme);
    }

    if (themeToggle) {
        updateThemeButton(currentTheme());
        themeToggle.addEventListener("click", () => {
            setTheme(currentTheme() === "dark" ? "light" : "dark");
        });
    }

    /* ── Header scroll state ── */
    if (header) {
        const onScroll = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ── Active section highlighting ── */
    if (navAnchors.length && sections.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const id = entry.target.id;
                    navAnchors.forEach((link) => {
                        const href = link.getAttribute("href");
                        link.classList.toggle("is-active", href === `#${id}`);
                    });
                });
            },
            {
                rootMargin: "-30% 0px -55% 0px",
                threshold: 0,
            }
        );
        sections.forEach((section) => observer.observe(section));
    }

    /* ── Subtle reveal on scroll ── */
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced && "IntersectionObserver" in window) {
        const revealEls = document.querySelectorAll(".reveal");
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        document.querySelectorAll(".reveal").forEach((el) => {
            el.classList.add("is-visible");
        });
    }
})();
