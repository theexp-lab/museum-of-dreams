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
            "recurring.html";
        },
        1200
      );
    }
  );
}
