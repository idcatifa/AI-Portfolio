/* ========================================
   TYPING ANIMATION
======================================== */

const typingText = document.getElementById("typing-text");

const roles = [
    "Software Engineering Student",
    "Aspiring Software Engineer",
    "Future Researcher",
    "Technology Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeRole, 1800);

            return;
        }

        setTimeout(typeRole, 70);

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

            setTimeout(typeRole, 400);

            return;
        }

        setTimeout(typeRole, 40);
    }
}

typeRole();


/* ========================================
   SCROLL REVEAL
======================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }

            });

        },

        {
            threshold: 0.12
        }

    );

revealElements.forEach((element) => {

    observer.observe(element);

});


/* ========================================
   MOBILE MENU
======================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* Close menu after clicking a link */

const navItems =
    document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* ========================================
   BACK TO TOP
======================================== */

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ========================================
   CURSOR GLOW
======================================== */

const cursorGlow =
    document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        event.clientX + "px";

    cursorGlow.style.top =
        event.clientY + "px";

});


/* ========================================
   CONSOLE MESSAGE
======================================== */

console.log(
    "♡ Welcome to Atifa's Portfolio!"
);

console.log(
    "Learn • Build • Research • Grow"
);