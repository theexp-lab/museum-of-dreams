/* ==========================================
   THE MUSEUM OF DREAMS
   ROOM 05 — ACTION
========================================== */


/* ==========================================
   ÉLÉMENTS
========================================== */

const actionPage =
  document.querySelector(
    ".action-page"
  );

const scenes =
  Array.from(
    document.querySelectorAll(
      ".action-scene"
    )
  );

const soundControl =
  document.querySelector(
    "#sound-control"
  );

const roomLocationText =
  document.querySelector(
    "#room-location-text"
  );

const installationNumber =
  document.querySelector(
    "#installation-number"
  );

const installationTitle =
  document.querySelector(
    "#installation-title"
  );

const installationMedium =
  document.querySelector(
    "#installation-medium"
  );

const pulseValue =
  document.querySelector(
    "#pulse-value"
  );

const movementStatus =
  document.querySelector(
    "#movement-status"
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

const progressFill =
  document.querySelector(
    "#action-progress-fill"
  );

const particleField =
  document.querySelector(
    "#action-particles"
  );


/* ==========================================
   DONNÉES DU PARCOURS
========================================== */

const sceneData = [
  {
    visual: "introduction",
    intensity: "low",
    location: "ROOM 05 · ACTION",
    number: "ROOM 05",
    title: "THE BODY THAT NEVER MOVED",
    medium: "KINETIC LIGHT · SPATIAL SOUND · RESPONSIVE ARCHITECTURE",
    bpm: 68,
    movement: "STILLNESS",
    sound: "introduction",
    researchNumber: "RESEARCH NOTE 05.1",
    research: "Changes in cardiac activity may accompany emotionally intense dream experiences.",
    principle: "BODY · DREAM · RESPONSE",
    source: "https://pubmed.ncbi.nlm.nih.gov/25565936/"
  },

  {
    visual: "chase",
    intensity: "low",
    location: "MOVEMENT 01 · THE CHASE",
    number: "MOVEMENT 01",
    title: "THE CHASE",
    medium: "RESPONSIVE LIGHT CORRIDOR · DIRECTIONAL FOOTSTEPS",
    bpm: 86,
    movement: "DETECTED",
    sound: "chase",
    researchNumber: "RESEARCH NOTE 05.2",
    research: "Being chased is repeatedly reported as a common dream theme without having one universal meaning.",
    principle: "THREAT · WITHOUT CONTACT",
    source: "https://pubmed.ncbi.nlm.nih.gov/15612605/"
  },

  {
    visual: "chase",
    intensity: "medium",
    location: "MOVEMENT 01 · THE CHASE",
    number: "MOVEMENT 01",
    title: "THE CHASE",
    medium: "RESPONSIVE LIGHT CORRIDOR · DIRECTIONAL FOOTSTEPS",
    bpm: 104,
    movement: "MATCHING PACE",
    sound: "chase",
    researchNumber: "RESEARCH NOTE 05.2",
    research: "Being chased is repeatedly reported as a common dream theme without having one universal meaning.",
    principle: "THREAT · WITHOUT CONTACT",
    source: "https://pubmed.ncbi.nlm.nih.gov/15612605/"
  },

  {
    visual: "chase",
    intensity: "high",
    location: "MOVEMENT 01 · THE CHASE",
    number: "MOVEMENT 01",
    title: "THE CHASE",
    medium: "RESPONSIVE LIGHT CORRIDOR · DIRECTIONAL FOOTSTEPS",
    bpm: 126,
    movement: "PURSUIT",
    sound: "chase-high",
    researchNumber: "RESEARCH NOTE 05.2",
    research: "Being chased is repeatedly reported as a common dream theme without having one universal meaning.",
    principle: "THREAT · WITHOUT CONTACT",
    source: "https://pubmed.ncbi.nlm.nih.gov/15612605/"
  },

  {
    visual: "fall",
    intensity: "low",
    location: "MOVEMENT 02 · THE FALL",
    number: "MOVEMENT 02",
    title: "THE FALL",
    medium: "GENERATIVE PROJECTION · SUB-BASS · HAPTIC FLOOR",
    bpm: 92,
    movement: "LOSING GROUND",
    sound: "fall",
    researchNumber: "RESEARCH NOTE 05.3",
    research: "Dreams can create convincing sensations of movement while the sleeper remains in bed.",
    principle: "MOTION · WITHOUT MOVEMENT",
    source: "https://pubmed.ncbi.nlm.nih.gov/25565936/"
  },

  {
    visual: "fall",
    intensity: "medium",
    location: "MOVEMENT 02 · THE FALL",
    number: "MOVEMENT 02",
    title: "THE FALL",
    medium: "GENERATIVE PROJECTION · SUB-BASS · HAPTIC FLOOR",
    bpm: 80,
    movement: "DESCENDING",
    sound: "fall",
    researchNumber: "RESEARCH NOTE 05.3",
    research: "Dreams can create convincing sensations of movement while the sleeper remains in bed.",
    principle: "MOTION · WITHOUT MOVEMENT",
    source: "https://pubmed.ncbi.nlm.nih.gov/25565936/"
  },

  {
    visual: "fall",
    intensity: "high",
    location: "MOVEMENT 02 · THE FALL",
    number: "MOVEMENT 02",
    title: "THE FALL",
    medium: "GENERATIVE PROJECTION · SUB-BASS · HAPTIC FLOOR",
    bpm: 72,
    movement: "NO GROUND",
    sound: "fall-deep",
    researchNumber: "RESEARCH NOTE 05.3",
    research: "Dreams can create convincing sensations of movement while the sleeper remains in bed.",
    principle: "MOTION · WITHOUT MOVEMENT",
    source: "https://pubmed.ncbi.nlm.nih.gov/25565936/"
  },

  {
    visual: "impact",
    intensity: "low",
    location: "MOVEMENT 03 · THE IMPACT",
    number: "MOVEMENT 03",
    title: "THE IMPACT",
    medium: "MOTION TRACKING · RESPONSIVE PROJECTION · PERCUSSION",
    bpm: 104,
    movement: "ANTICIPATION",
    sound: "tension",
    researchNumber: "RESEARCH NOTE 05.4",
    research: "Motor-cortex activity has been recorded during dreamed movements in a small lucid-REM experiment.",
    principle: "IMAGINED · YET ACTIVE",
    source: "https://pubmed.ncbi.nlm.nih.gov/22036177/"
  },

  {
    visual: "impact",
    intensity: "low",
    location: "MOVEMENT 03 · THE IMPACT",
    number: "MOVEMENT 03",
    title: "THE IMPACT",
    medium: "MOTION TRACKING · RESPONSIVE PROJECTION · PERCUSSION",
    bpm: 48,
    movement: "SUSPENDED",
    sound: "silence",
    researchNumber: "RESEARCH NOTE 05.4",
    research: "Motor-cortex activity has been recorded during dreamed movements in a small lucid-REM experiment.",
    principle: "IMAGINED · YET ACTIVE",
    source: "https://pubmed.ncbi.nlm.nih.gov/22036177/"
  },

  {
    visual: "impact",
    intensity: "high",
    location: "MOVEMENT 03 · THE IMPACT",
    number: "MOVEMENT 03",
    title: "THE IMPACT",
    medium: "MOTION TRACKING · RESPONSIVE PROJECTION · PERCUSSION",
    bpm: 132,
    movement: "IMPACT",
    sound: "impact",
    researchNumber: "RESEARCH NOTE 05.4",
    research: "Motor-cortex activity has been recorded during dreamed movements in a small lucid-REM experiment.",
    principle: "IMAGINED · YET ACTIVE",
    source: "https://pubmed.ncbi.nlm.nih.gov/22036177/"
  },

  {
    visual: "silence",
    intensity: "low",
    location: "END OF MOVEMENT",
    number: "TRANSITION",
    title: "THE ROOM GOES QUIET",
    medium: "SPATIAL SILENCE · RESIDUAL LIGHT",
    bpm: 58,
    movement: "STILLNESS",
    sound: "quiet",
    researchNumber: "CURATORIAL TRANSITION",
    research: "The installation returns to stillness, but one rhythmic signal remains.",
    principle: "AFTER · THE · IMPACT",
    source: "https://pubmed.ncbi.nlm.nih.gov/25565936/"
  },

  {
    visual: "silence",
    intensity: "low",
    location: "END OF MOVEMENT",
    number: "TRANSITION",
    title: "ONE BEAT",
    medium: "SPATIAL SILENCE · RESIDUAL LIGHT",
    bpm: 54,
    movement: "WAITING",
    sound: "single",
    researchNumber: "CURATORIAL TRANSITION",
    research: "The installation returns to stillness, but one rhythmic signal remains.",
    principle: "LISTEN",
    source: "https://pubmed.ncbi.nlm.nih.gov/25565936/"
  },

  {
    visual: "answer",
    intensity: "medium",
    location: "UNIDENTIFIED SIGNAL",
    number: "TRANSITION",
    title: "SOMETHING ANSWERS",
    medium: "DUAL PULSE · DIRECTIONAL LOW FREQUENCY",
    bpm: 62,
    movement: "SECOND SIGNAL",
    sound: "answer",
    researchNumber: "CURATORIAL TRANSITION",
    research: "A second simulated pulse is introduced as the visitor approaches the next room.",
    principle: "SIGNAL · WITHOUT SOURCE",
    source: "https://pubmed.ncbi.nlm.nih.gov/25565936/"
  },

  {
    visual: "nightmare",
    intensity: "high",
    location: "ROOM 06 · NIGHTMARE",
    number: "ROOM 06",
    title: "THE OTHER PULSE",
    medium: "DUAL PULSE · DARKNESS · SPATIAL SOUND",
    bpm: 66,
    movement: "UNIDENTIFIED",
    sound: "other",
    researchNumber: "ROOM 06",
    research: "The scientific observation ends here. The nightmare begins.",
    principle: "NIGHTMARE",
    source: "https://pubmed.ncbi.nlm.nih.gov/25565936/"
  }
];


let activeSceneIndex = 0;

let scrollLocked = false;

let previousSoundMode = "";

let stepSide = -1;


/* ==========================================
   PARTICULES
========================================== */

function createParticles() {
  particleField.innerHTML = "";

  const count =
    window.innerWidth < 700
      ? 12
      : 24;

  for (
    let index = 0;
    index < count;
    index++
  ) {
    const particle =
      document.createElement(
        "span"
      );

    particle.className =
      "action-particle";

    particle.style.left =
      Math.random() *
      100 +
      "%";

    particle.style.top =
      25 +
      Math.random() *
      100 +
      "%";

    particle.style.setProperty(
      "--particle-opacity",
      (
        0.15 +
        Math.random() *
        0.42
      ).toFixed(2)
    );

    particle.style.setProperty(
      "--particle-duration",
      15 +
      Math.random() *
      20 +
      "s"
    );

    particle.style.setProperty(
      "--particle-delay",
      -Math.random() *
      20 +
      "s"
    );

    particleField.appendChild(
      particle
    );
  }
}


/* ==========================================
   AUDIO
========================================== */

let audioContext = null;

let masterGain = null;

let droneGain = null;

let drone = null;

let soundEnabled = false;

let heartbeatTimeout = null;


function createAudio() {
  if (audioContext) {
    return;
  }

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

  droneGain =
    audioContext.createGain();

  droneGain.gain.value =
    0.025;

  droneGain.connect(
    masterGain
  );

  drone =
    audioContext.createOscillator();

  drone.type =
    "sine";

  drone.frequency.value =
    43;

  drone.connect(
    droneGain
  );

  drone.start();
}


async function enableSound() {
  createAudio();

  if (!audioContext) {
    return;
  }

  try {
    await audioContext.resume();
  } catch (error) {
    soundControl.textContent =
      "SOUND READY";

    return;
  }

  if (
    audioContext.state !==
    "running"
  ) {
    soundControl.textContent =
      "SOUND READY";

    return;
  }

  soundEnabled = true;

  masterGain.gain.cancelScheduledValues(
    audioContext.currentTime
  );

  masterGain.gain.setValueAtTime(
    Math.max(
      masterGain.gain.value,
      0.0001
    ),
    audioContext.currentTime
  );

  masterGain.gain.exponentialRampToValueAtTime(
    0.46,
    audioContext.currentTime + 0.7
  );

  soundControl.textContent =
    "SOUND ON";

  soundControl.setAttribute(
    "aria-pressed",
    "true"
  );
}


function disableSound() {
  if (
    !audioContext ||
    !masterGain
  ) {
    return;
  }

  soundEnabled = false;

  masterGain.gain.setTargetAtTime(
    0.0001,
    audioContext.currentTime,
    0.08
  );

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
      disableSound();
    } else {
      await enableSound();
    }
  }
);


