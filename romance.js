/* ==========================================
   ROOM 04 — ROMANCE V3
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
   NARRATION DÉFINITIVE
========================================== */

const narrationSteps = [
  {
    start: 0.15,

    text:
      "You cannot see who they are. <em>But something feels familiar.</em>",

    title:
      "THE FAMILIAR PRESENCE",

    emotion:
      "RECOGNITION",

    motif:
      "DISTANCE"
  },

  {
    start: 0.19,

    text:
      "You move closer. <em>The room grows warmer.</em>",

    title:
      "THE WARM ROOM",

    emotion:
      "ATTRACTION",

    motif:
      "APPROACH"
  },

  {
    start: 0.29,

    text:
      "For a moment, <em>you seem to be in the same dream.</em>",

    title:
      "THE SHARED DREAM",

    emotion:
      "INTIMACY",

    motif:
      "CONNECTION"
  },

  {
    start: 0.39,

    text:
      "But the two lights do not move <em>in quite the same way.</em>",

    title:
      "TWO INNER WORLDS",

    emotion:
      "UNCERTAINTY",

    motif:
      "DIFFERENCE"
  },

  {
    start: 0.49,

    text:
      "Perhaps you are together. <em>Perhaps you are only dreaming of each other.</em>",

    title:
      "THE DISTANCE BETWEEN US",

    emotion:
      "LONGING",

    motif:
      "SEPARATION"
  },

  {
    start: 0.59,

    text:
      "Whatever happens here <em>may follow you into the morning.</em>",

    title:
      "THE FOLLOWING MORNING",

    emotion:
      "AFTER-EFFECT",

    motif:
      "MEMORY"
  },

  {
    start: 0.68,

    text:
      "Then a third light <em>appears.</em>",

    title:
      "THE THIRD LIGHT",

    emotion:
      "SUSPICION",

    motif:
      "INTRUSION"
  },

  {
    start: 0.745,

    text:
      "You do not know <em>who it belongs to.</em>",

    title:
      "THE UNKNOWN PRESENCE",

    emotion:
      "DOUBT",

    motif:
      "INTRUSION"
  },

  {
    start: 0.795,

    text:
      "The warmth <em>has changed.</em>",

    title:
      "THE CHANGING ROOM",

    emotion:
      "JEALOUSY",

    motif:
      "TRANSFORMATION"
  },

  {
    start: 0.84,

    text:
      "It is not <em>a good feeling.</em>",

    title:
      "THE RED ROOM",

    emotion:
      "JEALOUSY",

    motif:
      "DISCOMFORT"
  },

  {
    start: 0.88,

    text:
      "THAT IS ENOUGH.",

    title:
      "THAT IS ENOUGH",

    emotion:
      "OVERLOAD",

    motif:
      "HEARTBEAT",

    impact:
      true
  }
];


const researchSteps = [
  {
    start: 0.1,
    end: 0.28,

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
    start: 0.29,
    end: 0.48,

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
    start: 0.49,
    end: 0.675,

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
    start: 0.68,
    end: 0.875,

    number:
      "RESEARCH NOTE 04.4",

    text:
      "Jealousy experienced in dreams was associated with greater conflict the following day.",

    principle:
      "DREAMED JEALOUSY",

    source:
      "https://journals.sagepub.com/doi/10.1177/1948550613486678"
  }
];


let currentNarrationIndex = -1;

let narrationTimeout;

let thirdLightImpactPlayed = false;

let enoughImpactPlayed = false;

let finalStormPlayed = false;


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
    narrationTimeout
  );


  sentence.classList.add(
    "changing"
  );


  narrationTimeout =
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


        sentence.classList.toggle(
          "is-impact",
          Boolean(step.impact)
        );


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

let compressor = null;

let ambienceGain = null;

let warmthGain = null;

let tensionGain = null;

let highTensionGain = null;

let soundEnabled = false;

let heartbeatTimer = null;

let currentProgress = 0;

let currentWarmth = 0;

let currentJealousy = 0;


/* Créer du bruit */

