from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

    readonly_fields = (
        "product",
        "quantity",
        "price",
    )

    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "total_price",
        "status",
        "payment_status",
        "created_at",
    )

    list_filter = (
        "status",
        "payment_status",
    )

    search_fields = (
        "user__email",
        "payment_id",
        "razorpay_order_id",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "user",
        "total_price",
        "payment_status",
        "payment_id",
        "razorpay_order_id",
        "created_at",
    )

    inlines = [
        OrderItemInline,
    ]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "order",
        "product",
        "quantity",
        "price",
    )

    search_fields = (
        "order__id",
        "product__name",
    )

    readonly_fields = (
        "order",
        "product",
        "quantity",
        "price",
    )