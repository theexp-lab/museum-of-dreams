/* ==========================================
   THE MUSEUM OF DREAMS
   PAGE 02 — THE SLEEPER
========================================== */


/* ==========================================
   OUTILS
========================================== */

function clamp(value, minimum, maximum) {
  return Math.min(
    Math.max(value, minimum),
    maximum
  );
}


function range(progress, start, end) {
  return clamp(
    (progress - start) /
    (end - start),
    0,
    1
  );
}


function smooth(value) {
  return (
    value *
    value *
    (3 - 2 * value)
  );
}


/* ==========================================
   ÉLÉMENTS PRINCIPAUX

   Le scroll est initialisé avant les canvas :
   une erreur graphique ne peut donc plus
   bloquer la narration.
========================================== */

const page =
  document.querySelector(
    ".sleeper-page"
  );


const narration =
  document.querySelector(
    "#narration"
  );


const progressFill =
  document.querySelector(
    "#progress-fill"
  );


const scrollInstruction =
  document.querySelector(
    "#scroll-instruction"
  );


const sleepClock =
  document.querySelector(
    "#sleep-clock"
  );


const sleepStage =
  document.querySelector(
    "#sleep-stage"
  );


const awareness =
  document.querySelector(
    "#awareness"
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
========================================== */

const phrases = [
  {
    start: 0,
    text:
      "When night <em>has fallen…</em>"
  },

  {
    start: 0.15,
    text:
      "the eyes <em>close.</em>"
  },

  {
    start: 0.3,
    text:
      "and the mind <em>begins to wander…</em>"
  },

  {
    start: 0.46,
    text:
      "following no rules, <em>obeying no laws.</em>"
  },

  {
    start: 0.62,
    text:
      "with no beginning <em>and no end.</em>"
  },

  {
    start: 0.77,
    text:
      "it creates…"
  }
];


let currentPhrase = 0;

let phraseTimer = null;

let ticking = false;


/* ==========================================
   CHANGER LA PHRASE
========================================== */

function changePhrase(index) {
  if (
    index === currentPhrase
  ) {
    return;
  }


  currentPhrase = index;


  window.clearTimeout(
    phraseTimer
  );


  narration.classList.add(
    "is-changing"
  );


  phraseTimer =
    window.setTimeout(
      function () {
        narration.innerHTML =
          phrases[index].text;


        narration.classList.remove(
          "is-changing"
        );
      },
      320
    );
}


/* ==========================================
   MISE À JOUR DU STORYTELLING
========================================== */

function updateStory() {
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


  /* Phrase actuelle */

  let selectedPhrase = 0;


  for (
    let index = 0;
    index < phrases.length;
    index++
  ) {
    if (
      progress >=
      phrases[index].start
    ) {
      selectedPhrase = index;
    }
  }


  changePhrase(
    selectedPhrase
  );


  /* Fermeture des yeux */

  const eyeMovement =
  smooth(
    range(
      progress,
      0.13,
      0.22
    )
  );


  /* Apparition du cerveau */

  const brainOpacity =
    smooth(
      range(
        progress,
        0.29,
        0.7
      )
    );


  const brainGlow =
    smooth(
      range(
        progress,
        0.35,
        0.82
      )
    );


  /* Effacement progressif du portrait */

  const portraitFade =
    range(
      progress,
      0.7,
      0.94
    );


  const portraitOpacity =
    1 -
    portraitFade *
    0.83;


  const portraitScale =
    1 +
    range(
      progress,
      0.2,
      0.88
    ) *
    0.075;


  /* Révélation finale */

  const finalOpacity =
    smooth(
      range(
        progress,
        0.86,
        0.97
      )
    );


  page.style.setProperty(
    "--eyes-closed",
    eyeMovement
  );


  page.style.setProperty(
    "--brain-opacity",
    brainOpacity
  );


  page.style.setProperty(
    "--brain-glow",
    brainGlow
  );


  page.style.setProperty(
    "--portrait-opacity",
    portraitOpacity
  );


  page.style.setProperty(
    "--portrait-scale",
    portraitScale
  );


  page.style.setProperty(
    "--final-opacity",
    finalOpacity
  );


  /* État final */

  if (
    progress >= 0.86
  ) {
    page.classList.add(
      "final-active"
    );


    narration.classList.add(
      "is-hidden"
    );
  } else {
    page.classList.remove(
      "final-active"
    );


    narration.classList.remove(
      "is-hidden"
    );
  }


  /* Barre de progression */

  progressFill.style.height =
    progress *
    100 +
    "%";


  /* Indication de scroll */

  scrollInstruction.style.opacity =
    progress > 0.04
      ? "0"
      : "0.48";


  /* Données */

  const awarenessValue =
    Math.round(
      100 -
      range(
        progress,
        0.05,
        0.72
      ) *
      100
    );


  awareness.textContent =
    awarenessValue +
    "%";


  if (
    progress < 0.15
  ) {
    sleepStage.textContent =
      "WAKEFULNESS";


    neuralStatus.textContent =
      "BASELINE";
  } else if (
    progress < 0.44
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


  const minutes =
    47 +
    Math.floor(
      progress *
      8
    );


  sleepClock.textContent =
    "23:" +
    String(minutes).padStart(
      2,
      "0"
    );


  /*
   * Variable indépendante utilisée
   * uniquement par le cerveau.
   */

  window.brainEnergy =
    brainGlow;


  ticking = false;
}


/* ==========================================
   ÉCOUTE DU SCROLL
========================================== */

function requestStoryUpdate() {
  if (ticking) {
    return;
  }


  ticking = true;


  window.requestAnimationFrame(
    updateStory
  );
}


window.addEventListener(
  "scroll",
  requestStoryUpdate,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  requestStoryUpdate,
  {
    passive: true
  }
);


/* Lancer immédiatement le storytelling */

updateStory();


/* ==========================================
   ÉTOILES

   Ce bloc est indépendant du scroll.
========================================== */

function initialiseStars() {
  const canvas =
    document.querySelector(
      "#stars"
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


  let width = 0;

  let height = 0;

  let stars = [];


  function resize() {
    const ratio =
      Math.min(
  window.devicePixelRatio || 1,
  1.25
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


    stars = [];


    const total =
  width < 700
    ? 140
    : 320;

    for (
      let index = 0;
      index < total;
      index++
    ) {
      stars.push({
        x:
          Math.random() *
          width,

        y:
          Math.random() *
          height,

        radius:
          0.25 +
          Math.random() *
          1.35,

        opacity:
          0.2 +
          Math.random() *
          0.8,

        speed:
          0.5 +
          Math.random() *
          1.8,

        phase:
          Math.random() *
          Math.PI *
          2
      });
    }
  }


  function draw(time) {
    context.clearRect(
      0,
      0,
      width,
      height
    );


    for (
      const star of stars
    ) {
      const pulse =
        0.7 +
        Math.sin(
          time *
          0.001 *
          star.speed +
          star.phase
        ) *
        0.3;


      context.beginPath();


      context.arc(
        star.x,
        star.y,
        star.radius,
        0,
        Math.PI * 2
      );


      context.fillStyle =
        "rgba(242,238,255," +
        star.opacity *
        pulse +
        ")";


      context.fill();
    }


    window.requestAnimationFrame(
      draw
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
   CERVEAU FÉÉRIQUE

   Poussière magique, étoiles, spirales
   et floraisons lumineuses.

   Aucun trait neuronal.
========================================== */

function initialiseBrain() {
  const canvas =
    document.querySelector(
      "#brain"
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


  let width = 0;

  let height = 0;

  let centerX = 0;

  let centerY = 0;

  let radiusX = 0;

  let radiusY = 0;

  let fairies = [];

  let blossoms = [];

  let previousBlossom = 0;


  /* Couleurs magiques */

  const colours = [
    {
      red: 226,
      green: 207,
      blue: 255
    },

    {
      red: 185,
      green: 151,
      blue: 255
    },

    {
      red: 255,
      green: 213,
      blue: 242
    },

    {
      red: 255,
      green: 236,
      blue: 181
    },

    {
      red: 170,
      green: 218,
      blue: 255
    }
  ];


  /* ==========================================
     CRÉER LA POUSSIÈRE MAGIQUE
  ========================================== */

  function createFairies() {
    fairies = [];


    const total =
  width < 700
    ? 55
    : 105;


    for (
      let index = 0;
      index < total;
      index++
    ) {
      const colour =
        colours[
          Math.floor(
            Math.random() *
            colours.length
          )
        ];


      fairies.push({
        angle:
          Math.random() *
          Math.PI *
          2,

        distance:
          Math.sqrt(
            Math.random()
          ),

        heightPosition:
          (
            Math.random() -
            0.5
          ),

        size:
          0.45 +
          Math.random() *
          2.2,

        glow:
          3 +
          Math.random() *
          11,

        opacity:
          0.24 +
          Math.random() *
          0.72,

        speed:
          0.12 +
          Math.random() *
          0.38,

        pulseSpeed:
          0.8 +
          Math.random() *
          2.8,

        phase:
          Math.random() *
          Math.PI *
          2,

        lift:
          Math.random() *
          22,

        star:
          Math.random() <
          0.13,

        colour: colour
      });
    }
  }


  /* ==========================================
     REDIMENSIONNEMENT
  ========================================== */

  function resize() {
    const ratio =
      Math.min(
  window.devicePixelRatio || 1,
  1.25
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


    /*
     * Position du cerveau dans le haut
     * du crâne du nouveau PNG.
     */

    centerX =
      width *
      0.5;


    centerY =
      height *
      (
        width < 700
          ? 0.19
          : 0.165
      );


    radiusX =
      Math.min(
        width *
        (
          width < 700
            ? 0.21
            : 0.125
        ),
        205
      );


    radiusY =
      Math.min(
        height *
        0.09,
        100
      );


    createFairies();
  }


  /* ==========================================
     PETITE FLORAISON LUMINEUSE
  ========================================== */

  function createBlossom() {
    const energy =
      window.brainEnergy || 0;

     if (
  blossoms.length >= 6
) {
  return;
}

    if (
      energy < 0.16
    ) {
      return;
    }


    const angle =
      Math.random() *
      Math.PI *
      2;


    const distance =
      Math.sqrt(
        Math.random()
      );


    const colour =
      colours[
        Math.floor(
          Math.random() *
          colours.length
        )
      ];


    blossoms.push({
      x:
        centerX +
        Math.cos(angle) *
        radiusX *
        distance,

      y:
        centerY +
        Math.sin(angle) *
        radiusY *
        distance,

      radius:
        1.5,

      opacity:
        0.65 +
        energy *
        0.3,

      rotation:
        Math.random() *
        Math.PI,

      petals:
        5 +
        Math.floor(
          Math.random() *
          4
        ),

      colour: colour
    });
  }


  /* ==========================================
     DESSINER UNE ÉTOILE FÉÉRIQUE
  ========================================== */

  function drawFairyStar(
    x,
    y,
    size,
    opacity,
    colour
  ) {
    const colourString =
      colour.red +
      "," +
      colour.green +
      "," +
      colour.blue;


    context.save();


    context.translate(
      x,
      y
    );


    context.beginPath();


    context.moveTo(
      0,
      -size * 3.8
    );


    context.quadraticCurveTo(
      size * 0.4,
      -size * 0.4,
      size * 3.8,
      0
    );


    context.quadraticCurveTo(
      size * 0.4,
      size * 0.4,
      0,
      size * 3.8
    );


    context.quadraticCurveTo(
      -size * 0.4,
      size * 0.4,
      -size * 3.8,
      0
    );


    context.quadraticCurveTo(
      -size * 0.4,
      -size * 0.4,
      0,
      -size * 3.8
    );


    context.fillStyle =
      "rgba(" +
      colourString +
      "," +
      opacity +
      ")";


    


    context.shadowBlur =
      size *
      5;


    context.fill();


    context.restore();
  }


  /* ==========================================
     ANIMATION
  ========================================== */

  function draw(time) {
    const energy =
      window.brainEnergy || 0;


    context.clearRect(
      0,
      0,
      width,
      height
    );


    context.save();


    context.globalCompositeOperation =
      "lighter";


    /*
     * Brume lumineuse douce
     * au centre du cerveau.
     */

    if (
      energy >
      0.02
    ) {
      const haze =
        context.createRadialGradient(
          centerX,
          centerY,
          0,

          centerX,
          centerY,
          radiusX *
          1.18
        );


      haze.addColorStop(
        0,
        "rgba(222,200,255," +
        energy *
        0.13 +
        ")"
      );


      haze.addColorStop(
        0.48,
        "rgba(144,111,255," +
        energy *
        0.075 +
        ")"
      );


      haze.addColorStop(
        1,
        "rgba(74,50,175,0)"
      );


      context.fillStyle =
        haze;


      context.beginPath();


      context.ellipse(
        centerX,
        centerY,
        radiusX *
        1.22,
        radiusY *
        1.3,
        0,
        0,
        Math.PI *
        2
      );


      context.fill();
    }


    /*
     * Poussière orbitale.
     */

    for (
      const fairy of fairies
    ) {
      const orbit =
        fairy.angle +
        time *
        0.0001 *
        fairy.speed *
        (
          1 +
          energy *
          2.8
        );


      const breathing =
        0.88 +
        Math.sin(
          time *
          0.0007 +
          fairy.phase
        ) *
        0.12;


      const pulse =
        0.55 +
        Math.sin(
          time *
          0.002 *
          fairy.pulseSpeed +
          fairy.phase
        ) *
        0.45;


      /*
       * Plus le rêve se forme,
       * plus certaines particules
       * s’élèvent hors du cerveau.
       */

      const rising =
        energy >
        0.62

          ? (
              energy -
              0.62
            ) *
            fairy.lift *
            Math.sin(
              time *
              0.0005 +
              fairy.phase
            )

          : 0;


      const x =
        centerX +
        Math.cos(orbit) *
        radiusX *
        fairy.distance *
        breathing;


      const y =
        centerY +
        Math.sin(orbit) *
        radiusY *
        fairy.distance +

        fairy.heightPosition *
        10 -

        rising;


      const opacity =
        fairy.opacity *
        pulse *
        (
          0.25 +
          energy *
          0.75
        );


      const colourString =
        fairy.colour.red +
        "," +
        fairy.colour.green +
        "," +
        fairy.colour.blue;


      if (
        fairy.star &&
        pulse >
        0.76
      ) {
        drawFairyStar(
          x,
          y,
          fairy.size,
          opacity,
          fairy.colour
        );
      } else {
        context.beginPath();


        context.arc(
          x,
          y,
          fairy.size *
          (
            0.65 +
            pulse *
            0.55
          ),
          0,
          Math.PI *
          2
        );


        context.fillStyle =
          "rgba(" +
          colourString +
          "," +
          opacity +
          ")";


        context.shadowColor =
          "rgba(" +
          colourString +
          ",0.85)";


        


        context.fill();
      }
    }


    /*
     * Créer les floraisons.
     */

    const blossomDelay =
      1150 -
      energy *
      920;


    if (
      time -
      previousBlossom >
      blossomDelay
    ) {
      createBlossom();


      previousBlossom =
        time;
    }


    /*
     * Dessiner les floraisons
     * comme de petites fleurs de lumière.
     */

    for (
      const blossom of blossoms
    ) {
      blossom.radius +=
        0.42 +
        energy *
        0.85;


      blossom.opacity *=
        0.955;


      blossom.rotation +=
        0.012;


      const colourString =
        blossom.colour.red +
        "," +
        blossom.colour.green +
        "," +
        blossom.colour.blue;


      context.save();


      context.translate(
        blossom.x,
        blossom.y
      );


      context.rotate(
        blossom.rotation
      );


      for (
        let petal = 0;
        petal < blossom.petals;
        petal++
      ) {
        const angle =
          (
            Math.PI *
            2 /
            blossom.petals
          ) *
          petal;


        context.beginPath();


        context.ellipse(
          Math.cos(angle) *
          blossom.radius *
          0.55,

          Math.sin(angle) *
          blossom.radius *
          0.55,

          blossom.radius *
          0.58,

          blossom.radius *
          0.18,

          angle,

          0,

          Math.PI *
          2
        );


        context.fillStyle =
          "rgba(" +
          colourString +
          "," +
          blossom.opacity *
          0.42 +
          ")";


        context.fill();
      }


      context.beginPath();


      context.arc(
        0,
        0,
        Math.max(
          1.2,
          blossom.radius *
          0.12
        ),
        0,
        Math.PI *
        2
      );


      context.fillStyle =
        "rgba(255,248,218," +
        blossom.opacity +
        ")";


      context.shadowColor =
        "rgba(" +
        colourString +
        ",1)";


      context.shadowBlur =
        18;


      context.fill();


      context.restore();
    }


    blossoms =
      blossoms.filter(
        function (blossom) {
          return (
            blossom.opacity >
            0.025
          );
        }
      );


    context.restore();


    window.requestAnimationFrame(
      draw
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


/*
 * Chaque effet est protégé séparément.
 * Même s’il échoue, le scroll continue.
 */

try {
  initialiseStars();
} catch (error) {
  console.warn(
    "Star animation unavailable:",
    error
  );
}


try {
  initialiseBrain();
} catch (error) {
  console.warn(
    "Brain animation unavailable:",
    error
  );
}


/* ==========================================
   ENTRÉE DANS LE CERVEAU
========================================== */

if (enterMind) {
  enterMind.addEventListener(
    "click",
    function (event) {
      event.preventDefault();


      if (
        page.classList.contains(
          "entering"
        )
      ) {
        return;
      }


      page.classList.add(
        "entering"
      );


      window.setTimeout(
        function () {
          window.location.href =
            "brain.html";
        },
        1350
      );
    }
  );
}
