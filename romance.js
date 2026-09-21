/* ==========================================
   ROOM 04 — ROMANCE
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


function smoothValue(value) {
  return (
    value *
    value *
    (
      3 -
      2 *
      value
    )
  );
}


function smoothRange(progress, start, end) {
  return smoothValue(
    range(
      progress,
      start,
      end
    )
  );
}


/* ==========================================
   ÉLÉMENTS
========================================== */

const page =
  document.querySelector(
    ".romance-page"
  );



const soundControl =
  document.querySelector(
    "#sound-control"
  );


const storyLines =
  Array.from(
    document.querySelectorAll(
      ".story-line"
    )
  );


const storyStops =
  Array.from(
    document.querySelectorAll(
      ".story-stop[data-line]"
    )
  );

const researchNote =
  document.querySelector(
    "#research-note"
  );


const researchNumber =
  document.querySelector(
    "#research-number"
  );


const researchText =
  document.querySelector(
    "#research-text"
  );


const researchPrinciple =
  document.querySelector(
    "#research-principle"
  );


const researchSource =
  document.querySelector(
    "#research-source"
  );


const dreamTitle =
  document.querySelector(
    "#dream-title"
  );


const emotionalCore =
  document.querySelector(
    "#emotional-core"
  );


const dreamMotif =
  document.querySelector(
    "#dream-motif"
  );


const progressFill =
  document.querySelector(
    "#scroll-progress-fill"
  );


const scrollInstruction =
  document.querySelector(
    "#scroll-instruction"
  );


const finalFlash =
  document.querySelector(
    "#final-flash"
  );


const enterAction =
  document.querySelector(
    "#enter-action"
  );


/* ==========================================
   RECHERCHE
========================================== */

const researchSteps = [
  {
    start: 0.15,
    end: 0.31,

    number:
      "RESEARCH NOTE 04.1",

    text:
      "At least one social situation was identified in 83.5% of the analysed dream reports.",

    principle:
      "SOCIAL DREAMING",

    source:
      "https://pubmed.ncbi.nlm.nih.gov/30769273/"
  },

  {
    start: 0.31,
    end: 0.49,

    number:
      "RESEARCH NOTE 04.2",

    text:
      "Across 1,612 dream reports, current partners appeared more frequently than former partners.",

    principle:
      "PARTNERS & EX-PARTNERS",

    source:
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC8161826/"
  },

  {
    start: 0.49,
    end: 0.68,

    number:
      "RESEARCH NOTE 04.3",

    text:
      "Emotions involving romantic partners in dreams were associated with relationship behaviour the following day.",

    principle:
      "AFTER WAKING",

    source:
      "https://journals.sagepub.com/doi/10.1177/1948550613486678"
  },

  {
    start: 0.68,
    end: 0.88,

    number:
      "RESEARCH NOTE 04.4",

    text:
      "Jealousy experienced in dreams was associated with greater conflict the following day.",

    principle:
      "DREAMED JEALOUSY",

    source:
      "https://journals.sagepub.com/doi/10.1177/1948550613486678"
  }
];


function updateResearch(progress) {
  const active =
    researchSteps.find(
      function (research) {
        return (
          progress >= research.start &&
          progress < research.end
        );
      }
    );


  if (!active) {
    researchNote.classList.remove(
      "visible"
    );

    return;
  }


  researchNumber.textContent =
    active.number;


  researchText.textContent =
    active.text;


  researchPrinciple.textContent =
    active.principle;


  researchSource.href =
    active.source;


  researchNote.classList.add(
    "visible"
  );
}


/* ==========================================
   NARRATION FLUIDE
========================================== */

let activeLine = null;


/* ==========================================
   PHRASES LIÉES AUX ARRÊTS DU SCROLL
========================================== */

