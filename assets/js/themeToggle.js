const themeBtn = document.querySelector("#theme-toggle");
const colorBtn = document.querySelector("#color-switch");
const gradBtn = document.querySelector("#grad-toggle");
// check to see if OS preferences for light or dark mode
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");

// check to see if local storage has a theme preference
let currentTheme = localStorage.getItem("theme");
let currentColor = localStorage.getItem("color")
let currentGrad = localStorage.getItem("grad")
let colors = ["red", "orange", "yellow", "green", "blue", "purple"]

function setTheme() {
    if (currentTheme) {
        document.body.classList.remove("dark", "light");
        document.body.classList.add(currentTheme);
        themeBtn.innerHTML = `Theme: ${currentTheme}`;

        console.log("Theme Set!\n", currentTheme, currentColor, currentGrad)
        localStorage.setItem("theme", currentTheme);
    } else { //if no local storage check against system preferences
        if (prefersDarkScheme.matches) {
            currentTheme = "dark"
        } else if (prefersLightScheme.matches) {
            currentTheme = "light"
        } else { // if no preferences, default to dark theme
            currentTheme = "dark"
        }
        setTheme()
    }
}

function nextColor() {
    let nextColorIndex = colors.indexOf(currentColor) + 1
    if (nextColorIndex === colors.length) {
        nextColorIndex = 0
    }
    return colors[nextColorIndex]
}

function setColor(color) {
    if (!color) {
        color = "orange";
        currentColor = color;
    }
    document.body.classList.remove(...colors);
    document.body.classList.add(color);
    colorBtn.innerHTML = `Colour: ${color}`;

    console.log("Color Set!\n", currentTheme, currentColor, currentGrad)
    localStorage.setItem("color", currentColor);
}

function setGrad() {
    document.body.classList.remove("no-grad", "grad");
    document.body.classList.add(currentGrad);

    console.log("Grad Set!\n", currentTheme, currentColor, currentGrad)
    localStorage.setItem("grad", currentGrad);
}

themeBtn.addEventListener("click", function () {
    if (currentTheme === "dark") {
        currentTheme = "light";
        setTheme()
    } else {
        currentTheme = "dark";
        setTheme()
    }
});

themeBtn.addEventListener("mouseover", function () {
    if (currentTheme === "light") {
        themeBtn.innerHTML = "Theme ➟ Dark";
    } else if (currentTheme === "dark") {
        themeBtn.innerHTML = "Theme ➟ Light";
    } else {
        themeBtn.innerHTML = "Change Theme";
    }
});

themeBtn.addEventListener("mouseleave", function () {
    if (currentTheme === "light") {
        themeBtn.innerHTML = "Theme: Light";
    } else if (currentTheme === "dark") {
        themeBtn.innerHTML = "Theme: Dark";
    } else {
        themeBtn.innerHTML = "Change Theme";
    }
});

colorBtn.addEventListener("click", function () {
    currentColor = nextColor()
    setColor(currentColor)
});

colorBtn.addEventListener("mouseover", function () {
    colorBtn.innerHTML = `Colour ➟ ${nextColor()}`
});

colorBtn.addEventListener("mouseout", function () {
    colorBtn.innerHTML = `Colour: ${currentColor}`
});

gradBtn.addEventListener("click", function () {
    if (currentGrad === "no-grad") {
        currentGrad = "grad"
        setGrad()
    } else {
        currentGrad = "no-grad";
        setGrad()
    }
});

setColor(currentColor)
setTheme()
