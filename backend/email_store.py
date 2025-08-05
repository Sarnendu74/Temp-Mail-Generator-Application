import time

email_db = {}

def add_email(to_address, subject, body):
    now = time.time()
    email = {"timestamp": now, "subject": subject, "body": body}
    email_db.setdefault(to_address, []).append(email)

def get_inbox(to_address):
    now = time.time()
    return [email for email in email_db.get(to_address, []) if now - email['timestamp'] <= 600]

def cleanup_expired_emails():
    now = time.time()
    for addr in list(email_db):
        email_db[addr] = [e for e in email_db[addr] if now - e['timestamp'] <= 600]
        if not email_db[addr]:
            del email_db[addr]