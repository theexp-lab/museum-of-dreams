/* ==========================================
   THE MUSEUM OF DREAMS
   PAGE 01 — NIGHTFALL

   Le scroll transforme progressivement
   le coucher de soleil en nuit étoilée.
========================================== */


/* ==========================================
   OUTILS
========================================== */

function limitValue(
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


/*
 * Transforme une partie du scroll
 * en valeur comprise entre 0 et 1.
 */

function calculateRange(
  progress,
  beginning,
  ending
) {

  return limitValue(

    (
      progress -
      beginning
    ) /

    (
      ending -
      beginning
    ),

    0,
    1

  );

}


/* ==========================================
   ÉLÉMENTS DE LA PAGE
========================================== */

const page =
  document.querySelector(
    ".intro-page"
  );


const questionLines =
  document.querySelectorAll(
    ".question-line"
  );


const nightProgress =
  document.querySelector(
    "#night-progress"
  );


const beginNightLink =
  document.querySelector(
    "#begin-night-link"
  );


const themeColor =
  document.querySelector(
    'meta[name="theme-color"]'
  );


/* ==========================================
   PROGRESSION DU JOUR VERS LA NUIT
========================================== */

function updateNightfall() {

  if (!page) {

    return;

  }


  /*
   * Progression totale de la page.
   */

  const maximumScroll =
    document.documentElement.scrollHeight -
    window.innerHeight;


  const scrollProgress =
    maximumScroll > 0

      ? window.scrollY /
        maximumScroll

      : 0;


  const progress =
    limitValue(
      scrollProgress,
      0,
      1
    );


  /*
   * Apparition du crépuscule.
   */

  const twilightProgress =
    calculateRange(
      progress,
      0.08,
      0.52
    );


  /*
   * Apparition de la nuit.
   */

  const nightProgressValue =
    calculateRange(
      progress,
      0.4,
      0.82
    );


  /*
   * Apparition des étoiles.
   */

  const starsProgress =
    calculateRange(
      progress,
      0.25,
      0.76
    );


  /*
   * Apparition de la voie lactée.
   */

  const milkyProgress =
    calculateRange(
      progress,
      0.52,
      0.9
    );


  /*
   * Descente du soleil.
   */

  const sunPosition =
    23 +
    progress * 104;


  const sunOpacity =
    1 -
    calculateRange(
      progress,
      0.43,
      0.68
    );


  const sunScale =
    1 +
    progress * 0.18;


  /*
   * Envoi des valeurs au CSS.
   */

  page.style.setProperty(

    "--sunset-opacity",

    1 -
    nightProgressValue

  );


  page.style.setProperty(

    "--twilight-opacity",

    twilightProgress *
    (
      1 -
      nightProgressValue *
      0.6
    )

  );


  page.style.setProperty(

    "--night-opacity",

    nightProgressValue

  );


  page.style.setProperty(

    "--star-opacity",

    starsProgress

  );


  page.style.setProperty(

    "--milky-opacity",

    milkyProgress * 0.85

  );


  page.style.setProperty(

    "--sun-position",

    sunPosition + "vh"

  );


  page.style.setProperty(

    "--sun-opacity",

    sunOpacity

  );


  page.style.setProperty(

    "--sun-scale",

    sunScale

  );


  /*
   * Le header devient clair
   * lorsque la nuit apparaît.
   */

  if (
    progress > 0.42
  ) {

    page.style.setProperty(

      "--header-color",

      "#fffaf2"

    );


    if (themeColor) {

      themeColor.setAttribute(

        "content",

        "#070b20"

      );

    }

  } else {

    page.style.setProperty(

      "--header-color",

      "#17101b"

    );


    if (themeColor) {

      themeColor.setAttribute(

        "content",

        "#f4bd74"

      );

    }

  }


  /*
   * Révélation progressive
   * des lignes de la question.
   */

  questionLines.forEach(

    function (
      line,
      index
    ) {

      const lineBeginning =
        0.2 +
        index * 0.075;


      if (
        progress >=
        lineBeginning
      ) {

        line.classList.add(
          "visible"
        );

      } else {

        line.classList.remove(
          "visible"
        );

      }

    }

  );


  /*
   * Indicateur discret en bas.
   */

  if (nightProgress) {

    let phase =
      "SUNSET";


    if (
      progress > 0.32
    ) {

      phase =
        "TWILIGHT";

    }


    if (
      progress > 0.68
    ) {

      phase =
        "NIGHT";

    }


    nightProgress.textContent =
      phase +
      " · " +
      Math.round(
        progress * 100
      ) +
      "%";

  }

}


/* Premier calcul */

updateNightfall();


/* Mise à jour pendant le scroll */

window.addEventListener(

  "scroll",

  updateNightfall,

  {
    passive: true
  }

);


/* ==========================================
   PARALLAXE AVEC LA SOURIS
========================================== */

window.addEventListener(

  "pointermove",

  function (event) {

    if (!page) {

      return;

    }


    const horizontalPosition =

      (
        event.clientX /
        window.innerWidth
      ) -
      0.5;


    const verticalPosition =

      (
        event.clientY /
        window.innerHeight
      ) -
      0.5;


    page.style.setProperty(

      "--pointer-x",

      horizontalPosition *
      18 +
      "px"

    );


    page.style.setProperty(

      "--pointer-y",

      verticalPosition *
      12 +
      "px"

    );


    pointerTargetX =
      horizontalPosition *
      15;


    pointerTargetY =
      verticalPosition *
      10;

  },

  {
    passive: true
  }

);


/* ==========================================
   CIEL ÉTOILÉ ANIMÉ
========================================== */

const starsCanvas =
  document.querySelector(
    "#stars-canvas"
  );


const starsContext =
  starsCanvas

    ? starsCanvas.getContext(
        "2d"
      )

    : null;


let stars = [];


let canvasWidth = 0;

let canvasHeight = 0;


let pointerTargetX = 0;

let pointerTargetY = 0;


let pointerCurrentX = 0;

let pointerCurrentY = 0;


/*
 * Crée un nombre aléatoire suivant
 * approximativement une courbe normale.
 */

function randomGaussian() {

  let firstRandom =
    Math.random();


  let secondRandom =
    Math.random();


  firstRandom =
    firstRandom === 0
      ? 0.0001
      : firstRandom;


  return (

    Math.sqrt(
      -2 *
      Math.log(
        firstRandom
      )
    ) *

    Math.cos(
      2 *
      Math.PI *
      secondRandom
    )

  );

}


/* ==========================================
   CRÉATION DES ÉTOILES
========================================== */

function createStars() {

  stars = [];


  const numberOfStars =

  window.innerWidth < 700

    ? 550

    : 1250;


  for (
    let index = 0;
    index < numberOfStars;
    index++
  ) {

    const belongsToMilkyWay =
      Math.random() < 0.56;


    let starX =
      Math.random() *
      canvasWidth;


    let starY;


    if (
      belongsToMilkyWay
    ) {

      /*
       * Les étoiles suivent une bande
       * diagonale pour former la voie lactée.
       */

      const diagonalCenter =

  canvasHeight *
  0.76 +

  (
    starX /
    canvasWidth -
    0.5
  ) *

  canvasHeight *
  0.14;


      starY =

        diagonalCenter +

        randomGaussian() *

        canvasHeight *
0.075;

    } else {

      starY =
        Math.random() *
        canvasHeight;

    }


    stars.push({

      x: starX,

      y: starY,

      radius:
        0.3 +
        Math.random() *
        1.45,

      opacity:
        0.25 +
        Math.random() *
        0.75,

      twinkleSpeed:
        0.45 +
        Math.random() *
        1.8,

      twinkleOffset:
        Math.random() *
        Math.PI *
        2,

      depth:
        0.25 +
        Math.random() *
        0.9,

      milky:
        belongsToMilkyWay

    });

  }

}


/* ==========================================
   DIMENSIONS DU CANVAS
========================================== */

function resizeStarsCanvas() {

  if (
    !starsCanvas ||
    !starsContext
  ) {

    return;

  }


  const pixelRatio =

    Math.min(
      window.devicePixelRatio,
      2
    );


  canvasWidth =
    window.innerWidth;


  canvasHeight =
    window.innerHeight;


  starsCanvas.width =

    canvasWidth *
    pixelRatio;


  starsCanvas.height =

    canvasHeight *
    pixelRatio;


  starsCanvas.style.width =
    canvasWidth +
    "px";


  starsCanvas.style.height =
    canvasHeight +
    "px";


  starsContext.setTransform(

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
   ANIMATION DES ÉTOILES
========================================== */

function animateStars(
  currentTime
) {

  if (
    !starsContext ||
    !starsCanvas
  ) {

    return;

  }


  starsContext.clearRect(

    0,
    0,
    canvasWidth,
    canvasHeight

  );


  pointerCurrentX +=

    (
      pointerTargetX -
      pointerCurrentX
    ) *
    0.025;


  pointerCurrentY +=

    (
      pointerTargetY -
      pointerCurrentY
    ) *
    0.025;


  stars.forEach(

    function (star) {

      const twinkle =

        0.72 +

        Math.sin(

          currentTime *
          0.001 *
          star.twinkleSpeed +

          star.twinkleOffset

        ) *

        0.28;


      const displayX =

        star.x +

        pointerCurrentX *
        star.depth;


      const displayY =

        star.y +

        pointerCurrentY *
        star.depth +

        Math.sin(

          currentTime *
          0.00012 +

          star.x

        ) *

        star.depth *
        1.4;


      starsContext.beginPath();


      starsContext.arc(

        displayX,

        displayY,

        star.radius,

        0,

        Math.PI * 2

      );


      /*
       * Les étoiles de la voie lactée
       * sont légèrement violettes.
       */

      starsContext.fillStyle =

        star.milky

          ? "rgba(222, 216, 255," +
            star.opacity *
            twinkle +
            ")"

          : "rgba(255, 251, 240," +
            star.opacity *
            twinkle +
            ")";


      starsContext.fill();

    }

  );


  window.requestAnimationFrame(
    animateStars
  );

}


/* Initialisation */

resizeStarsCanvas();


window.requestAnimationFrame(
  animateStars
);


/* Recréation au changement d’écran */

window.addEventListener(

  "resize",

  function () {

    resizeStarsCanvas();

    updateNightfall();

  }

);


/* ==========================================
   TRANSITION VERS LA PAGE 2
========================================== */

if (beginNightLink) {

  beginNightLink.addEventListener(

    "click",

    function (event) {

      event.preventDefault();


      /*
       * Évite plusieurs clics.
       */

      if (
        page.classList.contains(
          "leaving"
        )
      ) {

        return;

      }


      page.classList.add(
        "leaving"
      );


      window.setTimeout(

        function () {

          window.location.href =
            "sleep.html";

        },

        1200

      );

    }

  );

}
/* ==========================================
   PAGE 02 — THE SLEEPER
========================================== */


/* ==========================================
   ÉLÉMENTS DE LA PAGE
========================================== */

const sleepPage =
  document.querySelector(
    ".sleep-page"
  );


const sleepChapters =
  document.querySelectorAll(
    ".sleep-chapter"
  );


const sleepStage =
  document.querySelector(
    "#sleep-stage"
  );


const awarenessLevel =
  document.querySelector(
    "#awareness-level"
  );


const mentalLevel =
  document.querySelector(
    "#mental-level"
  );


const sleepProgressFill =
  document.querySelector(
    "#sleep-progress-fill"
  );


const sleepTime =
  document.querySelector(
    "#sleep-time"
  );


const enterMindLink =
  document.querySelector(
    "#enter-mind-link"
  );


/* ==========================================
   OUTIL DE CALCUL
========================================== */

function sleepRange(
  progress,
  start,
  end
) {

  return Math.min(

    Math.max(

      (
        progress -
        start
      ) /

      (
        end -
        start
      ),

      0

    ),

    1

  );

}


/* ==========================================
   OPACITÉ D’UNE PHRASE

   La phrase apparaît, reste visible,
   puis disparaît avant la suivante.
========================================== */

function calculateSentenceOpacity(
  progress,
  start,
  end,
  isFinal
) {

  if (isFinal) {

    return sleepRange(

      progress,

      start,

      start + 0.06

    );

  }


  const fadeDuration =
    Math.min(

      0.045,

      (
        end -
        start
      ) /
      3

    );


  const fadeIn =
    sleepRange(

      progress,

      start,

      start +
      fadeDuration

    );


  const fadeOut =

    1 -

    sleepRange(

      progress,

      end -
      fadeDuration,

      end

    );


  return Math.min(

    fadeIn,

    fadeOut

  );

}


/* ==========================================
   MISE À JOUR DE L’ENDORMISSEMENT
========================================== */

function updateSleepStory() {

  if (!sleepPage) {

    return;

  }


  const maximumScroll =

    document.documentElement.scrollHeight -

    window.innerHeight;


  const progress =

    maximumScroll > 0

      ? Math.min(

          Math.max(

            window.scrollY /
            maximumScroll,

            0

          ),

          1

        )

      : 0;


  /* ==========================================
     DISPARITION DE LA CHAMBRE
  =========================================== */

  const roomOpacity =

    1 -

    sleepRange(

      progress,

      0.12,

      0.58

    ) *

    0.86;


  const windowOpacity =

    0.55 *

    (
      1 -

      sleepRange(

        progress,

        0.08,

        0.48

      )

    );


  /* ==========================================
     FERMETURE DES YEUX
  =========================================== */

  const eyeClosing =

    sleepRange(

      progress,

      0.16,

      0.34

    );


  const eyesOpen =

    Math.max(

      0.045,

      1 -
      eyeClosing *
      0.955

    );


  const pupilOpacity =

    1 -

    sleepRange(

      progress,

      0.17,

      0.28

    );


  /* ==========================================
     APPARITION DE LA NUIT INTÉRIEURE
  =========================================== */

  const innerNightOpacity =

    sleepRange(

      progress,

      0.28,

      0.6

    );


  const neuralOpacity =

    sleepRange(

      progress,

      0.35,

      0.72

    );


  const mindOpacity =

    sleepRange(

      progress,

      0.58,

      0.9

    );


  const faceOpacity =

    1 -

    sleepRange(

      progress,

      0.74,

      0.94

    ) *

    0.88;


  const faceScale =

    1 +

    sleepRange(

      progress,

      0.62,

      1

    ) *

    0.14;


  const faceLight =

    sleepRange(

      progress,

      0.48,

      0.82

    );


  const starsOpacity =

    0.12 +

    sleepRange(

      progress,

      0.2,

      0.76

    ) *

    0.88;


  /* ==========================================
     ENVOYER LES VALEURS AU CSS
  =========================================== */

  sleepPage.style.setProperty(

    "--room-opacity",

    roomOpacity

  );


  sleepPage.style.setProperty(

    "--window-opacity",

    windowOpacity

  );


  sleepPage.style.setProperty(

    "--eyes-open",

    eyesOpen

  );


  sleepPage.style.setProperty(

    "--pupil-opacity",

    pupilOpacity

  );


  sleepPage.style.setProperty(

    "--inner-night-opacity",

    innerNightOpacity

  );


  sleepPage.style.setProperty(

    "--neural-opacity",

    neuralOpacity

  );


  sleepPage.style.setProperty(

    "--mind-opacity",

    mindOpacity

  );


  sleepPage.style.setProperty(

    "--face-opacity",

    faceOpacity

  );


  sleepPage.style.setProperty(

    "--face-scale",

    faceScale

  );


  sleepPage.style.setProperty(

    "--face-light",

    faceLight

  );


  sleepPage.style.setProperty(

    "--sleep-star-opacity",

    starsOpacity

  );


  /* ==========================================
     AFFICHER UNE SEULE PHRASE À LA FOIS
  =========================================== */

  sleepChapters.forEach(

    function (
      chapter,
      index
    ) {

      const start =

        Number(
          chapter.dataset.start
        );


      const end =

        Number(
          chapter.dataset.end
        );


      const isFinal =

        index ===

        sleepChapters.length - 1;


      const opacity =

        calculateSentenceOpacity(

          progress,

          start,

          end,

          isFinal

        );


      chapter.style.opacity =
        opacity;


      chapter.style.visibility =

        opacity > 0.01

          ? "visible"

          : "hidden";


      const sentence =

        chapter.querySelector(

          ".sleep-sentence"

        );


      if (sentence) {

        sentence.style.transform =

          "translateY(" +

          (
            30 -
            opacity *
            30
          ) +

          "px)";

      }

    }

  );


  /* ==========================================
     INFORMATIONS SCIENTIFIQUES
  =========================================== */

  if (
    progress < 0.17
  ) {

    sleepStage.textContent =
      "WAKEFULNESS";

  } else if (
    progress < 0.44
  ) {

    sleepStage.textContent =
      "N1 · HYPNAGOGIA";

  } else if (
    progress < 0.76
  ) {

    sleepStage.textContent =
      "LIGHT SLEEP";

  } else {

    sleepStage.textContent =
      "DREAM STATE";

  }


  const awareness =

    Math.max(

      0,

      Math.round(

        100 -

        sleepRange(

          progress,

          0.08,

          0.7

        ) *

        100

      )

    );


  awarenessLevel.textContent =

    awareness + "%";


  if (
    progress < 0.32
  ) {

    mentalLevel.textContent =
      "DETECTED";

  } else if (
    progress < 0.65
  ) {

    mentalLevel.textContent =
      "WANDERING";

  } else {

    mentalLevel.textContent =
      "UNRESTRICTED";

  }


  /* Barre de progression */

  sleepProgressFill.style.height =

    progress *
    100 +
    "%";


  /* Heure fictive */

  const elapsedMinutes =

    Math.floor(

      progress *
      8

    );


  sleepTime.textContent =

    "23:" +

    String(
      47 +
      elapsedMinutes
    ).padStart(
      2,
      "0"
    ) +

    ":00";

}


/* ==========================================
   ÉTOILES DE LA PAGE SLEEPER
========================================== */

const sleepStarsCanvas =

  document.querySelector(

    "#sleep-stars"

  );


const sleepStarsContext =

  sleepStarsCanvas

    ? sleepStarsCanvas.getContext(
        "2d"
      )

    : null;


let sleepStars = [];


let sleepCanvasWidth = 0;

let sleepCanvasHeight = 0;


let sleepPointerTargetX = 0;

let sleepPointerTargetY = 0;


let sleepPointerCurrentX = 0;

let sleepPointerCurrentY = 0;


/* ==========================================
   CRÉER LES ÉTOILES
========================================== */

function createSleepStars() {

  sleepStars = [];


  const numberOfStars =

    window.innerWidth < 700

      ? 360

      : 720;


  for (
    let index = 0;
    index < numberOfStars;
    index++
  ) {

    sleepStars.push({

      x:
        Math.random() *
        sleepCanvasWidth,

      y:
        Math.random() *
        sleepCanvasHeight,

      radius:
        0.25 +
        Math.random() *
        1.25,

      opacity:
        0.2 +
        Math.random() *
        0.8,

      speed:
        0.4 +
        Math.random() *
        1.5,

      offset:
        Math.random() *
        Math.PI *
        2,

      depth:
        0.2 +
        Math.random() *
        0.8

    });

  }

}


/* ==========================================
   REDIMENSIONNER LE CANVAS
========================================== */

function resizeSleepStars() {

  if (
    !sleepStarsCanvas ||
    !sleepStarsContext
  ) {

    return;

  }


  const pixelRatio =

    Math.min(

      window.devicePixelRatio,

      2

    );


  sleepCanvasWidth =

    window.innerWidth;


  sleepCanvasHeight =

    window.innerHeight;


  sleepStarsCanvas.width =

    sleepCanvasWidth *
    pixelRatio;


  sleepStarsCanvas.height =

    sleepCanvasHeight *
    pixelRatio;


  sleepStarsCanvas.style.width =

    sleepCanvasWidth +
    "px";


  sleepStarsCanvas.style.height =

    sleepCanvasHeight +
    "px";


  sleepStarsContext.setTransform(

    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0

  );


  createSleepStars();

}


/* ==========================================
   ANIMER LES ÉTOILES
========================================== */

function animateSleepStars(
  currentTime
) {

  if (
    !sleepStarsContext ||
    !sleepStarsCanvas
  ) {

    return;

  }


  sleepStarsContext.clearRect(

    0,
    0,
    sleepCanvasWidth,
    sleepCanvasHeight

  );


  sleepPointerCurrentX +=

    (
      sleepPointerTargetX -
      sleepPointerCurrentX
    ) *
    0.025;


  sleepPointerCurrentY +=

    (
      sleepPointerTargetY -
      sleepPointerCurrentY
    ) *
    0.025;


  sleepStars.forEach(

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


      const displayX =

        star.x +

        sleepPointerCurrentX *
        star.depth;


      const displayY =

        star.y +

        sleepPointerCurrentY *
        star.depth;


      sleepStarsContext.beginPath();


      sleepStarsContext.arc(

        displayX,

        displayY,

        star.radius,

        0,

        Math.PI * 2

      );


      sleepStarsContext.fillStyle =

        "rgba(225, 220, 255," +

        star.opacity *
        twinkle +

        ")";


      sleepStarsContext.fill();

    }

  );


  window.requestAnimationFrame(

    animateSleepStars

  );

}


/* ==========================================
   INTERACTION DE LA SOURIS
========================================== */

if (sleepPage) {

  window.addEventListener(

    "pointermove",

    function (event) {

      const horizontalPosition =

        event.clientX /

        window.innerWidth -

        0.5;


      const verticalPosition =

        event.clientY /

        window.innerHeight -

        0.5;


      sleepPointerTargetX =

        horizontalPosition *
        16;


      sleepPointerTargetY =

        verticalPosition *
        12;


      sleepPage.style.setProperty(

        "--sleep-pointer-x",

        horizontalPosition *
        10 +
        "px"

      );


      sleepPage.style.setProperty(

        "--sleep-pointer-y",

        verticalPosition *
        8 +
        "px"

      );

    },

    {
      passive: true
    }

  );

}


/* ==========================================
   TRANSITION ENTER THE MIND
========================================== */

if (enterMindLink) {

  enterMindLink.addEventListener(

    "click",

    function (event) {

      event.preventDefault();


      if (
        sleepPage.classList.contains(
          "entering-mind"
        )
      ) {

        return;

      }


      sleepPage.classList.add(

        "entering-mind"

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

}


/* ==========================================
   INITIALISATION DE LA PAGE
========================================== */

if (sleepPage) {

  resizeSleepStars();

  updateSleepStory();


  window.requestAnimationFrame(

    animateSleepStars

  );


  window.addEventListener(

    "scroll",

    updateSleepStory,

    {
      passive: true
    }

  );


  window.addEventListener(

    "resize",

    function () {

      resizeSleepStars();

      updateSleepStory();

    }

  );

}