function updateStoryLines() {
  let strongestLine = null;
  let strongestOpacity = 0;

  storyLines.forEach(
    function (line, index) {
      const correspondingStop =
        storyStops[index];

      if (!correspondingStop) {
        return;
      }

      const distanceInScreens =
        (
          correspondingStop.offsetTop -
          window.scrollY
        ) /
        window.innerHeight;

      const absoluteDistance =
        Math.abs(
          distanceInScreens
        );

      const visibility =
        smoothValue(
          clamp(
            1 - absoluteDistance,
            0,
            1
          )
        );

      const verticalPosition =
        clamp(
          distanceInScreens,
          -1,
          1
        ) *
        42;

      const blur =
        (
          1 - visibility
        ) *
        11;

      const scale =
        0.965 +
        visibility *
        0.035;

      line.style.setProperty(
        "--line-opacity",
        visibility
      );

      line.style.setProperty(
        "--line-y",
        verticalPosition + "px"
      );

      line.style.setProperty(
        "--line-blur",
        blur + "px"
      );

      line.style.setProperty(
        "--line-scale",
        scale
      );

      line.classList.toggle(
        "is-current",
        visibility > 0.92
      );

      if (
        visibility >
        strongestOpacity
      ) {
        strongestOpacity =
          visibility;

        strongestLine =
          line;
      }
    }
  );

  if (
    strongestLine &&
    strongestLine !== activeLine
  ) {
    activeLine =
      strongestLine;

    dreamTitle.textContent =
      strongestLine.dataset.title;

    emotionalCore.textContent =
      strongestLine.dataset.emotion;

    dreamMotif.textContent =
      strongestLine.dataset.motif;
  }
}
/* ==========================================
   AUDIO — ROMANCE

   Début :
   nappe harmonique, cloches, chaleur.

   Fin :
   désaccord, graves, souffle aigu,
   battements accélérés.
========================================== */

let audioContext = null;

let compressor = null;

let masterGain = null;

let softGain = null;

let warmGain = null;

let tensionGain = null;

let whistleGain = null;

let jealousyNoiseGain = null;

let jealousyNoiseFilter = null;

let jealousyNoisePanner = null;

let soundEnabled = false;

let heartbeatTimer = null;

let romanceMelodyTimer = null;

let currentProgress = 0;

let currentWarmth = 0;

let currentJealousy = 0;

let thirdLightPlayed = false;

let enoughPlayed = false;

let finalStormPlayed = false;


/* ==========================================
   CRÉER UNE NAPPE CONTINUE
========================================== */

function createDrone(
  frequency,
  volume,
  destination,
  type = "sine",
  detune = 0
) {
  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  oscillator.type =
    type;


  oscillator.frequency.value =
    frequency;


  oscillator.detune.value =
    detune;


  gain.gain.value =
    volume;


  oscillator.connect(
    gain
  );


  gain.connect(
    destination
  );


  oscillator.start();
}


/* ==========================================
   NOTE LUMINEUSE

   Les notes sont courtes et espacées :
   pas de mélodie envahissante.
========================================== */

function playRomanceNote(
  frequency,
  volume = 0.08,
  delay = 0,
  pan = 0
) {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const startTime =
    audioContext.currentTime +
    delay;


  const oscillator =
    audioContext.createOscillator();


  const harmonic =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  const harmonicGain =
    audioContext.createGain();


  const panner =
    audioContext.createStereoPanner
      ? audioContext.createStereoPanner()
      : null;


  oscillator.type =
    "sine";


  harmonic.type =
    "sine";


  oscillator.frequency.value =
    frequency;


  harmonic.frequency.value =
    frequency * 2;


  harmonicGain.gain.value =
    0.16;


  gain.gain.setValueAtTime(
    0.0001,
    startTime
  );


  gain.gain.exponentialRampToValueAtTime(
    volume,
    startTime + 0.08
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    startTime + 2.8
  );


  oscillator.connect(
    gain
  );


  harmonic.connect(
    harmonicGain
  );


  harmonicGain.connect(
    gain
  );


  if (panner) {
    panner.pan.value =
      pan;


    gain.connect(
      panner
    );


    panner.connect(
      masterGain
    );
  } else {
    gain.connect(
      masterGain
    );
  }


  oscillator.start(
    startTime
  );


  harmonic.start(
    startTime
  );


  oscillator.stop(
    startTime + 3
  );


  harmonic.stop(
    startTime + 3
  );
}


