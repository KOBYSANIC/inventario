# Generated by Django 4.2.4 on 2023-08-25 06:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_menumodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='RolMenuModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='menu', to='api.menumodel')),
                ('rol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rol', to='api.rolmodel')),
            ],
        ),
    ]