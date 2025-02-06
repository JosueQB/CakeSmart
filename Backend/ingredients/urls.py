from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from ingredients.viewset import IngredientsViewSet


router = DefaultRouter()
router.register(r'ingredients', IngredientsViewSet, basename='ingredients')



urlpatterns = router.urls