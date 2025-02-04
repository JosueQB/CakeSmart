# views.py
from rest_framework import viewsets
from rest_framework.response import Response

from suggest.suggest_product.serializer import RecipeSuggestSerializer
from suggest.suggest_product.suggest import suggest_product



class RecipeSuggestViewSet(viewsets.ViewSet):
    def list(self, request):
        result = suggest_product("Panqueques")

        serializer = RecipeSuggestSerializer(result, many=True)
        
        return Response(serializer.data)
