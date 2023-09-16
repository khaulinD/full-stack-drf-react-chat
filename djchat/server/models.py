from django.conf import settings
from django.db import models
from django.shortcuts import get_object_or_404
from django.dispatch import receiver

from server.validators import validate_icon_image_size, validate_image_file_extension

from server.model_mixin import IconFileMixin


def server_icon_upload_path(instance, filename):
    return f"server/{instance.id}/server_icon/{filename}"

def server_banner_upload_path(instance, filename):
    return f"server/{instance.id}/server_banner/{filename}"

def category_icon_upload_path(instance, filename):
    return f"category/{instance.id}/icon_folder/{filename}"


class Category(IconFileMixin, models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(blank=True, null=True, upload_to=category_icon_upload_path)

    def __str__(self):
        return self.name

class Server(IconFileMixin, models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="server_owner")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="server_category")
    description = models.CharField(max_length=255, blank=True, null=True)
    member = models.ManyToManyField(settings.AUTH_USER_MODEL)
    banner = models.ImageField(upload_to=server_banner_upload_path,
                               null=True,
                               blank=True,
                               validators=[validate_image_file_extension])
    icon = models.ImageField(upload_to=server_icon_upload_path,
                             null=True,
                             blank=True,
                             validators=[validate_icon_image_size, validate_image_file_extension])

    def save(self, *args, **kwargs):
        self.delete_old_file('icon', self.icon)
        self.delete_old_file('banner', self.banner)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Channel(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="channel_owner")
    topic = models.CharField(max_length=100)
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name="channel_server")

    def __str__(self):
        return self.name

