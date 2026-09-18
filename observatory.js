/* ==========================================
   THE MUSEUM OF DREAMS
   FINAL GALLERY — DREAM OBSERVATORY
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


function escapeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}


/* ==========================================
   ÉLÉMENTS
========================================== */

const page =
  document.querySelector(
    ".observatory-page"
  );


const openObservatory =
  document.querySelector(
    "#open-observatory"
  );


const livingArchive =
  document.querySelector(
    "#living-archive"
  );


const dreamPointsContainer =
  document.querySelector(
    "#dream-points"
  );


const dreamCard =
  document.querySelector(
    "#dream-card"
  );


const dreamCardNumber =
  document.querySelector(
    "#dream-card-number"
  );


const dreamCardStatus =
  document.querySelector(
    "#dream-card-status"
  );


const dreamCardFragment =
  document.querySelector(
    "#dream-card-fragment"
  );


const dreamCardEmotion =
  document.querySelector(
    "#dream-card-emotion"
  );


const dreamCardRoom =
  document.querySelector(
    "#dream-card-room"
  );


const emotionFilters =
  Array.from(
    document.querySelectorAll(
      ".emotion-filter"
    )
  );


const visibleDreamCount =
  document.querySelector(
    "#visible-dream-count"
  );


const personalDreamSection =
  document.querySelector(
    "#personal-dream"
  );


const personalDreamFragment =
  document.querySelector(
    "#personal-dream-fragment"
  );


const installationPanel =
  document.querySelector(
    "#installation-panel"
  );


const openNotes =
  document.querySelector(
    "#open-notes"
  );


const closeNotes =
  document.querySelector(
    "#close-notes"
  );


const progressFill =
  document.querySelector(
    "#observatory-progress-fill"
  );


const observatoryInstruction =
  document.querySelector(
    "#observatory-instruction"
  );


const caseStudyEntry =
  document.querySelector(
    ".case-study-entry"
  );


/* ==========================================
   COLLECTION DE RÊVES

   Les positions sont exprimées en
   pourcentages dans la constellation.
========================================== */

const dreams = [
  {
    id: "DREAM 0001",
    fragment:
      "I opened a door and found the ocean behind it.",
    emotion: "wonder",
    room: "adventure",
    x: 19,
    y: 27
  },

  {
    id: "DREAM 0002",
    fragment:
      "Someone was waiting for me, but I never saw their face.",
    emotion: "desire",
    room: "romance",
    x: 35,
    y: 19
  },

  {
    id: "DREAM 0003",
    fragment:
      "My childhood bedroom had grown larger than the house.",
    emotion: "nostalgia",
    room: "childhood",
    x: 52,
    y: 25
  },

  {
    id: "DREAM 0004",
    fragment:
      "The staircase continued above the clouds.",
    emotion: "wonder",
    room: "adventure",
    x: 70,
    y: 18
  },

  {
    id: "DREAM 0005",
    fragment:
      "The train arrived, but there was no station.",
    emotion: "confusion",
    room: "everyday",
    x: 84,
    y: 32
  },

  {
    id: "DREAM 0006",
    fragment:
      "I was late for something that had never been explained.",
    emotion: "urgency",
    room: "action",
    x: 12,
    y: 48
  },

  {
    id: "DREAM 0007",
    fragment:
      "The house knew my name before I entered.",
    emotion: "fear",
    room: "nightmare",
    x: 28,
    y: 43
  },

  {
    id: "DREAM 0008",
    fragment:
      "We recognised each other without remembering from where.",
    emotion: "desire",
    room: "romance",
    x: 44,
    y: 48
  },

  {
    id: "DREAM 0009",
    fragment:
      "Every window opened onto a different morning.",
    emotion: "wonder",
    room: "everyday",
    x: 61,
    y: 42
  },

  {
    id: "DREAM 0010",
    fragment:
      "I found a voice I had forgotten inside an old telephone.",
    emotion: "nostalgia",
    room: "childhood",
    x: 78,
    y: 51
  },

  {
    id: "DREAM 0011",
    fragment:
      "The city moved beneath me faster than the motorcycle.",
    emotion: "urgency",
    room: "action",
    x: 91,
    y: 57
  },

  {
    id: "DREAM 0012",
    fragment:
      "Something was breathing on the other side of the wall.",
    emotion: "fear",
    room: "nightmare",
    x: 18,
    y: 69
  },

  {
    id: "DREAM 0013",
    fragment:
      "The person beside me kept changing, but the feeling stayed.",
    emotion: "desire",
    room: "romance",
    x: 34,
    y: 73
  },

  {
    id: "DREAM 0014",
    fragment:
      "I returned home and discovered a room no one remembered.",
    emotion: "nostalgia",
    room: "childhood",
    x: 51,
    y: 66
  },

  {
    id: "DREAM 0015",
    fragment:
      "The forest was growing from the wrong side of the sky.",
    emotion: "wonder",
    room: "adventure",
    x: 68,
    y: 71
  },

  {
    id: "DREAM 0016",
    fragment:
      "Everyone understood the instructions except me.",
    emotion: "confusion",
    room: "everyday",
    x: 83,
    y: 75
  },

  {
    id: "DREAM 0017",
    fragment:
      "I was running, but the corridor was running too.",
    emotion: "urgency",
    room: "action",
    x: 42,
    y: 88
  },

  {
    id: "DREAM 0018",
    fragment:
      "The room went silent before I realised I was not alone.",
    emotion: "fear",
    room: "nightmare",
    x: 64,
    y: 87
  }
];


