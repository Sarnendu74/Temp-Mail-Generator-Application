from flask import Flask, jsonify, request
from flask_cors import CORS
from utils import get_temp_email
from email_store import add_email, get_inbox, cleanup_expired_emails
import threading, time

app = Flask(__name__)
CORS(app)  # Allow frontend access

@app.route("/generate", methods=["GET"])
def generate():
    domain = request.args.get("domain")
    email = get_temp_email(domain)
    return jsonify({"email": email})

@app.route("/send", methods=["POST"])
def send():
    data = request.get_json()
    add_email(data["to"], data["subject"], data["body"])
    return jsonify({"status": "sent"})

@app.route("/inbox/<email>", methods=["GET"])
def inbox(email):
    return jsonify({"emails": get_inbox(email)})

def background_cleanup():
    while True:
        cleanup_expired_emails()
        time.sleep(60)

if __name__ == "__main__":
    threading.Thread(target=background_cleanup, daemon=True).start()
    app.run(port=5000, debug=True)