// Your Account SID from www.twilio.com/console
const accountSid = process.env.TWILIO_ACCOUNT_SID
// Your Auth Token from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilio = require('twilio')(accountSid, authToken);

// use twilio SDK to send text message https://www.twilio.com/docs/libraries/node
exports.handler = (event, context, callback) => {
    const body = JSON.parse(event.body)
    console.log(body)
    console.log(body.data)
    let message = `Hi ${body.data.summonee}. ${body.data.summoner} has shared their location with you. You can get to them here: https://www.google.com/maps/dir/?api=1&destination=${body.data.lat},${body.data.lng}`

    const sms = {
        to: body.data.phone,
        body: message || '',
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