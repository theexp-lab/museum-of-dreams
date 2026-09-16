/* ==========================================
   THE MUSEUM OF DREAMS
   ROOM 05 — ACTION
========================================== */


/* ==========================================
   VARIABLES
========================================== */

:root {
  --ivory: #fff8ec;
  --red: #ff3636;
  --warm-red: #ff665b;
  --deep-red: #7b0812;
  --blue: #354d82;
  --night: #07070a;

  --pointer-x: 0px;
  --pointer-y: 0px;
}


/* ==========================================
   RESET
========================================== */

* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  min-height: 100%;

  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;

  background: var(--night);
}

body {
  min-width: 320px;
  min-height: 100%;

  margin: 0;

  overflow-x: hidden;

  color: var(--ivory);
  background: var(--night);

  font-family:
    "DM Mono",
    monospace;
}

button,
a {
  color: inherit;
  font: inherit;
}

button {
  border: 0;
}

a {
  text-decoration: none;
}


/* ==========================================
   MONDE DU MUSÉE
========================================== */

.action-world {
  position: fixed;
  inset: 0;

  z-index: 0;

  overflow: hidden;

  pointer-events: none;

  perspective: 1200px;

  background: #09090d;
}

.room-background,
.room-redness,
.room-darkness {
  position: absolute;
  inset: 0;

  transition:
    opacity 1200ms ease,
    background 1400ms ease;
}

.room-background {
  background:
    radial-gradient(
      circle at 50% 40%,
      rgba(103, 76, 101, 0.25),
      transparent 34%
    ),

    linear-gradient(
      180deg,
      #19151d,
      #110d14 48%,
      #08070a
    );
}

.room-redness {
  opacity: 0;

  background:
    radial-gradient(
      circle at 50% 46%,
      rgba(255, 57, 48, 0.32),
      rgba(111, 4, 18, 0.18) 39%,
      transparent 70%
    ),

    linear-gradient(
      180deg,
      rgba(80, 4, 17, 0.15),
      rgba(28, 1, 7, 0.55)
    );
}

.room-darkness {
  opacity: 0;

  background:
    radial-gradient(
      circle at 50% 45%,
      transparent 8%,
      rgba(4, 2, 7, 0.62) 63%,
      rgba(1, 1, 3, 0.94)
    );
}

.action-page[data-scene="chase"]
.room-redness {
  opacity: 0.55;
}

.action-page[data-scene="impact"]
.room-redness {
  opacity: 1;
}

.action-page[data-scene="nightmare"]
.room-redness {
  opacity: 0.7;
}

.action-page[data-scene="nightmare"]
.room-darkness {
  opacity: 1;
}


/* ==========================================
   ARCHITECTURE
========================================== */

.ceiling-light {
  position: absolute;

  top: 0;
  left: 50%;

  width: 36%;
  height: 2px;

  background:
    rgba(255, 240, 218, 0.74);

  box-shadow:
    0 0 18px
    rgba(255, 235, 212, 0.55),

    0 0 90px
    rgba(255, 199, 179, 0.16);

  transform:
    translateX(-50%);

  transition:
    width 1200ms ease,
    opacity 1200ms ease,
    background 1200ms ease,
    box-shadow 1200ms ease;
}

.ceiling-light::after {
  content: "";

  position: absolute;

  top: 0;
  left: 50%;

  width: 130%;
  height: 74vh;

  opacity: 0.7;

  background:
    linear-gradient(
      180deg,
      rgba(255, 233, 207, 0.12),
      transparent 77%
    );

  clip-path:
    polygon(
      29% 0,
      71% 0,
      100% 100%,
      0 100%
    );

  transform:
    translateX(-50%);
}

.back-wall {
  position: absolute;

  top: 8%;
  right: 18%;
  bottom: 23%;
  left: 18%;

  border:
    1px solid
    rgba(255, 255, 255, 0.07);

  background:
    linear-gradient(
      180deg,
      #191820,
      #0e0d12
    );

  box-shadow:
    inset 0 -60px 100px
    rgba(0, 0, 0, 0.5);
}

.left-wall,
.right-wall {
  position: absolute;

  top: 0;
  bottom: 0;

  width: 32%;

  background:
    linear-gradient(
      90deg,
      #08080b,
      #16141b
    );
}

.left-wall {
  left: 0;

  clip-path:
    polygon(
      0 0,
      100% 8%,
      100% 77%,
      0 100%
    );
}

