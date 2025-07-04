const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 120);
});

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navlist.classList.toggle("active");
};

window.onscroll = () => {
    menu.classList.remove("bx-x");
    navlist.classList.remove("active");
};

// Skills Animation
const skillBars = document.querySelectorAll(".skill-bar");

const animateSkills = () => {
    skillBars.forEach((bar) => {
        const level = bar.getAttribute("data-level");
        bar.style.width = level + "%";
    });
};

// Intersection Observer for skills animation
const skillsSection = document.querySelector(".skills");
if (skillsSection) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(skillsSection);
}
