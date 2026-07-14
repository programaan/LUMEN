from django.urls import path

from .views import ( CartListView, AddToCartView, UpdateCartView, RemoveCartItemView )

urlpatterns = [
    path("cart/", CartListView.as_view(), name="cart"),
    path("cart/add/", AddToCartView.as_view(), name="add-to-cart"),
    path("cart/update/", UpdateCartView.as_view(), name="update-cart"),
    path("cart/remove/<int:product_id>/", RemoveCartItemView.as_view(), name="remove-cart-item"),
]