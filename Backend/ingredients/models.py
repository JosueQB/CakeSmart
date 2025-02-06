from django.db import models

from audit.models import Audit

# Create your models here.


class Ingredients(Audit):
    description = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    unit = models.CharField(max_length=20, unique=True, null=False, blank=False)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        verbose_name = "Ingrediente"
        verbose_name_plural = "Ingredientes"
        db_table = "Ingredientes"
    def __str__(self):
        return f"{self.description} - {self.quantity} {self.unit}"

    