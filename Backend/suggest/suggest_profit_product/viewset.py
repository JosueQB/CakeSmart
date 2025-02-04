from rest_framework import viewsets
from rest_framework.response import Response
from suggest.suggest_product.suggest import suggest_product
from suggest.suggest_profit_product.serializer import RecipeSuggestProfitSerializer
from suggest.suggest_profit_product.suggest_profit import suggest_profitable_product


class RecipeSuggestProfitViewSet(viewsets.ViewSet):
    def list(self, request):
        list_suggest_product = suggest_product("Panqueques")
        result = suggest_profitable_product(list_suggest_product)


        serializer = RecipeSuggestProfitSerializer(result, many=True)
        
        return Response(serializer.data)