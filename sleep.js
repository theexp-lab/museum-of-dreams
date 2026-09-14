/* ==========================================
   THE MUSEUM OF DREAMS
   PAGE 02 — THE SLEEPER
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

const sleeperPage =
  document.querySelector(
    ".sleeper-page"
  );


const narration =
  document.querySelector(
    "#narration"
  );


const revelation =
  document.querySelector(
    "#dream-revelation"
  );


const progressFill =
  document.querySelector(
    "#scroll-progress-fill"
  );


const sleepClock =
  document.querySelector(
    "#sleep-clock"
  );


const sleepStage =
  document.querySelector(
    "#sleep-stage"
  );


const awarenessValue =
  document.querySelector(
    "#awareness-value"
  );


const neuralStatus =
  document.querySelector(
    "#neural-status"
  );


const enterMind =
  document.querySelector(
    "#enter-mind"
  );


/* ==========================================
   PHRASES

   Une seule phrase est injectée à la fois.
========================================== */

const narrationSteps = [
  {
    start: 0,
    text:
      "When night <em>has fallen…</em>"
  },

  {
    start: 0.16,
    text:
      "the eyes <em>close.</em>"
  },

  {
    start: 0.31,
    text:
      "and the mind <em>begins to wander…</em>"
  },

  {
    start: 0.47,
    text:
      "following no rules, <em>obeying no laws.</em>"
  },

  {
    start: 0.63,
    text:
      "with no beginning <em>and no end.</em>"
  },

  {
    start: 0.78,
    text:
      "it creates…"
  }
];


let currentNarrationIndex =
  -1;


let narrationTimeout;


/* ==========================================
   CHANGER UNE PHRASE SANS CHEVAUCHEMENT
========================================== */

function displayNarration(
  newIndex
) {
  if (
    newIndex ===
    currentNarrationIndex
  ) {
    return;
  }


  currentNarrationIndex =
    newIndex;


  window.clearTimeout(
    narrationTimeout
  );


  narration.classList.add(
    "changing"
  );


  narrationTimeout =
    window.setTimeout(
      function () {
        narration.innerHTML =
          narrationSteps[
            newIndex
          ].text;


        narration.classList.remove(
          "changing"
        );
      },
      440
    );
}


/* ==========================================
   MISE À JOUR DU SCROLL
========================================== */