/* ==========================================
   COULEURS
========================================== */

const emotionColours = {
  wonder: {
    colour: "#f3c777",
    glow: "rgba(243,199,119,0.56)"
  },

  desire: {
    colour: "#ff9dbd",
    glow: "rgba(255,157,189,0.56)"
  },

  nostalgia: {
    colour: "#9bc8ff",
    glow: "rgba(155,200,255,0.56)"
  },

  fear: {
    colour: "#a77dea",
    glow: "rgba(167,125,234,0.56)"
  },

  urgency: {
    colour: "#ff5d6f",
    glow: "rgba(255,93,111,0.62)"
  },

  confusion: {
    colour: "#eae7df",
    glow: "rgba(234,231,223,0.5)"
  }
};


let activeEmotion =
  "all";


let selectedDream =
  null;


/* ==========================================
   NORMALISER LES ÉMOTIONS DU FORMULAIRE
========================================== */

function normaliseEmotion(emotion) {
  const value =
    String(emotion || "")
      .toLowerCase();


  const emotionMap = {
    wonder: "wonder",
    joy: "wonder",
    calm: "wonder",

    longing: "desire",
    desire: "desire",
    love: "desire",

    nostalgia: "nostalgia",
    sadness: "nostalgia",

    fear: "fear",
    anxiety: "fear",

    urgency: "urgency",
    excitement: "urgency",

    confusion: "confusion",
    unclassified: "confusion"
  };


  return emotionMap[value] ||
    "confusion";
}


/* ==========================================
   RÉCUPÉRER LE RÊVE SOUMIS
========================================== */

function loadPersonalDream() {
  let storedRecords = [];


  try {
    storedRecords =
      JSON.parse(
        localStorage.getItem(
          "museumDreamRecords"
        ) ||
        "[]"
      );
  } catch (error) {
    storedRecords = [];
  }


  if (
    !Array.isArray(storedRecords) ||
    storedRecords.length === 0
  ) {
    return;
  }


  const record =
    storedRecords[0];


  const personalFragment =
    escapeText(
      record.fragment
    );


  if (!personalFragment) {
    return;
  }


  const personalEntry = {
    id:
      record.id ||
      "YOUR DREAM",

    fragment:
      personalFragment,

    emotion:
      normaliseEmotion(
        record.emotion
      ),

    room:
      escapeText(
        record.room
      ).toLowerCase() ||
      "unclassified",

    x: 52,
    y: 51,

    personal: true
  };


  dreams.push(
    personalEntry
  );


  personalDreamSection.hidden =
    false;


  personalDreamFragment.textContent =
    "“" +
    personalFragment +
    "”";
}


/* ==========================================
   CRÉER LES ÉTOILES INTERACTIVES
========================================== */

