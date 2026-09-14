/* ==========================================
   THE MUSEUM OF DREAMS
   Prototype 3D interactif

   Three.js est chargé depuis Internet.
   Aucun téléchargement supplémentaire requis.
========================================== */

import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


/* ==========================================
   DONNÉES DU PARCOURS

   Le prototype numérique montre trois salles.
   Les cinq salles existent dans le concept
   complet de l’exposition physique.
========================================== */

const chapters = [

  {
    phase: "HYPNAGOGIA",

    time: "02:17",

    title: "THE THRESHOLD",

    description:
      "The body lets go first. The mind keeps the door open.",

    medium:
      "LIGHT · SPATIAL SOUND · KINETIC SCULPTURE",

    colorOne: 0xd8cfff,

    colorTwo: 0x7762aa,

    background: 0x05050a,

    fog: 0x05050a,

    world: "brain",

    speed: 0.3
  },


  {
    phase: "NREM",

    time: "02:43",

    title: "CHILDHOOD",

    description:
      "A house remembers you smaller than you remember yourself.",

    medium:
      "PAINTED SET · SCULPTURE · SCENT · FIELD RECORDING",

    colorOne: 0xffd7a8,

    colorTwo: 0x7898ff,

    background: 0x100d1b,

    fog: 0x211732,

    world: "childhood",

    speed: 0.45
  },


  {
    phase: "DREAM STATE",

    time: "03:21",

    title: "ADVENTURE",

    description:
      "Gravity loosens. The horizon becomes an invitation.",

    medium:
      "3D LANDSCAPE · WIND · PROJECTION · MOVING ARCHITECTURE",

    colorOne: 0x61ddff,

    colorTwo: 0x3f4eff,

    background: 0x020c1b,

    fog: 0x061942,

    world: "adventure",

    speed: 0.7
  },


  {
    phase: "REM",

    time: "04:06",

    title: "ROMANCE",

    description:
      "Someone without a face knows exactly how you feel.",

    medium:
      "DANCE FILM · PERFUME · MUSIC · TRANSLUCENT TEXTILE",

    colorOne: 0xff7fa9,

    colorTwo: 0x9c67ff,

    background: 0x170817,

    fog: 0x321132,

    world: "romance",

    speed: 0.8
  },


  {
    phase: "REM III",

    time: "05:32",

    title: "THE NIGHTMARE",

    description:
      "The dream notices that you do not belong here.",

    medium:
      "FLASH · DISTORTED SOUND · PURSUIT · PRACTICAL EFFECTS",

    colorOne: 0xff123d,

    colorTwo: 0x62000d,

    background: 0x080003,

    fog: 0x230006,

    world: "nightmare",

    speed: 2
  },


  {
    phase: "AWAKENING",

    time: "05:43",

    title: "OPEN YOUR EYES",

    description:
      "Morning enters before the dream can explain itself.",

    medium:
      "DAWN LIGHT · SILENCE · PARTICIPATORY ARCHIVE",

    colorOne: 0xffe3bf,

    colorTwo: 0x93bbff,

    background: 0x7895b8,

    fog: 0xa0b6cf,

    world: "awakening",

    speed: 0.15
  }

];


/* ==========================================
   RÉCUPÉRATION DES ÉLÉMENTS HTML
========================================== */

const canvas =
  document.querySelector("#dream-world");

const opening =
  document.querySelector("#opening");

const prototype =
  document.querySelector("#prototype");

const enterButton =
  document.querySelector("#enter-prototype");

const replayButton =
  document.querySelector("#replay-button");

const exitButton =
  document.querySelector("#exit-button");

const soundButton =
  document.querySelector("#sound-button");

const previousButton =
  document.querySelector("#previous-button");

const nextButton =
  document.querySelector("#next-button");

const chapterPanel =
  document.querySelector("#chapter-panel");

const chapterNumber =
  document.querySelector("#chapter-number");

const chapterTime =
  document.querySelector("#chapter-time");

const chapterTitle =
  document.querySelector("#chapter-title");

