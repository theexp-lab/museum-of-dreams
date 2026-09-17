/* ==========================================
   THE MUSEUM OF DREAMS
   FINAL ROOM — AWAKENING
========================================== */


const awakeningPage =
  document.body;


const awakeningBeats = [
  ...document.querySelectorAll(
    ".awakening-beat"
  )
];


const awakeningScenes =
  awakeningBeats.map(
    function (beat) {
      return beat.dataset.scene;
    }
  );


const progressFill =
  document.querySelector(
    "#awakening-progress-fill"
  );


const awakeningCue =
  document.querySelector(
    "#awakening-cue"
  );


const sleepState =
  document.querySelector(
    "#sleep-state"
  );


const heartState =
  document.querySelector(
    "#heart-state"
  );


const recallState =
  document.querySelector(
    "#recall-state"
  );


const dustField =
  document.querySelector(
    "#dust-field"
  );

const morningSoundToggle =
  document.querySelector(
    "#morning-sound-toggle"
  );

let activeIndex =
  -1;


let wheelLocked =
  false;


let touchStartY =
  0;


/* ==========================================
   OUTILS
========================================== */

function clamp(
  value,
  minimum,
  maximum
) {
  return Math.min(
    Math.max(
      value,
      minimum
    ),
    maximum
  );
}


/* ==========================================
   PARTICULES DE POUSSIÈRE
========================================== */

function createDust() {
  const count =
    window.innerWidth < 700
      ? 24
      : 48;


  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const particle =
      document.createElement(
        "span"
      );


    particle.className =
      "dust";


    particle.style.left =
      40 +
      Math.random() *
      35 +
      "%";


    particle.style.top =
      12 +
      Math.random() *
      64 +
      "%";


    particle.style.setProperty(
      "--duration",

      4 +
      Math.random() *
      6 +
      "s"
    );


    particle.style.setProperty(
      "--delay",

      Math.random() *
      -8 +
      "s"
    );


    particle.style.transform =
      "scale(" +
      (
        0.45 +
        Math.random() *
        1.1
      ) +
      ")";


    dustField.appendChild(
      particle
    );
  }
}


/* ==========================================
   MONITEUR DU RÉVEIL
========================================== */

function updateMonitor(scene) {
  if (
    scene === "light"
  ) {
    sleepState.textContent =
      "REM";


    heartState.textContent =
      "ELEVATED";


    recallState.textContent =
      "UNSTABLE";


    return;
  }


  if (
    scene === "return" ||
    scene === "title"
  ) {
    sleepState.textContent =
      "REM → AWAKE";


    heartState.textContent =
      "SETTLING";


    recallState.textContent =
      "ACTIVE";


    return;
  }


  if (
    scene === "feeling" ||
    scene === "fragments"
  ) {
    sleepState.textContent =
      "AWAKE";


    heartState.textContent =
      "NORMAL";


    recallState.textContent =
      "FADING";


    return;
  }


  sleepState.textContent =
    "AWAKE";


  heartState.textContent =
    "NORMAL";


  recallState.textContent =
    scene === "exit"
      ? "ARCHIVED"
      : "FRAGILE";
}


/* ==========================================
   ACTIVER UNE SCÈNE
========================================== */

function activateScene(index) {
  const nextIndex =
    clamp(
      index,
      0,
      awakeningBeats.length - 1
    );


  if (
    nextIndex ===
    activeIndex
  ) {
    return;
  }


  activeIndex =
    nextIndex;


  const scene =
    awakeningScenes[
      activeIndex
    ];


  awakeningBeats.forEach(
    function (
      beat,
      beatIndex
    ) {
      beat.classList.toggle(
        "is-active",
        beatIndex === activeIndex
      );
    }
  );


  awakeningPage.dataset.scene =
    scene;


  const progress =
    activeIndex /
    (
      awakeningBeats.length -
      1
    );


  awakeningPage.style.setProperty(
    "--scene-progress",
    progress
  );


  progressFill.style.height =
    progress *
    100 +
    "%";


  if (
    scene === "light"
  ) {
    awakeningCue.textContent =
      "LET YOUR EYES ADJUST";
  } else if (
    scene === "exit"
  ) {
    awakeningCue.textContent =
      "CONTINUE THE VISIT";
  } else {
    awakeningCue.textContent =
      "RETURN TO THE ROOM";
  }


  updateMonitor(scene);
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
        activateScene(
          awakeningBeats.indexOf(
            visible.target
          )
        );
      }
    },

    {
      threshold: [
        0.58,
        0.74
      ]
    }
  );


awakeningBeats.forEach(
  function (beat) {
    observer.observe(beat);
  }
);


/* ==========================================
   ALLER À UNE SECTION
========================================== */

