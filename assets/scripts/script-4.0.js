// --- GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

let mm = gsap.matchMedia();

// --- GLOBAL - RELOAD AT THE TOP
window.addEventListener("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- GLOBAL FADE
function fade() {
  const fadeElements = document.querySelectorAll("[fade]");

  gsap.set(fadeElements, { opacity: 0, y: 32 });

  ScrollTrigger.batch(fadeElements, {
    once: true,
    start: self => self.trigger.getAttribute("data-start") || "top 95%",
    onEnter: batch =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
      }),
  });
}

// --- HOW SECTION - TIMELINE
function howTimeline() {
  const progressBar = document.querySelector(".c-how-line-progress-bar");
  const dots = document.querySelectorAll(".c-how-tl-dot");
  const contentItems = document.querySelectorAll(".c-how-tl-content-item");
  const timelineWrap = document.querySelector(".c-how_rt");

  if (!progressBar || contentItems.length === 0) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: timelineWrap,
      start: "top 80%",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.set(progressBar, { height: "0%" });
  gsap.set(dots, { opacity: 0, scale: 0.5 });
  gsap.set(contentItems, { opacity: 0, y: 50 });

  tl.to(progressBar, { height: "100%" });
  tl.to(
    dots,
    {
      opacity: 1,
      scale: 1,
      stagger: 0.2,
      duration: 0.5,
      ease: "back.out(1.7)",
    },
    "<"
  );

  tl.to(
    contentItems,
    {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: "power2.out",
    },
    "<"
  );
}

// --- PRICING TABBER
function pricingTabber() {
  const tabberBtns = document.querySelectorAll(".c-tabber-switch-btn");
  const tabberPanels = document.querySelectorAll(".c-tabber-panel");

  if (tabberBtns.length === 0) return;

  tabberBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      tabberBtns.forEach(item => item.classList.remove("is-active"));
      tabberPanels.forEach(panel => panel.classList.remove("is-active"));

      btn.classList.add("is-active");
      tabberPanels[index].classList.add("is-active");
    });
  });

  // Pricing info
  const tabberInfoWrap = document.querySelectorAll(".c-tabber-info");

  tabberInfoWrap.forEach(infoItem => {
    const modal = infoItem.querySelector(".c-tabber-info-modal");

    infoItem.addEventListener("mouseenter", function () {
      modal.classList.add("is-active");
    });

    document.addEventListener("mousemove", function (e) {
      if (modal.classList.contains("is-active")) {
        const modalRect = modal.getBoundingClientRect();
        const infoItemRect = infoItem.getBoundingClientRect();

        if (
          !isMouseInElement(e, modalRect) &&
          !isMouseInElement(e, infoItemRect)
        ) {
          modal.classList.remove("is-active");
        }
      }
    });
  });
}

function isMouseInElement(e, rect) {
  return (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
  );
}

// --- INIT
document.addEventListener("DOMContentLoaded", function () {
  // --- INIT
  function init() {
    howTimeline();
    pricingTabber();
  }

  init();

  // --- MATCHMEDIA - DESKTOP
  mm.add("(min-width: 992px)", () => {
    fade();
    return () => {
      //
    };
  });
});
