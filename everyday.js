/* ==========================================
   THE MUSEUM OF DREAMS
   ROOM 01 — THE EVERYDAY LOOP
========================================== */


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


function range(
  progress,
  start,
  end
) {
  return clamp(
    (
      progress -
      start
    ) /
    (
      end -
      start
    ),
    0,
    1
  );
}


/* ==========================================
   ÉLÉMENTS HTML
========================================== */

const page =
  document.querySelector(
    ".everyday-page"
  );


const sentence =
  document.querySelector(
    "#room-sentence"
  );


const label =
  document.querySelector(
    "#dream-label"
  );


const progressFill =
  document.querySelector(
    "#room-progress-fill"
  );


const movementMessage =
  document.querySelector(
    "#movement-message"
  );


const continueRoom =
  document.querySelector(
    "#continue-room"
  );


const dreamNumber =
  document.querySelector(
    "#dream-number"
  );


const dreamTitle =
  document.querySelector(
    "#dream-title"
  );


const dreamEmotion =
  document.querySelector(
    "#dream-emotion"
  );


const dreamSource =
  document.querySelector(
    "#dream-source"
  );


/* ==========================================
   PHASES DE LA SALLE
========================================== */

const phases = [
  {
    start: 0,

    text: "",

    dream: null
  },

  {
    start: 0.1,

    text:
      "Everything looks familiar. <em>Almost.</em>",

    dream: null
  },

  {
    start: 0.23,

    text:
      "You leave the room. <em>You enter it again.</em>",

    dream: {
      number:
        "DREAM 014",

      title:
        "THE REPEATING ROOM",

      emotion:
        "CONFUSION",

      source:
        "ANONYMOUS SUBMISSION"
    }
  },

  {
    start: 0.39,

    text:
      "You know where you need to go. <em>But the way keeps changing.</em>",

    dream: {
      number:
        "DREAM 031",

      title:
        "THE IMPOSSIBLE JOURNEY",

      emotion:
        "URGENCY",

      source:
        "COLLECTED TESTIMONY"
    }
  },

  {
    start: 0.55,

    text:
      "Everyone seems to know. <em>Except you.</em>",

    dream: {
      number:
        "DREAM 052",

      title:
        "THE FORGOTTEN THING",

      emotion:
        "VULNERABILITY",

      source:
        "ANONYMOUS SUBMISSION"
    }
  },

  {
    start: 0.69,

    text:
      "Dreams rarely repeat reality. <em>They repeat what reality made us feel.</em>",

    dream: null
  },

  {
    start: 0.82,

    text: "",

    dream: null
  },

  {
    start: 0.94,

    text: "",

    dream: null
  }
];


/* ==========================================
   ÉTAT DE LA PAGE
========================================== */

let currentPhase =
  -1;


let sentenceTimer =
  null;


let labelTimer =
  null;


let ticking =
  false;


let dustEnergy =
  0;


/* ==========================================
   METTRE À JOUR LE CARTEL
========================================== */

function updateLabel(
  dream
) {
  window.clearTimeout(
    labelTimer
  );


  if (
    !dream
  ) {
    label.classList.remove(
      "visible"
    );


    return;
  }


  label.classList.add(
    "changing"
  );


  labelTimer =
    window.setTimeout(
      function () {
        dreamNumber.textContent =
          dream.number;


        dreamTitle.textContent =
          dream.title;


        dreamEmotion.textContent =
          dream.emotion;


        dreamSource.textContent =
          dream.source;


        label.classList.remove(
          "changing"
        );


        label.classList.add(
          "visible"
        );
      },
      280
    );
}


/* ==========================================
   CHANGER DE PHASE
========================================== */

function changePhase(
  index
) {
  if (
    index ===
    currentPhase
  ) {
    return;
  }


  currentPhase =
    index;


  /*
   * Retirer toutes les anciennes phases.
   */

  for (
    let phaseIndex = 0;
    phaseIndex < phases.length;
    phaseIndex++
  ) {
    page.classList.remove(
      "phase-" +
      phaseIndex
    );
  }


  page.classList.add(
    "phase-" +
    index
  );


  updateLabel(
    phases[
      index
    ].dream
  );


  window.clearTimeout(
    sentenceTimer
  );


  /*
   * Certaines phases utilisent une section
   * spéciale plutôt que le texte central.
   */

  if (
    !phases[
      index
    ].text
  ) {
    sentence.classList.add(
      "hidden"
    );


    return;
  }


  sentence.classList.remove(
    "hidden"
  );


  sentence.classList.add(
    "changing"
  );


  sentenceTimer =
    window.setTimeout(
      function () {
        sentence.innerHTML =
          phases[
            index
          ].text;


        sentence.classList.remove(
          "changing"
        );
      },
      330
    );
}


