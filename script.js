// ==========================================
// THE SISTER SQUAD - COMPLETE JAVASCRIPT
// Created by Khushi & Zinat
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // 1. MOBILE NAVIGATION MENU
    // ======================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.textContent = isOpen ? "×" : "☰";
        });

        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";
            });
        });

        // Close menu with Escape key
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";
            }
        });
    }


    // ======================================
    // 2. PHOTO GALLERY & LIGHTBOX
    // ======================================

    const cards = [
        ...document.querySelectorAll(".photo-card")
    ];

    const lightbox = document.getElementById("lightbox");
    const lightboxImage =
        document.querySelector(".lightbox-image");

    const counter =
        document.getElementById("lightboxCounter");

    const closeButton =
        document.querySelector(".lightbox-close");

    const prevButton =
        document.querySelector(".lightbox-prev");

    const nextButton =
        document.querySelector(".lightbox-next");

    let activeIndex = 0;
    let previousOverflow = "";

    // Open a selected photo
    function showPhoto(index) {

        if (cards.length === 0 || !lightboxImage) {
            return;
        }

        activeIndex =
            (index + cards.length) % cards.length;

        const selectedCard = cards[activeIndex];

        const image = selectedCard.querySelector("img");

        const imagePath =
            selectedCard.dataset.full ||
            (image ? image.src : "");

        if (!imagePath) {
            return;
        }

        lightboxImage.src = imagePath;

        lightboxImage.alt = image
            ? image.alt
            : `The Sister Squad photo ${activeIndex + 1}`;

        if (counter) {
            counter.textContent =
                `${String(activeIndex + 1).padStart(2, "0")} / ` +
                `${String(cards.length).padStart(2, "0")}`;
        }
    }

    // Open lightbox
    function openLightbox(index) {

        if (!lightbox || !lightboxImage || cards.length === 0) {
            return;
        }

        previousOverflow = document.body.style.overflow;

        showPhoto(index);

        lightbox.classList.add("open");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        if (closeButton) {
            closeButton.focus();
        }
    }

    // Close lightbox
    function closeLightbox() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("open");

        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = previousOverflow;

        // Return focus to the photo that was opened
        if (cards[activeIndex]) {
            cards[activeIndex].focus();
        }
    }

    // Register every gallery photo
    cards.forEach((card, index) => {

        card.addEventListener("click", () => {
            openLightbox(index);
        });

    });

    // Previous photo
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            showPhoto(activeIndex - 1);
        });
    }

    // Next photo
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showPhoto(activeIndex + 1);
        });
    }

    // Close button
    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }

    // Close when clicking the dark background
    if (lightbox) {
        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener("keydown", event => {

        if (!lightbox || !lightbox.classList.contains("open")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showPhoto(activeIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showPhoto(activeIndex + 1);
        }
    });


    // ======================================
    // 3. YOUTUBE CHANNEL LINK
    // ======================================

    const youtubeLinks =
        document.querySelectorAll(".youtube-cta, .youtube-footer");

    const youtubeURL =
        "https://youtube.com/@khusiandzinatpraveen-u5e?si=gQfalbzQaqSTQrxi";

    youtubeLinks.forEach(link => {
        link.setAttribute("href", youtubeURL);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });


    // ======================================
    // 4. GALLERY PHOTO COUNT
    // ======================================

    const galleryCount =
        document.querySelector(".gallery-count strong");

    if (galleryCount) {
        galleryCount.textContent =
            String(cards.length).padStart(2, "0");
    }


    // ======================================
    // 5. CONSOLE MESSAGE
    // ======================================

    console.log(
        `The Sister Squad website loaded successfully! ${cards.length} photos found.`
    );

});