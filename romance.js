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


function smoothValue(value) {
  return (
    value *
    value *
    (
      3 -
      2 *
      value
    )
  );
}


function smoothRange(progress, start, end) {
  return smoothValue(
    range(
      progress,
      start,
      end
    )
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


const storyLines =
  Array.from(
    document.querySelectorAll(
      ".story-line"
    )
  );


const storyStops =
  Array.from(
    document.querySelectorAll(
      ".story-stop[data-line]"
    )
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
   RECHERCHE
========================================== */

const researchSteps = [
  {
    start: 0.15,
    end: 0.31,

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
    start: 0.31,
    end: 0.49,

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
    end: 0.68,

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
    end: 0.88,

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


function updateResearch(progress) {
  const active =
    researchSteps.find(
      function (research) {
        return (
          progress >= research.start &&
          progress < research.end
        );
      }
    );


  if (!active) {
    researchNote.classList.remove(
      "visible"
    );

    return;
  }


  researchNumber.textContent =
    active.number;


  researchText.textContent =
    active.text;


  researchPrinciple.textContent =
    active.principle;


  researchSource.href =
    active.source;


  researchNote.classList.add(
    "visible"
  );
}


/* ==========================================
   NARRATION FLUIDE
========================================== */

let activeLine = null;


/* ==========================================
   PHRASES LIÉES AUX ARRÊTS DU SCROLL
========================================== */

function updateStoryLines() {
  let strongestLine = null;
  let strongestOpacity = 0;

  storyLines.forEach(
    function (line, index) {
      const correspondingStop =
        storyStops[index];

      if (!correspondingStop) {
        return;
      }

      const distanceInScreens =
        (
          correspondingStop.offsetTop -
          window.scrollY
        ) /
        window.innerHeight;

      const absoluteDistance =
        Math.abs(
          distanceInScreens
        );

      const visibility =
        smoothValue(
          clamp(
            1 - absoluteDistance,
            0,
            1
          )
        );

      const verticalPosition =
        clamp(
          distanceInScreens,
          -1,
          1
        ) *
        42;

      const blur =
        (
          1 - visibility
        ) *
        11;

      const scale =
        0.965 +
        visibility *
        0.035;

      line.style.setProperty(
        "--line-opacity",
        visibility
      );

      line.style.setProperty(
        "--line-y",
        verticalPosition + "px"
      );

      line.style.setProperty(
        "--line-blur",
        blur + "px"
      );

      line.style.setProperty(
        "--line-scale",
        scale
      );

      line.classList.toggle(
        "is-current",
        visibility > 0.92
      );

      if (
        visibility >
        strongestOpacity
      ) {
        strongestOpacity =
          visibility;

        strongestLine =
          line;
      }
    }
  );

  if (
    strongestLine &&
    strongestLine !== activeLine
  ) {
    activeLine =
      strongestLine;

    dreamTitle.textContent =
      strongestLine.dataset.title;

    emotionalCore.textContent =
      strongestLine.dataset.emotion;

    dreamMotif.textContent =
      strongestLine.dataset.motif;
  }
}
/* ==========================================
   AUDIO
========================================== */

let audioContext = null;

let compressor = null;

let masterGain = null;

let softGain = null;

let warmGain = null;

let tensionGain = null;

let whistleGain = null;

let soundEnabled = false;

let heartbeatTimer = null;

let currentProgress = 0;

let currentWarmth = 0;

let currentJealousy = 0;

let thirdLightPlayed = false;

let enoughPlayed = false;

let finalStormPlayed = false;


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
}


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
      -19;


    compressor.knee.value =
      14;


    compressor.ratio.value =
      9;


    compressor.attack.value =
      0.005;


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


    /* Nappe douce */

    softGain =
      audioContext.createGain();


    softGain.gain.value =
      0.055;


    softGain.connect(
      masterGain
    );


    createDrone(
      174.61,
      0.1,
      softGain
    );


    createDrone(
      261.63,
      0.045,
      softGain
    );


    createDrone(
      349.23,
      0.018,
      softGain
    );


    /* Chaleur */

    warmGain =
      audioContext.createGain();


    warmGain.gain.value =
      0.0001;


    warmGain.connect(
      masterGain
    );


    createDrone(
      110,
      0.25,
      warmGain
    );


    createDrone(
      164.81,
      0.13,
      warmGain
    );


    createDrone(
      220,
      0.065,
      warmGain
    );


    /* Tension grave */

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


    /* Sifflement */

    whistleGain =
      audioContext.createGain();


    whistleGain.gain.value =
      0.0001;


    whistleGain.connect(
      masterGain
    );


    createDrone(
      182,
      0.055,
      whistleGain
    );


    createDrone(
      187,
      0.05,
      whistleGain
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


  scheduleHeartbeat();
}


function updateAudio() {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const now =
    audioContext.currentTime;


  softGain.gain.setTargetAtTime(
    0.05 -
    currentJealousy * 0.035,
    now,
    0.5
  );


  warmGain.gain.setTargetAtTime(
    0.0001 +
    currentWarmth * 0.28,
    now,
    0.4
  );


  tensionGain.gain.setTargetAtTime(
    0.0001 +
    currentJealousy * 0.55,
    now,
    0.18
  );


  whistleGain.gain.setTargetAtTime(
    0.0001 +
    Math.pow(
      currentJealousy,
      2
    ) *
    0.2,
    now,
    0.2
  );
}


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
    now + 0.34
  );


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
    now + 0.37
  );


  oscillator.connect(
    gain
  );


  if (panner) {
    panner.pan.value = pan;

    gain.connect(panner);

    panner.connect(masterGain);
  } else {
    gain.connect(masterGain);
  }


  oscillator.start(now);

  oscillator.stop(
    now + 0.4
  );
}


function heartbeatSequence() {
  if (!soundEnabled) {
    return;
  }


  const strength =
    0.8 +
    currentProgress * 0.45 +
    currentJealousy * 1.25;


  playHeartbeat(
    strength,
    currentJealousy > 0.2
      ? -0.45
      : -0.1
  );


  window.setTimeout(
    function () {
      playHeartbeat(
        strength * 0.76,
        currentJealousy > 0.2
          ? 0.48
          : 0.1
      );
    },
    currentJealousy > 0.4
      ? 140
      : 220
  );


  scheduleHeartbeat();
}


function scheduleHeartbeat() {
  window.clearTimeout(
    heartbeatTimer
  );


  if (!soundEnabled) {
    return;
  }


  const delay =
    1450 -
    currentProgress * 260 -
    currentJealousy * 780;


  heartbeatTimer =
    window.setTimeout(
      heartbeatSequence,
      Math.max(
        370,
        delay
      )
    );
}


function playImpact(
  frequency,
  strength,
  duration
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
      0.9,
      strength * 0.6
    ),
    now + 0.018
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + duration
  );


  oscillator.connect(gain);

  gain.connect(masterGain);

  oscillator.start(now);

  oscillator.stop(
    now + duration + 0.05
  );
}


