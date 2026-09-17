/* ==========================================
   THE MUSEUM OF DREAMS
   ROOM 06 — NIGHTMARE
========================================== */


/* ==========================================
   ÉLÉMENTS HTML
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


const pulseGate =
  document.querySelector(
    "#pulse-gate"
  );


const followPulse =
  document.querySelector(
    "#follow-pulse"
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


const forceEye =
  document.querySelector(
    "#force-eye"
  );


const forceLabel =
  document.querySelector(
    ".force-label"
  );


/* ==========================================
   ÉTAT DE LA PAGE
========================================== */

let activeIndex =
  -1;


let wheelLocked =
  false;


let touchStartY =
  0;


let sceneTimer =
  null;


let soundEnabled =
  localStorage.getItem(
    "museumSound"
  ) !== "off";


/* ==========================================
   ÉTAT AUDIO
========================================== */

let audioContext;

let masterGain;

let ambienceGain;

let ambienceFilter;

let humGain;

let humOscillator;

let subGain;

let subOscillator;

let audioReady =
  false;


let heartbeatTimer =
  null;


let footstepTimer =
  null;


let breathingTimer =
  null;


let panicTimer =
  null;


/* ==========================================
   OUVERTURE DE L’ŒIL
========================================== */

let holdFrame =
  null;


let holdStart =
  0;


let isHolding =
  false;


let escapeComplete =
  false;


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


function updateSoundButton() {
  soundToggle.textContent =
    soundEnabled
      ? "SOUND ON"
      : "SOUND OFF";


  soundToggle.setAttribute(
    "aria-pressed",
    String(soundEnabled)
  );
}


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
   INITIALISER LE MOTEUR AUDIO
========================================== */

function ensureAudio() {
  if (!audioReady) {
    audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();


    masterGain =
      audioContext.createGain();


    masterGain.gain.value =
      soundEnabled
        ? 0.82
        : 0;


    masterGain.connect(
      audioContext.destination
    );


    createAtmosphere();


    audioReady =
      true;
  }


  if (
    audioContext.state ===
    "suspended"
  ) {
    audioContext.resume();
  }
}


/* ==========================================
   ATMOSPHÈRE CONTINUE
========================================== */

function createAtmosphere() {
  const length =
    audioContext.sampleRate *
    3;


  const buffer =
    audioContext.createBuffer(
      1,
      length,
      audioContext.sampleRate
    );


  const data =
    buffer.getChannelData(0);


  let lastValue =
    0;


  for (
    let index = 0;
    index < length;
    index += 1
  ) {
    const whiteNoise =
      Math.random() * 2 -
      1;


    lastValue =
      lastValue * 0.96 +
      whiteNoise * 0.04;


    data[index] =
      lastValue * 2.6;
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
    360;


  ambienceFilter.Q.value =
    0.7;


  ambienceGain =
    audioContext.createGain();


  ambienceGain.gain.value =
    0.0001;


  noise
    .connect(ambienceFilter)
    .connect(ambienceGain)
    .connect(masterGain);


  noise.start();


  /* Ronflement grave */

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
    .connect(humGain)
    .connect(masterGain);


  humOscillator.start();


  /* Fréquence très basse */

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
    .connect(subGain)
    .connect(masterGain);


  subOscillator.start();
}


/* ==========================================
   CRÉER UNE NOTE
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


  const panner =
    audioContext.createStereoPanner();


  oscillator.type =
    type;


  oscillator.frequency.setValueAtTime(
    frequency,
    now
  );


  panner.pan.value =
    clamp(
      pan,
      -1,
      1
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


  oscillator
    .connect(gain)
    .connect(panner)
    .connect(masterGain);


  oscillator.start(now);


  oscillator.stop(
    now +
    duration +
    0.08
  );
}


/* ==========================================
   CRÉER UN BRUIT
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
    buffer.getChannelData(0);


  for (
    let index = 0;
    index < length;
    index += 1
  ) {
    data[index] =
      (
        Math.random() * 2 -
        1
      ) *
      (
        1 -
        index / length
      );
  }


  const source =
    audioContext.createBufferSource();


  const filter =
    audioContext.createBiquadFilter();


  const gain =
    audioContext.createGain();


  const panner =
    audioContext.createStereoPanner();


  const now =
    audioContext.currentTime;


  source.buffer =
    buffer;


  filter.type =
    "bandpass";


  filter.frequency.value =
    frequency;


  filter.Q.value =
    0.85;


  panner.pan.value =
    clamp(
      pan,
      -1,
      1
    );


  gain.gain.setValueAtTime(
    Math.max(
      0.0002,
      volume
    ),
    now
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + duration
  );


  source
    .connect(filter)
    .connect(gain)
    .connect(panner)
    .connect(masterGain);


  source.start(now);
}


/* ==========================================
   RESPIRATION HUMAINE
========================================== */

function humanBreath(
  speed = 1,
  strength = 1
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
    buffer.getChannelData(0);


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
        Math.random() * 2 -
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


  const panner =
    audioContext.createStereoPanner();


  source.buffer =
    buffer;


  filter.type =
    "bandpass";


  filter.frequency.value =
    620 +
    speed * 90;


  filter.Q.value =
    0.55;


  gain.gain.value =
    0.045 *
    strength;


  panner.pan.value =
    -0.28 +
    Math.random() *
    0.12;


  source
    .connect(filter)
    .connect(gain)
    .connect(panner)
    .connect(masterGain);


  source.start();
}


function stopBreathing() {
  window.clearInterval(
    breathingTimer
  );


  breathingTimer =
    null;
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
          strength
        );
      },
      period
    );
}


