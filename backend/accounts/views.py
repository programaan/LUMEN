from rest_framework import generics
from .models import User
from django.conf import settings

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth import get_user_model
from django.db import transaction

from .services import send_reset_email, send_verification_email

from .serializers import ( RegisterSerializer, LoginSerializer, UserSerializer, ResetPasswordSerializer )

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    try:
        with transaction.atomic():
            user = serializer.save()

            uid = urlsafe_base64_encode(
                force_bytes(user.pk)
            )

            token = default_token_generator.make_token(user)

            verify_link = (
                f"{settings.FRONTEND_URL}/verify-email/"
                f"{uid}/{token}"
            )

            send_verification_email(
                user.email,
                verify_link,
            )

    except Exception:
        return Response(
            {
                "detail": "Unable to send verification email. Please try again."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return Response(
        {
            "detail": "Account created. Please verify your email."
        },
        status=status.HTTP_201_CREATED,
    )


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "full_name": user.full_name,
                    "email": user.email,
                },
            },
            status=status.HTTP_200_OK,
        )

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
    email = request.data.get("email")

    User = get_user_model()

    user = User.objects.filter(email=email).first()

    if not user:
        return Response(
            {
                "detail": "If an account exists, a reset email has been sent."
            },
            status=status.HTTP_200_OK,
        )

    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    reset_link = (
        f"{settings.FRONTEND_URL}/reset-password/"
        f"{uid}/{token}"
    )

    try:
        send_reset_email(
            user.email,
            reset_link,
        )

    except Exception:
        return Response(
            {
                "detail": "Unable to send reset email. Please try again."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return Response(
        {
            "detail": "Password reset email sent."
        },
        status=status.HTTP_200_OK,
    )

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        serializer = ResetPasswordSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        User = get_user_model()

        try:
            uid = urlsafe_base64_decode(
                uidb64
            ).decode()

            user = User.objects.get(pk=uid)

        except (
            TypeError,
            ValueError,
            OverflowError,
            User.DoesNotExist,
        ):
            return Response(
                {
                    "detail": "Invalid reset link."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not default_token_generator.check_token(
            user,
            token,
        ):
            return Response(
                {
                    "detail": "Reset link has expired."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(
            serializer.validated_data["password"]
        )

        user.save()

        return Response(
            {
                "detail": "Password reset successfully."
            },
            status=status.HTTP_200_OK,
        )

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        User = get_user_model()

        try:
            uid = urlsafe_base64_decode(
                uidb64
            ).decode()

            user = User.objects.get(pk=uid)

        except (
            TypeError,
            ValueError,
            OverflowError,
            User.DoesNotExist,
        ):
            return Response(
                {
                    "detail": "Invalid verification link."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not default_token_generator.check_token(
            user,
            token,
        ):
            return Response(
                {
                    "detail": "Verification link has expired."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.is_verified = True
        user.is_active = True
        user.save(update_fields=[
            "is_verified",
            "is_active",
        ])

        return Response(
            {
                "detail": "Email verified successfully."
            },
            status=status.HTTP_200_OK,
        )