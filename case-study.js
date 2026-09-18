/* ==========================================
   THE MUSEUM OF DREAMS
   FINAL CASE STUDY
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


/* ==========================================
   ÉLÉMENTS
========================================== */

const page =
  document.querySelector(
    ".case-study-page"
  );


const chapters =
  Array.from(
    document.querySelectorAll(
      ".case-chapter"
    )
  );


const triggers =
  Array.from(
    document.querySelectorAll(
      ".chapter-trigger"
    )
  );


const progressFill =
  document.querySelector(
    "#case-progress-fill"
  );


const caseStatus =
  document.querySelector(
    "#case-status"
  );


const chapterTransition =
  document.querySelector(
    ".chapter-transition"
  );


const pendingLinks =
  Array.from(
    document.querySelectorAll(
      ".pending-link"
    )
  );


/* ==========================================
   COULEURS DES CHAPITRES
========================================== */

const chapterColours = {
  violet: "#7d66c5",
  blue: "#547ca4",
  rose: "#bb667f",
  gold: "#b18443",
  cyan: "#4f8f98",
  orange: "#b66843",
  green: "#66816c"
};


function updateAccent(
  chapter
) {
  if (!chapter) {
    return;
  }


  const accent =
    chapter.dataset.accent ||
    "violet";


  const colour =
    chapterColours[accent] ||
    chapterColours.violet;


  page.style.setProperty(
    "--active-accent",
    colour
  );
}


/* ==========================================
   FERMER UN CHAPITRE
========================================== */

function closeChapter(
  chapter
) {
  const trigger =
    chapter.querySelector(
      ".chapter-trigger"
    );


  const panel =
    chapter.querySelector(
      ".chapter-panel"
    );


  const symbol =
    chapter.querySelector(
      ".chapter-symbol"
    );


  if (
    !chapter.classList.contains(
      "is-open"
    )
  ) {
    return;
  }


  /*
   * Si la hauteur était devenue automatique,
   * on la reconvertit d’abord en pixels afin
   * que la fermeture puisse être animée.
   */

  panel.style.height =
    panel.scrollHeight +
    "px";


  panel.offsetHeight;


  chapter.classList.remove(
    "is-open"
  );


  trigger.setAttribute(
    "aria-expanded",
    "false"
  );


  symbol.textContent =
    "+";


  panel.style.height =
    "0px";
}


/* ==========================================
   OUVRIR UN CHAPITRE
========================================== */

function openChapter(
  chapter,
  moveToChapter
) {
  const trigger =
    chapter.querySelector(
      ".chapter-trigger"
    );


  const panel =
    chapter.querySelector(
      ".chapter-panel"
    );


  const symbol =
    chapter.querySelector(
      ".chapter-symbol"
    );


  /*
   * Fermer les autres chapitres.
   */

  chapters.forEach(
    function (
      otherChapter
    ) {
      if (
        otherChapter !==
        chapter
      ) {
        closeChapter(
          otherChapter
        );
      }
    }
  );


  chapter.classList.add(
    "is-open"
  );


  trigger.setAttribute(
    "aria-expanded",
    "true"
  );


  symbol.textContent =
    "×";


  updateAccent(
    chapter
  );


  /*
   * Donner au panneau sa hauteur réelle.
   */

  panel.style.height =
    panel.scrollHeight +
    "px";


  /*
   * Après l’animation, la hauteur passe en
   * automatique : le contenu reste responsive.
   */

  window.setTimeout(
    function () {
      if (
        chapter.classList.contains(
          "is-open"
        )
      ) {
        panel.style.height =
          "auto";
      }
    },
    780
  );


  /*
   * Petit flash coloré très discret.
   */

  chapterTransition.classList.remove(
    "is-active"
  );


  chapterTransition.offsetHeight;


  chapterTransition.classList.add(
    "is-active"
  );


  /*
   * Mettre à jour l’indication fixe.
   */

  const number =
    chapter.querySelector(
      ".chapter-number"
    ).textContent.trim();


  const title =
    chapter.querySelector(
      ".chapter-title"
    ).textContent.trim();


  caseStatus.textContent =
    number +
    " · " +
    title;


  /*
   * Replacer proprement le chapitre sous
   * le header fixe.
   */

  if (moveToChapter) {
    window.setTimeout(
      function () {
        const top =
          chapter.getBoundingClientRect().top +
          window.scrollY -
          73;


        window.scrollTo({
          top: top,
          behavior: "smooth"
        });
      },
      100
    );
  }
}


/* ==========================================
   INTERACTION AVEC LES CHAPITRES
========================================== */

triggers.forEach(
  function (
    trigger
  ) {
    trigger.addEventListener(
      "click",
      function () {
        const chapter =
          trigger.closest(
            ".case-chapter"
          );


        const alreadyOpen =
          chapter.classList.contains(
            "is-open"
          );


        if (alreadyOpen) {
          closeChapter(
            chapter
          );


          caseStatus.textContent =
            "CASE STUDY · PROJECT ARCHIVE";
        } else {
          openChapter(
            chapter,
            true
          );
        }
      }
    );
  }
);


/* ==========================================
   INITIALISER LE PREMIER CHAPITRE
========================================== */

function initialiseChapters() {
  chapters.forEach(
    function (
      chapter,
      index
    ) {
      const panel =
        chapter.querySelector(
          ".chapter-panel"
        );


      if (
        index === 0
      ) {
        chapter.classList.add(
          "is-open"
        );


        chapter
          .querySelector(
            ".chapter-trigger"
          )
          .setAttribute(
            "aria-expanded",
            "true"
          );


        chapter
          .querySelector(
            ".chapter-symbol"
          )
          .textContent =
            "×";


        panel.style.height =
          "auto";
      } else {
        chapter.classList.remove(
          "is-open"
        );


        chapter
          .querySelector(
            ".chapter-trigger"
          )
          .setAttribute(
            "aria-expanded",
            "false"
          );


        chapter
          .querySelector(
            ".chapter-symbol"
          )
          .textContent =
            "+";


        panel.style.height =
          "0px";
      }
    }
  );


  updateAccent(
    chapters[0]
  );
}


