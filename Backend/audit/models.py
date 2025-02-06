from django.db import models

# Create your models here.


class Audit(models.Model):
    creation_user = models.CharField(max_length=255, null=False, blank=False)
    creation_date = models.DateTimeField(auto_now_add=True)
    modification_user = models.CharField(max_length=255, null=True, blank=True)
    modification_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True