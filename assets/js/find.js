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
    if (!phoneregex.test(document.getElementById("summoner_number").value)){
        document.getElementById("summoner_number").focus();
        document.getElementById("summoner_number").classList.add("form-error");
        document.getElementById("form-error-message").classList.remove("hide");
        validForm = false;
    }else{
        document.getElementById("summoner_number").classList.remove("form-error");
    }
    if (!phoneregex.test(document.getElementById("summonee_number").value)){
        document.getElementById("summonee_number").focus();
        document.getElementById("summonee_number").classList.add("form-error");
        document.getElementById("form-error-message").classList.remove("hide");
        validForm = false;
    }else{
        document.getElementById("summonee_number").classList.remove("form-error");
    }
    if (validForm === true){
        // document.getElementById("form-error-message").classList.add("d-none");
        document.getElementById("form-container").classList.add("hide");
        document.getElementById("loading-message").classList.remove("hide");
        return true
    }
}

const findForm = document.querySelector("#find-form")
// The Twilio Way
// Source: https://www.twilio.com/blog/a-how-to-send-text-messages-from-your-static-site-using-netlify-twilio-and-serverless-functions
findForm.addEventListener('submit', async event => {
    event.preventDefault();

    // disable button to prevent multiple submissions
    findForm.querySelector('button').disabled = true;

    // make the request to submit the form
    if (formValidation()) {
        try {
            const response = await fetch('/', {
                method: 'post',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                // parse and submit all included form data
                body: new URLSearchParams(new FormData(findForm)).toString()
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
        findForm.querySelector('button').disabled = false;
    }
});

