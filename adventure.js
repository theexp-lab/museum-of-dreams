/* ==========================================
   THE MUSEUM OF DREAMS
   ROOM 03 — ADVENTURE
========================================== */

(function () {
  "use strict";


  /* ==========================================
     OUTILS
  =========================================== */

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
    if (
      start === end
    ) {
      return progress >= end
        ? 1
        : 0;
    }


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


  function lerp(
    start,
    end,
    amount
  ) {
    return (
      start +
      (
        end -
        start
      ) *
      amount
    );
  }


  /* ==========================================
     ÉLÉMENTS HTML
  =========================================== */

  const page =
    document.querySelector(
      ".adventure-page"
    );


  const narration =
    document.querySelector(
      "#adventure-narration"
    );


  const scienceNote =
    document.querySelector(
      "#science-note"
    );


  const scienceNumber =
    document.querySelector(
      "#science-number"
    );


  const scienceTitle =
    document.querySelector(
      "#science-title"
    );


  const scienceText =
    document.querySelector(
      "#science-text"
    );


  const scienceSource =
    document.querySelector(
      "#science-source"
    );


  const progressFill =
    document.querySelector(
      "#scroll-progress-fill"
    );


  const scrollMessage =
    document.querySelector(
      "#scroll-message"
    );


  const followGlow =
    document.querySelector(
      "#follow-glow"
    );


  const canvas =
    document.querySelector(
      "#adventure-canvas"
    );


  if (
    !page ||
    !narration ||
    !canvas
  ) {
    return;
  }


  const context =
    canvas.getContext(
      "2d"
    );


  /* ==========================================
     PHRASES
  =========================================== */

  const narrationSteps = [
    {
      start: 0,

      label:
        "ROOM 03 · ADVENTURE",

      text:
        "The sky starts here.<em>And gravity ends.</em>"
    },

    {
      start: 0.1,

      label:
        "THE FIRST FLIGHT",

      text:
        "You take one step.<em>The clouds take care of the rest.</em>"
    },

    {
      start: 0.21,

      label:
        "LEARNING TO FLY",

      text:
        "No wings. No instructions.<em>Somehow, you remember how.</em>"
    },

    {
      start: 0.31,

      label:
        "ABOVE THE CLOUDS",

      text:
        "The stars move aside<em>to let you through.</em>"
    },

    {
      start: 0.4,

      label:
        "THE INVERTED FOREST",

      text:
        "A forest is growing<em>on the wrong side of the sky.</em>"
    },

    {
      start: 0.5,

      label:
        "THE RACE",

      text:
        "The forest has decided<em>to race you.</em>"
    },

    {
      start: 0.59,

      label:
        "THE FALL",

      text:
        "Then the sky opens<em>beneath your feet.</em>"
    },

    {
      start: 0.68,

      label:
        "BETWEEN WORLDS",

      text:
        "You fall through<em>three different sunsets.</em>"
    },

    {
      start: 0.77,

      label:
        "A DIFFERENT ENDING",

      text:
        "Before you reach the ground,<em>the dream changes the ending.</em>"
    },

    {
      start: 0.85,

      label:
        "THE IMPOSSIBLE HORIZON",

      text:
        "Nothing stays where it was.<em>Not even the horizon.</em>"
    }
  ];


  /* ==========================================
     OBSERVATIONS SCIENTIFIQUES
  =========================================== */

  const scienceSteps = [
    {
      start: 0,

      number:
        "03.1",

      title:
        "FLYING DREAMS",

      text:
        "In one student sample, 48.3% reported having experienced a flying dream at least once.",

      source:
        "https://link.springer.com/article/10.1023/B:DREM.0000003144.40929.0b"
    },

    {
      start: 0.4,

      number:
        "03.2",

      title:
        "RECURRING MOTION",

      text:
        "81.5% reported a dream of being chased and 73.8% a dream of falling at least once.",

      source:
        "https://link.springer.com/article/10.1023/B:DREM.0000003144.40929.0b"
    },

    {
      start: 0.61,

      number:
        "03.3",

      title:
        "FLIGHT & LUCIDITY",

      text:
        "Across 1,910 reports, flying dreams were associated with lucid and pre-lucid dreaming.",

      source:
        "https://doi.org/10.1037/h0094325"
    },

    {
      start: 0.81,

      number:
        "03.4",

      title:
        "DREAM DISCONTINUITY",

      text:
        "Judges distinguished real dreams from spliced narratives only 57% of the time.",

      source:
        "https://academic.oup.com/sleepadvances/article/6/1/zpae093/7924184"
    }
  ];


  let narrationIndex = -1;

  let scienceIndex = -1;

  let narrationTimer;

  let scienceTimer;


  /* ==========================================
     CHANGEMENT DE PHRASE
  =========================================== */

  function displayNarration(
    newIndex
  ) {
    if (
      newIndex === narrationIndex
    ) {
      return;
    }


    narrationIndex =
      newIndex;


    window.clearTimeout(
      narrationTimer
    );


    narration.classList.add(
      "is-changing"
    );


    narrationTimer =
      window.setTimeout(
        function () {
          const step =
            narrationSteps[
              newIndex
            ];


          narration.innerHTML =
            "<p class=\"narration-label\">" +
            step.label +
            "</p>" +

            "<h1>" +
            step.text +
            "</h1>";


          narration.classList.remove(
            "is-changing"
          );
        },
        470
      );
  }


  /* ==========================================
     CHANGEMENT DE NOTE SCIENTIFIQUE
  =========================================== */

  function displayScience(
    newIndex
  ) {
    if (
      newIndex === scienceIndex
    ) {
      return;
    }


    scienceIndex =
      newIndex;


    window.clearTimeout(
      scienceTimer
    );


    scienceNote.classList.add(
      "is-changing"
    );


    scienceTimer =
      window.setTimeout(
        function () {
          const step =
            scienceSteps[
              newIndex
            ];


          scienceNumber.textContent =
            step.number;


          scienceTitle.textContent =
            step.title;


          scienceText.textContent =
            step.text;


          scienceSource.href =
            step.source;


          scienceNote.classList.remove(
            "is-changing"
          );
        },
        370
      );
  }


  /* ==========================================
     SCROLL
  =========================================== */

  let targetProgress = 0;

  let smoothProgress = 0;


  function calculateProgress() {
    const maximumScroll =
      document.documentElement.scrollHeight -
      window.innerHeight;


    targetProgress =
      maximumScroll > 0

        ? clamp(
            window.scrollY /
            maximumScroll,
            0,
            1
          )

        : 0;
  }


  function updateExperience() {
    smoothProgress =
      lerp(
        smoothProgress,
        targetProgress,
        0.09
      );


    if (
      Math.abs(
        targetProgress -
        smoothProgress
      ) < 0.0001
    ) {
      smoothProgress =
        targetProgress;
    }


    /* Phrase actuelle */

    let nextNarrationIndex = 0;


    narrationSteps.forEach(
      function (
        step,
        index
      ) {
        if (
          smoothProgress >= step.start
        ) {
          nextNarrationIndex =
            index;
        }
      }
    );


    displayNarration(
      nextNarrationIndex
    );


    /* Observation actuelle */

    let nextScienceIndex = 0;


    scienceSteps.forEach(
      function (
        step,
        index
      ) {
        if (
          smoothProgress >= step.start
        ) {
          nextScienceIndex =
            index;
        }
      }
    );


    displayScience(
      nextScienceIndex
    );


    /* Vol */

    const flightEntrance =
      range(
        smoothProgress,
        0.05,
        0.17
      );


    const flightExit =
      range(
        smoothProgress,
        0.34,
        0.43
      );


    const flight =
      flightEntrance *
      (
        1 -
        flightExit
      );


    /* Forêt */

    const forestEntrance =
      range(
        smoothProgress,
        0.34,
        0.43
      );


    const forestExit =
      range(
        smoothProgress,
        0.53,
        0.61
      );


    const forest =
      forestEntrance *
      (
        1 -
        forestExit
      );


    /* Chute */

    const fallEntrance =
      range(
        smoothProgress,
        0.55,
        0.64
      );


    const fallExit =
      range(
        smoothProgress,
        0.77,
        0.84
      );


    const fall =
      fallEntrance *
      (
        1 -
        fallExit
      );


    /* Trois changements de couleur */

    const peach =
      range(
        smoothProgress,
        0.56,
        0.63
      ) *
      (
        1 -
        range(
          smoothProgress,
          0.65,
          0.7
        )
      );


    const pinkSunset =
      range(
        smoothProgress,
        0.64,
        0.7
      ) *
      (
        1 -
        range(
          smoothProgress,
          0.72,
          0.78
        )
      );


    const night =
      range(
        smoothProgress,
        0.71,
        0.81
      );


    /* Horizon */

    const horizon =
      range(
        smoothProgress,
        0.8,
        0.89
      );


    /* Romance */

    const romance =
      range(
        smoothProgress,
        0.89,
        0.97
      );


    page.style.setProperty(
      "--flight",
      flight
    );


    page.style.setProperty(
      "--forest",
      forest
    );


    page.style.setProperty(
      "--fall",
      fall
    );


    page.style.setProperty(
      "--peach",
      peach
    );


    page.style.setProperty(
      "--pink-sunset",
      pinkSunset
    );


    page.style.setProperty(
      "--night",
      night
    );


    page.style.setProperty(
      "--horizon",
      horizon
    );


    page.style.setProperty(
      "--romance",
      romance
    );


    progressFill.style.height =
      smoothProgress *
      100 +
      "%";


    if (
      smoothProgress >= 0.945
    ) {
      page.classList.add(
        "romance-active"
      );


      scrollMessage.style.opacity =
        "0";
    } else {
      page.classList.remove(
        "romance-active"
      );


      scrollMessage.style.opacity =
        smoothProgress > 0.08
          ? "0.27"
          : "0.53";
    }
  }


  /* ==========================================
     ÉTOILES
  =========================================== */

  let canvasWidth = 0;

  let canvasHeight = 0;

  let stars = [];


  let pointerX = 0;

  let pointerY = 0;

  let pointerTargetX = 0;

  let pointerTargetY = 0;


  function resetStar(
    star,
    randomDepth
  ) {
    star.x =
      (
        Math.random() -
        0.5
      ) *
      canvasWidth;


    star.y =
      (
        Math.random() -
        0.5
      ) *
      canvasHeight;


    star.z =
      randomDepth
        ? 0.25 + Math.random() * 1.1
        : 1.25;


    star.size =
      0.35 +
      Math.random() *
      1.05;


    star.opacity =
      0.24 +
      Math.random() *
      0.64;


    star.phase =
      Math.random() *
      Math.PI *
      2;
  }


  function createStars() {
    stars = [];


    const starCount =
      window.innerWidth < 700
        ? 45
        : 70;


    for (
      let index = 0;
      index < starCount;
      index++
    ) {
      const star = {};


      resetStar(
        star,
        true
      );


      stars.push(
        star
      );
    }
  }


  function resizeCanvas() {
    const pixelRatio =
      Math.min(
        window.devicePixelRatio || 1,
        1.5
      );


    canvasWidth =
      window.innerWidth;


    canvasHeight =
      window.innerHeight;


    canvas.width =
      Math.round(
        canvasWidth *
        pixelRatio
      );


    canvas.height =
      Math.round(
        canvasHeight *
        pixelRatio
      );


    context.setTransform(
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
  =========================================== */

  function animateStars(
    currentTime
  ) {
    context.clearRect(
      0,
      0,
      canvasWidth,
      canvasHeight
    );


    pointerX =
      lerp(
        pointerX,
        pointerTargetX,
        0.04
      );


    pointerY =
      lerp(
        pointerY,
        pointerTargetY,
        0.04
      );


    const flightIntensity =
      Number(
        getComputedStyle(
          page
        ).getPropertyValue(
          "--flight"
        )
      ) || 0;


    const forestIntensity =
      Number(
        getComputedStyle(
          page
        ).getPropertyValue(
          "--forest"
        )
      ) || 0;


    const fallIntensity =
      Number(
        getComputedStyle(
          page
        ).getPropertyValue(
          "--fall"
        )
      ) || 0;


    const starSpeed =
      0.0015 +
      flightIntensity *
      0.011 +
      fallIntensity *
      0.007;


    const centreX =
      canvasWidth / 2 +
      pointerX;


    const centreY =
      canvasHeight / 2 +
      pointerY;


    stars.forEach(
      function (star) {
        star.z -=
          starSpeed;


        if (
          star.z <= 0.06
        ) {
          resetStar(
            star,
            false
          );
        }


        const projection =
          1 /
          star.z;


        const screenX =
          centreX +
          star.x *
          projection;


        const screenY =
          centreY +
          star.y *
          projection;


        if (
          screenX < -30 ||
          screenX > canvasWidth + 30 ||
          screenY < -30 ||
          screenY > canvasHeight + 30
        ) {
          resetStar(
            star,
            false
          );


          return;
        }


        const twinkle =
          0.72 +

          Math.sin(
            currentTime *
            0.0012 +
            star.phase
          ) *
          0.28;


        const radius =
          Math.min(
            2.5,
            star.size *
            projection
          );


        let red = 255;

        let green = 249;

        let blue = 226;


        if (
          forestIntensity > 0.2
        ) {
          red = 215;

          green = 255;

          blue = 224;
        }


        context.beginPath();


        context.arc(
          screenX,
          screenY,
          radius,
          0,
          Math.PI *
          2
        );


        context.fillStyle =
          "rgba(" +
          red +
          "," +
          green +
          "," +
          blue +
          "," +
          star.opacity *
          twinkle +
          ")";


        context.fill();
      }
    );


    updateExperience();


    window.requestAnimationFrame(
      animateStars
    );
  }


  /* ==========================================
     SOURIS
  =========================================== */

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
        17;


      pointerTargetY =
        vertical *
        12;


      page.style.setProperty(
        "--pointer-x",
        horizontal *
        14 +
        "px"
      );


      page.style.setProperty(
        "--pointer-y",
        vertical *
        11 +
        "px"
      );
    },
    {
      passive: true
    }
  );


  /* ==========================================
     PASSAGE VERS ROMANCE
  =========================================== */

  if (
    followGlow
  ) {
    followGlow.addEventListener(
      "click",
      function (event) {
        event.preventDefault();


        if (
          page.classList.contains(
            "leaving-adventure"
          )
        ) {
          return;
        }


        page.classList.add(
          "leaving-adventure"
        );


        window.setTimeout(
          function () {
            window.location.href =
              "romance.html";
          },
          1350
        );
      }
    );
  }


  /* ==========================================
     INITIALISATION
  =========================================== */

  resizeCanvas();

  calculateProgress();

  updateExperience();


  window.requestAnimationFrame(
    animateStars
  );


  window.addEventListener(
    "scroll",
    calculateProgress,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    function () {
      resizeCanvas();

      calculateProgress();
    }
  );

})();
