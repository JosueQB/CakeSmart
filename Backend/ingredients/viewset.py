from rest_framework import viewsets

from ingredients.models import Ingredients
from ingredients.serializers import IngredientsSerializer

class IngredientsViewSet(viewsets.ModelViewSet):

    serializer_class = IngredientsSerializer
    queryset = Ingredients.objects.all()