.right-wall {
  right: 0;

  clip-path:
    polygon(
      0 8%,
      100% 0,
      100% 100%,
      0 77%
    );

  transform:
    scaleX(-1);
}

.museum-floor {
  position: absolute;

  right: -15%;
  bottom: -24%;
  left: -15%;

  height: 60%;

  background:
    linear-gradient(
      180deg,
      #15131a,
      #060609 86%
    );

  clip-path:
    polygon(
      18% 0,
      82% 0,
      100% 100%,
      0 100%
    );

  transform:
    perspective(900px)
    rotateX(59deg);

  transform-origin:
    bottom;
}

.museum-floor::before {
  content: "";

  position: absolute;
  inset: 0;

  opacity: 0.17;

  background:
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent 12.4%,
      rgba(255, 255, 255, 0.09) 12.5%
    ),

    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 19.7%,
      rgba(255, 255, 255, 0.08) 20%
    );
}

.floor-reflection {
  position: absolute;

  right: 25%;
  bottom: -18%;
  left: 25%;

  height: 53%;

  opacity: 0.2;

  background:
    linear-gradient(
      180deg,
      rgba(255, 75, 66, 0.62),
      transparent 82%
    );

  filter:
    blur(22px);

  transform:
    perspective(700px)
    rotateX(57deg);

  transition:
    opacity 900ms ease,
    background 900ms ease;
}


/* ==========================================
   FIL DU POULS
========================================== */

.pulse-thread {
  position: absolute;

  top: 50%;
  right: 0;
  left: 0;

  z-index: 6;

  height: 1px;

  opacity: 0.52;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255, 52, 52, 0.15) 25%,
      rgba(255, 85, 73, 0.75) 50%,
      rgba(255, 52, 52, 0.15) 75%,
      transparent
    );

  box-shadow:
    0 0 15px
    rgba(255, 44, 45, 0.27);
}

.pulse-thread span {
  position: absolute;

  top: 50%;
  left: -8%;

  width: 7%;
  height: 3px;

  background:
    linear-gradient(
      90deg,
      transparent,
      #fff0dc,
      #ff4141,
      transparent
    );

  filter:
    blur(0.5px);

  transform:
    translateY(-50%);

  animation:
    pulseTravel
    3.2s linear infinite;
}


/* ==========================================
   CORPS IMMOBILE
========================================== */

.sleeping-installation {
  position: absolute;

  top: 20%;
  left: 50%;

  z-index: 8;

  width:
    min(62vw, 810px);

  height: 55vh;

  opacity: 1;

  transform:
    translate(
      calc(-50% + var(--pointer-x)),
      var(--pointer-y)
    );

  transition:
    opacity 900ms ease,
    transform 1200ms ease;
}

.action-page:not(
  [data-scene="introduction"]
)
.sleeping-installation {
  opacity: 0;

  transform:
    translate(-50%, 35px)
    scale(0.93);
}

.installation-beam {
  position: absolute;

  top: 0;
  left: 50%;

  width: 42%;
  height: 80%;

  background:
    linear-gradient(
      180deg,
      rgba(255, 237, 211, 0.17),
      rgba(255, 92, 71, 0.04),
      transparent
    );

  clip-path:
    polygon(
      31% 0,
      69% 0,
      100% 100%,
      0 100%
    );

  filter:
    blur(5px);

  transform:
    translateX(-50%);
}

.sleeping-platform {
  position: absolute;

  top: 57%;
  left: 50%;

  width: 68%;
  height: 12%;

  border-top:
    1px solid
    rgba(255, 245, 228, 0.67);

  border-right:
    1px solid
    rgba(255, 255, 255, 0.12);

  border-left:
    1px solid
    rgba(255, 255, 255, 0.12);

  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0.01)
    );

  transform:
    translateX(-50%)
    perspective(600px)
    rotateX(63deg);
}

.body-trace {
  position: absolute;

  top: 55%;
  left: 50%;

  width: 54%;
  height: 4px;

  border-radius: 50%;

  opacity: 0.74;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255, 242, 224, 0.5),
      rgba(255, 134, 117, 0.77),
      rgba(255, 242, 224, 0.5),
      transparent
    );

  box-shadow:
    0 0 17px
    rgba(255, 170, 147, 0.45),

    0 0 50px
    rgba(255, 64, 55, 0.15);

  filter:
    blur(1px);

  transform:
    translateX(-50%);
}


