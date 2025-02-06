from django.db import models

from audit.models import Audit
from ingredients.models import Ingredients

# Create your models here.


class Product(Audit):
    name = models.CharField(max_length=255, unique=True, null=False, blank=False)
    pvp = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        db_table = "Productos"
    
    def __str__(self):
        return self.name
    

class ProductsIngredients(Audit):
    product = models.ForeignKey(Product, on_delete=models.CASCADE )
    ingredient = models.ForeignKey(Ingredients, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit = models.CharField(max_length=20, unique=True, null=False, blank=False)
    
    class Meta:
        verbose_name = 'Producto - Ingrediente'
        verbose_name_plural = 'Productos - Ingredientes'
        db_table = "Productos_Ingredientes"
    
    def __str__(self):
        return f"{self.product.name} - {self.ingredient.name}"



