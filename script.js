const revealNodes = document.querySelectorAll(".reveal");

revealNodes.forEach((node, index) => {
  node.style.setProperty("--reveal-delay", `${index * 70}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const currentPage = document.body.dataset.page;
const activeLink = document.querySelector(`[data-nav="${currentPage}"]`);

if (activeLink) {
  activeLink.classList.add("is-active");
}

const tiltAreas = document.querySelectorAll("[data-tilt-area]");

tiltAreas.forEach((area) => {
  const depthNodes = area.querySelectorAll("[data-depth]");

  const updateTilt = (clientX, clientY) => {
    const rect = area.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * -8;
    const rotateY = x * 10;

    area.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    depthNodes.forEach((node) => {
      const depth = Number(node.dataset.depth || 0);
      const moveX = x * depth;
      const moveY = y * depth;

      node.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      node.style.setProperty("--rgb-shift-x", `${x * 4}px`);
      node.style.setProperty("--rgb-shift-y", `${y * 3}px`);
    });
  };

  area.addEventListener("pointermove", (event) => {
    updateTilt(event.clientX, event.clientY);
  });

  area.addEventListener("pointerleave", () => {
    area.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
    depthNodes.forEach((node) => {
      node.style.transform = "translate3d(0, 0, 0)";
      node.style.setProperty("--rgb-shift-x", "0px");
      node.style.setProperty("--rgb-shift-y", "0px");
    });
  });
});

const cinematicFrames = document.querySelectorAll(".cinematic-frame");

cinematicFrames.forEach((frame) => {
  frame.addEventListener("pointermove", (event) => {
    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    frame.style.transform = `translate3d(${x * 5}px, ${y * 5}px, 0) scale(1.01)`;
    frame.style.setProperty("--rgb-shift-x", `${x * 6}px`);
    frame.style.setProperty("--rgb-shift-y", `${y * 5}px`);
  });

  frame.addEventListener("pointerleave", () => {
    frame.style.transform = "translate3d(0, 0, 0) scale(1)";
    frame.style.setProperty("--rgb-shift-x", "0px");
    frame.style.setProperty("--rgb-shift-y", "0px");
  });
});

const techCanvas = document.querySelector(".tech-canvas");

if (techCanvas) {
  const context = techCanvas.getContext("2d");
  const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = 0;

  const buildParticles = () => {
    const count = Math.max(18, Math.floor(width / 90));
    particles = Array.from({ length: count }, (_, index) => ({
      x: (index / count) * width,
      y: Math.random() * height,
      radius: 1.2 + Math.random() * 2.2,
      speed: 0.18 + Math.random() * 0.45,
      alpha: 0.18 + Math.random() * 0.34,
    }));
  };

  const resizeCanvas = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    techCanvas.width = width;
    techCanvas.height = height;
    buildParticles();
  };

  const drawTechField = () => {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.y -= particle.speed;
      if (particle.y < -20) {
        particle.y = height + 20;
      }

      context.beginPath();
      context.fillStyle = `rgba(0, 243, 255, ${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();

      const next = particles[(index + 1) % particles.length];
      if (Math.abs(next.y - particle.y) < 130) {
        context.beginPath();
        context.strokeStyle = "rgba(0, 243, 255, 0.08)";
        context.lineWidth = 1;
        context.moveTo(particle.x, particle.y);
        context.lineTo(next.x, next.y);
        context.stroke();
      }
    });

    if (!motionReduced) {
      rafId = window.requestAnimationFrame(drawTechField);
    }
  };

  resizeCanvas();

  if (motionReduced) {
    drawTechField();
  } else {
    drawTechField();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("beforeunload", () => window.cancelAnimationFrame(rafId), {
      once: true,
    });
  }

  if (motionReduced) {
    window.addEventListener("resize", () => {
      resizeCanvas();
      drawTechField();
    });
  }
}
