from ingredients.models import Ingredients

from rest_framework import serializers


class IngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = '__all__'

