# Generated by Django 4.2.2 on 2023-07-18 21:26

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("my_app", "0011_remove_postmuseum_type"),
    ]

    operations = [
        migrations.AddField(
            model_name="museum",
            name="city",
            field=models.CharField(blank=True, default="", max_length=200, null=True),
        ),
    ]
