// Your Account SID from www.twilio.com/console
const accountSid = process.env.TWILIO_ACCOUNT_SID
// Your Auth Token from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilio = require('twilio')(accountSid, authToken);

// use twilio SDK to send text message https://www.twilio.com/docs/libraries/node
exports.handler = (event, context, callback) => {
    const body = JSON.parse(event.body)
    const data = body.payload.data
    console.log(event.body.payload)
    console.log("=============== after event.body.payload")
    console.log(event.body.payload.data)
    console.log("=============== after event.body.payload.data")
    console.log(data.phone)
    console.log("=============== after data.phone")

    let content = `Hi ${data.summonee}. ${data.summoner} has shared their location with you. You can get to them here: https://www.google.com/maps/dir/?api=1&destination=${data.lat},${data.lng}`

    const sms = {
        to: data.phone,
        body: content || '',
        from: "The Summoner",
    }
    console.log(sms)

    twilio.messages.create(sms).then((message) => {
        console.log(`text message sent!`, message.body)
        console.log(`date_created: ${message.date_created}`)
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Text message successfully sent!',
                data: message,
            })
        })
    }).catch((error) => {
        console.log('text message failed: ', error)
        return callback(null, {
            statusCode: error.status,
            body: JSON.stringify({
                message: error.message,
                error: error,
            })
        })
    })
}