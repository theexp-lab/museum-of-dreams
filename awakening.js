/* ==========================================
   THE MUSEUM OF DREAMS
   FINAL ROOM — AWAKENING
========================================== */


const awakeningPage =
  document.body;


const awakeningBeats = [
  ...document.querySelectorAll(
    ".awakening-beat"
  )
];


const awakeningScenes =
  awakeningBeats.map(
    function (beat) {
      return beat.dataset.scene;
    }
  );


const progressFill =
  document.querySelector(
    "#awakening-progress-fill"
  );


const awakeningCue =
  document.querySelector(
    "#awakening-cue"
  );


const sleepState =
  document.querySelector(
    "#sleep-state"
  );


const heartState =
  document.querySelector(
    "#heart-state"
  );


const recallState =
  document.querySelector(
    "#recall-state"
  );


const dustField =
  document.querySelector(
    "#dust-field"
  );


let activeIndex =
  -1;


let wheelLocked =
  false;


let touchStartY =
  0;


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


/* ==========================================
   PARTICULES DE POUSSIÈRE
========================================== */

function createDust() {
  const count =
    window.innerWidth < 700
      ? 24
      : 48;


  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const particle =
      document.createElement(
        "span"
      );


    particle.className =
      "dust";


    particle.style.left =
      40 +
      Math.random() *
      35 +
      "%";


    particle.style.top =
      12 +
      Math.random() *
      64 +
      "%";


    particle.style.setProperty(
      "--duration",

      4 +
      Math.random() *
      6 +
      "s"
    );


    particle.style.setProperty(
      "--delay",

      Math.random() *
      -8 +
      "s"
    );


    particle.style.transform =
      "scale(" +
      (
        0.45 +
        Math.random() *
        1.1
      ) +
      ")";


    dustField.appendChild(
      particle
    );
  }
}


/* ==========================================
   MONITEUR DU RÉVEIL
========================================== */

function updateMonitor(scene) {
  if (
    scene === "light"
  ) {
    sleepState.textContent =
      "REM";


    heartState.textContent =
      "ELEVATED";


    recallState.textContent =
      "UNSTABLE";


    return;
  }


  if (
    scene === "return" ||
    scene === "title"
  ) {
    sleepState.textContent =
      "REM → AWAKE";


    heartState.textContent =
      "SETTLING";


    recallState.textContent =
      "ACTIVE";


    return;
  }


  if (
    scene === "feeling" ||
    scene === "fragments"
  ) {
    sleepState.textContent =
      "AWAKE";


    heartState.textContent =
      "NORMAL";


    recallState.textContent =
      "FADING";


    return;
  }


  sleepState.textContent =
    "AWAKE";


  heartState.textContent =
    "NORMAL";


  recallState.textContent =
    scene === "exit"
      ? "ARCHIVED"
      : "FRAGILE";
}


/* ==========================================
   ACTIVER UNE SCÈNE
========================================== */

function activateScene(index) {
  const nextIndex =
    clamp(
      index,
      0,
      awakeningBeats.length - 1
    );


  if (
    nextIndex ===
    activeIndex
  ) {
    return;
  }


  activeIndex =
    nextIndex;


  const scene =
    awakeningScenes[
      activeIndex
    ];


  awakeningBeats.forEach(
    function (
      beat,
      beatIndex
    ) {
      beat.classList.toggle(
        "is-active",
        beatIndex === activeIndex
      );
    }
  );


  awakeningPage.dataset.scene =
    scene;


  const progress =
    activeIndex /
    (
      awakeningBeats.length -
      1
    );


  awakeningPage.style.setProperty(
    "--scene-progress",
    progress
  );


  progressFill.style.height =
    progress *
    100 +
    "%";


  if (
    scene === "light"
  ) {
    awakeningCue.textContent =
      "LET YOUR EYES ADJUST";
  } else if (
    scene === "exit"
  ) {
    awakeningCue.textContent =
      "CONTINUE THE VISIT";
  } else {
    awakeningCue.textContent =
      "RETURN TO THE ROOM";
  }


  updateMonitor(scene);
}


/* ==========================================
   OBSERVER LES SECTIONS
========================================== */

const observer =
  new IntersectionObserver(
    function (entries) {
      const visible =
        entries

          .filter(
            function (entry) {
              return entry.isIntersecting;
            }
          )

          .sort(
            function (
              first,
              second
            ) {
              return (
                second.intersectionRatio -
                first.intersectionRatio
              );
            }
          )[0];


      if (visible) {
        activateScene(
          awakeningBeats.indexOf(
            visible.target
          )
        );
      }
    },

    {
      threshold: [
        0.58,
        0.74
      ]
    }
  );


awakeningBeats.forEach(
  function (beat) {
    observer.observe(beat);
  }
);


/* ==========================================
   ALLER À UNE SECTION
========================================== */

function goToBeat(index) {
  const target =
    clamp(
      index,
      0,
      awakeningBeats.length - 1
    );


  awakeningBeats[
    target
  ].scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* ==========================================
   MOLETTE
========================================== */

window.addEventListener(
  "wheel",

  function (event) {
    if (
      Math.abs(
        event.deltaY
      ) <
      8
    ) {
      return;
    }


    event.preventDefault();


    if (wheelLocked) {
      return;
    }


    wheelLocked =
      true;


    goToBeat(
      activeIndex +
      (
        event.deltaY > 0
          ? 1
          : -1
      )
    );


    window.setTimeout(
      function () {
        wheelLocked =
          false;
      },

      850
    );
  },

  {
    passive: false
  }
);


/* ==========================================
   CLAVIER
========================================== */

window.addEventListener(
  "keydown",

  function (event) {
    const acceptedKeys = [
      "ArrowDown",
      "ArrowUp",
      "PageDown",
      "PageUp",
      " "
    ];


    if (
      !acceptedKeys.includes(
        event.key
      )
    ) {
      return;
    }


    if (
      event.target.closest("a")
    ) {
      return;
    }


    event.preventDefault();


    const backward =
      event.key === "ArrowUp" ||
      event.key === "PageUp";


    goToBeat(
      activeIndex +
      (
        backward
          ? -1
          : 1
      )
    );
  }
);


/* ==========================================
   MOBILE
========================================== */

window.addEventListener(
  "touchstart",

  function (event) {
    touchStartY =
      event
        .changedTouches[0]
        .clientY;
  },

  {
    passive: true
  }
);


window.addEventListener(
  "touchend",

  function (event) {
    const difference =
      touchStartY -
      event
        .changedTouches[0]
        .clientY;


    if (
      Math.abs(
        difference
      ) <
      45 ||
      wheelLocked
    ) {
      return;
    }


    wheelLocked =
      true;


    goToBeat(
      activeIndex +
      (
        difference > 0
          ? 1
          : -1
      )
    );


    window.setTimeout(
      function () {
        wheelLocked =
          false;
      },

      850
    );
  },

  {
    passive: true
  }
);


/* ==========================================
   INITIALISATION
========================================== */

window.history.scrollRestoration =
  "manual";


window.scrollTo(
  0,
  0
);


createDust();


activateScene(0);
