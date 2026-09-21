(function () {
  "use strict";

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  function range(progress, start, end) {
    if (start === end) return progress >= end ? 1 : 0;
    return clamp((progress - start) / (end - start), 0, 1);
  }

  function lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  const page = document.querySelector(".adventure-page");
  const narration = document.querySelector("#adventure-narration");
  const scienceNote = document.querySelector("#science-note");
  const scienceNumber = document.querySelector("#science-number");
  const scienceTitle = document.querySelector("#science-title");
  const scienceText = document.querySelector("#science-text");
  const scienceSource = document.querySelector("#science-source");
  const progressFill = document.querySelector("#scroll-progress-fill");
  const scrollMessage = document.querySelector("#scroll-message");
  const followGlow = document.querySelector("#follow-glow");
  const canvas = document.querySelector("#adventure-canvas");

  if (!page || !narration || !canvas) return;

  const context = canvas.getContext("2d");

  const narrationSteps = [
  {
    start: 0,

    label:
      "ROOM 03 · ADVENTURE",

    text:
      "The sky starts here.<em>And gravity ends.</em>"
  },

  {
    start: 0.09,

    label:
      "THE FIRST FLIGHT",

    text:
      "You take one step.<em>The ground is already kilometres below.</em>"
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
    start: 0.39,

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
      "You race through it<em>before the branches can catch you.</em>"
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
    start: 0.8,

    label:
      "A DIFFERENT ENDING",

    text:
      "Before you reach the ground,<em>the dream changes the ending.</em>"
  },

  {
    start: 0.88,

    label:
      "THE IMPOSSIBLE HORIZON",

    text:
      "Nothing stays where it was.<em>Not even the horizon.</em>"
  }
];

  const scienceSteps = [
  {
    start: 0,

    number:
      "03.1",

    title:
      "FLYING DREAMS",

    text:
      "In a questionnaire of 1,181 first-year Canadian students, 48.3% reported having experienced a flying dream at least once.",

    source:
      "https://link.springer.com/article/10.1023/B:DREM.0000003144.40929.0b"
  },

  {
    start: 0.39,

    number:
      "03.2",

    title:
      "CHASE & FALL",

    text:
      "In the same student sample, 81.5% reported a dream of being chased and 73.8% a dream of falling at least once.",

    source:
      "https://link.springer.com/article/10.1023/B:DREM.0000003144.40929.0b"
  },

  {
    start: 0.58,

    number:
      "03.3",

    title:
      "FLIGHT & LUCIDITY",

    text:
      "Across 1,910 reports from 191 participants, people reporting flying dreams were more likely to also report lucid or pre-lucid dreams.",

    source:
      "https://doi.org/10.1037/h0094325"
  },

  {
    start: 0.84,

    number:
      "03.4",

    title:
      "SCENE DISCONTINUITY",

    text:
      "In a small experiment using 20 discontinuous dream reports, judges identified intact and artificially spliced reports correctly only 57% of the time.",

    source:
      "https://academic.oup.com/sleepadvances/article/6/1/zpae093/7924184"
  }
];

  let narrationIndex = -1;
  let scienceIndex = -1;
  let narrationTimer;
  let scienceTimer;

  function displayNarration(index) {
    if (index === narrationIndex) return;
    narrationIndex = index;
    window.clearTimeout(narrationTimer);
    narration.classList.add("is-changing");

    narrationTimer = window.setTimeout(function () {
      const step = narrationSteps[index];
      narration.innerHTML =
        '<p class="narration-label">' + step.label + "</p>" +
        "<h1>" + step.text + "</h1>";
      narration.classList.remove("is-changing");
    }, 420);
  }

  function displayScience(index) {
    if (index === scienceIndex) return;
    scienceIndex = index;
    window.clearTimeout(scienceTimer);
    scienceNote.classList.add("is-changing");

    scienceTimer = window.setTimeout(function () {
      const step = scienceSteps[index];
      scienceNumber.textContent = step.number;
      scienceTitle.textContent = step.title;
      scienceText.textContent = step.text;
      scienceSource.href = step.source;
      scienceNote.classList.remove("is-changing");
    }, 330);
  }

  let targetProgress = 0;
  let smoothProgress = 0;
  let flightIntensity = 0;
  let fallIntensity = 0;
  let forestIntensity = 0;

  function calculateProgress() {
    const maximumScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetProgress = maximumScroll > 0 ? clamp(window.scrollY / maximumScroll, 0, 1) : 0;
  }

  function updateExperience() {
    smoothProgress = lerp(smoothProgress, targetProgress, 0.1);
    if (Math.abs(targetProgress - smoothProgress) < 0.0001) smoothProgress = targetProgress;

    let nextNarration = 0;
    narrationSteps.forEach(function (step, index) {
      if (smoothProgress >= step.start) nextNarration = index;
    });
    displayNarration(nextNarration);

    let nextScience = 0;
    scienceSteps.forEach(function (step, index) {
      if (smoothProgress >= step.start) nextScience = index;
    });
    displayScience(nextScience);

    const flightIn = range(smoothProgress, 0.04, 0.12);
    const flightOut = range(smoothProgress, 0.34, 0.4);
    flightIntensity = flightIn * (1 - flightOut);

    const forestDrop = range(smoothProgress, 0.34, 0.43);
    const forestOut = range(smoothProgress, 0.52, 0.59);
    forestIntensity = forestDrop * (1 - forestOut);

    fallIntensity = range(smoothProgress, 0.56, 0.64) * (1 - range(smoothProgress, 0.83, 0.87));

    const golden = range(smoothProgress, 0.58, 0.62) * (1 - range(smoothProgress, 0.66, 0.69));
    const electric = range(smoothProgress, 0.66, 0.69) * (1 - range(smoothProgress, 0.73, 0.76));
    const lastLight = range(smoothProgress, 0.73, 0.76) * (1 - range(smoothProgress, 0.86, 0.9));
    const horizon = range(smoothProgress, 0.86, 0.91);
    const romance = range(smoothProgress, 0.91, 0.98);

    page.style.setProperty("--flight", flightIntensity);
    page.style.setProperty("--forest-drop", forestDrop);
    page.style.setProperty("--forest-opacity", forestIntensity);
    page.style.setProperty("--golden", golden);
    page.style.setProperty("--electric", electric);
    page.style.setProperty("--last-light", lastLight);
    page.style.setProperty("--horizon", horizon);
    page.style.setProperty("--romance", romance);

    progressFill.style.height = smoothProgress * 100 + "%";

    if (smoothProgress >= 0.955) {
      page.classList.add("romance-active");
      scrollMessage.style.opacity = "0";
    } else {
      page.classList.remove("romance-active");
      scrollMessage.style.opacity = smoothProgress > 0.08 ? "0.3" : "0.58";
    }
  }

  let canvasWidth = 0;
  let canvasHeight = 0;
  let stars = [];
  let pointerX = 0;
  let pointerY = 0;
  let pointerTargetX = 0;
  let pointerTargetY = 0;

  function resetStar(star, randomDepth) {
    star.x = (Math.random() - 0.5) * canvasWidth;
    star.y = (Math.random() - 0.5) * canvasHeight;
    star.z = randomDepth ? 0.18 + Math.random() * 1.25 : 1.35;
    star.size = 0.45 + Math.random() * 1.25;
    star.opacity = 0.35 + Math.random() * 0.65;
  }

  function createStars() {
    stars = [];
    const count = window.innerWidth < 700 ? 52 : 82;

    for (let index = 0; index < count; index++) {
      const star = {};
      resetStar(star, true);
      stars.push(star);
    }
  }

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = Math.round(canvasWidth * ratio);
    canvas.height = Math.round(canvasHeight * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    createStars();
  }

  function drawStars() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    pointerX = lerp(pointerX, pointerTargetX, 0.045);
    pointerY = lerp(pointerY, pointerTargetY, 0.045);

    const centreX = canvasWidth / 2 + pointerX;
    const centreY = canvasHeight / 2 + pointerY;
    const speed = 0.0018 + flightIntensity * 0.032 + fallIntensity * 0.017;
    const visibility = Math.max(0.35, flightIntensity, fallIntensity);

    stars.forEach(function (star) {
      star.z -= speed;
      if (star.z <= 0.055) resetStar(star, false);

      const projection = 1 / star.z;
      const x = centreX + star.x * projection;
      const y = centreY + star.y * projection;

      if (x < -80 || x > canvasWidth + 80 || y < -80 || y > canvasHeight + 80) {
        resetStar(star, false);
        return;
      }

      const radius = Math.min(3.2, star.size * projection);
      const streak = (0.012 + flightIntensity * 0.075 + fallIntensity * 0.04);
      const previousX = x - (x - centreX) * streak;
      const previousY = y - (y - centreY) * streak;

      context.beginPath();
      context.moveTo(previousX, previousY);
      context.lineTo(x, y);
      context.strokeStyle = "rgba(255,250,224," + star.opacity * visibility + ")";
      context.lineWidth = Math.max(0.7, radius * 0.8);
      context.stroke();

      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = forestIntensity > 0.2
        ? "rgba(221,255,218," + star.opacity * visibility + ")"
        : "rgba(255,251,230," + star.opacity * visibility + ")";
      context.fill();
    });
  }

  function animate() {
    updateExperience();
    drawStars();
    window.requestAnimationFrame(animate);
  }

  window.addEventListener("pointermove", function (event) {
    const horizontal = event.clientX / window.innerWidth - 0.5;
    const vertical = event.clientY / window.innerHeight - 0.5;
    pointerTargetX = horizontal * 22;
    pointerTargetY = vertical * 16;
    page.style.setProperty("--pointer-x", horizontal * 14 + "px");
    page.style.setProperty("--pointer-y", vertical * 11 + "px");
  }, { passive: true });

  if (followGlow) {
    followGlow.addEventListener("click", function (event) {
      event.preventDefault();
      if (page.classList.contains("leaving-adventure")) return;
      page.classList.add("leaving-adventure");
      window.setTimeout(function () {
        window.location.href = "romance.html";
      }, 1350);
    });
  }

  resizeCanvas();
  calculateProgress();
  updateExperience();
  window.requestAnimationFrame(animate);

  window.addEventListener("scroll", calculateProgress, { passive: true });
  window.addEventListener("resize", function () {
    resizeCanvas();
    calculateProgress();
  });
})();
/* ==========================================
   ADVENTURE — ROOM NOTES
========================================== */

