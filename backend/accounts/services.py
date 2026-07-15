import logging

import resend
from django.conf import settings
from django.template.loader import render_to_string

logger = logging.getLogger(__name__)

resend.api_key = settings.RESEND_API_KEY


def _send_email(subject, html, email):
    try:
        resend.Emails.send(
            {
                "from": settings.DEFAULT_FROM_EMAIL,
                "to": [email],
                "subject": subject,
                "html": html,
            }
        )

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