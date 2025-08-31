from twilio.rest import Client
import keys

client = Client(keys.account_sid, keys.auth_token)
message = client.messages.create(
    body = "There is a high alert in your region please move to a safer location!",
    from_ = keys.twilio_phone_number,
    to = keys.my_phone_number 
)

print(message.body)