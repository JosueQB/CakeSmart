from rest_framework import viewsets

from product.models import Product, ProductsIngredients
from product.serializers import ProductSerializer, ProductsIngredientsSerializer


class ProductViewSet(viewsets.ModelViewSet):

    serializer_class = ProductSerializer
    queryset = Product.objects.all()



class ProductIngredientsViewSet(viewsets.ModelViewSet):

    serializer_class = ProductsIngredientsSerializer
    queryset = ProductsIngredients.objects.all()

