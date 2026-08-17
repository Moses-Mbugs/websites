import * as THREE from "three";

/* ==========================================================
   LOADER
========================================================== */

const loader = document.getElementById("loader");

const loaderProgress = document.getElementById("loaderProgress");

let progress = 0;

const loaderInterval = setInterval(() => {
  progress += Math.random() * 15;

  if (progress >= 100) {
    progress = 100;

    clearInterval(loaderInterval);

    setTimeout(() => {
      loader.classList.add("hide");
    }, 350);
  }

  loaderProgress.style.width = `${progress}%`;
}, 90);

/* ==========================================================
   THREE.JS
========================================================== */

const canvas = document.getElementById("heroCanvas");

/* Scene */

const scene = new THREE.Scene();

/* Camera */

const camera = new THREE.PerspectiveCamera(
  38,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

camera.position.set(0, 1, 11);

/* Renderer */

const renderer = new THREE.WebGLRenderer({
  canvas,

  alpha: true,

  antialias: true,
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputColorSpace = THREE.SRGBColorSpace;

/* ==========================================================
   SCULPTURE GROUP
========================================================== */

const building = new THREE.Group();

scene.add(building);

/* ==========================================================
   MATERIALS
========================================================== */

const cobaltMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x5367ff,

  roughness: 0.22,

  metalness: 0.15,

  transparent: true,

  opacity: 0.92,

  clearcoat: 1,

  clearcoatRoughness: 0.2,
});

const clayMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xe5835d,

  roughness: 0.4,

  metalness: 0.05,
});

const ivoryMaterial = new THREE.MeshStandardMaterial({
  color: 0xf2ede5,

  roughness: 0.5,

  transparent: true,

  opacity: 0.9,
});

const darkMaterial = new THREE.MeshStandardMaterial({
  color: 0x171920,

  roughness: 0.35,

  metalness: 0.6,
});

const acidMaterial = new THREE.MeshStandardMaterial({
  color: 0xd9ff62,

  roughness: 0.3,

  emissive: 0x314000,

  emissiveIntensity: 0.35,
});

/* ==========================================================
   HELPER TO CREATE ARCHITECTURAL VOLUMES
========================================================== */

function createBlock({
  width,
  height,
  depth,
  x,
  y,
  z,
  material,
  rotation = 0,
}) {
  const geometry = new THREE.BoxGeometry(width, height, depth);

  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(x, y, z);

  mesh.rotation.y = rotation;

  building.add(mesh);

  /* wireframe edge */

  const edges = new THREE.EdgesGeometry(geometry);

  const line = new THREE.LineSegments(
    edges,

    new THREE.LineBasicMaterial({
      color: 0xffffff,

      transparent: true,

      opacity: 0.13,
    }),
  );

  mesh.add(line);

  return mesh;
}

/* ==========================================================
   ABSTRACT HOUSE
========================================================== */

const block1 = createBlock({
  width: 4.8,
  height: 1.2,
  depth: 2.4,

  x: 0,
  y: -1.2,
  z: 0,

  material: cobaltMaterial,

  rotation: -0.08,
});

const block2 = createBlock({
  width: 3.4,
  height: 1.3,
  depth: 2.1,

  x: 0.9,
  y: 0.05,
  z: -0.1,

  material: ivoryMaterial,

  rotation: 0.12,
});

const block3 = createBlock({
  width: 2.9,
  height: 1.15,
  depth: 1.9,

  x: -0.55,
  y: 1.25,
  z: 0.1,

  material: clayMaterial,

  rotation: -0.18,
});

const block4 = createBlock({
  width: 1.2,
  height: 3.8,
  depth: 1.1,

  x: 2.2,
  y: 0.2,
  z: -0.7,

  material: darkMaterial,

  rotation: 0.12,
});

const block5 = createBlock({
  width: 1.6,
  height: 0.25,
  depth: 3.7,

  x: -2.05,
  y: -0.1,
  z: -0.2,

  material: acidMaterial,

  rotation: -0.18,
});

/* ==========================================================
   GLASS WINDOWS
========================================================== */

const windowMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x8ea0ff,

  transparent: true,

  opacity: 0.33,

  roughness: 0.05,

  metalness: 0.1,

  transmission: 0.3,
});

