/* ==========================================
   THE MUSEUM OF DREAMS
   ROOM 02 — CHILDHOOD
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
    ".childhood-page"
  );


const sentence =
  document.querySelector(
    "#childhood-sentence"
  );


const label =
  document.querySelector(
    "#childhood-label"
  );


const researchNote =
  document.querySelector(
    "#research-note"
  );


const progressFill =
  document.querySelector(
    "#childhood-progress-fill"
  );


const instruction =
  document.querySelector(
    "#childhood-instruction"
  );


const enterAdventure =
  document.querySelector(
    "#enter-adventure"
  );


const compositeNumber =
  document.querySelector(
    "#composite-number"
  );


const compositeTitle =
  document.querySelector(
    "#composite-title"
  );


const memorySource =
  document.querySelector(
    "#memory-source"
  );


const emotionalCore =
  document.querySelector(
    "#emotional-core"
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
      "The house remembers you smaller <em>than you remember yourself.</em>",

    dream: null
  },

  {
    start: 0.23,

    text:
      "The room was never this big. <em>But perhaps you were this small.</em>",

    dream: {
      number:
        "COMPOSITE DREAM 01",

      title:
        "THE HOUSE WITHOUT MEASURE",

      source:
        "HOME",

      emotion:
        "BELONGING"
    }
  },

  {
    start: 0.39,

    text:
      "Before the dream became a story, <em>it was a presence.</em>",

    dream: {
      number:
        "COMPOSITE DREAM 02",

      title:
        "THE ANIMAL THAT KNEW YOU",

      source:
        "IMAGINATION",

      emotion:
        "WONDER"
    }
  },

  {
    start: 0.55,

    text:
      "You cannot remember the words. <em>Only the feeling of being called.</em>",

    dream: {
      number:
        "COMPOSITE DREAM 03",

      title:
        "THE VOICE BEHIND THE DOOR",

      source:
        "A FAMILIAR VOICE",

      emotion:
        "LONGING"
    }
  },

  {
    start: 0.7,

    text:
      "Dreams rarely return a memory intact. <em>They keep what mattered. And move everything else.</em>",

    dream: null
  },

  {
    start: 0.84,

    text: "",

    dream: null
  },

  {
    start: 0.95,

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


let memoryEnergy =
  0;


/* ==========================================
   CARTEL DU RÊVE
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
        compositeNumber.textContent =
          dream.number;


        compositeTitle.textContent =
          dream.title;


        memorySource.textContent =
          dream.source;


        emotionalCore.textContent =
          dream.emotion;


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


  /*
   * Ajouter la nouvelle phase.
   */

  page.classList.add(
    "phase-" +
    index
  );


  /*
   * Mettre à jour le cartel.
   */

  updateLabel(
    phases[
      index
    ].dream
  );


  /*
   * Afficher la note scientifique
   * pendant la recombinaison des souvenirs.
   */

  researchNote.classList.toggle(
    "visible",
    index === 5
  );


  window.clearTimeout(
    sentenceTimer
  );


  /*
   * Certaines phases utilisent une section
   * spéciale et masquent la narration.
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

function updateChildhood() {
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


  let selected =
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
        selected =
          index;
      }
    }
  );


  changePhase(
    selected
  );


  /*
   * Envoyer la progression au CSS.
   */

  page.style.setProperty(
    "--journey",
    progress
  );


  /*
   * Zoom lent dans la chambre.
   */

  page.style.setProperty(
    "--room-scale",
    1 +
    progress *
    0.14
  );


  /*
   * Barre de progression.
   */

  progressFill.style.height =
    progress *
    100 +
    "%";


  /*
   * Masquer l’instruction après
   * le début du scroll.
   */

  instruction.style.opacity =
    progress > 0.04
      ? "0"
      : "0.58";


  /*
   * Énergie des particules.
   */

  memoryEnergy =
    range(
      progress,
      0.12,
      0.82
    );


  ticking =
    false;
}


/* ==========================================
   OPTIMISATION DU SCROLL
========================================== */

function requestUpdate() {
  if (
    ticking
  ) {
    return;
  }


  ticking =
    true;


  window.requestAnimationFrame(
    updateChildhood
  );
}


window.addEventListener(
  "scroll",
  requestUpdate,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  requestUpdate,
  {
    passive: true
  }
);


/* ==========================================
   LUMIÈRE ET PARALLAXE
========================================== */

window.addEventListener(
  "pointermove",
  function (
    event
  ) {
    const x =
      event.clientX /
      window.innerWidth -
      0.5;


    const y =
      event.clientY /
      window.innerHeight -
      0.5;


    /*
     * Position de la lumière.
     */

    page.style.setProperty(
      "--cursor-x",
      event.clientX +
      "px"
    );


    page.style.setProperty(
      "--cursor-y",
      event.clientY +
      "px"
    );


    /*
     * Mouvement léger du décor.
     */

    page.style.setProperty(
      "--room-x",
      x *
      -8 +
      "px"
    );


    page.style.setProperty(
      "--room-y",
      y *
      -5 +
      "px"
    );
  },
  {
    passive: true
  }
);


/* Première mise à jour */

updateChildhood();


/* ==========================================
   POUSSIÈRE DE MÉMOIRE

   L’animation fonctionne à environ
   24 images par seconde.
========================================== */

function initialiseMemoryDust() {
  const canvas =
    document.querySelector(
      "#memory-dust"
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
        : 30;


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
          1.25,

        speed:
          0.07 +
          Math.random() *
          0.17,

        drift:
          (
            Math.random() -
            0.5
          ) *
          0.13,

        opacity:
          0.15 +
          Math.random() *
          0.5,

        phase:
          Math.random() *
          Math.PI *
          2,

        cool:
          Math.random() <
          0.45
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
     * Limiter l’animation à environ 24 FPS.
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
            memoryEnergy *
            0.7
          );


        particle.x +=
          particle.drift;


        /*
         * Replacer la particule lorsqu’elle
         * sort de l’écran.
         */

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


        /*
         * Certaines particules sont bleues,
         * les autres sont dorées.
         */

        context.fillStyle =
          particle.cool

            ? "rgba(202,216,255," +
              particle.opacity *
              pulse +
              ")"

            : "rgba(255,226,179," +
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
  initialiseMemoryDust();
}

catch (
  error
) {
  console.warn(
    "Memory dust unavailable:",
    error
  );
}


/* ==========================================
   ENTRER DANS ADVENTURE
========================================== */

if (
  enterAdventure
) {
  enterAdventure.addEventListener(
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
            "adventure.html";
        },
        1200
      );
    }
  );
}
