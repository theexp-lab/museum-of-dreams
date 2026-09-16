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
      "THE RED PRESENCE",

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
      "Jealousy experienced in dreams was associated with greater conflict the following day.",

    principle:
      "DREAMED JEALOUSY",

    source:
      "https://journals.sagepub.com/doi/10.1177/1948550613486678"
  }
];


let currentNarrationIndex = -1;

let narrationTimeout;

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


        sentence.classList.remove(
          "changing"
        );
      },
      420
    );
}


/* ==========================================
   OBSERVATION SCIENTIFIQUE
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

let warmthGain = null;

let tensionGain = null;

let compressor = null;

let soundEnabled = false;

let heartbeatTimer = null;

let currentProgress = 0;

let currentWarmth = 0;

let currentJealousy = 0;


/* Bruit continu */

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


/* Oscillateur continu */

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


  oscillator.connect(gain);

  gain.connect(destination);

  oscillator.start();


  return {
    oscillator: oscillator,
    gain: gain
  };
}


/* Initialisation */

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


    compressor =
      audioContext.createDynamicsCompressor();


    compressor.threshold.value =
      -20;


    compressor.knee.value =
      16;


    compressor.ratio.value =
      8;


    compressor.attack.value =
      0.006;


    compressor.release.value =
      0.28;


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


    /* Respiration et salle */

    const ambienceNoise =
      audioContext.createBufferSource();


    const ambienceFilter =
      audioContext.createBiquadFilter();


    ambienceGain =
      audioContext.createGain();


    ambienceNoise.buffer =
      createNoiseBuffer();


    ambienceNoise.loop = true;


    ambienceFilter.type =
      "bandpass";


    ambienceFilter.frequency.value =
      580;


    ambienceFilter.Q.value =
      0.7;


    ambienceGain.gain.value =
      0.08;


    ambienceNoise.connect(
      ambienceFilter
    );


    ambienceFilter.connect(
      ambienceGain
    );


    ambienceGain.connect(
      masterGain
    );


    ambienceNoise.start();


    /* Chaleur harmonique */

    warmthGain =
      audioContext.createGain();


    warmthGain.gain.value =
      0.0001;


    warmthGain.connect(
      masterGain
    );


    createDrone(
      110,
      0.22,
      warmthGain
    );


    createDrone(
      164.81,
      0.12,
      warmthGain
    );


    createDrone(
      220,
      0.06,
      warmthGain
    );


    /* Tension désaccordée */

    tensionGain =
      audioContext.createGain();


    tensionGain.gain.value =
      0.0001;


    tensionGain.connect(
      masterGain
    );


    createDrone(
      39,
      0.42,
      tensionGain
    );


    createDrone(
      42.5,
      0.28,
      tensionGain
    );


    createDrone(
      76,
      0.07,
      tensionGain,
      "sawtooth"
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
    0.7,
    audioContext.currentTime + 1.2
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


/* Mise à jour des ambiances */

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
    currentJealousy * 0.06,
    now,
    0.25
  );


  warmthGain.gain.setTargetAtTime(
    0.0001 +
    currentWarmth * 0.24,
    now,
    0.4
  );


  tensionGain.gain.setTargetAtTime(
    0.0001 +
    currentJealousy * 0.48,
    now,
    0.16
  );
}


/* Un battement épais */

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


  const oscillatorGain =
    audioContext.createGain();


  const lowFilter =
    audioContext.createBiquadFilter();


  const panner =
    audioContext.createStereoPanner
      ? audioContext.createStereoPanner()
      : null;


  oscillator.type =
    "sine";


  oscillator.frequency.setValueAtTime(
    92,
    now
  );


  oscillator.frequency.exponentialRampToValueAtTime(
    34,
    now + 0.3
  );


  oscillatorGain.gain.setValueAtTime(
    0.0001,
    now
  );


  oscillatorGain.gain.exponentialRampToValueAtTime(
    Math.min(
      0.9,
      0.34 * strength
    ),
    now + 0.014
  );


  oscillatorGain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.34
  );


  lowFilter.type =
    "lowpass";


  lowFilter.frequency.value =
    170;


  oscillator.connect(
    lowFilter
  );


  lowFilter.connect(
    oscillatorGain
  );


  if (panner) {
    panner.pan.value =
      clamp(
        pan,
        -1,
        1
      );


    oscillatorGain.connect(
      panner
    );


    panner.connect(
      masterGain
    );
  } else {
    oscillatorGain.connect(
      masterGain
    );
  }


  oscillator.start(now);

  oscillator.stop(
    now + 0.36
  );


  /* Impact organique */

  const noise =
    audioContext.createBufferSource();


  const noiseFilter =
    audioContext.createBiquadFilter();


  const noiseGain =
    audioContext.createGain();


  noise.buffer =
    createNoiseBuffer(0.4);


  noiseFilter.type =
    "lowpass";


  noiseFilter.frequency.value =
    120;


  noiseGain.gain.setValueAtTime(
    Math.min(
      0.4,
      0.12 * strength
    ),
    now
  );


  noiseGain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.22
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
    now + 0.25
  );
}


