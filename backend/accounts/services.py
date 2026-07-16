from mailjet_rest import Client
from django.conf import settings
from django.template.loader import render_to_string
import logging

logger = logging.getLogger(__name__)

mailjet = Client(
    auth=(
        settings.MAILJET_API_KEY,
        settings.MAILJET_API_SECRET,
    ),
    version="v3.1",
)


def _send_email(subject, html, email):
    data = {
        "Messages": [
            {
                "From": {
                    "Email": settings.DEFAULT_FROM_EMAIL,
                    "Name": "LUMEN",
                },
                "To": [
                    {
                        "Email": email,
                    }
                ],
                "Subject": subject,
                "HTMLPart": html,
            }
        ]
    }

    try:
        result = mailjet.send.create(data=data)

        if result.status_code not in (200, 201):
            logger.error(result.json())
            raise Exception("Mailjet failed to send email.")

    except Exception:
        logger.exception("Failed to send email.")
        raise


def send_reset_email(email, reset_link):
    html = render_to_string(
        "emails/reset_password.html",
        {
            "reset_link": reset_link,
        },
    )

    _send_email(
        "Reset your LUMEN password",
        html,
        email,
    )


def send_verification_email(email, verify_link):
    html = render_to_string(
        "emails/verify_email.html",
        {
            "verify_link": verify_link,
        },
    )

    _send_email(
        "Verify your LUMEN account",
        html,
        email,
    )