function createNoiseBuffer(duration = 3) {
  const length =
    audioContext.sampleRate *
    duration;


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


/* Créer une note continue */

function createDrone(
  frequency,
  volume,
  destination,
  type = "sine"
) {
  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  oscillator.type =
    type;


  oscillator.frequency.value =
    frequency;


  gain.gain.value =
    volume;


  oscillator.connect(
    gain
  );


  gain.connect(
    destination
  );


  oscillator.start();


  return {
    oscillator: oscillator,
    gain: gain
  };
}


/* Activer le son */

async function startAudio() {
  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;


  if (!AudioContextClass) {
    soundControl.textContent =
      "SOUND UNAVAILABLE";

    return;
  }


  if (!audioContext) {
    audioContext =
      new AudioContextClass();


    /* Limiteur de sécurité */

    compressor =
      audioContext.createDynamicsCompressor();


    compressor.threshold.value =
      -19;


    compressor.knee.value =
      14;


    compressor.ratio.value =
      9;


    compressor.attack.value =
      0.004;


    compressor.release.value =
      0.26;


    masterGain =
      audioContext.createGain();


    masterGain.gain.value =
      0.0001;


    masterGain.connect(
      compressor
    );


    compressor.connect(
      audioContext.destination
    );


    /* Souffle de la pièce */

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
      "bandpass";


    noiseFilter.frequency.value =
      620;


    noiseFilter.Q.value =
      0.72;


    ambienceGain.gain.value =
      0.075;


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


    /* Respiration lente */

    const breathingLFO =
      audioContext.createOscillator();


    const breathingDepth =
      audioContext.createGain();


    breathingLFO.frequency.value =
      0.14;


    breathingDepth.gain.value =
      0.035;


    breathingLFO.connect(
      breathingDepth
    );


    breathingDepth.connect(
      ambienceGain.gain
    );


    breathingLFO.start();


    /* Harmonie chaude */

    warmthGain =
      audioContext.createGain();


    warmthGain.gain.value =
      0.0001;


    warmthGain.connect(
      masterGain
    );


    createDrone(
      110,
      0.24,
      warmthGain
    );


    createDrone(
      164.81,
      0.13,
      warmthGain
    );


    createDrone(
      220,
      0.065,
      warmthGain
    );


    createDrone(
      329.63,
      0.025,
      warmthGain
    );


    /* Grondement rouge */

    tensionGain =
      audioContext.createGain();


    tensionGain.gain.value =
      0.0001;


    tensionGain.connect(
      masterGain
    );


    createDrone(
      36,
      0.48,
      tensionGain
    );


    createDrone(
      40.5,
      0.34,
      tensionGain
    );


    createDrone(
      72,
      0.09,
      tensionGain,
      "triangle"
    );


    /* Dissonance aiguë */

    highTensionGain =
      audioContext.createGain();


    highTensionGain.gain.value =
      0.0001;


    highTensionGain.connect(
      masterGain
    );


    createDrone(
      182,
      0.055,
      highTensionGain,
      "sine"
    );


    createDrone(
      187,
      0.05,
      highTensionGain,
      "sine"
    );
  }


  await audioContext.resume();


  soundEnabled = true;


  masterGain.gain.cancelScheduledValues(
    audioContext.currentTime
  );


  masterGain.gain.setValueAtTime(
    0.0001,
    audioContext.currentTime
  );


  masterGain.gain.exponentialRampToValueAtTime(
    0.72,
    audioContext.currentTime + 1.1
  );


  soundControl.textContent =
    "SOUND ON";


  soundControl.setAttribute(
    "aria-pressed",
    "true"
  );


  updateAudioScene();

  scheduleHeartbeat();
}


/* Adapter l’ambiance au scroll */

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
    0.065 +
    currentProgress * 0.045 +
    currentJealousy * 0.08,
    now,
    0.22
  );


  warmthGain.gain.setTargetAtTime(
    0.0001 +
    currentWarmth * 0.29,
    now,
    0.32
  );


  tensionGain.gain.setTargetAtTime(
    0.0001 +
    currentJealousy * 0.56,
    now,
    0.13
  );


  highTensionGain.gain.setTargetAtTime(
    0.0001 +
    Math.pow(
      currentJealousy,
      2
    ) *
    0.22,
    now,
    0.12
  );
}


/* Battement */