const chapterDescription =
  document.querySelector("#chapter-description");

const chapterMedium =
  document.querySelector("#chapter-medium");

const sleepPhase =
  document.querySelector("#sleep-phase");

const progressFill =
  document.querySelector("#progress-fill");

const clock =
  document.querySelector("#clock");

const dreamDialog =
  document.querySelector("#dream-dialog");

const closeDialog =
  document.querySelector("#close-dialog");

const dreamInput =
  document.querySelector("#dream-input");

const submitDream =
  document.querySelector("#submit-dream");

const viewProjectButton =
  document.querySelector("#view-project-button");


/* ==========================================
   CRÉATION DU MOTEUR 3D
========================================== */

const renderer =
  new THREE.WebGLRenderer({

    canvas: canvas,

    antialias: true,

    alpha: false

  });

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.outputColorSpace =
  THREE.SRGBColorSpace;


/* ==========================================
   SCÈNE ET CAMÉRA
========================================== */

const scene =
  new THREE.Scene();

scene.background =
  new THREE.Color(0x05050a);

scene.fog =
  new THREE.FogExp2(
    0x05050a,
    0.035
  );


const camera =
  new THREE.PerspectiveCamera(

    55,

    window.innerWidth /
    window.innerHeight,

    0.1,

    200

  );

camera.position.set(
  0,
  0,
  13
);


/* Groupe contenant tout l’univers */

const dreamWorld =
  new THREE.Group();

scene.add(dreamWorld);


/* ==========================================
   ÉTOILES ET PARTICULES MENTALES
========================================== */

const particleCount =
  window.innerWidth < 700
    ? 1600
    : 3500;

const particlePositions =
  new Float32Array(
    particleCount * 3
  );


for (
  let index = 0;
  index < particleCount;
  index++
) {

  const radius =
    3 + Math.random() * 34;

  const theta =
    Math.random() * Math.PI * 2;

  const phi =
    Math.acos(
      2 * Math.random() - 1
    );


  particlePositions[index * 3] =
    radius *
    Math.sin(phi) *
    Math.cos(theta);


  particlePositions[index * 3 + 1] =
    radius *
    Math.sin(phi) *
    Math.sin(theta);


  particlePositions[index * 3 + 2] =
    radius *
    Math.cos(phi);

}


const particleGeometry =
  new THREE.BufferGeometry();

particleGeometry.setAttribute(

  "position",

  new THREE.BufferAttribute(
    particlePositions,
    3
  )

);


const particleMaterial =
  new THREE.PointsMaterial({

    color: 0xcbbdff,

    size: 0.035,

    transparent: true,

    opacity: 0.78,

    blending:
      THREE.AdditiveBlending,

    depthWrite: false

  });


const particles =
  new THREE.Points(

    particleGeometry,

    particleMaterial

  );

dreamWorld.add(particles);


/* ==========================================
   CERVEAU 3D

   Plusieurs formes organiques sont assemblées
   pour créer un cerveau abstrait.
========================================== */

const brainGroup =
  new THREE.Group();


const brainMaterial =
  new THREE.MeshBasicMaterial({

    color: 0xd8cfff,

    wireframe: true,

    transparent: true,

    opacity: 0.2

  });


for (
  let index = 0;
  index < 22;
  index++
) {

  const brainPart =
    new THREE.Mesh(

      new THREE.IcosahedronGeometry(
        0.55 + Math.random() * 0.5,
        2
      ),

      brainMaterial

    );


  const angle =
    (index / 22) *
    Math.PI *
    2;


  brainPart.position.set(

    Math.cos(angle) *
    (1.5 + Math.random()),

    (Math.random() - 0.5) *
    2.7,

    Math.sin(angle) *
    1.15

  );


  brainPart.scale.set(
    1.35,
    0.9,
    1
  );


  brainGroup.add(brainPart);

}

dreamWorld.add(brainGroup);


/* ==========================================
   CONNEXIONS NEURONALES
========================================== */

