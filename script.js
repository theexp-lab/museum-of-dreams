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

      ? 330

      : 760;


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
        0.15 +

        starX *
        0.37;


      starY =

        diagonalCenter +

        randomGaussian() *

        canvasHeight *
        0.11;

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
