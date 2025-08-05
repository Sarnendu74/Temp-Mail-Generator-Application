import random
import string

# Step 1: List of valid public-style domains
VALID_DOMAINS = [
    "tempmail.tech",
    "maildrop.cc",
    "fastmail.tech",
    "fakeinbox.net",
    "inboxbear.com"
]

# Step 2: Generate a realistic username
def generate_email_username(length=8):
    prefix = random.choice(["user", "temp", "mail", "inbox", "anon", "sky", "quick"])
    suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))
    return f"{prefix}{suffix}"

# Step 3: Final email generator
def get_temp_email(preferred_domain=None):
    domain = preferred_domain if preferred_domain in VALID_DOMAINS else random.choice(VALID_DOMAINS)
    return f"{generate_email_username()}@{domain}"