const neuronGroup =
  new THREE.Group();


for (
  let index = 0;
  index < 35;
  index++
) {

  const start =
    new THREE.Vector3(

      (Math.random() - 0.5) * 5,

      (Math.random() - 0.5) * 4,

      (Math.random() - 0.5) * 3

    );


  const end =
    new THREE.Vector3(

      (Math.random() - 0.5) * 5,

      (Math.random() - 0.5) * 4,

      (Math.random() - 0.5) * 3

    );


  const connectionGeometry =
    new THREE.BufferGeometry()
      .setFromPoints([
        start,
        end
      ]);


  const connectionMaterial =
    new THREE.LineBasicMaterial({

      color: 0xbcadff,

      transparent: true,

      opacity: 0.15

    });


  const connection =
    new THREE.Line(

      connectionGeometry,

      connectionMaterial

    );


  neuronGroup.add(connection);

}

dreamWorld.add(neuronGroup);


/* ==========================================
   SALLE CHILDHOOD

   Objets géométriques flottants qui évoquent
   des souvenirs incomplets.
========================================== */

const childhoodGroup =
  new THREE.Group();


const childhoodMaterial =
  new THREE.MeshBasicMaterial({

    color: 0xffd7a8,

    wireframe: true,

    transparent: true,

    opacity: 0

  });


for (
  let index = 0;
  index < 30;
  index++
) {

  let objectGeometry;


  if (index % 3 === 0) {

    objectGeometry =
      new THREE.BoxGeometry(
        0.5,
        0.5,
        0.5
      );

  } else {

    objectGeometry =
      new THREE.SphereGeometry(
        0.28,
        12,
        12
      );

  }


  const memory =
    new THREE.Mesh(

      objectGeometry,

      childhoodMaterial

    );


  memory.position.set(

    (Math.random() - 0.5) * 12,

    (Math.random() - 0.5) * 8,

    (Math.random() - 0.5) * 12

  );


  memory.rotation.set(

    Math.random() * Math.PI,

    Math.random() * Math.PI,

    Math.random() * Math.PI

  );


  childhoodGroup.add(memory);

}


childhoodGroup.visible = false;

dreamWorld.add(childhoodGroup);


/* ==========================================
   SALLE ADVENTURE

   Tunnel composé d’anneaux successifs.
========================================== */

const adventureGroup =
  new THREE.Group();


const adventureMaterial =
  new THREE.MeshBasicMaterial({

    color: 0x61ddff,

    wireframe: true,

    transparent: true,

    opacity: 0

  });


for (
  let index = 0;
  index < 22;
  index++
) {

  const ring =
    new THREE.Mesh(

      new THREE.TorusGeometry(
        3 + index * 0.08,
        0.025,
        6,
        70
      ),

      adventureMaterial

    );


  ring.position.z =
    -index * 1.4;


  ring.rotation.z =
    index * 0.16;


  adventureGroup.add(ring);

}


adventureGroup.visible = false;

dreamWorld.add(adventureGroup);


/* ==========================================
   SALLE ROMANCE

   Formes organiques entrelacées.
========================================== */

const romanceGroup =
  new THREE.Group();


const romanceMaterial =
  new THREE.MeshBasicMaterial({

    color: 0xff7fa9,

    wireframe: true,

    transparent: true,

    opacity: 0

  });


for (
  let index = 0;
  index < 7;
  index++
) {

  const ribbon =
    new THREE.Mesh(

      new THREE.TorusKnotGeometry(
        1.3 + index * 0.16,
        0.05,
        100,
        12,
        2,
        3
      ),

      romanceMaterial

    );


  ribbon.rotation.set(

    Math.random() * Math.PI,

    Math.random() * Math.PI,

    Math.random() * Math.PI

  );


  romanceGroup.add(ribbon);

}


romanceGroup.visible = false;

dreamWorld.add(romanceGroup);


/* ==========================================
   CAUCHEMAR

   Éclats pointus et instables.
========================================== */

