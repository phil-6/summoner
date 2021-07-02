function summonThem() {
    function formValidation(){
        let validForm = true;
        const phoneregex = /^(447\d{9})$/;
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
            // validSummon();
        }
    }



    // function validSummon() {
    //     const jsonFormData = toJSONString(document.getElementById("summon-form"));
    //     const API_GATEWAY_LOGIN_URL = "https://4ohtthv7a9.execute-api.eu-west-1.amazonaws.com/default";
    //     const restful_action = "POST";
    //
    //     $.ajax({
    //         type: restful_action,
    //         cache: false,
    //         data: jsonFormData,
    //         contentType: "application/json",
    //         url: API_GATEWAY_LOGIN_URL,
    //         success: function (data) {
    //             document.getElementById("loading-message").classList.add("d-none");
    //             document.getElementById("success-content").innerHTML = (JSON.stringify(data).replace(/['"]+/g, ''));
    //             document.getElementById("success-message").classList.remove("d-none");
    //             document.body.classList.add("is-success");
    //             return;
    //         },
    //         error: function (xhr) {
    //             document.getElementById("general-error").classList.remove("d-none");
    //             alert("An error occured: " + xhr.status + " " + xhr.statusText)
    //         }
    //     });
    // }
    formValidation();
}

const testForm = document.querySelector("#test-form")
// The Twilio Way
testForm.addEventListener('submit', async event => {
    event.preventDefault();

    // disable button to prevent multiple submissions
    testForm.querySelector('button').disabled = true;

    // make the request to submit the form
    try {
        const response = await fetch('/', {
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            // parse and submit all included form data
            body: new URLSearchParams(new FormData(testForm)).toString()
        });

        // if it was successful show success message
        if (response.status === 200) {
            document.querySelector('.successMsg').hidden = false;
        } else {
            document.querySelector('.errorMsg').hidden = false;
        }
    } catch (e) {
        console.error(e);
    }
});




// The netlify way
// testForm.addEventListener("submit", handleSubmit);
// const handleSubmit = (e) => {
//     e.preventDefault()
//     let testForm = document.getElementById('test-form');
//     let formData = new FormData(testForm)
//     fetch('/', {
//         method: 'POST',
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: new URLSearchParams(formData).toString()
//     }).then(() => console.log('Form successfully submitted')).catch((error) =>
//         alert(error))
// }