/* ==========================================
   PHRASE MUSICALE

   Avant la jalousie :
   accord tendre et ouvert.

   Après la troisième lumière :
   les intervalles deviennent instables.
========================================== */

function playRomancePhrase() {
  if (
    !soundEnabled ||
    !audioContext
  ) {
    return;
  }


  if (
    currentJealousy < 0.2
  ) {
    const romanticNotes = [
      523.25,
      659.25,
      783.99
    ];


    romanticNotes.forEach(
      function (
        frequency,
        index
      ) {
        playRomanceNote(
          frequency,
          0.052 +
          currentWarmth * 0.025,
          index * 0.42,
          index === 0
            ? -0.35
            : index === 2
              ? 0.35
              : 0
        );
      }
    );
  } else if (
    currentJealousy < 0.68
  ) {
    playRomanceNote(
      523.25,
      0.045,
      0,
      -0.28
    );


    playRomanceNote(
      554.37,
      0.04,
      0.34,
      0.3
    );
  } else {
    /*
     * Deux notes très proches produisent
     * un léger malaise sans devenir du bruit.
     */

    playRomanceNote(
  349.23,
  0.043,
  0,
  -0.55
);


playRomanceNote(
  369.99,
  0.04,
  0.13,
  0.55
);


playRomanceNote(
  174.61,
  0.038,
  0.42,
  -0.18
);


playRomanceNote(
  185,
  0.034,
  0.54,
  0.22
);
  }


  scheduleRomancePhrase();
}


function scheduleRomancePhrase() {
  window.clearTimeout(
    romanceMelodyTimer
  );


  if (!soundEnabled) {
    return;
  }


  const delay =
    currentJealousy < 0.2
      ? 5200
      : currentJealousy < 0.68
        ? 4300
        : 5700;


  romanceMelodyTimer =
    window.setTimeout(
      playRomancePhrase,
      delay
    );
}


/* ==========================================
   INITIALISER L’ENVIRONNEMENT SONORE
========================================== */

