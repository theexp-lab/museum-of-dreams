/* ==========================================
   THE MUSEUM OF DREAMS
   CASE STUDY — REDESIGN
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


const sections =
  Array.from(
    document.querySelectorAll(
      ".accordion-section"
    )
  );


const progressFill =
  document.querySelector(
    "#page-progress-fill"
  );


const pageStatus =
  document.querySelector(
    "#page-status"
  );


const pendingLinks =
  Array.from(
    document.querySelectorAll(
      ".pending-link"
    )
  );


/* ==========================================
   PRÉPARER LES COULEURS
========================================== */

sections.forEach(
  function (
    section
  ) {
    const colour =
      section.dataset.colour ||
      "#7456c5";


    section.style.setProperty(
      "--section-colour",
      colour
    );
  }
);


/* ==========================================
   INFORMATIONS D’UN CHAPITRE
========================================== */

function getSectionInformation(
  section
) {
  const number =
    section
      .querySelector(
        ".accordion-number"
      )
      .textContent
      .trim();


  const title =
    section
      .querySelector(
        ".accordion-heading strong"
      )
      .textContent
      .trim();


  return {
    number: number,
    title: title
  };
}


/* ==========================================
   CHANGER LA COULEUR ACTIVE
========================================== */

function updateActiveColour(
  section
) {
  if (!section) {
    return;
  }


  const colour =
    section.dataset.colour ||
    "#7456c5";


  page.style.setProperty(
    "--active-colour",
    colour
  );
}


/* ==========================================
   FERMER UN CHAPITRE
========================================== */

function closeSection(
  section
) {
  const panel =
    section.querySelector(
      ".accordion-panel"
    );


  const trigger =
    section.querySelector(
      ".accordion-trigger"
    );


  const symbol =
    section.querySelector(
      ".accordion-symbol"
    );


  if (
    !section.classList.contains(
      "is-open"
    )
  ) {
    return;
  }


  /*
   * Passer de height:auto à une valeur
   * mesurable avant de refermer.
   */

  panel.style.height =
    panel.scrollHeight +
    "px";


  panel.offsetHeight;


  section.classList.remove(
    "is-open"
  );


  trigger.setAttribute(
    "aria-expanded",
    "false"
  );


  symbol.textContent =
    "+";


  window.requestAnimationFrame(
    function () {
      panel.style.height =
        "0px";
    }
  );
}


/* ==========================================
   OUVRIR UN CHAPITRE
========================================== */

function openSection(
  section,
  moveToSection
) {
  const panel =
    section.querySelector(
      ".accordion-panel"
    );


  const trigger =
    section.querySelector(
      ".accordion-trigger"
    );


  const symbol =
    section.querySelector(
      ".accordion-symbol"
    );


  /*
   * Une seule section reste ouverte.
   */

  sections.forEach(
    function (
      otherSection
    ) {
      if (
        otherSection !==
        section
      ) {
        closeSection(
          otherSection
        );
      }
    }
  );


  section.classList.add(
    "is-open"
  );


  trigger.setAttribute(
    "aria-expanded",
    "true"
  );


  symbol.textContent =
    "×";


  updateActiveColour(
    section
  );


  /*
   * Ouvrir avec la hauteur réelle
   * du contenu.
   */

  panel.style.height =
    panel.scrollHeight +
    "px";


  window.setTimeout(
    function () {
      if (
        section.classList.contains(
          "is-open"
        )
      ) {
        panel.style.height =
          "auto";
      }
    },
    830
  );


  /*
   * Statut fixe.
   */

  const information =
    getSectionInformation(
      section
    );


  pageStatus.textContent =
    information.number +
    " · " +
    information.title;


  /*
   * Remettre le début du chapitre
   * sous le header.
   */

  if (moveToSection) {
    window.setTimeout(
      function () {
        const destination =
          section
            .getBoundingClientRect()
            .top +

          window.scrollY -

          76;


        window.scrollTo({
          top: destination,
          behavior: "smooth"
        });
      },
      100
    );
  }
}


/* ==========================================
   CLIQUER SUR UN CHAPITRE
========================================== */

