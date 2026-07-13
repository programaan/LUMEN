from django.urls import path

from .views import (
    ProductListView,
    FeaturedProductListView,
    ProductDetailView,
    LatestProductListView,
    CategoryListView,
    NewsletterSubscribeView,
)

urlpatterns = [
    path(
        "products/",
        ProductListView.as_view(),
        name="products",
    ),

    path(
        "products/featured/",
        FeaturedProductListView.as_view(),
    ),

    path(
        "products/latest/",
        LatestProductListView.as_view(),
        name="latest-products",
    ),

    path(
        "products/<slug:slug>/",
        ProductDetailView.as_view(),
        name="product-detail",
    ),

    path(
        "categories/",
        CategoryListView.as_view(),
        name="categories",
    ),

    path(
        "newsletter/",
        NewsletterSubscribeView.as_view(),
    ),
]