function createDreamPoints() {
  dreamPointsContainer.innerHTML =
    "";


  dreams.forEach(
    function (
      dream,
      index
    ) {
      const point =
        document.createElement(
          "button"
        );


      point.type =
        "button";


      point.className =
        "dream-point";


      point.dataset.index =
        String(index);


      point.dataset.emotion =
        dream.emotion;


      if (
        dream.personal
      ) {
        point.dataset.personal =
          "true";
      }


      point.style.left =
        dream.x +
        "%";


      point.style.top =
        dream.y +
        "%";


      point.style.setProperty(
        "--point-size",

        dream.personal
          ? "11px"
          : 4 +
            (
              index %
              4
            ) *
            1.2 +
            "px"
      );


      point.style.setProperty(
        "--pulse-speed",

        2.5 +
        (
          index %
          5
        ) *
        0.45 +
        "s"
      );


      point.setAttribute(
        "aria-label",

        (
          dream.personal
            ? "Your dream"
            : dream.id
        ) +

        ", " +

        dream.emotion
      );


      point.addEventListener(
        "mouseenter",
        function () {
          showDream(
            dream,
            point
          );
        }
      );


      point.addEventListener(
        "focus",
        function () {
          showDream(
            dream,
            point
          );
        }
      );


      point.addEventListener(
        "click",
        function () {
          showDream(
            dream,
            point
          );


          dreamCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      );


      dreamPointsContainer.appendChild(
        point
      );
    }
  );


  visibleDreamCount.textContent =
    String(
      dreams.length
    ).padStart(
      2,
      "0"
    );
}


/* ==========================================
   AFFICHER UN CARTEL
========================================== */

function showDream(
  dream,
  point
) {
  selectedDream =
    dream;


  document
    .querySelectorAll(
      ".dream-point.is-selected"
    )
    .forEach(
      function (
        selectedPoint
      ) {
        selectedPoint.classList.remove(
          "is-selected"
        );
      }
    );


  point.classList.add(
    "is-selected"
  );


  dreamCardNumber.textContent =
    dream.personal
      ? "YOUR DREAM"
      : dream.id;


  dreamCardStatus.textContent =
    dream.personal
      ? "PERSONAL RECORD"
      : "ANONYMOUS RECORD";


  dreamCardFragment.textContent =
    "“" +
    dream.fragment +
    "”";


  dreamCardEmotion.textContent =
    dream.emotion.toUpperCase();


  dreamCardRoom.textContent =
    dream.room.toUpperCase();


  dreamCard.classList.add(
    "is-visible"
  );
}


/* ==========================================
   FILTRER LA CONSTELLATION
========================================== */

function filterDreams(
  emotion
) {
  activeEmotion =
    emotion;


  let visibleCount = 0;


  document
    .querySelectorAll(
      ".dream-point"
    )
    .forEach(
      function (
        point
      ) {
        const matches =
          emotion === "all" ||
          point.dataset.emotion ===
          emotion;


        point.classList.toggle(
          "is-dimmed",
          !matches
        );


        if (matches) {
          visibleCount++;
        }
      }
    );


  emotionFilters.forEach(
    function (
      filter
    ) {
      filter.classList.toggle(
        "is-active",

        filter.dataset.emotion ===
        emotion
      );
    }
  );


  visibleDreamCount.textContent =
    String(
      visibleCount
    ).padStart(
      2,
      "0"
    );


  dreamCard.classList.remove(
    "is-visible"
  );


  selectedDream =
    null;
}


emotionFilters.forEach(
  function (
    filter
  ) {
    filter.addEventListener(
      "click",
      function () {
        filterDreams(
          filter.dataset.emotion
        );


        document
          .querySelector(
            ".constellation-stage"
          )
          .scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
      }
    );
  }
);


/* ==========================================
   ÉTOILES DE FOND
========================================== */

const skyCanvas =
  document.querySelector(
    "#dream-sky"
  );


const skyContext =
  skyCanvas.getContext(
    "2d"
  );


let skyWidth = 0;

let skyHeight = 0;

let skyStars = [];


let pointerX = 0;

let pointerY = 0;

let targetPointerX = 0;

let targetPointerY = 0;


function createSkyStars() {
  skyStars = [];


  const starCount =
    window.innerWidth < 700
      ? 100
      : 190;


  for (
    let index = 0;
    index < starCount;
    index++
  ) {
    skyStars.push({
      x:
        Math.random() *
        skyWidth,

      y:
        Math.random() *
        skyHeight,

      radius:
        0.3 +
        Math.random() *
        1.25,

      opacity:
        0.16 +
        Math.random() *
        0.7,

      speed:
        0.35 +
        Math.random() *
        1.5,

      phase:
        Math.random() *
        Math.PI *
        2,

      depth:
        0.15 +
        Math.random() *
        0.65
    });
  }
}


function resizeSky() {
  const pixelRatio =
    Math.min(
      window.devicePixelRatio ||
      1,
      1.5
    );


  skyWidth =
    window.innerWidth;


  skyHeight =
    window.innerHeight;


  skyCanvas.width =
    skyWidth *
    pixelRatio;


  skyCanvas.height =
    skyHeight *
    pixelRatio;


  skyContext.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );


  createSkyStars();
}


