from flask import Flask, jsonify
from flask_cors import CORS
from twilio.rest import Client
import keys

# Initialize the Flask app
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS)
CORS(app)

@app.route('/send-emergency-alert', methods=['POST'])
def send_alert():
    try:
        # --- This is the logic from your project.py file ---
        client = Client(keys.account_sid, keys.auth_token)
        message = client.messages.create(
            body="There is a high alert in your region please move to a safer location!",
            from_=keys.twilio_phone_number,
            to=keys.my_phone_number
        )
        # --- End of project.py logic ---

        print(f"Message sent successfully! SID: {message.sid}")
        # Return a success response to the frontend
        return jsonify({"success": True, "message": "Emergency alert sent successfully!", "sid": message.sid}), 200

    except Exception as e:
        print(f"Error sending message: {e}")
        # Return an error response to the frontend
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    # Run the server on port 5000
    app.run(port=5000, debug=True)