const nightmareGroup =
  new THREE.Group();


const nightmareMaterial =
  new THREE.MeshBasicMaterial({

    color: 0xff123d,

    wireframe: true,

    transparent: true,

    opacity: 0

  });


for (
  let index = 0;
  index < 55;
  index++
) {

  const shard =
    new THREE.Mesh(

      new THREE.ConeGeometry(
        0.12 + Math.random() * 0.22,
        1 + Math.random() * 2.5,
        4
      ),

      nightmareMaterial

    );


  shard.position.set(

    (Math.random() - 0.5) * 15,

    (Math.random() - 0.5) * 10,

    (Math.random() - 0.5) * 15

  );


  shard.rotation.set(

    Math.random() * Math.PI,

    Math.random() * Math.PI,

    Math.random() * Math.PI

  );


  nightmareGroup.add(shard);

}


nightmareGroup.visible = false;

dreamWorld.add(nightmareGroup);


/* ==========================================
   ÉTAT GÉNÉRAL DU PROTOTYPE
========================================== */

let currentChapter = 0;

let prototypeStarted = false;

let elapsedTime = 0;

let transitionPulse = 0;


/* Position de la souris */

const mouse = new THREE.Vector2();


window.addEventListener(
  "pointermove",
  function (event) {

    mouse.x =
      (
        event.clientX /
        window.innerWidth
      ) * 2 - 1;


    mouse.y =
      -(
        event.clientY /
        window.innerHeight
      ) * 2 + 1;

  }
);


/* ==========================================
   AFFICHER OU CACHER LES UNIVERS
========================================== */

function changeWorld(worldName) {

  childhoodGroup.visible =
    worldName === "childhood";

  adventureGroup.visible =
    worldName === "adventure";

  romanceGroup.visible =
    worldName === "romance";

  nightmareGroup.visible =
    worldName === "nightmare";


  brainGroup.visible =
    worldName === "brain" ||
    worldName === "awakening";


  neuronGroup.visible =
    worldName === "brain" ||
    worldName === "nightmare";


  if (childhoodGroup.visible) {

    childhoodMaterial.opacity =
      0.38;

  }


  if (adventureGroup.visible) {

    adventureMaterial.opacity =
      0.35;

  }


  if (romanceGroup.visible) {

    romanceMaterial.opacity =
      0.3;

  }


  if (nightmareGroup.visible) {

    nightmareMaterial.opacity =
      0.75;

  }

}


/* ==========================================
   CHANGER DE CHAPITRE
========================================== */

function displayChapter(index) {

  const chapter =
    chapters[index];


  currentChapter =
    index;


  transitionPulse =
    1;


  chapterPanel.classList.add(
    "changing"
  );


  window.setTimeout(
    function () {

      sleepPhase.textContent =
        chapter.phase;

      chapterNumber.textContent =
        "PHASE " +
        String(index + 1)
          .padStart(2, "0");

      chapterTime.textContent =
        chapter.time;

      chapterTitle.textContent =
        chapter.title;

      chapterDescription.textContent =
        chapter.description;

      chapterMedium.textContent =
        chapter.medium;


      progressFill.style.width =
        (
          (
            index + 1
          ) /
          chapters.length *
          100
        ) + "%";


      chapterPanel.classList.remove(
        "changing"
      );


      changeWorld(
        chapter.world
      );

    },
    330
  );


  if (
    index ===
    chapters.length - 1
  ) {

    nextButton.textContent =
      "↗";

    nextButton.setAttribute(
      "aria-label",
      "Enter the waking room"
    );

  } else {

    nextButton.textContent =
      "→";

    nextButton.setAttribute(
      "aria-label",
      "Next space"
    );

  }


  updateSoundForChapter(
    chapter
  );

}


/* ==========================================
   LANCER LE PROTOTYPE
========================================== */

function enterPrototype() {

  prototypeStarted =
    true;


  currentChapter =
    0;


  document.body.classList.add(
    "prototype-active"
  );


  window.scrollTo({
    top: 0,
    behavior: "instant"
  });


  opening.classList.add(
    "hidden"
  );


  prototype.classList.remove(
    "hidden"
  );


  displayChapter(0);

}