/* ==========================================
   SONS SYNTHÉTIQUES
========================================== */

function playThud(
  frequency,
  volume,
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
    frequency,
    now
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    28,
    now + 0.24
  );

  gain.gain.setValueAtTime(
    0.0001,
    now
  );

  gain.gain.exponentialRampToValueAtTime(
    volume,
    now + 0.014
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.27
  );

  oscillator.connect(
    gain
  );

  if (panner) {
    panner.pan.value = pan;

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

  oscillator.start(
    now
  );

  oscillator.stop(
    now + 0.29
  );
}


function playOwnHeartbeat() {
  playThud(
    activeSceneIndex >= 7
      ? 58
      : 64,
    0.42,
    -0.12
  );

  window.setTimeout(
    function () {
      playThud(
        49,
        0.24,
        0.08
      );
    },
    145
  );
}


function playFootstep() {
  stepSide *= -1;

  playThud(
    75,
    0.3,
    stepSide * 0.72
  );
}


function playForeignHeartbeat() {
  playThud(
    39,
    0.63,
    0.78
  );

  window.setTimeout(
    function () {
      playThud(
        34,
        0.4,
        0.84
      );
    },
    180
  );
}


function playFallingCue() {
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
    105,
    now
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    24,
    now + 1.7
  );

  gain.gain.setValueAtTime(
    0.0001,
    now
  );

  gain.gain.exponentialRampToValueAtTime(
    0.16,
    now + 0.12
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 1.8
  );

  oscillator.connect(
    gain
  );

  gain.connect(
    masterGain
  );

  oscillator.start(
    now
  );

  oscillator.stop(
    now + 1.85
  );
}


