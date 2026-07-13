from decimal import Decimal
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework.decorators import action

from cart.models import Cart

from .models import Order, OrderItem
from .serializers import OrderSerializer
from django.shortcuts import get_object_or_404

import razorpay

from django.conf import settings


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Order.objects.filter(
                user=self.request.user
            )
            .prefetch_related("items__product")
            .order_by("-created_at")
        )

class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(
            Order,
            id=self.kwargs["pk"],
            user=self.request.user,
        )

client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET,
    )
)

class CreatePaymentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        cart_items = Cart.objects.filter(
            user=request.user
        ).select_related("product")

        if not cart_items.exists():
            return Response(
                {
                    "detail": "Cart is empty."
                },
                status=400,
            )

        total = Decimal("0.00")

        for item in cart_items:
            total += (
                item.product.price *
                item.quantity
            )

        payment = client.order.create({
            "amount": int(total * 100),
            "currency": "INR",
            "payment_capture": 1,
        })

        return Response({
            "key": settings.RAZORPAY_KEY_ID,
            "amount": payment["amount"],
            "order_id": payment["id"],
        })

class VerifyPaymentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        payment_id = request.data["payment_id"]
        razorpay_order_id = request.data["order_id"]
        signature = request.data["signature"]

        cart_items = Cart.objects.filter(
            user=request.user
        ).select_related("product")

        if not cart_items.exists():
            return Response(
                {
                    "detail": "Cart is empty."
                },
                status=400,
            )

        total = Decimal("0.00")

        for item in cart_items:

            if item.quantity > item.product.stock:
                return Response(
                    {
                        "detail": f"{item.product.name} has only {item.product.stock} item(s) left."
                    },
                    status=400,
                )

            total += (
                item.product.price *
                item.quantity
            )

        try:
            client.utility.verify_payment_signature({
                "razorpay_order_id": razorpay_order_id,
                "razorpay_payment_id": payment_id,
                "razorpay_signature": signature,
            })

        except razorpay.errors.SignatureVerificationError:

            return Response(
                {
                    "detail": "Invalid payment signature."
                },
                status=400,
            )

        order = Order.objects.create(
            user=request.user,
            total_price=total,
            payment_id=payment_id,
            razorpay_order_id=razorpay_order_id,
            payment_status="Paid",
        )

        for item in cart_items:

            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
            )

            # Reduce Stock
            item.product.stock -= item.quantity
            item.product.save()

        cart_items.delete()

        return Response(
            OrderSerializer(order).data
        )

class CancelOrderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        order = get_object_or_404(
            Order,
            id=pk,
            user=request.user,
        )

        if order.status.lower() != "pending":
            return Response(
                {
                    "detail": "Only pending orders can be cancelled."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = "Cancelled"
        order.save()

        # Restore Stock
        for item in order.items.select_related("product"):
            item.product.stock += item.quantity
            item.product.save()

        return Response(
            {
                "detail": "Order cancelled successfully."
            },
            status=status.HTTP_200_OK,
        )
