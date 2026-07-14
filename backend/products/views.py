from rest_framework import generics
from .models import Product, Category, Newsletter

from .serializers import ( ProductSerializer, CategorySerializer, NewsletterSerializer )


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class FeaturedProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(
            featured=True
        )


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "slug"


class LatestProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(
            latest=True
        )


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class NewsletterSubscribeView(generics.CreateAPIView):
    queryset = Newsletter.objects.all()

    serializer_class = NewsletterSerializer