function playImpactCue() {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }

  playThud(
    105,
    0.8,
    0
  );

  const now =
    audioContext.currentTime;

  const metallic =
    audioContext.createOscillator();

  const metallicGain =
    audioContext.createGain();

  metallic.type =
    "triangle";

  metallic.frequency.setValueAtTime(
    230,
    now
  );

  metallic.frequency.exponentialRampToValueAtTime(
    47,
    now + 0.9
  );

  metallicGain.gain.setValueAtTime(
    0.0001,
    now
  );

  metallicGain.gain.exponentialRampToValueAtTime(
    0.22,
    now + 0.01
  );

  metallicGain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.95
  );

  metallic.connect(
    metallicGain
  );

  metallicGain.connect(
    masterGain
  );

  metallic.start(
    now
  );

  metallic.stop(
    now + 1
  );
}


/* ==========================================
   BATTEMENT VISUEL ET SONORE
========================================== */

function triggerVisualBeat() {
  actionPage.classList.remove(
    "beat"
  );

  void actionPage.offsetWidth;

  actionPage.classList.add(
    "beat"
  );

  window.setTimeout(
    function () {
      actionPage.classList.remove(
        "beat"
      );
    },
    720
  );
}


function heartbeatLoop() {
  window.clearTimeout(
    heartbeatTimeout
  );

  const data =
    sceneData[
      activeSceneIndex
    ];

  triggerVisualBeat();

  if (
    data.sound !== "silence"
  ) {
    playOwnHeartbeat();
  }

  if (
    data.sound === "chase" ||
    data.sound === "chase-high"
  ) {
    window.setTimeout(
      playFootstep,
      data.sound === "chase-high"
        ? 230
        : 350
    );
  }

  if (
    data.sound === "answer" ||
    data.sound === "other"
  ) {
    window.setTimeout(
      playForeignHeartbeat,
      data.sound === "other"
        ? 390
        : 560
    );
  }

  heartbeatTimeout =
    window.setTimeout(
      heartbeatLoop,
      60000 / data.bpm
    );
}