/* ==========================================
   MISE À JOUR DU SCROLL
========================================== */

function updateRoom() {
  const maximumScroll =
    Math.max(
      1,
      document.documentElement.scrollHeight -
      window.innerHeight
    );


  const progress =
    clamp(
      window.scrollY /
      maximumScroll,
      0,
      1
    );


  let selectedPhase =
    0;


  phases.forEach(
    function (
      phase,
      index
    ) {
      if (
        progress >=
        phase.start
      ) {
        selectedPhase =
          index;
      }
    }
  );


  changePhase(
    selectedPhase
  );


  /*
   * Zoom progressif dans le couloir.
   */

  const zoom =
    1 +
    progress *
    0.16;


  page.style.setProperty(
    "--journey",
    progress
  );


  page.style.setProperty(
    "--scene-scale",
    zoom
  );


  /*
   * Progression de la page.
   */

  progressFill.style.height =
    progress *
    100 +
    "%";


  movementMessage.style.opacity =
    progress > 0.04
      ? "0"
      : "0.58";


  /*
   * Intensité des particules.
   */

  dustEnergy =
    range(
      progress,
      0.15,
      0.82
    );


  ticking =
    false;
}


/* ==========================================
   OPTIMISATION DU SCROLL
========================================== */

function requestRoomUpdate() {
  if (
    ticking
  ) {
    return;
  }


  ticking =
    true;


  window.requestAnimationFrame(
    updateRoom
  );
}


window.addEventListener(
  "scroll",
  requestRoomUpdate,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  requestRoomUpdate,
  {
    passive: true
  }
);


/* ==========================================
   LUMIÈRE ET PARALLAXE DE LA SOURIS
========================================== */

window.addEventListener(
  "pointermove",
  function (
    event
  ) {
    const horizontal =
      event.clientX /
      window.innerWidth;


    const vertical =
      event.clientY /
      window.innerHeight;


    /*
     * Position du halo lumineux.
     */

    page.style.setProperty(
      "--pointer-x",
      event.clientX +
      "px"
    );


    page.style.setProperty(
      "--pointer-y",
      event.clientY +
      "px"
    );


    /*
     * Très léger déplacement du décor.
     */

    page.style.setProperty(
      "--scene-x",
      (
        horizontal -
        0.5
      ) *
      -8 +
      "px"
    );


    page.style.setProperty(
      "--scene-y",
      (
        vertical -
        0.5
      ) *
      -5 +
      "px"
    );
  },
  {
    passive: true
  }
);


/* Première mise à jour */

updateRoom();


/* ==========================================
   POUSSIÈRE DE RÊVE

   L’animation fonctionne à environ 24 FPS
   afin de préserver les performances.
========================================== */

