from rest_framework import serializers

class RecipeSuggestProfitSerializer(serializers.Serializer):
    recipe = serializers.CharField()
    quantity_make = serializers.IntegerField()
    cost_unit = serializers.DecimalField(max_digits=10, decimal_places=2)
    cost = serializers.DecimalField(max_digits=10, decimal_places=2)
    profit = serializers.DecimalField(max_digits=10, decimal_places=2)
    pvp = serializers.DecimalField(max_digits=10, decimal_places=2)