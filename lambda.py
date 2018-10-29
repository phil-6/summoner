from __future__ import print_function

import json
import boto3

print('Loading function')

def lambda_handler(event, context):

    summonerName = event['body']['summoner-name']
    summoneeName = event['body']['summonee-name']
    summoneeNumber = event['body']['summonee-number']
    lat = event['body']['lat']
    lng= event['body']['lng']

    message = "%s! You have been summoned by %s. Click the link below to get to them: https://www.google.com/maps/dir/?api=1&destination=%s,%s from thesummoner.uk" % (summoneeName, summonerName, lat, lng)
    print(message)
    successMessage = 'You have summoned %s' % (summoneeName)
    print(successMessage)

    send_sms(summoneeNumber, message)
    return successMessage

def send_sms(summoneeNumber, message):

    sns = boto3.client('sns')

    sns.publish(
        PhoneNumber = summoneeNumber,
        Message = message
    )