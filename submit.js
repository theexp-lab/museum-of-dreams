/* ==========================================
   THE MUSEUM OF DREAMS
   SUBMIT YOUR DREAM
========================================== */


/* ==========================================
   ÉLÉMENTS HTML
========================================== */

const page =
  document.body;


const beginRecord =
  document.querySelector(
    "#begin-record"
  );


const intakeSection =
  document.querySelector(
    "#intake-section"
  );


const dreamForm =
  document.querySelector(
    "#dream-form"
  );


const dreamText =
  document.querySelector(
    "#dream-text"
  );


const characterCount =
  document.querySelector(
    "#character-count"
  );


const intensityInput =
  document.querySelector(
    "#dream-intensity"
  );


const intensityOutput =
  document.querySelector(
    "#intensity-output"
  );


const formError =
  document.querySelector(
    "#form-error"
  );


const recordSection =
  document.querySelector(
    "#record-section"
  );


const copyRecord =
  document.querySelector(
    "#copy-record"
  );


const newRecord =
  document.querySelector(
    "#new-record"
  );


const floatingWords =
  document.querySelector(
    "#floating-words"
  );


const memoryCanvas =
  document.querySelector(
    "#memory-canvas"
  );


const recordNumber =
  document.querySelector(
    "#record-number"
  );


const recordRoom =
  document.querySelector(
    "#record-room"
  );


const recordTitle =
  document.querySelector(
    "#record-title"
  );


const recordFragment =
  document.querySelector(
    "#record-fragment"
  );


const recordEmotion =
  document.querySelector(
    "#record-emotion"
  );


const recordIntensity =
  document.querySelector(
    "#record-intensity"
  );


const recordLocation =
  document.querySelector(
    "#record-location"
  );


let currentRecord =
  null;


/* ==========================================
   OUTILS
========================================== */

function pad(value) {
  return String(
    value
  ).padStart(
    2,
    "0"
  );
}


function createRecordId() {
  const date =
    new Date();


  let randomNumber;


  if (
    window.crypto &&
    window.crypto.getRandomValues
  ) {
    const values =
      new Uint32Array(1);


    window.crypto.getRandomValues(
      values
    );


    randomNumber =
      values[0] %
      10000;
  } else {
    randomNumber =
      Math.floor(
        Math.random() *
        10000
      );
  }


  return (
    "DREAM · " +

    date.getFullYear() +

    pad(
      date.getMonth() +
      1
    ) +

    pad(
      date.getDate()
    ) +

    " · " +

    String(
      randomNumber
    ).padStart(
      4,
      "0"
    )
  );
}


/* ==========================================
   MOTS FLOTTANTS
========================================== */

function createFloatingWords() {
  const words = [
    "FRAGMENT",
    "VOICE",
    "PLACE",
    "FEELING",
    "COLOUR",
    "FACE",
    "MOVEMENT",
    "MEMORY",
    "SOMEONE",
    "SOMEWHERE",
    "IMPOSSIBLE",
    "MORNING",
    "RECALL",
    "DREAM"
  ];


  for (
    let index = 0;
    index < 28;
    index += 1
  ) {
    const word =
      document.createElement(
        "span"
      );


    word.textContent =
      words[
        Math.floor(
          Math.random() *
          words.length
        )
      ];


    word.style.left =
      Math.random() *
      92 +
      "%";


    word.style.top =
      Math.random() *
      94 +
      "%";


    word.style.setProperty(
      "--duration",

      5 +
      Math.random() *
      7 +
      "s"
    );


    word.style.setProperty(
      "--delay",

      Math.random() *
      -8 +
      "s"
    );


    floatingWords.appendChild(
      word
    );
  }
}


/* ==========================================
   COMPTEUR ET INTENSITÉ
========================================== */

function updateCharacterCount() {
  characterCount.textContent =
    dreamText.value.length;
}


function updateIntensity() {
  intensityOutput.value =
    pad(
      intensityInput.value
    );


  intensityOutput.textContent =
    pad(
      intensityInput.value
    );
}


/* ==========================================
   SAUVEGARDE LOCALE
========================================== */

function saveRecord(record) {
  const previousRecords =
    JSON.parse(
      localStorage.getItem(
        "museumDreamRecords"
      ) ||
      "[]"
    );


  previousRecords.unshift(
    record
  );


  localStorage.setItem(
    "museumDreamRecords",

    JSON.stringify(
      previousRecords.slice(
        0,
        20
      )
    )
  );
}


/* ==========================================
   AFFICHER LE CARTEL
========================================== */