function goToBeat(index) {
  const target =
    clamp(
      index,
      0,
      awakeningBeats.length - 1
    );


  awakeningBeats[
    target
  ].scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* ==========================================
   MOLETTE
========================================== */

window.addEventListener(
  "wheel",

  function (event) {
    if (
      Math.abs(
        event.deltaY
      ) <
      8
    ) {
      return;
    }


    event.preventDefault();


    if (wheelLocked) {
      return;
    }


    wheelLocked =
      true;


    goToBeat(
      activeIndex +
      (
        event.deltaY > 0
          ? 1
          : -1
      )
    );


    window.setTimeout(
      function () {
        wheelLocked =
          false;
      },

      850
    );
  },

  {
    passive: false
  }
);


/* ==========================================
   CLAVIER
========================================== */

window.addEventListener(
  "keydown",

  function (event) {
    const acceptedKeys = [
      "ArrowDown",
      "ArrowUp",
      "PageDown",
      "PageUp",
      " "
    ];


    if (
      !acceptedKeys.includes(
        event.key
      )
    ) {
      return;
    }


    if (
      event.target.closest("a")
    ) {
      return;
    }


    event.preventDefault();


    const backward =
      event.key === "ArrowUp" ||
      event.key === "PageUp";


    goToBeat(
      activeIndex +
      (
        backward
          ? -1
          : 1
      )
    );
  }
);


/* ==========================================
   MOBILE
========================================== */

window.addEventListener(
  "touchstart",

  function (event) {
    touchStartY =
      event
        .changedTouches[0]
        .clientY;
  },

  {
    passive: true
  }
);


window.addEventListener(
  "touchend",

  function (event) {
    const difference =
      touchStartY -
      event
        .changedTouches[0]
        .clientY;


    if (
      Math.abs(
        difference
      ) <
      45 ||
      wheelLocked
    ) {
      return;
    }


    wheelLocked =
      true;


    goToBeat(
      activeIndex +
      (
        difference > 0
          ? 1
          : -1
      )
    );


    window.setTimeout(
      function () {
        wheelLocked =
          false;
      },

      850
    );
  },

  {
    passive: true
  }
);

/* ==========================================
   PAYSAGE SONORE DU MATIN
========================================== */

let morningAudioContext;

let morningMasterGain;

let morningAirGain;

let morningAirFilter;

let birdTimer;

let morningAudioReady =
  false;


let morningSoundEnabled =
  localStorage.getItem(
    "museumSound"
  ) !== "off";


/* ==========================================
   METTRE À JOUR LE BOUTON
========================================== */

function updateMorningSoundButton() {
  morningSoundToggle.textContent =
    morningSoundEnabled
      ? "MORNING SOUND ON"
      : "MORNING SOUND OFF";


  morningSoundToggle.setAttribute(
    "aria-pressed",
    String(morningSoundEnabled)
  );
}


/* ==========================================
   CRÉER LE FOND D’AIR DU MATIN
========================================== */

function createMorningAir() {
  const length =
    morningAudioContext.sampleRate *
    3;


  const buffer =
    morningAudioContext.createBuffer(
      1,
      length,
      morningAudioContext.sampleRate
    );


  const data =
    buffer.getChannelData(0);


  let previousValue =
    0;


  for (
    let index = 0;
    index < length;
    index += 1
  ) {
    const randomValue =
      Math.random() * 2 -
      1;


    previousValue =
      previousValue * 0.98 +
      randomValue * 0.02;


    data[index] =
      previousValue;
  }


  const source =
    morningAudioContext
      .createBufferSource();


  source.buffer =
    buffer;


  source.loop =
    true;


  morningAirFilter =
    morningAudioContext
      .createBiquadFilter();


  morningAirFilter.type =
    "lowpass";


  morningAirFilter.frequency.value =
    1100;


  morningAirGain =
    morningAudioContext
      .createGain();


  morningAirGain.gain.value =
    morningSoundEnabled
      ? 0.018
      : 0.0001;


  source
    .connect(morningAirFilter)
    .connect(morningAirGain)
    .connect(morningMasterGain);


  source.start();
}


/* ==========================================
   INITIALISER LE SON
========================================== */

function ensureMorningAudio() {
  if (!morningAudioReady) {
    morningAudioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();


    morningMasterGain =
      morningAudioContext
        .createGain();


    morningMasterGain.gain.value =
      morningSoundEnabled
        ? 0.72
        : 0.0001;


    morningMasterGain.connect(
      morningAudioContext.destination
    );


    createMorningAir();


    morningAudioReady =
      true;
  }


  if (
    morningAudioContext.state ===
    "suspended"
  ) {
    morningAudioContext.resume();
  }
}


/* ==========================================
   CRÉER UN CHANT D’OISEAU
========================================== */

function createBirdNote(
  startFrequency,
  endFrequency,
  duration,
  volume,
  delay,
  pan
) {
  if (
    !morningAudioReady ||
    !morningSoundEnabled
  ) {
    return;
  }


  const startTime =
    morningAudioContext.currentTime +
    delay;


  const oscillator =
    morningAudioContext
      .createOscillator();


  const gain =
    morningAudioContext
      .createGain();


  const panner =
    morningAudioContext
      .createStereoPanner();


  oscillator.type =
    "sine";


  oscillator.frequency.setValueAtTime(
    startFrequency,
    startTime
  );


  oscillator.frequency.exponentialRampToValueAtTime(
    endFrequency,
    startTime +
    duration
  );


  panner.pan.value =
    pan;


  gain.gain.setValueAtTime(
    0.0001,
    startTime
  );


  gain.gain.exponentialRampToValueAtTime(
    volume,
    startTime +
    0.025
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    startTime +
    duration
  );


  oscillator
    .connect(gain)
    .connect(panner)
    .connect(morningMasterGain);


  oscillator.start(
    startTime
  );


  oscillator.stop(
    startTime +
    duration +
    0.05
  );
}


/* ==========================================
   PETITE PHRASE D’OISEAU
========================================== */

function birdPhrase() {
  if (
    !morningSoundEnabled ||
    !morningAudioReady
  ) {
    return;
  }


  const pan =
    Math.random() *
    1.5 -
    0.75;


  const baseFrequency =
    2300 +
    Math.random() *
    1100;


  const notes =
    2 +
    Math.floor(
      Math.random() *
      3
    );


  for (
    let index = 0;
    index < notes;
    index += 1
  ) {
    const delay =
      index *
      (
        0.11 +
        Math.random() *
        0.08
      );


    const direction =
      Math.random() >
      0.35;


    createBirdNote(
      direction
        ? baseFrequency
        : baseFrequency * 1.45,

      direction
        ? baseFrequency * 1.55
        : baseFrequency * 0.86,

      0.1 +
      Math.random() *
      0.11,

      0.018 +
      Math.random() *
      0.018,

      delay,

      pan
    );
  }


  /*
   * Un second oiseau répond parfois
   * depuis l’autre côté de la pièce.
   */

  if (
    Math.random() >
    0.62
  ) {
    createBirdNote(
      3100,
      4700,
      0.16,
      0.018,
      0.65,
      pan * -1
    );


    createBirdNote(
      4300,
      3500,
      0.13,
      0.014,
      0.86,
      pan * -1
    );
  }
}


/* ==========================================
   PROGRAMMER LES OISEAUX
========================================== */

function scheduleBirds() {
  window.clearTimeout(
    birdTimer
  );


  if (
    !morningSoundEnabled ||
    !morningAudioReady
  ) {
    return;
  }


  const delay =
    2200 +
    Math.random() *
    3800;


  birdTimer =
    window.setTimeout(
      function () {
        birdPhrase();

        scheduleBirds();
      },
      delay
    );
}


/* ==========================================
   DÉMARRER LE MATIN
========================================== */

function startMorningSound() {
  ensureMorningAudio();


  if (!morningSoundEnabled) {
    return;
  }


  morningMasterGain.gain.setTargetAtTime(
    0.72,
    morningAudioContext.currentTime,
    0.35
  );


  morningAirGain.gain.setTargetAtTime(
    0.018,
    morningAudioContext.currentTime,
    0.6
  );


  birdPhrase();

  scheduleBirds();
}


/* ==========================================
   PREMIÈRE INTERACTION

   Chrome empêche le vrai autoplay.
   Le son commence donc au premier scroll,
   clic, toucher ou appui clavier.
========================================== */

function unlockMorningSound() {
  if (morningSoundEnabled) {
    startMorningSound();
  }
}


window.addEventListener(
  "pointerdown",
  unlockMorningSound,
  {
    once: true,
    passive: true
  }
);


window.addEventListener(
  "wheel",
  unlockMorningSound,
  {
    once: true,
    passive: true
  }
);


window.addEventListener(
  "touchstart",
  unlockMorningSound,
  {
    once: true,
    passive: true
  }
);


window.addEventListener(
  "keydown",
  unlockMorningSound,
  {
    once: true
  }
);


/* ==========================================
   BOUTON SOUND ON / OFF
========================================== */

morningSoundToggle.addEventListener(
  "click",
  function () {
    ensureMorningAudio();


    morningSoundEnabled =
      !morningSoundEnabled;


    localStorage.setItem(
      "museumSound",

      morningSoundEnabled
        ? "on"
        : "off"
    );


    updateMorningSoundButton();


    if (morningSoundEnabled) {
      startMorningSound();
    } else {
      window.clearTimeout(
        birdTimer
      );


      morningMasterGain.gain.setTargetAtTime(
        0.0001,
        morningAudioContext.currentTime,
        0.18
      );
    }
  }
);
/* ==========================================
   INITIALISATION
========================================== */

window.history.scrollRestoration =
  "manual";


window.scrollTo(
  0,
  0
);


createDust();

updateMorningSoundButton();

activateScene(0);
