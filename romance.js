/* ==========================================
   ROOM 04 — ROMANCE
========================================== */


/* ==========================================
   OUTILS
========================================== */

function clamp(value, minimum, maximum) {
  return Math.min(
    Math.max(value, minimum),
    maximum
  );
}


function range(progress, start, end) {
  return clamp(
    (progress - start) /
    (end - start),
    0,
    1
  );
}


/* ==========================================
   ÉLÉMENTS
========================================== */

const page =
  document.querySelector(
    ".romance-page"
  );


const gate =
  document.querySelector(
    "#experience-gate"
  );


const enterWithSound =
  document.querySelector(
    "#enter-with-sound"
  );


const enterWithoutSound =
  document.querySelector(
    "#enter-without-sound"
  );


const soundControl =
  document.querySelector(
    "#sound-control"
  );


const sentence =
  document.querySelector(
    "#romance-sentence"
  );


const researchNote =
  document.querySelector(
    "#research-note"
  );


const researchNumber =
  document.querySelector(
    "#research-number"
  );


const researchText =
  document.querySelector(
    "#research-text"
  );


const researchPrinciple =
  document.querySelector(
    "#research-principle"
  );


const researchSource =
  document.querySelector(
    "#research-source"
  );


const dreamTitle =
  document.querySelector(
    "#dream-title"
  );


const emotionalCore =
  document.querySelector(
    "#emotional-core"
  );


const dreamMotif =
  document.querySelector(
    "#dream-motif"
  );


const progressFill =
  document.querySelector(
    "#scroll-progress-fill"
  );


const scrollInstruction =
  document.querySelector(
    "#scroll-instruction"
  );


const finalFlash =
  document.querySelector(
    "#final-flash"
  );


const enterAction =
  document.querySelector(
    "#enter-action"
  );


/* ==========================================
   NARRATION
========================================== */

const narrationSteps = [
  {
    start: 0.1,

    text:
      "You know them <em>before you see their face.</em>",

    title:
      "THE FAMILIAR STRANGER",

    emotion:
      "RECOGNITION",

    motif:
      "DISTANCE"
  },

  {
    start: 0.21,

    text:
      "The face keeps changing. <em>This feeling… you recognize it every time.</em>",

    title:
      "THE CHANGING FACE",

    emotion:
      "FAMILIARITY",

    motif:
      "IDENTITY"
  },

  {
    start: 0.34,

    text:
      "The room grows warmer <em>as the distance between you disappears.</em>",

    title:
      "THE WARM ROOM",

    emotion:
      "INTIMACY",

    motif:
      "APPROACH"
  },

  {
    start: 0.47,

    text:
      "You are standing in the same dream. <em>You may not be having the same one.</em>",

    title:
      "TWO INNER WORLDS",

    emotion:
      "CONNECTION",

    motif:
      "DIFFERENCE"
  },

  {
    start: 0.57,

    text:
      "You may only discover what it left behind <em>when you wake up.</em>",

    title:
      "THE FOLLOWING MORNING",

    emotion:
      "AFTER-EFFECT",

    motif:
      "WAKING"
  },

  {
    start: 0.66,

    text:
      "Then another presence <em>enters the room.</em>",

    title:
      "THE THIRD PRESENCE",

    emotion:
      "SUSPICION",

    motif:
      "INTRUSION"
  },

  {
    start: 0.74,

    text:
      "The closer you move, <em>the clearer it becomes.</em>",

    title:
      "THE RED THREAD",

    emotion:
      "JEALOUSY",

    motif:
      "DIVISION"
  },

  {
    start: 0.82,

    text:
      "It is not <em>a good feeling.</em>",

    title:
      "THE RED ROOM",

    emotion:
      "JEALOUSY",

    motif:
      "DISCOMFORT"
  }
];


