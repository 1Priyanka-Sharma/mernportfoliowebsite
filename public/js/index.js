minbar = document.querySelector('.min-bar');
navBar = document.querySelector('.navBar');
navlist = document.querySelector('.nav-list');
section = document.querySelectorAll('section');
logo = document.querySelector('.logo');
scrolltop = document.getElementById('scroll-top');

// Main Menu->Click Event
let menu = document.getElementsByClassName('menu');
menu = Array.from(menu);
menu.forEach((item) => {
    item.addEventListener("click", () => {
        menu.forEach((item) => {
            item.classList.remove('active');
        });
        item.classList.add("active");
    })
})

window.onload = () => {
    window.onscroll = (() => {
        // menu highlight on scroll
        len = section.length;
        while (--len && this.scrollY + 320 < section[len].offsetTop) { }
        menu.forEach(item => item.classList.remove('active'));
        menu[len].classList.add('active');

        // navBar and scrollToTop button scrolling effect
        if (this.scrollY > 1) {
            navBar.classList.add('scroll-nav-color');
            scrolltop.style.display = "block";
        }
        else {
            navBar.classList.remove('scroll-nav-color');
            scrolltop.style.display = "none";
        }
    })
}

// hamburger click event
minbar.addEventListener('click', () => {
    navBar.classList.toggle('h-nav-res');
    navlist.classList.toggle('v-hidden-res');
    logo.classList.toggle('logo-res');

})

// Scroll-up Button
scrolltop.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

// About Section Category->Click Event
let category = document.getElementsByClassName('category');
let aboutContainer = document.getElementsByClassName('about-container');
category = Array.from(category);

let categoryDes = document.getElementsByClassName('category-des');
categoryDes = Array.from(categoryDes);

category.forEach((item) => {
    item.addEventListener("click", () => {
        category.forEach((item) => {
            icon = item.querySelector('.icon-size');
            icon.classList.remove('tag');
            tagHeading = item.querySelector('.tag-heading');
            tagHeading.classList.remove('tag');

            categoryDes[0].classList.add('vis-hide');
            categoryDes[1].classList.add('vis-hide');
            categoryDes[2].classList.add('vis-hide');

        });
        icon = item.querySelector('.icon-size');
        icon.classList.add('tag');
        tagHeading = item.querySelector('.tag-heading');
        tagHeading.classList.add('tag');

        if (item == category[0]) {
            categoryDes[0].classList.remove('vis-hide');
            aboutContainer[0].classList.add('education');
            aboutContainer[0].classList.remove('justify-around');
        }
        else if (item == category[1])
            categoryDes[1].classList.remove('vis-hide');
        else
            categoryDes[2].classList.remove('vis-hide');
    })
})

// Skills Section
let skillscontainer = document.getElementsByClassName('skill-container');
let parentElement = document.querySelector("#skill-set");
let firstElement = parentElement.firstElementChild;
let skillDescription;
let opened, clicked;

skillscontainer = Array.from(skillscontainer);

skillscontainer.forEach((item) => {
    item.addEventListener("click", () => {
        clicked = item;
        skillscontainer.forEach((item) => {
            if (item.classList.contains('large-width')) {
                item.classList.remove('large-width');
                item.classList.add('skill-normal-container');
                skillDescription = item.querySelector('.description');
                skillDescription.classList.add('vis-hide');

                // To append Item at the end of the container.
                if (clicked != item) {
                    parentElement.appendChild(item);
                }
                opened = item;
            }
        })
        if (opened != clicked) {

            item.classList.add("large-width");
            item.classList.remove('skill-normal-container');
            skillDescription = item.querySelector('.description');
            skillDescription.classList.remove('vis-hide');

            parentElement = document.querySelector("#skill-set");
            firstElement = parentElement.firstElementChild;
            parentElement.prepend(item);
        }
        opened = '';
    })
})