async function startAudio() {
  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;


  if (!AudioContextClass) {
    soundControl.textContent =
      "SOUND UNAVAILABLE";

    return;
  }


  if (!audioContext) {
    audioContext =
      new AudioContextClass();


    compressor =
      audioContext.createDynamicsCompressor();


    compressor.threshold.value =
      -22;


    compressor.knee.value =
      18;


    compressor.ratio.value =
      7;


    compressor.attack.value =
      0.012;


    compressor.release.value =
      0.34;


    masterGain =
      audioContext.createGain();


    masterGain.gain.value =
      0.0001;


    masterGain.connect(
      compressor
    );


    compressor.connect(
      audioContext.destination
    );


    /* Nappe romantique claire */

    softGain =
      audioContext.createGain();


    softGain.gain.value =
      0.0001;


    softGain.connect(
      masterGain
    );


    createDrone(
      130.81,
      0.18,
      softGain,
      "sine"
    );


    createDrone(
      196,
      0.095,
      softGain,
      "sine",
      -4
    );


    createDrone(
      246.94,
      0.055,
      softGain,
      "triangle",
      3
    );


    createDrone(
      329.63,
      0.022,
      softGain,
      "sine"
    );


    /* Chaleur qui accompagne le rapprochement */

    warmGain =
      audioContext.createGain();


    warmGain.gain.value =
      0.0001;


    warmGain.connect(
      masterGain
    );


    createDrone(
      98,
      0.19,
      warmGain,
      "sine"
    );


    createDrone(
      146.83,
      0.1,
      warmGain,
      "sine",
      4
    );


    createDrone(
      220,
      0.04,
      warmGain,
      "triangle"
    );


    /* Inquiétude grave de la partie rouge */

    tensionGain =
      audioContext.createGain();


    tensionGain.gain.value =
      0.0001;


    tensionGain.connect(
      masterGain
    );


    createDrone(
      36,
      0.42,
      tensionGain,
      "sine"
    );


    createDrone(
      40.5,
      0.3,
      tensionGain,
      "sine"
    );


    createDrone(
      73,
      0.08,
      tensionGain,
      "triangle",
      -7
    );


    /* Friction aiguë très légère */

    whistleGain =
      audioContext.createGain();


    whistleGain.gain.value =
      0.0001;


    whistleGain.connect(
      masterGain
    );


    createDrone(
      182,
      0.04,
      whistleGain,
      "sine"
    );


    createDrone(
      187,
      0.036,
      whistleGain,
      "sine"
    );

     /* ==========================================
   SOUFFLE DE JALOUSIE

   Bruit filtré et mouvant qui apparaît
   uniquement dans la partie rouge.
========================================== */

jealousyNoiseGain =
  audioContext.createGain();


jealousyNoiseFilter =
  audioContext.createBiquadFilter();


jealousyNoisePanner =
  audioContext.createStereoPanner
    ? audioContext.createStereoPanner()
    : null;


jealousyNoiseGain.gain.value =
  0.0001;


jealousyNoiseFilter.type =
  "bandpass";


jealousyNoiseFilter.frequency.value =
  780;


jealousyNoiseFilter.Q.value =
  6;


const jealousyBuffer =
  audioContext.createBuffer(
    1,
    audioContext.sampleRate * 2,
    audioContext.sampleRate
  );


const jealousyData =
  jealousyBuffer.getChannelData(
    0
  );


let previousNoiseValue = 0;


for (
  let index = 0;
  index < jealousyData.length;
  index++
) {
  const randomValue =
    Math.random() * 2 - 1;


  /*
   * Le lissage transforme le bruit blanc
   * en souffle organique.
   */

  previousNoiseValue =
    previousNoiseValue * 0.965 +
    randomValue * 0.035;


  jealousyData[index] =
    previousNoiseValue;
}


const jealousyNoiseSource =
  audioContext.createBufferSource();


jealousyNoiseSource.buffer =
  jealousyBuffer;


jealousyNoiseSource.loop =
  true;


jealousyNoiseSource.connect(
  jealousyNoiseFilter
);


jealousyNoiseFilter.connect(
  jealousyNoiseGain
);


if (jealousyNoisePanner) {
  jealousyNoiseGain.connect(
    jealousyNoisePanner
  );


  jealousyNoisePanner.connect(
    masterGain
  );
} else {
  jealousyNoiseGain.connect(
    masterGain
  );
}


jealousyNoiseSource.start();


/* Mouvement lent entre gauche et droite */

if (
  jealousyNoisePanner
) {
  const jealousyPanLfo =
    audioContext.createOscillator();


  const jealousyPanDepth =
    audioContext.createGain();


  jealousyPanLfo.type =
    "sine";


  jealousyPanLfo.frequency.value =
    0.085;


  jealousyPanDepth.gain.value =
    0.72;


  jealousyPanLfo.connect(
    jealousyPanDepth
  );


  jealousyPanDepth.connect(
    jealousyNoisePanner.pan
  );


  jealousyPanLfo.start();
}
  }


  await audioContext.resume();


  soundEnabled = true;


  masterGain.gain.cancelScheduledValues(
    audioContext.currentTime
  );


  masterGain.gain.setValueAtTime(
    Math.max(
      0.0001,
      masterGain.gain.value
    ),
    audioContext.currentTime
  );


  masterGain.gain.exponentialRampToValueAtTime(
    0.52,
    audioContext.currentTime + 1.5
  );


  soundControl.textContent =
    "SOUND ON";


  soundControl.setAttribute(
    "aria-pressed",
    "true"
  );


  updateAudio();

  playRomancePhrase();

  scheduleHeartbeat();
}


/* ==========================================
   ÉVOLUTION LIÉE AU SCROLL
========================================== */

