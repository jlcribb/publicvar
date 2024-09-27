from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import viewsets
from .models import Gen, Variante
from .serializers import GenSerializer, VarianteSerializer

class GenViewSet(viewsets.ModelViewSet):
    queryset = Gen.objects.all()
    serializer_class = GenSerializer

class VarianteViewSet(viewsets.ModelViewSet):
    queryset = Variante.objects.all()
    serializer_class = VarianteSerializer
 