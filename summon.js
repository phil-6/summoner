function summonThem() {
    // alert("The form was submitted");
    function formValidation(){
        var validForm = true;
        var phoneregex = /^(447\d{9})$/;
        if (document.getElementById("summoner").value == ""){
            document.getElementById("summoner").focus();
            document.getElementById("summoner").placeholder += ' Error Check this field';
            document.getElementById("summoner").classList.add("form-error");
            validForm = false;
        }
        if (document.getElementById("summonee").value == ""){
            document.getElementById("summonee").focus();
            document.getElementById("summonee").placeholder += ' Error Check this field';
            document.getElementById("summonee").classList.add("form-error");
            validForm = false;
        }
        if (!phoneregex.test(document.getElementById("number").value)){
            document.getElementById("number").focus();
            document.getElementById("number-label").innerHTML += ' Error Must be in format: 447123123123';
            document.getElementById("number").classList.add("form-error");
            validForm = false;
        }
        if (validForm == true){
            document.getElementById("form-Container").classList.add("d-none");
            validSummon();
        }
    }
    formValidation();

    function toJSONString( form ) {
        var obj = {};
        var elements = form.querySelectorAll( "input" );
        for( var i = 0; i < elements.length; ++i ) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if( name ) {
                obj[ name ] = value;
            }
        }
        return JSON.stringify( obj );
    }

    function validSummon() {
        var jsonFormData = toJSONString(document.getElementById("summon-form"));
        //console.log(jsonFormData);
        // alert(jsonFormData);

        const API_GATEWAY_LOGIN_URL = "https://4ohtthv7a9.execute-api.eu-west-1.amazonaws.com/default";
        var restful_action = "POST";

        $.ajax({
            type: restful_action,
            cache: false,
            data: jsonFormData,
            contentType: "application/json",
            url: API_GATEWAY_LOGIN_URL,
            success: function (data) {
                alert(JSON.stringify(data));
                document.getElementById("success-message").classList.remove("d-none");
                return;
            },
            error: function (xhr) {
                alert("An error occured: " + xhr.status + " " + xhr.statusText)
            }
        });
    }


    // alert("after ajax" + jsonFormData);
}

function testSummon() {
    var philsData = JSON.stringify({"summoner-name":"testhardcodedsummoner","summonee-name":"testhardcoded","summonee-number":"447828170428","lat":"51.6639986","lng":"-3.9181857"});
    // alert(philsData);
    //console.log(philsData);
    const API_GATEWAY_LOGIN_URL = "https://czanhrxz97.execute-api.eu-west-1.amazonaws.com/default";
    var restful_action = "POST";

    $.ajax({
        type     : restful_action,
        cache    : false,
        data     : philsData,
        contentType: "application/json",
        url      : API_GATEWAY_LOGIN_URL,
        success: function(data) {
            alert(JSON.stringify(data));
            return;
        },
        error    : function(xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText)
        }
    });
    // alert("after ajax" + philsData);
}