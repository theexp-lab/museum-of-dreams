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
   CONTENU DES MOUVEMENTS
========================================== */

const sceneData = [
  {
    name:
      "introduction",

    location:
      "ROOM 05 · ACTION",

    number:
      "ROOM 05",

    title:
      "THE BODY THAT NEVER MOVED",

    medium:
      "KINETIC LIGHT · SPATIAL SOUND · RESPONSIVE ARCHITECTURE",

    bpm: 66,

    movement:
      "STILLNESS",

    researchNumber:
      "RESEARCH NOTE 05.1",

    research:
      "Changes in cardiac activity may accompany emotionally intense dream experiences.",

    principle:
      "BODY · DREAM · RESPONSE",

    source:
      "https://pubmed.ncbi.nlm.nih.gov/25565936/"
  },

  {
    name:
      "chase",

    location:
      "MOVEMENT 01 · THE CHASE",

    number:
      "MOVEMENT 01",

    title:
      "THE CHASE",

    medium:
      "RESPONSIVE LIGHT CORRIDOR · DIRECTIONAL SOUND",

    bpm: 108,

    movement:
      "ACCELERATING",

    researchNumber:
      "RESEARCH NOTE 05.2",

    research:
      "Being chased is repeatedly reported as a common dream theme, without having one universal psychological meaning.",

    principle:
      "THREAT · WITHOUT CONTACT",

    source:
      "https://pubmed.ncbi.nlm.nih.gov/15612605/"
  },

  {
    name:
      "fall",

    location:
      "MOVEMENT 02 · THE FALL",

    number:
      "MOVEMENT 02",

    title:
      "THE FALL",

    medium:
      "GENERATIVE PROJECTION · SUB-BASS · HAPTIC FLOOR",

    bpm: 74,

    movement:
      "DESCENDING",

    researchNumber:
      "RESEARCH NOTE 05.3",

    research:
      "Dreams can create convincing sensations of movement while the sleeper remains in bed.",

    principle:
      "MOTION · WITHOUT MOVEMENT",

    source:
      "https://pubmed.ncbi.nlm.nih.gov/25565936/"
  },

  {
    name:
      "impact",

    location:
      "MOVEMENT 03 · THE IMPACT",

    number:
      "MOVEMENT 03",

    title:
      "THE IMPACT",

    medium:
      "MOTION TRACKING · RESPONSIVE PROJECTION · PERCUSSION",

    bpm: 126,

    movement:
      "IMPACT",

    researchNumber:
      "RESEARCH NOTE 05.4",

    research:
      "Motor-cortex activity has been recorded during dreamed movements in a small lucid-REM experiment.",

    principle:
      "IMAGINED · YET ACTIVE",

    source:
      "https://pubmed.ncbi.nlm.nih.gov/22036177/"
  },

  {
    name:
      "nightmare",

    location:
      "ROOM 06 · NIGHTMARE",

    number:
      "TRANSITION",

    title:
      "THE PULSE CONTINUES",

    medium:
      "SPATIAL SOUND · LOW-FREQUENCY LIGHT",

    bpm: 82,

    movement:
      "UNRESOLVED",

    researchNumber:
      "CURATORIAL TRANSITION",

    research:
      "The movement has stopped. The physiological tension has not entirely disappeared.",

    principle:
      "ACTION · BECOMES · FEAR",

    source:
      "https://pubmed.ncbi.nlm.nih.gov/25565936/"
  }
];


let activeSceneIndex = 0;

let scrollLocked = false;


/* ==========================================
   PARTICULES
========================================== */

