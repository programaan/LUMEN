from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives


def send_reset_email(email, reset_link):

    subject = "Reset your LUMEN password"

    html = render_to_string(
        "emails/reset_password.html",
        {
            "reset_link": reset_link,
        },
    )

    message = EmailMultiAlternatives(
        subject,
        "",
        settings.DEFAULT_FROM_EMAIL,
        [email],
    )

    message.attach_alternative(
        html,
        "text/html",
    )

    message.send()


def send_verification_email(email, verify_link):

    subject = "Verify your LUMEN account"

    html_content = render_to_string(
        "emails/verify_email.html",
        {
            "verify_link": verify_link,
        },
    )

    email_message = EmailMultiAlternatives(
        subject,
        "",
        settings.DEFAULT_FROM_EMAIL,
        [email],
    )

    email_message.attach_alternative(
        html_content,
        "text/html",
    )

    email_message.send()