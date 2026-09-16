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


const soundGate =
  document.querySelector(
    "#sound-gate"
  );


const beginAction =
  document.querySelector(
    "#begin-action"
  );


const beginSilent =
  document.querySelector(
    "#begin-silent"
  );


const soundControl =
  document.querySelector(
    "#sound-control"
  );


const soundLabel =
  document.querySelector(
    "#sound-label"
  );


const scenes =
  Array.from(
    document.querySelectorAll(
      ".action-scene"
    )
  );


const mapButtons =
  Array.from(
    document.querySelectorAll(
      ".room-map button"
    )
  );


const progressFill =
  document.querySelector(
    "#action-progress-fill"
  );


const roomLocationText =
  document.querySelector(
    "#room-location-text"
  );


const artworkNumber =
  document.querySelector(
    "#artwork-number"
  );


const artworkTitle =
  document.querySelector(
    "#artwork-title"
  );


const artworkMedium =
  document.querySelector(
    "#artwork-medium"
  );


const pulseValue =
  document.querySelector(
    "#pulse-value"
  );


const installationStatus =
  document.querySelector(
    "#installation-status"
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


const particleField =
  document.querySelector(
    "#action-particles"
  );


const enterNightmare =
  document.querySelector(
    "#enter-nightmare"
  );


/* ==========================================
   DONNÉES DES INSTALLATIONS
========================================== */

const sceneData = [
  {
    name: "entrance",

    location:
      "ROOM 05 · ACTION",

    number:
      "ROOM 05",

    title:
      "THE PULSE ROOM",

    medium:
      "Responsive light, spatial sound and kinetic installation.",

    bpm: 62,

    status:
      "WAITING",

    researchNumber:
      "RESEARCH NOTE 05.1",

    research:
      "Changes in cardiac activity may accompany emotionally intense dream experiences.",

    principle:
      "BODY · DREAM · RESPONSE"
  },

  {
    name: "pulse",

    location:
      "INSTALLATION 01 · PULSE",

    number:
      "INSTALLATION 01",

    title:
      "THE PULSE ROOM",

    medium:
      "Light sculpture, simulated biometric system and spatial sound.",

    bpm: 68,

    status:
      "RESPONDING",

    researchNumber:
      "RESEARCH NOTE 05.1",

    research:
      "The sleeping body remains physically still while autonomic activity continues to change throughout the night.",

    principle:
      "STILLNESS · NOT SILENCE"
  },

  {
    name: "chase",

    location:
      "INSTALLATION 02 · CHASE",

    number:
      "INSTALLATION 02",

    title:
      "THE CHASE",

    medium:
      "Responsive LED corridor, directional sound and controlled airflow.",

    bpm: 112,

    status:
      "ACCELERATING",

    researchNumber:
      "RESEARCH NOTE 05.2",

    research:
      "Being chased is repeatedly reported as a common dream theme, although it has no single universal meaning.",

    principle:
      "THREAT · WITHOUT CONTACT"
  },

  {
    name: "fall",

    location:
      "INSTALLATION 03 · FALL",

    number:
      "INSTALLATION 03",

    title:
      "THE FALL",

    medium:
      "Infinite reflection, sub-bass composition and haptic floor.",

    bpm: 78,

    status:
      "DESCENDING",

    researchNumber:
      "RESEARCH NOTE 05.3",

    research:
      "Dreams can produce convincing sensations of movement even while the sleeper remains in bed.",

    principle:
      "MOTION · WITHOUT MOVEMENT"
  },

  {
    name: "impact",

    location:
      "INSTALLATION 04 · IMPACT",

    number:
      "INSTALLATION 04",

    title:
      "THE IMPACT",

    medium:
      "Motion tracking, responsive projection and stereo percussion.",

    bpm: 126,

    status:
      "OVERLOADED",

    researchNumber:
      "RESEARCH NOTE 05.4",

    research:
      "Experimental recordings have found motor-cortex activity during dreamed movements in lucid REM sleep.",

    principle:
      "IMAGINED · YET ACTIVE"
  },

  {
    name: "nightmare",

    location:
      "EXIT · NIGHTMARE",

    number:
      "NEXT ROOM",

    title:
      "NIGHTMARE",

    medium:
      "The pulse continues beyond the visible gallery.",

    bpm: 72,

    status:
      "UNRESOLVED",

    researchNumber:
      "CURATORIAL TRANSITION",

    research:
      "Action ends when movement stops. Fear does not always stop with it.",

    principle:
      "ROOM 06 · NIGHTMARE"
  }
];


let activeSceneIndex = 0;

let scrollLocked = false;

let soundEnabled = false;

let experienceStarted = false;


/* ==========================================
   PARTICULES LÉGÈRES
========================================== */

function createParticles() {
  particleField.innerHTML = "";


  const particleCount =
    window.innerWidth < 700
      ? 18
      : 34;


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
      20 +
      Math.random() *
      100 +
      "%";


    particle.style.setProperty(
      "--particle-opacity",
      (
        0.12 +
        Math.random() *
        0.48
      ).toFixed(2)
    );


    particle.style.setProperty(
      "--particle-speed",
      12 +
      Math.random() *
      18 +
      "s"
    );


    particle.style.setProperty(
      "--particle-delay",
      -Math.random() *
      20 +
      "s"
    );


    particle.style.setProperty(
      "--particle-drift",
      (
        Math.random() -
        0.5
      ) *
      100 +
      "px"
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

let ambientGain = null;

let ambientLow = null;

let ambientHigh = null;

let beatTimeout = null;


/* Créer l’environnement sonore */

function createAudio() {
  if (audioContext) {
    return;
  }


  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;


  if (!AudioContextClass) {
    return;
  }


  audioContext =
    new AudioContextClass();


  masterGain =
    audioContext.createGain();


  masterGain.gain.value =
    0.34;


  masterGain.connect(
    audioContext.destination
  );


  ambientGain =
    audioContext.createGain();


  ambientGain.gain.value =
    0.025;


  ambientGain.connect(
    masterGain
  );


  ambientLow =
    audioContext.createOscillator();


  ambientLow.type =
    "sine";


  ambientLow.frequency.value =
    42;


  ambientLow.connect(
    ambientGain
  );


  ambientLow.start();


  ambientHigh =
    audioContext.createOscillator();


  ambientHigh.type =
    "sine";


  ambientHigh.frequency.value =
    86;


  const highGain =
    audioContext.createGain();


  highGain.gain.value =
    0.012;


  ambientHigh.connect(
    highGain
  );


  highGain.connect(
    masterGain
  );


  ambientHigh.start();
}


/* Créer un battement cardiaque */

function createHeartbeat() {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const now =
    audioContext.currentTime;


  /* Premier impact */

  const firstOscillator =
    audioContext.createOscillator();


  const firstGain =
    audioContext.createGain();


  firstOscillator.type =
    "sine";


  firstOscillator.frequency.setValueAtTime(
    activeSceneIndex === 3
      ? 48
      : 58,
    now
  );


  firstOscillator.frequency.exponentialRampToValueAtTime(
    35,
    now + 0.18
  );


  firstGain.gain.setValueAtTime(
    0.0001,
    now
  );


  firstGain.gain.exponentialRampToValueAtTime(
    activeSceneIndex === 4
      ? 0.55
      : 0.38,
    now + 0.018
  );


  firstGain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.22
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
    now + 0.24
  );


  /* Second impact plus court */

  const secondOscillator =
    audioContext.createOscillator();


  const secondGain =
    audioContext.createGain();


  secondOscillator.type =
    "sine";


  secondOscillator.frequency.value =
    52;


  secondGain.gain.setValueAtTime(
    0.0001,
    now + 0.14
  );


  secondGain.gain.exponentialRampToValueAtTime(
    activeSceneIndex === 4
      ? 0.34
      : 0.22,
    now + 0.155
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
    now + 0.14
  );


  secondOscillator.stop(
    now + 0.31
  );


  /* Impact métallique dans la dernière œuvre */

  if (activeSceneIndex === 4) {
    const metallicOscillator =
      audioContext.createOscillator();


    const metallicGain =
      audioContext.createGain();


    metallicOscillator.type =
      "triangle";


    metallicOscillator.frequency.value =
      174;


    metallicGain.gain.setValueAtTime(
      0.0001,
      now
    );


    metallicGain.gain.exponentialRampToValueAtTime(
      0.055,
      now + 0.01
    );


    metallicGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.55
    );


    metallicOscillator.connect(
      metallicGain
    );


    metallicGain.connect(
      masterGain
    );


    metallicOscillator.start(
      now
    );


    metallicOscillator.stop(
      now + 0.6
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
    760
  );
}


/* Boucle du cœur */

function heartbeatLoop() {
  window.clearTimeout(
    beatTimeout
  );


  if (!experienceStarted) {
    return;
  }


  createHeartbeat();

  triggerVisualBeat();


  const currentBpm =
    sceneData[
      activeSceneIndex
    ].bpm;


  const interval =
    60000 /
    currentBpm;


  beatTimeout =
    window.setTimeout(
      heartbeatLoop,
      interval
    );
}


/* Activer le son */

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


  soundControl.classList.add(
    "active"
  );


  soundControl.setAttribute(
    "aria-pressed",
    "true"
  );


  soundLabel.textContent =
    "SOUND ON";
}


/* Désactiver le son */

function disableSound() {
  soundEnabled = false;


  soundControl.classList.remove(
    "active"
  );


  soundControl.setAttribute(
    "aria-pressed",
    "false"
  );


  soundLabel.textContent =
    "SOUND OFF";
}


/* ==========================================
   COMMENCER L’EXPÉRIENCE
========================================== */

async function startExperience(
  withSound
) {
  if (experienceStarted) {
    return;
  }


  experienceStarted = true;


  actionPage.classList.add(
    "experience-started"
  );


  actionPage.classList.remove(
    "experience-locked"
  );


  if (withSound) {
    await enableSound();
  }


  updateScene(0);

  heartbeatLoop();
}


/* Les deux boutons fonctionnent réellement */

beginAction.addEventListener(
  "click",
  function () {
    startExperience(true);
  }
);


beginSilent.addEventListener(
  "click",
  function () {
    startExperience(false);
  }
);


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
   CHANGER DE SCÈNE
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


  actionPage.style.setProperty(
    "--pulse-duration",
    60000 /
    data.bpm +
    "ms"
  );


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


  mapButtons.forEach(
    function (
      button,
      index
    ) {
      button.classList.toggle(
        "active",
        index === activeSceneIndex
      );
    }
  );


  roomLocationText.textContent =
    data.location;


  artworkNumber.textContent =
    data.number;


  artworkTitle.textContent =
    data.title;


  artworkMedium.textContent =
    data.medium;


  pulseValue.textContent =
    data.bpm +
    " BPM";


  installationStatus.textContent =
    data.status;


  researchNumber.textContent =
    data.researchNumber;


  researchText.textContent =
    data.research;


  researchPrinciple.textContent =
    data.principle;


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
    ambientLow &&
    audioContext
  ) {
    const targetFrequency =
      activeSceneIndex === 3
        ? 34
        : activeSceneIndex === 4
          ? 49
          : 42;


    ambientLow.frequency.cancelScheduledValues(
      audioContext.currentTime
    );


    ambientLow.frequency.linearRampToValueAtTime(
      targetFrequency,
      audioContext.currentTime + 1
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
        0.35,
        0.55,
        0.75
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
   UN SCROLL = UNE INSTALLATION
========================================== */

window.addEventListener(
  "wheel",
  function (event) {
    if (
      !experienceStarted ||
      window.innerWidth < 800
    ) {
      return;
    }


    if (
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


/* Navigation clavier */

window.addEventListener(
  "keydown",
  function (event) {
    if (!experienceStarted) {
      return;
    }


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


/* Plan de salle cliquable */

mapButtons.forEach(
  function (button) {
    button.addEventListener(
      "click",
      function () {
        const destination =
          Number(
            button.dataset.destination
          );


        scenes[
          destination
        ].scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    );
  }
);


/* ==========================================
   PARALLAXE DISCRÈTE
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
      12 +
      "px"
    );


    actionPage.style.setProperty(
      "--pointer-y",
      vertical *
      8 +
      "px"
    );
  },
  {
    passive: true
  }
);


/* ==========================================
   SORTIE VERS LE CAUCHEMAR
========================================== */

enterNightmare.addEventListener(
  "click",
  function (event) {
    event.preventDefault();


    if (
      actionPage.classList.contains(
        "leaving-action"
      )
    ) {
      return;
    }


    actionPage.classList.add(
      "leaving-action"
    );


    window.setTimeout(
      function () {
        window.location.href =
          "nightmare.html";
      },
      1250
    );
  }
);


/* ==========================================
   INITIALISATION
========================================== */

actionPage.classList.add(
  "experience-locked"
);


createParticles();

updateScene(0);


window.addEventListener(
  "resize",
  createParticles
);