/* ==========================================
   SOURCE DU POULS
========================================== */

.pulse-source {
  position: absolute;

  top: 49%;
  left: 50%;

  z-index: 30;

  width: 16px;
  height: 16px;

  transform:
    translate(-50%, -50%);
}

.pulse-core {
  position: absolute;
  inset: 0;

  display: block;

  border-radius: 50%;

  background:
    #fff2df;

  box-shadow:
    0 0 11px #fff2df,
    0 0 28px #ff443d,
    0 0 75px rgba(255, 38, 42, 0.75),
    0 0 150px rgba(166, 3, 24, 0.4);
}

.action-page.beat
.pulse-core {
  animation:
    pulseImpact
    430ms ease-out;
}

.pulse-ring {
  position: absolute;

  top: 50%;
  left: 50%;

  display: block;

  width: 45px;
  height: 45px;

  border:
    1px solid
    rgba(255, 70, 63, 0.65);

  border-radius: 50%;

  opacity: 0;

  transform:
    translate(-50%, -50%);
}

.action-page.beat
.ring-one {
  animation:
    pulseExpansion
    1000ms ease-out;
}

.action-page.beat
.ring-two {
  animation:
    pulseExpansion
    1000ms 100ms ease-out;
}

.action-page.beat
.ring-three {
  animation:
    pulseExpansion
    1000ms 200ms ease-out;
}


/* ==========================================
   THE CHASE
========================================== */

.chase-space {
  position: absolute;

  top: 11%;
  left: 50%;

  z-index: 9;

  width:
    min(68vw, 950px);

  height: 76vh;

  visibility: hidden;

  opacity: 0;

  transform:
    translateX(-50%)
    scale(0.94);

  transition:
    opacity 900ms ease,
    transform 1200ms ease,
    visibility 900ms ease;
}

.action-page[data-scene="chase"]
.chase-space {
  visibility: visible;

  opacity: 1;

  transform:
    translateX(-50%)
    scale(1);
}

.chase-frame {
  position: absolute;

  top: 50%;
  left: 50%;

  display: block;

  border:
    1px solid
    rgba(255, 79, 65, 0.43);

  box-shadow:
    inset 0 0 45px
    rgba(255, 37, 37, 0.04);

  transform:
    translate(-50%, -50%);
}

.frame-one {
  width: 100%;
  height: 100%;
}

.frame-two {
  width: 78%;
  height: 80%;
}

.frame-three {
  width: 58%;
  height: 62%;
}

.frame-four {
  width: 39%;
  height: 44%;
}

.frame-five {
  width: 23%;
  height: 28%;
}

.moving-exit {
  position: absolute;

  top: 50%;
  left: 50%;

  display: grid;
  place-items: center;

  width: 11%;
  height: 21%;

  border:
    1px solid
    rgba(255, 235, 212, 0.56);

  background:
    linear-gradient(
      180deg,
      rgba(255, 222, 191, 0.28),
      rgba(255, 58, 51, 0.09)
    );

  box-shadow:
    0 0 35px
    rgba(255, 65, 54, 0.24);

  transform:
    translate(-50%, -50%);

  animation:
    exitRetreat
    4.2s ease-in-out infinite;
}

.moving-exit span {
  font-size: 7px;

  letter-spacing: 0.2em;

  opacity: 0.65;
}

.action-page[data-scene="chase"]
.ceiling-light {
  width: 65%;

  background:
    #ff5148;

  box-shadow:
    0 0 20px
    rgba(255, 67, 57, 0.73),

    0 0 100px
    rgba(255, 36, 37, 0.24);
}


/* ==========================================
   THE FALL
========================================== */

.fall-space {
  position: absolute;

  top: 47%;
  left: 50%;

  z-index: 10;

  width:
    min(57vw, 790px);

  aspect-ratio: 1.55;

  visibility: hidden;

  opacity: 0;

  transform:
    translate(-50%, -42%)
    perspective(900px)
    rotateX(65deg)
    scale(0.72);

  transition:
    opacity 1000ms ease,
    transform 1500ms
    cubic-bezier(
      0.2,
      0.8,
      0.2,
      1
    ),
    visibility 900ms ease;
}

