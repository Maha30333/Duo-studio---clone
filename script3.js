













let locoScroll;

function locoscroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Sirf Desktop (1024px+) ke liye Locomotive initialize karein
    if (window.innerWidth > 1024) {
        locoScroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smartphone: { smooth: false },
            tablet: { smooth: false }
        });

        // Locomotive aur ScrollTrigger ka link (Sirf Desktop par)
        locoScroll.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(".main", {
            scrollTop(value) {
                return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
        });

        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    }

    // Videos update logic (Check ke locoScroll exist karta hai ya nahi)
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.onloadeddata = () => {
            if (locoScroll) locoScroll.update();
            ScrollTrigger.refresh();
        };
    });

    ScrollTrigger.refresh();
}

locoscroll();

// ========== NAV SCROLL TO SECTION ==========
function setupNavScrolling() {
    var allNavLinks = document.querySelectorAll("[data-target]");
    allNavLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            var targetSelector = link.getAttribute("data-target");
            var targetEl = document.querySelector(targetSelector);
            if (!targetEl) return;

            // Close mobile nav
            var mobileNav = document.getElementById("mobile-nav");
            var menuToggle = document.getElementById("menu-toggle");
            if (mobileNav && mobileNav.classList.contains("open")) {
                mobileNav.classList.remove("open");
                menuToggle.classList.remove("active");
            }

            // Agar Locomotive chal raha hai toh uske through scroll karein, warna normal
            if (locoScroll && window.innerWidth > 1024) {
                locoScroll.scrollTo(targetEl);
            } else {
                targetEl.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}
setupNavScrolling();

// ========== MOBILE MENU TOGGLE ==========
var menuToggle = document.getElementById("menu-toggle");
var mobileNav = document.getElementById("mobile-nav");
var mobileNavClose = document.getElementById("mobile-nav-close");

if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
        menuToggle.classList.toggle("active");
        mobileNav.classList.toggle("open");
    });
}

if (mobileNavClose && mobileNav) {
    mobileNavClose.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        menuToggle.classList.remove("active");
    });
}

// ========== CURSOR (ALL SCREENS) ==========
var crsr = document.querySelector(".cursor");
document.addEventListener("mousemove", function (dets) {
    if (crsr) {
        crsr.style.left = dets.x - 10 + "px";
        crsr.style.top = dets.y - 10 + "px";
    }
});

// ========== VIDEO HOVER EFFECT ==========
function videohovercrsreffect() {
    if (window.innerWidth <= 768) return;
    var mousehover = document.querySelector(".mouseeffect");
    var video = document.querySelector(".page1 video");
    if (!video || !crsr || !mousehover) return;

    video.addEventListener("mouseenter", function () {
        gsap.to(mousehover, { display: "block", opacity: "1", scale: "1" });
        gsap.to(crsr, { scale: "0", opacity: "0" });
    });
    video.addEventListener("mouseleave", function () {
        gsap.to(mousehover, { display: "none", opacity: "0", scale: "0" });
        gsap.to(crsr, { scale: "1", opacity: "1", display: "block" });
    });
    video.addEventListener("mousemove", function (e) {
        gsap.to(mousehover, { left: e.x - 29, top: e.y - 10 });
    });
}
videohovercrsreffect();

// ========== GSAP ANIMATIONS ==========
gsap.from(".page1 h1,.page1 h2", {
    y: 10, rotate: 10, opacity: 0, delay: 0.3, duration: 0.7,
});

// Scroller setting fix: Desktop par ".main" aur mobile par default
var scrollerSetting = window.innerWidth > 1024 ? ".main" : window;

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: scrollerSetting,
        start: "top 27%",
        end: "top 0",
        scrub: 3,
    },
});
tl.to(".page1 h1", { x: -100 }, "anim");
tl.to(".page1 h2", { x: 100 }, "anim");
tl.to(".page1 video", { width: "90%" }, "anim");

// ========== BOX HOVER & NAV PURPLE (Desktop Only) ==========
if (window.innerWidth > 768) {
    var boxes = document.querySelectorAll(".box");
    boxes.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            var att = elem.getAttribute("data-image");
            crsr.style.width = "220px";
            crsr.style.height = "220px";
            crsr.style.borderRadius = "1rem";
            crsr.style.backgroundImage = "url(" + att + ")";
        });
        elem.addEventListener("mouseleave", function () {
            crsr.style.width = "20px";
            crsr.style.height = "20px";
            crsr.style.borderRadius = "50%";
            crsr.style.backgroundImage = "none";
        });
    });

    var h4 = document.querySelectorAll("#nav h4");
    var purple = document.querySelector("#purple");
    h4.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            purple.style.display = "block";
            purple.style.opacity = "1";
        });
        elem.addEventListener("mouseleave", function () {
            purple.style.display = "none";
            purple.style.opacity = "0";
        });
    });
}
     

