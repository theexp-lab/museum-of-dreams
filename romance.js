/* ==========================================
   THE MUSEUM OF DREAMS
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
    "#romance-progress-fill"
  );


const scrollInstruction =
  document.querySelector(
    "#scroll-instruction"
  );


const informationButton =
  document.querySelector(
    "#information-button"
  );


const informationPanel =
  document.querySelector(
    "#information-panel"
  );


const closeInformation =
  document.querySelector(
    "#close-information"
  );


const soundButton =
  document.querySelector(
    "#sound-button"
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
    start: 0.11,

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
    start: 0.22,

    text:
      "The face keeps changing. <em>The feeling recognises it every time.</em>",

    title:
      "THE CHANGING FACE",

    emotion:
      "FAMILIARITY",

    motif:
      "IDENTITY"
  },

  {
    start: 0.35,

    text:
      "The room becomes smaller <em>as the distance between you disappears.</em>",

    title:
      "THE DISTANCE BETWEEN US",

    emotion:
      "INTIMACY",

    motif:
      "APPROACH"
  },

  {
    start: 0.48,

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
    start: 0.58,

    text:
      "You may only discover what it left behind <em>when you wake.</em>",

    title:
      "THE FOLLOWING MORNING",

    emotion:
      "AFTER-EFFECT",

    motif:
      "WAKING"
  },

  {
    start: 0.68,

    text:
      "The closer you move, <em>the clearer the other shadow becomes.</em>",

    title:
      "THE THIRD SHADOW",

    emotion:
      "JEALOUSY",

    motif:
      "INTRUSION"
  },

  {
    start: 0.77,

    text:
      "No one invited jealousy. <em>The dream made room for it anyway.</em>",

    title:
      "THE RED ROOM",

    emotion:
      "JEALOUSY",

    motif:
      "DIVISION"
  },

  {
    start: 0.85,

    text:
      "The shadow disappears. <em>The feeling takes a little longer.</em>",

    title:
      "THE REMAINDER",

    emotion:
      "UNCERTAINTY",

    motif:
      "AFTERIMAGE"
  }
];


let currentStep = -1;

let sentenceTimeout;


/* ==========================================
   RECHERCHES SCIENTIFIQUES
========================================== */

