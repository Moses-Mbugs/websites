/* =========================================================
   PROPERTY DATA
========================================================= */

const properties = [
    {
        id: 1,
        title: "The Atrium Residence",
        location: "Kilimani",
        type: "Apartment",
        purpose: "buy",
        price: 18.5,
        priceLabel: "KES 18,500,000",
        beds: 3,
        baths: 2,
        size: "1,850 sq ft",
        badge: "For Sale",
        image:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85"
    },

    {
        id: 2,
        title: "Serene Garden Villa",
        location: "Karen",
        type: "Villa",
        purpose: "buy",
        price: 72,
        priceLabel: "KES 72,000,000",
        beds: 5,
        baths: 5,
        size: "5,200 sq ft",
        badge: "Exclusive",
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
    },

    {
        id: 3,
        title: "Westview Penthouse",
        location: "Westlands",
        type: "Penthouse",
        purpose: "rent",
        price: 0.32,
        priceLabel: "KES 320,000 / month",
        beds: 3,
        baths: 3,
        size: "2,400 sq ft",
        badge: "For Rent",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
    },

    {
        id: 4,
        title: "Lavington Courtyard",
        location: "Lavington",
        type: "Townhouse",
        purpose: "buy",
        price: 35,
        priceLabel: "KES 35,000,000",
        beds: 4,
        baths: 4,
        size: "3,400 sq ft",
        badge: "For Sale",
        image:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"
    },

    {
        id: 5,
        title: "Runda Signature Home",
        location: "Runda",
        type: "Villa",
        purpose: "buy",
        price: 95,
        priceLabel: "KES 95,000,000",
        beds: 6,
        baths: 6,
        size: "6,800 sq ft",
        badge: "New",
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
    },

    {
        id: 6,
        title: "Kileleshwa Urban Loft",
        location: "Kileleshwa",
        type: "Apartment",
        purpose: "rent",
        price: 0.18,
        priceLabel: "KES 180,000 / month",
        beds: 2,
        baths: 2,
        size: "1,320 sq ft",
        badge: "For Rent",
        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
    }
];


/* =========================================================
   DOM REFERENCES
========================================================= */

const propertyGrid =
    document.getElementById("propertyGrid");

const navbar =
    document.getElementById("navbar");

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenuClose =
    document.getElementById("mobileMenuClose");

const propertyModal =
    document.getElementById("propertyModal");

const modalBackdrop =
    document.getElementById("modalBackdrop");

const modalClose =
    document.getElementById("modalClose");

const wishlistCount =
    document.getElementById("wishlistCount");

let favorites = new Set();


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("pageLoader")
            .classList.add("hide");

    }, 700);

});


/* =========================================================
   PROPERTY ICONS
========================================================= */

const bedIcon = `
<svg viewBox="0 0 24 24" fill="none"
stroke="currentColor" stroke-width="1.7">
<path d="M3 7v10"></path>
<path d="M21 10v7"></path>
<path d="M3 14h18"></path>
<path d="M6 14V9h5a3 3 0 0 1 3 3v2"></path>
</svg>
`;

const bathIcon = `
<svg viewBox="0 0 24 24" fill="none"
stroke="currentColor" stroke-width="1.7">
<path d="M4 13h16"></path>
<path d="M5 13v2a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5v-2"></path>
<path d="M7 13V6a2 2 0 0 1 4 0"></path>
</svg>
`;

const sizeIcon = `
<svg viewBox="0 0 24 24" fill="none"
stroke="currentColor" stroke-width="1.7">
<path d="M4 9V4h5"></path>
<path d="M20 9V4h-5"></path>
<path d="M4 15v5h5"></path>
<path d="M20 15v5h-5"></path>
</svg>
`;

const heartIcon = `
<svg viewBox="0 0 24 24" fill="none"
stroke="currentColor" stroke-width="1.8">
<path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2
a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8
a5.4 5.4 0 0 0 0-7.6z"></path>
</svg>
`;


/* =========================================================
   RENDER PROPERTIES
========================================================= */