function playStorm() {
  playImpact(
    27,
    1.5,
    1.7
  );


  [
    0,
    300,
    545,
    755,
    940,
    1100,
    1250,
    1380
  ].forEach(
    function (delay, index) {
      window.setTimeout(
        function () {
          playHeartbeat(
            1.85 +
            index * 0.08,
            index % 2 === 0
              ? -0.5
              : 0.5
          );
        },
        delay
      );
    }
  );
}


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


/* ==========================================
   ENTRÉE ET COMMANDES
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
   FLASH
========================================== */

function triggerFlash() {
  finalFlash.classList.remove(
    "active"
  );


  void finalFlash.offsetWidth;


  finalFlash.classList.add(
    "active"
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


  /* ==========================================
   PROGRESSION CALÉE SUR LES CHAPITRES
========================================== */

/*
 * Il existe 15 écrans :
 *
 * 0     introduction
 * 1–11  narration
 * 12    désir de sortir
 * 13    pouls
 * 14    bouton Action
 */


const introOpacity =
  1 -
  smoothRange(
    progress,
    0.015,
    0.06
  );


const approach =
  smoothRange(
    progress,
    0.05,
    0.43
  );


const warmthArrival =
  smoothRange(
    progress,
    0.1,
    0.4
  );


const warmthDeparture =
  smoothRange(
    progress,
    0.52,
    0.76
  );


const warmth =
  warmthArrival *
  (
    1 -
    warmthDeparture *
    0.78
  );


const pink =
  smoothRange(
    progress,
    0.25,
    0.62
  );


/*
 * Le rouge apparaît beaucoup plus
 * progressivement entre la troisième
 * lumière et THAT IS ENOUGH.
 */

const jealousy =
  smoothRange(
    progress,
    0.49,
    0.8
  );


const darkness =
  smoothRange(
    progress,
    0.71,
    0.95
  );


const thirdLight =
  smoothRange(
    progress,
    0.48,
    0.58
  );


/* Écran 12 : You want the dream... */

const desireIn =
  smoothRange(
    progress,
    0.835,
    0.86
  );


const desireOut =
  smoothRange(
    progress,
    0.875,
    0.9
  );


const endingDesire =
  desireIn *
  (
    1 -
    desireOut
  );


/* Écran 13 : BUT YOUR PULSE... */

const endingPulse =
  smoothRange(
    progress,
    0.905,
    0.94
  );


/* Écran 14 : bouton Action */

const endingButton =
  smoothRange(
    progress,
    0.965,
    0.995
  );


  currentProgress = progress;

  currentWarmth = warmth;

  currentJealousy = jealousy;


  page.style.setProperty(
    "--progress",
    progress
  );


  page.style.setProperty(
    "--intro-opacity",
    introOpacity
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
    "--pink",
    pink
  );


  page.style.setProperty(
    "--jealousy",
    jealousy
  );


  page.style.setProperty(
    "--darkness",
    darkness
  );


  page.style.setProperty(
    "--third-light",
    thirdLight
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


  updateStoryLines();

  updateResearch(progress);

  updateAudio();


  /* Troisième lumière */

if (
  progress >= 0.5 &&
  !thirdLightPlayed
) {
  thirdLightPlayed = true;


  playImpact(
    48,
    0.75,
    1.1
  );
}


if (
  progress < 0.47
) {
  thirdLightPlayed = false;
}


/* THAT IS ENOUGH */

if (
  progress >= 0.785 &&
  !enoughPlayed
) {
  enoughPlayed = true;


  triggerFlash();


  playImpact(
    31,
    1.35,
    1.5
  );


  playHeartbeat(
    2,
    0
  );
}


if (
  progress < 0.75
) {
  enoughPlayed = false;
}


/* Tempête finale */

if (
  progress >= 0.91 &&
  !finalStormPlayed
) {
  finalStormPlayed = true;


  triggerFlash();

  playStorm();
}


if (
  progress < 0.88
) {
  finalStormPlayed = false;
}


  /* ==========================================
   IMPACT DE LA TROISIÈME LUMIÈRE
========================================== */

if (
  progress >= 0.5 &&
  !thirdLightPlayed
) {
  thirdLightPlayed = true;


  playImpact(
    48,
    0.75,
    1.1
  );
}


if (
  progress < 0.47
) {
  thirdLightPlayed = false;
}


/* ==========================================
   IMPACT — THAT IS ENOUGH
========================================== */

if (
  progress >= 0.785 &&
  !enoughPlayed
) {
  enoughPlayed = true;


  triggerFlash();


  playImpact(
    31,
    1.35,
    1.5
  );


  playHeartbeat(
    2,
    0
  );
}


if (
  progress < 0.75
) {
  enoughPlayed = false;
}


/* ==========================================
   TEMPÊTE DU POULS
========================================== */

if (
  progress >= 0.91 &&
  !finalStormPlayed
) {
  finalStormPlayed = true;


  triggerFlash();


  playStorm();
}


if (
  progress < 0.88
) {
  finalStormPlayed = false;
}


  if (progress < 0.15) {
    scrollInstruction.textContent =
      "APPROACH THE LIGHT";
  } else if (progress < 0.39) {
    scrollInstruction.textContent =
      "CROSS THE DISTANCE";
  } else if (progress < 0.63) {
    scrollInstruction.textContent =
      "STAY IN THE DREAM";
  } else if (progress < 0.88) {
    scrollInstruction.textContent =
      "WATCH THE THIRD LIGHT";
  } else if (progress < 0.958) {
    scrollInstruction.textContent =
      "LET THE DREAM END";
  } else {
    scrollInstruction.textContent =
      "FOLLOW THE PULSE";
  }
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
      ? 55
      : 105;


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
        0.5 +
        Math.random() *
        1.8,

      speed:
        0.08 +
        Math.random() *
        0.28,

      depth:
        0.25 +
        Math.random() *
        0.75,

      phase:
        Math.random() *
        Math.PI *
        2,

      opacity:
        0.16 +
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
      particle.y -=
        particle.speed *
        (
          1 +
          currentJealousy *
          4
        );


      particle.x +=
        Math.sin(
          time * 0.001 +
          particle.phase
        ) *
        (
          0.06 +
          currentJealousy *
          0.42
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


      const twinkle =
        0.65 +
        Math.sin(
          time * 0.002 +
          particle.phase
        ) *
        0.35;


      context.beginPath();


      context.arc(
        particle.x,
        particle.y,
        particle.radius +
        currentJealousy * 0.7,
        0,
        Math.PI * 2
      );


      if (
        currentJealousy > 0.05
      ) {
        context.fillStyle =
          "rgba(255,52,88," +
          particle.opacity *
          twinkle +
          ")";
      } else if (
        currentWarmth > 0.2
      ) {
        context.fillStyle =
          "rgba(255,218,175," +
          particle.opacity *
          twinkle +
          ")";
      } else {
        context.fillStyle =
          "rgba(255,250,237," +
          particle.opacity *
          twinkle +
          ")";
      }


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