/* ==========================================
   CHANGEMENT DE SCÈNE
========================================== */

function updateScene(
  newIndex
) {
  activeSceneIndex =
    Math.max(
      0,
      Math.min(
        newIndex,
        scenes.length - 1
      )
    );

  const data =
    sceneData[
      activeSceneIndex
    ];

  actionPage.dataset.scene =
    data.visual;

  actionPage.dataset.intensity =
    data.intensity;

  scenes.forEach(
    function (
      scene,
      index
    ) {
      scene.classList.toggle(
        "active",
        index === activeSceneIndex
      );
    }
  );

  roomLocationText.textContent =
    data.location;

  installationNumber.textContent =
    data.number;

  installationTitle.textContent =
    data.title;

  installationMedium.textContent =
    data.medium;

  pulseValue.textContent =
    data.bpm +
    " BPM";

  movementStatus.textContent =
    data.movement;

  researchNumber.textContent =
    data.researchNumber;

  researchText.textContent =
    data.research;

  researchPrinciple.textContent =
    data.principle;

  researchSource.href =
    data.source;

  progressFill.style.height =
    (
      activeSceneIndex /
      (
        scenes.length -
        1
      )
    ) *
    100 +
    "%";

  if (
    audioContext &&
    drone &&
    droneGain
  ) {
    const now =
      audioContext.currentTime;

    let frequency = 43;
    let volume = 0.025;

    if (
      data.visual === "chase"
    ) {
      frequency = 51;
      volume = 0.04;
    }

    if (
      data.visual === "fall"
    ) {
      frequency = 29;
      volume = 0.07;
    }

    if (
      data.visual === "impact"
    ) {
      frequency = 37;
      volume =
        data.sound === "silence"
          ? 0.0001
          : 0.035;
    }

    if (
      data.visual === "silence"
    ) {
      frequency = 32;
      volume = 0.008;
    }

    if (
      data.visual === "answer" ||
      data.visual === "nightmare"
    ) {
      frequency = 35;
      volume = 0.065;
    }

    drone.frequency.cancelScheduledValues(
      now
    );

    drone.frequency.linearRampToValueAtTime(
      frequency,
      now + 0.8
    );

    droneGain.gain.setTargetAtTime(
      volume,
      now,
      0.35
    );
  }

  if (
    soundEnabled &&
    data.sound !== previousSoundMode
  ) {
    if (
      data.sound === "fall"
    ) {
      playFallingCue();
    }

    if (
      data.sound === "impact"
    ) {
      actionPage.classList.add(
        "impact-event"
      );

      playImpactCue();

      window.setTimeout(
        function () {
          actionPage.classList.remove(
            "impact-event"
          );
        },
        1200
      );
    }

    if (
      data.sound === "answer"
    ) {
      window.setTimeout(
        playForeignHeartbeat,
        420
      );
    }
  }

  previousSoundMode =
    data.sound;

  heartbeatLoop();
}