/* Double battement */

function heartbeatSequence() {
  if (!soundEnabled) {
    return;
  }


  const strength =
    0.8 +
    currentProgress * 0.45 +
    currentJealousy * 1.15;


  const pan =
    currentJealousy > 0.25
      ? -0.42
      : -0.12;


  playHeartbeat(
    strength,
    pan
  );


  window.setTimeout(
    function () {
      playHeartbeat(
        strength * 0.78,
        currentJealousy > 0.25
          ? 0.5
          : 0.12
      );
    },
    currentJealousy > 0.4
      ? 145
      : 220
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
    1380 -
    currentProgress * 270 -
    currentJealousy * 720;


  heartbeatTimer =
    window.setTimeout(
      heartbeatSequence,
      Math.max(
        390,
        delay
      )
    );
}


/* Battements extrêmes de fin */

function playFinalHeartbeatStorm() {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const beats = [
    0,
    310,
    560,
    790,
    990,
    1170,
    1330
  ];


  beats.forEach(
    function (delay, index) {
      window.setTimeout(
        function () {
          playHeartbeat(
            1.75 +
            index * 0.08,
            index % 2 === 0
              ? -0.35
              : 0.35
          );
        },
        delay
      );
    }
  );
}


/* Couper */

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
   ÉCRAN D’ENTRÉE
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
      0.5
    ) *
    (
      1 -
      range(
        progress,
        0.63,
        0.79
      ) *
      0.66
    );


  const jealousy =
    range(
      progress,
      0.62,
      0.84
    );


  /* Fin volontairement séparée */

  const endingDesireAppearance =
    range(
      progress,
      0.87,
      0.9
    );


  const endingDesireDeparture =
    range(
      progress,
      0.915,
      0.94
    );


  const endingDesire =
    endingDesireAppearance *
    (
      1 -
      endingDesireDeparture
    );


  const endingPulse =
    range(
      progress,
      0.935,
      0.965
    );


  const endingButton =
    range(
      progress,
      0.97,
      0.992
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
    progress >= 0.62
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
  } else {
    page.classList.remove(
      "phase-ending"
    );


    sentence.style.visibility =
      "visible";
  }


  if (
    progress >= 0.935 &&
    !finalImpactPlayed
  ) {
    finalImpactPlayed = true;


    finalFlash.classList.remove(
      "active"
    );


    void finalFlash.offsetWidth;


    finalFlash.classList.add(
      "active"
    );


    playFinalHeartbeatStorm();
  }


  if (
    progress < 0.9
  ) {
    finalImpactPlayed = false;
  }


  if (progress < 0.12) {
    scrollInstruction.textContent =
      "APPROACH THE LIGHT";
  } else if (progress < 0.36) {
    scrollInstruction.textContent =
      "CROSS THE DISTANCE";
  } else if (progress < 0.62) {
    scrollInstruction.textContent =
      "STAY IN THE DREAM";
  } else if (progress < 0.87) {
    scrollInstruction.textContent =
      "FOLLOW THE PULSE";
  } else {
    scrollInstruction.textContent =
      "KEEP GOING";
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
      ? 38
      : 68;


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
        0.7 +
        Math.random() *
        1.7,

      speed:
        0.1 +
        Math.random() *
        0.3,

      phase:
        Math.random() *
        Math.PI *
        2,

      opacity:
        0.2 +
        Math.random() *
        0.48
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
      const acceleration =
        1 +
        currentJealousy *
        4.2;


      particle.y -=
        particle.speed *
        acceleration;


      particle.x +=
        Math.sin(
          time * 0.001 +
          particle.phase
        ) *
        (
          0.08 +
          currentJealousy *
          0.48
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
        0.62 +
        Math.sin(
          time * 0.0025 +
          particle.phase
        ) *
        0.38;


      context.beginPath();


      context.arc(
        particle.x,
        particle.y,
        particle.radius +
        currentJealousy * 0.9,
        0,
        Math.PI * 2
      );


      context.fillStyle =
        currentJealousy > 0.05

          ? "rgba(255,45,80," +
            particle.opacity *
            pulse +
            ")"

          : currentWarmth > 0.2

            ? "rgba(255,202,165," +
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
      horizontal * 17 + "px"
    );


    page.style.setProperty(
      "--pointer-y",
      vertical * 10 + "px"
    );
  },
  {
    passive: true
  }
);


/* ==========================================
   PAGE ACTION
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


    playFinalHeartbeatStorm();


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
