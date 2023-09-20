from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView

from rest_framework.routers import DefaultRouter

from server.views import ServerListView, CategoryListView


router = DefaultRouter()
router.register(r"server", ServerListView, basename='server-list')
router.register("category", CategoryListView, basename='category-list')

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name='schema'),
    path("api/docs/schema/ui/", SpectacularSwaggerView.as_view()),
    path("api/", include([
        path("", include(router.urls)),

    ])),
] #+ router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)