/* ==========================================
   CONNEXIONS DE LA CONSTELLATION
========================================== */

const constellationCanvas =
  document.querySelector(
    "#constellation-canvas"
  );


const constellationContext =
  constellationCanvas.getContext(
    "2d"
  );


const constellationStage =
  document.querySelector(
    "#constellation-stage"
  );


let constellationWidth = 0;

let constellationHeight = 0;


function resizeConstellation() {
  const pixelRatio =
    Math.min(
      window.devicePixelRatio ||
      1,
      1.5
    );


  const bounds =
    constellationStage
      .getBoundingClientRect();


  constellationWidth =
    bounds.width;


  constellationHeight =
    bounds.height;


  constellationCanvas.width =
    constellationWidth *
    pixelRatio;


  constellationCanvas.height =
    constellationHeight *
    pixelRatio;


  constellationContext.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );
}


/* ==========================================
   DESSINER LES CONNEXIONS
========================================== */

function drawConstellation(
  currentTime
) {
  constellationContext.clearRect(
    0,
    0,
    constellationWidth,
    constellationHeight
  );


  const visibleDreams =
    dreams.filter(
      function (
        dream
      ) {
        return (
          activeEmotion ===
          "all"
        ) ||
        dream.emotion ===
        activeEmotion;
      }
    );


  visibleDreams.forEach(
    function (
      dream,
      dreamIndex
    ) {
      visibleDreams.forEach(
        function (
          otherDream,
          otherIndex
        ) {
          if (
            otherIndex <=
            dreamIndex
          ) {
            return;
          }


          const xOne =
            dream.x /
            100 *
            constellationWidth;


          const yOne =
            dream.y /
            100 *
            constellationHeight;


          const xTwo =
            otherDream.x /
            100 *
            constellationWidth;


          const yTwo =
            otherDream.y /
            100 *
            constellationHeight;


          const distance =
            Math.hypot(
              xTwo - xOne,
              yTwo - yOne
            );


          const sameEmotion =
            dream.emotion ===
            otherDream.emotion;


          const maximumDistance =
            sameEmotion
              ? constellationWidth *
                0.28
              : constellationWidth *
                0.13;


          if (
            distance >
            maximumDistance
          ) {
            return;
          }


          const shimmer =
            0.65 +

            Math.sin(
              currentTime *
              0.0008 +

              dreamIndex
            ) *

            0.35;


          const opacity =
            (
              1 -
              distance /
              maximumDistance
            ) *

            (
              sameEmotion
                ? 0.22
                : 0.055
            ) *

            shimmer;


          const colour =
            emotionColours[
              dream.emotion
            ] ||
            emotionColours.confusion;


          constellationContext.beginPath();


          constellationContext.moveTo(
            xOne,
            yOne
          );


          constellationContext.lineTo(
            xTwo,
            yTwo
          );


          constellationContext.strokeStyle =
            colour.glow.replace(
              /[\d.]+\)$/,
              opacity + ")"
            );


          constellationContext.lineWidth =
            sameEmotion
              ? 0.75
              : 0.35;


          constellationContext.stroke();
        }
      );
    }
  );
}


/* ==========================================
   ANIMATION GÉNÉRALE
========================================== */

