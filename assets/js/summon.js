function formValidation(){
    let validForm = true;
    const phoneregex = /^(07\d{9})$/;
    if (document.getElementById("summoner").value === ""){
        document.getElementById("summoner").focus();
        document.getElementById("summoner").classList.add("form-error");
        document.getElementById("form-error-message").classList.remove("hide");
        validForm = false;
    }else{
        document.getElementById("summoner").classList.remove("form-error");
    }
    if (document.getElementById("summonee").value === ""){
        document.getElementById("summonee").focus();
        document.getElementById("summonee").classList.add("form-error");
        document.getElementById("form-error-message").classList.remove("hide");
        validForm = false;
    }else{
        document.getElementById("summonee").classList.remove("form-error");
    }
    if (!phoneregex.test(document.getElementById("number").value)){
        document.getElementById("number").focus();
        document.getElementById("number").classList.add("form-error");
        document.getElementById("form-error-message").classList.remove("hide");
        validForm = false;
    }else{
        document.getElementById("number").classList.remove("form-error");
    }
    if ((document.getElementById("userLat").value === "")||(document.getElementById("userLng").value === "")){
        document.getElementById("location-error").classList.remove("hide");
        document.getElementById("form-container").classList.add("hide");
        // document.body.classList.remove("is-main");
        // document.body.classList.add("is-failure");
        validForm = false;
    }
    if (validForm === true){
        // document.getElementById("form-error-message").classList.add("d-none");
        document.getElementById("form-container").classList.add("hide");
        document.getElementById("loading-message").classList.remove("hide");
        return true
    }
}

const summonForm = document.querySelector("#summon-form")
// The Twilio Way
// Source: https://www.twilio.com/blog/a-how-to-send-text-messages-from-your-static-site-using-netlify-twilio-and-serverless-functions
summonForm.addEventListener('submit', async event => {
    event.preventDefault();

    // disable button to prevent multiple submissions
    summonForm.querySelector('button').disabled = true;

    // make the request to submit the form
    if (formValidation()) {
        try {
            const response = await fetch('/', {
                method: 'post',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                // parse and submit all included form data
                body: new URLSearchParams(new FormData(summonForm)).toString()
            });

            // if it was successful show success message
            if (response.status === 200) {
                document.querySelector('#loading-message').classList.add("hide");
                document.querySelector('#success-message').classList.remove("hide");
            } else {
                document.querySelector('#loading-message').classList.add("hide");
                document.querySelector('#general-error').classList.remove("hide");
            }
        } catch (e) {
            console.error(e);
        }
    } else {
        summonForm.querySelector('button').disabled = false;
    }
});

function getURLValues(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const summonee = urlParams.get('summoner')
    const summoner = urlParams.get('summonee')
    const summonee_number = urlParams.get('summoner_num')

    if (summonee){
        document.getElementById("summonee").value = summonee;
        document.querySelector('#summonee-container').classList.add("hide");
    }
    if (summoner){
        document.getElementById("summoner").value = summoner;
        document.querySelector('#summoner-container').classList.add("hide");
    }
    if (summonee_number){
        document.getElementById("number").value = summonee_number;
        document.querySelector('#number-container').classList.add("hide");
    }

    if (summonee && summoner && summonee_number){
        document.querySelector('#number-container').classList.remove("hide");
        document.querySelector('#number-container').innerHTML = `Hi ${summoner}. ${summonee} has requested that you share your number with them. Click the button below if you want to do that.`
    }
}

getURLValues()
