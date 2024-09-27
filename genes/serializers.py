# serializers.py
from rest_framework import serializers
from .models import Gen, Variante

class VarianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variante
        fields = '__all__'

class GenSerializer(serializers.ModelSerializer):
    variantes = VarianteSerializer(many=True, read_only=True)

    class Meta:
        model = Gen
        fields = '__all__'