function initialiseDust() {
  const canvas =
    document.querySelector(
      "#dream-dust"
    );


  if (
    !canvas ||
    !canvas.getContext
  ) {
    return;
  }


  const context =
    canvas.getContext(
      "2d"
    );


  let width =
    0;


  let height =
    0;


  let particles =
    [];


  let previousFrame =
    0;


/* ==========================================
   REDIMENSIONNER LE CANVAS
========================================== */

  function resize() {
    const ratio =
      Math.min(
        window.devicePixelRatio ||
        1,
        1.15
      );


    width =
      window.innerWidth;


    height =
      window.innerHeight;


    canvas.width =
      width *
      ratio;


    canvas.height =
      height *
      ratio;


    context.setTransform(
      ratio,
      0,
      0,
      ratio,
      0,
      0
    );


    particles =
      [];


    const total =
      width < 700
        ? 18
        : 32;


    for (
      let index = 0;
      index < total;
      index++
    ) {
      particles.push({
        x:
          Math.random() *
          width,

        y:
          Math.random() *
          height,

        size:
          0.4 +
          Math.random() *
          1.2,

        speed:
          0.08 +
          Math.random() *
          0.18,

        drift:
          (
            Math.random() -
            0.5
          ) *
          0.12,

        opacity:
          0.16 +
          Math.random() *
          0.48,

        phase:
          Math.random() *
          Math.PI *
          2
      });
    }
  }


/* ==========================================
   DESSINER LES PARTICULES
========================================== */

  function draw(
    time
  ) {
    window.requestAnimationFrame(
      draw
    );


    /*
     * Limitation à environ 24 FPS.
     */

    if (
      time -
      previousFrame <
      42
    ) {
      return;
    }


    previousFrame =
      time;


    context.clearRect(
      0,
      0,
      width,
      height
    );


    context.globalCompositeOperation =
      "lighter";


    particles.forEach(
      function (
        particle
      ) {
        particle.y -=
          particle.speed *
          (
            1 +
            dustEnergy *
            0.8
          );


        particle.x +=
          particle.drift;


        if (
          particle.y <
          -5
        ) {
          particle.y =
            height +
            5;


          particle.x =
            Math.random() *
            width;
        }


        const pulse =
          0.55 +

          Math.sin(
            time *
            0.0018 +
            particle.phase
          ) *

          0.45;


        context.beginPath();


        context.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI *
          2
        );


        context.fillStyle =
          "rgba(255,235,202," +

          particle.opacity *
          pulse +

          ")";


        context.fill();
      }
    );
  }


  resize();


  window.addEventListener(
    "resize",
    resize,
    {
      passive: true
    }
  );


  window.requestAnimationFrame(
    draw
  );
}


/* ==========================================
   LANCER LES PARTICULES
========================================== */

try {
  initialiseDust();
}

catch (
  error
) {
  console.warn(
    "Dream dust unavailable:",
    error
  );
}


/* ==========================================
   SORTIE VERS LA PROCHAINE SALLE
========================================== */

if (
  continueRoom
) {
  continueRoom.addEventListener(
    "click",
    function (
      event
    ) {
      event.preventDefault();


      if (
        page.classList.contains(
          "departing"
        )
      ) {
        return;
      }


      page.classList.add(
        "departing"
      );


      window.setTimeout(
        function () {
          window.location.href =
  "childhood.html";
        },
        1200
      );
    }
  );
}

/* ==========================================
   ROOM 01 — CONTRÔLES ADDITIONNELS

   Ce bloc est indépendant du système
   de scroll existant.
========================================== */


/* ==========================================
   ÉLÉMENTS
========================================== */

const everydaySoundToggle =
  document.querySelector(
    "#everyday-sound-toggle"
  );


const everydaySoundLabel =
  document.querySelector(
    "#everyday-sound-label"
  );


const everydayNotesToggle =
  document.querySelector(
    "#everyday-notes-toggle"
  );


const everydayNotesPanel =
  document.querySelector(
    "#everyday-room-notes"
  );


const everydayNotesBackdrop =
  document.querySelector(
    "#everyday-notes-backdrop"
  );


const everydayCloseNotes =
  document.querySelector(
    "#everyday-close-notes"
  );


/* ==========================================
   PANNEAU ROOM NOTES
========================================== */

function openEverydayNotes() {
  everydayNotesPanel.classList.add(
    "is-open"
  );


  everydayNotesBackdrop.classList.add(
    "is-visible"
  );


  everydayNotesPanel.setAttribute(
    "aria-hidden",
    "false"
  );


  everydayNotesBackdrop.setAttribute(
    "aria-hidden",
    "false"
  );


  everydayNotesToggle.setAttribute(
    "aria-expanded",
    "true"
  );


  page.classList.add(
    "notes-open"
  );
}


function closeEverydayNotes() {
  everydayNotesPanel.classList.remove(
    "is-open"
  );


  everydayNotesBackdrop.classList.remove(
    "is-visible"
  );


  everydayNotesPanel.setAttribute(
    "aria-hidden",
    "true"
  );


  everydayNotesBackdrop.setAttribute(
    "aria-hidden",
    "true"
  );


  everydayNotesToggle.setAttribute(
    "aria-expanded",
    "false"
  );


  page.classList.remove(
    "notes-open"
  );
}


