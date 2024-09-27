# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GenViewSet, VarianteViewSet

router = DefaultRouter()
router.register(r'genes', GenViewSet)
router.register(r'variantes', VarianteViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
