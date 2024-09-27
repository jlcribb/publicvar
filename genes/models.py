from django.db import models

# Create your models here.
from django.db import models

class Gen(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

class Variante(models.Model):
    gen = models.ForeignKey(Gen, related_name='variantes', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    secuencia = models.TextField()
    efecto = models.TextField()

    def __str__(self):
        return f'{self.nombre} ({self.gen.nombre})'