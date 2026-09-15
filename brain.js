/* THE MUSEUM OF DREAMS — PAGE 03 */

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function range(progress, start, end) {
  return clamp((progress - start) / (end - start), 0, 1);
}

function smooth(value) {
  return value * value * (3 - 2 * value);
}

const page = document.querySelector(".brain-page");
const sentence = document.querySelector("#brain-sentence");
const progressFill = document.querySelector("#brain-progress-fill");
const moveMessage = document.querySelector("#move-message");
const memorySignal = document.querySelector("#memory-signal");
const emotionSignal = document.querySelector("#emotion-signal");
const sensorySignal = document.querySelector("#sensory-signal");
const spaceSignal = document.querySelector("#space-signal");
const firstRoom = document.querySelector("#first-room");

const sentences = [
  { start: 0, text: "THE OUTSIDE WORLD <em>IS GONE.</em>" },
  { start: 0.13, text: "You are inside <em>the mind.</em>" },
  { start: 0.27, text: "A dream is never <em>made from nothing.</em>" },
  { start: 0.4, text: "Memory leaves <em>fragments.</em>" },
  { start: 0.53, text: "Emotion changes <em>their shape.</em>" },
  { start: 0.66, text: "The sleeping mind <em>rearranges them.</em>" },
  { start: 0.77, text: "Until a thought <em>becomes a world.</em>" }
];

let currentSentence = 0;
let sentenceTimer = null;
let ticking = false;
window.mindEnergy = 0;

function changeSentence(index) {
  if (index === currentSentence) return;

  currentSentence = index;
  window.clearTimeout(sentenceTimer);
  sentence.classList.add("changing");

  sentenceTimer = window.setTimeout(function () {
    sentence.innerHTML = sentences[index].text;
    sentence.classList.remove("changing");
  }, 320);
}

function updateJourney() {
  const maximumScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = clamp(window.scrollY / maximumScroll, 0, 1);

  let selected = 0;
  for (let index = 0; index < sentences.length; index++) {
    if (progress >= sentences[index].start) selected = index;
  }
  changeSentence(selected);

  const fragments = smooth(range(progress, 0.22, 0.42)) * (1 - smooth(range(progress, 0.69, 0.84)));
  const architecture = smooth(range(progress, 0.68, 0.88));
  const reveal = smooth(range(progress, 0.86, 0.97));

  page.style.setProperty("--journey", progress);
  page.style.setProperty("--fragment-opacity", fragments);
  page.style.setProperty("--architecture-opacity", architecture);
  page.style.setProperty("--architecture-scale", 0.72 + architecture * 0.28);
  page.style.setProperty("--reveal-opacity", reveal);

  window.mindEnergy = smooth(range(progress, 0.2, 0.82));

  progressFill.style.height = progress * 100 + "%";
  moveMessage.style.opacity = progress > 0.04 ? "0" : "0.46";

  if (progress < 0.25) {
    memorySignal.textContent = "DORMANT";
    emotionSignal.textContent = "LOW";
    sensorySignal.textContent = "EXTERNAL";
    spaceSignal.textContent = "UNFORMED";
  } else if (progress < 0.5) {
    memorySignal.textContent = "FRAGMENTED";
    emotionSignal.textContent = "RISING";
    sensorySignal.textContent = "FADING";
    spaceSignal.textContent = "UNFORMED";
  } else if (progress < 0.78) {
    memorySignal.textContent = "RECOMBINING";
    emotionSignal.textContent = "ACTIVE";
    sensorySignal.textContent = "INTERNAL";
    spaceSignal.textContent = "FORMING";
  } else {
    memorySignal.textContent = "INTEGRATED";
    emotionSignal.textContent = "IMMERSED";
    sensorySignal.textContent = "INTERNAL";
    spaceSignal.textContent = "OPEN";
  }

  if (progress >= 0.86) {
    page.classList.add("reveal-active");
    sentence.classList.add("hidden");
  } else {
    page.classList.remove("reveal-active");
    sentence.classList.remove("hidden");
  }

  ticking = false;
}

function requestJourneyUpdate() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(updateJourney);
}

window.addEventListener("scroll", requestJourneyUpdate, { passive: true });
window.addEventListener("resize", requestJourneyUpdate, { passive: true });
updateJourney();

/* PARALLAXE LÉGÈRE */
window.addEventListener("pointermove", function (event) {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  page.style.setProperty("--pointer-x", x * 9 + "px");
  page.style.setProperty("--pointer-y", y * 7 + "px");
}, { passive: true });

/* POUSSIÈRE — 30 FPS, 60 PARTICULES MAXIMUM */
function initialiseMindDust() {
  const canvas = document.querySelector("#mind-dust");
  if (!canvas || !canvas.getContext) return;

  const context = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let particles = [];
  let previousFrame = 0;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    particles = [];
    const total = width < 700 ? 34 : 60;

    for (let index = 0; index < total; index++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: 40 + Math.random() * Math.min(width, height) * 0.46,
        size: 0.4 + Math.random() * 1.4,
        speed: 0.06 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.2 + Math.random() * 0.65,
        warm: Math.random() < 0.22
      });
    }
  }

  function draw(time) {
    window.requestAnimationFrame(draw);
    if (time - previousFrame < 33) return;
    previousFrame = time;

    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "lighter";

    const energy = window.mindEnergy || 0;
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    for (const particle of particles) {
      const orbit = particle.angle + time * 0.0001 * particle.speed * (1 + energy * 3);
      const pull = 1 - energy * 0.58;
      const x = centerX + Math.cos(orbit) * particle.distance * pull;
      const y = centerY + Math.sin(orbit) * particle.distance * 0.66 * pull;
      const pulse = 0.55 + Math.sin(time * 0.002 + particle.phase) * 0.45;

      context.beginPath();
      context.arc(x, y, particle.size * (0.7 + pulse * 0.5), 0, Math.PI * 2);
      context.fillStyle = particle.warm
        ? "rgba(255,226,170," + particle.opacity * pulse + ")"
        : "rgba(211,190,255," + particle.opacity * pulse + ")";
      context.fill();
    }
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.requestAnimationFrame(draw);
}

try {
  initialiseMindDust();
} catch (error) {
  console.warn("Mind dust unavailable:", error);
}

/* ENTRÉE DANS LA PREMIÈRE SALLE */
if (firstRoom) {
  firstRoom.addEventListener("click", function (event) {
    event.preventDefault();
    if (page.classList.contains("leaving")) return;

    page.classList.add("leaving");
    window.setTimeout(function () {
      window.location.href = "everyday.html";
    }, 1250);
  });
}
