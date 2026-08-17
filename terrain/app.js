/* =========================================================
   LOADER
========================================================= */

const loader =
    document.getElementById("loader");

const loaderNumber =
    document.getElementById("loaderNumber");

const loaderBar =
    document.getElementById("loaderBar");


let loaderValue = 0;


const loaderTimer =
    setInterval(() => {

        loaderValue +=
            Math.ceil(
                Math.random() * 13
            );


        if (loaderValue >= 100) {

            loaderValue = 100;

            clearInterval(
                loaderTimer
            );


            setTimeout(() => {

                loader.classList.add(
                    "hide"
                );

            }, 300);

        }


        loaderNumber.textContent =
            String(loaderValue)
                .padStart(
                    2,
                    "0"
                );


        loaderBar.style.width =
            `${loaderValue}%`;

    }, 80);


/* FAILSAFE */

setTimeout(() => {

    loader.classList.add(
        "hide"
    );

}, 3000);


/* =========================================================
   NAV
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
            window.scrollY > 50
        );

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


document
    .getElementById(
        "mobileToggle"
    )
    .addEventListener(
        "click",
        () => {

            mobileMenu.classList.add(
                "active"
            );

        }
    );


document
    .getElementById(
        "mobileClose"
    )
    .addEventListener(
        "click",
        closeMenu
    );


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


function closeMenu() {

    mobileMenu.classList.remove(
        "active"
    );

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor =
    document.getElementById(
        "cursor"
    );


window.addEventListener(
    "mousemove",
    event => {

        cursor.style.left =
            `${event.clientX}px`;

        cursor.style.top =
            `${event.clientY}px`;

    }
);


document
    .querySelectorAll(
        "[data-cursor]"
    )
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursor.classList.add(
                    "large"
                );

                cursor.dataset.label =
                    element.dataset.cursor;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursor.classList.remove(
                    "large"
                );

                cursor.dataset.label = "";

            }
        );

    });


/* =========================================================
   TOPOGRAPHIC CANVAS
========================================================= */

const canvas =
    document.getElementById(
        "terrainCanvas"
    );


const ctx =
    canvas.getContext(
        "2d"
    );


let width;
let height;


let mouseX = 0;
let mouseY = 0;