sections.forEach(
  function (
    section
  ) {
    const trigger =
      section.querySelector(
        ".accordion-trigger"
      );


    trigger.addEventListener(
      "click",
      function () {
        const alreadyOpen =
          section.classList.contains(
            "is-open"
          );


        if (alreadyOpen) {
          closeSection(
            section
          );


          pageStatus.textContent =
            "CASE STUDY · PROJECT ARCHIVE";
        } else {
          openSection(
            section,
            true
          );
        }
      }
    );
  }
);


/* ==========================================
   INITIALISER LES ACCORDÉONS
========================================== */

function initialiseSections() {
  sections.forEach(
    function (
      section,
      index
    ) {
      const panel =
        section.querySelector(
          ".accordion-panel"
        );


      const trigger =
        section.querySelector(
          ".accordion-trigger"
        );


      const symbol =
        section.querySelector(
          ".accordion-symbol"
        );


      if (
        index ===
        0
      ) {
        section.classList.add(
          "is-open"
        );


        trigger.setAttribute(
          "aria-expanded",
          "true"
        );


        symbol.textContent =
          "×";


        panel.style.height =
          "auto";
      } else {
        section.classList.remove(
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
    }
  );


  updateActiveColour(
    sections[0]
  );
}


/* ==========================================
   LUMIÈRE DE LA SOURIS
========================================== */

let cursorX =
  50;


let cursorY =
  50;


let targetCursorX =
  50;


let targetCursorY =
  50;


window.addEventListener(
  "pointermove",
  function (
    event
  ) {
    targetCursorX =
      event.clientX /
      window.innerWidth *
      100;


    targetCursorY =
      event.clientY /
      window.innerHeight *
      100;
  },
  {
    passive: true
  }
);


function animateCursor() {
  cursorX +=
    (
      targetCursorX -
      cursorX
    ) *
    0.08;


  cursorY +=
    (
      targetCursorY -
      cursorY
    ) *
    0.08;


  page.style.setProperty(
    "--cursor-x",
    cursorX +
    "%"
  );


  page.style.setProperty(
    "--cursor-y",
    cursorY +
    "%"
  );


  window.requestAnimationFrame(
    animateCursor
  );
}


/* ==========================================
   PROGRESSION DE LA PAGE
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
   * Hero.
   */

  if (
    window.scrollY <
    window.innerHeight *
    0.72
  ) {
    pageStatus.textContent =
      "CASE STUDY · INTRODUCTION";


    page.style.setProperty(
      "--active-colour",
      "#7456c5"
    );


    return;
  }


  /*
   * Conclusion.
   */

  if (
    progress >
    0.92
  ) {
    pageStatus.textContent =
      "EXPERIENCE 002 · COMPLETE";


    page.style.setProperty(
      "--active-colour",
      "#7456c5"
    );


    return;
  }


  /*
   * Identifier la section la plus proche
   * du centre visuel de l’écran.
   */

  let closestSection =
    null;


  let closestDistance =
    Infinity;


  sections.forEach(
    function (
      section
    ) {
      const bounds =
        section.getBoundingClientRect();


      const distance =
        Math.abs(
          bounds.top -
          window.innerHeight *
          0.34
        );


      if (
        distance <
        closestDistance
      ) {
        closestDistance =
          distance;


        closestSection =
          section;
      }
    }
  );


  if (closestSection) {
    const information =
      getSectionInformation(
        closestSection
      );


    pageStatus.textContent =
      information.number +
      " · " +
      information.title;


    updateActiveColour(
      closestSection
    );
  }
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
  sections.forEach(
    function (
      section
    ) {
      const panel =
        section.querySelector(
          ".accordion-panel"
        );


      if (
        section.classList.contains(
          "is-open"
        )
      ) {
        panel.style.height =
          "auto";
      }
    }
  );


  updatePageProgress();
}


/* ==========================================
   POLICES CHARGÉES
========================================== */

if (
  document.fonts &&
  document.fonts.ready
) {
  document.fonts.ready.then(
    function () {
      sections.forEach(
        function (
          section
        ) {
          const panel =
            section.querySelector(
              ".accordion-panel"
            );


          if (
            section.classList.contains(
              "is-open"
            )
          ) {
            panel.style.height =
              "auto";
          }
        }
      );
    }
  );
}


/* ==========================================
   INITIALISATION
========================================== */

initialiseSections();

updatePageProgress();


window.requestAnimationFrame(
  animateCursor
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
