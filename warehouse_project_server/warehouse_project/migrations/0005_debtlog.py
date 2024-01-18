# Generated by Django 3.2.5 on 2024-01-18 09:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse_project', '0004_alter_storage_occupier'),
    ]

    operations = [
        migrations.CreateModel(
            name='DebtLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('booked', models.DateField()),
                ('occupier', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='warehouse_project.occupier')),
            ],
        ),
    ]