(function () {
  "use strict";


  const adventurePage =
    document.querySelector(
      ".adventure-page"
    );


  const notesButton =
    document.querySelector(
      "#adventure-notes-button"
    );


  const notesClose =
    document.querySelector(
      "#adventure-notes-close"
    );


  const notesBackdrop =
    document.querySelector(
      "#adventure-notes-backdrop"
    );


  const notesPanel =
    document.querySelector(
      "#adventure-notes-panel"
    );


  function setNotesOpen(
    open
  ) {
    if (
      !adventurePage
    ) {
      return;
    }


    adventurePage.classList.toggle(
      "adventure-notes-open",
      open
    );


    if (
      notesButton
    ) {
      notesButton.setAttribute(
        "aria-expanded",
        String(open)
      );


      notesButton.textContent =
        open
          ? "ROOM NOTES −"
          : "ROOM NOTES +";
    }


    if (
      notesPanel
    ) {
      notesPanel.setAttribute(
        "aria-hidden",
        String(!open)
      );
    }
  }


  if (
    notesButton
  ) {
    notesButton.addEventListener(
      "click",
      function () {
        setNotesOpen(
          !adventurePage.classList.contains(
            "adventure-notes-open"
          )
        );
      }
    );
  }


  if (
    notesClose
  ) {
    notesClose.addEventListener(
      "click",
      function () {
        setNotesOpen(
          false
        );
      }
    );
  }


  if (
    notesBackdrop
  ) {
    notesBackdrop.addEventListener(
      "click",
      function () {
        setNotesOpen(
          false
        );
      }
    );
  }


  window.addEventListener(
    "keydown",
    function (
      event
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        setNotesOpen(
          false
        );
      }
    }
  );


/* ==========================================
   AMBIANCE SONORE — ADVENTURE

   Vent naturel, forêt vivante,
   chute et lumière harmonique.
========================================== */

  const soundButton =
    document.querySelector(
      "#adventure-sound-button"
    );


  let audioContext =
    null;


  let masterGain =
    null;


  let windGain =
    null;


  let windFilter =
    null;


  let windSource =
    null;


  let fallToneGain =
    null;


  let romanceToneGain =
    null;


  let soundEnabled =
    false;


  let audioCreated =
    false;


  let natureTimer =
    null;


  let currentSunsetScene =
    -1;


/* ==========================================
   PROGRESSION
========================================== */

  function getAdventureProgress() {
    const maximumScroll =
      Math.max(
        1,
        document.documentElement.scrollHeight -
        window.innerHeight
      );


    return Math.min(
      Math.max(
        window.scrollY /
        maximumScroll,
        0
      ),
      1
    );
  }


  function soundRange(
    progress,
    start,
    end
  ) {
    return Math.min(
      Math.max(
        (
          progress -
          start
        ) /
        (
          end -
          start
        ),
        0
      ),
      1
    );
  }


/* ==========================================
   BRUIT BRUN

   Plus doux que le bruit blanc :
   pas de grésillement agressif.
========================================== */

  function createBrownNoiseBuffer() {
    const duration =
      4;


    const buffer =
      audioContext.createBuffer(
        1,
        audioContext.sampleRate *
        duration,
        audioContext.sampleRate
      );


    const data =
      buffer.getChannelData(
        0
      );


    let previous =
      0;


    for (
      let index = 0;
      index < data.length;
      index++
    ) {
      const white =
        Math.random() *
        2 -
        1;


      previous =
        (
          previous +
          0.018 *
          white
        ) /
        1.018;


      data[
        index
      ] =
        previous *
        3.1;
    }


    return buffer;
  }


/* ==========================================
   CRÉER LE PAYSAGE SONORE
========================================== */

  function createAdventureAudio() {
    if (
      audioCreated
    ) {
      return;
    }


    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;


    if (
      !AudioContextClass
    ) {
      return;
    }


    audioContext =
      new AudioContextClass();


    masterGain =
      audioContext.createGain();


    windGain =
      audioContext.createGain();


    fallToneGain =
      audioContext.createGain();


    romanceToneGain =
      audioContext.createGain();


    windFilter =
      audioContext.createBiquadFilter();


    windSource =
      audioContext.createBufferSource();


    masterGain.gain.value =
      0.0001;


    windGain.gain.value =
      0.0001;


    fallToneGain.gain.value =
      0.0001;


    romanceToneGain.gain.value =
      0.0001;


    windFilter.type =
      "lowpass";


    windFilter.frequency.value =
      620;


    windFilter.Q.value =
      0.55;


    windSource.buffer =
      createBrownNoiseBuffer();


    windSource.loop =
      true;


    windSource.connect(
      windFilter
    );


    windFilter.connect(
      windGain
    );


    windGain.connect(
      masterGain
    );


    fallToneGain.connect(
      masterGain
    );


    romanceToneGain.connect(
      masterGain
    );


    masterGain.connect(
      audioContext.destination
    );


    /*
     * Le filtre du vent respire lentement.
     */

    const windMovement =
      audioContext.createOscillator();


    const windMovementAmount =
      audioContext.createGain();


    windMovement.type =
      "sine";


    windMovement.frequency.value =
      0.075;


    windMovementAmount.gain.value =
      145;


    windMovement.connect(
      windMovementAmount
    );


    windMovementAmount.connect(
      windFilter.frequency
    );


    /*
     * Grave de la chute.
     */

    const fallOscillator =
      audioContext.createOscillator();


    fallOscillator.type =
      "sine";


    fallOscillator.frequency.value =
      52;


    fallOscillator.connect(
      fallToneGain
    );


    /*
     * Lumière finale.
     */

    const romanceOscillator =
      audioContext.createOscillator();


    romanceOscillator.type =
      "sine";


    romanceOscillator.frequency.value =
      293.66;


    romanceOscillator.connect(
      romanceToneGain
    );


    windSource.start();

    windMovement.start();

    fallOscillator.start();

    romanceOscillator.start();


    audioCreated =
      true;
  }


/* ==========================================
   FEUILLAGES
========================================== */

  function playLeafRustle() {
    if (
      !soundEnabled ||
      !audioContext ||
      !masterGain
    ) {
      return;
    }


    const now =
      audioContext.currentTime;


    const source =
      audioContext.createBufferSource();


    const filter =
      audioContext.createBiquadFilter();


    const gain =
      audioContext.createGain();


    source.buffer =
      createBrownNoiseBuffer();


    filter.type =
      "bandpass";


    filter.frequency.setValueAtTime(
      1250 +
      Math.random() *
      650,
      now
    );


    filter.Q.value =
      0.75;


    gain.gain.setValueAtTime(
      0.0001,
      now
    );


    gain.gain.linearRampToValueAtTime(
      0.018,
      now + 0.28
    );


    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 1.35
    );


    source.connect(
      filter
    );


    filter.connect(
      gain
    );


    gain.connect(
      masterGain
    );


    source.start(
      now
    );


    source.stop(
      now + 1.5
    );
  }


