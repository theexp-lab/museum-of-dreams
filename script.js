/* ==========================================
   THE MUSEUM OF DREAMS
   INTERACTIONS GÉNÉRALES
========================================== */


/* ==========================================
   ÉLÉMENTS DE LA PAGE D’INTRODUCTION
========================================== */

const introPage =
  document.querySelector(
    ".intro-page"
  );


const dreamPortal =
  document.querySelector(
    "#dream-portal"
  );


/* ==========================================
   MOUVEMENT DU PORTAIL AVEC LA SOURIS
========================================== */

if (
  introPage &&
  dreamPortal
) {

  window.addEventListener(
    "pointermove",
    function (event) {

      /*
       * Position de la souris par rapport
       * au centre de l’écran.
       */

      const centerX =
        window.innerWidth / 2;


      const centerY =
        window.innerHeight / 2;


      const distanceX =
        event.clientX -
        centerX;


      const distanceY =
        event.clientY -
        centerY;


      /*
       * Limite le mouvement pour éviter
       * que le portail quitte l’écran.
       */

      const limitedX =
        Math.max(
          -100,
          Math.min(
            100,
            distanceX
          )
        );


      const limitedY =
        Math.max(
          -100,
          Math.min(
            100,
            distanceY
          )
        );


      /*
       * Envoie les valeurs au CSS.
       */

      introPage.style.setProperty(

        "--mouse-x",

        limitedX + "px"

      );


      introPage.style.setProperty(

        "--mouse-y",

        limitedY + "px"

      );

    }
  );


  /* ==========================================
     CLIC SUR LE PORTAIL
  =========================================== */

  dreamPortal.addEventListener(
    "click",
    function () {

      /*
       * Empêche plusieurs clics pendant
       * l’animation.
       */

      if (
        introPage.classList.contains(
          "leaving"
        )
      ) {

        return;

      }


      /*
       * Lance l’animation qui recouvre
       * progressivement tout l’écran.
       */

      introPage.classList.add(
        "leaving"
      );


      /*
       * Après l’animation, ouverture
       * de la page suivante.
       */

      window.setTimeout(
        function () {

          window.location.href =
            "sleep.html";

        },
        1400
      );

    }
  );

}


/* ==========================================
   NAVIGATION AU CLAVIER

   La touche Entrée permet aussi
   de commencer l’expérience.
========================================== */

window.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Enter" &&
      dreamPortal
    ) {

      dreamPortal.click();

    }

  }
);
