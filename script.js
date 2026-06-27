const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pageTransition = document.querySelector(".page-transition");
const outerCursor = document.querySelector(".cursor-outer");
const innerCursor = document.querySelector(".cursor-inner");
const revealItems = [...document.querySelectorAll(".reveal")];
const tiltCards = [...document.querySelectorAll(".tilt-card")];
const parallaxItems = [...document.querySelectorAll("[data-depth]")];
const transitionLinks = [...document.querySelectorAll(".transition-link")];
const canvas = document.querySelector(".fx-canvas");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const productSlides = [...document.querySelectorAll(".product-slide")];
const productDots = [...document.querySelectorAll(".product-slideshow__dot")];

const state = {
  mouseX: window.innerWidth / 2,
  mouseY: window.innerHeight / 2,
  cursorX: window.innerWidth / 2,
  cursorY: window.innerHeight / 2,
  cursorVisible: false
};

if (sessionStorage.getItem("taejoon-transition-in") === "1" && pageTransition) {
  pageTransition.classList.add("is-active");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      pageTransition.classList.remove("is-active");
      sessionStorage.removeItem("taejoon-transition-in");
    });
  });
}

transitionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || event.metaKey || event.ctrlKey || event.shiftKey) {
      return;
    }
    event.preventDefault();
    if (pageTransition) {
      pageTransition.classList.add("is-active");
    }
    sessionStorage.setItem("taejoon-transition-in", "1");
    window.setTimeout(() => {
      window.location.href = href;
    }, prefersReducedMotion ? 0 : 520);
  });
});

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.addEventListener("mousemove", (event) => {
  state.mouseX = event.clientX;
  state.mouseY = event.clientY;
  state.cursorVisible = true;
});

document.addEventListener("mouseleave", () => {
  state.cursorVisible = false;
});

[...document.querySelectorAll("a, button, input, textarea, .tilt-card")].forEach((node) => {
  node.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  node.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const nextExpanded = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(nextExpanded));
    document.body.classList.toggle("menu-open", nextExpanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

function animateCursor() {
  state.cursorX += (state.mouseX - state.cursorX) * 0.14;
  state.cursorY += (state.mouseY - state.cursorY) * 0.14;

  if (outerCursor && innerCursor) {
    const opacity = state.cursorVisible ? "1" : "0";
    outerCursor.style.opacity = opacity;
    innerCursor.style.opacity = opacity;
    outerCursor.style.transform = `translate3d(${state.cursorX}px, ${state.cursorY}px, 0) translate(-50%, -50%)`;
    innerCursor.style.transform = `translate3d(${state.mouseX}px, ${state.mouseY}px, 0) translate(-50%, -50%)`;
  }

  requestAnimationFrame(animateCursor);
}

// Start the custom cursor animation regardless of prefers-reduced-motion
// (If you want to respect OS/browser reduced-motion settings, revert this check.)
if (outerCursor && innerCursor) {
  animateCursor();
}

if (!prefersReducedMotion) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    parallaxItems.forEach((item) => {
      const depth = Number(item.dataset.depth || 0.1);
      const shiftX = ((state.mouseX / window.innerWidth) - 0.5) * depth * 42;
      item.style.transform = `translate3d(${shiftX}px, ${scrollY * depth * -0.16}px, 0)`;
    });
  }, { passive: true });

  document.addEventListener("mousemove", () => {
    parallaxItems.forEach((item) => {
      const depth = Number(item.dataset.depth || 0.1);
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = (state.mouseX - centerX) / 90 * depth;
      const rotateX = (centerY - state.mouseY) / 110 * depth;
      const scrollY = window.scrollY;
      const shiftX = ((state.mouseX / window.innerWidth) - 0.5) * depth * 42;
      item.style.transform = `translate3d(${shiftX}px, ${scrollY * depth * -0.16}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  });
}

tiltCards.forEach((card) => {
  if (prefersReducedMotion) {
    return;
  }
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${offsetY * -10}deg) rotateY(${offsetX * 14}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button");
    const status = contactForm.querySelector(".form-status");
    if (!button) return;
    const original = button.textContent;

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    button.textContent = "Sending";
    button.disabled = true;

    if (status) {
      status.textContent = "";
      status.classList.remove("is-error");
    }

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message")
        })
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Inquiry could not be sent");
      }
      button.textContent = "Signal Received";
      contactForm.reset();
      if (status) status.textContent = "Thanks. Your inquiry has been sent.";
    } catch (err) {
      button.textContent = original;
      if (status) {
        status.textContent = err.message;
        status.classList.add("is-error");
      } else {
        alert(err.message);
      }
    } finally {
      button.textContent = original;
      button.disabled = false;
    }
  });
}

if (productSlides.length) {
  let currentSlide = 0;

  const setSlide = (index) => {
    const previousSlide = currentSlide;
    productSlides.forEach((slide, slideIndex) => {
      slide.classList.remove("is-active", "is-prev", "is-next");

      if (slideIndex === index) {
        slide.classList.add("is-active");
      } else if (slideIndex === previousSlide && previousSlide !== index) {
        slide.classList.add("is-prev");
      } else {
        slide.classList.add("is-next");
      }
    });
    productDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
    currentSlide = index;
  };

  setSlide(0);

  window.setInterval(() => {
    const nextSlide = (currentSlide + 1) % productSlides.length;
    setSlide(nextSlide);
  }, 3600);
}

function initCanvas() {
  if (!canvas || prefersReducedMotion) {
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  let width = 0;
  let height = 0;
  let particles = [];

  const resize = () => {
    width = canvas.width = window.innerWidth * window.devicePixelRatio;
    height = canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    particles = Array.from({ length: Math.min(70, Math.floor(window.innerWidth / 20)) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: Math.random() * 0.45 + 0.15,
      alpha: Math.random() * 0.6 + 0.2
    }));
  };

  const render = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle, index) => {
      particle.x += particle.speedX + (state.mouseX / window.innerWidth - 0.5) * 0.1;
      particle.y += particle.speedY;

      if (particle.y > window.innerHeight + 10) {
        particle.y = -10;
        particle.x = Math.random() * window.innerWidth;
      }

      if (particle.x > window.innerWidth + 10) particle.x = -10;
      if (particle.x < -10) particle.x = window.innerWidth + 10;

      const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 12);
      glow.addColorStop(0, `rgba(108, 236, 255, ${particle.alpha})`);
      glow.addColorStop(1, "rgba(108, 236, 255, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 12, 0, Math.PI * 2);
      ctx.fill();

      if (index % 8 === 0) {
        ctx.strokeStyle = "rgba(74, 120, 255, 0.08)";
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(state.mouseX, state.mouseY);
        ctx.stroke();
      }
    });

    requestAnimationFrame(render);
  };

  resize();
  render();
  window.addEventListener("resize", resize);
}

initCanvas();