/* ==========================================
   APPEL D’OISEAU ABSTRAIT

   Très léger : ce n’est pas une jungle MP3.
========================================== */

  function playForestCall() {
    if (
      !soundEnabled ||
      !audioContext ||
      !masterGain
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


    const startingFrequency =
      1550 +
      Math.random() *
      450;


    oscillator.frequency.setValueAtTime(
      startingFrequency,
      now
    );


    oscillator.frequency.exponentialRampToValueAtTime(
      startingFrequency *
      1.42,
      now + 0.16
    );


    oscillator.frequency.exponentialRampToValueAtTime(
      startingFrequency *
      1.08,
      now + 0.42
    );


    gain.gain.setValueAtTime(
      0.0001,
      now
    );


    gain.gain.linearRampToValueAtTime(
      0.012,
      now + 0.06
    );


    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.48
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
      now + 0.52
    );
  }


/* ==========================================
   VIE DE LA FORÊT
========================================== */

  function scheduleNature() {
    window.clearTimeout(
      natureTimer
    );


    natureTimer =
      window.setTimeout(
        function () {
          const progress =
            getAdventureProgress();


          const insideForest =
            progress >= 0.35 &&
            progress <= 0.57;


          if (
            soundEnabled &&
            insideForest
          ) {
            playLeafRustle();


            if (
              Math.random() >
              0.45
            ) {
              window.setTimeout(
                playForestCall,
                350 +
                Math.random() *
                700
              );
            }
          }


          scheduleNature();
        },
        1800 +
        Math.random() *
        1800
      );
  }