for (let i = 0; i < 8; i++) {
  const windowGeometry = new THREE.BoxGeometry(0.38, 0.62, 0.03);

  const windowMesh = new THREE.Mesh(
    windowGeometry,

    windowMaterial,
  );

  windowMesh.position.set(
    -1.4 + (i % 4) * 0.75,

    -0.95 + Math.floor(i / 4) * 0.68,

    1.22,
  );

  building.add(windowMesh);
}

/* ==========================================================
   FLOATING SLABS
========================================================== */

const slabs = [];

for (let i = 0; i < 6; i++) {
  const geometry = new THREE.BoxGeometry(
    THREE.MathUtils.randFloat(0.5, 1.4),

    0.05,

    THREE.MathUtils.randFloat(0.5, 1.6),
  );

  const material = new THREE.MeshStandardMaterial({
    color: i % 2 === 0 ? 0x5367ff : 0xe5835d,

    transparent: true,

    opacity: THREE.MathUtils.randFloat(0.25, 0.7),
  });

  const slab = new THREE.Mesh(geometry, material);

  slab.position.set(
    THREE.MathUtils.randFloat(-5, 5),

    THREE.MathUtils.randFloat(-3, 3),

    THREE.MathUtils.randFloat(-3, 2),
  );

  slab.rotation.set(
    Math.random(),

    Math.random(),

    Math.random(),
  );

  scene.add(slab);

  slabs.push({
    mesh: slab,

    speed: THREE.MathUtils.randFloat(0.0004, 0.0014),
  });
}

/* ==========================================================
   FLOOR GRID
========================================================== */

const grid = new THREE.GridHelper(
  24,

  24,

  0x5367ff,

  0x2a2c36,
);

grid.position.y = -2.5;

grid.material.transparent = true;

grid.material.opacity = 0.26;

scene.add(grid);

/* ==========================================================
   PARTICLES
========================================================== */

const particleCount = 300;

const particleGeometry = new THREE.BufferGeometry();

const particlePositions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  particlePositions[i] = THREE.MathUtils.randFloatSpread(18);
}

particleGeometry.setAttribute(
  "position",

  new THREE.BufferAttribute(particlePositions, 3),
);

const particleMaterial = new THREE.PointsMaterial({
  color: 0xf2ede5,

  size: 0.018,

  transparent: true,

  opacity: 0.35,
});

const particles = new THREE.Points(
  particleGeometry,

  particleMaterial,
);

scene.add(particles);

/* ==========================================================
   LIGHTS
========================================================== */

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);

scene.add(ambientLight);

const blueLight = new THREE.PointLight(
  0x5367ff,

  50,

  15,
);

blueLight.position.set(4, 4, 5);

scene.add(blueLight);

const clayLight = new THREE.PointLight(
  0xe5835d,

  35,

  12,
);

clayLight.position.set(-4, 1, 4);

scene.add(clayLight);

const rimLight = new THREE.DirectionalLight(
  0xffffff,

  2,
);

rimLight.position.set(0, 5, -3);

scene.add(rimLight);

/* ==========================================================
   BUILDING DEFAULT POSITION
========================================================== */

building.rotation.x = -0.12;

building.rotation.y = -0.48;

building.position.x = 0.7;

building.position.y = 0.2;

/* ==========================================================
   MOUSE
========================================================== */

const mouse = {
  x: 0,
  y: 0,
};

const targetMouse = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  targetMouse.x = (event.clientX / window.innerWidth - 0.5) * 2;

  targetMouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
});

/* ==========================================================
   SCROLL
========================================================== */

let scrollProgress = 0;

window.addEventListener("scroll", () => {
  scrollProgress = Math.min(
    window.scrollY / window.innerHeight,

    1.5,
  );
});

/* ==========================================================
   ANIMATION LOOP
========================================================== */

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  /* Smooth mouse */

  mouse.x += (targetMouse.x - mouse.x) * 0.04;

  mouse.y += (targetMouse.y - mouse.y) * 0.04;

  /* building interaction */

  building.rotation.y = -0.48 + mouse.x * 0.16 + scrollProgress * 0.25;

  building.rotation.x = -0.12 + mouse.y * 0.08;

  building.position.y =
    0.2 + Math.sin(elapsed * 0.65) * 0.08 - scrollProgress * 0.5;

  /* camera */

  camera.position.x = mouse.x * 0.25;

  camera.position.y = 1 - mouse.y * 0.12 + scrollProgress * 0.2;

  /* grid movement */

  grid.position.z = (elapsed * 0.15) % 1;

  /* floating elements */

  slabs.forEach((item, index) => {
    item.mesh.rotation.x += item.speed;

    item.mesh.rotation.y += item.speed * 0.7;

    item.mesh.position.y += Math.sin(elapsed * 0.4 + index) * 0.0006;
  });

  particles.rotation.y = elapsed * 0.008;

  renderer.render(scene, camera);
}

