from rest_framework import serializers
from .models import Product, Category, Newsletter


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Product

        fields = [
            "id",
            "name",
            "slug",
            "description",
            "price",
            "stock",
            "image",
            "thumbnail1",
            "thumbnail2",
            "thumbnail3",
            "thumbnail4",
            "featured",
            "latest",
            "category",
        ]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category

        fields = [
            "id",
            "name",
            "slug",
        ]

class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter

        fields = [
            "id",
            "email",
            "subscribed_at",
        ]

        read_only_fields = [
            "id",
            "subscribed_at",
        ]