function createParticles() {
  particleField.innerHTML =
    "";


  const particleCount =
    window.innerWidth < 700
      ? 12
      : 24;


  for (
    let index = 0;
    index < particleCount;
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

let droneOne = null;

let droneTwo = null;

let soundEnabled = false;

let heartbeatTimeout = null;


/* Créer l’environnement sonore */

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
    0.028;


  droneGain.connect(
    masterGain
  );


  droneOne =
    audioContext.createOscillator();


  droneOne.type =
    "sine";


  droneOne.frequency.value =
    43;


  droneOne.connect(
    droneGain
  );


  droneOne.start();


  droneTwo =
    audioContext.createOscillator();


  droneTwo.type =
    "sine";


  droneTwo.frequency.value =
    86;


  const upperDroneGain =
    audioContext.createGain();


  upperDroneGain.gain.value =
    0.009;


  droneTwo.connect(
    upperDroneGain
  );


  upperDroneGain.connect(
    masterGain
  );


  droneTwo.start();
}


/* Activer le son sans écran supplémentaire */

async function enableSound() {
  createAudio();


  if (!audioContext) {
    return;
  }


  if (
    audioContext.state ===
    "suspended"
  ) {
    await audioContext.resume();
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
    0.42,
    audioContext.currentTime + 0.8
  );


  soundControl.textContent =
    "SOUND ON";


  soundControl.setAttribute(
    "aria-pressed",
    "true"
  );
}


/* Couper le son */

function disableSound() {
  if (
    !audioContext ||
    !masterGain
  ) {
    return;
  }


  soundEnabled = false;


  masterGain.gain.cancelScheduledValues(
    audioContext.currentTime
  );


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


/* Premier mouvement = activation naturelle */

function activateSoundFromMovement(
  event
) {
  if (
    event.target &&
    event.target.closest &&
    event.target.closest(
      "#sound-control"
    )
  ) {
    return;
  }


  if (!soundEnabled) {
    enableSound();
  }
}


window.addEventListener(
  "pointerdown",
  activateSoundFromMovement,
  {
    passive: true
  }
);


window.addEventListener(
  "touchstart",
  activateSoundFromMovement,
  {
    passive: true
  }
);


window.addEventListener(
  "keydown",
  activateSoundFromMovement
);


/* Contrôle manuel */

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
   BATTEMENT
========================================== */

function createHeartbeatSound() {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const now =
    audioContext.currentTime;


  const data =
    sceneData[
      activeSceneIndex
    ];


  const firstOscillator =
    audioContext.createOscillator();


  const firstGain =
    audioContext.createGain();


  firstOscillator.type =
    "sine";


  firstOscillator.frequency.setValueAtTime(
    activeSceneIndex === 2
      ? 46
      : 62,
    now
  );


  firstOscillator.frequency.exponentialRampToValueAtTime(
    32,
    now + 0.22
  );


  firstGain.gain.setValueAtTime(
    0.0001,
    now
  );


  firstGain.gain.exponentialRampToValueAtTime(
    activeSceneIndex === 3
      ? 0.62
      : 0.4,
    now + 0.015
  );


  firstGain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.25
  );


  firstOscillator.connect(
    firstGain
  );


  firstGain.connect(
    masterGain
  );


  firstOscillator.start(
    now
  );


  firstOscillator.stop(
    now + 0.27
  );


  const secondOscillator =
    audioContext.createOscillator();


  const secondGain =
    audioContext.createGain();


  secondOscillator.type =
    "sine";


  secondOscillator.frequency.value =
    48;


  secondGain.gain.setValueAtTime(
    0.0001,
    now + 0.13
  );


  secondGain.gain.exponentialRampToValueAtTime(
    0.24,
    now + 0.15
  );


  secondGain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.29
  );


  secondOscillator.connect(
    secondGain
  );


  secondGain.connect(
    masterGain
  );


  secondOscillator.start(
    now + 0.13
  );


  secondOscillator.stop(
    now + 0.31
  );


  /* Son métallique pour Impact */

  if (
    data.name ===
    "impact"
  ) {
    const impactOscillator =
      audioContext.createOscillator();


    const impactGain =
      audioContext.createGain();


    impactOscillator.type =
      "triangle";


    impactOscillator.frequency.value =
      178;


    impactGain.gain.setValueAtTime(
      0.0001,
      now
    );


    impactGain.gain.exponentialRampToValueAtTime(
      0.06,
      now + 0.012
    );


    impactGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.48
    );


    impactOscillator.connect(
      impactGain
    );


    impactGain.connect(
      masterGain
    );


    impactOscillator.start(
      now
    );


    impactOscillator.stop(
      now + 0.5
    );
  }
}


/* Battement visuel */

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


/* Boucle */

function heartbeatLoop() {
  window.clearTimeout(
    heartbeatTimeout
  );


  triggerVisualBeat();

  createHeartbeatSound();


  const bpm =
    sceneData[
      activeSceneIndex
    ].bpm;


  heartbeatTimeout =
    window.setTimeout(
      heartbeatLoop,
      60000 / bpm
    );
}


/* ==========================================
   CHANGEMENT DE MOUVEMENT
========================================== */

function updateScene(
  newIndex
) {
  const safeIndex =
    Math.max(
      0,
      Math.min(
        newIndex,
        scenes.length - 1
      )
    );


  activeSceneIndex =
    safeIndex;


  const data =
    sceneData[
      activeSceneIndex
    ];


  actionPage.dataset.scene =
    data.name;


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
        scenes.length - 1
      )
    ) *
    100 +
    "%";


  if (
    audioContext &&
    droneOne &&
    droneGain
  ) {
    const now =
      audioContext.currentTime;


    const frequency =
      data.name === "fall"
        ? 34
        : data.name === "impact"
          ? 48
          : data.name === "nightmare"
            ? 38
            : 43;


    droneOne.frequency.cancelScheduledValues(
      now
    );


    droneOne.frequency.linearRampToValueAtTime(
      frequency,
      now + 0.8
    );


    droneGain.gain.setTargetAtTime(
      data.name === "nightmare"
        ? 0.055
        : 0.028,
      now,
      0.4
    );
  }
}


/* ==========================================
   OBSERVER LES SECTIONS
========================================== */

const sceneObserver =
  new IntersectionObserver(
    function (entries) {
      let strongestEntry = null;


      entries.forEach(
        function (entry) {
          if (
            entry.isIntersecting &&
            (
              !strongestEntry ||
              entry.intersectionRatio >
              strongestEntry.intersectionRatio
            )
          ) {
            strongestEntry =
              entry;
          }
        }
      );


      if (strongestEntry) {
        updateScene(
          Number(
            strongestEntry.target.dataset.index
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
    sceneObserver.observe(
      scene
    );
  }
);


/* ==========================================
   UN SCROLL = UN MOUVEMENT
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


/* Clavier */

window.addEventListener(
  "keydown",
  function (event) {
    let direction = 0;


    if (
      event.key === "ArrowDown" ||
      event.key === "PageDown"
    ) {
      direction = 1;
    }


    if (
      event.key === "ArrowUp" ||
      event.key === "PageUp"
    ) {
      direction = -1;
    }


    if (!direction) {
      return;
    }


    event.preventDefault();


    const nextIndex =
      Math.max(
        0,
        Math.min(
          activeSceneIndex +
          direction,
          scenes.length - 1
        )
      );


    scenes[
      nextIndex
    ].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
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

heartbeatLoop();


window.addEventListener(
  "resize",
  createParticles
);
