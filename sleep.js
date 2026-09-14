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
        0.28
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
        2
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
        ? 340
        : 820;


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
   CERVEAU DE PARTICULES

   Aucun trait : seulement des points,
   impulsions et mini-explosions.
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

  let neurons = [];

  let bursts = [];


  function resize() {
    const ratio =
      Math.min(
        window.devicePixelRatio || 1,
        2
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


    neurons = [];


    const total =
      width < 700
        ? 180
        : 360;


    for (
      let index = 0;
      index < total;
      index++
    ) {
      const angle =
        Math.random() *
        Math.PI *
        2;


      const radius =
        Math.sqrt(
          Math.random()
        );


      neurons.push({
        x:
  width *
  0.5 +
  Math.cos(angle) *
  radius *
  Math.min(
    width * 0.12,
    185
  ),

y:
  height *
  0.155 +
  Math.sin(angle) *
  radius *
  Math.min(
    height * 0.075,
    82
  ),

        size:
          0.5 +
          Math.random() *
          1.8,

        phase:
          Math.random() *
          Math.PI *
          2,

        speed:
          0.6 +
          Math.random() *
          2
      });
    }
  }


  function createBurst() {
    const energy =
      window.brainEnergy || 0;


    if (
      energy < 0.18 ||
      neurons.length === 0
    ) {
      return;
    }


    const source =
      neurons[
        Math.floor(
          Math.random() *
          neurons.length
        )
      ];


    bursts.push({
      x: source.x,
      y: source.y,
      radius: 2,
      opacity:
        0.45 +
        energy *
        0.5
    });
  }


  let previousBurst = 0;


  function draw(time) {
    const energy =
      window.brainEnergy || 0;


    context.clearRect(
      0,
      0,
      width,
      height
    );


    for (
      const neuron of neurons
    ) {
      const pulse =
        0.45 +
        Math.sin(
          time *
          0.003 *
          neuron.speed +
          neuron.phase
        ) *
        0.42;


      const flash =
        Math.random() <
        energy *
        0.009
          ? 1
          : 0;


      context.beginPath();


      context.arc(
        neuron.x +
        Math.sin(
          time *
          0.001 +
          neuron.phase
        ) *
        energy *
        3,

        neuron.y +
        Math.cos(
          time *
          0.0013 +
          neuron.phase
        ) *
        energy *
        3,

        neuron.size +
        flash *
        2.8,

        0,
        Math.PI *
        2
      );


      context.fillStyle =
        "rgba(220,196,255," +
        clamp(
          pulse +
          flash *
          0.6,
          0,
          1
        ) +
        ")";


      context.fill();
    }


    const delay =
      950 -
      energy *
      760;


    if (
      time -
      previousBurst >
      delay
    ) {
      createBurst();

      previousBurst = time;
    }


    for (
      const burst of bursts
    ) {
      burst.radius +=
        0.8 +
        energy *
        1.7;


      burst.opacity *=
        0.94;


      context.beginPath();


      context.arc(
        burst.x,
        burst.y,
        burst.radius,
        0,
        Math.PI *
        2
      );


      context.strokeStyle =
        "rgba(232,218,255," +
        burst.opacity +
        ")";


      context.lineWidth =
        1.15;


      context.stroke();
    }


    bursts =
      bursts.filter(
        function (burst) {
          return burst.opacity >
            0.025;
        }
      );


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