function resizeCanvas() {

    width =
        canvas.width =
        window.innerWidth *
        devicePixelRatio;


    height =
        canvas.height =
        window.innerHeight *
        devicePixelRatio;


    canvas.style.width =
        `${window.innerWidth}px`;


    canvas.style.height =
        `${window.innerHeight}px`;


    ctx.scale(
        devicePixelRatio,
        devicePixelRatio
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


window.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);


const contourLines = [];


for (
    let i = 0;
    i < 24;
    i++
) {

    contourLines.push({

        radius:
            80 + i * 33,

        speed:
            .0007 +
            Math.random() *
            .001,

        offset:
            Math.random() *
            Math.PI *
            2,

        distortion:
            15 +
            Math.random() *
            28

    });

}


function drawContours(time) {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    const centerX =
        window.innerWidth *
        .57;


    const centerY =
        window.innerHeight *
        .52;


    contourLines.forEach(
        (line, index) => {

            ctx.beginPath();


            const segments = 140;


            for (
                let segment = 0;
                segment <= segments;
                segment++
            ) {

                const angle =
                    segment /
                    segments *
                    Math.PI *
                    2;


                const mouseInfluence =
                    Math.hypot(
                        mouseX - centerX,
                        mouseY - centerY
                    ) * .008;


                const wave =
                    Math.sin(
                        angle * 3 +
                        time *
                        line.speed +
                        line.offset
                    )
                    *
                    line.distortion;


                const secondWave =
                    Math.cos(
                        angle * 5 -
                        time *
                        line.speed *
                        .7
                    )
                    *
                    7;


                const radius =
                    line.radius +
                    wave +
                    secondWave +
                    mouseInfluence;


                const x =
                    centerX +
                    Math.cos(angle) *
                    radius *
                    1.35;


                const y =
                    centerY +
                    Math.sin(angle) *
                    radius *
                    .75;


                if (segment === 0) {

                    ctx.moveTo(
                        x,
                        y
                    );

                } else {

                    ctx.lineTo(
                        x,
                        y
                    );

                }

            }


            ctx.closePath();


            ctx.strokeStyle =
                index % 5 === 0
                    ? "rgba(231,221,204,.33)"
                    : "rgba(231,221,204,.16)";


            ctx.lineWidth =
                index % 5 === 0
                    ? 1.1
                    : .6;


            ctx.stroke();

        }
    );


    requestAnimationFrame(
        drawContours
    );

}


requestAnimationFrame(
    drawContours
);


/* =========================================================
   PROPERTY PARALLAX
========================================================= */

const propertyImages =
    document.querySelectorAll(
        ".site-image img"
    );


window.addEventListener(
    "scroll",
    () => {

        propertyImages.forEach(
            image => {

                const parent =
                    image.parentElement;


                const rect =
                    parent
                        .getBoundingClientRect();


                const offset =
                    (
                        rect.top +
                        rect.height / 2 -
                        window.innerHeight / 2
                    ) *
                    -.025;


                image.style.transform =
                    `translateY(calc(-5% + ${offset}px)) scale(1.03)`;

            }
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   DAY TIMELINE
========================================================= */

const dayMoments = [

    {
        time:
            "06:42",

        label:
            "MORNING LIGHT",

        description:
            "Eastern light reaches the bedroom before the city wakes.",

        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",

        background:
            "#d3b89c"
    },

    {
        time:
            "11:20",

        label:
            "COURTYARD",

        description:
            "At midday the courtyard becomes the centre of the house.",

        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",

        background:
            "#d8c9ad"
    },

    {
        time:
            "17:46",

        label:
            "GOLDEN HOUR",

        description:
            "The western terrace catches the final warm light of the afternoon.",

        image:
            "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1800&q=90",

        background:
            "#c97752"
    },

    {
        time:
            "21:13",

        label:
            "QUIET",

        description:
            "After dark, the garden becomes a quiet extension of the living room.",

        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90",

        background:
            "#293342"
    }

];


const dayStage =
    document.getElementById(
        "dayStage"
    );


const dayImage =
    document.getElementById(
        "dayImage"
    );


const dayTime =
    document.getElementById(
        "dayTime"
    );


const dayLabel =
    document.getElementById(
        "dayLabel"
    );


const dayDescription =
    document.getElementById(
        "dayDescription"
    );


document
    .querySelectorAll(
        ".day-option"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        button.dataset.index
                    );


                const moment =
                    dayMoments[index];


                document
                    .querySelectorAll(
                        ".day-option"
                    )
                    .forEach(option => {

                        option.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                dayImage.style.opacity =
                    "0";


                setTimeout(() => {

                    dayImage.style.backgroundImage =
                        `url("${moment.image}")`;


                    dayStage.style.background =
                        moment.background;


                    dayTime.textContent =
                        moment.time;


                    dayLabel.textContent =
                        moment.label;


                    dayDescription.textContent =
                        moment.description;


                    dayImage.style.opacity =
                        "1";

                }, 300);

            }
        );

    });


/* =========================================================
   TERRITORY DATA
========================================================= */

const territories = {

    karen: {

        id:
            "TERRITORY / 01",

        name:
            "Karen",

        description:
            "Mature gardens, generous plots and low-density residential living.",

        quiet:
            94,

        green:
            91,

        access:
            62,

        family:
            96

    },


    westlands: {

        id:
            "TERRITORY / 02",

        name:
            "Westlands",

        description:
            "High-energy urban living surrounded by restaurants, offices and culture.",

        quiet:
            52,

        green:
            58,

        access:
            97,

        family:
            70

    },


    kilimani: {

        id:
            "TERRITORY / 03",

        name:
            "Kilimani",

        description:
            "Walkable contemporary living with strong social and commercial connections.",

        quiet:
            64,

        green:
            66,

        access:
            93,

        family:
            78

    },


    runda: {

        id:
            "TERRITORY / 04",

        name:
            "Runda",

        description:
            "Private family residences surrounded by landscape and generous setbacks.",

        quiet:
            96,

        green:
            94,

        access:
            65,

        family:
            98

    }

};


document
    .querySelectorAll(
        ".map-node"
    )
    .forEach(node => {

        node.addEventListener(
            "click",
            () => {

                const place =
                    territories[
                        node.dataset.place
                    ];


                document
                    .querySelectorAll(
                        ".map-node"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                node.classList.add(
                    "active"
                );


                document.getElementById(
                    "territoryId"
                ).textContent =
                    place.id;


                document.getElementById(
                    "territoryName"
                ).textContent =
                    place.name;


                document.getElementById(
                    "territoryDescription"
                ).textContent =
                    place.description;


                document.getElementById(
                    "quietScore"
                ).textContent =
                    place.quiet;


                document.getElementById(
                    "greenScore"
                ).textContent =
                    place.green;


                document.getElementById(
                    "accessScore"
                ).textContent =
                    place.access;


                document.getElementById(
                    "familyScore"
                ).textContent =
                    place.family;

            }
        );

    });