/* ==========================================
   THE MUSEUM OF DREAMS
   ROOM 06 — NIGHTMARE
========================================== */

const body = document.body;
const beats = [...document.querySelectorAll(".nightmare-beat")];
const sceneNames = beats.map((beat) => beat.dataset.scene);

const pulseGate = document.querySelector("#pulse-gate");
const followPulse = document.querySelector("#follow-pulse");
const soundToggle = document.querySelector("#sound-toggle");
const progressFill = document.querySelector("#nightmare-progress-fill");
const scrollCue = document.querySelector("#scroll-cue");
const containmentStatus = document.querySelector("#containment-status");
const bodyCount = document.querySelector("#body-count");
const pulseCount = document.querySelector("#pulse-count");
const threatDistance = document.querySelector("#threat-distance");
const dreamIntegrity = document.querySelector("#dream-integrity");
const researchNumber = document.querySelector("#research-number");
const researchText = document.querySelector("#research-text");
const researchPrinciple = document.querySelector("#research-principle");
const forceEye = document.querySelector("#force-eye");
const forceLabel = document.querySelector(".force-label");
const trainRemnant = document.querySelector("#train-remnant");

let activeIndex = -1;
let wheelLocked = false;
let touchStartY = 0;
let soundEnabled = localStorage.getItem("museumSound") !== "off";

let audioContext;
let masterGain;
let ambienceGain;
let ambienceFilter;
let humGain;
let humOscillator;
let subGain;
let subOscillator;
let audioReady = false;

let heartbeatTimer;
let footstepTimer;
let breathingTimer;
let countdownTimer;

let holdFrame;
let holdStart = 0;
let isHolding = false;
let escapeComplete = false;

const HOLD_DURATION = 2400;


/* ==========================================
   OUTILS
========================================== */

function clamp(value, minimum, maximum) {
  return Math.min(
    Math.max(value, minimum),
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
  [
    "./nightmare-corruption.png",
    "./nightmare-eye.png",
    "./nightmare-figure.png"
  ].forEach((source) => {
    const image = new Image();

    image.src = source;
  });
}


/* ==========================================
   WEB AUDIO
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
        ? 0.78
        : 0;

    masterGain.connect(
      audioContext.destination
    );

    createAtmosphere();

    audioReady = true;
  }

  if (
    audioContext.state ===
    "suspended"
  ) {
    audioContext.resume();
  }
}


/* ==========================================
   ATMOSPHÈRE SONORE
========================================== */

function createAtmosphere() {
  const frameCount =
    audioContext.sampleRate * 2;

  const buffer =
    audioContext.createBuffer(
      1,
      frameCount,
      audioContext.sampleRate
    );

  const data =
    buffer.getChannelData(0);

  for (
    let index = 0;
    index < frameCount;
    index += 1
  ) {
    data[index] =
      (
        Math.random() * 2 -
        1
      ) * 0.46;
  }

  const noise =
    audioContext.createBufferSource();

  noise.buffer = buffer;
  noise.loop = true;

  ambienceFilter =
    audioContext.createBiquadFilter();

  ambienceFilter.type =
    "bandpass";

  ambienceFilter.frequency.value =
    430;

  ambienceFilter.Q.value =
    0.6;

  ambienceGain =
    audioContext.createGain();

  ambienceGain.gain.value =
    0.0001;

  noise
    .connect(ambienceFilter)
    .connect(ambienceGain)
    .connect(masterGain);

  noise.start();


  humOscillator =
    audioContext.createOscillator();

  humOscillator.type =
    "triangle";

  humOscillator.frequency.value =
    54;

  humGain =
    audioContext.createGain();

  humGain.gain.value =
    0.0001;

  humOscillator
    .connect(humGain)
    .connect(masterGain);

  humOscillator.start();


  subOscillator =
    audioContext.createOscillator();

  subOscillator.type =
    "sine";

  subOscillator.frequency.value =
    31;

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
   NOTES SYNTHÉTIQUES
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

  oscillator.type = type;

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
    0.05
  );
}


/* ==========================================
   BRUITS ET IMPACTS
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

  const frameCount =
    Math.floor(
      audioContext.sampleRate *
      duration
    );

  const buffer =
    audioContext.createBuffer(
      1,
      frameCount,
      audioContext.sampleRate
    );

  const data =
    buffer.getChannelData(0);

  for (
    let index = 0;
    index < frameCount;
    index += 1
  ) {
    data[index] =
      (
        Math.random() * 2 -
        1
      ) *
      (
        1 -
        index / frameCount
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

  source.buffer = buffer;

  filter.type =
    "bandpass";

  filter.frequency.value =
    frequency;

  filter.Q.value =
    0.8;

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
   BATTEMENTS DE CŒUR
========================================== */

