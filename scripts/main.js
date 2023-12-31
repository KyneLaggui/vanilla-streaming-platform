const menuButton = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".side-bar");
const closeButton = document.querySelector(".close-btn");
const sidebarOptions = document.querySelectorAll(".sidebar-opt");

menuButton.addEventListener('click', () => {
    sidebar.classList.add('active');
    menuButton.style.visibility = 'hidden';
});

closeButton.addEventListener('click', () => {
    sidebar.classList.remove('active');
    menuButton.style.visibility = 'visible';
})

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

sidebarOptions.forEach((elem) => {
    elem.addEventListener('mouseover', (event) => {
        let iterations = 0;

        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return event.target.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");

            if (iterations >= event.target.dataset.value.length) clearInterval(interval);

            iterations += 1;
        }, 100)
    })
});

// For detecting the current section
// List of all sidebar anchor tags
let homepageAnchor = document.querySelector(".homepage-anchor");
let exploreAnchor = document.querySelector(".explore-anchor");
let aboutAnchor = document.querySelector(".about-anchor");
let engagementAnchor = document.querySelector(".engagement-anchor");
let pricingAnchor = document.querySelector(".pricing-anchor");

let homepage = document.querySelector("#home");
let explore = document.querySelector("#explore");
let about = document.querySelector("#about");
let engagement = document.querySelector("#engagement");
let pricing = document.querySelector("#pricing");

let removeAllActiveAnchor = () => {
    homepageAnchor.classList.remove('active');
    exploreAnchor.classList.remove('active');
    aboutAnchor.classList.remove('active');
    engagementAnchor.classList.remove('active');
    pricingAnchor.classList.remove('active');
}

let checkScrollStatus = () => {
    let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    
    if (scrollTop < homepage.clientHeight * 0.7 ) {
        removeAllActiveAnchor();
        homepageAnchor.classList.add('active');
    }
    else if (scrollTop < explore.clientHeight + homepage.clientHeight * 0.7) {
        removeAllActiveAnchor();
        exploreAnchor.classList.add('active');
    }
    else if (scrollTop < about.clientHeight + explore.clientHeight + homepage.clientHeight * 0.7) {
        removeAllActiveAnchor();
        aboutAnchor.classList.add('active');
    }
    else if (scrollTop < engagement.clientHeight + about.clientHeight + explore.clientHeight + homepage.clientHeight * 0.7 ) {
        removeAllActiveAnchor();
        engagementAnchor.classList.add('active');
    }
    else if (scrollTop < pricing.clientHeight + engagement.clientHeight + about.clientHeight + explore.clientHeight + homepage.clientHeight * 0.7 ) {
        removeAllActiveAnchor();
        pricingAnchor.classList.add('active');
    }
}

checkScrollStatus(); 

window.addEventListener('scroll', () => {
    checkScrollStatus();
});

// End of section detection

// Carousel scripts
const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".carousel-wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;


// Auto slide
const automaticSlide = () => {
    if (isDragging) return;
    let firstImgWidth = parseInt(firstImg.clientWidth); // Getting first img width & adding 14 margin value
   // If there is no image left to scroll then return from here
    if (Math.ceil(carousel.scrollLeft) >= Math.floor(carousel.scrollWidth - carousel.clientWidth)) {
        carousel.scrollLeft = 0;
    } else {
        carousel.scrollLeft = Math.floor(carousel.scrollLeft) + Math.floor(firstImgWidth);
    }
    
}
let autoInterval = setInterval(automaticSlide, 1500);

const dragStart = (e) => {
    // Updating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    // Scrolling images/carousel to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    isDragging = true;
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
};

const dragStop = () => {
    clearInterval(autoInterval);
    autoInterval = setInterval(automaticSlide, 1500);
    isDragStart = false;
    carousel.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;
    // autoSlide();
}


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);


// Dynamic review feature

const reviewDiv = document.querySelector(".dynamic-review");

const reviews = [
    {name: "Ace Clavano", review: "The streaming quality in this website is top-notch, all of the resolutions are supported and they are really fast to buffer!"},
    {name: "Rei Punzalan", review: "A lot of good oppurtunities for small streamers are in this website. They certainly don't have discrimination for small streamers like me."},
    {name: "John Palijado", review: "This streaming platform is one of a kind! There are so many categories to choose from and all of them are entertaining!"},
    {name: "Siegfred Mina", review: "This streaming platform seamlessly blends an extensive library of content with a user-friendly interface, delivering a top-notch entertainment experience."},
    {name: "Harold Amad", review: "With a diverse range of captivating originals and a intuitive recommendation system, this streaming platform keeps me hooked for hours on end."}
]

let currentReview = 0
const updateReview = () => {
    reviewDiv.innerHTML = '';
    const reviewParagraph = document.createElement("p");
    const reviewHeader = document.createElement("h1");
    const reviewSpan = document.createElement("span");
    if (currentReview > reviews.length - 1) {
        currentReview = 0;
    }
    reviewHeader.innerText = reviews[currentReview]['name'];
    reviewParagraph.innerText = reviews[currentReview]['review'];

    const reviewSpanClone = reviewSpan.cloneNode(true);
    reviewHeader.appendChild(reviewSpan);
    reviewHeader.appendChild(reviewSpanClone);
    reviewHeader.classList.add('glitch')
    reviewDiv.appendChild(reviewHeader);
    reviewDiv.appendChild(reviewParagraph);
    currentReview += 1;
}

updateReview();
setInterval(() => {
    updateReview()
}, 3000)