enterButton.addEventListener(
  "click",
  enterPrototype
);


replayButton.addEventListener(
  "click",
  enterPrototype
);


/* ==========================================
   QUITTER LE PROTOTYPE
========================================== */

function leavePrototype() {

  prototypeStarted =
    false;


  if (dreamDialog.open) {

    dreamDialog.close();

  }


  prototype.classList.add(
    "hidden"
  );


  document.body.classList.remove(
    "prototype-active"
  );


  stopDreamSound();


  soundButton.textContent =
    "SOUND OFF";


  soundButton.setAttribute(
    "aria-pressed",
    "false"
  );


  document
    .querySelector("#case-study")
    .scrollIntoView({

      behavior: "smooth"

    });

}


exitButton.addEventListener(
  "click",
  leavePrototype
);


viewProjectButton.addEventListener(
  "click",
  leavePrototype
);


/* ==========================================
   NAVIGATION ENTRE LES SALLES
========================================== */

function goToNextChapter() {

  if (
    currentChapter ===
    chapters.length - 1
  ) {

    dreamDialog.showModal();

    return;

  }


  displayChapter(
    currentChapter + 1
  );

}


function goToPreviousChapter() {

  const previousIndex =
    Math.max(
      0,
      currentChapter - 1
    );


  displayChapter(
    previousIndex
  );

}


nextButton.addEventListener(
  "click",
  goToNextChapter
);


previousButton.addEventListener(
  "click",
  goToPreviousChapter
);


/* Navigation au clavier */

window.addEventListener(
  "keydown",
  function (event) {

    if (
      !prototypeStarted ||
      dreamDialog.open
    ) {

      return;

    }


    if (
      event.key === "ArrowRight"
    ) {

      goToNextChapter();

    }


    if (
      event.key === "ArrowLeft"
    ) {

      goToPreviousChapter();

    }

  }
);


/* ==========================================
   FENÊTRE D’ENVOI DU RÊVE
========================================== */

closeDialog.addEventListener(
  "click",
  function () {

    dreamDialog.close();

  }
);


submitDream.addEventListener(
  "click",
  function () {

    const dream =
      dreamInput.value.trim();


    if (!dream) {

      dreamInput.focus();

      return;

    }


    localStorage.setItem(
      "museum-of-dreams-fragment",
      dream
    );


    submitDream.textContent =
      "DREAM RECEIVED";


    dreamInput.disabled =
      true;

  }
);


/* Retrouver le rêve enregistré */

const savedDream =
  localStorage.getItem(
    "museum-of-dreams-fragment"
  );


if (savedDream) {

  dreamInput.value =
    savedDream;

}


/* ==========================================
   HORLOGE D’ENDORMISSEMENT
========================================== */

let clockSeconds =
  17;


window.setInterval(
  function () {

    clockSeconds++;


    const seconds =
      String(clockSeconds % 60)
        .padStart(2, "0");


    const minutes =
      String(
        17 +
        Math.floor(
          clockSeconds / 60
        )
      ).padStart(2, "0");


    clock.textContent =
      "02:" +
      minutes +
      ":" +
      seconds;

  },
  1000
);


/* ==========================================
   AMBIANCE SONORE GÉNÉRATIVE

   Le son est fabriqué par le navigateur.
   Aucun fichier audio externe n’est utilisé.
========================================== */

let audioContext;

let masterVolume;

let lowDrone;

let highDrone;


