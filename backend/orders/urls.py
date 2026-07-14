from django.urls import path

from .views import ( OrderListView, OrderDetailView, CreatePaymentView, VerifyPaymentView, CancelOrderView )

urlpatterns = [
    path("orders/", OrderListView.as_view(), name="orders"),
    path("orders/<int:pk>/", OrderDetailView.as_view(), name="order-detail"),
    path("orders/create-payment/", CreatePaymentView.as_view(), name="create-payment"),
    path("orders/verify-payment/", VerifyPaymentView.as_view(), name="verify-payment"),
    path("orders/<int:pk>/cancel/", CancelOrderView.as_view(), name="cancel-order"),
]