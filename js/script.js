// Year
document.querySelector("#year").textContent = new Date().getFullYear();

// Reveal on scroll
// const revealEls = document.querySelectorAll(".reveal");
// const io = new IntersectionObserver(
//     (entries) => {
//         entries.forEach((e) => {
//             e.isIntersecting ? e.target.classList.add("is-visible") : e.target.classList.remove("is-visible");
//         });
//     },
//     { threshold: 0.12 }
// );
// revealEls.forEach((el) => io.observe(el));

// Skill bars fill when visible
const skills = document.querySelectorAll(".skill");
const ioSkills = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const level = e.target.getAttribute("data-level") || "70";
            const bar = e.target.querySelector(".bar span");
            if (bar) bar.style.width = `${level}%`;
            ioSkills.unobserve(e.target);
        });
    },
    { threshold: 0.35 }
);
skills.forEach((s) => ioSkills.observe(s));

// Mobile nav (simple)
const burger = document.querySelector("#burger");
const nav = document.querySelector("#nav");
burger.onclick = () => {
    nav.classList.toggle("show")
    nav.classList.contains("show") ?
        document.querySelector(".burger i").classList.replace("fa-bars", "fa-close")
        : document.querySelector(".burger i").classList.replace("fa-close", "fa-bars")
};

// Fake send (UI feedback)
const sendBtn = document.querySelector("#sendBtn");
const form = document.querySelector(".contact__form");

form.onsubmit = (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    let allFilled = true;

    inputs.forEach(input => {
        if (input.classList.contains('req') && input.value.trim() === '') {
            allFilled = false;
            input.classList.add("border-red-500")
        } else {
            input.classList.remove("border-red-500")
        }
    });

    if (!allFilled) {
        Swal.fire({
            icon: 'error',
            title: 'Required Fields Missing',
            text: 'Please fill all required fields marked with *'
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Form Submitted!',
        text: 'All required fields are filled.'
    });
}

// to-up-btn
const topBtn = document.querySelector("#top-btn");
window.onload = () => {
    const mood = localStorage.getItem("mood")
    if (mood) {
        if (localStorage.getItem("mood") == "dark") {
            moodBtn.querySelector("i").classList.replace("fa-moon", "fa-sun")
            document.documentElement.classList.add("dark")
        } else {
            moodBtn.querySelector("i").classList.replace("fa-sun", "fa-moon")
            document.documentElement.classList.remove("dark")
        }
    } else {
        localStorage.setItem("mood", "light")
        moodBtn.querySelector("i").classList.replace("fa-sun", "fa-moon")
        document.documentElement.classList.remove("dark")
    }
    topBtn.classList.toggle("show", scrollY > 100)
    AOS.init();
}
window.onscroll = () => {
    topBtn.classList.toggle("show", scrollY > 100)

    // progress
    const progress = document.querySelector(".progress");
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    progress.style.width = `${(scrollTop / (scrollHeight - clientHeight)) * 100}%`;
}

topBtn.onclick = () => { scrollTo({ top: 0, behavior: "smooth" }) };

// navbar active linke
let linkes = document.querySelectorAll("nav .nav-item a")
linkes.forEach(el => {
    el.onclick = () => {
        linkes.forEach((e) => { e.classList.remove("active") })
        el.classList.add("active")
        el.closest("#nav").classList.remove("show");
        document.querySelector(".burger i").classList.replace("fa-close", "fa-bars")
    }
});
// mood btn
const moodBtn = document.querySelector("#mood-btn")

moodBtn.onclick = () => {
    const mood = localStorage.getItem("mood")
    if (mood) {
        if (localStorage.getItem("mood") == "dark") {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("mood", "light");
            moodBtn.querySelector("i").classList.replace("fa-sun", "fa-moon")
        } else {
            localStorage.setItem("mood", "dark");
            moodBtn.querySelector("i").classList.replace("fa-moon", "fa-sun")
            document.documentElement.classList.add("dark")
        }
    } else {
        localStorage.setItem("mood", "dark");
        moodBtn.querySelector("i").classList.replace("fa-moon", "fa-sun")
        document.documentElement.classList.add("dark")
    }
}