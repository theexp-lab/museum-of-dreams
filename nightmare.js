/* ==========================================
   THE MUSEUM OF DREAMS
   ROOM 06 — NIGHTMARE
========================================== */


/* ==========================================
   ÉLÉMENTS
========================================== */

const body =
  document.body;


const beats = [
  ...document.querySelectorAll(
    ".nightmare-beat"
  )
];


const sceneNames =
  beats.map(
    function (beat) {
      return beat.dataset.scene;
    }
  );


const soundToggle =
  document.querySelector(
    "#sound-toggle"
  );


const progressFill =
  document.querySelector(
    "#nightmare-progress-fill"
  );


const scrollCue =
  document.querySelector(
    "#scroll-cue"
  );


const containmentStatus =
  document.querySelector(
    "#containment-status"
  );


const bodyCount =
  document.querySelector(
    "#body-count"
  );


const pulseCount =
  document.querySelector(
    "#pulse-count"
  );


const threatDistance =
  document.querySelector(
    "#threat-distance"
  );


const dreamIntegrity =
  document.querySelector(
    "#dream-integrity"
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


const forceEye =
  document.querySelector(
    "#force-eye"
  );


const forceLabel =
  document.querySelector(
    ".force-label"
  );


/* ==========================================
   ROOM NOTES
========================================== */

const nightmareNotesButton =
  document.querySelector(
    "#nightmare-notes-button"
  );


const nightmareNotesPanel =
  document.querySelector(
    "#nightmare-notes-panel"
  );


const nightmareNotesBackdrop =
  document.querySelector(
    "#nightmare-notes-backdrop"
  );


const nightmareNotesClose =
  document.querySelector(
    "#nightmare-notes-close"
  );


/* ==========================================
   ÉTAT DE LA PAGE
========================================== */

let activeIndex = -1;

let scrollFrame = null;

let pointerFrame = null;

let pointerX = 50;

let pointerY = 50;

let soundEnabled = false;

let audioReady = false;

let escapeComplete = false;


/* ==========================================
   AUDIO
========================================== */

let audioContext;

let masterGain;

let ambienceGain;

let ambienceFilter;

let humGain;

let humOscillator;

let subGain;

let subOscillator;

let heartbeatTimer = null;

let thirdPulseTimer = null;

let footstepTimer = null;

let breathingTimer = null;

let panicTimer = null;

let uncannyTimer = null;


/* ==========================================
   OUVERTURE DE L’ŒIL
========================================== */

let holdFrame = null;

let holdStart = 0;

let isHolding = false;


const HOLD_DURATION =
  2800;


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


function randomBetween(
  minimum,
  maximum
) {
  return (
    minimum +
    Math.random() *
    (
      maximum -
      minimum
    )
  );
}


/* ==========================================
   BOUTON AUDIO
========================================== */

function updateSoundButton() {
  if (!soundToggle) {
    return;
  }


  soundToggle.textContent =
    soundEnabled
      ? "SOUND ON"
      : "ENABLE SOUND";


  soundToggle.setAttribute(
    "aria-pressed",
    String(
      soundEnabled
    )
  );
}


/* ==========================================
   PRÉCHARGEMENT DES IMAGES
========================================== */

function preloadImages() {
  const images = [
    "./nightmare-reveal.png",
    "./nightmare-corruption.png",
    "./nightmare-eye.png",
    "./nightmare-eye-open.png",
    "./nightmare-figure.png"
  ];


  images.forEach(
    function (source) {
      const image =
        new Image();


      image.src =
        source;
    }
  );
}


/* ==========================================
   INITIALISER L’AUDIO
========================================== */

function ensureAudio() {
  if (audioReady) {
    return;
  }


  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;


  if (!AudioContextClass) {
    throw new Error(
      "Web Audio is unavailable."
    );
  }


  audioContext =
    new AudioContextClass();


  masterGain =
    audioContext.createGain();


  masterGain.gain.value =
    soundEnabled
      ? 0.82
      : 0.0001;


  masterGain.connect(
    audioContext.destination
  );


  createAtmosphere();


  audioReady = true;
}


/* ==========================================
   ATMOSPHÈRE CONTINUE
========================================== */

function createAtmosphere() {
  const length =
    Math.floor(
      audioContext.sampleRate *
      3
    );


  const buffer =
    audioContext.createBuffer(
      1,
      length,
      audioContext.sampleRate
    );


  const data =
    buffer.getChannelData(
      0
    );


  let lastValue = 0;


  for (
    let index = 0;
    index < length;
    index += 1
  ) {
    const whiteNoise =
      Math.random() *
      2 -
      1;


    lastValue =
      lastValue *
      0.96 +
      whiteNoise *
      0.04;


    data[index] =
      lastValue *
      2.6;
  }


  const noise =
    audioContext.createBufferSource();


  noise.buffer =
    buffer;


  noise.loop =
    true;


  ambienceFilter =
    audioContext.createBiquadFilter();


  ambienceFilter.type =
    "bandpass";


  ambienceFilter.frequency.value =
    350;


  ambienceFilter.Q.value =
    0.7;


  ambienceGain =
    audioContext.createGain();


  ambienceGain.gain.value =
    0.0001;


  noise
    .connect(
      ambienceFilter
    )
    .connect(
      ambienceGain
    )
    .connect(
      masterGain
    );


  noise.start();


  /* Ronflement électrique */

  humOscillator =
    audioContext.createOscillator();


  humOscillator.type =
    "triangle";


  humOscillator.frequency.value =
    48;


  humGain =
    audioContext.createGain();


  humGain.gain.value =
    0.0001;


  humOscillator
    .connect(
      humGain
    )
    .connect(
      masterGain
    );


  humOscillator.start();


  /* Infragrave */

  subOscillator =
    audioContext.createOscillator();


  subOscillator.type =
    "sine";


  subOscillator.frequency.value =
    28;


  subGain =
    audioContext.createGain();


  subGain.gain.value =
    0.0001;


  subOscillator
    .connect(
      subGain
    )
    .connect(
      masterGain
    );


  subOscillator.start();
}


/* ==========================================
   NOTE SYNTHÉTISÉE
========================================== */

function tone(
  frequency,
  duration,
  volume,
  type = "sine",
  delay = 0,
  pan = 0
) {
  if (
    !soundEnabled ||
    !audioReady
  ) {
    return;
  }


  const now =
    audioContext.currentTime +
    delay;


  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  oscillator.type =
    type;


  oscillator.frequency.setValueAtTime(
    frequency,
    now
  );


  gain.gain.setValueAtTime(
    0.0001,
    now
  );


  gain.gain.exponentialRampToValueAtTime(
    Math.max(
      0.0002,
      volume
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


  if (
    audioContext.createStereoPanner
  ) {
    const panner =
      audioContext.createStereoPanner();


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


  oscillator.start(
    now
  );


  oscillator.stop(
    now +
    duration +
    0.08
  );
}


/* ==========================================
   BRUIT SYNTHÉTISÉ
========================================== */

function noiseBurst(
  duration = 0.45,
  volume = 0.08,
  frequency = 700,
  pan = 0
) {
  if (
    !soundEnabled ||
    !audioReady
  ) {
    return;
  }


  const length =
    Math.max(
      1,
      Math.floor(
        audioContext.sampleRate *
        duration
      )
    );


  const buffer =
    audioContext.createBuffer(
      1,
      length,
      audioContext.sampleRate
    );


  const data =
    buffer.getChannelData(
      0
    );


  for (
    let index = 0;
    index < length;
    index += 1
  ) {
    data[index] =
      (
        Math.random() *
        2 -
        1
      ) *
      (
        1 -
        index /
        length
      );
  }


  const source =
    audioContext.createBufferSource();


  const filter =
    audioContext.createBiquadFilter();


  const gain =
    audioContext.createGain();


  source.buffer =
    buffer;


  filter.type =
    "bandpass";


  filter.frequency.value =
    frequency;


  filter.Q.value =
    0.85;


  gain.gain.setValueAtTime(
    Math.max(
      0.0002,
      volume
    ),
    audioContext.currentTime
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime +
    duration
  );


  source
    .connect(
      filter
    )
    .connect(
      gain
    );


  if (
    audioContext.createStereoPanner
  ) {
    const panner =
      audioContext.createStereoPanner();


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


  source.start();
}


/* ==========================================
   RESPIRATION
========================================== */

function humanBreath(
  speed = 1,
  strength = 1,
  pan = -0.24
) {
  if (
    !soundEnabled ||
    !audioReady
  ) {
    return;
  }


  const duration =
    1.45 /
    speed;


  const length =
    Math.floor(
      audioContext.sampleRate *
      duration
    );


  const buffer =
    audioContext.createBuffer(
      1,
      length,
      audioContext.sampleRate
    );


  const data =
    buffer.getChannelData(
      0
    );


  for (
    let index = 0;
    index < length;
    index += 1
  ) {
    const position =
      index /
      length;


    const envelope =
      Math.sin(
        Math.PI *
        position
      );


    data[index] =
      (
        Math.random() *
        2 -
        1
      ) *
      envelope;
  }


  const source =
    audioContext.createBufferSource();


  const filter =
    audioContext.createBiquadFilter();


  const gain =
    audioContext.createGain();


  source.buffer =
    buffer;


  filter.type =
    "bandpass";


  filter.frequency.value =
    620 +
    speed *
    90;


  filter.Q.value =
    0.55;


  gain.gain.value =
    0.045 *
    strength;


  source
    .connect(
      filter
    )
    .connect(
      gain
    );


  if (
    audioContext.createStereoPanner
  ) {
    const panner =
      audioContext.createStereoPanner();


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


  source.start();
}


function stopBreathing() {
  window.clearInterval(
    breathingTimer
  );


  breathingTimer = null;
}


function setBreathing(
  period,
  speed = 1,
  strength = 1
) {
  stopBreathing();


  if (
    !soundEnabled ||
    !audioReady
  ) {
    return;
  }


  humanBreath(
    speed,
    strength
  );


  breathingTimer =
    window.setInterval(
      function () {
        humanBreath(
          speed,
          strength,
          randomBetween(
            -0.45,
            0.2
          )
        );
      },
      period
    );
}


/* ==========================================
   CŒUR PRINCIPAL
========================================== */

function heartbeat(
  strength = 1,
  panic = false
) {
  tone(
    52,
    0.17,
    0.31 *
    strength,
    "sine"
  );


  tone(
    39,
    0.24,
    0.23 *
    strength,
    "sine",
    0.16
  );


  if (panic) {
    tone(
      69,
      0.11,
      0.12 *
      strength,
      "triangle",
      0.39,
      0.16
    );


    tone(
      34,
      0.26,
      0.35 *
      strength,
      "sine",
      0.43,
      0.16
    );
  }
}


function stopHeartbeat() {
  window.clearInterval(
    heartbeatTimer
  );


  heartbeatTimer = null;
}


function setHeartbeat(
  period,
  strength = 1,
  panic = false
) {
  stopHeartbeat();


  if (
    !soundEnabled ||
    !audioReady
  ) {
    return;
  }


  heartbeat(
    strength,
    panic
  );


  heartbeatTimer =
    window.setInterval(
      function () {
        heartbeat(
          strength,
          panic
        );
      },
      period
    );
}


/* ==========================================
   TROISIÈME POULS
========================================== */

function thirdPulse(
  strength = 1
) {
  tone(
    33,
    0.25,
    0.25 *
    strength,
    "sine",
    0,
    0.65
  );


  tone(
    27,
    0.32,
    0.32 *
    strength,
    "sine",
    0.23,
    0.65
  );


  tone(
    96,
    0.12,
    0.045 *
    strength,
    "triangle",
    0.08,
    0.58
  );
}


function stopThirdPulse() {
  window.clearInterval(
    thirdPulseTimer
  );


  thirdPulseTimer = null;
}


function setThirdPulse(
  period,
  strength = 1
) {
  stopThirdPulse();


  if (
    !soundEnabled ||
    !audioReady
  ) {
    return;
  }


  thirdPulse(
    strength
  );


  thirdPulseTimer =
    window.setInterval(
      function () {
        thirdPulse(
          strength
        );
      },
      period
    );
}


/* ==========================================
   PAS
========================================== */

let nextFootstepSide =
  -0.72;


function footstep(
  strength = 1
) {
  tone(
    43,
    0.2,
    0.2 *
    strength,
    "sine",
    0,
    nextFootstepSide
  );


  noiseBurst(
    0.15,
    0.055 *
    strength,
    190,
    nextFootstepSide
  );


  nextFootstepSide *=
    -1;
}


function stopFootsteps() {
  window.clearInterval(
    footstepTimer
  );


  footstepTimer = null;
}


function setFootsteps(
  period,
  strength = 1
) {
  stopFootsteps();


  if (
    !soundEnabled ||
    !audioReady
  ) {
    return;
  }


  footstep(
    strength
  );


  footstepTimer =
    window.setInterval(
      function () {
        footstep(
          strength
        );
      },
      period
    );
}


/* ==========================================
   PARASITES DE PANIQUE
========================================== */

function stopPanicSounds() {
  window.clearInterval(
    panicTimer
  );


  panicTimer = null;
}


function setPanicSounds(
  period = 780
) {
  stopPanicSounds();


  if (
    !soundEnabled ||
    !audioReady
  ) {
    return;
  }


  panicTimer =
    window.setInterval(
      function () {
        const pan =
          randomBetween(
            -0.9,
            0.9
          );


        noiseBurst(
          randomBetween(
            0.08,
            0.26
          ),
          0.04,
          randomBetween(
            500,
            1800
          ),
          pan
        );


        if (
          Math.random() >
          0.5
        ) {
          tone(
            randomBetween(
              80,
              240
            ),
            0.12,
            0.035,
            "sawtooth",
            0,
            pan
          );
        }
      },
      period
    );
}


/* ==========================================
   SONS ÉTRANGES PONCTUELS
========================================== */

function metallicTick() {
  const pan =
    randomBetween(
      -0.85,
      0.85
    );


  tone(
    randomBetween(
      1100,
      1750
    ),
    0.08,
    0.025,
    "triangle",
    0,
    pan
  );


  tone(
    randomBetween(
      1900,
      2700
    ),
    0.06,
    0.012,
    "sine",
    0.045,
    pan
  );
}


function organicCreak() {
  const pan =
    randomBetween(
      -0.7,
      0.7
    );


  noiseBurst(
    0.85,
    0.085,
    randomBetween(
      170,
      310
    ),
    pan
  );


  tone(
    randomBetween(
      44,
      73
    ),
    0.95,
    0.055,
    "sawtooth",
    0,
    pan
  );
}


function distantWhisper() {
  const pan =
    randomBetween(
      -0.9,
      0.9
    );


  noiseBurst(
    randomBetween(
      0.45,
      0.85
    ),
    0.045,
    randomBetween(
      1250,
      2200
    ),
    pan
  );
}


function eyeRing() {
  tone(
    2350,
    2.5,
    0.028,
    "sine",
    0,
    -0.24
  );


  tone(
    2387,
    2.5,
    0.022,
    "sine",
    0,
    0.24
  );
}


function stopUncannySounds() {
  window.clearTimeout(
    uncannyTimer
  );


  uncannyTimer = null;
}


function setUncannySounds(
  effect,
  minimumDelay,
  maximumDelay
) {
  stopUncannySounds();


  if (
    !soundEnabled ||
    !audioReady
  ) {
    return;
  }


  function schedule() {
    uncannyTimer =
      window.setTimeout(
        function () {
          effect();

          schedule();
        },
        randomBetween(
          minimumDelay,
          maximumDelay
        )
      );
  }


  schedule();
}


/* ==========================================
   ARRÊTER LES BOUCLES
========================================== */

function stopAllAudioLoops() {
  stopHeartbeat();

  stopThirdPulse();

  stopFootsteps();

  stopBreathing();

  stopPanicSounds();

  stopUncannySounds();
}


/* ==========================================
   ATMOSPHÈRE PAR SCÈNE
========================================== */

function setAtmosphere(
  scene
) {
  if (!audioReady) {
    return;
  }


  const levels = {
    title: [
      0.023,
      0.021,
      350
    ],

    companion: [
      0.015,
      0.026,
      290
    ],

    monitor: [
      0.03,
      0.038,
      560
    ],

    faceless: [
      0.04,
      0.05,
      480
    ],

    breathing: [
      0.045,
      0.06,
      410
    ],

    again: [
      0.065,
      0.085,
      680
    ],

    locating: [
      0.07,
      0.09,
      760
    ],

    inside: [
      0.085,
      0.12,
      850
    ],

    run: [
      0.11,
      0.15,
      1050
    ],

    narrowing: [
      0.13,
      0.17,
      1180
    ],

    waking: [
      0.14,
      0.18,
      1320
    ],

    eye: [
      0.05,
      0.08,
      360
    ],

    escape: [
      0.07,
      0.11,
      440
    ]
  };


  const selected =
    levels[scene] ||
    levels.title;


  const active =
    soundEnabled
      ? 1
      : 0;


  const now =
    audioContext.currentTime;


  ambienceGain.gain.setTargetAtTime(
    selected[0] *
    active,
    now,
    0.25
  );


  humGain.gain.setTargetAtTime(
    (
      scene === "run" ||
      scene === "narrowing"
        ? 0.065
        : 0.028
    ) *
    active,
    now,
    0.3
  );


  subGain.gain.setTargetAtTime(
    selected[1] *
    active,
    now,
    0.2
  );


  ambienceFilter.frequency.setTargetAtTime(
    selected[2],
    now,
    0.22
  );
}


/* ==========================================
   AUDIO PAR SCÈNE
========================================== */

function syncAudio(
  scene
) {
  if (
    !audioReady ||
    !soundEnabled
  ) {
    return;
  }


  stopAllAudioLoops();


  setAtmosphere(
    scene
  );


  const heartSettings = {
    title: [
      820,
      0.72,
      false
    ],

    companion: [
      700,
      0.88,
      false
    ],

    monitor: [
      630,
      1,
      false
    ],

    faceless: [
      570,
      1.08,
      true
    ],

    breathing: [
      520,
      1.14,
      true
    ],

    again: [
      455,
      1.22,
      true
    ],

    locating: [
      415,
      1.3,
      true
    ],

    inside: [
      365,
      1.4,
      true
    ],

    run: [
      315,
      1.48,
      true
    ],

    narrowing: [
      285,
      1.57,
      true
    ],

    waking: [
      260,
      1.65,
      true
    ],

    eye: [
      420,
      1.18,
      true
    ],

    escape: [
      350,
      1.42,
      true
    ]
  };


  const settings =
    heartSettings[scene] ||
    heartSettings.title;


  setHeartbeat(
    settings[0],
    settings[1],
    settings[2]
  );


  /* Gare et titre */

  if (
    scene === "title"
  ) {
    setBreathing(
      2850,
      0.82,
      1.05
    );


    setUncannySounds(
      metallicTick,
      2600,
      5200
    );
  }


  /* La personne ne respire plus */

  if (
    scene === "companion"
  ) {
    noiseBurst(
      0.16,
      0.06,
      920,
      -0.35
    );


    setUncannySounds(
      distantWhisper,
      3200,
      5600
    );
  }


  /* Moniteur et troisième pouls */

  if (
    scene === "monitor"
  ) {
    tone(
      1280,
      0.11,
      0.065,
      "square"
    );


    tone(
      1280,
      0.11,
      0.065,
      "square",
      0.23
    );


    tone(
      650,
      0.35,
      0.11,
      "sawtooth",
      0.52
    );


    setThirdPulse(
      1120,
      0.9
    );
  }


  /* Silhouette */

  if (
    scene === "faceless"
  ) {
    noiseBurst(
      1,
      0.13,
      1200
    );


    tone(
      71,
      1.2,
      0.1,
      "sawtooth"
    );


    setThirdPulse(
      960,
      1
    );


    setUncannySounds(
      distantWhisper,
      1700,
      3400
    );
  }


  /* Les murs respirent */

  if (
    scene === "breathing"
  ) {
    setBreathing(
      3200,
      0.68,
      1.25
    );


    setUncannySounds(
      organicCreak,
      1900,
      3300
    );
  }


  /* Ils recommencent plus vite */

  if (
    scene === "again"
  ) {
    setBreathing(
      1050,
      1.75,
      1.45
    );


    setPanicSounds(
      1100
    );


    setUncannySounds(
      organicCreak,
      950,
      1700
    );
  }


  /* Localisation du troisième signal */

  if (
    scene === "locating"
  ) {
    setBreathing(
      980,
      1.9,
      1.25
    );


    setThirdPulse(
      760,
      1.2
    );


    setPanicSounds(
      920
    );


    tone(
      920,
      0.15,
      0.07,
      "square"
    );


    tone(
      1200,
      0.13,
      0.06,
      "square",
      0.24
    );
  }


  /* Le signal est à l’intérieur */

  if (
    scene === "inside"
  ) {
    setBreathing(
      850,
      2.15,
      1.4
    );


    setThirdPulse(
      590,
      1.45
    );


    setPanicSounds(
      660
    );


    tone(
      27,
      1.4,
      0.38,
      "sawtooth"
    );


    noiseBurst(
      1.1,
      0.17,
      920
    );
  }


  /* Course */

  if (
    scene === "run"
  ) {
    setFootsteps(
      255,
      1.35
    );


    setBreathing(
      720,
      2.35,
      1.55
    );


    setThirdPulse(
      480,
      1.35
    );


    setPanicSounds(
      380
    );


    noiseBurst(
      1.3,
      0.19,
      760
    );


    tone(
      88,
      1.6,
      0.16,
      "sawtooth"
    );
  }


  /* Couloir qui se referme */

  if (
    scene === "narrowing"
  ) {
    setFootsteps(
      215,
      1.5
    );


    setBreathing(
      620,
      2.7,
      1.7
    );


    setThirdPulse(
      420,
      1.5
    );


    setPanicSounds(
      270
    );


    setUncannySounds(
      organicCreak,
      650,
      1100
    );


    tone(
      34,
      1.5,
      0.28,
      "sawtooth"
    );
  }


  /* Quelque chose se réveille */

  if (
    scene === "waking"
  ) {
    setFootsteps(
      190,
      1.55
    );


    setBreathing(
      560,
      2.9,
      1.8
    );


    setThirdPulse(
      360,
      1.65
    );


    setPanicSounds(
      220
    );


    noiseBurst(
      1.2,
      0.2,
      1450
    );
  }


  /* Œil fermé */

  if (
    scene === "eye"
  ) {
    stopFootsteps();

    stopBreathing();

    stopPanicSounds();


    tone(
      34,
      2.2,
      0.22,
      "sine"
    );


    noiseBurst(
      1.6,
      0.07,
      380
    );


    eyeRing();


    setThirdPulse(
      780,
      1.15
    );


    setUncannySounds(
      distantWhisper,
      2100,
      4100
    );
  }


  /* Dernière scène */

  if (
    scene === "escape"
  ) {
    stopFootsteps();

    setBreathing(
      1200,
      1.3,
      0.9
    );


    setThirdPulse(
      650,
      1.25
    );


    eyeRing();
  }
}


/* ==========================================
   NOTES SCIENTIFIQUES
========================================== */

function setResearch(
  scene
) {
  if (
    [
      "title",
      "companion",
      "monitor",
      "faceless"
    ].includes(
      scene
    )
  ) {
    researchNumber.textContent =
      "RESEARCH NOTE 06.1";


    researchText.textContent =
      "Fear reported during dreaming has been associated with activity in the insula and midcingulate cortex.";


    researchPrinciple.textContent =
      "FEAR · SIMULATED, FELT";


    if (researchSource) {
      researchSource.href =
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC7267911/";
    }


    return;
  }


  if (
    [
      "breathing",
      "again",
      "locating",
      "inside"
    ].includes(
      scene
    )
  ) {
    researchNumber.textContent =
      "RESEARCH NOTE 06.2";


    researchText.textContent =
      "Threat-simulation theory proposes that some dreams construct virtual dangers and possible responses.";


    researchPrinciple.textContent =
      "THREAT · REHEARSAL HYPOTHESIS";


    if (researchSource) {
      researchSource.href =
        "https://pubmed.ncbi.nlm.nih.gov/15766897/";
    }


    return;
  }


  researchNumber.textContent =
    "RESEARCH NOTE 06.3";


  researchText.textContent =
    "Nightmare episodes can be accompanied by measurable changes in autonomic activation.";


  researchPrinciple.textContent =
    "VIRTUAL DANGER · REAL AROUSAL";


  if (researchSource) {
    researchSource.href =
      "https://pubmed.ncbi.nlm.nih.gov/30927477/";
  }
}


/* ==========================================
   INTERFACE DE CONFINEMENT
========================================== */

function setInterface(
  scene,
  index
) {
  const dangerStart =
    Math.max(
      0,
      sceneNames.indexOf(
        "breathing"
      )
    );


  const progress =
    clamp(
      (
        index -
        dangerStart
      ) /
      Math.max(
        1,
        sceneNames.length -
        1 -
        dangerStart
      ),
      0,
      1
    );


  bodyCount.textContent =
    "02";


  pulseCount.textContent =
    scene === "escape" &&
    escapeComplete
      ? "04"
      : "03";


  dreamIntegrity.textContent =
    Math.max(
      4,
      Math.round(
        74 -
        progress *
        70
      )
    ) +
    "%";


  if (
    scene === "title"
  ) {
    containmentStatus.textContent =
      "UNSTABLE";


    threatDistance.textContent =
      "UNKNOWN";


    return;
  }


  if (
    [
      "companion",
      "monitor",
      "faceless"
    ].includes(
      scene
    )
  ) {
    containmentStatus.textContent =
      "BREACHED";


    threatDistance.textContent =
      "18 M";


    return;
  }


  if (
    [
      "breathing",
      "again",
      "locating"
    ].includes(
      scene
    )
  ) {
    containmentStatus.textContent =
      "FAILED";


    threatDistance.textContent =
      scene === "locating"
        ? "4 M"
        : "8 M";


    return;
  }


  if (
    scene === "inside"
  ) {
    containmentStatus.textContent =
      "INTERNAL";


    threatDistance.textContent =
      "0 M";


    return;
  }


  if (
    [
      "run",
      "narrowing",
      "waking"
    ].includes(
      scene
    )
  ) {
    containmentStatus.textContent =
      "PURSUIT";


    threatDistance.textContent =
      scene === "narrowing"
        ? "2 M"
        : "4 M";


    return;
  }


  containmentStatus.textContent =
    "CRITICAL";


  threatDistance.textContent =
    "INSIDE";
}


/* ==========================================
   ACTIVER UNE SCÈNE
========================================== */

function activateScene(
  index
) {
  const nextIndex =
    clamp(
      index,
      0,
      beats.length - 1
    );


  if (
    nextIndex === activeIndex
  ) {
    return;
  }


  activeIndex =
    nextIndex;


  const scene =
    sceneNames[
      activeIndex
    ];


  beats.forEach(
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


  body.dataset.scene =
    scene;


  const progress =
    activeIndex /
    Math.max(
      1,
      beats.length - 1
    );


  body.style.setProperty(
    "--scene-progress",
    progress
  );


  if (progressFill) {
    progressFill.style.height =
      progress *
      100 +
      "%";
  }


  scrollCue.textContent =
    scene === "escape"
      ? "HOLD TO WAKE"
      : "FOLLOW THE SIGNAL";


  setInterface(
    scene,
    activeIndex
  );


  /*
   * Le son est lancé avant les notes.
   * Une erreur documentaire ne peut donc
   * plus interrompre l’expérience.
   */

  syncAudio(
    scene
  );


  setResearch(
    scene
  );
}


/* ==========================================
   SCÈNE LA PLUS PROCHE DU CENTRE
========================================== */

function updateSceneFromScroll() {
  scrollFrame = null;


  if (
    body.classList.contains(
      "notes-open"
    ) ||
    escapeComplete
  ) {
    return;
  }


  const viewportCenter =
    window.innerHeight /
    2;


  let closestIndex = 0;

  let closestDistance =
    Infinity;


  beats.forEach(
    function (
      beat,
      index
    ) {
      const rectangle =
        beat.getBoundingClientRect();


      const beatCenter =
        rectangle.top +
        rectangle.height /
        2;


      const distance =
        Math.abs(
          beatCenter -
          viewportCenter
        );


      if (
        distance <
        closestDistance
      ) {
        closestDistance =
          distance;


        closestIndex =
          index;
      }
    }
  );


  activateScene(
    closestIndex
  );
}


window.addEventListener(
  "scroll",
  function () {
    if (scrollFrame) {
      return;
    }


    scrollFrame =
      window.requestAnimationFrame(
        updateSceneFromScroll
      );
  },
  {
    passive: true
  }
);


/* ==========================================
   NAVIGATION CLAVIER
========================================== */

function goToBeat(
  index
) {
  const target =
    clamp(
      index,
      0,
      beats.length - 1
    );


  activateScene(
    target
  );


  beats[
    target
  ].scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


window.addEventListener(
  "keydown",
  function (event) {
    if (
      body.classList.contains(
        "notes-open"
      ) ||
      escapeComplete
    ) {
      return;
    }


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
      ) ||
      document.activeElement ===
      forceEye
    ) {
      return;
    }


    event.preventDefault();


    const backward =
      event.key ===
        "ArrowUp" ||
      event.key ===
        "PageUp";


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
   ENABLE SOUND
========================================== */

if (soundToggle) {
  soundToggle.addEventListener(
    "click",
    async function () {
      if (soundEnabled) {
        soundEnabled = false;


        localStorage.setItem(
          "museumSound",
          "off"
        );


        stopAllAudioLoops();


        if (
          masterGain &&
          audioContext
        ) {
          masterGain.gain.setTargetAtTime(
            0.0001,
            audioContext.currentTime,
            0.08
          );
        }


        setAtmosphere(
          sceneNames[
            activeIndex
          ]
        );


        updateSoundButton();

        return;
      }


      soundEnabled = true;


      localStorage.setItem(
        "museumSound",
        "on"
      );


      try {
        ensureAudio();


        if (
          audioContext.state ===
          "suspended"
        ) {
          await audioContext.resume();
        }


        masterGain.gain.cancelScheduledValues(
          audioContext.currentTime
        );


        masterGain.gain.setValueAtTime(
          Math.max(
            0.0001,
            masterGain.gain.value
          ),
          audioContext.currentTime
        );


        masterGain.gain.exponentialRampToValueAtTime(
          0.82,
          audioContext.currentTime +
          0.45
        );


        updateSoundButton();


        tone(
          220,
          0.32,
          0.035,
          "sine"
        );


        tone(
          440,
          0.27,
          0.022,
          "sine",
          0.11
        );


        syncAudio(
          sceneNames[
            activeIndex
          ]
        );
      } catch (error) {
        soundEnabled = false;


        updateSoundButton();


        console.warn(
          "Nightmare audio unavailable:",
          error
        );
      }
    }
  );
}


/* ==========================================
   ROOM NOTES
========================================== */

function openNightmareNotes() {
  if (
    !nightmareNotesPanel ||
    !nightmareNotesButton
  ) {
    return;
  }


  body.classList.add(
    "notes-open"
  );


  nightmareNotesPanel.setAttribute(
    "aria-hidden",
    "false"
  );


  if (nightmareNotesBackdrop) {
    nightmareNotesBackdrop.setAttribute(
      "aria-hidden",
      "false"
    );
  }


  nightmareNotesButton.setAttribute(
    "aria-expanded",
    "true"
  );


  nightmareNotesButton.textContent =
    "ROOM NOTES −";


  if (nightmareNotesClose) {
    nightmareNotesClose.focus();
  }
}


function closeNightmareNotes() {
  if (
    !nightmareNotesPanel ||
    !nightmareNotesButton
  ) {
    return;
  }


  body.classList.remove(
    "notes-open"
  );


  nightmareNotesPanel.setAttribute(
    "aria-hidden",
    "true"
  );


  if (nightmareNotesBackdrop) {
    nightmareNotesBackdrop.setAttribute(
      "aria-hidden",
      "true"
    );
  }


  nightmareNotesButton.setAttribute(
    "aria-expanded",
    "false"
  );


  nightmareNotesButton.textContent =
    "ROOM NOTES +";
}


if (nightmareNotesButton) {
  nightmareNotesButton.addEventListener(
    "click",
    function () {
      if (
        body.classList.contains(
          "notes-open"
        )
      ) {
        closeNightmareNotes();
      } else {
        openNightmareNotes();
      }
    }
  );
}


if (nightmareNotesClose) {
  nightmareNotesClose.addEventListener(
    "click",
    closeNightmareNotes
  );
}


if (nightmareNotesBackdrop) {
  nightmareNotesBackdrop.addEventListener(
    "click",
    closeNightmareNotes
  );
}


window.addEventListener(
  "keydown",
  function (event) {
    if (
      event.key === "Escape" &&
      body.classList.contains(
        "notes-open"
      )
    ) {
      closeNightmareNotes();


      if (nightmareNotesButton) {
        nightmareNotesButton.focus();
      }
    }
  }
);


/* ==========================================
   PROGRESSION DU BOUTON FINAL
========================================== */

function updateHold(
  currentTime
) {
  if (
    !isHolding ||
    escapeComplete
  ) {
    return;
  }


  const progress =
    clamp(
      (
        currentTime -
        holdStart
      ) /
      HOLD_DURATION,
      0,
      1
    );


  body.style.setProperty(
    "--hold-progress",
    progress *
    360 +
    "deg"
  );


  body.style.setProperty(
    "--hold-value",
    progress.toFixed(
      3
    )
  );


  if (
    progress >
    0.82
  ) {
    forceLabel.textContent =
      "DO NOT LOOK AWAY";
  } else if (
    progress >
    0.5
  ) {
    forceLabel.textContent =
      "KEEP HOLDING";
  } else {
    forceLabel.textContent =
      "OPEN THE EYES";
  }


  if (
    progress >= 1
  ) {
    completeEscape();

    return;
  }


  holdFrame =
    window.requestAnimationFrame(
      updateHold
    );
}


/* ==========================================
   COMMENCER LE MAINTIEN
========================================== */

function startHold(
  event
) {
  if (
    body.dataset.scene !==
      "escape" ||
    escapeComplete
  ) {
    return;
  }


  event.preventDefault();


  isHolding = true;


  holdStart =
    performance.now();


  body.classList.add(
    "is-forcing-eye"
  );


  if (soundEnabled) {
    ensureAudio();


    setHeartbeat(
      235,
      1.75,
      true
    );


    setThirdPulse(
      210,
      1.75
    );


    setBreathing(
      500,
      3.1,
      1.9
    );


    setPanicSounds(
      170
    );


    tone(
      25,
      3,
      0.4,
      "sawtooth"
    );


    noiseBurst(
      2.7,
      0.2,
      620
    );
  }


  window.cancelAnimationFrame(
    holdFrame
  );


  holdFrame =
    window.requestAnimationFrame(
      updateHold
    );
}


/* ==========================================
   RELÂCHER TROP TÔT
========================================== */

function cancelHold() {
  if (
    !isHolding ||
    escapeComplete
  ) {
    return;
  }


  isHolding = false;


  window.cancelAnimationFrame(
    holdFrame
  );


  body.classList.remove(
    "is-forcing-eye"
  );


  body.style.setProperty(
    "--hold-progress",
    "0deg"
  );


  body.style.setProperty(
    "--hold-value",
    "0"
  );


  forceLabel.textContent =
    "OPEN THE EYES";


  syncAudio(
    "escape"
  );
}


/* ==========================================
   RÉVEIL
========================================== */

function completeEscape() {
  escapeComplete = true;

  isHolding = false;


  window.cancelAnimationFrame(
    holdFrame
  );


  body.style.setProperty(
    "--hold-progress",
    "360deg"
  );


  body.style.setProperty(
    "--hold-value",
    "1"
  );


  body.classList.remove(
    "is-forcing-eye"
  );


  body.classList.add(
    "is-awakening"
  );


  pulseCount.textContent =
    "04";


  containmentStatus.textContent =
    "UNKNOWN SIGNAL";


  dreamIntegrity.textContent =
    "0%";


  forceLabel.textContent =
    "EYES OPEN";


  stopAllAudioLoops();


  tone(
    25,
    1.4,
    0.48,
    "sawtooth"
  );


  tone(
    1040,
    0.4,
    0.13,
    "sine",
    0.48
  );


  noiseBurst(
    1.25,
    0.24,
    1350
  );


  window.setTimeout(
    function () {
      if (
        masterGain &&
        audioContext
      ) {
        masterGain.gain.setTargetAtTime(
          0.0001,
          audioContext.currentTime,
          0.16
        );
      }
    },
    520
  );


  window.setTimeout(
    function () {
      window.location.href =
        "awakening.html";
    },
    1650
  );
}


/* ==========================================
   ÉVÉNEMENTS DU BOUTON FINAL
========================================== */

if (forceEye) {
  forceEye.addEventListener(
    "pointerdown",
    startHold
  );


  forceEye.addEventListener(
    "keydown",
    function (event) {
      if (
        (
          event.key === "Enter" ||
          event.key === " "
        ) &&
        !isHolding
      ) {
        startHold(
          event
        );
      }
    }
  );


  forceEye.addEventListener(
    "keyup",
    function (event) {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        cancelHold();
      }
    }
  );
}


window.addEventListener(
  "pointerup",
  cancelHold
);


window.addEventListener(
  "pointercancel",
  cancelHold
);


/* ==========================================
   LAMPE DE LA SOURIS
========================================== */

window.addEventListener(
  "pointermove",
  function (event) {
    pointerX =
      (
        event.clientX /
        window.innerWidth
      ) *
      100;


    pointerY =
      (
        event.clientY /
        window.innerHeight
      ) *
      100;


    if (pointerFrame) {
      return;
    }


    pointerFrame =
      window.requestAnimationFrame(
        function () {
          body.style.setProperty(
            "--pointer-x",
            pointerX +
            "%"
          );


          body.style.setProperty(
            "--pointer-y",
            pointerY +
            "%"
          );


          pointerFrame = null;
        }
      );
  },
  {
    passive: true
  }
);


/* ==========================================
   VISIBILITÉ DE LA PAGE
========================================== */

document.addEventListener(
  "visibilitychange",
  function () {
    if (document.hidden) {
      stopAllAudioLoops();

      return;
    }


    if (
      soundEnabled &&
      audioReady
    ) {
      syncAudio(
        sceneNames[
          activeIndex
        ]
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


preloadImages();


updateSoundButton();


activateScene(
  0
);
