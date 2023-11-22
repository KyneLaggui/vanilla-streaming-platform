let menuButton = document.querySelector(".menu-btn");
let sidebar = document.querySelector(".side-bar");
let closeButton = document.querySelector(".close-btn");
let sidebarOptions = document.querySelectorAll(".sidebar-opt");

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

// List of all sidebar anchor tags
let homepageAnchor = document.querySelector(".homepage-anchor");
let exploreAnchor = document.querySelector(".explore-anchor");
let aboutAnchor = document.querySelector(".about-anchor");
let engagementAnchor = document.querySelector(".engagement-anchor");
let pricingAnchor = document.querySelector(".pricing-anchor");

let removeAllActiveAnchor = () => {
    homepageAnchor.classList.remove('active');
    exploreAnchor.classList.remove('active');
    aboutAnchor.classList.remove('active');
    engagementAnchor.classList.remove('active');
    pricingAnchor.classList.remove('active');
}

let checkScrollStatus = () => {
    let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    
    if (scrollTop < window.innerHeight * 0.7 ) {
        removeAllActiveAnchor();
        homepageAnchor.classList.add('active');
    }
    else if (scrollTop < window.innerHeight * 1.7) {
        removeAllActiveAnchor();
        exploreAnchor.classList.add('active');
    }
    else if (scrollTop < window.innerHeight * 2.7) {
        removeAllActiveAnchor();
        aboutAnchor.classList.add('active');
    }
    else if (scrollTop < window.innerHeight * 3.7) {
        removeAllActiveAnchor();
        engagementAnchor.classList.add('active');
    }
    else if (scrollTop < window.innerHeight * 4.7) {
        removeAllActiveAnchor();
        pricingAnchor.classList.add('active');
    }
}

checkScrollStatus(); 

window.addEventListener('scroll', () => {
    checkScrollStatus();
});

// Carousel scripts
const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".carousel-wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;


// Auto slide
const automaticSlide = () => {
    
    if (isDragging) return;
    let firstImgWidth = firstImg.clientWidth; // Getting first img width & adding 14 margin value
   // If there is no image left to scroll then return from here
    if (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) {
        carousel.scrollLeft = 0;
        console.log('okay');
    } else {
        carousel.scrollLeft += firstImgWidth;
    }
    
}
let autoInterval = setInterval(automaticSlide, 1500);

const autoSlide = () => {
    positionDiff = Math.abs(positionDiff); // Making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth;
    // Getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
        // If user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // If user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff
};

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
    autoSlide();
}


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);