const researchSteps = [
  {
    start: 0.12,
    end: 0.29,

    number:
      "RESEARCH NOTE 04.1",

    text:
      "At least one social situation was identified in 83.5% of the analysed dream reports.",

    principle:
      "SOCIAL DREAMING",

    source:
      "https://pubmed.ncbi.nlm.nih.gov/30769273/"
  },

  {
    start: 0.3,
    end: 0.46,

    number:
      "RESEARCH NOTE 04.2",

    text:
      "Across 1,612 dream reports, current partners appeared more frequently than former partners.",

    principle:
      "PARTNERS & EX-PARTNERS",

    source:
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC8161826/"
  },

  {
    start: 0.47,
    end: 0.65,

    number:
      "RESEARCH NOTE 04.3",

    text:
      "Emotions involving romantic partners in dreams were associated with relationship behaviour the following day.",

    principle:
      "AFTER WAKING",

    source:
      "https://journals.sagepub.com/doi/10.1177/1948550613486678"
  },

  {
    start: 0.66,
    end: 0.86,

    number:
      "RESEARCH NOTE 04.4",

    text:
      "In a two-week diary study, jealousy experienced in dreams was associated with greater conflict the following day.",

    principle:
      "DREAMED JEALOUSY",

    source:
      "https://journals.sagepub.com/doi/10.1177/1948550613486678"
  }
];


let currentNarrationIndex = -1;

let sentenceTimeout;

let finalImpactPlayed = false;


/* ==========================================
   TEXTE
========================================== */

function displaySentence(index) {
  if (
    index < 0 ||
    index === currentNarrationIndex
  ) {
    return;
  }


  currentNarrationIndex =
    index;


  window.clearTimeout(
    sentenceTimeout
  );


  sentence.classList.add(
    "changing"
  );


  sentenceTimeout =
    window.setTimeout(
      function () {
        const step =
          narrationSteps[index];


        sentence.innerHTML =
          step.text;


        dreamTitle.textContent =
          step.title;


        emotionalCore.textContent =
          step.emotion;


        dreamMotif.textContent =
          step.motif;


        sentence.classList.remove(
          "changing"
        );
      },
      420
    );
}


/* ==========================================
   RECHERCHE
========================================== */

function updateResearch(progress) {
  const activeResearch =
    researchSteps.find(
      function (research) {
        return (
          progress >= research.start &&
          progress < research.end
        );
      }
    );


  if (!activeResearch) {
    researchNote.classList.remove(
      "visible"
    );

    return;
  }


  researchNumber.textContent =
    activeResearch.number;


  researchText.textContent =
    activeResearch.text;


  researchPrinciple.textContent =
    activeResearch.principle;


  researchSource.href =
    activeResearch.source;


  researchNote.classList.add(
    "visible"
  );
}


/* ==========================================
   AUDIO
========================================== */

let audioContext = null;

let masterGain = null;

let ambienceGain = null;

let warmGain = null;

let tensionGain = null;

let soundEnabled = false;

let heartbeatTimeout = null;

let currentProgress = 0;

let currentWarmth = 0;

let currentJealousy = 0;


/* Créer une piste de bruit */

function createNoiseBuffer() {
  const length =
    audioContext.sampleRate * 3;


  const buffer =
    audioContext.createBuffer(
      1,
      length,
      audioContext.sampleRate
    );


  const data =
    buffer.getChannelData(0);


  for (
    let index = 0;
    index < length;
    index++
  ) {
    data[index] =
      Math.random() * 2 - 1;
  }


  return buffer;
}


/* Créer une nappe */

function createDrone(
  frequency,
  volume,
  destination
) {
  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  oscillator.type =
    "sine";


  oscillator.frequency.value =
    frequency;


  gain.gain.value =
    volume;


  oscillator.connect(gain);

  gain.connect(destination);

  oscillator.start();


  return {
    oscillator: oscillator,
    gain: gain
  };
}


/* Construire l’installation sonore */

