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
        }, 200)
    })
})