/* ==========================================
   SON DE LUMIÈRE

   Chaque coucher de soleil utilise
   une harmonie légèrement différente.
========================================== */

  function playLightChord(
    frequencies,
    intensity
  ) {
    if (
      !soundEnabled ||
      !audioContext ||
      !masterGain
    ) {
      return;
    }


    const now =
      audioContext.currentTime;


    frequencies.forEach(
      function (
        frequency,
        index
      ) {
        const oscillator =
          audioContext.createOscillator();


        const harmonic =
          audioContext.createOscillator();


        const gain =
          audioContext.createGain();


        oscillator.type =
          "sine";


        harmonic.type =
          "sine";


        oscillator.frequency.value =
          frequency;


        harmonic.frequency.value =
          frequency *
          2.01;


        gain.gain.setValueAtTime(
          0.0001,
          now
        );


        gain.gain.linearRampToValueAtTime(
          intensity /
          (
            index +
            2
          ),
          now +
          0.7 +
          index *
          0.12
        );


        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          now + 5.2
        );


        oscillator.connect(
          gain
        );


        harmonic.connect(
          gain
        );


        gain.connect(
          masterGain
        );


        oscillator.start(
          now
        );


        harmonic.start(
          now
        );


        oscillator.stop(
          now + 5.3
        );


        harmonic.stop(
          now + 5.3
        );
      }
    );
  }


  function updateSunsetSound(
    progress
  ) {
    let scene =
      -1;


    if (
      progress >= 0.58 &&
      progress < 0.66
    ) {
      scene =
        0;
    }

    else if (
      progress >= 0.66 &&
      progress < 0.73
    ) {
      scene =
        1;
    }

    else if (
      progress >= 0.73 &&
      progress < 0.86
    ) {
      scene =
        2;
    }

    else if (
      progress >= 0.86 &&
      progress < 0.94
    ) {
      scene =
        3;
    }


    if (
      scene ===
      currentSunsetScene
    ) {
      return;
    }


    currentSunsetScene =
      scene;


    if (
      scene === 0
    ) {
      /*
       * Coucher doré :
       * accord ouvert et chaleureux.
       */

      playLightChord(
        [
          261.63,
          392,
          523.25
        ],
        0.055
      );
    }

    else if (
      scene === 1
    ) {
      /*
       * Coucher électrique :
       * couleur plus étrange.
       */

      playLightChord(
        [
          311.13,
          466.16,
          622.25
        ],
        0.05
      );
    }

    else if (
      scene === 2
    ) {
      /*
       * Dernière lumière :
       * harmonie plus basse.
       */

      playLightChord(
        [
          220,
          329.63,
          440
        ],
        0.052
      );
    }

    else if (
      scene === 3
    ) {
      /*
       * Horizon impossible.
       */

      playLightChord(
        [
          196,
          293.66,
          392
        ],
        0.045
      );
    }
  }


