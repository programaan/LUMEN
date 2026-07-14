from django.contrib import admin
from .models import Category, Product, Newsletter


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "slug",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
        "price",
        "stock",
        "featured",
        "latest",
    )

    list_filter = (
        "category",
        "featured",
        "latest",
    )

    search_fields = (
        "name",
        "description",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "subscribed_at",
    )

    search_fields = (
        "email",
    )

    ordering = (
        "-subscribed_at",
    )