async function startAudio() {
  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;


    if (!AudioContextClass) {
      soundControl.textContent =
        "SOUND UNAVAILABLE";

      return;
    }


    audioContext =
      new AudioContextClass();


    masterGain =
      audioContext.createGain();


    masterGain.gain.value =
      0.0001;


    masterGain.connect(
      audioContext.destination
    );


    /* Souffle de la salle */

    const noise =
      audioContext.createBufferSource();


    const noiseFilter =
      audioContext.createBiquadFilter();


    ambienceGain =
      audioContext.createGain();


    noise.buffer =
      createNoiseBuffer();


    noise.loop = true;


    noiseFilter.type =
      "lowpass";


    noiseFilter.frequency.value =
      720;


    ambienceGain.gain.value =
      0.055;


    noise.connect(
      noiseFilter
    );


    noiseFilter.connect(
      ambienceGain
    );


    ambienceGain.connect(
      masterGain
    );


    noise.start();


    /* Nappe chaleureuse */

    warmGain =
      audioContext.createGain();


    warmGain.gain.value =
      0.0001;


    warmGain.connect(
      masterGain
    );


    createDrone(
      110,
      0.2,
      warmGain
    );


    createDrone(
      164.81,
      0.09,
      warmGain
    );


    createDrone(
      220,
      0.05,
      warmGain
    );


    /* Tension rouge */

    tensionGain =
      audioContext.createGain();


    tensionGain.gain.value =
      0.0001;


    tensionGain.connect(
      masterGain
    );


    createDrone(
      43,
      0.32,
      tensionGain
    );


    createDrone(
      46,
      0.18,
      tensionGain
    );
  }


  await audioContext.resume();


  soundEnabled = true;


  masterGain.gain.cancelScheduledValues(
    audioContext.currentTime
  );


  masterGain.gain.linearRampToValueAtTime(
    0.42,
    audioContext.currentTime + 1.4
  );


  soundControl.textContent =
    "SOUND ON";


  soundControl.setAttribute(
    "aria-pressed",
    "true"
  );


  scheduleHeartbeat();

  updateAudioScene();
}


/* Mise à jour sonore */

function updateAudioScene() {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const now =
    audioContext.currentTime;


  ambienceGain.gain.setTargetAtTime(
    0.045 +
    currentProgress * 0.04,
    now,
    0.35
  );


  warmGain.gain.setTargetAtTime(
    0.0001 +
    currentWarmth * 0.18,
    now,
    0.5
  );


  tensionGain.gain.setTargetAtTime(
    0.0001 +
    currentJealousy * 0.34,
    now,
    0.22
  );
}


/* Battement du cœur */

function playHeartbeat(
  strength = 1
) {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const now =
    audioContext.currentTime;


  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  const filter =
    audioContext.createBiquadFilter();


  oscillator.type =
    "sine";


  oscillator.frequency.setValueAtTime(
    72,
    now
  );


  oscillator.frequency.exponentialRampToValueAtTime(
    42,
    now + 0.19
  );


  filter.type =
    "lowpass";


  filter.frequency.value =
    150;


  gain.gain.setValueAtTime(
    0.0001,
    now
  );


  gain.gain.exponentialRampToValueAtTime(
    0.25 * strength,
    now + 0.018
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.24
  );


  oscillator.connect(
    filter
  );


  filter.connect(
    gain
  );


  gain.connect(
    masterGain
  );


  oscillator.start(now);

  oscillator.stop(
    now + 0.26
  );
}


/* Double battement */

function heartbeatSequence() {
  if (!soundEnabled) {
    return;
  }


  const strength =
    0.58 +
    currentProgress * 0.45 +
    currentJealousy * 0.72;


  playHeartbeat(strength);


  window.setTimeout(
    function () {
      playHeartbeat(
        strength * 0.7
      );
    },
    currentJealousy > 0.35
      ? 170
      : 230
  );


  scheduleHeartbeat();
}


/* Rythme selon la narration */

function scheduleHeartbeat() {
  window.clearTimeout(
    heartbeatTimeout
  );


  if (!soundEnabled) {
    return;
  }


  const delay =
    1450 -
    currentProgress * 280 -
    currentJealousy * 620;


  heartbeatTimeout =
    window.setTimeout(
      heartbeatSequence,
      Math.max(520, delay)
    );
}


/* Impact final */

