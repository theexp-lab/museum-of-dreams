const body = document.body;

const beats = [
  ...document.querySelectorAll(
    ".story-beat"
  )
];

const scrollCue =
  document.querySelector(
    "#scroll-cue"
  );

const soundToggle =
  document.querySelector(
    "#sound-toggle"
  );

const takeHand =
  document.querySelector(
    "#take-hand"
  );

const countdownValue =
  document.querySelector(
    "#countdown-value"
  );

const pulseBeat =
  document.querySelector(
    ".pulse-beat"
  );

const signalCount =
  document.querySelector(
    "#signal-count"
  );

const signalMessage =
  document.querySelector(
    "#signal-message"
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


/* ==========================================
   SONS IMPORTÉS
========================================== */

const startSound =
  document.querySelector(
    "#motorcycle-start"
  );

const rideSound =
  document.querySelector(
    "#motorcycle-ride"
  );

const trainSound =
  document.querySelector(
    "#train-pass"
  );


/* ==========================================
   ÉTAT DE LA PAGE
========================================== */

const sceneNames =
  beats.map(
    function (beat) {
      return beat.dataset.scene;
    }
  );

let activeIndex = -1;

let wheelLocked = false;

let audioUnlocked = false;

let soundEnabled =
  localStorage.getItem(
    "museumSound"
  ) !== "off";

let audioContext;

let masterGain;

let heartbeatTimer;

let countdownTimer;

let thirdSignalTimer;

let mediaPrimed = false;

let mediaPriming = false;

const played =
  new Set();


/* ==========================================
   VOLUMES
========================================== */

startSound.volume = 0.72;

rideSound.volume = 0;

trainSound.volume = 0.72;


/* ==========================================
   BOUTON DU SON
========================================== */

function updateSoundButton() {
  soundToggle.textContent =
    soundEnabled
      ? "SOUND ON"
      : "SOUND OFF";

  soundToggle.setAttribute(
    "aria-pressed",
    String(
      soundEnabled
    )
  );
}


/* ==========================================
   DÉBLOQUER LE SON DU NAVIGATEUR
========================================== */

function ensureAudio() {
  if (
    !audioUnlocked
  ) {
    audioUnlocked = true;

    audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

    masterGain =
      audioContext.createGain();

    masterGain.gain.value =
      soundEnabled
        ? 0.8
        : 0;

    masterGain.connect(
      audioContext.destination
    );
  }

  if (
    audioContext?.state ===
    "suspended"
  ) {
    audioContext.resume();
  }
}


/*
 * Chrome exige que les fichiers audio
 * soient activés pendant un geste humain.
 */

function primeMedia() {
  ensureAudio();

  if (
    mediaPrimed ||
    mediaPriming ||
    !soundEnabled
  ) {
    return;
  }

  mediaPriming = true;

  const media = [
    startSound,
    rideSound,
    trainSound
  ];

  const attempts =
    media.map(
      function (audio) {
        audio.muted = true;

        audio.load();

        return audio
          .play()
          .catch(
            function () {
              return null;
            }
          );
      }
    );

  Promise
    .all(
      attempts
    )
    .then(
      function () {
        media.forEach(
          function (audio) {
            audio.pause();

            audio.currentTime = 0;

            audio.muted =
              !soundEnabled;
          }
        );

        mediaPrimed = true;

        mediaPriming = false;

        syncAudio(
          sceneNames[
            activeIndex
          ],
          activeIndex
        );
      }
    );
}


/* ==========================================
   SONS CRÉÉS PAR LE NAVIGATEUR
========================================== */

function tone(
  frequency,
  duration,
  volume,
  type = "sine",
  delay = 0
) {
  if (
    !soundEnabled ||
    !audioContext ||
    !masterGain
  ) {
    return;
  }

  const now =
    audioContext.currentTime +
    delay;

  const oscillator =
    audioContext
      .createOscillator();

  const gain =
    audioContext
      .createGain();

  oscillator.type =
    type;

  oscillator.frequency
    .setValueAtTime(
      frequency,
      now
    );

  gain.gain
    .setValueAtTime(
      0.0001,
      now
    );

  gain.gain
    .exponentialRampToValueAtTime(
      volume,
      now + 0.02
    );

  gain.gain
    .exponentialRampToValueAtTime(
      0.0001,
      now + duration
    );

  oscillator
    .connect(
      gain
    )
    .connect(
      masterGain
    );

  oscillator.start(
    now
  );

  oscillator.stop(
    now +
    duration +
    0.04
  );
}


/* ==========================================
   BATTEMENTS DU CŒUR
========================================== */

function heartbeat(
  strength = 1,
  extraPulse = false
) {
  tone(
    58,
    0.16,
    0.32 * strength,
    "sine"
  );

  tone(
    46,
    0.22,
    0.24 * strength,
    "sine",
    0.18
  );

  if (
    extraPulse
  ) {
    tone(
      72,
      0.13,
      0.22 * strength,
      "sine",
      0.34
    );

    tone(
      51,
      0.18,
      0.17 * strength,
      "sine",
      0.48
    );
  }
}


function impact() {
  tone(
    42,
    0.9,
    0.42,
    "sawtooth"
  );

  tone(
    86,
    0.45,
    0.2,
    "square",
    0.05
  );
}


function safePlay(
  audio,
  restart = false
) {
  if (
    !soundEnabled ||
    !audioUnlocked
  ) {
    return;
  }

  if (
    restart
  ) {
    audio.currentTime = 0;
  }

  audio
    .play()
    .catch(
      function () {
        /* Le navigateur peut encore
           refuser avant le premier geste. */
      }
    );
}


function stopHeartbeat() {
  window.clearInterval(
    heartbeatTimer
  );

  heartbeatTimer = null;
}


function setHeartbeat(
  period,
  extraPulse = false
) {
  stopHeartbeat();

  if (
    !soundEnabled ||
    !audioUnlocked
  ) {
    return;
  }

  heartbeat(
    1,
    extraPulse
  );

  heartbeatTimer =
    window.setInterval(
      function () {
        heartbeat(
          1,
          extraPulse
        );
      },
      period
    );
}


/* ==========================================
   OBSERVATIONS SCIENTIFIQUES
========================================== */

function setResearch(
  scene
) {
  const secondNoteScenes = [
    "directions",
    "rooftop",
    "jump",
    "airborne",
    "train",
    "countdown"
  ];

  if (
    secondNoteScenes.includes(
      scene
    )
  ) {
    researchNumber.textContent =
      "RESEARCH NOTE 05.2";

    researchText.textContent =
      "Dream narratives can change location, objective and physical rules without requiring a logical transition.";

    researchPrinciple.textContent =
      "DISCONTINUITY · ACCEPTED AS REAL";
  } else {
    researchNumber.textContent =
      "RESEARCH NOTE 05.1";

    researchText.textContent =
      "During REM sleep, movement can be vividly simulated while most skeletal muscles remain inhibited.";

    researchPrinciple.textContent =
      "MOTION · WITHOUT MOVEMENT";
  }
}


/* ==========================================
   COMPTE À REBOURS
========================================== */

function runCountdown() {
  window.clearInterval(
    countdownTimer
  );

  let value = 8;

  countdownValue.textContent =
    "08";

  countdownTimer =
    window.setInterval(
      function () {
        value =
          Math.max(
            1,
            value - 1
          );

        countdownValue.textContent =
          String(
            value
          ).padStart(
            2,
            "0"
          );

        tone(
          760,
          0.08,
          0.07,
          "square"
        );

        if (
          value === 1
        ) {
          window.clearInterval(
            countdownTimer
          );
        }
      },
      470
    );
}


/* ==========================================
   TROISIÈME SIGNAL
========================================== */

function resetThirdSignal() {
  window.clearTimeout(
    thirdSignalTimer
  );

  pulseBeat.classList.remove(
    "third-signal"
  );

  signalCount.textContent =
    "02";

  signalMessage.textContent =
    "TWO PULSES STABLE";
}


function revealThirdSignal() {
  resetThirdSignal();

  setHeartbeat(
    920,
    true
  );

  thirdSignalTimer =
    window.setTimeout(
      function () {
        pulseBeat.classList.add(
          "third-signal"
        );

        signalCount.textContent =
          "03";

        signalMessage.textContent =
          "THERE WERE ONLY TWO OF YOU";

        heartbeat(
          1.3,
          true
        );
      },
      2800
    );
}


/* ==========================================
   SYNCHRONISATION AUDIO
========================================== */

function syncAudio(
  scene,
  index
) {
  const riding = [
    "ride",
    "directions"
  ];

  const heartbeatScenes = [
    "jump",
    "airborne",
    "train",
    "countdown",
    "passenger",
    "rescue",
    "hand",
    "fall"
  ];


  /* Démarrage de la moto */

  if (
    mediaPrimed &&
    scene === "exhibit" &&
    !played.has(
      "start"
    )
  ) {
    safePlay(
      startSound,
      true
    );

    played.add(
      "start"
    );
  }


  /* Moto en mouvement */

  if (
    mediaPrimed &&
    riding.includes(
      scene
    )
  ) {
    rideSound.volume =
      scene === "ride"
        ? 0.72
        : 0.86;

    rideSound.playbackRate =
      scene === "ride"
        ? 1
        : 1.12;

    safePlay(
      rideSound
    );
  } else if (
    !rideSound.paused
  ) {
    rideSound.pause();
  }


  /* Passage du train */

  if (
    mediaPrimed &&
    scene === "train" &&
    !played.has(
      "train"
    )
  ) {
    safePlay(
      trainSound,
      true
    );

    played.add(
      "train"
    );
  }


  /* Compte à rebours */

  if (
    scene === "countdown"
  ) {
    runCountdown();
  } else {
    window.clearInterval(
      countdownTimer
    );
  }


  /* Battements */

  if (
    scene === "fall"
  ) {
    impact();

    setHeartbeat(
      430,
      true
    );
  } else if (
    scene === "pulse"
  ) {
    startSound.pause();

    rideSound.pause();

    trainSound.pause();

    revealThirdSignal();
  } else if (
    heartbeatScenes.includes(
      scene
    )
  ) {
    const period =
      Math.max(
        470,
        780 -
        index *
        24
      );

    setHeartbeat(
      period,
      scene === "hand"
    );
  } else {
    stopHeartbeat();
  }
}


/* ==========================================
   ACTIVER UNE SCÈNE
========================================== */

function activateScene(
  index
) {
  const nextIndex =
    Math.max(
      0,
      Math.min(
        beats.length - 1,
        index
      )
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

  body.dataset.scene =
    scene;

  body.style.setProperty(
    "--scene-progress",
    activeIndex /
    (
      beats.length - 1
    )
  );

  scrollCue.textContent =
    scene === "pulse"
      ? "ROOM 06 SIGNAL DETECTED"
      : "CONTINUE THROUGH THE INSTALLATION";

  setResearch(
    scene
  );

  if (
    scene !== "pulse"
  ) {
    resetThirdSignal();
  }

  syncAudio(
    scene,
    activeIndex
  );
}


/* ==========================================
   DÉTECTION DES SECTIONS
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
              firstEntry,
              secondEntry
            ) {
              return (
                secondEntry.intersectionRatio -
                firstEntry.intersectionRatio
              );
            }
          )[0];

      if (
        visible
      ) {
        activateScene(
          beats.indexOf(
            visible.target
          )
        );
      }
    },
    {
      threshold: [
        0.55,
        0.72
      ]
    }
  );

beats.forEach(
  function (beat) {
    observer.observe(
      beat
    );
  }
);


/* ==========================================
   NAVIGATION ENTRE LES PHRASES
========================================== */

function goToBeat(
  index
) {
  const target =
    Math.max(
      0,
      Math.min(
        beats.length - 1,
        index
      )
    );

  beats[
    target
  ].scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* Scroll de souris ou trackpad */

window.addEventListener(
  "wheel",
  function (event) {
    primeMedia();

    if (
      Math.abs(
        event.deltaY
      ) < 8
    ) {
      return;
    }

    event.preventDefault();

    if (
      wheelLocked
    ) {
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
      function () {
        wheelLocked = false;
      },
      850
    );
  },
  {
    passive: false
  }
);


/* Navigation au clavier */

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

    primeMedia();

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


/* Premier geste tactile ou clic */

window.addEventListener(
  "pointerdown",
  primeMedia,
  {
    once: true
  }
);


/* ==========================================
   SOUND ON / SOUND OFF
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

    if (
      masterGain
    ) {
      masterGain.gain.setTargetAtTime(
        soundEnabled
          ? 0.8
          : 0,
        audioContext.currentTime,
        0.05
      );
    }

    [
      startSound,
      rideSound,
      trainSound
    ].forEach(
      function (audio) {
        audio.muted =
          !soundEnabled;
      }
    );

    if (
      soundEnabled
    ) {
      primeMedia();

      syncAudio(
        sceneNames[
          activeIndex
        ],
        activeIndex
      );
    } else {
      stopHeartbeat();
    }

    updateSoundButton();
  }
);


/* ==========================================
   PRENDRE LA MAIN
========================================== */

takeHand.addEventListener(
  "click",
  function () {
    primeMedia();

    heartbeat(
      1.2,
      true
    );

    goToBeat(
      sceneNames.indexOf(
        "fall"
      )
    );
  }
);


/* ==========================================
   PLUIE ET VITESSE
========================================== */

const canvas =
  document.querySelector(
    "#weather-canvas"
  );

const context =
  canvas.getContext(
    "2d"
  );

let drops = [];

let canvasWidth = 0;

let canvasHeight = 0;


function resizeCanvas() {
  const ratio =
    Math.min(
      window.devicePixelRatio ||
      1,
      1.5
    );

  canvasWidth =
    window.innerWidth;

  canvasHeight =
    window.innerHeight;

  canvas.width =
    canvasWidth *
    ratio;

  canvas.height =
    canvasHeight *
    ratio;

  context.setTransform(
    ratio,
    0,
    0,
    ratio,
    0,
    0
  );

  const count =
    window.innerWidth < 700
      ? 45
      : 85;

  drops =
    Array.from(
      {
        length: count
      },
      function () {
        return {
          x:
            Math.random() *
            canvasWidth,

          y:
            Math.random() *
            canvasHeight,

          length:
            12 +
            Math.random() *
            35,

          speed:
            7 +
            Math.random() *
            15,

          opacity:
            0.08 +
            Math.random() *
            0.28
        };
      }
    );
}


function animateWeather() {
  context.clearRect(
    0,
    0,
    canvasWidth,
    canvasHeight
  );

  const fast =
    [
      "ride",
      "directions",
      "airborne",
      "fall"
    ].includes(
      body.dataset.scene
    );

  drops.forEach(
    function (drop) {
      drop.x -=
        fast
          ? drop.speed * 0.65
          : drop.speed * 0.12;

      drop.y +=
        fast
          ? drop.speed
          : drop.speed * 0.35;

      if (
        drop.y >
        canvasHeight +
        40 ||
        drop.x <
        -40
      ) {
        drop.x =
          Math.random() *
          canvasWidth +
          (
            fast
              ? canvasWidth * 0.35
              : 0
          );

        drop.y =
          -40;
      }

      context.beginPath();

      context.moveTo(
        drop.x,
        drop.y
      );

      context.lineTo(
        drop.x -
        (
          fast
            ? drop.length * 0.65
            : 2
        ),
        drop.y +
        drop.length
      );

      context.strokeStyle =
        `rgba(178,225,255,${drop.opacity})`;

      context.lineWidth =
        0.7;

      context.stroke();
    }
  );

  window.requestAnimationFrame(
    animateWeather
  );
}


/* ==========================================
   MOUVEMENT DU COCKPIT
========================================== */

window.addEventListener(
  "pointermove",
  function (event) {
    const horizontal =
      event.clientX /
      window.innerWidth -
      0.5;

    body.style.setProperty(
      "--steer",
      horizontal *
      3.2 +
      "deg"
    );

    body.style.setProperty(
      "--cockpit-x",
      horizontal *
      14 +
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

updateSoundButton();

resizeCanvas();

activateScene(
  0
);

window.requestAnimationFrame(
  animateWeather
);

window.addEventListener(
  "resize",
  resizeCanvas
);
