"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

from ingredients.viewset import IngredientsViewSet
from product.viewset import ProductIngredientsViewSet, ProductViewSet
from suggest.suggest_product.viewset import RecipeSuggestViewSet
from suggest.suggest_profit_product.viewset import RecipeSuggestProfitViewSet


""" urlpatterns = [
    path('admin/', admin.site.urls),
] """

router = DefaultRouter()
router.register(r'recetas', RecipeSuggestViewSet, basename='recetas')
router.register(r'recetas/profit', RecipeSuggestProfitViewSet, basename='recetas-profit')
router.register(r'product', ProductViewSet, basename='product')
router.register(r'product-ingredients', ProductIngredientsViewSet, basename='product-ingredients')
router.register(r'ingredients', IngredientsViewSet, basename='ingredients')

# Incluir las rutas de la API
urlpatterns = [
    path('api/', include(router.urls)),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)