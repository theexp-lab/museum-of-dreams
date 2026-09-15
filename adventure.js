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
      "#adventure-progress-fill"
    );


  const scrollInstruction =
    document.querySelector(
      "#scroll-instruction"
    );


  const followGlow =
    document.querySelector(
      "#follow-glow"
    );


  const canvas =
    document.querySelector(
      "#magic-canvas"
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
     NARRATION

     Une seule phrase est affichée à la fois.
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
      start: 0.2,

      label:
        "LEARNING TO FLY",

      text:
        "No wings. No instructions.<em>Somehow, you remember how.</em>"
    },

    {
      start: 0.3,

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
      start: 0.49,

      label:
        "THE RACE",

      text:
        "The forest has decided<em>to race you.</em>"
    },

    {
      start: 0.57,

      label:
        "THE FALL",

      text:
        "Then the sky opens<em>beneath your feet.</em>"
    },

    {
      start: 0.66,

      label:
        "BETWEEN WORLDS",

      text:
        "You fall through<em>three different sunsets.</em>"
    },

    {
      start: 0.75,

      label:
        "A DIFFERENT ENDING",

      text:
        "Before you reach the ground,<em>the dream changes the ending.</em>"
    },

    {
      start: 0.83,

      label:
        "THE IMPOSSIBLE WORLD",

      text:
        "Nothing stays where it was.<em>Not even the horizon.</em>"
    }
  ];


  /* ==========================================
     OBSERVATIONS SCIENTIFIQUES

     L’observation Dream Incorporation
     a volontairement été retirée.
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
      start: 0.62,

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
      start: 0.79,

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


  let narrationIndex =
    -1;


  let scienceIndex =
    -1;


  let narrationTimer;

  let scienceTimer;


  /* ==========================================
     CHANGER LA NARRATION
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
        500
      );
  }


  /* ==========================================
     CHANGER LA NOTE SCIENTIFIQUE
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
        390
      );
  }


  /* ==========================================
     PROGRESSION DU SCROLL
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


  function updateAdventure() {
    smoothProgress =
      lerp(
        smoothProgress,
        targetProgress,
        0.085
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


    let newNarrationIndex = 0;


    narrationSteps.forEach(
      function (
        step,
        index
      ) {
        if (
          smoothProgress >=
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


    let newScienceIndex = 0;


    scienceSteps.forEach(
      function (
        step,
        index
      ) {
        if (
          smoothProgress >=
          step.start
        ) {
          newScienceIndex =
            index;
        }
      }
    );


    displayScience(
      newScienceIndex
    );


    const flightProgress =
      range(
        smoothProgress,
        0.07,
        0.36
      );


    const forestEntrance =
      range(
        smoothProgress,
        0.34,
        0.48
      );


    const forestExit =
      range(
        smoothProgress,
        0.53,
        0.63
      );


    const forestProgress =
      forestEntrance *
      (
        1 -
        forestExit
      );


    const fallEntrance =
      range(
        smoothProgress,
        0.55,
        0.68
      );


    const fallExit =
      range(
        smoothProgress,
        0.74,
        0.82
      );


    const fallProgress =
      fallEntrance *
      (
        1 -
        fallExit
      );


    const worldProgress =
      range(
        smoothProgress,
        0.73,
        0.89
      );


    const romanceProgress =
      range(
        smoothProgress,
        0.87,
        0.96
      );


    page.style.setProperty(
      "--flight-progress",
      flightProgress
    );


    page.style.setProperty(
      "--forest-progress",
      forestProgress
    );


    page.style.setProperty(
      "--fall-progress",
      fallProgress
    );


    page.style.setProperty(
      "--world-progress",
      worldProgress
    );


    page.style.setProperty(
      "--romance-progress",
      romanceProgress
    );


    progressFill.style.height =
      smoothProgress *
      100 +
      "%";


    if (
      smoothProgress > 0.94
    ) {
      page.classList.add(
        "romance-active"
      );


      scrollInstruction.style.opacity =
        "0";
    } else {
      page.classList.remove(
        "romance-active"
      );


      scrollInstruction.style.opacity =
        smoothProgress > 0.08
          ? "0.28"
          : "0.58";
    }
  }


  /* ==========================================
     PARTICULES FÉERIQUES
  =========================================== */

  let canvasWidth = 0;

  let canvasHeight = 0;

  let particles = [];

  let stars = [];


  let pointerX = 0;

  let pointerY = 0;

  let pointerTargetX = 0;

  let pointerTargetY = 0;


  function createWorldParticles() {
    particles = [];

    stars = [];


    const mobile =
      window.innerWidth < 700;


    const particleCount =
      mobile
        ? 85
        : 155;


    const starCount =
      mobile
        ? 100
        : 190;


    for (
      let index = 0;
      index < starCount;
      index++
    ) {
      stars.push({
        x:
          Math.random() *
          canvasWidth,

        y:
          Math.random() *
          canvasHeight,

        radius:
          0.25 +
          Math.random() *
          1.25,

        opacity:
          0.2 +
          Math.random() *
          0.66,

        phase:
          Math.random() *
          Math.PI *
          2,

        speed:
          0.35 +
          Math.random() *
          1.1,

        depth:
          0.1 +
          Math.random() *
          0.65
      });
    }


    const colors = [
      "255,248,207",
      "222,204,255",
      "190,247,255",
      "255,199,222"
    ];


    for (
      let index = 0;
      index < particleCount;
      index++
    ) {
      particles.push({
        x:
          Math.random() *
          canvasWidth,

        y:
          Math.random() *
          canvasHeight,

        radius:
          0.7 +
          Math.random() *
          2.2,

        velocityX:
          0.05 +
          Math.random() *
          0.22,

        velocityY:
          -0.04 -
          Math.random() *
          0.2,

        phase:
          Math.random() *
          Math.PI *
          2,

        glow:
          0.2 +
          Math.random() *
          0.75,

        color:
          colors[
            Math.floor(
              Math.random() *
              colors.length
            )
          ]
      });
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


    createWorldParticles();
  }


  /* ==========================================
     DESSIN DU CIEL
  =========================================== */

  function drawMagic(
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
        0.035
      );


    pointerY =
      lerp(
        pointerY,
        pointerTargetY,
        0.035
      );


    stars.forEach(
      function (star) {
        const twinkle =
          0.62 +

          Math.sin(
            currentTime *
            0.001 *
            star.speed +
            star.phase
          ) *
          0.38;


        const x =
          star.x +
          pointerX *
          star.depth;


        const y =
          star.y +
          pointerY *
          star.depth;


        context.beginPath();


        context.arc(
          x,
          y,
          star.radius,
          0,
          Math.PI *
          2
        );


        context.fillStyle =
          "rgba(255,250,235," +
          star.opacity *
          twinkle +
          ")";


        context.fill();
      }
    );


    particles.forEach(
      function (particle) {
        const flightSpeed =
          1 +
          smoothProgress *
          2.1;


        particle.x +=
          particle.velocityX *
          flightSpeed;


        particle.y +=
          particle.velocityY *
          flightSpeed;


        particle.x +=
          Math.sin(
            currentTime *
            0.0008 +
            particle.phase
          ) *
          0.09;


        if (
          particle.y < -15
        ) {
          particle.y =
            canvasHeight + 15;


          particle.x =
            Math.random() *
            canvasWidth;
        }


        if (
          particle.x > canvasWidth + 15
        ) {
          particle.x = -15;
        }


        const pulse =
          0.55 +

          Math.sin(
            currentTime *
            0.002 +
            particle.phase
          ) *
          0.45;


        const opacity =
          particle.glow *
          pulse;


        context.beginPath();


        context.arc(
          particle.x +
          pointerX *
          0.28,

          particle.y +
          pointerY *
          0.2,

          particle.radius,

          0,

          Math.PI *
          2
        );


        context.fillStyle =
          "rgba(" +
          particle.color +
          "," +
          opacity +
          ")";


        context.shadowBlur =
          9;


        context.shadowColor =
          "rgba(" +
          particle.color +
          ",0.62)";


        context.fill();


        context.shadowBlur = 0;
      }
    );


    updateAdventure();


    window.requestAnimationFrame(
      drawMagic
    );
  }


  /* ==========================================
     SOURIS / PARALLAXE
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
        18;


      pointerTargetY =
        vertical *
        13;


      page.style.setProperty(
        "--pointer-x",
        horizontal *
        15 +
        "px"
      );


      page.style.setProperty(
        "--pointer-y",
        vertical *
        12 +
        "px"
      );
    },
    {
      passive: true
    }
  );


  /* ==========================================
     TRANSITION VERS ROMANCE
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
          1400
        );
      }
    );
  }


  /* ==========================================
     INITIALISATION
  =========================================== */

  resizeCanvas();

  calculateProgress();

  updateAdventure();


  window.requestAnimationFrame(
    drawMagic
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