/* ==========================================
   SYNCHRONISATION
========================================== */

  function syncAdventureSound() {
    if (
      !audioCreated ||
      !audioContext
    ) {
      return;
    }


    const progress =
      getAdventureProgress();


    const flight =
      soundRange(
        progress,
        0.04,
        0.13
      ) *
      (
        1 -
        soundRange(
          progress,
          0.34,
          0.42
        )
      );


    const forest =
      soundRange(
        progress,
        0.34,
        0.43
      ) *
      (
        1 -
        soundRange(
          progress,
          0.53,
          0.59
        )
      );


    const fall =
      soundRange(
        progress,
        0.56,
        0.66
      ) *
      (
        1 -
        soundRange(
          progress,
          0.82,
          0.89
        )
      );


    const romance =
      soundRange(
        progress,
        0.91,
        0.98
      );


    const now =
      audioContext.currentTime;


    /*
     * Vent doux au départ,
     * plus large pendant la chute.
     */

    const windVolume =
      0.009 +
      flight *
      0.055 +
      fall *
      0.048 +
      forest *
      0.008;


    windGain.gain.setTargetAtTime(
      soundEnabled
        ? windVolume
        : 0.0001,

      now,
      0.55
    );


    /*
     * Le filtre s’ouvre avec la vitesse,
     * sans ajouter de bruit agressif.
     */

    windFilter.frequency.setTargetAtTime(
      430 +
      flight *
      420 +
      fall *
      280,

      now,
      0.6
    );


    fallToneGain.gain.setTargetAtTime(
      soundEnabled
        ? fall *
          0.023
        : 0.0001,

      now,
      0.5
    );


    romanceToneGain.gain.setTargetAtTime(
      soundEnabled
        ? romance *
          0.011
        : 0.0001,

      now,
      0.9
    );


    updateSunsetSound(
      progress
    );
  }