/* ==========================================
   BATTEMENTS DE CŒUR
========================================== */

function heartbeat(
  strength = 1,
  panic = false
) {
  tone(
    52,
    0.17,
    0.31 * strength,
    "sine"
  );


  tone(
    39,
    0.24,
    0.23 * strength,
    "sine",
    0.16
  );


  if (panic) {
    tone(
      69,
      0.11,
      0.12 * strength,
      "triangle",
      0.39,
      0.16
    );


    tone(
      34,
      0.26,
      0.35 * strength,
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


  heartbeatTimer =
    null;
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
   BRUITS DE PAS
========================================== */

let nextFootstepSide =
  -0.72;


function footstep(
  strength = 1
) {
  tone(
    43,
    0.2,
    0.2 * strength,
    "sine",
    0,
    nextFootstepSide
  );


  noiseBurst(
    0.15,
    0.055 * strength,
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


  footstepTimer =
    null;
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


  footstep(strength);


  footstepTimer =
    window.setInterval(
      function () {
        footstep(strength);
      },
      period
    );
}


/* ==========================================
   SONS DE PANIQUE
========================================== */

function stopPanicSounds() {
  window.clearInterval(
    panicTimer
  );


  panicTimer =
    null;
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
          Math.random() *
          1.8 -
          0.9;


        const frequency =
          500 +
          Math.random() *
          1300;


        noiseBurst(
          0.08 +
          Math.random() *
          0.18,

          0.04,

          frequency,

          pan
        );


        if (
          Math.random() >
          0.5
        ) {
          tone(
            80 +
            Math.random() *
            160,

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


function stopAllAudioLoops() {
  stopHeartbeat();

  stopFootsteps();

  stopBreathing();

  stopPanicSounds();
}


/* ==========================================
   ATMOSPHÈRE DE CHAQUE SCÈNE
========================================== */

function setAtmosphere(scene) {
  if (!audioReady) {
    return;
  }


  const levels = {
    arrival: [
      0.02,
      0.018,
      320
    ],

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

    warning: [
      0.09,
      0.12,
      520
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
    levels.arrival;


  const noiseLevel =
    selected[0];


  const subLevel =
    selected[1];


  const filterFrequency =
    selected[2];


  const active =
    soundEnabled
      ? 1
      : 0;


  const now =
    audioContext.currentTime;


  ambienceGain.gain.setTargetAtTime(
    noiseLevel *
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
    subLevel *
    active,

    now,

    0.2
  );


  ambienceFilter.frequency.setTargetAtTime(
    filterFrequency,

    now,

    0.22
  );
}


/* ==========================================
   SYNCHRONISER LE SON ET LA SCÈNE
========================================== */

function syncAudio(scene) {
  if (!audioReady) {
    return;
  }


  stopAllAudioLoops();


  setAtmosphere(scene);


  const heartSettings = {
    arrival: [
      880,
      0.66,
      false
    ],

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

    warning: [
      330,
      1.48,
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
    heartSettings.arrival;


  const period =
    settings[0];


  const strength =
    settings[1];


  const panic =
    settings[2];


  setHeartbeat(
    period,
    strength,
    panic
  );


  /*
   * Le souffle commence dès l’arrivée.
   */

  if (
    scene === "arrival" ||
    scene === "title"
  ) {
    setBreathing(
      2850,
      0.82,
      1.1
    );
  }


  /*
   * Le souffle disparaît brutalement
   * lorsque la personne cesse de respirer.
   */

  if (
    scene === "companion"
  ) {
    stopBreathing();


    noiseBurst(
      0.12,
      0.055,
      920,
      -0.3
    );
  }


  /*
   * Moniteur médical.
   */

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
  }


  /*
   * Apparition de la silhouette.
   */

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
  }


  /*
   * Les murs respirent une fois,
   * puis le souffle s’arrête.
   */

  if (
    scene === "breathing"
  ) {
    setBreathing(
      3200,
      0.68,
      1.25
    );


    window.setTimeout(
      stopBreathing,
      2500
    );
  }


  /*
   * La respiration recommence,
   * beaucoup plus rapidement.
   */

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
  }


  /*
   * Le troisième signal se rapproche.
   */

  if (
    scene === "locating"
  ) {
    setBreathing(
      980,
      1.9,
      1.25
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


  /*
   * Le signal est à l’intérieur.
   */

  if (
    scene === "inside"
  ) {
    setBreathing(
      850,
      2.15,
      1.4
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


  /*
   * Course.
   */

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


  /*
   * Le couloir se referme.
   */

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


    setPanicSounds(
      270
    );


    tone(
      34,
      1.5,
      0.28,
      "sawtooth"
    );
  }


  /*
   * Quelque chose se réveille.
   */

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


    setPanicSounds(
      220
    );


    noiseBurst(
      1.2,
      0.2,
      1450
    );
  }


  if (
    scene === "warning"
  ) {
    setPanicSounds(
      440
    );


    tone(
      115,
      1.4,
      0.1,
      "sawtooth"
    );
  }


  if (
    scene === "eye"
  ) {
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
  }
}


/* ==========================================
   OBSERVATIONS SCIENTIFIQUES
========================================== */

function setResearch(scene) {
  if (
    [
      "arrival",
      "title",
      "companion",
      "monitor",
      "faceless"
    ].includes(scene)
  ) {
    researchNumber.textContent =
      "RESEARCH NOTE 06.1";


    researchText.textContent =
      "Fear in dreams has been associated with activity in the insula and midcingulate cortex.";


    researchPrinciple.textContent =
      "FEAR · SIMULATED, FELT";


    return;
  }


  if (
    [
      "breathing",
      "again",
      "locating",
      "inside"
    ].includes(scene)
  ) {
    researchNumber.textContent =
      "RESEARCH NOTE 06.2";


    researchText.textContent =
      "Threat-simulation theories propose that dreams can construct virtual dangers and possible responses.";


    researchPrinciple.textContent =
      "THREAT · REHEARSAL HYPOTHESIS";


    return;
  }


  researchNumber.textContent =
    "RESEARCH NOTE 06.3";


  researchText.textContent =
    "The threat is simulated, but fear and bodily arousal can still be experienced as real.";


  researchPrinciple.textContent =
    "VIRTUAL DANGER · REAL AROUSAL";
}


/* ==========================================
   DONNÉES DE CONFINEMENT
========================================== */

function setInterface(
  scene,
  index
) {
  const dangerStart =
    sceneNames.indexOf(
      "breathing"
    );


  const progress =
    clamp(
      (
        index -
        dangerStart
      ) /
      (
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
    [
      "arrival",
      "title"
    ].includes(scene)
  ) {
    containmentStatus.textContent =
      "UNSTABLE";


    threatDistance.textContent =
      "UNKNOWN";
  } else if (
    [
      "companion",
      "monitor",
      "faceless"
    ].includes(scene)
  ) {
    containmentStatus.textContent =
      "BREACHED";


    threatDistance.textContent =
      "18 M";
  } else if (
    [
      "breathing",
      "again",
      "locating"
    ].includes(scene)
  ) {
    containmentStatus.textContent =
      "FAILED";


    threatDistance.textContent =
      scene === "locating"
        ? "4 M"
        : "8 M";
  } else if (
    scene === "inside"
  ) {
    containmentStatus.textContent =
      "INTERNAL";


    threatDistance.textContent =
      "0 M";
  } else if (
    [
      "run",
      "narrowing",
      "waking"
    ].includes(scene)
  ) {
    containmentStatus.textContent =
      "PURSUIT";


    threatDistance.textContent =
      scene === "narrowing"
        ? "2 M"
        : "4 M";
  } else {
    containmentStatus.textContent =
      "CRITICAL";


    threatDistance.textContent =
      "INSIDE";
  }
}


/* ==========================================
   ACTIVER UNE SCÈNE
========================================== */

function activateScene(index) {
  const nextIndex =
    clamp(
      index,
      0,
      beats.length - 1
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
    sceneNames[
      activeIndex
    ];


  window.clearTimeout(
    sceneTimer
  );


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


  body.style.setProperty(
    "--scene-progress",

    activeIndex /
    (
      beats.length -
      1
    )
  );


  progressFill.style.height =
    (
      activeIndex /
      (
        beats.length -
        1
      )
    ) *
    100 +
    "%";


  scrollCue.textContent =
    scene === "escape"
      ? "HOLD TO WAKE"
      : "FOLLOW THE SIGNAL";


  setResearch(scene);


  setInterface(
    scene,
    activeIndex
  );


  syncAudio(scene);
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
          beats.indexOf(
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


beats.forEach(
  function (beat) {
    observer.observe(beat);
  }
);


/* ==========================================
   ALLER À UNE PHRASE
========================================== */

function goToBeat(index) {
  const target =
    clamp(
      index,
      0,
      beats.length - 1
    );


  beats[target].scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* ==========================================
   SCROLL À LA MOLETTE
========================================== */

window.addEventListener(
  "wheel",

  function (event) {
    if (
      body.classList.contains(
        "nightmare-locked"
      ) ||
      escapeComplete
    ) {
      event.preventDefault();

      return;
    }


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

      820
    );
  },

  {
    passive: false
  }
);


/* ==========================================
   NAVIGATION AU CLAVIER
========================================== */

window.addEventListener(
  "keydown",

  function (event) {
    if (
      body.classList.contains(
        "nightmare-locked"
      ) ||
      escapeComplete
    ) {
      return;
    }


    const keys = [
      "ArrowDown",
      "ArrowUp",
      "PageDown",
      "PageUp",
      " "
    ];


    if (
      !keys.includes(
        event.key
      ) ||
      document.activeElement ===
      forceEye
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
   NAVIGATION TACTILE
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
    if (
      body.classList.contains(
        "nightmare-locked"
      ) ||
      escapeComplete
    ) {
      return;
    }


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

      820
    );
  },

  {
    passive: true
  }
);


/* ==========================================
   ENTRER DANS LE CAUCHEMAR
========================================== */

followPulse.addEventListener(
  "click",

  function () {
    soundEnabled =
      true;


    localStorage.setItem(
      "museumSound",
      "on"
    );


    updateSoundButton();


    ensureAudio();


    body.classList.remove(
      "nightmare-locked"
    );


    pulseGate.classList.add(
      "is-leaving"
    );


    /*
     * On lance immédiatement le souffle
     * de la première scène.
     */

    syncAudio(
      "arrival"
    );


    window.setTimeout(
      function () {
        pulseGate.remove();
      },

      1050
    );
  }
);


/* ==========================================
   SOUND ON / OFF
========================================== */

soundToggle.addEventListener(
  "click",

  function () {
    ensureAudio();


    soundEnabled =
      !soundEnabled;


    localStorage.setItem(
      "museumSound",

      soundEnabled
        ? "on"
        : "off"
    );


    masterGain.gain.setTargetAtTime(
      soundEnabled
        ? 0.82
        : 0.0001,

      audioContext.currentTime,

      0.06
    );


    if (soundEnabled) {
      syncAudio(
        sceneNames[
          activeIndex
        ]
      );
    } else {
      stopAllAudioLoops();


      setAtmosphere(
        sceneNames[
          activeIndex
        ]
      );
    }


    updateSoundButton();
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

    progress.toFixed(3)
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
      "HOLD TO FORCE IT OPEN";
  }


  if (
    progress >=
    1
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
   COMMENCER À OUVRIR L’ŒIL
========================================== */

function startHold(event) {
  if (
    body.dataset.scene !==
    "escape" ||
    escapeComplete
  ) {
    return;
  }


  event.preventDefault();


  ensureAudio();


  isHolding =
    true;


  holdStart =
    performance.now();


  body.classList.add(
    "is-forcing-eye"
  );


  /*
   * Le cœur, la respiration et les
   * parasites deviennent incontrôlables.
   */

  setHeartbeat(
    235,
    1.75,
    true
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


  window.cancelAnimationFrame(
    holdFrame
  );


  holdFrame =
    window.requestAnimationFrame(
      updateHold
    );
}


/* ==========================================
   RELÂCHER LE BOUTON TROP TÔT
========================================== */

function cancelHold() {
  if (
    !isHolding ||
    escapeComplete
  ) {
    return;
  }


  isHolding =
    false;


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
    "HOLD TO FORCE IT OPEN";


  syncAudio(
    "escape"
  );
}


/* ==========================================
   OUVERTURE COMPLÈTE ET RÉVEIL
========================================== */

function completeEscape() {
  escapeComplete =
    true;


  isHolding =
    false;


  window.cancelAnimationFrame(
    holdFrame
  );


  /*
   * Maintenir définitivement l’image
   * de l’œil ouvert.
   */

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


  /*
   * Le son disparaît pendant
   * que la lumière blanche envahit
   * progressivement l’écran.
   */

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


  /*
   * Aller vers la page du réveil.
   */

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

forceEye.addEventListener(
  "pointerdown",
  startHold
);


window.addEventListener(
  "pointerup",
  cancelHold
);


window.addEventListener(
  "pointercancel",
  cancelHold
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
      startHold(event);
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


/* ==========================================
   LAMPE QUI SUIT LA SOURIS
========================================== */

let pointerFrame =
  null;


let pointerX =
  50;


let pointerY =
  50;


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


          pointerFrame =
            null;
        }
      );
  },

  {
    passive: true
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


activateScene(0);