/* ==========================================
   PROGRESSION ET STATUT
========================================== */

function updatePageProgress() {
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


  /*
   * Introduction.
   */

  if (
    window.scrollY <
    window.innerHeight *
    0.72
  ) {
    caseStatus.textContent =
      "CASE STUDY · INTRODUCTION";

    return;
  }


  /*
   * Conclusion.
   */

  if (
    progress >
    0.93
  ) {
    caseStatus.textContent =
      "EXPERIENCE 002 · COMPLETE";

    page.style.setProperty(
      "--active-accent",
      chapterColours.violet
    );

    return;
  }


  /*
   * Trouver le chapitre le plus proche
   * du centre de l’écran.
   */

  let closestChapter =
    null;


  let closestDistance =
    Infinity;


  chapters.forEach(
    function (
      chapter
    ) {
      const bounds =
        chapter.getBoundingClientRect();


      const distance =
        Math.abs(
          bounds.top -
          window.innerHeight *
          0.32
        );


      if (
        distance <
        closestDistance
      ) {
        closestDistance =
          distance;

        closestChapter =
          chapter;
      }
    }
  );


  if (closestChapter) {
    const number =
      closestChapter
        .querySelector(
          ".chapter-number"
        )
        .textContent
        .trim();


    const title =
      closestChapter
        .querySelector(
          ".chapter-title"
        )
        .textContent
        .trim();


    caseStatus.textContent =
      number +
      " · " +
      title;


    updateAccent(
      closestChapter
    );
  }
}


/* ==========================================
   SOURIS ET LUMIÈRE
========================================== */

window.addEventListener(
  "pointermove",
  function (
    event
  ) {
    const horizontal =
      event.clientX /
      window.innerWidth *
      100;


    const vertical =
      event.clientY /
      window.innerHeight *
      100;


    page.style.setProperty(
      "--cursor-x",
      horizontal +
      "%"
    );


    page.style.setProperty(
      "--cursor-y",
      vertical +
      "%"
    );
  },
  {
    passive: true
  }
);


/* ==========================================
   PARTICULES DE FOND
========================================== */

const particleCanvas =
  document.querySelector(
    "#case-particles"
  );


const particleContext =
  particleCanvas.getContext(
    "2d"
  );


let particleWidth = 0;

let particleHeight = 0;

let particles = [];


function createParticles() {
  particles = [];


  const particleCount =
    window.innerWidth < 700
      ? 28
      : 55;


  for (
    let index = 0;
    index < particleCount;
    index++
  ) {
    particles.push({
      x:
        Math.random() *
        particleWidth,

      y:
        Math.random() *
        particleHeight,

      radius:
        0.35 +
        Math.random() *
        0.9,

      opacity:
        0.08 +
        Math.random() *
        0.23,

      speed:
        0.05 +
        Math.random() *
        0.12,

      drift:
        (
          Math.random() -
          0.5
        ) *
        0.08,

      phase:
        Math.random() *
        Math.PI *
        2
    });
  }
}


function resizeParticles() {
  const pixelRatio =
    Math.min(
      window.devicePixelRatio ||
      1,
      1.5
    );


  particleWidth =
    window.innerWidth;


  particleHeight =
    window.innerHeight;


  particleCanvas.width =
    particleWidth *
    pixelRatio;


  particleCanvas.height =
    particleHeight *
    pixelRatio;


  particleContext.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );


  createParticles();
}


function animateParticles(
  currentTime
) {
  particleContext.clearRect(
    0,
    0,
    particleWidth,
    particleHeight
  );


  particles.forEach(
    function (
      particle
    ) {
      particle.y -=
        particle.speed;


      particle.x +=
        particle.drift;


      if (
        particle.y <
        -5
      ) {
        particle.y =
          particleHeight +
          5;

        particle.x =
          Math.random() *
          particleWidth;
      }


      if (
        particle.x <
        -5
      ) {
        particle.x =
          particleWidth +
          5;
      }


      if (
        particle.x >
        particleWidth +
        5
      ) {
        particle.x =
          -5;
      }


      const breathing =
        0.7 +

        Math.sin(
          currentTime *
          0.001 +

          particle.phase
        ) *

        0.3;


      particleContext.beginPath();


      particleContext.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI *
        2
      );


      particleContext.fillStyle =
        "rgba(71,75,91," +

        particle.opacity *
        breathing +

        ")";


      particleContext.fill();
    }
  );


  window.requestAnimationFrame(
    animateParticles
  );
}


/* ==========================================
   LIENS À CONNECTER PLUS TARD
========================================== */

pendingLinks.forEach(
  function (
    link
  ) {
    link.addEventListener(
      "click",
      function (
        event
      ) {
        event.preventDefault();
      }
    );
  }
);


/* ==========================================
   REDIMENSIONNEMENT
========================================== */

function handleResize() {
  resizeParticles();


  chapters.forEach(
    function (
      chapter
    ) {
      const panel =
        chapter.querySelector(
          ".chapter-panel"
        );


      if (
        chapter.classList.contains(
          "is-open"
        )
      ) {
        panel.style.height =
          "auto";
      }
    }
  );
}


/* ==========================================
   INITIALISATION
========================================== */

initialiseChapters();

resizeParticles();

updatePageProgress();


window.requestAnimationFrame(
  animateParticles
);


window.addEventListener(
  "scroll",
  updatePageProgress,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  handleResize
);
