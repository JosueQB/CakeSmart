from rest_framework import serializers

from ingredients.serializers import IngredientsSerializer
from product.models import Product, ProductsIngredients

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductsIngredientsSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  
    ingredient = IngredientsSerializer()  

    class Meta:
        fields = ['id', 'product', 'ingredient', 'quantity', 'unit'] 
        model = ProductsIngredients