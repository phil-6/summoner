import TwilioSdk from 'twilio'
// Your Account SID from www.twilio.com/console
const accountSid = process.env.TWILIO_ACCOUNT_SID
// Your Auth Token from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN
// instantiate twilio SDK
const twilio = new TwilioSdk(accountSid, authToken)

// use twilio SDK to send text message https://www.twilio.com/docs/libraries/node
exports.handler = (event, context, callback) => {
    const body = JSON.parse(event.body)

    const sms = {
        to: body.to,
        body: body.message || '',
        from: "The Summoner",
    }

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