animate();

/* ==========================================================
   RESIZE
========================================================== */

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/* ==========================================================
   NAVBAR
========================================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 70);
});

/* ==========================================================
   MOBILE MENU
========================================================== */

const mobileMenu = document.getElementById("mobileMenu");

const menuTrigger = document.getElementById("menuTrigger");

const closeMenu = document.getElementById("closeMenu");

menuTrigger.addEventListener("click", () => {
  mobileMenu.classList.add("active");

  document.body.classList.add("menu-open");
});

function closeMobileMenu() {
  mobileMenu.classList.remove("active");

  document.body.classList.remove("menu-open");
}

closeMenu.addEventListener("click", closeMobileMenu);

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

/* ==========================================================
   CUSTOM POINTER
========================================================== */

const pointerDot = document.getElementById("pointerDot");

const pointerRing = document.getElementById("pointerRing");

let cursorX = 0;
let cursorY = 0;

let ringX = 0;
let ringY = 0;

window.addEventListener("mousemove", (event) => {
  cursorX = event.clientX;

  cursorY = event.clientY;

  pointerDot.style.left = `${cursorX}px`;

  pointerDot.style.top = `${cursorY}px`;
});

function cursorAnimation() {
  ringX += (cursorX - ringX) * 0.14;

  ringY += (cursorY - ringY) * 0.14;

  pointerRing.style.left = `${ringX}px`;

  pointerRing.style.top = `${ringY}px`;

  requestAnimationFrame(cursorAnimation);
}

cursorAnimation();

/* image cursor */

document.querySelectorAll(".hover-target").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    pointerRing.classList.add("image-mode");
  });

  element.addEventListener("mouseleave", () => {
    pointerRing.classList.remove("image-mode");
  });
});

/* ==========================================================
   MAGNETIC BUTTONS
========================================================== */

document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 800) {
      return;
    }

    const rect = element.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;

    const y = event.clientY - rect.top - rect.height / 2;

    element.style.transform = `translate(
                        ${x * 0.17}px,
                        ${y * 0.17}px
                    )`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "translate(0,0)";
  });
});

/* ==========================================================
   REVEALS
========================================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* ==========================================================
   IMAGE PARALLAX
========================================================== */

const propertyImages = document.querySelectorAll(".property-image img");

function imageParallax() {
  propertyImages.forEach((image) => {
    const parent = image.parentElement;

    const rect = parent.getBoundingClientRect();

    const center = rect.top + rect.height / 2;

    const difference = center - window.innerHeight / 2;

    const move = difference * -0.025;

    image.style.transform = `
                scale(1.08)
                translateY(${move}px)
                `;
  });
}

window.addEventListener("scroll", imageParallax, {
  passive: true,
});

/* ==========================================================
   COUNTERS
========================================================== */

const counters = document.querySelectorAll(".counter");

const numberSection = document.querySelector(".numbers-section");

let counterStarted = false;

const numberObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !counterStarted) {
      counterStarted = true;

      startCounters();
    }
  },

  {
    threshold: 0.3,
  },
);

numberObserver.observe(numberSection);

function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);

    const duration = 1600;

    const start = performance.now();

    function update(time) {
      const progress = Math.min(
        (time - start) / duration,

        1,
      );

      const eased = 1 - Math.pow(1 - progress, 4);

      const value = Math.floor(target * eased);

      counter.textContent = String(value).padStart(target > 99 ? 3 : 2, "0");

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

/* ==========================================================
   PLACE ROW INTERACTION
========================================================== */

document.querySelectorAll(".place-row").forEach((row) => {
  row.addEventListener("mouseenter", () => {
    const place = row.dataset.location;

    console.log(`Exploring ${place}`);
  });
});

/* ==========================================================
   BACK TO TOP
========================================================== */

document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});