function playFinalImpact() {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const now =
    audioContext.currentTime;


  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  oscillator.type =
    "sine";


  oscillator.frequency.setValueAtTime(
    95,
    now
  );


  oscillator.frequency.exponentialRampToValueAtTime(
    28,
    now + 0.85
  );


  gain.gain.setValueAtTime(
    0.0001,
    now
  );


  gain.gain.exponentialRampToValueAtTime(
    0.72,
    now + 0.025
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 1.05
  );


  oscillator.connect(
    gain
  );


  gain.connect(
    masterGain
  );


  oscillator.start(now);

  oscillator.stop(
    now + 1.1
  );


  playHeartbeat(1.9);
}


/* Couper ou rallumer */

function stopAudio() {
  soundEnabled = false;


  window.clearTimeout(
    heartbeatTimeout
  );


  if (audioContext) {
    masterGain.gain.setTargetAtTime(
      0.0001,
      audioContext.currentTime,
      0.12
    );
  }


  soundControl.textContent =
    "SOUND OFF";


  soundControl.setAttribute(
    "aria-pressed",
    "false"
  );
}


soundControl.addEventListener(
  "click",
  async function () {
    if (soundEnabled) {
      stopAudio();
    } else {
      await startAudio();
    }
  }
);


/* ==========================================
   ENTRÉE
========================================== */

function enterExperience() {
  gate.classList.add(
    "hidden"
  );


  document.body.classList.add(
    "experience-started"
  );
}


enterWithSound.addEventListener(
  "click",
  async function () {
    enterExperience();

    await startAudio();
  }
);


enterWithoutSound.addEventListener(
  "click",
  function () {
    enterExperience();

    stopAudio();
  }
);


/* ==========================================
   SCROLL
========================================== */

function updateRomance() {
  const maximumScroll =
    document.documentElement.scrollHeight -
    window.innerHeight;


  const progress =
    maximumScroll > 0
      ? clamp(
          window.scrollY /
          maximumScroll,
          0,
          1
        )
      : 0;


  const approach =
    range(
      progress,
      0.08,
      0.58
    );


  const warmth =
    range(
      progress,
      0.27,
      0.53
    ) *
    (
      1 -
      range(
        progress,
        0.62,
        0.77
      ) *
      0.6
    );


  const jealousy =
    range(
      progress,
      0.62,
      0.84
    );


  const ending =
    range(
      progress,
      0.87,
      0.96
    );


  currentProgress =
    progress;


  currentWarmth =
    warmth;


  currentJealousy =
    jealousy;


  page.style.setProperty(
    "--progress",
    progress
  );


  page.style.setProperty(
    "--approach",
    approach
  );


  page.style.setProperty(
    "--warmth",
    warmth
  );


  page.style.setProperty(
    "--jealousy",
    jealousy
  );


  page.style.setProperty(
    "--ending",
    ending
  );


  progressFill.style.height =
    progress * 100 + "%";


  let nextIndex = -1;


  narrationSteps.forEach(
    function (step, index) {
      if (
        progress >= step.start
      ) {
        nextIndex = index;
      }
    }
  );


  displaySentence(
    nextIndex
  );


  updateResearch(
    progress
  );


  if (
    progress >= 0.62 &&
    progress < 0.87
  ) {
    page.classList.add(
      "phase-jealousy"
    );
  } else {
    page.classList.remove(
      "phase-jealousy"
    );
  }


  if (
    progress >= 0.87
  ) {
    page.classList.add(
      "phase-ending"
    );


    sentence.style.visibility =
      "hidden";


    if (!finalImpactPlayed) {
      finalImpactPlayed = true;


      finalFlash.classList.remove(
        "active"
      );


      void finalFlash.offsetWidth;


      finalFlash.classList.add(
        "active"
      );


      playFinalImpact();
    }
  } else {
    page.classList.remove(
      "phase-ending"
    );


    sentence.style.visibility =
      "visible";


    finalImpactPlayed = false;
  }


  if (progress < 0.12) {
    scrollInstruction.textContent =
      "APPROACH THE FIGURE";
  } else if (progress < 0.36) {
    scrollInstruction.textContent =
      "CROSS THE DISTANCE";
  } else if (progress < 0.62) {
    scrollInstruction.textContent =
      "STAY IN THE DREAM";
  } else if (progress < 0.87) {
    scrollInstruction.textContent =
      "FOLLOW THE RED THREAD";
  } else {
    scrollInstruction.textContent =
      "FOLLOW THE PULSE";
  }


  updateAudioScene();
}


