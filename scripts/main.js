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