/* ==========================================
   OBSERVER LES SECTIONS
========================================== */

const observer =
  new IntersectionObserver(
    function (entries) {
      const visible =
        entries
          .filter(
            function (entry) {
              return entry.isIntersecting;
            }
          )
          .sort(
            function (
              first,
              second
            ) {
              return (
                second.intersectionRatio -
                first.intersectionRatio
              );
            }
          )[0];

      if (visible) {
        updateScene(
          Number(
            visible.target.dataset.index
          )
        );
      }
    },
    {
      threshold: [
        0.45,
        0.65,
        0.82
      ]
    }
  );


scenes.forEach(
  function (scene) {
    observer.observe(
      scene
    );
  }
);


/* ==========================================
   UN SCROLL = UNE PHRASE
========================================== */

window.addEventListener(
  "wheel",
  function (event) {
    if (!soundEnabled) {
      enableSound();
    }

    if (
      window.innerWidth < 800 ||
      Math.abs(event.deltaY) < 8
    ) {
      return;
    }

    event.preventDefault();

    if (scrollLocked) {
      return;
    }

    const direction =
      event.deltaY > 0
        ? 1
        : -1;

    const nextIndex =
      Math.max(
        0,
        Math.min(
          activeSceneIndex +
          direction,
          scenes.length - 1
        )
      );

    if (
      nextIndex ===
      activeSceneIndex
    ) {
      return;
    }

    scrollLocked = true;

    scenes[
      nextIndex
    ].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    window.setTimeout(
      function () {
        scrollLocked = false;
      },
      950
    );
  },
  {
    passive: false
  }
);


/* ==========================================
   ACTIVATION NATURELLE DU SON
========================================== */

window.addEventListener(
  "pointerdown",
  function (event) {
    if (
      !event.target.closest(
        "#sound-control"
      ) &&
      !soundEnabled
    ) {
      enableSound();
    }
  }
);


window.addEventListener(
  "touchstart",
  function () {
    if (!soundEnabled) {
      enableSound();
    }
  },
  {
    passive: true
  }
);


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

    actionPage.style.setProperty(
      "--pointer-x",
      horizontal *
      10 +
      "px"
    );

    actionPage.style.setProperty(
      "--pointer-y",
      vertical *
      7 +
      "px"
    );
  },
  {
    passive: true
  }
);


/* ==========================================
   INITIALISATION
========================================== */

createParticles();

updateScene(0);


/*
 * Tentative de démarrage immédiat.
 * Si Chrome bloque l’autoplay,
 * le premier scroll reprendra le son.
 */

enableSound();


window.addEventListener(
  "resize",
  createParticles
);
