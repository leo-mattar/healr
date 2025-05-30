// --------------- GLOBAL - RELOAD AT THE TOP ---------------
window.addEventListener("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --------------- LENIS ---------------
window.lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

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
  const toggles = document.querySelectorAll('.c-prc-toggle');
  const tabs = document.querySelectorAll('.c-prc-tab');
  if (!toggles.length || !tabs.length) return;

  toggles.forEach((toggle, index) => {
    toggle.addEventListener('click', () => {
      toggles.forEach(t => t.classList.remove('is-active'));
      tabs.forEach(tab => tab.classList.remove('is-active'));
      toggle.classList.add('is-active');
      if (tabs[index]) tabs[index].classList.add('is-active');
    });
  });

  tabs.forEach(tab => {
    const modeSwitches = tab.querySelectorAll('.c-price-tab-mode-switch');
    if (!modeSwitches.length) return;

    modeSwitches.forEach(switchEl => {
      switchEl.addEventListener('click', () => {
        const tops = tab.querySelectorAll('.c-prc-tab_top');
        tops.forEach(top => top.classList.toggle('is-active'));
      });
    });
  });
}

// --- TEAM MODAL
function teamModal() {
  const members = document.querySelectorAll(".c-team-item");
  const modals = document.querySelectorAll(".c-team-modal");

  if (!members.length || !modals.length) return;

  members.forEach((member, index) => {
    member.addEventListener("click", () => {
      if (modals[index]) {
        modals[index].classList.add("is-open");
        lenis.stop();
      }
    });
  });

  modals.forEach((modal) => {
    const overlay = modal.querySelector(".c-team-modal-overlay");
    const closeBtn = modal.querySelector(".c-icon.team-modal-close");

    if (!overlay || !closeBtn) return;

    const closeModal = () => {
      modal.classList.remove("is-open");
      lenis.start();
    };

    overlay.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => modal.classList.remove("is-open"));
      lenis.start();
    }
  });
}

// --- FAQ SECTION
function faqSection() {
  const categories = document.querySelectorAll(".c-cat-list-item");
  if (categories.length === 0) return;

  categories[0].focus({ preventScroll: true });
  categories[0].click();
}

// --------------- FAQ ACCORDIONS ---------------
function faqAccordions() {
  const accordions = document.querySelectorAll(".c-faq-item");
  let active = null;

  if (accordions.length === 0) return;

  accordions.forEach((accordion, index) => {
    const question = accordion.querySelector(".c-faq-question");
    const response = accordion.querySelector(".c-faq-answer");
    const arrow = accordion.querySelector(".c-icon.faq-close");

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power4.inOut",
        duration: 0.8
      }
    });

    tl.to(response, { height: "auto" }, 0);
    tl.to(arrow, { rotation: 135 }, 0);

    accordion.tl = tl;

    accordion.addEventListener("click", function () {
      if (active === accordion) {
        tl.reverse();
        active = null;
      } else {
        if (active) active.tl.reverse();
        tl.play();
        active = accordion;
      }
    });

    if (index === 0) {
      accordion.click();
    }
  });
}

function headerDropdown() {
  const items = document.querySelectorAll(".c-dd");
  const overlay = document.querySelector(".c-dd-overlay");

  if (items.length === 0 || !overlay) return;

  function closeAllDropdowns() {
    let anyClosed = false;
    items.forEach(item => {
      if (item.classList.contains("is-active")) {
        item.classList.remove("is-active");
        anyClosed = true;
      }
    });
    if (overlay.classList.contains("is-active")) {
      overlay.classList.remove("is-active");
      anyClosed = true;
    }
    if (anyClosed) lenis.start();
  }

  items.forEach(item => {
    const toggle = item.querySelector(".c-dd-toggle");
    const navClose = item.querySelector(".c-dd-nav-close");
    const closeBtn = item.querySelector(".dd-close-btn");

    function openDropdown(e) {
      e.stopPropagation();
      const isAlreadyActive = item.classList.contains("is-active");
      closeAllDropdowns();
      if (!isAlreadyActive) {
        item.classList.add("is-active");
        overlay.classList.add("is-active");
        lenis.stop();
      }
    }

    if (toggle) {
      toggle.addEventListener("click", openDropdown);
    }

    if (navClose) {
      navClose.addEventListener("click", openDropdown);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        item.classList.remove("is-active");
        overlay.classList.remove("is-active");
        lenis.start();
      });
    }
  });

  overlay.addEventListener("click", () => {
    closeAllDropdowns();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeAllDropdowns();
    }
  });
}

// --- INIT
function init() {
  howTimeline();
  pricingTabber();
  teamModal();
  faqSection();
  faqAccordions();
  headerDropdown();
}

init();

// --- MATCHMEDIA - DESKTOP
mm.add("(min-width: 992px)", () => {
  fade();
  return () => {
    //
  };
});
