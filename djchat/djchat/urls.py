from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView

from rest_framework.routers import DefaultRouter

from server.views import ServerListView


router = DefaultRouter()
router.register(r"general", ServerListView, basename='server-list')

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name='schema'),
    path("api/docs/schema/ui/", SpectacularSwaggerView.as_view()),
    path("v1/", include([
        path("viewset/", include(router.urls)),
        path("server/", include("server.urls")),

    ])),
] #+ router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)