/* ==========================================
   ACTIVER LE SON
========================================== */

  function setAdventureSound(
    enabled
  ) {
    createAdventureAudio();


    if (
      !audioContext ||
      !masterGain
    ) {
      return;
    }


    soundEnabled =
      enabled;


    if (
      audioContext.state ===
      "suspended"
    ) {
      audioContext.resume();
    }


    masterGain.gain.setTargetAtTime(
      enabled
        ? 0.78
        : 0.0001,

      audioContext.currentTime,
      0.35
    );


    if (
      soundButton
    ) {
      soundButton.setAttribute(
        "aria-pressed",
        String(enabled)
      );


      soundButton.textContent =
        enabled
          ? "SOUND ON"
          : "SOUND OFF";
    }


    currentSunsetScene =
      -1;


    syncAdventureSound();


    if (
      enabled &&
      !natureTimer
    ) {
      scheduleNature();
    }
  }


  if (
    soundButton
  ) {
    soundButton.addEventListener(
      "click",
      function () {
        setAdventureSound(
          !soundEnabled
        );
      }
    );
  }


  window.addEventListener(
    "scroll",
    syncAdventureSound,
    {
      passive: true
    }
  );


  document.addEventListener(
    "visibilitychange",
    function () {
      if (
        !audioCreated ||
        !audioContext ||
        !masterGain
      ) {
        return;
      }


      masterGain.gain.setTargetAtTime(
        document.hidden ||
        !soundEnabled

          ? 0.0001
          : 0.78,

        audioContext.currentTime,
        0.35
      );
    }
  );

})();
