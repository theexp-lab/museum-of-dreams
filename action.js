const body =
  document.body;

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

const soundEntry =
  document.querySelector(
    "#sound-entry"
  );


const enterWithSound =
  document.querySelector(
    "#enter-with-sound"
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
   FICHIERS AUDIO
========================================== */

const startSound =
  document.querySelector(
    "#motorcycle-start"
  );

const trainSound =
  document.querySelector(
    "#train-pass"
  );


/* ==========================================
   ÉTAT
========================================== */

const sceneNames =
  beats.map(
    function (beat) {
      return beat.dataset.scene;
    }
  );

let activeIndex =
  -1;

let wheelLocked =
  false;

let audioUnlocked =
  false;

let soundEnabled =
  localStorage.getItem(
    "museumSound"
  ) !== "off";

let audioContext;

let masterGain;

let heartbeatTimer;

let countdownTimer;

let thirdSignalTimer;

let startSoundCutTimer;

let mediaPrimed =
  false;

let mediaPriming =
  false;

let atmosphereReady =
  false;

let windSource;

let windGain;

let windFilter;

let rumbleOscillator;

let rumbleGain;

let electricOscillator;

let electricGain;

let signalToneTimer;

const played =
  new Set();


startSound.volume = 0.92;

trainSound.volume = 0.95;


/* ==========================================
   BOUTON AUDIO
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
   DÉBLOQUER LE SON
========================================== */

function ensureAudio() {
  if (
    !audioUnlocked
  ) {
    audioUnlocked =
      true;

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

    createAtmosphere();
  }

  if (
    audioContext?.state ===
    "suspended"
  ) {
    audioContext.resume();
  }
}


/*
 * Chrome demande une interaction
 * avant de permettre la lecture.
 */

/* ==========================================
   DÉVERROUILLER LES FICHIERS AUDIO

   Les sons sont brièvement lancés à volume
   nul pendant le clic. Le navigateur les
   autorisera ensuite pendant le scroll.
========================================== */

function primeMedia() {
  ensureAudio();


  if (
    mediaPrimed ||
    mediaPriming ||
    !soundEnabled
  ) {
    return Promise.resolve();
  }


  mediaPriming = true;


  const media = [
    {
      audio: startSound,
      volume: 0.92
    },

    {
      audio: trainSound,
      volume: 0.95
    }
  ];


  const unlocking =
    media.map(
      function (item) {
        const audio =
          item.audio;


        audio.pause();

        audio.currentTime = 0;

        audio.muted = false;

        audio.volume = 0;


        const playback =
          audio.play();


        return Promise.resolve(
          playback
        )

          .then(
            function () {
              return new Promise(
                function (resolve) {
                  window.setTimeout(
                    function () {
                      audio.pause();

                      audio.currentTime = 0;

                      audio.volume =
                        item.volume;

                      resolve();
                    },
                    90
                  );
                }
              );
            }
          )

          .catch(
            function () {
              audio.pause();

              audio.currentTime = 0;

              audio.volume =
                item.volume;
            }
          );
      }
    );


  return Promise.all(
    unlocking
  )

    .then(
      function () {
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

  mediaPriming =
    true;

  const media = [
    startSound,
    trainSound
  ];

  const attempts =
    media.map(
      function (audio) {
        audio.muted =
          true;

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

            audio.currentTime =
              0;

            audio.muted =
              !soundEnabled;
          }
        );

        mediaPrimed =
          true;

        mediaPriming =
          false;

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
   AMBIANCE DE LA VILLE
========================================== */

function createAtmosphere() {
  if (
    atmosphereReady ||
    !audioContext ||
    !masterGain
  ) {
    return;
  }

  atmosphereReady =
    true;


  /* Créer une texture de vent */

  const frameCount =
    audioContext.sampleRate *
    2;

  const noiseBuffer =
    audioContext.createBuffer(
      1,
      frameCount,
      audioContext.sampleRate
    );

  const channel =
    noiseBuffer.getChannelData(
      0
    );

  for (
    let index = 0;
    index < frameCount;
    index += 1
  ) {
    channel[index] =
      (
        Math.random() *
        2 -
        1
      ) *
      0.55;
  }


  windSource =
    audioContext
      .createBufferSource();

  windSource.buffer =
    noiseBuffer;

  windSource.loop =
    true;


  windFilter =
    audioContext
      .createBiquadFilter();

  windFilter.type =
    "bandpass";

  windFilter.frequency.value =
    780;

  windFilter.Q.value =
    0.55;


  windGain =
    audioContext
      .createGain();

  windGain.gain.value =
    0.0001;


  windSource
    .connect(
      windFilter
    )
    .connect(
      windGain
    )
    .connect(
      masterGain
    );

  windSource.start();


  /* Grondement grave */

  rumbleOscillator =
    audioContext
      .createOscillator();

  rumbleOscillator.type =
    "sine";

  rumbleOscillator.frequency.value =
    39;


  rumbleGain =
    audioContext
      .createGain();

  rumbleGain.gain.value =
    0.0001;


  rumbleOscillator
    .connect(
      rumbleGain
    )
    .connect(
      masterGain
    );

  rumbleOscillator.start();


  /* Bourdonnement électrique de la ville */

  electricOscillator =
    audioContext
      .createOscillator();

  electricOscillator.type =
    "triangle";

  electricOscillator.frequency.value =
    96;


  electricGain =
    audioContext
      .createGain();

  electricGain.gain.value =
    0.0001;


  electricOscillator
    .connect(
      electricGain
    )
    .connect(
      masterGain
    );

  electricOscillator.start();
}


/* ==========================================
   VOLUME PAR SCÈNE
========================================== */

function setAtmosphere(
  scene
) {
  if (
    !audioContext ||
    !atmosphereReady
  ) {
    return;
  }


  /*
   * Le vent reste discret.
   * Il apparaît surtout pendant
   * les accélérations et la chute.
   */

  const windLevels = {
    ride: 0.035,
    directions: 0.052,
    pursuit: 0.09,
    rooftop: 0.0001,
    jump: 0.028,
    airborne: 0.105,
    train: 0.025,
    countdown: 0.012,
    passenger: 0.008,
    rescue: 0.012,
    hand: 0.018,
    fall: 0.075,
    pulse: 0.0001
  };


  /*
   * La texture électrique donne
   * une présence à la ville sans
   * produire un souffle permanent.
   */

  const cityLevels = {
    intro: 0.018,
    exhibit: 0.022,
    trouble: 0.032,
    ride: 0.025,
    directions: 0.022,
    pursuit: 0.018,
    rooftop: 0.0001,
    jump: 0.008,
    airborne: 0.004,
    train: 0.025,
    countdown: 0.045,
    passenger: 0.052,
    rescue: 0.06,
    hand: 0.068,
    fall: 0.08,
    pulse: 0.0001
  };


  const dangerScenes = [
    "countdown",
    "passenger",
    "rescue",
    "hand",
    "fall"
  ];


  const windLevel =
    soundEnabled
      ? (
          windLevels[
            scene
          ] ||
          0.0001
        )
      : 0.0001;


  const cityLevel =
    soundEnabled
      ? (
          cityLevels[
            scene
          ] ||
          0.0001
        )
      : 0.0001;


  const rumbleLevel =
    soundEnabled &&
    dangerScenes.includes(
      scene
    )
      ? 0.075
      : 0.0001;


  const now =
    audioContext.currentTime;


  windGain.gain.setTargetAtTime(
    windLevel,
    now,
    0.35
  );


  rumbleGain.gain.setTargetAtTime(
    rumbleLevel,
    now,
    0.45
  );


  electricGain.gain.setTargetAtTime(
    cityLevel,
    now,

    scene === "rooftop"
      ? 0.08
      : 0.5
  );


  windFilter.frequency.setTargetAtTime(
    scene === "airborne"
      ? 1250
      : 780,

    now,

    0.3
  );
}


/* ==========================================
   SONS SYNTHÉTISÉS
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

  oscillator.frequency.setValueAtTime(
    frequency,
    now
  );

  gain.gain.setValueAtTime(
    0.0001,
    now
  );

  gain.gain.exponentialRampToValueAtTime(
    volume,
    now +
    0.02
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now +
    duration
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
   BALISE SONORE DU SIGNAL ROUGE
========================================== */

function signalPing() {
  tone(
    880,
    0.28,
    0.045,
    "sine"
  );

  tone(
    1320,
    0.18,
    0.018,
    "sine",
    0.07
  );
}


/* Signal urgent sur le toit */

function urgentSignalPing() {
  tone(
    930,
    0.19,
    0.095,
    "triangle"
  );

  tone(
    1395,
    0.13,
    0.045,
    "sine",
    0.045
  );

  tone(
    1860,
    0.09,
    0.022,
    "sine",
    0.1
  );
}


function setSignalPulse(scene) {
  window.clearInterval(
    signalToneTimer
  );

  signalToneTimer = null;


  if (
    !soundEnabled ||
    !audioUnlocked
  ) {
    return;
  }


  /* Le signal apparaît au loin */

  if (
    scene === "directions"
  ) {
    signalPing();

    signalToneTimer =
      window.setInterval(
        signalPing,
        1300
      );
  }


  /* Le signal accélère pendant la poursuite */

  if (
    scene === "pursuit"
  ) {
    signalPing();

    signalToneTimer =
      window.setInterval(
        signalPing,
        720
      );
  }


  /*
   * Le signal attend sur le toit :
   * beaucoup plus rapide et plus puissant.
   */

  if (
    scene === "rooftop"
  ) {
    urgentSignalPing();

    signalToneTimer =
      window.setInterval(
        urgentSignalPing,
        390
      );
  }
}


/* ==========================================
   SOUFFLES PONCTUELS
========================================== */

function noiseBurst(
  duration = 0.45,
  volume = 0.1,
  frequency = 1100
) {
  if (
    !soundEnabled ||
    !audioContext ||
    !masterGain
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
    buffer.getChannelData(
      0
    );

  for (
    let index = 0;
    index < frameCount;
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
        frameCount
      );
  }


  const source =
    audioContext
      .createBufferSource();

  const filter =
    audioContext
      .createBiquadFilter();

  const gain =
    audioContext
      .createGain();

  const now =
    audioContext.currentTime;


  filter.type =
    "bandpass";

  filter.frequency.value =
    frequency;

  filter.Q.value =
    0.8;


  gain.gain.setValueAtTime(
    volume,
    now
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now +
    duration
  );


  source.buffer =
    buffer;

  source
    .connect(
      filter
    )
    .connect(
      gain
    )
    .connect(
      masterGain
    );

  source.start(
    now
  );
}


/* ==========================================
   COUPER LE SON DE DÉMARRAGE
========================================== */

function fadeAndStop(
  audio,
  duration = 650
) {
  const startingVolume =
    audio.volume;

  const startedAt =
    performance.now();


  function fade(
    currentTime
  ) {
    const progress =
      Math.min(
        1,
        (
          currentTime -
          startedAt
        ) /
        duration
      );

    audio.volume =
      startingVolume *
      (
        1 -
        progress
      );

    if (
      progress < 1
    ) {
      window.requestAnimationFrame(
        fade
      );
    } else {
      audio.pause();

      audio.currentTime =
        0;

      audio.volume =
        startingVolume;
    }
  }


  window.requestAnimationFrame(
    fade
  );
}


/* ==========================================
   CŒUR ET IMPACT
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
    audio.currentTime =
      0;
  }

  audio
    .play()
    .catch(
      function () {
        /* Bloqué avant la première interaction. */
      }
    );
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
   NOTES SCIENTIFIQUES
========================================== */

function setResearch(
  scene
) {
  const secondNoteScenes = [
    "directions",
    "pursuit",
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

  let value =
    8;

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


        /*
         * Alarme grave plutôt qu’un
         * bip électronique aigu.
         */

        tone(
          155,
          0.28,
          0.085,
          "sawtooth"
        );

        tone(
          310,
          0.12,
          0.026,
          "sine",
          0.04
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
   AUDIO PAR SCÈNE
========================================== */

function syncAudio(
  scene,
  index
) {
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


  setAtmosphere(
    scene
  );

  setSignalPulse(
    scene
  );


  /* Démarrage court de la moto */

  if (
    mediaPrimed &&
    scene === "trouble" &&
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

    window.clearTimeout(
      startSoundCutTimer
    );

    startSoundCutTimer =
      window.setTimeout(
        function () {
          fadeAndStop(
            startSound,
            700
          );
        },

        1900
      );
  }


  /* Entrée dans le cockpit */

  if (
    scene === "ride"
  ) {
    noiseBurst(
      0.7,
      0.11,
      1450
    );
  }


  /* Signal encore lointain */

  if (
    scene === "directions"
  ) {
    noiseBurst(
      0.38,
      0.055,
      1150
    );
  }


  /* Accélération */

  if (
    scene === "pursuit"
  ) {
    noiseBurst(
      0.62,
      0.12,
      1550
    );
  }


  /* Arrêt sur le toit */

  if (
    scene === "rooftop"
  ) {
    noiseBurst(
      0.9,
      0.07,
      430
    );
  }


  /* Saut */

  if (
    scene === "jump"
  ) {
    noiseBurst(
      0.7,
      0.105,
      520
    );
  }


  /* Chute dans le vide */

  if (
    scene === "airborne"
  ) {
    noiseBurst(
      0.9,
      0.14,
      980
    );
  }


  /* Son réel du train */

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
   SCROLL GUIDÉ
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



    
    updateSoundButton();



    /* ==========================================
   ENTRER DANS LA SALLE AVEC LE SON
========================================== */

enterWithSound.addEventListener(
  "click",

  function () {
    /*
     * La salle s’ouvre immédiatement :
     * aucun fichier audio ne peut bloquer
     * le bouton.
     */

    soundEnabled = true;


    localStorage.setItem(
      "museumSound",
      "on"
    );


    updateSoundButton();


    /* Déverrouiller Web Audio */

    try {
      ensureAudio();


      if (
        audioContext &&
        audioContext.state ===
        "suspended"
      ) {
        audioContext.resume();
      }


      if (
        masterGain &&
        audioContext
      ) {
        masterGain.gain.setValueAtTime(
          0.8,
          audioContext.currentTime
        );
      }
    } catch (error) {
      console.warn(
        "Web Audio could not start:",
        error
      );
    }


    /* Déverrouiller les deux fichiers MP3 */

    const soundsToUnlock = [
      {
        audio: startSound,
        volume: 0.92
      },

      {
        audio: trainSound,
        volume: 0.95
      }
    ];


    soundsToUnlock.forEach(
      function (item) {
        const audio =
          item.audio;


        if (!audio) {
          return;
        }


        audio.muted = true;

        audio.volume = 0;

        audio.currentTime = 0;


        const playback =
          audio.play();


        if (
          playback &&
          typeof playback.catch ===
          "function"
        ) {
          playback.catch(
            function () {
              /*
               * On ne bloque jamais
               * l’ouverture de la salle.
               */
            }
          );
        }


        window.setTimeout(
          function () {
            audio.pause();

            audio.currentTime = 0;

            audio.muted = false;

            audio.volume =
              item.volume;
          },
          120
        );
      }
    );


    mediaPrimed = true;

    mediaPriming = false;


    /* Petit son de confirmation */

    try {
      tone(
        220,
        0.34,
        0.04,
        "sine"
      );


      tone(
        440,
        0.3,
        0.025,
        "sine",
        0.12
      );
    } catch (error) {
      console.warn(
        "Confirmation sound unavailable:",
        error
      );
    }


    /* Ouvrir immédiatement la salle */

    soundEntry.classList.add(
      "is-leaving"
    );


    body.classList.remove(
      "sound-locked"
    );


    window.setTimeout(
      function () {
        soundEntry.remove();


        syncAudio(
          sceneNames[
            activeIndex
          ],

          activeIndex
        );
      },
      900
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

      window.clearInterval(
        signalToneTimer
      );

      setAtmosphere(
        "pulse"
      );
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

let canvasWidth =
  0;

let canvasHeight =
  0;


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
      "pursuit",
      "airborne",
      "fall"
    ].includes(
      body.dataset.scene
    );

  drops.forEach(
    function (drop) {
      drop.x -=
        fast
          ? drop.speed *
            0.65
          : drop.speed *
            0.12;

      drop.y +=
        fast
          ? drop.speed
          : drop.speed *
            0.35;

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
              ? canvasWidth *
                0.35
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
            ? drop.length *
              0.65
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
   DIRECTION DU COCKPIT
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