function startDreamSound() {

  if (audioContext) {

    return;

  }


  audioContext =
    new AudioContext();


  masterVolume =
    audioContext.createGain();


  masterVolume.gain.setValueAtTime(

    0.0001,

    audioContext.currentTime

  );


  masterVolume.gain
    .exponentialRampToValueAtTime(

      0.04,

      audioContext.currentTime +
      1.5

    );


  masterVolume.connect(
    audioContext.destination
  );


  lowDrone =
    audioContext.createOscillator();


  highDrone =
    audioContext.createOscillator();


  lowDrone.type =
    "sine";


  highDrone.type =
    "triangle";


  lowDrone.frequency.value =
    55;


  highDrone.frequency.value =
    82.4;


  lowDrone.connect(
    masterVolume
  );


  highDrone.connect(
    masterVolume
  );


  lowDrone.start();

  highDrone.start();


  updateSoundForChapter(
    chapters[currentChapter]
  );

}


function stopDreamSound() {

  if (!audioContext) {

    return;

  }


  const currentContext =
    audioContext;


  masterVolume.gain
    .exponentialRampToValueAtTime(

      0.0001,

      currentContext.currentTime +
      0.35

    );


  window.setTimeout(
    function () {

      lowDrone.stop();

      highDrone.stop();

      currentContext.close();


      audioContext =
        undefined;

      masterVolume =
        undefined;

      lowDrone =
        undefined;

      highDrone =
        undefined;

    },
    400
  );

}


/* Modifier le son selon la salle */

function updateSoundForChapter(
  chapter
) {

  if (
    !audioContext ||
    !lowDrone ||
    !highDrone
  ) {

    return;

  }


  let lowFrequency =
    55;


  let highFrequency =
    82.4;


  if (
    chapter.world ===
    "childhood"
  ) {

    lowFrequency =
      65.4;

    highFrequency =
      130.8;

  }


  if (
    chapter.world ===
    "adventure"
  ) {

    lowFrequency =
      48.9;

    highFrequency =
      98;

  }


  if (
    chapter.world ===
    "romance"
  ) {

    lowFrequency =
      73.4;

    highFrequency =
      110;

  }


  if (
    chapter.world ===
    "nightmare"
  ) {

    lowFrequency =
      41.2;

    highFrequency =
      155;

  }


  if (
    chapter.world ===
    "awakening"
  ) {

    lowFrequency =
      87.3;

    highFrequency =
      174.6;

  }


  lowDrone.frequency
    .linearRampToValueAtTime(

      lowFrequency,

      audioContext.currentTime +
      1

    );


  highDrone.frequency
    .linearRampToValueAtTime(

      highFrequency,

      audioContext.currentTime +
      1

    );

}


/* Bouton son */

soundButton.setAttribute(
  "aria-pressed",
  "false"
);


soundButton.addEventListener(
  "click",
  function () {

    const soundIsActive =
      soundButton.getAttribute(
        "aria-pressed"
      ) === "true";


    if (soundIsActive) {

      stopDreamSound();

      soundButton.textContent =
        "SOUND OFF";

      soundButton.setAttribute(
        "aria-pressed",
        "false"
      );

    } else {

      startDreamSound();

      soundButton.textContent =
        "SOUND ON";

      soundButton.setAttribute(
        "aria-pressed",
        "true"
      );

    }

  }
);


/* ==========================================
   ANIMATION 3D PRINCIPALE
========================================== */

