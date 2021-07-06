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
let colors = ["orange", "red", "purple", "yellow", "green", "blue"]

function setTheme() {
    //if no local storage check against system preferences
    if (currentTheme === null) {
        if (prefersDarkScheme.matches) {
            currentTheme = "dark"
        } else if (prefersLightScheme.matches) {
            currentTheme = "light"
        } else {
            // if no preferences, default to dark theme
            currentTheme = "dark"
        }
        setTheme()
    } else if (currentTheme === "dark") {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        themeBtn.innerHTML = "Theme: Dark";
    } else if (currentTheme === "light") {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        themeBtn.innerHTML = "Theme: Light";
    }
}

function setColor() {
    if (currentColor === "red") {
        document.body.classList.remove(...colors)
        document.body.classList.add("red");
        colorBtn.innerHTML = "Colour: Red";
    }
    if (currentColor === "orange") {
        document.body.classList.remove(...colors)
        document.body.classList.add("orange");
        colorBtn.innerHTML = "Colour: Orange";
    }
    if (currentColor === "yellow") {
        document.body.classList.remove(...colors)
        document.body.classList.add("yellow");
        colorBtn.innerHTML = "Colour: Yellow";
    }
    if (currentColor === "green") {
        document.body.classList.remove(...colors)
        document.body.classList.add("green");
        colorBtn.innerHTML = "Colour: Green";
    }
    if (currentColor === "blue") {
        document.body.classList.remove(...colors)
        document.body.classList.add("blue");
        colorBtn.innerHTML = "Colour: Blue";
    }
    if (currentColor === "purple") {
        document.body.classList.remove(...colors)
        document.body.classList.add("purple");
        colorBtn.innerHTML = "Colour: Purple";
    }
}

function setGrad() {
    //if no local storage check against system preferences
    if (currentGrad === "grad") {
        document.body.classList.remove("no-grad");
        document.body.classList.add("grad");
    } else if (currentGrad === "no-grad") {
        document.body.classList.remove("grad");
        document.body.classList.add("no-grad");
    }
}

themeBtn.addEventListener("click", function () {
    if (currentTheme === "dark") {
        currentTheme = "light"
        setTheme()
    } else {
        currentTheme = "dark";
        setTheme()
    }
    console.log(currentTheme, currentColor, currentGrad)
    localStorage.setItem("theme", currentTheme);
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
    if (currentColor === "red") {
        currentColor = "orange"
        setColor()
    } else if (currentColor === "orange") {
        currentColor = "yellow"
        setColor()
    } else if (currentColor === "yellow") {
        currentColor = "green"
        setColor()
    } else if (currentColor === "green") {
        currentColor = "blue"
        setColor()
    } else if (currentColor === "blue") {
        currentColor = "purple"
        setColor()
    } else if (currentColor === "purple") {
        currentColor = "red"
        setColor()
    } else {
        currentColor = "blue"
        setColor()
    }
    console.log(currentTheme, currentColor, currentGrad)
    localStorage.setItem("color", currentColor);
});

colorBtn.addEventListener("mouseover", function () {
    if (currentColor === "red") {
        colorBtn.innerHTML = "Colour ➟ Orange";
    } else if (currentColor === "orange") {
        colorBtn.innerHTML = "Colour ➟ Yellow";
    } else if (currentColor === "yellow") {
        colorBtn.innerHTML = "Colour ➟ Green";
    } else if (currentColor === "green") {
        colorBtn.innerHTML = "Colour ➟ Blue";
    } else if (currentColor === "blue") {
        colorBtn.innerHTML = "Colour ➟ Purple";
    } else if (currentColor === "purple") {
        colorBtn.innerHTML = "Colour ➟ Red";
    } else {
        colorBtn.innerHTML = "Change Colour";
    }
});
colorBtn.addEventListener("mouseout", function () {
    if (currentColor === "red") {
        colorBtn.innerHTML = "Colour: Red";
    } else if (currentColor === "orange") {
        colorBtn.innerHTML = "Colour: Orange";
    } else if (currentColor === "yellow") {
        colorBtn.innerHTML = "Colour: Yellow";
    } else if (currentColor === "green") {
        colorBtn.innerHTML = "Colour: Green";
    } else if (currentColor === "blue") {
        colorBtn.innerHTML = "Colour: Blue";
    } else if (currentColor === "purple") {
        colorBtn.innerHTML = "Colour: Purple";
    } else {
        colorBtn.innerHTML = "Change Colour";
    }
});

gradBtn.addEventListener("click", function () {
    if (currentGrad === "no-grad") {
        currentGrad = "grad"
        setGrad()
    } else {
        currentGrad = "no-grad";
        setGrad()
    }
    console.log(currentTheme, currentColor, currentGrad)
    localStorage.setItem("grad", currentGrad);
});

console.log(currentTheme, currentColor, currentGrad)
setColor()
setTheme()
setGrad()