function heartbeat(
  strength = 1,
  thirdPulse = true
) {
  tone(
    54,
    0.16,
    0.29 * strength,
    "sine"
  );

  tone(
    42,
    0.22,
    0.2 * strength,
    "sine",
    0.17
  );

  if (thirdPulse) {
    tone(
      35,
      0.27,
      0.34 * strength,
      "sine",
      0.46,
      0.18
    );

    tone(
      76,
      0.1,
      0.08 * strength,
      "triangle",
      0.48,
      0.18
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
  thirdPulse = true
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
    thirdPulse
  );

  heartbeatTimer =
    window.setInterval(
      () => {
        heartbeat(
          strength,
          thirdPulse
        );
      },
      period
    );
}


/* ==========================================
   PAS
========================================== */

let nextFootstepSide =
  -0.65;


function footstep() {
  tone(
    46,
    0.22,
    0.17,
    "sine",
    0,
    nextFootstepSide
  );

  noiseBurst(
    0.18,
    0.035,
    180,
    nextFootstepSide
  );

  nextFootstepSide *= -1;
}


function stopFootsteps() {
  window.clearInterval(
    footstepTimer
  );

  footstepTimer = null;
}


function setFootsteps(period) {
  stopFootsteps();

  if (
    !soundEnabled ||
    !audioReady
  ) {
    return;
  }

  footstep();

  footstepTimer =
    window.setInterval(
      footstep,
      period
    );
}


/* ==========================================
   RESPIRATION
========================================== */

function breath() {
  noiseBurst(
    1.15,
    0.032,
    520,
    -0.35 +
    Math.random() *
    0.7
  );
}


function stopBreathing() {
  window.clearInterval(
    breathingTimer
  );

  breathingTimer = null;
}


function setBreathing(period) {
  stopBreathing();

  if (
    !soundEnabled ||
    !audioReady
  ) {
    return;
  }

  breath();

  breathingTimer =
    window.setInterval(
      breath,
      period
    );
}


/* ==========================================
   INTENSITÉ DE L’ATMOSPHÈRE
========================================== */

function setAtmosphere(scene) {
  if (!audioReady) {
    return;
  }

  const ambienceLevels = {
    arrival: 0.018,
    title: 0.022,
    companion: 0.026,
    monitor: 0.032,
    faceless: 0.038,
    breathing: 0.05,
    again: 0.065,
    locating: 0.055,
    inside: 0.075,
    run: 0.09,
    narrowing: 0.105,
    waking: 0.095,
    warning: 0.06,
    eye: 0.035,
    escape: 0.025
  };

  const subLevels = {
    arrival: 0.018,
    title: 0.022,
    companion: 0.03,
    monitor: 0.04,
    faceless: 0.05,
    breathing: 0.06,
    again: 0.075,
    locating: 0.07,
    inside: 0.105,
    run: 0.12,
    narrowing: 0.14,
    waking: 0.13,
    warning: 0.09,
    eye: 0.06,
    escape: 0.08
  };

  const now =
    audioContext.currentTime;

  const active =
    soundEnabled
      ? 1
      : 0;

  ambienceGain.gain.setTargetAtTime(
    (
      ambienceLevels[scene] ||
      0.01
    ) * active,
    now,
    0.35
  );

  humGain.gain.setTargetAtTime(
    (
      scene === "run" ||
      scene === "narrowing"
        ? 0.045
        : 0.022
    ) * active,
    now,
    0.45
  );

  subGain.gain.setTargetAtTime(
    (
      subLevels[scene] ||
      0.02
    ) * active,
    now,
    0.28
  );

  ambienceFilter.frequency.setTargetAtTime(
    scene === "run"
      ? 860
      : 430,
    now,
    0.3
  );
}


/* ==========================================
   SON DE CHAQUE SCÈNE
========================================== */

function syncAudio(scene) {
  if (!audioReady) {
    return;
  }

  stopFootsteps();
  stopBreathing();

  setAtmosphere(scene);

  const heartSettings = {
    arrival: [830, 0.72],
    title: [780, 0.76],
    companion: [710, 0.85],
    monitor: [660, 0.92],
    faceless: [620, 1],
    breathing: [590, 1.02],
    again: [535, 1.06],
    locating: [500, 1.08],
    inside: [455, 1.18],
    run: [380, 1.22],
    narrowing: [345, 1.3],
    waking: [330, 1.34],
    warning: [390, 1.15],
    eye: [480, 1.02],
    escape: [440, 1.18]
  };

  const [
    period,
    strength
  ] =
    heartSettings[scene] ||
    [720, 0.8];

  setHeartbeat(
    period,
    strength,
    true
  );

  if (
    [
      "breathing",
      "again",
      "locating"
    ].includes(scene)
  ) {
    setBreathing(
      scene === "again"
        ? 1700
        : 2600
    );
  }

  if (
    [
      "run",
      "narrowing",
      "waking"
    ].includes(scene)
  ) {
    setFootsteps(
      scene === "narrowing"
        ? 290
        : 350
    );
  }

  if (scene === "monitor") {
    tone(
      1240,
      0.12,
      0.05,
      "square"
    );

    tone(
      1240,
      0.12,
      0.05,
      "square",
      0.22
    );

    tone(
      690,
      0.2,
      0.08,
      "sawtooth",
      0.5
    );
  }

  if (scene === "faceless") {
    noiseBurst(
      0.9,
      0.095,
      1150
    );
  }

  if (scene === "inside") {
    tone(
      30,
      1.2,
      0.32,
      "sawtooth"
    );

    noiseBurst(
      0.85,
      0.12,
      920
    );
  }

  if (scene === "run") {
    noiseBurst(
      1.1,
      0.15,
      780
    );

    tone(
      92,
      1.4,
      0.1,
      "sawtooth"
    );
  }

  if (scene === "warning") {
    noiseBurst(
      1.4,
      0.08,
      480
    );
  }
}


/* ==========================================
   DISPARITION DU TRAIN
========================================== */

function fadeTrain() {
  const startVolume =
    trainRemnant.volume;

  let step = 0;

  window.clearInterval(
    countdownTimer
  );

  countdownTimer =
    window.setInterval(
      () => {
        step += 1;

        trainRemnant.volume =
          Math.max(
            0,
            startVolume *
            (
              1 -
              step / 18
            )
          );

        if (step >= 18) {
          window.clearInterval(
            countdownTimer
          );

          trainRemnant.pause();

          trainRemnant.currentTime =
            0;

          trainRemnant.volume =
            0.42;
        }
      },
      110
    );
}


function stopAllAudioLoops() {
  stopHeartbeat();
  stopFootsteps();
  stopBreathing();
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
   INTERFACE DU LABORATOIRE
========================================== */

function setInterface(
  scene,
  index
) {
  const dangerStart =
    sceneNames.indexOf(
      "breathing"
    );

  const dangerProgress =
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
    `${Math.max(
      7,
      Math.round(
        71 -
        dangerProgress *
        64
      )
    )}%`;

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
      "8 M";
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
   CONTRÔLE DES SCÈNES
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
    sceneNames[activeIndex];

  beats.forEach(
    (
      beat,
      beatIndex
    ) => {
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
    `${
      (
        activeIndex /
        (
          beats.length -
          1
        )
      ) *
      100
    }%`;

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
   OBSERVATION DU SCROLL
========================================== */

const observer =
  new IntersectionObserver(
    (entries) => {
      const visible =
        entries
          .filter(
            (entry) =>
              entry.isIntersecting
          )
          .sort(
            (
              firstEntry,
              secondEntry
            ) =>
              secondEntry.intersectionRatio -
              firstEntry.intersectionRatio
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
  (beat) => {
    observer.observe(beat);
  }
);


/* ==========================================
   ALLER À UNE SCÈNE
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
   MOLETTE
========================================== */

window.addEventListener(
  "wheel",
  (event) => {
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
      Math.abs(event.deltaY) <
      8
    ) {
      return;
    }

    event.preventDefault();

    if (wheelLocked) {
      return;
    }

    wheelLocked = true;

    goToBeat(
      activeIndex +
      (
        event.deltaY > 0
          ? 1
          : -1
      )
    );

    window.setTimeout(
      () => {
        wheelLocked = false;
      },
      900
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
  (event) => {
    if (
      body.classList.contains(
        "nightmare-locked"
      ) ||
      escapeComplete
    ) {
      return;
    }

    const accepted = [
      "ArrowDown",
      "ArrowUp",
      "PageDown",
      "PageUp",
      " "
    ];

    if (
      !accepted.includes(
        event.key
      )
    ) {
      return;
    }

    if (
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
   TACTILE
========================================== */

window.addEventListener(
  "touchstart",
  (event) => {
    touchStartY =
      event.changedTouches[0]
        .clientY;
  },
  {
    passive: true
  }
);


window.addEventListener(
  "touchend",
  (event) => {
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
      event.changedTouches[0]
        .clientY;

    if (
      Math.abs(difference) <
      45 ||
      wheelLocked
    ) {
      return;
    }

    wheelLocked = true;

    goToBeat(
      activeIndex +
      (
        difference > 0
          ? 1
          : -1
      )
    );

    window.setTimeout(
      () => {
        wheelLocked = false;
      },
      900
    );
  },
  {
    passive: true
  }
);


/* ==========================================
   OUVERTURE DE L’EXPÉRIENCE
========================================== */

followPulse.addEventListener(
  "click",
  () => {
    soundEnabled = true;

    localStorage.setItem(
      "museumSound",
      "on"
    );

    updateSoundButton();

    ensureAudio();

    setHeartbeat(
      830,
      0.72,
      true
    );

    setAtmosphere(
      "arrival"
    );

    trainRemnant.muted =
      false;

    trainRemnant.volume =
      0.42;

    trainRemnant.currentTime =
      0;

    trainRemnant
      .play()
      .then(fadeTrain)
      .catch(() => {});

    pulseGate.classList.add(
      "is-leaving"
    );

    body.classList.remove(
      "nightmare-locked"
    );

    window.setTimeout(
      () => {
        pulseGate.remove();

        syncAudio(
          sceneNames[
            activeIndex
          ]
        );
      },
      1050
    );
  }
);


/* ==========================================
   BOUTON SOUND ON / OFF
========================================== */

soundToggle.addEventListener(
  "click",
  () => {
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
        ? 0.78
        : 0,
      audioContext.currentTime,
      0.06
    );

    trainRemnant.muted =
      !soundEnabled;

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
   MAINTENIR POUR OUVRIR L’ŒIL
========================================== */

function updateHold(currentTime) {
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
    `${progress * 360}deg`
  );

  forceLabel.textContent =
    progress > 0.72
      ? "KEEP HOLDING"
      : "HOLD TO FORCE IT OPEN";

  if (progress >= 1) {
    completeEscape();

    return;
  }

  holdFrame =
    window.requestAnimationFrame(
      updateHold
    );
}


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

  isHolding = true;

  holdStart =
    performance.now();

  body.classList.add(
    "is-forcing-eye"
  );

  setHeartbeat(
    285,
    1.42,
    true
  );

  setFootsteps(235);

  tone(
    29,
    2.5,
    0.28,
    "sawtooth"
  );

  noiseBurst(
    2.2,
    0.14,
    520
  );

  window.cancelAnimationFrame(
    holdFrame
  );

  holdFrame =
    window.requestAnimationFrame(
      updateHold
    );
}


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

  forceLabel.textContent =
    "HOLD TO FORCE IT OPEN";

  syncAudio("escape");
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
    27,
    1.25,
    0.42,
    "sawtooth"
  );

  tone(
    980,
    0.34,
    0.11,
    "sine",
    0.52
  );

  noiseBurst(
    1.1,
    0.22,
    1200
  );

  window.setTimeout(
    () => {
      if (
        masterGain &&
        audioContext
      ) {
        masterGain.gain.setTargetAtTime(
          0.0001,
          audioContext.currentTime,
          0.18
        );
      }
    },
    650
  );

  window.setTimeout(
    () => {
      window.location.href =
        "awakening.html";
    },
    1450
  );
}


/* ==========================================
   INTERACTIONS DE L’ŒIL
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
  (event) => {
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
  (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      cancelHold();
    }
  }
);


/* ==========================================
   LUMIÈRE QUI SUIT LA SOURIS
========================================== */

let pointerFrame = null;
let pointerX = 50;
let pointerY = 50;


window.addEventListener(
  "pointermove",
  (event) => {
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
        () => {
          body.style.setProperty(
            "--pointer-x",
            `${pointerX}%`
          );

          body.style.setProperty(
            "--pointer-y",
            `${pointerY}%`
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
