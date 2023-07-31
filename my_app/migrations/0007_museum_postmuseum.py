# Generated by Django 4.2.2 on 2023-07-11 17:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("my_app", "0006_delete_channel_delete_nickname_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Museum",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(default="", max_length=70)),
                ("type", models.CharField(default="", max_length=70)),
                (
                    "location",
                    models.CharField(blank=True, default="", max_length=200, null=True),
                ),
                (
                    "country",
                    models.CharField(blank=True, default="", max_length=200, null=True),
                ),
                (
                    "user",
                    models.OneToOneField(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="PostMuseum",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("name", models.CharField(default="", max_length=70)),
                ("type", models.CharField(default="", max_length=70)),
                ("author", models.CharField(default="", max_length=70)),
                (
                    "description",
                    models.CharField(blank=True, default="", max_length=400, null=True),
                ),
                (
                    "museum",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="my_app.museum",
                    ),
                ),
            ],
        ),
    ]