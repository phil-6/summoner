function formValidation() {
    let validForm = true;
    const phoneregex = /^(07\d{9})$/;

    let summmoner = document.querySelector('#summoner');
    let summonee = document.querySelector('#summonee');
    let formErrorMessage = document.querySelector('#form-error-message')
    let number = document.querySelector('#number')

    if (summmoner.value === "") {
        summmoner.focus();
        summmoner.classList.add("form-error");
        formErrorMessage.classList.remove("hide");
        validForm = false;
    } else {
        summmoner.classList.remove("form-error");
    }

    if (summonee.value === "") {
        summonee.focus();
        summonee.classList.add("form-error");
        formErrorMessage.classList.remove("hide");
        validForm = false;
    } else {
        summonee.classList.remove("form-error");
    }

    if (!phoneregex.test(number.value)) {
        number.focus();
        number.classList.add("form-error");
        formErrorMessage.classList.remove("hide");
        validForm = false;
    } else {
        number.classList.remove("form-error");
    }

    if ((document.getElementById("userLat").value === "") || (document.getElementById("userLng").value === "")) {
        document.getElementById("location-error").classList.remove("hide");
        document.getElementById("form-container").classList.add("hide");
        // document.body.classList.remove("is-main");
        // document.body.classList.add("is-failure");
        validForm = false;
    }

    if (validForm === true) {
        return true
    }
}

const summonForm = document.querySelector("#summon-form")

summonForm.addEventListener('submit', async event => {
    event.preventDefault();
    let formContainer = document.querySelector("#form-container")
    let loadingMessage = document.querySelector('#loading-message')
    let errorElement = document.querySelector('#general-error')
    let responseMessage = document.querySelector('#response-message')
    let successMessage = document.querySelector('#success-message')
    let button = summonForm.querySelector('button')

    // disable button to prevent multiple submissions
    button.disabled = true;

    // make the request to submit the form if form validation passes
    if (formValidation()) {
        formContainer.classList.add("hide");
        loadingMessage.classList.remove("hide");

        console.log(new URLSearchParams(new FormData(summonForm)).toString())

        await fetch('https://summoner.pr-dev.workers.dev', {
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            // parse and submit all included form data
            body: new URLSearchParams(new FormData(summonForm)).toString()
        })
            .then(response => {
                loadingMessage.classList.add("hide");
                if (response.ok) {
                    successMessage.classList.remove("hide");
                } else {
                    errorElement.classList.remove("hide");
                    responseMessage.innerHTML = response.message
                }
            })
            .catch(error => {
                console.error(error);
                loadingMessage.classList.add("hide");
                errorElement.classList.remove("hide");
                responseMessage.innerHTML = error
            });

    } else {
        button.disabled = false;
    }
});

function getURLValues() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    // these are intentionally swapped from the url
    const summonee = urlParams.get('summoner')
    const summoner = urlParams.get('summonee')
    const summonee_number = urlParams.get('summoner_num')
    // console.log(summonee)
    // console.log(summonee_number)

    //make more dry
    if (summonee) {
        document.querySelector("#summonee").value = summonee;
        document.querySelector("#summonee").setAttribute("value", summonee);
    }
    if (summoner) {
        document.querySelector("#summoner").value = summoner;
        document.querySelector("#summoner").setAttribute("value", summoner);
    }
    if (summonee_number) {
        document.querySelector("#number").value = summonee_number;
        document.querySelector("#number").setAttribute("value", summonee_number);
    }

    if (summonee && summoner && summonee_number) {
        document.querySelector('#summonee-container').classList.add("hide");
        document.querySelector('#summoner-container').classList.add("hide");
        document.querySelector('#number-container').classList.add("hide");
        document.querySelector('#form-prefilled').innerHTML = `Hi ${summoner}. ${summonee} has requested that you share your location with them. Click the button below if you want to do that.`
        document.querySelector('#form-prefilled').classList.remove("hide");
    }
}

getURLValues()
