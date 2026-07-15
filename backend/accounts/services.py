from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
import logging

logger = logging.getLogger(__name__)


def send_reset_email(email, reset_link):
    subject = "Reset your LUMEN password"

    html = render_to_string(
        "emails/reset_password.html",
        {
            "reset_link": reset_link,
        },
    )

    message = EmailMultiAlternatives(
        subject=subject,
        body="",
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )

    message.attach_alternative(
        html,
        "text/html",
    )

    try:
        message.send(fail_silently=False)

    except Exception:
        logger.exception(
            "Failed to send reset password email."
        )
        raise


def send_verification_email(email, verify_link):
    subject = "Verify your LUMEN account"

    html = render_to_string(
        "emails/verify_email.html",
        {
            "verify_link": verify_link,
        },
    )

    message = EmailMultiAlternatives(
        subject=subject,
        body="",
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )

    message.attach_alternative(
        html,
        "text/html",
    )

    try:
        message.send(fail_silently=False)

    except Exception:
        logger.exception(
            "Failed to send verification email."
        )
        raise