/* ==========================================
   PARTICULES
========================================== */

const canvas =
  document.querySelector(
    "#romance-canvas"
  );


const context =
  canvas.getContext(
    "2d"
  );


let canvasWidth = 0;

let canvasHeight = 0;

let particles = [];


function createParticles() {
  particles = [];


  const amount =
    window.innerWidth < 700
      ? 42
      : 78;


  for (
    let index = 0;
    index < amount;
    index++
  ) {
    particles.push({
      x:
        Math.random() *
        canvasWidth,

      y:
        Math.random() *
        canvasHeight,

      radius:
        0.6 +
        Math.random() *
        1.6,

      speed:
        0.1 +
        Math.random() *
        0.35,

      phase:
        Math.random() *
        Math.PI *
        2,

      opacity:
        0.18 +
        Math.random() *
        0.5
    });
  }
}


function resizeCanvas() {
  const pixelRatio =
    Math.min(
      window.devicePixelRatio || 1,
      1.5
    );


  canvasWidth =
    window.innerWidth;


  canvasHeight =
    window.innerHeight;


  canvas.width =
    canvasWidth *
    pixelRatio;


  canvas.height =
    canvasHeight *
    pixelRatio;


  context.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );


  createParticles();
}


function animateParticles(time) {
  context.clearRect(
    0,
    0,
    canvasWidth,
    canvasHeight
  );


  particles.forEach(
    function (particle) {
      const speedBoost =
        1 +
        currentJealousy *
        4;


      particle.y -=
        particle.speed *
        speedBoost;


      particle.x +=
        Math.sin(
          time * 0.001 +
          particle.phase
        ) *
        (
          0.08 +
          currentJealousy *
          0.5
        );


      if (
        particle.y < -10
      ) {
        particle.y =
          canvasHeight + 10;


        particle.x =
          Math.random() *
          canvasWidth;
      }


      const pulse =
        0.62 +
        Math.sin(
          time * 0.002 +
          particle.phase
        ) *
        0.38;


      context.beginPath();


      context.arc(
        particle.x,
        particle.y,
        particle.radius +
        currentJealousy * 0.8,
        0,
        Math.PI * 2
      );


      context.fillStyle =
        currentJealousy > 0.05

          ? "rgba(255,53,87," +
            particle.opacity *
            pulse +
            ")"

          : currentWarmth > 0.2

            ? "rgba(255,201,166," +
              particle.opacity *
              pulse +
              ")"

            : "rgba(255,248,238," +
              particle.opacity *
              pulse +
              ")";


      context.fill();
    }
  );


  window.requestAnimationFrame(
    animateParticles
  );
}


/* ==========================================
   SOURIS
========================================== */

window.addEventListener(
  "pointermove",
  function (event) {
    const horizontal =
      event.clientX /
      window.innerWidth -
      0.5;


    const vertical =
      event.clientY /
      window.innerHeight -
      0.5;


    page.style.setProperty(
      "--pointer-x",
      horizontal * 15 + "px"
    );


    page.style.setProperty(
      "--pointer-y",
      vertical * 9 + "px"
    );
  },
  {
    passive: true
  }
);


/* ==========================================
   TRANSITION VERS ACTION
========================================== */

enterAction.addEventListener(
  "click",
  function (event) {
    event.preventDefault();


    if (
      page.classList.contains(
        "entering-action"
      )
    ) {
      return;
    }


    page.classList.add(
      "entering-action"
    );


    playFinalImpact();


    window.setTimeout(
      function () {
        window.location.href =
          "action.html";
      },
      1350
    );
  }
);


/* ==========================================
   INITIALISATION
========================================== */

resizeCanvas();

updateRomance();


window.requestAnimationFrame(
  animateParticles
);


window.addEventListener(
  "scroll",
  updateRomance,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  function () {
    resizeCanvas();

    updateRomance();
  }
);