function updateAudio() {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const now =
    audioContext.currentTime;


  /*
   * La nappe romantique reste clairement
   * présente pendant la première moitié.
   */

  softGain.gain.setTargetAtTime(
    0.065 *
    (
      1 -
      currentJealousy * 0.78
    ),
    now,
    0.7
  );


  warmGain.gain.setTargetAtTime(
    0.0001 +
    currentWarmth * 0.22,
    now,
    0.65
  );


  /*
   * La tension démarre seulement après
   * l’arrivée de la troisième lumière.
   */

  tensionGain.gain.setTargetAtTime(
    0.0001 +
    Math.pow(
      currentJealousy,
      1.7
    ) *
    0.48,
    now,
    0.28
  );


  whistleGain.gain.setTargetAtTime(
    0.0001 +
    Math.pow(
      currentJealousy,
      2.6
    ) *
    0.13,
    now,
    0.35
  );

   /*
 * Le souffle devient audible seulement
 * lorsque la troisième présence apparaît.
 */

if (
  jealousyNoiseGain &&
  jealousyNoiseFilter
) {
  jealousyNoiseGain.gain.setTargetAtTime(
    0.0001 +
    Math.pow(
      currentJealousy,
      2.25
    ) *
    0.17,
    now,
    0.32
  );


  jealousyNoiseFilter.frequency.setTargetAtTime(
    680 +
    currentJealousy * 2100,
    now,
    0.4
  );


  jealousyNoiseFilter.Q.setTargetAtTime(
    5 +
    currentJealousy * 8,
    now,
    0.4
  );
}
}


/* ==========================================
   BATTEMENT DE CŒUR
========================================== */

function playHeartbeat(
  strength = 1,
  pan = 0
) {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const now =
    audioContext.currentTime;


  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  const panner =
    audioContext.createStereoPanner
      ? audioContext.createStereoPanner()
      : null;


  oscillator.type =
    "sine";


  oscillator.frequency.setValueAtTime(
    92,
    now
  );


  oscillator.frequency.exponentialRampToValueAtTime(
    29,
    now + 0.3
  );


  gain.gain.setValueAtTime(
    0.0001,
    now
  );


  gain.gain.exponentialRampToValueAtTime(
    Math.min(
      0.88,
      0.3 * strength
    ),
    now + 0.012
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.32
  );


  oscillator.connect(
    gain
  );


  if (panner) {
    panner.pan.value =
      pan;


    gain.connect(
      panner
    );


    panner.connect(
      masterGain
    );
  } else {
    gain.connect(
      masterGain
    );
  }


  oscillator.start(
    now
  );


  oscillator.stop(
    now + 0.35
  );
}


function heartbeatSequence() {
  if (!soundEnabled) {
    return;
  }


  /*
   * Le cœur reste presque imperceptible
   * au début, puis domine la fin.
   */

  const strength =
    0.42 +
    currentProgress * 0.32 +
    currentJealousy * 1.65;


  playHeartbeat(
    strength,
    currentJealousy > 0.35
      ? -0.42
      : -0.08
  );


  window.setTimeout(
    function () {
      playHeartbeat(
        strength * 0.7,
        currentJealousy > 0.35
          ? 0.44
          : 0.08
      );
    },
    currentJealousy > 0.55
      ? 135
      : 205
  );


  scheduleHeartbeat();
}


function scheduleHeartbeat() {
  window.clearTimeout(
    heartbeatTimer
  );


  if (!soundEnabled) {
    return;
  }


  const delay =
    1750 -
    currentProgress * 230 -
    currentJealousy * 1040;


  heartbeatTimer =
    window.setTimeout(
      heartbeatSequence,
      Math.max(
        350,
        delay
      )
    );
}


/* ==========================================
   IMPACTS DRAMATIQUES
========================================== */

function playImpact(
  frequency,
  strength,
  duration
) {
  if (
    !audioContext ||
    !soundEnabled
  ) {
    return;
  }


  const now =
    audioContext.currentTime;


  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  oscillator.type =
    "sine";


  oscillator.frequency.setValueAtTime(
    frequency * 2.2,
    now
  );


  oscillator.frequency.exponentialRampToValueAtTime(
    frequency,
    now + duration
  );


  gain.gain.setValueAtTime(
    0.0001,
    now
  );


  gain.gain.exponentialRampToValueAtTime(
    Math.min(
      0.82,
      strength * 0.52
    ),
    now + 0.018
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + duration
  );


  oscillator.connect(
    gain
  );


  gain.connect(
    masterGain
  );


  oscillator.start(
    now
  );


  oscillator.stop(
    now + duration + 0.05
  );
}


