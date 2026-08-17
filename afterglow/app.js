/* =========================================================
   NAVBAR
========================================================= */

const navbar =
    document.getElementById(
        "navbar"
    );


window.addEventListener(
    "scroll",
    () => {

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 60
        );

    }
);


/* =========================================================
   LIVE TIME + HERO ATMOSPHERE
========================================================= */

const currentTime =
    document.getElementById(
        "currentTime"
    );


const heroGreeting =
    document.getElementById(
        "heroGreeting"
    );


const heroImage =
    document.getElementById(
        "heroImage"
    );


function updateTime() {

    const now =
        new Date();


    const hours =
        now
            .getHours()
            .toString()
            .padStart(
                2,
                "0"
            );


    const minutes =
        now
            .getMinutes()
            .toString()
            .padStart(
                2,
                "0"
            );


    currentTime.textContent =
        `${hours}:${minutes}`;


    const hour =
        now.getHours();


    if (
        hour >= 5 &&
        hour < 12
    ) {

        heroGreeting.textContent =
            "GOOD MORNING.";


        document.documentElement
            .style
            .setProperty(
                "--rose",
                "#e8b29c"
            );

    } else if (
        hour >= 12 &&
        hour < 17
    ) {

        heroGreeting.textContent =
            "GOOD AFTERNOON.";

    } else if (
        hour >= 17 &&
        hour < 22
    ) {

        heroGreeting.textContent =
            "GOOD EVENING.";

    } else {

        heroGreeting.textContent =
            "STAY A WHILE.";

    }

}


updateTime();


setInterval(
    updateTime,
    30000
);


/* =========================================================
   GLOW CURSOR
========================================================= */

const glowCursor =
    document.getElementById(
        "glowCursor"
    );


let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;


window.addEventListener(
    "mousemove",
    event => {

        targetX =
            event.clientX;

        targetY =
            event.clientY;

    }
);


function animateCursor() {

    currentX +=
        (
            targetX -
            currentX
        )
        *
        .08;


    currentY +=
        (
            targetY -
            currentY
        )
        *
        .08;


    glowCursor.style.left =
        `${currentX}px`;


    glowCursor.style.top =
        `${currentY}px`;


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


/* =========================================================
   FEELING SELECTOR
========================================================= */

const feelingData = {

    quiet: {

        title:
            "QUIET",

        description:
            "Gardens, privacy, soft mornings and space away from the city."

    },


    social: {

        title:
            "SOCIAL",

        description:
            "Restaurants, rooftops, neighbours and places where life happens outside your front door."

    },


    warm: {

        title:
            "WARM",

        description:
            "Natural materials, layered light and spaces designed for long conversations."

    },


    private: {

        title:
            "PRIVATE",

        description:
            "Generous setbacks, enclosed gardens and rooms that belong entirely to you."

    },


    open: {

        title:
            "OPEN",

        description:
            "Views, glass, terraces and layouts where the boundaries between inside and outside disappear."

    },


    connected: {

        title:
            "CONNECTED",

        description:
            "Work, restaurants, schools and culture all within easy reach."

    }

};


const selectedFeeling =
    document.getElementById(
        "selectedFeeling"
    );


const feelingDescription =
    document.getElementById(
        "feelingDescription"
    );


document
    .querySelectorAll(
        ".feeling-word"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".feeling-word"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                const feeling =
                    feelingData[
                        button.dataset.feeling
                    ];


                selectedFeeling
                    .animate(
                        [
                            {
                                opacity: 0,
                                transform:
                                    "translateY(10px)"
                            },

                            {
                                opacity: 1,
                                transform:
                                    "translateY(0)"
                            }
                        ],
                        {
                            duration: 400
                        }
                    );


                selectedFeeling.textContent =
                    feeling.title;


                feelingDescription.textContent =
                    feeling.description;

            }
        );

    });


/* =========================================================
   MOMENTS
========================================================= */

const moments = [

    {
        time:
            "06:27",

        title:
            "WAKE",

        text:
            "Large east-facing windows. Garden light reaches the bedroom before the city wakes.",

        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1900&q=90"

    },


    {
        time:
            "13:42",

        title:
            "GATHER",

        text:
            "Lunch stretches into the afternoon as the courtyard becomes the centre of the house.",

        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1900&q=90"

    },


    {
        time:
            "18:53",

        title:
            "EXHALE",

        text:
            "The doors open. The garden becomes another room as the final light moves through the trees.",

        image:
            "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1900&q=90"

    },


    {
        time:
            "22:16",

        title:
            "RETREAT",

        text:
            "Quiet after dark. Soft interior light and the feeling that the day can finally slow down.",

        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1900&q=90"

    }

];


const momentImage =
    document.getElementById(
        "momentImage"
    );


const momentTime =
    document.getElementById(
        "momentTime"
    );


const momentTitle =
    document.getElementById(
        "momentTitle"
    );


const momentText =
    document.getElementById(
        "momentText"
    );


document
    .querySelectorAll(
        ".moment-tabs button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        button.dataset.moment
                    );


                const moment =
                    moments[index];


                document
                    .querySelectorAll(
                        ".moment-tabs button"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                momentImage.style.opacity =
                    "0";


                setTimeout(() => {

                    momentImage.style.backgroundImage =
                        `url("${moment.image}")`;


                    momentTime.textContent =
                        moment.time;


                    momentTitle.textContent =
                        moment.title;


                    momentText.textContent =
                        moment.text;


                    momentImage.style.opacity =
                        "1";

                }, 270);

            }
        );

    });


/* =========================================================
   IMAGE PARALLAX
========================================================= */

const storyImages =
    document.querySelectorAll(
        ".story-media img"
    );


window.addEventListener(
    "scroll",
    () => {

        storyImages.forEach(
            image => {

                const container =
                    image.parentElement;


                const rect =
                    container
                        .getBoundingClientRect();


                const offset =
                    (
                        rect.top +
                        rect.height / 2 -
                        window.innerHeight / 2
                    )
                    *
                    -.035;


                image.style.transform =
                    `translateY(${offset}px) scale(1.04)`;

            }
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   SOUND TOGGLE
========================================================= */

/*
    We intentionally do not autoplay audio.

    Replace this later with:
    const ambience = new Audio("assets/karen-ambience.mp3");

    For now the UI interaction works.
*/

const soundButton =
    document.getElementById(
        "soundButton"
    );


let soundEnabled = false;


soundButton.addEventListener(
    "click",
    () => {

        soundEnabled =
            !soundEnabled;


        soundButton.textContent =
            soundEnabled
                ? "◉ SOUND ON"
                : "◉ SOUND OFF";


        if (soundEnabled) {

            soundButton.style.color =
                "#ff7849";

        } else {

            soundButton.style.color =
                "";

        }

    }
);


/* =========================================================
   SCROLL-BASED HERO PARALLAX
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY <
            window.innerHeight
        ) {

            heroImage.style.transform =
                `translateY(${
                    window.scrollY *
                    .12
                }px) scale(1.03)`;

        }

    },
    {
        passive: true
    }
);