# Generated by Django 3.2.5 on 2024-01-18 09:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse_project', '0005_debtlog'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debtlog',
            name='occupier',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='warehouse_project.occupier'),
        ),
        migrations.AlterField(
            model_name='storage',
            name='occupier',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='warehouse_project.occupier'),
        ),
    ]
