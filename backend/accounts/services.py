from django.core.mail import send_mail
from django.conf import settings

def send_verification_email(email, verify_link):
    send_mail(
        subject="Verify your LUMEN account",
        message=f"Click here to verify:\n\n{verify_link}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
        fail_silently=False,
    )