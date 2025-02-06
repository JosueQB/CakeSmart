

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewset import ProductIngredientsViewSet, ProductViewSet


router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')
router.register(r'products-ingredients', ProductIngredientsViewSet, basename='products-ingredients')



urlpatterns = router.urls