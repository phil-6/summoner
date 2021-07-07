
async function sendText(body) {
    const accountSid = TWILIO_ACCOUNT_SID
    const authToken = TWILIO_AUTH_TOKEN
    const fromNumber = TWILIO_PHONE_NUMBER

    let phone = body.phone.replace('0', '+44')
    let messageContent

    if (JSON.stringify(body).includes('summoner_phone')) {
        messageContent = `Hi ${body.summonee}. ${body.summoner} wants to know your location. 
        You can share your location with them by following this link: https://summoner.purpleriver.dev/share?summoner=${body.summoner}&summoner_num=${body.summoner_phone}&summonee=${body.summonee}`
    } else {
        messageContent = `Hi ${body.summonee}. ${body.summoner} has shared their location with you. You can find them here: https://www.google.com/maps/dir/?api=1&destination=${body.lat},${body.lng}`
    }

    const endpoint = "https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/Messages.json"
    let encoded = new URLSearchParams()
    encoded.append("To", phone)
    encoded.append("From", fromNumber)
    encoded.append("Body", messageContent)

    let token = btoa(accountSid + ":" + authToken)
    const request = {
        body: encoded,
        method: "POST",
        headers: {"Authorization": `Basic ${token}`, "Content-Type": "application/x-www-form-urlencoded"}
    }

    let result = await fetch(endpoint, request)
    result = await result.json()
    return new Response(JSON.stringify(result), request)
}

async function readRequestBody(request) {
    const {headers} = request

    const contentType = headers.get("content-type") || ""
    if (contentType.includes("form")) {
        const formData = await request.formData()
        const body = {}
        for (const entry of formData.entries()) {
            body[entry[0]] = entry[1]
        }
        return (sendText(body))
    }
}

async function handleRequest(request) {
    const response = await readRequestBody(request)
    console.log(response)
    return (simpleResponse(response.statusText, response.status))
}

function simpleResponse(message, statusCode) {
    let resp = {message: message, status: statusCode}
    return new Response(JSON.stringify(resp), {
        headers: {
            "Content-Type": "application/json"
        }, status: statusCode
    })
}

addEventListener("fetch", event => {
    const {request} = event

    if (request.method === "POST") {
        console.log(request)
        return event.respondWith(handleRequest(request))
    } else {
        let message = "Look at what you've done."
        let statusCode = 405
        return event.respondWith(simpleResponse(message, statusCode))
    }
})