function renderProperties(list) {

    propertyGrid.innerHTML = "";

    if (list.length === 0) {

        propertyGrid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:70px 20px;
                color:#777;
            ">
                No properties match your search.
            </div>
        `;

        return;
    }

    list.forEach((property, index) => {

        const card =
            document.createElement("article");

        card.className = "property-card";

        card.style.animationDelay =
            `${index * 0.07}s`;

        card.innerHTML = `

            <div
                class="property-image"
                data-property-id="${property.id}"
            >

                <img
                    src="${property.image}"
                    alt="${property.title}"
                >

                <span class="property-badge">
                    ${property.badge}
                </span>


                <button
                    class="property-favorite
                    ${favorites.has(property.id)
                        ? "active"
                        : ""}"
                    data-favorite="${property.id}"
                    aria-label="Add property to favourites"
                >

                    ${heartIcon}

                </button>

            </div>


            <div class="property-info">

                <span class="property-location">
                    ${property.location} · Nairobi
                </span>


                <h3>
                    ${property.title}
                </h3>


                <div class="property-price">
                    ${property.priceLabel}
                </div>


                <div class="property-details">

                    <span>
                        ${bedIcon}
                        ${property.beds} Beds
                    </span>

                    <span>
                        ${bathIcon}
                        ${property.baths} Baths
                    </span>

                    <span>
                        ${sizeIcon}
                        ${property.size}
                    </span>

                </div>

            </div>
        `;

        propertyGrid.appendChild(card);

    });

}


/* =========================================================
   INITIAL RENDER
========================================================= */

renderProperties(properties);


/* =========================================================
   FILTER BUTTONS
========================================================= */

document
    .querySelectorAll(".property-filter-button")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(
                    ".property-filter-button"
                )
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            if (filter === "all") {

                renderProperties(properties);

            } else {

                renderProperties(
                    properties.filter(
                        property =>
                            property.purpose === filter
                    )
                );

            }

        });

    });


/* =========================================================
   SEARCH TABS
========================================================= */

let selectedSearchPurpose = "buy";

document
    .querySelectorAll(".search-tab")
    .forEach(tab => {

        tab.addEventListener("click", () => {

            document
                .querySelectorAll(".search-tab")
                .forEach(item =>
                    item.classList.remove("active")
                );

            tab.classList.add("active");

            selectedSearchPurpose =
                tab.dataset.searchType;

        });

    });


/* =========================================================
   HERO PROPERTY SEARCH
========================================================= */

document
    .getElementById("heroSearchButton")
    .addEventListener("click", () => {

        const location =
            document
                .getElementById("heroLocation")
                .value;

        const propertyType =
            document
                .getElementById("heroPropertyType")
                .value;

        const maxPrice =
            Number(
                document
                    .getElementById("heroPrice")
                    .value
            );


        let filtered =
            properties.filter(property => {

                let purposeMatch = true;

                if (
                    selectedSearchPurpose === "buy" ||
                    selectedSearchPurpose === "rent"
                ) {

                    purposeMatch =
                        property.purpose ===
                        selectedSearchPurpose;

                }


                const locationMatch =
                    !location ||
                    property.location === location;


                const typeMatch =
                    !propertyType ||
                    property.type === propertyType;


                const priceMatch =
                    !maxPrice ||
                    property.price <= maxPrice;


                return (
                    purposeMatch &&
                    locationMatch &&
                    typeMatch &&
                    priceMatch
                );

            });


        renderProperties(filtered);


        document
            .getElementById("properties")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* =========================================================
   FAVORITES
========================================================= */

propertyGrid.addEventListener(
    "click",
    event => {

        const favoriteButton =
            event.target.closest(
                "[data-favorite]"
            );

        if (!favoriteButton) return;


        event.stopPropagation();


        const id =
            Number(
                favoriteButton.dataset.favorite
            );


        if (favorites.has(id)) {

            favorites.delete(id);
            favoriteButton.classList.remove(
                "active"
            );

        } else {

            favorites.add(id);
            favoriteButton.classList.add(
                "active"
            );

        }


        updateWishlistCounter();

    }
);


function updateWishlistCounter() {

    wishlistCount.textContent =
        favorites.size;


    wishlistCount.classList.toggle(
        "active",
        favorites.size > 0
    );

}


/* =========================================================
   PROPERTY DETAIL MODAL
========================================================= */

propertyGrid.addEventListener(
    "click",
    event => {

        const propertyImage =
            event.target.closest(
                "[data-property-id]"
            );

        if (!propertyImage) return;


        if (
            event.target.closest(
                "[data-favorite]"
            )
        ) {
            return;
        }


        const id =
            Number(
                propertyImage.dataset.propertyId
            );


        const property =
            properties.find(
                item => item.id === id
            );


        if (property) {

            openPropertyModal(property);

        }

    }
);


function openPropertyModal(property) {

    document.getElementById(
        "modalPropertyImage"
    ).src = property.image;


    document.getElementById(
        "modalPropertyTitle"
    ).textContent = property.title;


    document.getElementById(
        "modalPropertyLocation"
    ).textContent =
        `${property.location}, Nairobi`;


    document.getElementById(
        "modalPropertyPrice"
    ).textContent =
        property.priceLabel;


    document.getElementById(
        "modalPropertyTag"
    ).textContent =
        property.badge;


    document.getElementById(
        "modalPropertyFeatures"
    ).innerHTML = `

        <span>
            ${property.beds} Bedrooms
        </span>

        <span>
            ${property.baths} Bathrooms
        </span>

        <span>
            ${property.size}
        </span>
    `;


    propertyModal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

}


function closePropertyModal() {

    propertyModal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


modalClose.addEventListener(
    "click",
    closePropertyModal
);

modalBackdrop.addEventListener(
    "click",
    closePropertyModal
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closePropertyModal();

        }

    }
);


/* =========================================================
   NAVBAR SCROLL
========================================================= */

function updateNavbar() {

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );

}

window.addEventListener(
    "scroll",
    updateNavbar
);

updateNavbar();


/* =========================================================
   MOBILE MENU
========================================================= */

mobileMenuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.add("open");
        document.body.classList.add(
            "menu-open"
        );

    }
);


mobileMenuClose.addEventListener(
    "click",
    closeMobileMenu
);


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


function closeMobileMenu() {

    mobileMenu.classList.remove("open");

    document.body.classList.remove(
        "menu-open"
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.14
        }
    );


revealElements.forEach(element =>
    revealObserver.observe(element)
);


/* =========================================================
   ANIMATED COUNTERS
========================================================= */

let countersStarted = false;

const statsSection =
    document.querySelector(
        ".stats-section"
    );


const counterObserver =
    new IntersectionObserver(
        entries => {

            if (
                entries[0].isIntersecting &&
                !countersStarted
            ) {

                countersStarted = true;

                animateCounters();

            }

        },
        {
            threshold: 0.4
        }
    );


counterObserver.observe(statsSection);


function animateCounters() {

    document
        .querySelectorAll(".counter")
        .forEach(counter => {

            const target =
                Number(
                    counter.dataset.target
                );


            const decimal =
                target % 1 !== 0;


            let current = 0;


            const duration = 1700;

            const start =
                performance.now();


            function update(time) {

                const progress =
                    Math.min(
                        (time - start) /
                        duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                current =
                    target * eased;


                counter.textContent =
                    decimal
                        ? current.toFixed(1)
                        : Math.floor(
                            current
                        ).toLocaleString();


                if (progress < 1) {

                    requestAnimationFrame(
                        update
                    );

                }

            }


            requestAnimationFrame(
                update
            );

        });

}


/* =========================================================
   LOCATION CARDS
========================================================= */

document
    .querySelectorAll(".location-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const location =
                    card.dataset.location;


                const filtered =
                    properties.filter(
                        property =>
                            property.location ===
                            location
                    );


                renderProperties(filtered);


                document
                    .getElementById(
                        "properties"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================================================
   SUBTLE HERO PARALLAX
========================================================= */

const heroBackground =
    document.querySelector(
        ".hero-background"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.innerWidth > 850 &&
            window.scrollY <
                window.innerHeight
        ) {

            heroBackground.style.transform =
                `translateY(${
                    window.scrollY * 0.12
                }px) scale(1.01)`;

        }

    }
);


/* =========================================================
   VIEW ALL
========================================================= */

document
    .getElementById("viewAllProperties")
    .addEventListener(
        "click",
        () => {

            renderProperties(properties);


            document
                .querySelectorAll(
                    ".property-filter-button"
                )
                .forEach(button =>
                    button.classList.remove(
                        "active"
                    )
                );


            document
                .querySelector(
                    '[data-filter="all"]'
                )
                .classList.add("active");

        }
    );