if (
  everydayNotesToggle &&
  everydayNotesPanel
) {
  everydayNotesToggle.addEventListener(
    "click",
    openEverydayNotes
  );


  everydayCloseNotes.addEventListener(
    "click",
    closeEverydayNotes
  );


  everydayNotesBackdrop.addEventListener(
    "click",
    closeEverydayNotes
  );


  window.addEventListener(
    "keydown",
    function (
      event
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        closeEverydayNotes();
      }
    }
  );
}


/* ==========================================
   AMBIANCE SONORE GÉNÉRÉE

   Aucun fichier audio supplémentaire
   n’est nécessaire.
========================================== */

let everydayAudioContext =
  null;


let everydayMasterGain =
  null;


let everydaySoundEnabled =
  false;


let everydayTickTimer =
  null;


/* ==========================================
   CRÉER L’AMBIANCE
========================================== */

function createEverydaySoundscape() {
  if (
    everydayAudioContext
  ) {
    return;
  }


  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;


  if (
    !AudioContextClass
  ) {
    everydaySoundLabel.textContent =
      "SOUND UNAVAILABLE";


    everydaySoundToggle.disabled =
      true;


    return;
  }


  everydayAudioContext =
    new AudioContextClass();


  everydayMasterGain =
    everydayAudioContext.createGain();


  everydayMasterGain.gain.value =
    0;


  everydayMasterGain.connect(
    everydayAudioContext.destination
  );


  /*
   * Souffle très discret du couloir.
   */

  const noiseDuration =
    2;


  const noiseBuffer =
    everydayAudioContext.createBuffer(
      1,
      everydayAudioContext.sampleRate *
      noiseDuration,
      everydayAudioContext.sampleRate
    );


  const noiseData =
    noiseBuffer.getChannelData(
      0
    );


  for (
    let index = 0;
    index < noiseData.length;
    index++
  ) {
    noiseData[index] =
      Math.random() *
      2 -
      1;
  }


  const noiseSource =
    everydayAudioContext.createBufferSource();


  const noiseFilter =
    everydayAudioContext.createBiquadFilter();


  const noiseGain =
    everydayAudioContext.createGain();


  noiseSource.buffer =
    noiseBuffer;


  noiseSource.loop =
    true;


  noiseFilter.type =
    "lowpass";


  noiseFilter.frequency.value =
    520;


  noiseGain.gain.value =
    0.018;


  noiseSource.connect(
    noiseFilter
  );


  noiseFilter.connect(
    noiseGain
  );


  noiseGain.connect(
    everydayMasterGain
  );


  noiseSource.start();


  /*
   * Ronronnement électrique très bas.
   */

  const lowHum =
    everydayAudioContext.createOscillator();


  const lowHumGain =
    everydayAudioContext.createGain();


  lowHum.type =
    "sine";


  lowHum.frequency.value =
    48;


  lowHumGain.gain.value =
    0.017;


  lowHum.connect(
    lowHumGain
  );


  lowHumGain.connect(
    everydayMasterGain
  );


  lowHum.start();


  /*
   * Seconde fréquence donnant une sensation
   * légèrement instable.
   */

  const unstableHum =
    everydayAudioContext.createOscillator();


  const unstableGain =
    everydayAudioContext.createGain();


  unstableHum.type =
    "triangle";


  unstableHum.frequency.value =
    93;


  unstableGain.gain.value =
    0.004;


  unstableHum.connect(
    unstableGain
  );


  unstableGain.connect(
    everydayMasterGain
  );


  unstableHum.start();
}


/* ==========================================
   TIC-TAC IMPOSSIBLE
========================================== */