function playStorm() {
  playImpact(
    27,
    1.4,
    1.65
  );


  [
    0,
    320,
    580,
    800,
    990,
    1150,
    1290
  ].forEach(
    function (
      delay,
      index
    ) {
      window.setTimeout(
        function () {
          playHeartbeat(
            1.7 +
            index * 0.09,
            index % 2 === 0
              ? -0.48
              : 0.48
          );
        },
        delay
      );
    }
  );
}


/* ==========================================
   ARRÊTER LE SON
========================================== */

function stopAudio() {
  soundEnabled = false;


  window.clearTimeout(
    heartbeatTimer
  );


  window.clearTimeout(
    romanceMelodyTimer
  );


  if (
    audioContext &&
    masterGain
  ) {
    masterGain.gain.setTargetAtTime(
      0.0001,
      audioContext.currentTime,
      0.12
    );
  }


  soundControl.textContent =
    "ENABLE SOUND";


  soundControl.setAttribute(
    "aria-pressed",
    "false"
  );
}


/* ==========================================
   BOUTON DU HEADER
========================================== */

if (soundControl) {
  soundControl.addEventListener(
    "click",
    async function () {
      if (soundEnabled) {
        stopAudio();
      } else {
        try {
          await startAudio();
        } catch (error) {
          console.warn(
            "Romance audio unavailable:",
            error
          );


          soundControl.textContent =
            "SOUND UNAVAILABLE";
        }
      }
    }
  );
}


/* ==========================================
   FLASH
========================================== */

function triggerFlash() {
  finalFlash.classList.remove(
    "active"
  );


  void finalFlash.offsetWidth;


  finalFlash.classList.add(
    "active"
  );
}


/* ==========================================
   SCROLL
========================================== */

function updateRomance() {
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


  /* ==========================================
   PROGRESSION CALÉE SUR LES CHAPITRES
========================================== */

/*
 * Il existe 15 écrans :
 *
 * 0     introduction
 * 1–11  narration
 * 12    désir de sortir
 * 13    pouls
 * 14    bouton Action
 */


const introOpacity =
  1 -
  smoothRange(
    progress,
    0.015,
    0.06
  );


const approach =
  smoothRange(
    progress,
    0.05,
    0.43
  );


const warmthArrival =
  smoothRange(
    progress,
    0.1,
    0.4
  );


const warmthDeparture =
  smoothRange(
    progress,
    0.52,
    0.76
  );


const warmth =
  warmthArrival *
  (
    1 -
    warmthDeparture *
    0.78
  );


const pink =
  smoothRange(
    progress,
    0.25,
    0.62
  );


/*
 * Le rouge apparaît beaucoup plus
 * progressivement entre la troisième
 * lumière et THAT IS ENOUGH.
 */

const jealousy =
  smoothRange(
    progress,
    0.49,
    0.8
  );


const darkness =
  smoothRange(
    progress,
    0.71,
    0.95
  );


const thirdLight =
  smoothRange(
    progress,
    0.48,
    0.58
  );


/* Écran 12 : You want the dream... */

const desireIn =
  smoothRange(
    progress,
    0.835,
    0.86
  );


const desireOut =
  smoothRange(
    progress,
    0.875,
    0.9
  );


const endingDesire =
  desireIn *
  (
    1 -
    desireOut
  );


/* Écran 13 : BUT YOUR PULSE... */

const endingPulse =
  smoothRange(
    progress,
    0.905,
    0.94
  );


/* Écran 14 : bouton Action */

const endingButton =
  smoothRange(
    progress,
    0.965,
    0.995
  );


  currentProgress = progress;

  currentWarmth = warmth;

  currentJealousy = jealousy;


  page.style.setProperty(
    "--progress",
    progress
  );


  page.style.setProperty(
    "--intro-opacity",
    introOpacity
  );


  page.style.setProperty(
    "--approach",
    approach
  );


  page.style.setProperty(
    "--warmth",
    warmth
  );


  page.style.setProperty(
    "--pink",
    pink
  );


  page.style.setProperty(
    "--jealousy",
    jealousy
  );


  page.style.setProperty(
    "--darkness",
    darkness
  );


  page.style.setProperty(
    "--third-light",
    thirdLight
  );


  page.style.setProperty(
    "--ending-desire",
    endingDesire
  );


  page.style.setProperty(
    "--ending-pulse",
    endingPulse
  );


  page.style.setProperty(
    "--ending-button",
    endingButton
  );


  progressFill.style.height =
    progress * 100 + "%";


  updateStoryLines();

  updateResearch(progress);

  updateAudio();


 /* ==========================================
   TROISIÈME LUMIÈRE
========================================== */

if (
  progress >= 0.5 &&
  !thirdLightPlayed
) {
  thirdLightPlayed = true;


  playImpact(
    48,
    0.72,
    1.1
  );
}


if (
  progress < 0.47
) {
  thirdLightPlayed = false;
}


/* ==========================================
   THAT IS ENOUGH
========================================== */

if (
  progress >= 0.785 &&
  !enoughPlayed
) {
  enoughPlayed = true;


  triggerFlash();


  playImpact(
    31,
    1.3,
    1.45
  );


  playHeartbeat(
    1.9,
    0
  );
}


if (
  progress < 0.75
) {
  enoughPlayed = false;
}


/* ==========================================
   TEMPÊTE FINALE
========================================== */

if (
  progress >= 0.91 &&
  !finalStormPlayed
) {
  finalStormPlayed = true;


  triggerFlash();

  playStorm();
}


if (
  progress < 0.88
) {
  finalStormPlayed = false;
}


if (progress < 0.15) {
  scrollInstruction.textContent =
    "APPROACH THE LIGHT";
} else if (progress < 0.39) {
  scrollInstruction.textContent =
    "CROSS THE DISTANCE";
} else if (progress < 0.63) {
  scrollInstruction.textContent =
    "STAY IN THE DREAM";
} else if (progress < 0.88) {
  scrollInstruction.textContent =
    "WATCH THE THIRD LIGHT";
} else if (progress < 0.958) {
  scrollInstruction.textContent =
    "LET THE DREAM END";
} else {
  scrollInstruction.textContent =
    "FOLLOW THE PULSE";
}
}