.action-page[data-scene="fall"]
.fall-space {
  visibility: visible;

  opacity: 1;

  transform:
    translate(-50%, -42%)
    perspective(900px)
    rotateX(65deg)
    scale(1);
}

.fall-edge,
.fall-layer,
.fall-centre {
  position: absolute;

  border:
    1px solid
    rgba(102, 130, 204, 0.46);

  background:
    transparent;

  box-shadow:
    inset 0 0 65px
    rgba(34, 61, 135, 0.16);
}

.fall-edge {
  inset: 0;

  background:
    radial-gradient(
      ellipse,
      #020308,
      #080b17 58%,
      rgba(39, 58, 110, 0.34)
    );
}

.layer-one {
  inset: 10%;
}

.layer-two {
  inset: 21%;
}

.layer-three {
  inset: 33%;
}

.layer-four {
  inset: 44%;
}

.fall-centre {
  inset: 48%;

  min-width: 4%;
  min-height: 4%;

  background:
    #000104;

  box-shadow:
    0 0 50px
    rgba(51, 79, 160, 0.4);
}

.action-page[data-scene="fall"]
.floor-reflection {
  opacity: 0.35;

  background:
    linear-gradient(
      180deg,
      rgba(54, 83, 165, 0.78),
      transparent 82%
    );
}

.action-page[data-scene="fall"]
.pulse-core {
  box-shadow:
    0 0 11px #f0edff,
    0 0 35px #4b69c0,
    0 0 100px rgba(43, 68, 155, 0.72);
}


/* ==========================================
   THE IMPACT
========================================== */

.impact-space {
  position: absolute;

  top: 11%;
  left: 50%;

  z-index: 11;

  width:
    min(68vw, 960px);

  height: 76vh;

  visibility: hidden;

  opacity: 0;

  transform:
    translateX(-50%)
    scale(0.94);

  transition:
    opacity 900ms ease,
    transform 1200ms ease,
    visibility 900ms ease;
}

.action-page[data-scene="impact"]
.impact-space {
  visibility: visible;

  opacity: 1;

  transform:
    translateX(-50%)
    scale(1);
}

.impact-wall {
  position: absolute;
  inset: 0;

  border:
    1px solid
    rgba(255, 255, 255, 0.11);

  background:
    linear-gradient(
      145deg,
      rgba(37, 17, 22, 0.78),
      rgba(15, 9, 13, 0.92)
    );

  box-shadow:
    0 30px 100px
    rgba(0, 0, 0, 0.6);
}

.impact-wall::after {
  content: "";

  position: absolute;
  inset: 0;

  opacity: 0.3;

  background:
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent 69px,
      rgba(255, 255, 255, 0.025) 70px
    ),

    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 69px,
      rgba(255, 255, 255, 0.025) 70px
    );
}

.impact-point {
  position: absolute;

  z-index: 3;

  display: block;

  width: 4px;
  height: 4px;

  border-radius: 50%;

  background:
    #fff2dc;

  box-shadow:
    0 0 11px #fff2dc,
    0 0 33px #ff413d,
    0 0 80px rgba(255, 25, 38, 0.75);
}

.point-one {
  top: 26%;
  left: 29%;
}

.point-two {
  top: 63%;
  left: 42%;
}

.point-three {
  top: 32%;
  left: 69%;
}

.point-four {
  top: 72%;
  left: 77%;
}

.action-page.beat
.impact-point {
  animation:
    impactMark
    670ms ease-out;
}

.impact-light {
  position: absolute;
  inset: 0;

  opacity: 0;

  background:
    radial-gradient(
      circle,
      rgba(255, 236, 207, 0.78),
      rgba(255, 47, 42, 0.22) 20%,
      transparent 56%
    );
}

.action-page[data-scene="impact"].beat
.impact-light {
  animation:
    impactFlash
    450ms ease-out;
}


/* ==========================================
   NIGHTMARE
========================================== */

.nightmare-space {
  position: absolute;
  inset: 0;

  z-index: 12;

  visibility: hidden;

  opacity: 0;

  transition:
    opacity 1400ms ease,
    visibility 1400ms ease;
}

.action-page[data-scene="nightmare"]
.nightmare-space {
  visibility: visible;

  opacity: 1;
}