function playEverydayTick() {
  if (
    !everydaySoundEnabled ||
    !everydayAudioContext ||
    everydayAudioContext.state !==
    "running"
  ) {
    return;
  }


  const now =
    everydayAudioContext.currentTime;


  const tick =
    everydayAudioContext.createOscillator();


  const tickGain =
    everydayAudioContext.createGain();


  tick.type =
    "sine";


  tick.frequency.setValueAtTime(
    1050,
    now
  );


  tick.frequency.exponentialRampToValueAtTime(
    420,
    now +
    0.045
  );


  tickGain.gain.setValueAtTime(
    0.0001,
    now
  );


  tickGain.gain.exponentialRampToValueAtTime(
    0.026,
    now +
    0.006
  );


  tickGain.gain.exponentialRampToValueAtTime(
    0.0001,
    now +
    0.065
  );


  tick.connect(
    tickGain
  );


  tickGain.connect(
    everydayMasterGain
  );


  tick.start(
    now
  );


  tick.stop(
    now +
    0.08
  );
}


/* ==========================================
   RYTHME DU TIC-TAC
========================================== */

function scheduleEverydayTick() {
  window.clearTimeout(
    everydayTickTimer
  );


  if (
    !everydaySoundEnabled
  ) {
    return;
  }


  playEverydayTick();


  let delay =
    1650;


  /*
   * Le rythme devient moins fiable
   * au fur et à mesure du rêve.
   */

  if (
    currentPhase >=
    3
  ) {
    delay =
      980 +
      Math.random() *
      420;
  }


  if (
    currentPhase >=
    5
  ) {
    delay =
      540 +
      Math.random() *
      620;
  }


  everydayTickTimer =
    window.setTimeout(
      scheduleEverydayTick,
      delay
    );
}


/* ==========================================
   ACTIVER LE SON
========================================== */

async function enableEverydaySound() {
  createEverydaySoundscape();


  if (
    !everydayAudioContext ||
    !everydayMasterGain
  ) {
    return;
  }


  try {
    await everydayAudioContext.resume();
  } catch (
    error
  ) {
    console.warn(
      "Everyday sound could not resume:",
      error
    );


    everydaySoundLabel.textContent =
      "TRY SOUND AGAIN";


    return;
  }


  everydaySoundEnabled =
    true;


  localStorage.setItem(
    "museumSound",
    "on"
  );


  const now =
    everydayAudioContext.currentTime;


  everydayMasterGain.gain.cancelScheduledValues(
    now
  );


  everydayMasterGain.gain.setValueAtTime(
    everydayMasterGain.gain.value,
    now
  );


  everydayMasterGain.gain.linearRampToValueAtTime(
    0.78,
    now +
    1.1
  );


  everydaySoundToggle.classList.add(
    "is-on"
  );


  everydaySoundToggle.setAttribute(
    "aria-pressed",
    "true"
  );


  everydaySoundLabel.textContent =
    "SOUND ON";


  scheduleEverydayTick();
}


/* ==========================================
   COUPER LE SON
========================================== */

function disableEverydaySound() {
  everydaySoundEnabled =
    false;


  localStorage.setItem(
    "museumSound",
    "off"
  );


  window.clearTimeout(
    everydayTickTimer
  );


  if (
    everydayAudioContext &&
    everydayMasterGain
  ) {
    const now =
      everydayAudioContext.currentTime;


    everydayMasterGain.gain.cancelScheduledValues(
      now
    );


    everydayMasterGain.gain.setValueAtTime(
      everydayMasterGain.gain.value,
      now
    );


    everydayMasterGain.gain.linearRampToValueAtTime(
      0,
      now +
      0.45
    );


    window.setTimeout(
      function () {
        if (
          !everydaySoundEnabled &&
          everydayAudioContext
        ) {
          everydayAudioContext.suspend();
        }
      },
      520
    );
  }


  everydaySoundToggle.classList.remove(
    "is-on"
  );


  everydaySoundToggle.setAttribute(
    "aria-pressed",
    "false"
  );


  everydaySoundLabel.textContent =
    "ENABLE SOUND";
}


/* ==========================================
   BOUTON SON
========================================== */

if (
  everydaySoundToggle
) {
  /*
   * Même si le son était activé dans une
   * salle précédente, un clic reste proposé
   * afin de respecter les règles du navigateur.
   */

  if (
    localStorage.getItem(
      "museumSound"
    ) ===
    "on"
  ) {
    everydaySoundLabel.textContent =
      "RESUME SOUND";
  }


  everydaySoundToggle.addEventListener(
    "click",
    function () {
      if (
        everydaySoundEnabled
      ) {
        disableEverydaySound();
      } else {
        enableEverydaySound();
      }
    }
  );
}