/* ==========================================
   PARTICULES
========================================== */

const canvas =
  document.querySelector(
    "#romance-canvas"
  );


const context =
  canvas.getContext(
    "2d"
  );


let canvasWidth = 0;

let canvasHeight = 0;

let particles = [];


function createParticles() {
  particles = [];


  const amount =
  window.innerWidth < 700
    ? 36
    : 68;


  for (
    let index = 0;
    index < amount;
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
        0.5 +
        Math.random() *
        1.8,

      speed:
        0.08 +
        Math.random() *
        0.28,

      depth:
        0.25 +
        Math.random() *
        0.75,

      phase:
        Math.random() *
        Math.PI *
        2,

      opacity:
        0.16 +
        Math.random() *
        0.5
    });
  }
}


function resizeCanvas() {
  const pixelRatio =
  Math.min(
    window.devicePixelRatio || 1,
    1.15
  );


  canvasWidth =
    window.innerWidth;


  canvasHeight =
    window.innerHeight;


  canvas.width =
    canvasWidth *
    pixelRatio;


  canvas.height =
    canvasHeight *
    pixelRatio;


  context.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );


  createParticles();
}

let previousParticleFrame = 0;
   
function animateParticles(time) {
  window.requestAnimationFrame(
    animateParticles
  );


  /*
   * Environ 30 FPS suffisent largement
   * pour ces particules.
   */

  if (
    document.hidden ||
    time - previousParticleFrame < 34
  ) {
    return;
  }


  previousParticleFrame =
    time;


  context.clearRect(
    0,
    0,
    canvasWidth,
    canvasHeight
  );


  particles.forEach(
    function (particle) {
      particle.y -=
        particle.speed *
        (
          1 +
          currentJealousy *
          4
        );


      particle.x +=
        Math.sin(
          time * 0.001 +
          particle.phase
        ) *
        (
          0.06 +
          currentJealousy *
          0.42
        );


      if (
        particle.y < -10
      ) {
        particle.y =
          canvasHeight + 10;


        particle.x =
          Math.random() *
          canvasWidth;
      }


      const twinkle =
        0.65 +
        Math.sin(
          time * 0.002 +
          particle.phase
        ) *
        0.35;


      context.beginPath();


      context.arc(
        particle.x,
        particle.y,
        particle.radius +
        currentJealousy * 0.7,
        0,
        Math.PI * 2
      );


      if (
        currentJealousy > 0.05
      ) {
        context.fillStyle =
          "rgba(255,52,88," +
          particle.opacity *
          twinkle +
          ")";
      } else if (
        currentWarmth > 0.2
      ) {
        context.fillStyle =
          "rgba(255,218,175," +
          particle.opacity *
          twinkle +
          ")";
      } else {
        context.fillStyle =
          "rgba(255,250,237," +
          particle.opacity *
          twinkle +
          ")";
      }


      context.fill();
       }
  );
}