.nightmare-door {
  position: absolute;

  top: 10%;
  left: 50%;

  width:
    min(40vw, 520px);

  height: 78vh;

  border:
    1px solid
    rgba(255, 255, 255, 0.08);

  background:
    #010102;

  box-shadow:
    0 40px 140px
    rgba(0, 0, 0, 0.88);

  transform:
    translateX(-50%);
}

.door-interior {
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      ellipse at 50% 43%,
      #180308,
      #030104 60%,
      #000 100%
    );
}

.door-pulse {
  position: absolute;

  right: 0;
  bottom: 0;
  left: 0;

  height: 3px;

  background:
    #ff3435;

  box-shadow:
    0 0 18px #ff3435,
    0 -14px 65px
    rgba(255, 39, 42, 0.44),

    0 -80px 140px
    rgba(125, 3, 18, 0.26);

  animation:
    nightmarePulse
    1s ease-in-out infinite;
}

.action-page[data-scene="nightmare"]
.ceiling-light {
  width: 9%;

  opacity: 0.17;

  background:
    #ff3435;
}


/* ==========================================
   PARTICULES
========================================== */

.action-particles {
  position: absolute;
  inset: 0;

  z-index: 18;

  overflow: hidden;
}

.action-particle {
  position: absolute;

  display: block;

  width: 2px;
  height: 2px;

  border-radius: 50%;

  opacity:
    var(--particle-opacity);

  background:
    rgba(255, 237, 219, 0.8);

  box-shadow:
    0 0 6px
    rgba(255, 210, 195, 0.5);

  animation:
    particleRise
    var(--particle-duration)
    linear infinite;

  animation-delay:
    var(--particle-delay);
}


/* ==========================================
   HEADER
========================================== */

.action-header {
  position: fixed;

  top: 0;
  left: 0;

  z-index: 100;

  display: grid;

  grid-template-columns:
    1fr auto 1fr;

  align-items: center;

  width: 100%;

  padding:
    24px 36px;

  font-size: 8px;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  pointer-events: none;
}

.action-header a,
.action-header button {
  pointer-events: auto;
}

.room-location {
  display: flex;
  align-items: center;

  gap: 10px;
}

.location-pulse {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: var(--red);

  box-shadow:
    0 0 9px var(--red);
}

.action-page.beat
.location-pulse {
  animation:
    locationBeat
    420ms ease-out;
}

#sound-control {
  justify-self: end;

  padding: 0;

  border: 0;

  color: var(--ivory);
  background: transparent;

  font-size: 7px;

  letter-spacing: 0.12em;

  cursor: pointer;

  opacity: 0.52;
}


/* ==========================================
   CARTEL
========================================== */

.museum-label {
  position: fixed;

  right: 35px;
  bottom: 31px;

  z-index: 90;

  width: 240px;

  padding-top: 17px;

  border-top:
    1px solid
    rgba(255, 255, 255, 0.22);

  pointer-events: none;
}

.museum-label > span {
  display: block;

  margin-bottom: 9px;

  color: #ff746b;

  font-size: 7px;

  letter-spacing: 0.14em;

  text-transform: uppercase;
}

.museum-label > strong {
  display: block;

  margin-bottom: 10px;

  font-family:
    "Italiana",
    Georgia,
    serif;

  font-size: 20px;

  font-weight: 400;
}

.museum-label > p {
  margin:
    0 0 14px;

  font-size: 7px;

  line-height: 1.65;

  letter-spacing: 0.07em;

  opacity: 0.51;
}

.museum-label dl {
  margin: 0;
}

.museum-label dl div {
  display: flex;
  justify-content: space-between;

  gap: 15px;

  margin-top: 5px;
}

.museum-label dt,
.museum-label dd {
  margin: 0;

  font-size: 6px;

  letter-spacing: 0.08em;

  text-transform: uppercase;
}

.museum-label dt {
  opacity: 0.38;
}

.museum-label dd {
  color: #ff7f75;

  text-align: right;
}

.museum-label small {
  display: block;

  margin-top: 15px;

  font-size: 6px;

  letter-spacing: 0.12em;

  opacity: 0.32;
}


/* ==========================================
   RECHERCHE
========================================== */

.research-note {
  position: fixed;

  bottom: 31px;
  left: 35px;

  z-index: 90;

  width: 310px;

  opacity: 0.72;
}

.research-note > span {
  display: block;

  margin-bottom: 10px;

  color: #ff776d;

  font-size: 7px;

  letter-spacing: 0.14em;

  text-transform: uppercase;
}