const researchSteps = [
  {
    start: 0.14,
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
    end: 0.47,

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
    end: 0.66,

    number:
      "RESEARCH NOTE 04.3",

    text:
      "Emotions and interactions involving romantic partners in dreams were associated with relationship behaviour the following day.",

    principle:
      "AFTER WAKING",

    source:
      "https://journals.sagepub.com/doi/10.1177/1948550613486678"
  },

  {
    start: 0.68,
    end: 0.84,

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


/* ==========================================
   CHANGEMENT DE PHRASE
========================================== */

function displaySentence(index) {
  if (
    index === currentStep ||
    index < 0
  ) {
    return;
  }


  currentStep = index;


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
   NOTE SCIENTIFIQUE
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
      0.1,
      0.58
    );


  const jealousy =
    range(
      progress,
      0.61,
      0.79
    );


  const ending =
    range(
      progress,
      0.88,
      0.98
    );


  page.style.setProperty(
    "--progress",
    progress
  );


  page.style.setProperty(
    "--approach",
    approach
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


  /* Phrase active */

  let nextStep = -1;


  narrationSteps.forEach(
    function (step, index) {
      if (
        progress >= step.start
      ) {
        nextStep = index;
      }
    }
  );


  displaySentence(nextStep);

  updateResearch(progress);


  /* Phases visuelles */

  if (
    progress >= 0.61 &&
    progress < 0.88
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
    progress >= 0.88
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


  /* Instruction */

  if (progress < 0.12) {
    scrollInstruction.textContent =
      "APPROACH THE FIGURE";
  } else if (progress < 0.47) {
    scrollInstruction.textContent =
      "CROSS THE DISTANCE";
  } else if (progress < 0.66) {
    scrollInstruction.textContent =
      "STAY IN THE DREAM";
  } else if (progress < 0.86) {
    scrollInstruction.textContent =
      "FOLLOW THE RED THREAD";
  } else {
    scrollInstruction.textContent =
      "FOLLOW THE PULSE";
  }


  audioIntensity =
    approach;


  jealousyIntensity =
    jealousy;
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
      ? 35
      : 65;


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
        1.5,

      speed:
        0.08 +
        Math.random() *
        0.24,

      opacity:
        0.15 +
        Math.random() *
        0.45,

      phase:
        Math.random() *
        Math.PI *
        2
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


/* ==========================================
   ANIMATION LÉGÈRE
========================================== */

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
        particle.speed;


      particle.x +=
        Math.sin(
          time * 0.0005 +
          particle.phase
        ) *
        0.08;


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
        0.65 +
        Math.sin(
          time * 0.001 +
          particle.phase
        ) *
        0.35;


      context.beginPath();


      context.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );


      context.fillStyle =
        jealousyIntensity > 0.1

          ? "rgba(255,90,112," +
            particle.opacity *
            pulse +
            ")"

          : "rgba(255,246,240," +
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
   PARALLAXE
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
   INFORMATIONS DU MUSÉE
========================================== */

function openInformation() {
  informationPanel.classList.add(
    "open"
  );


  informationPanel.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";
}


function closeInformationPanel() {
  informationPanel.classList.remove(
    "open"
  );


  informationPanel.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";
}


informationButton.addEventListener(
  "click",
  openInformation
);


closeInformation.addEventListener(
  "click",
  closeInformationPanel
);


informationPanel.addEventListener(
  "click",
  function (event) {
    if (
      event.target ===
      informationPanel
    ) {
      closeInformationPanel();
    }
  }
);


window.addEventListener(
  "keydown",
  function (event) {
    if (
      event.key === "Escape"
    ) {
      closeInformationPanel();
    }
  }
);


/* ==========================================
   SON GÉNÉRATIF

   Le son ne commence qu’après un clic.
========================================== */

let audioContext = null;

let soundEnabled = false;

let audioIntensity = 0;

let jealousyIntensity = 0;

let masterGain = null;

let breathGain = null;

let heartbeatTimer = null;


function createNoiseBuffer(contextToUse) {
  const length =
    contextToUse.sampleRate * 2;


  const buffer =
    contextToUse.createBuffer(
      1,
      length,
      contextToUse.sampleRate
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


function startSound() {
  audioContext =
    new (
      window.AudioContext ||
      window.webkitAudioContext
    )();


  masterGain =
    audioContext.createGain();


  masterGain.gain.value =
    0.12;


  masterGain.connect(
    audioContext.destination
  );


  const noise =
    audioContext.createBufferSource();


  noise.buffer =
    createNoiseBuffer(
      audioContext
    );


  noise.loop = true;


  const filter =
    audioContext.createBiquadFilter();


  filter.type =
    "lowpass";


  filter.frequency.value =
    420;


  breathGain =
    audioContext.createGain();


  breathGain.gain.value =
    0.018;


  noise.connect(filter);

  filter.connect(breathGain);

  breathGain.connect(masterGain);

  noise.start();


  function animateBreath() {
    if (
      !soundEnabled ||
      !audioContext
    ) {
      return;
    }


    const time =
      audioContext.currentTime;


    breathGain.gain.setTargetAtTime(
      0.012 +
      audioIntensity * 0.026,
      time,
      0.4
    );


    window.setTimeout(
      animateBreath,
      700
    );
  }


  animateBreath();

  scheduleHeartbeat();
}


function playHeartbeat() {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  oscillator.type =
    "sine";


  oscillator.frequency.setValueAtTime(
    62,
    audioContext.currentTime
  );


  oscillator.frequency.exponentialRampToValueAtTime(
    42,
    audioContext.currentTime + 0.16
  );


  gain.gain.setValueAtTime(
    0.0001,
    audioContext.currentTime
  );


  gain.gain.exponentialRampToValueAtTime(
    0.1 +
    jealousyIntensity * 0.12,
    audioContext.currentTime + 0.018
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + 0.2
  );


  oscillator.connect(gain);

  gain.connect(masterGain);


  oscillator.start();

  oscillator.stop(
    audioContext.currentTime +
    0.22
  );
}


function scheduleHeartbeat() {
  if (!soundEnabled) {
    return;
  }


  playHeartbeat();


  const delay =
    1500 -
    jealousyIntensity * 700;


  heartbeatTimer =
    window.setTimeout(
      scheduleHeartbeat,
      delay
    );
}


soundButton.addEventListener(
  "click",
  function () {
    soundEnabled =
      !soundEnabled;


    soundButton.setAttribute(
      "aria-pressed",
      String(soundEnabled)
    );


    soundButton.textContent =
      soundEnabled
        ? "SOUND ON"
        : "ENABLE SOUND";


    if (
      soundEnabled &&
      !audioContext
    ) {
      startSound();
    } else if (
      soundEnabled &&
      audioContext
    ) {
      audioContext.resume();

      scheduleHeartbeat();
    } else if (
      audioContext
    ) {
      window.clearTimeout(
        heartbeatTimer
      );

      audioContext.suspend();
    }
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