/* ==========================================
   SOURIS
========================================== */



/* ==========================================
   SOURIS
========================================== */

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


    page.style.setProperty(
      "--pointer-x",
      horizontal * 18 + "px"
    );


    page.style.setProperty(
      "--pointer-y",
      vertical * 11 + "px"
    );
  },
  {
    passive: true
  }
);



/* ==========================================
   INITIALISATION
========================================== */

resizeCanvas();

updateRomance();


window.requestAnimationFrame(
  animateParticles
);


let romanceUpdatePending = false;


function requestRomanceUpdate() {
  if (romanceUpdatePending) {
    return;
  }


  romanceUpdatePending = true;


  window.requestAnimationFrame(
    function () {
      updateRomance();

      romanceUpdatePending = false;
    }
  );
}


window.addEventListener(
  "scroll",
  requestRomanceUpdate,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  function () {
    resizeCanvas();

    requestRomanceUpdate();
  },
  {
    passive: true
  }
);
/* ==========================================
   DOSSIER CURATORIAL — ROMANCE
========================================== */

const romanceNotesButton =
  document.querySelector(
    "#romance-notes-button"
  );


const romanceNotesPanel =
  document.querySelector(
    "#romance-notes-panel"
  );


const romanceNotesBackdrop =
  document.querySelector(
    "#romance-notes-backdrop"
  );


const romanceNotesClose =
  document.querySelector(
    "#romance-notes-close"
  );


function openRomanceNotes() {
  if (
    !romanceNotesPanel ||
    !romanceNotesButton
  ) {
    return;
  }


  page.classList.add(
    "notes-open"
  );


  romanceNotesPanel.setAttribute(
    "aria-hidden",
    "false"
  );


  romanceNotesButton.setAttribute(
    "aria-expanded",
    "true"
  );


  romanceNotesButton.textContent =
    "ROOM NOTES −";


  if (
    romanceNotesClose
  ) {
    romanceNotesClose.focus();
  }
}


function closeRomanceNotes() {
  if (
    !romanceNotesPanel ||
    !romanceNotesButton
  ) {
    return;
  }


  page.classList.remove(
    "notes-open"
  );


  romanceNotesPanel.setAttribute(
    "aria-hidden",
    "true"
  );


  romanceNotesButton.setAttribute(
    "aria-expanded",
    "false"
  );


  romanceNotesButton.textContent =
    "ROOM NOTES +";
}


if (
  romanceNotesButton
) {
  romanceNotesButton.addEventListener(
    "click",
    function () {
      if (
        page.classList.contains(
          "notes-open"
        )
      ) {
        closeRomanceNotes();
      } else {
        openRomanceNotes();
      }
    }
  );
}


if (
  romanceNotesClose
) {
  romanceNotesClose.addEventListener(
    "click",
    closeRomanceNotes
  );
}


if (
  romanceNotesBackdrop
) {
  romanceNotesBackdrop.addEventListener(
    "click",
    closeRomanceNotes
  );
}


window.addEventListener(
  "keydown",
  function (
    event
  ) {
    if (
      event.key === "Escape" &&
      page.classList.contains(
        "notes-open"
      )
    ) {
      closeRomanceNotes();


      if (
        romanceNotesButton
      ) {
        romanceNotesButton.focus();
      }
    }
  }
);
