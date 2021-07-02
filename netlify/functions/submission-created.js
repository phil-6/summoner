const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_PHONE_NUMBER

const twilio = require('twilio')(accountSid, authToken);

// use twilio SDK to send text message https://www.twilio.com/docs/libraries/node
exports.handler = (event, context, callback) => {
    const body = JSON.parse(event.body)
    let data = body.payload.data
    let phone = data.phone.replace('0', '+44')

    let messageContent = `Hi ${data.summonee}. ${data.summoner} has shared their location with you. You can get to them here: https://www.google.com/maps/dir/?api=1&destination=${data.lat},${data.lng}`

    const sms = {
        to: phone,
        body: messageContent || '',
        from: fromNumber,
    }
    console.log(sms)

    twilio.messages.create(sms).then((message) => {
        console.log(`text message sent!`, message.body)
        console.log(`date_created: ${message.dateCreated}`)
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