function updateSleeper() {
  const maximumScroll =
    document.documentElement.scrollHeight -
    window.innerHeight;


  const progress =
    maximumScroll > 0
      ? clamp(
          window.scrollY /
          maximumScroll,
          0,
          1
        )
      : 0;


  /* Trouver la phrase actuelle */

  let newNarrationIndex = 0;


  narrationSteps.forEach(
    function (
      step,
      index
    ) {
      if (
        progress >=
        step.start
      ) {
        newNarrationIndex =
          index;
      }
    }
  );


  displayNarration(
    newNarrationIndex
  );


  /* ==========================================
   FERMETURE NATURELLE DES YEUX

   La transition commence doucement pendant
   la deuxième phrase, puis reste fermée.
========================================== */

const eyeProgress =
  range(
    progress,
    0.135,
    0.285
  );


/*
 * Courbe douce :
 * évite une fermeture droite et mécanique.
 */

/* ==========================================
   FERMETURE PROGRESSIVE DES YEUX
========================================== */

const eyeProgress =
  range(
    progress,
    0.135,
    0.285
  );


const eyesClosed =
  eyeProgress *
  eyeProgress *
  (
    3 -
    2 *
    eyeProgress
  );


/* Apparition du cerveau */


  const brainOpacity =
    range(
      progress,
      0.3,
      0.69
    );


  /* Disparition du visage */

  const faceDisappearance =
    range(
      progress,
      0.67,
      0.91
    );


  const faceOpacity =
    1 -
    faceDisappearance *
    0.84;


  const faceScale =
    1 +
    range(
      progress,
      0.2,
      0.87
    ) *
    0.12;


  const faceBlur =
    range(
      progress,
      0.76,
      0.94
    ) *
    4;


  const brainIntensity =
    range(
      progress,
      0.38,
      0.86
    );


  const revelationOpacity =
    range(
      progress,
      0.86,
      0.97
    );


  /* Envoyer les valeurs au CSS */

  sleeperPage.style.setProperty(
  "--eyes-closed",
  eyesClosed
);


  sleeperPage.style.setProperty(
    "--brain-opacity",
    brainOpacity
  );


  sleeperPage.style.setProperty(
    "--brain-intensity",
    brainIntensity
  );


  sleeperPage.style.setProperty(
    "--face-opacity",
    faceOpacity
  );


  sleeperPage.style.setProperty(
    "--face-scale",
    faceScale
  );


  sleeperPage.style.setProperty(
    "--face-blur",
    faceBlur + "px"
  );


  sleeperPage.style.setProperty(
    "--revelation-opacity",
    revelationOpacity
  );


  /* Révélation finale */

  if (
    progress > 0.86
  ) {
    sleeperPage.classList.add(
      "revelation-active"
    );

    narration.style.visibility =
      "hidden";
  } else {
    sleeperPage.classList.remove(
      "revelation-active"
    );

    narration.style.visibility =
      "visible";
  }


  /* Progression verticale */

  progressFill.style.height =
    progress *
    100 +
    "%";


  /* Informations du laboratoire */

  const awareness =
    Math.max(
      0,
      Math.round(
        100 -
        range(
          progress,
          0.06,
          0.72
        ) *
        100
      )
    );


  awarenessValue.textContent =
    awareness +
    "%";


  if (
    progress < 0.15
  ) {
    sleepStage.textContent =
      "WAKEFULNESS";

    neuralStatus.textContent =
      "BASELINE";
  } else if (
    progress < 0.43
  ) {
    sleepStage.textContent =
      "N1 · HYPNAGOGIA";

    neuralStatus.textContent =
      "RISING";
  } else if (
    progress < 0.78
  ) {
    sleepStage.textContent =
      "LIGHT SLEEP";

    neuralStatus.textContent =
      "WANDERING";
  } else {
    sleepStage.textContent =
      "DREAM STATE";

    neuralStatus.textContent =
      "UNRESTRICTED";
  }


  const elapsedMinutes =
    Math.floor(
      progress *
      8
    );


  sleepClock.textContent =
    "23:" +
    String(
      47 +
      elapsedMinutes
    ).padStart(
      2,
      "0"
    );


  brainEnergy =
    brainIntensity;
}


/* ==========================================
   ÉTOILES DE FOND
========================================== */

const starCanvas =
  document.querySelector(
    "#star-canvas"
  );


const starContext =
  starCanvas.getContext(
    "2d"
  );


let starWidth = 0;

let starHeight = 0;

let stars = [];


let pointerX = 0;

let pointerY = 0;

let pointerTargetX = 0;

let pointerTargetY = 0;


/* Créer les étoiles */

function createStars() {
  stars = [];


  const starCount =
    window.innerWidth < 700
      ? 650
      : 1400;


  for (
    let index = 0;
    index < starCount;
    index++
  ) {
    const milkyStar =
      Math.random() < 0.58;


    const x =
      Math.random() *
      starWidth;


    let y;


    if (milkyStar) {
      const band =
        starHeight *
        0.73 +

        (
          x /
          starWidth -
          0.5
        ) *

        starHeight *
        0.14;


      y =
        band +

        (
          Math.random() -
          0.5
        ) *

        starHeight *
        0.17;
    } else {
      y =
        Math.random() *
        starHeight;
    }


    stars.push({
      x: x,
      y: y,

      radius:
        0.25 +
        Math.random() *
        1.35,

      opacity:
        0.2 +
        Math.random() *
        0.8,

      speed:
        0.4 +
        Math.random() *
        1.7,

      offset:
        Math.random() *
        Math.PI *
        2,

      depth:
        0.2 +
        Math.random() *
        0.8,

      milky:
        milkyStar
    });
  }
}


/* Redimensionner le canvas */

function resizeStars() {
  const pixelRatio =
    Math.min(
      window.devicePixelRatio,
      2
    );


  starWidth =
    window.innerWidth;


  starHeight =
    window.innerHeight;


  starCanvas.width =
    starWidth *
    pixelRatio;


  starCanvas.height =
    starHeight *
    pixelRatio;


  starContext.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );


  createStars();
}


/* ==========================================
   CERVEAU DE PARTICULES
========================================== */

const brainCanvas =
  document.querySelector(
    "#brain-canvas"
  );


const brainContext =
  brainCanvas.getContext(
    "2d"
  );