.research-note p {
  margin:
    0 0 9px;

  font-family:
    "Italiana",
    Georgia,
    serif;

  font-size: 12px;

  line-height: 1.42;
}

.research-note strong {
  display: block;

  margin-bottom: 9px;

  font-size: 6px;

  font-weight: 400;

  letter-spacing: 0.14em;

  opacity: 0.55;
}

#research-source {
  display: inline-block;

  padding-bottom: 3px;

  border-bottom:
    1px solid
    rgba(255, 255, 255, 0.26);

  font-size: 6px;

  letter-spacing: 0.12em;

  pointer-events: auto;
}


/* ==========================================
   SECTIONS
========================================== */

.action-journey {
  position: relative;

  z-index: 50;
}

.action-scene {
  position: relative;

  display: grid;
  place-items: center;

  width: 100%;
  min-height: 100vh;

  padding:
    110px 290px 155px;

  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.scene-content {
  width:
    min(780px, 100%);

  opacity: 0;

  filter:
    blur(10px);

  text-align: center;

  pointer-events: none;

  transform:
    translateY(36px)
    scale(0.97);

  transition:
    opacity 850ms ease,
    filter 950ms ease,
    transform 1050ms
    cubic-bezier(
      0.2,
      0.8,
      0.2,
      1
    );
}

.action-scene.active
.scene-content {
  opacity: 1;

  filter:
    blur(0);

  pointer-events: auto;

  transform:
    translateY(0)
    scale(1);
}

.scene-room {
  margin:
    0 0 29px;

  font-size: 8px;

  letter-spacing: 0.2em;

  text-transform: uppercase;

  opacity: 0.52;
}

.scene-content h1,
.scene-content h2 {
  margin: 0;

  font-family:
    "Italiana",
    Georgia,
    serif;

  font-size:
    clamp(72px, 10.5vw, 165px);

  font-weight: 400;

  line-height: 0.76;

  letter-spacing: -0.06em;
}

.scene-content h1 em,
.scene-content h2 em {
  display: block;

  color: #ff746b;

  font-family:
    "Gloock",
    Georgia,
    serif;

  font-weight: 400;
}

.main-sentence,
.final-sentence {
  max-width: 600px;

  margin:
    48px auto 0;

  font-family:
    "Italiana",
    Georgia,
    serif;

  font-size:
    clamp(23px, 2.6vw, 39px);

  line-height: 1.06;
}

.main-sentence span,
.final-sentence span {
  display: block;

  margin-top: 9px;

  color: #ff978d;
}

.curatorial-description {
  max-width: 540px;

  margin:
    27px auto 0;

  font-size: 8px;

  line-height: 1.75;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  opacity: 0.47;
}

.nightmare-warning {
  max-width: 500px;

  margin:
    34px auto 50px;

  color: #ff8a82;

  font-family:
    "Italiana",
    Georgia,
    serif;

  font-size:
    clamp(19px, 2vw, 29px);

  line-height: 1.12;
}

.enter-nightmare {
  display: inline-block;

  margin-top: 48px;

  padding:
    15px 24px;

  border:
    1px solid
    rgba(255, 76, 70, 0.71);

  background:
    rgba(88, 2, 15, 0.3);

  font-size: 8px;

  letter-spacing: 0.15em;

  cursor: pointer;

  pointer-events: auto;

  transition:
    color 300ms ease,
    background 300ms ease,
    box-shadow 300ms ease;
}

.enter-nightmare:hover {
  color: #110507;

  background:
    #ff625a;

  box-shadow:
    0 0 45px
    rgba(255, 47, 49, 0.34);
}


/* ==========================================
   PROGRESSION
========================================== */

.action-progress {
  position: fixed;

  top: 50%;
  right: 17px;

  z-index: 100;

  width: 1px;
  height: 170px;

  background:
    rgba(255, 255, 255, 0.13);

  pointer-events: none;

  transform:
    translateY(-50%);
}

.action-progress span {
  display: block;

  width: 100%;
  height: 0;

  background:
    linear-gradient(
      #fff2df,
      #ff3738
    );

  box-shadow:
    0 0 8px
    #ff3738;

  transition:
    height 600ms ease;
}

.scroll-instruction {
  position: fixed;

  top: 50%;
  right: 31px;

  z-index: 95;

  margin: 0;

  font-size: 6px;

  letter-spacing: 0.14em;

  opacity: 0.3;

  writing-mode:
    vertical-rl;

  pointer-events: none;

  transform:
    translateY(-50%);
}


/* ==========================================
   ANIMATIONS
========================================== */

@keyframes pulseTravel {
  from {
    left: -8%;
  }

  to {
    left: 105%;
  }
}

@keyframes pulseImpact {
  0% {
    transform:
      scale(1);
  }

  18% {
    transform:
      scale(3.2);
  }

  42% {
    transform:
      scale(1.45);
  }

  100% {
    transform:
      scale(1);
  }
}

@keyframes pulseExpansion {
  0% {
    opacity: 0.72;

    transform:
      translate(-50%, -50%)
      scale(0.25);
  }

  100% {
    opacity: 0;

    transform:
      translate(-50%, -50%)
      scale(8);
  }
}

@keyframes exitRetreat {
  0%,
  100% {
    transform:
      translate(-50%, -50%)
      scale(1);
  }

  50% {
    transform:
      translate(-50%, -50%)
      scale(0.54);
  }
}

@keyframes impactMark {
  0% {
    transform:
      scale(1);
  }

  30% {
    transform:
      scale(4.7);

    box-shadow:
      0 0 20px #fff2dc,
      0 0 70px #ff413d,
      0 0 150px
      rgba(255, 25, 38, 0.82);
  }

  100% {
    transform:
      scale(1);
  }
}

@keyframes impactFlash {
  0% {
    opacity: 0;
  }

  17% {
    opacity: 0.85;
  }

  100% {
    opacity: 0;
  }
}

@keyframes nightmarePulse {
  0%,
  20%,
  100% {
    opacity: 0.45;
  }

  8% {
    opacity: 1;

    box-shadow:
      0 0 26px #ff3435,
      0 -20px 90px
      rgba(255, 38, 42, 0.74);
  }
}

@keyframes particleRise {
  from {
    transform:
      translateY(12vh);
  }

  to {
    transform:
      translateY(-115vh);
  }
}

@keyframes locationBeat {
  0% {
    transform:
      scale(1);
  }

  25% {
    transform:
      scale(2.4);
  }

  100% {
    transform:
      scale(1);
  }
}


/* ==========================================
   TABLETTE
========================================== */

@media (max-width: 950px) {
  .action-header {
    grid-template-columns:
      1fr auto;

    padding:
      19px 21px;
  }

  .room-location {
    display: none;
  }

  .action-scene {
    padding:
      95px 45px 190px;
  }

  .museum-label {
    right: 21px;
    bottom: 25px;

    width: 205px;
  }

  .research-note {
    bottom: 25px;
    left: 21px;

    width: 270px;
  }

  .chase-space,
  .impact-space {
    width: 92vw;
  }

  .fall-space {
    width: 80vw;
  }

  .nightmare-door {
    width: 64vw;
  }

  .scroll-instruction {
    display: none;
  }

  .action-progress {
    right: 8px;
  }
}


/* ==========================================
   MOBILE
========================================== */

@media (max-width: 600px) {
  .action-header {
    padding:
      18px 19px;

    font-size: 7px;
  }

  #sound-control {
    font-size: 6px;
  }

  .action-scene {
    padding:
      90px 20px 185px;
  }

  .scene-content h1,
  .scene-content h2 {
    font-size:
      clamp(65px, 21vw, 105px);
  }

  .main-sentence,
  .final-sentence {
    font-size:
      clamp(23px, 7vw, 32px);
  }

  .museum-label {
    display: none;
  }

  .research-note {
    right: 80px;
    bottom: 20px;
    left: 19px;

    width: auto;
  }

  .research-note p {
    font-size: 10px;
  }

  .research-note > span,
  .research-note strong,
  #research-source {
    font-size: 5px;
  }

  .sleeping-installation {
    width: 110vw;
  }

  .chase-space,
  .impact-space {
    width: 96vw;
  }

  .fall-space {
    width: 94vw;
  }

  .nightmare-door {
    width: 78vw;
  }

  .action-progress {
    display: none;
  }

  .enter-nightmare {
    margin-top: 38px;
  }
}


/* ==========================================
   ACCESSIBILITÉ
========================================== */

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration:
      0.01ms !important;

    animation-iteration-count:
      1 !important;

    transition-duration:
      0.01ms !important;
  }
}
