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

  /* PHASE 0 — TITRE */

  {
    start: 0,

    text: "",

    dream: null,

    science: null
  },


  /* PHASE 1 — RECONNAÎTRE LA MAISON */

  {
    start: 0.08,

    text:
      "You have been here before. <em>Just not quite like this.</em>",

    dream: null,

    science: null
  },


  /* PHASE 2 — CHANGEMENT D’ÉCHELLE */

  {
    start: 0.18,

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
        "FAMILIARITY"
    },

    science: {
      number:
        "RESEARCH NOTE 02.1",

      text:
        "Dreams rarely reproduce a complete autobiographical event. They more often incorporate selected fragments.",

      principle:
        "FRAGMENT · NOT REPLAY"
    }
  },


  /* PHASE 3 — LE PAPIER PEINT */

  {
    start: 0.29,

    text:
      "The animals on the wallpaper <em>have moved.</em>",

    dream: {
      number:
        "COMPOSITE DREAM 02",

      title:
        "THE ANIMAL ON THE WALL",

      source:
        "IMAGINATION",

      emotion:
        "WONDER"
    },

    science: {
      number:
        "RESEARCH NOTE 02.2",

      text:
        "Animals appear frequently in young children’s dream reports, especially in shorter and less narrative reports.",

      principle:
        "DREAM CONTENT · DEVELOPMENT"
    }
  },


  /* PHASE 4 — L’ANIMAL APPARAÎT */

  {
    start: 0.4,

    text:
      "You are almost certain they were somewhere else before. <em>One of them seems to remember you.</em>",

    dream: {
      number:
        "COMPOSITE DREAM 02",

      title:
        "THE ANIMAL ON THE WALL",

      source:
        "IMAGINATION",

      emotion:
        "WONDER"
    },

    science: {
      number:
        "RESEARCH NOTE 02.2",

      text:
        "Animals appear frequently in young children’s dream reports, especially in shorter and less narrative reports.",

      principle:
        "DREAM CONTENT · DEVELOPMENT"
    }
  },


  /* PHASE 5 — LA VOIX */

  {
    start: 0.51,

    text:
      "Someone is humming <em>in the next room.</em>",

    dream: {
      number:
        "COMPOSITE DREAM 03",

      title:
        "THE VOICE IN THE NEXT ROOM",

      source:
        "A FAMILIAR PERSON",

      emotion:
        "COMFORT"
    },

    science: {
      number:
        "RESEARCH NOTE 02.3",

      text:
        "Emotional intensity and personal significance influence which waking-life elements enter dreams.",

      principle:
        "EMOTION · PERSONAL SALIENCE"
    }
  },


  /* PHASE 6 — LA CHANSON OUBLIÉE */

  {
    start: 0.61,

    text:
      "You cannot remember the song. <em>But somehow, you still know it.</em>",

    dream: {
      number:
        "COMPOSITE DREAM 03",

      title:
        "THE VOICE IN THE NEXT ROOM",

      source:
        "A FAMILIAR PERSON",

      emotion:
        "COMFORT"
    },

    science: {
      number:
        "RESEARCH NOTE 02.3",

      text:
        "Emotional intensity and personal significance influence which waking-life elements enter dreams.",

      principle:
        "EMOTION · PERSONAL SALIENCE"
    }
  },


  /* PHASE 7 — LA MAISON SE MÉLANGE */

  {
    start: 0.71,

    text:
      "The bedroom has borrowed a window from another house. <em>The kitchen has kept your old wallpaper.</em>",

    dream: null,

    science: {
      number:
        "RESEARCH NOTE 02.4",

      text:
        "During dreaming, autobiographical fragments may combine with elements from unrelated memories.",

      principle:
        "RECOMBINATION · HYPERASSOCIATION"
    }
  },


  /* PHASE 8 — PLAN IMPOSSIBLE */

  {
    start: 0.8,

    text:
      "In dreams, <em>no one checks the floor plan.</em>",

    dream: null,

    science: {
      number:
        "RESEARCH NOTE 02.4",

      text:
        "During dreaming, autobiographical fragments may combine with elements from unrelated memories.",

      principle:
        "RECOMBINATION · HYPERASSOCIATION"
    }
  },


  /* PHASE 9 — CONCLUSION */

  {
    start: 0.89,

    text: "",

    dream: null,

    science: null
  },


  /* PHASE 10 — SORTIE */

  {
    start: 0.96,

    text: "",

    dream: null,

    science: null
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
   METTRE À JOUR LA NOTE SCIENTIFIQUE
========================================== */

function updateResearch(
  note
) {
  if (
    !note
  ) {
    researchNote.classList.remove(
      "visible"
    );


    return;
  }


  researchNumber.textContent =
    note.number;


  researchText.textContent =
    note.text;


  researchPrinciple.textContent =
    note.principle;


  researchNote.classList.add(
    "visible"
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
   * Mettre à jour la note scientifique.
   */

  updateResearch(
    phases[
      index
    ].science ||
    null
  );


  window.clearTimeout(
    sentenceTimer
  );


  /*
   * Certaines phases utilisent une section
   * spéciale et masquent le texte central.
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
   * Progression envoyée au CSS.
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
   * Masquer l’instruction
   * après le début du scroll.
   */

  instruction.style.opacity =
    progress > 0.04
      ? "0"
      : "0.58";


  /*
   * Intensité des particules.
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
     * Lumière qui suit le curseur.
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
     * Déplacement léger de la chambre.
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

   Animation limitée à environ 24 FPS.
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