let brainWidth = 0;

let brainHeight = 0;

let brainParticles = [];

let brainBursts = [];

let brainEnergy = 0;


/* Créer le volume du cerveau */

function createBrain() {
  brainParticles = [];


  const particleCount =
    window.innerWidth < 700
      ? 310
      : 560;


  for (
    let index = 0;
    index < particleCount;
    index++
  ) {
    const side =
      Math.random() < 0.5
        ? -1
        : 1;


    const angle =
      Math.random() *
      Math.PI *
      2;


    const radius =
      Math.sqrt(
        Math.random()
      );


    const centerX =
      brainWidth *
      (
        side < 0
          ? 0.38
          : 0.62
      );


    brainParticles.push({
      x:
        centerX +

        Math.cos(angle) *
        radius *
        brainWidth *
        0.27,

      y:
        brainHeight *
        0.52 +

        Math.sin(angle) *
        radius *
        brainHeight *
        0.38,

      originX: 0,
      originY: 0,

      radius:
        0.5 +
        Math.random() *
        1.8,

      phase:
        Math.random() *
        Math.PI *
        2,

      speed:
        0.5 +
        Math.random() *
        2,

      brightness:
        0.2 +
        Math.random() *
        0.8
    });
  }


  brainParticles.forEach(
    function (particle) {
      particle.originX =
        particle.x;

      particle.originY =
        particle.y;
    }
  );
}


/* Redimensionner le cerveau */

function resizeBrain() {
  const pixelRatio =
    Math.min(
      window.devicePixelRatio,
      2
    );


  const bounds =
    brainCanvas.getBoundingClientRect();


  brainWidth =
    bounds.width;


  brainHeight =
    bounds.height;


  brainCanvas.width =
    brainWidth *
    pixelRatio;


  brainCanvas.height =
    brainHeight *
    pixelRatio;


  brainContext.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );


  createBrain();
}


/* ==========================================
   MINI-EXPLOSIONS NEURONALES
========================================== */

function createBrainBurst() {
  if (
    brainEnergy < 0.12
  ) {
    return;
  }


  const source =
    brainParticles[
      Math.floor(
        Math.random() *
        brainParticles.length
      )
    ];


  brainBursts.push({
    x: source.x,
    y: source.y,

    radius: 2,

    opacity:
      0.45 +
      brainEnergy *
      0.55,

    growth:
      0.7 +
      brainEnergy *
      2
  });
}


/* ==========================================
   ANIMATION COMPLÈTE
========================================== */

let previousBurstTime = 0;


