from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Cart
from .serializers import CartSerializer

from products.models import Product


class CartListView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(
            user=self.request.user
        ).select_related("product")


class AddToCartView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product_id")

        try:
            product = Product.objects.get(
                id=product_id
            )
        except Product.DoesNotExist:
            return Response(
                {
                    "detail": "Product not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if product.stock <= 0:
            return Response(
                {
                    "detail": "Product is out of stock."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        cart_item, created = Cart.objects.get_or_create(
            user=request.user,
            product=product,
        )

        if not created:
            if cart_item.quantity >= product.stock:
                return Response(
                    {
                        "detail": f"Only {product.stock} item(s) available."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            cart_item.quantity += 1
            cart_item.save()

        return Response(
            CartSerializer(cart_item).data,
            status=status.HTTP_200_OK,
        )


class UpdateCartView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        product_id = request.data.get("product_id")
        action = request.data.get("action")

        try:
            cart_item = Cart.objects.select_related(
                "product"
            ).get(
                user=request.user,
                product_id=product_id,
            )
        except Cart.DoesNotExist:
            return Response(
                {
                    "detail": "Cart item not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if action == "increase":

            if (
                cart_item.quantity
                >= cart_item.product.stock
            ):
                return Response(
                    {
                        "detail": f"Only {cart_item.product.stock} item(s) available."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            cart_item.quantity += 1
            cart_item.save()

        elif action == "decrease":

            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
            else:
                cart_item.delete()

                return Response(
                    status=status.HTTP_204_NO_CONTENT
                )

        return Response(
            CartSerializer(cart_item).data
        )


class RemoveCartItemView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        try:
            cart_item = Cart.objects.get(
                user=request.user,
                product_id=product_id,
            )

            cart_item.delete()

            return Response(
                status=status.HTTP_204_NO_CONTENT
            )

        except Cart.DoesNotExist:
            return Response(
                {
                    "detail": "Item not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )