# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls
from .views import GenViewSet, VarianteViewSet

router = DefaultRouter()
router.register(r'genes', GenViewSet, 'genes')
router.register(r'variantes', VarianteViewSet, 'variantes')

urlpatterns = [
    path('api/', include(router.urls)),
    path('docs/', include_docs_urls(title='Genes API'))
]