function animateWorld(
  currentTime
) {
  /* Étoiles */

  starContext.clearRect(
    0,
    0,
    starWidth,
    starHeight
  );


  pointerX +=
    (
      pointerTargetX -
      pointerX
    ) *
    0.025;


  pointerY +=
    (
      pointerTargetY -
      pointerY
    ) *
    0.025;


  stars.forEach(
    function (star) {
      const twinkle =
        0.7 +

        Math.sin(
          currentTime *
          0.001 *
          star.speed +

          star.offset
        ) *

        0.3;


      starContext.beginPath();


      starContext.arc(
        star.x +
        pointerX *
        star.depth,

        star.y +
        pointerY *
        star.depth,

        star.radius,

        0,

        Math.PI *
        2
      );


      starContext.fillStyle =
        star.milky

          ? "rgba(215,205,255," +
            star.opacity *
            twinkle +
            ")"

          : "rgba(255,250,240," +
            star.opacity *
            twinkle +
            ")";


      starContext.fill();
    }
  );


  /* Cerveau */

  brainContext.clearRect(
    0,
    0,
    brainWidth,
    brainHeight
  );


  brainParticles.forEach(
    function (
      particle,
      index
    ) {
      const movement =
        0.6 +
        brainEnergy *
        3.4;


      particle.x =
        particle.originX +

        Math.sin(
          currentTime *
          0.001 *
          particle.speed +

          particle.phase
        ) *

        movement;


      particle.y =
        particle.originY +

        Math.cos(
          currentTime *
          0.0013 *
          particle.speed +

          particle.phase
        ) *

        movement;


      const pulse =
        0.45 +

        Math.sin(
          currentTime *
          0.003 *
          particle.speed +

          particle.phase
        ) *

        0.4;


      const flash =
        Math.random() <
        brainEnergy *
        0.008

          ? 1

          : 0;


      brainContext.beginPath();


      brainContext.arc(
        particle.x,
        particle.y,

        particle.radius +
        flash *
        2.5,

        0,

        Math.PI *
        2
      );


      brainContext.fillStyle =
        "rgba(210,184,255," +

        (
          particle.brightness *
          pulse +
          flash *
          0.65
        ) +

        ")";


      brainContext.fill();


      /*
       * Quelques connexions organiques
       * très courtes apparaissent puis
       * disparaissent. Aucun trait fixe.
       */

      if (
        brainEnergy > 0.35 &&
        index % 11 === 0
      ) {
        const neighbour =
          brainParticles[
            (
              index + 5
            ) %
            brainParticles.length
          ];


        const distance =
          Math.hypot(
            neighbour.x -
            particle.x,

            neighbour.y -
            particle.y
          );


        if (
          distance < 42
        ) {
          brainContext.beginPath();

          brainContext.moveTo(
            particle.x,
            particle.y
          );

          brainContext.quadraticCurveTo(
            (
              particle.x +
              neighbour.x
            ) /
            2 +

            Math.sin(
              currentTime *
              0.002 +
              index
            ) *
            5,

            (
              particle.y +
              neighbour.y
            ) /
            2,

            neighbour.x,
            neighbour.y
          );


          brainContext.strokeStyle =
            "rgba(174,145,255," +

            brainEnergy *
            0.12 +

            ")";


          brainContext.lineWidth =
            0.45;


          brainContext.stroke();
        }
      }
    }
  );


  /* Génération des explosions */

  const burstDelay =
    900 -
    brainEnergy *
    720;


  if (
    currentTime -
    previousBurstTime >
    burstDelay
  ) {
    createBrainBurst();

    previousBurstTime =
      currentTime;
  }


  /* Dessiner les ondes */

  brainBursts.forEach(
    function (burst) {
      burst.radius +=
        burst.growth;


      burst.opacity *=
        0.94;


      brainContext.beginPath();


      brainContext.arc(
        burst.x,
        burst.y,
        burst.radius,
        0,
        Math.PI * 2
      );


      brainContext.strokeStyle =
        "rgba(232,219,255," +
        burst.opacity +
        ")";


      brainContext.lineWidth =
        1.2;


      brainContext.stroke();


      brainContext.beginPath();


      brainContext.arc(
        burst.x,
        burst.y,
        Math.max(
          1,
          burst.radius *
          0.18
        ),
        0,
        Math.PI * 2
      );


      brainContext.fillStyle =
        "rgba(255,249,229," +
        burst.opacity +
        ")";


      brainContext.fill();
    }
  );


  brainBursts =
    brainBursts.filter(
      function (burst) {
        return burst.opacity >
          0.02;
      }
    );


  window.requestAnimationFrame(
    animateWorld
  );
}


/* ==========================================
   SOURIS ET PARALLAXE
========================================== */

window.addEventListener(
  "pointermove",
  function (event) {
    const horizontal =
      event.clientX /
      window.innerWidth -
      0.5;


    const vertical =
      event.clientY /
      window.innerHeight -
      0.5;


    pointerTargetX =
      horizontal *
      15;


    pointerTargetY =
      vertical *
      10;


    sleeperPage.style.setProperty(
      "--pointer-x",
      horizontal *
      9 +
      "px"
    );


    sleeperPage.style.setProperty(
      "--pointer-y",
      vertical *
      7 +
      "px"
    );
  },
  {
    passive: true
  }
);


/* ==========================================
   ENTRER DANS LE CERVEAU
========================================== */

enterMind.addEventListener(
  "click",
  function (event) {
    event.preventDefault();


    if (
      sleeperPage.classList.contains(
        "entering-brain"
      )
    ) {
      return;
    }


    sleeperPage.classList.add(
      "entering-brain"
    );


    window.setTimeout(
      function () {
        window.location.href =
          "brain.html";
      },
      1400
    );
  }
);


/* ==========================================
   INITIALISATION
========================================== */

resizeStars();

resizeBrain();

updateSleeper();


window.requestAnimationFrame(
  animateWorld
);


window.addEventListener(
  "scroll",
  updateSleeper,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  function () {
    resizeStars();

    resizeBrain();

    updateSleeper();
  }
);