function animateDreamWorld() {

  requestAnimationFrame(
    animateDreamWorld
  );


  elapsedTime +=
    0.012;


  const chapter =
    chapters[currentChapter];


  const speed =
    chapter.speed;


  transitionPulse *=
    0.94;


  /* Rotation générale */

  dreamWorld.rotation.y +=
    0.0008 +
    speed * 0.0008;


  particles.rotation.y -=
    0.0004 +
    speed * 0.0004;


  particles.rotation.z =
    Math.sin(
      elapsedTime * 0.12
    ) * 0.07;


  /* Animation du cerveau */

  brainGroup.rotation.y +=
    0.002 +
    speed * 0.001;


  brainGroup.rotation.x =
    Math.sin(
      elapsedTime * 0.3
    ) * 0.14;


  brainGroup.scale.setScalar(

    1 +
    Math.sin(
      elapsedTime * 1.4
    ) * 0.025

  );


  /* Souvenirs d’enfance */

  childhoodGroup.children.forEach(
    function (memory, index) {

      memory.rotation.x +=
        0.002 +
        index * 0.00003;

      memory.rotation.y +=
        0.003;

      memory.position.y +=
        Math.sin(
          elapsedTime +
          index
        ) * 0.0008;

    }
  );


  /* Tunnel Adventure */

  adventureGroup.rotation.z +=
    0.0015;


  adventureGroup.position.z =
    Math.sin(
      elapsedTime * 0.35
    ) * 3;


  /* Rubans Romance */

  romanceGroup.children.forEach(
    function (ribbon, index) {

      ribbon.rotation.x +=
        0.001 +
        index * 0.0002;

      ribbon.rotation.y -=
        0.002;

      ribbon.scale.setScalar(

        1 +
        Math.sin(
          elapsedTime +
          index
        ) * 0.04

      );

    }
  );


  /* Cauchemar */

  nightmareGroup.children.forEach(
    function (shard, index) {

      shard.rotation.x +=
        0.01 +
        index * 0.0001;

      shard.rotation.z -=
        0.008;

      shard.position.z +=
        0.018;


      if (
        shard.position.z > 8
      ) {

        shard.position.z =
          -10;

      }

    }
  );


  /* La caméra réagit à la souris */

  camera.position.x +=
    (
      mouse.x * 1.3 -
      camera.position.x
    ) * 0.025;


  camera.position.y +=
    (
      mouse.y * 0.85 -
      camera.position.y
    ) * 0.025;


  camera.lookAt(
    0,
    0,
    0
  );


  /* Transition des couleurs */

  const targetColorOne =
    new THREE.Color(
      chapter.colorOne
    );


  const targetColorTwo =
    new THREE.Color(
      chapter.colorTwo
    );


  particleMaterial.color.lerp(
    targetColorOne,
    0.018
  );


  brainMaterial.color.lerp(
    targetColorOne,
    0.014
  );


  childhoodMaterial.color.lerp(
    targetColorOne,
    0.018
  );


  adventureMaterial.color.lerp(
    targetColorOne,
    0.018
  );


  romanceMaterial.color.lerp(
    targetColorOne,
    0.018
  );


  nightmareMaterial.color.lerp(
    targetColorTwo,
    0.02
  );


  /* Transition du ciel */

  scene.background.lerp(

    new THREE.Color(
      chapter.background
    ),

    0.012

  );


  scene.fog.color.lerp(

    new THREE.Color(
      chapter.fog
    ),

    0.012

  );


  /* Déformation pendant le cauchemar */

  if (
    chapter.world ===
    "nightmare"
  ) {

    camera.fov +=
      (
        70 +
        Math.sin(
          elapsedTime * 12
        ) * 4 -
        camera.fov
      ) * 0.05;


    dreamWorld.position.x =
      Math.sin(
        elapsedTime * 18
      ) * 0.08;


    dreamWorld.position.y =
      Math.cos(
        elapsedTime * 15
      ) * 0.06;

  } else {

    camera.fov +=
      (
        55 -
        camera.fov
      ) * 0.05;


    dreamWorld.position.x *=
      0.9;


    dreamWorld.position.y *=
      0.9;

  }


  /* Recul de caméra au réveil */

  const targetCameraZ =
    chapter.world ===
    "awakening"
      ? 16
      : chapter.world ===
        "nightmare"
        ? 7.5
        : 11;


  camera.position.z +=
    (
      targetCameraZ -
      camera.position.z
    ) * 0.018;


  camera.updateProjectionMatrix();


  renderer.render(
    scene,
    camera
  );

}


/* Lancement de l’animation */

animateDreamWorld();


/* ==========================================
   REDIMENSIONNEMENT DE L’ÉCRAN
========================================== */

window.addEventListener(
  "resize",
  function () {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(

      window.innerWidth,

      window.innerHeight

    );


    renderer.setPixelRatio(

      Math.min(
        window.devicePixelRatio,
        2
      )

    );

  }
);