function animateWorld(
  currentTime
) {
  pointerX +=
    (
      targetPointerX -
      pointerX
    ) *
    0.035;


  pointerY +=
    (
      targetPointerY -
      pointerY
    ) *
    0.035;


  skyContext.clearRect(
    0,
    0,
    skyWidth,
    skyHeight
  );


  skyStars.forEach(
    function (
      star
    ) {
      const twinkle =
        0.68 +

        Math.sin(
          currentTime *
          0.001 *
          star.speed +

          star.phase
        ) *

        0.32;


      skyContext.beginPath();


      skyContext.arc(
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


      skyContext.fillStyle =
        "rgba(234,237,255," +

        star.opacity *
        twinkle +

        ")";


      skyContext.fill();
    }
  );


  drawConstellation(
    currentTime
  );


  window.requestAnimationFrame(
    animateWorld
  );
}


/* ==========================================
   PARALLAXE
========================================== */

window.addEventListener(
  "pointermove",
  function (
    event
  ) {
    const horizontal =
      event.clientX /
      window.innerWidth -
      0.5;


    const vertical =
      event.clientY /
      window.innerHeight -
      0.5;


    targetPointerX =
      horizontal *
      13;


    targetPointerY =
      vertical *
      9;


    page.style.setProperty(
      "--pointer-x",
      horizontal *
      14 +
      "px"
    );


    page.style.setProperty(
      "--pointer-y",
      vertical *
      10 +
      "px"
    );
  },
  {
    passive: true
  }
);


/* ==========================================
   OUVRIR L’OBSERVATOIRE
========================================== */

openObservatory.addEventListener(
  "click",
  function () {
    page.classList.add(
      "archive-open"
    );


    observatoryInstruction.textContent =
      "EXPLORE THE LIVING ARCHIVE";


    window.setTimeout(
      function () {
        livingArchive.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      },
      500
    );
  }
);


/* ==========================================
   NOTES DE L’INSTALLATION
========================================== */

function showInstallationNotes() {
  installationPanel.classList.add(
    "is-open"
  );


  installationPanel.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "panel-open"
  );
}


function hideInstallationNotes() {
  installationPanel.classList.remove(
    "is-open"
  );


  installationPanel.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "panel-open"
  );
}


openNotes.addEventListener(
  "click",
  showInstallationNotes
);


closeNotes.addEventListener(
  "click",
  hideInstallationNotes
);


installationPanel.addEventListener(
  "click",
  function (
    event
  ) {
    if (
      event.target ===
      installationPanel
    ) {
      hideInstallationNotes();
    }
  }
);


window.addEventListener(
  "keydown",
  function (
    event
  ) {
    if (
      event.key ===
      "Escape"
    ) {
      hideInstallationNotes();
    }
  }
);


/* ==========================================
   PROGRESSION DU PARCOURS
========================================== */

function updateScrollProgress() {
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


  progressFill.style.height =
    progress *
    100 +
    "%";


  if (
    !page.classList.contains(
      "archive-open"
    )
  ) {
    observatoryInstruction.textContent =
      "ENTER THE OBSERVATORY";
  } else if (
    progress <
    0.31
  ) {
    observatoryInstruction.textContent =
      "SELECT A DREAM";
  } else if (
    progress <
    0.6
  ) {
    observatoryInstruction.textContent =
      "EXPLORE BY FEELING";
  } else if (
    progress <
    0.84
  ) {
    observatoryInstruction.textContent =
      "VIEW THE INSTALLATION";
  } else {
    observatoryInstruction.textContent =
      "COMPLETE THE VISIT";
  }
}


/* ==========================================
   TRANSITION VERS LA CASE STUDY
========================================== */

caseStudyEntry.addEventListener(
  "click",
  function (
    event
  ) {
    event.preventDefault();


    if (
      page.classList.contains(
        "leaving-observatory"
      )
    ) {
      return;
    }


    page.classList.add(
      "leaving-observatory"
    );


    window.setTimeout(
      function () {
        window.location.href =
          "case-study.html";
      },
      1150
    );
  }
);


/* ==========================================
   REDIMENSIONNEMENT
========================================== */

function resizeWorld() {
  resizeSky();

  resizeConstellation();
}

/* ==========================================
   SUPPRIMER LE RÊVE PERSONNEL
========================================== */

const removePersonalDream =
  document.querySelector(
    "#remove-personal-dream"
  );


if (removePersonalDream) {
  removePersonalDream.addEventListener(
    "click",
    function () {
      const confirmation =
        window.confirm(
          "Remove your dream from this device?"
        );


      if (!confirmation) {
        return;
      }


      localStorage.removeItem(
        "museumDreamRecords"
      );


      window.location.reload();
    }
  );
}

/* ==========================================
   INITIALISATION
========================================== */

loadPersonalDream();

createDreamPoints();

resizeWorld();

updateScrollProgress();


window.requestAnimationFrame(
  animateWorld
);


window.addEventListener(
  "scroll",
  updateScrollProgress,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  resizeWorld
);