function playHeartbeat(
  strength = 1,
  pan = 0
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


  const panner =
    audioContext.createStereoPanner
      ? audioContext.createStereoPanner()
      : null;


  oscillator.type =
    "sine";


  oscillator.frequency.setValueAtTime(
    96,
    now
  );


  oscillator.frequency.exponentialRampToValueAtTime(
    31,
    now + 0.33
  );


  filter.type =
    "lowpass";


  filter.frequency.value =
    175;


  gain.gain.setValueAtTime(
    0.0001,
    now
  );


  gain.gain.exponentialRampToValueAtTime(
    Math.min(
      0.95,
      0.38 * strength
    ),
    now + 0.012
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.36
  );


  oscillator.connect(
    filter
  );


  filter.connect(
    gain
  );


  if (panner) {
    panner.pan.value =
      clamp(
        pan,
        -1,
        1
      );


    gain.connect(
      panner
    );


    panner.connect(
      masterGain
    );
  } else {
    gain.connect(
      masterGain
    );
  }


  oscillator.start(now);

  oscillator.stop(
    now + 0.38
  );


  /* Coup organique */

  const noise =
    audioContext.createBufferSource();


  const noiseFilter =
    audioContext.createBiquadFilter();


  const noiseGain =
    audioContext.createGain();


  noise.buffer =
    createNoiseBuffer(0.45);


  noiseFilter.type =
    "lowpass";


  noiseFilter.frequency.value =
    135;


  noiseGain.gain.setValueAtTime(
    Math.min(
      0.46,
      0.14 * strength
    ),
    now
  );


  noiseGain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.25
  );


  noise.connect(
    noiseFilter
  );


  noiseFilter.connect(
    noiseGain
  );


  noiseGain.connect(
    masterGain
  );


  noise.start(now);

  noise.stop(
    now + 0.28
  );
}


/* Double coup du cœur */

function heartbeatSequence() {
  if (!soundEnabled) {
    return;
  }


  const strength =
    0.78 +
    currentProgress * 0.48 +
    currentJealousy * 1.25;


  playHeartbeat(
    strength,
    currentJealousy > 0.25
      ? -0.5
      : -0.12
  );


  window.setTimeout(
    function () {
      playHeartbeat(
        strength * 0.78,
        currentJealousy > 0.25
          ? 0.52
          : 0.12
      );
    },
    currentJealousy > 0.45
      ? 135
      : 215
  );


  scheduleHeartbeat();
}


/* Accélération */

function scheduleHeartbeat() {
  window.clearTimeout(
    heartbeatTimer
  );


  if (!soundEnabled) {
    return;
  }


  const delay =
    1400 -
    currentProgress * 250 -
    currentJealousy * 790;


  heartbeatTimer =
    window.setTimeout(
      heartbeatSequence,
      Math.max(
        360,
        delay
      )
    );
}


/* Impact sonore dramatique */

function playImpact(
  frequency = 40,
  strength = 1,
  duration = 1.2
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


  oscillator.type =
    "sine";


  oscillator.frequency.setValueAtTime(
    frequency * 2.2,
    now
  );


  oscillator.frequency.exponentialRampToValueAtTime(
    frequency,
    now + duration
  );


  gain.gain.setValueAtTime(
    0.0001,
    now
  );


  gain.gain.exponentialRampToValueAtTime(
    Math.min(
      0.95,
      0.62 * strength
    ),
    now + 0.018
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + duration
  );


  oscillator.connect(
    gain
  );


  gain.connect(
    masterGain
  );


  oscillator.start(now);

  oscillator.stop(
    now + duration + 0.05
  );
}


/* Tempête finale */

function playHeartbeatStorm() {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  playImpact(
    27,
    1.5,
    1.7
  );


  const beats = [
    0,
    300,
    545,
    755,
    940,
    1100,
    1245,
    1380
  ];


  beats.forEach(
    function (delay, index) {
      window.setTimeout(
        function () {
          playHeartbeat(
            1.85 +
            index * 0.08,
            index % 2 === 0
              ? -0.52
              : 0.52
          );
        },
        delay
      );
    }
  );
}


/* Couper le son */

