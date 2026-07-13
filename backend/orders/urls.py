from django.urls import path

from .views import (
    OrderListView,
    OrderDetailView,
    CreatePaymentView,
    VerifyPaymentView,
    CancelOrderView,
)

urlpatterns = [
    path(
        "orders/",
        OrderListView.as_view(),
        name="orders",
    ),

    path(
        "orders/<int:pk>/",
        OrderDetailView.as_view(),
        name="order-detail",
    ),

    path(
        "orders/create-payment/",
        CreatePaymentView.as_view(),
    ),

    path(
        "orders/verify-payment/",
        VerifyPaymentView.as_view(),
    ),

    path(
        "orders/<int:pk>/cancel/",
        CancelOrderView.as_view(),
    ),
]