function displayRecord(record) {
  recordNumber.textContent =
    record.id;


  recordRoom.textContent =
    record.room.toUpperCase() +
    " COLLECTION";


  recordTitle.textContent =
    record.title ||
    "UNTITLED DREAM";


  recordFragment.textContent =
    "“" +
    record.fragment +
    "”";


  recordEmotion.textContent =
    record.emotion.toUpperCase();


  recordIntensity.textContent =
    pad(
      record.intensity
    ) +
    " / 10";


  recordLocation.textContent =
    record.location
      ? record.location.toUpperCase()
      : "NOT RECORDED";


  page.classList.add(
    "record-created"
  );


  recordSection.classList.add(
    "is-visible"
  );


  recordSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* ==========================================
   CONSTRUIRE LE CARTEL
========================================== */

function buildRecord() {
  const data =
    new FormData(
      dreamForm
    );


  return {
    id:
      createRecordId(),

    fragment:
      String(
        data.get("dream") ||
        ""
      ).trim(),

    emotion:
      String(
        data.get("emotion") ||
        "Unclassified"
      ),

    room:
      String(
        data.get("room") ||
        "Unclassified"
      ),

    title:
      String(
        data.get("title") ||
        ""
      ).trim(),

    location:
      String(
        data.get("location") ||
        ""
      ).trim(),

    intensity:
      Number(
        data.get("intensity") ||
        5
      ),

    createdAt:
      new Date().toISOString()
  };
}


/* ==========================================
   FORMAT À COPIER
========================================== */

function recordAsText(record) {
  return [
    "THE MUSEUM OF DREAMS",

    record.id,

    "",

    record.title ||
    "UNTITLED DREAM",

    "ROOM: " +
    record.room.toUpperCase(),

    "EMOTIONAL CORE: " +
    record.emotion.toUpperCase(),

    "INTENSITY: " +
    pad(
      record.intensity
    ) +
    " / 10",

    "LOCATION: " +
    (
      record.location ||
      "NOT RECORDED"
    ),

    "",

    record.fragment
  ].join(
    "\n"
  );
}


/* ==========================================
   COMMENCER LE FORMULAIRE
========================================== */

beginRecord.addEventListener(
  "click",

  function () {
    intakeSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    window.setTimeout(
      function () {
        dreamText.focus({
          preventScroll: true
        });
      },

      700
    );
  }
);


dreamText.addEventListener(
  "input",
  updateCharacterCount
);


intensityInput.addEventListener(
  "input",
  updateIntensity
);


/* ==========================================
   CRÉER LE CARTEL
========================================== */

dreamForm.addEventListener(
  "submit",

  function (event) {
    event.preventDefault();


    formError.textContent =
      "";


    if (
      !dreamForm.checkValidity()
    ) {
      formError.textContent =
        "COMPLETE THE REQUIRED PARTS OF THE RECORD.";


      dreamForm.reportValidity();


      return;
    }


    currentRecord =
      buildRecord();


    if (
      currentRecord.fragment.length <
      12
    ) {
      formError.textContent =
        "ADD A LITTLE MORE OF WHAT YOU REMEMBER.";


      dreamText.focus();


      return;
    }


    saveRecord(
      currentRecord
    );


    displayRecord(
      currentRecord
    );
  }
);


/* ==========================================
   COPIER LE CARTEL
========================================== */

copyRecord.addEventListener(
  "click",

  async function () {
    if (!currentRecord) {
      return;
    }


    try {
      await navigator.clipboard.writeText(
        recordAsText(
          currentRecord
        )
      );


      copyRecord.textContent =
        "DREAM SAVED";
    } catch (error) {
      copyRecord.textContent =
        "COPY UNAVAILABLE";
    }


    window.setTimeout(
      function () {
        copyRecord.textContent =
          "COPY DREAM RECORD";
      },

      1800
    );
  }
);


/* ==========================================
   NOUVEAU RÊVE
========================================== */

newRecord.addEventListener(
  "click",

  function () {
    currentRecord =
      null;


    dreamForm.reset();


    updateCharacterCount();


    updateIntensity();


    page.classList.remove(
      "record-created"
    );


    recordSection.classList.remove(
      "is-visible"
    );


    intakeSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
);


/* ==========================================
   PARTICULES DU CANVAS
========================================== */

const context =
  memoryCanvas.getContext(
    "2d"
  );


let canvasWidth =
  0;


let canvasHeight =
  0;


let particles =
  [];


function resizeCanvas() {
  const ratio =
    Math.min(
      window.devicePixelRatio ||
      1,

      2
    );


  canvasWidth =
    window.innerWidth;


  canvasHeight =
    window.innerHeight;


  memoryCanvas.width =
    canvasWidth *
    ratio;


  memoryCanvas.height =
    canvasHeight *
    ratio;


  context.setTransform(
    ratio,
    0,
    0,
    ratio,
    0,
    0
  );


  const particleCount =
    window.innerWidth < 700
      ? 22
      : 42;


  particles =
    Array.from(
      {
        length:
          particleCount
      },

      function () {
        return {
          x:
            Math.random() *
            canvasWidth,

          y:
            Math.random() *
            canvasHeight,

          radius:
            0.5 +
            Math.random() *
            1.3,

          speed:
            0.08 +
            Math.random() *
            0.18,

          opacity:
            0.1 +
            Math.random() *
            0.35
        };
      }
    );
}


function animateCanvas() {
  context.clearRect(
    0,
    0,
    canvasWidth,
    canvasHeight
  );


  particles.forEach(
    function (particle) {
      particle.y -=
        particle.speed;


      if (
        particle.y <
        -5
      ) {
        particle.y =
          canvasHeight +
          5;
      }


      context.beginPath();


      context.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI *
        2
      );


      context.fillStyle =
        "rgba(91,113,123," +
        particle.opacity +
        ")";


      context.fill();
    }
  );


  window.requestAnimationFrame(
    animateCanvas
  );
}


/* ==========================================
   INITIALISATION
========================================== */

createFloatingWords();


updateCharacterCount();


updateIntensity();


resizeCanvas();


window.requestAnimationFrame(
  animateCanvas
);


window.addEventListener(
  "resize",
  resizeCanvas
);