function stopAudio() {
  soundEnabled = false;


  window.clearTimeout(
    heartbeatTimer
  );


  if (
    audioContext &&
    masterGain
  ) {
    masterGain.gain.setTargetAtTime(
      0.0001,
      audioContext.currentTime,
      0.08
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
   FLASH
========================================== */

function triggerFlash(className) {
  finalFlash.classList.remove(
    "enough-flash",
    "pulse-flash"
  );


  void finalFlash.offsetWidth;


  finalFlash.classList.add(
    className
  );
}


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
      0.07,
      0.58
    );


  const warmth =
    range(
      progress,
      0.13,
      0.48
    ) *
    (
      1 -
      range(
        progress,
        0.69,
        0.82
      ) *
      0.72
    );


  const jealousy =
    range(
      progress,
      0.67,
      0.87
    );


  /* You want the dream to be over */

  const desireIn =
    range(
      progress,
      0.91,
      0.925
    );


  const desireOut =
    range(
      progress,
      0.94,
      0.952
    );


  const endingDesire =
    desireIn *
    (
      1 -
      desireOut
    );


  /* But your pulse disagrees */

  const endingPulse =
    range(
      progress,
      0.955,
      0.973
    );


  /* Bouton Action */

  const endingButton =
    range(
      progress,
      0.98,
      0.994
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
    "--ending-desire",
    endingDesire
  );


  page.style.setProperty(
    "--ending-pulse",
    endingPulse
  );


  page.style.setProperty(
    "--ending-button",
    endingButton
  );


  progressFill.style.height =
    progress * 100 + "%";

   /* Attendre que le titre ait complètement disparu */

page.classList.toggle(
  "narration-active",
  progress >= 0.15 &&
  progress < 0.91
);

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


  /* Phase rouge */

  page.classList.toggle(
    "phase-jealousy",
    progress >= 0.67
  );


  /* THAT IS ENOUGH */

  page.classList.toggle(
    "phase-enough",
    progress >= 0.88 &&
    progress < 0.91
  );


  /* Fin */

  page.classList.toggle(
    "phase-ending",
    progress >= 0.91
  );


  sentence.style.visibility =
    progress >= 0.91
      ? "hidden"
      : "visible";


  /* Impact de la troisième lumière */

  if (
    progress >= 0.68 &&
    !thirdLightImpactPlayed
  ) {
    thirdLightImpactPlayed = true;


    playImpact(
      48,
      0.72,
      1.1
    );
  }


  if (
    progress < 0.66
  ) {
    thirdLightImpactPlayed = false;
  }


  /* Impact THAT IS ENOUGH */

  if (
    progress >= 0.88 &&
    !enoughImpactPlayed
  ) {
    enoughImpactPlayed = true;


    triggerFlash(
      "enough-flash"
    );


    playImpact(
      31,
      1.35,
      1.55
    );


    playHeartbeat(
      2,
      0
    );
  }


  if (
    progress < 0.86
  ) {
    enoughImpactPlayed = false;
  }


  /* Tempête du pouls */

  if (
    progress >= 0.955 &&
    !finalStormPlayed
  ) {
    finalStormPlayed = true;


    triggerFlash(
      "pulse-flash"
    );


    playHeartbeatStorm();
  }


  if (
    progress < 0.94
  ) {
    finalStormPlayed = false;
  }


  /* Instructions */

  if (progress < 0.18) {
    scrollInstruction.textContent =
      "APPROACH THE LIGHT";
  } else if (progress < 0.39) {
    scrollInstruction.textContent =
      "CROSS THE DISTANCE";
  } else if (progress < 0.67) {
    scrollInstruction.textContent =
      "STAY IN THE DREAM";
  } else if (progress < 0.88) {
    scrollInstruction.textContent =
      "FOLLOW THE THIRD LIGHT";
  } else if (progress < 0.955) {
    scrollInstruction.textContent =
      "LET THE DREAM END";
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
      ? 40
      : 72;


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
        1.8,

      speed:
        0.1 +
        Math.random() *
        0.32,

      phase:
        Math.random() *
        Math.PI *
        2,

      opacity:
        0.18 +
        Math.random() *
        0.52
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
        5;


      particle.y -=
        particle.speed *
        speedBoost;


      particle.x +=
        Math.sin(
          time * 0.0015 +
          particle.phase
        ) *
        (
          0.08 +
          currentJealousy *
          0.65
        );


      if (
        particle.y < -15
      ) {
        particle.y =
          canvasHeight + 15;


        particle.x =
          Math.random() *
          canvasWidth;
      }


      const pulse =
        0.6 +
        Math.sin(
          time * 0.003 +
          particle.phase
        ) *
        0.4;


      context.beginPath();


      context.arc(
        particle.x,
        particle.y,
        particle.radius +
        currentJealousy,
        0,
        Math.PI * 2
      );


      context.fillStyle =
        currentJealousy > 0.05

          ? "rgba(255,36,76," +
            particle.opacity *
            pulse +
            ")"

          : currentWarmth > 0.2

            ? "rgba(255,193,148," +
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
      horizontal * 18 + "px"
    );


    page.style.setProperty(
      "--pointer-y",
      vertical * 11 + "px"
    );
  },
  {
    passive: true
  }
);


/* ==========================================
   ACTION
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


    playHeartbeatStorm();


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
