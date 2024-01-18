from django.db import models
from django.core.exceptions import ValidationError

def validate_turning_day(value):
    if value < 1 or value > 31:
        raise ValidationError("Nem lehet kisebb a forduló nap mint 1, vagy nem lehet nagyobb mint 31.")

def validate_area(value):
    if value < 1 or value > 2000:
        raise ValidationError("Nem lehet kisebb az alapterület mint 1, vagy nem lehet nagyobb mint 2000 négyzetméter.")

def validate_cost(value):
    if value < 1:
        raise ValidationError("Nem lehet negatív a bérleti díj.")

class Occupier(models.Model):
    occupier_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    turning_day = models.IntegerField(validators=[validate_turning_day])
    payment_method = models.BooleanField()
    debt = models.BigIntegerField()
    refreshed = models.DateField()

class Storage(models.Model):
    name = models.CharField(max_length=255)
    area = models.IntegerField(validators=[validate_area])
    cost = models.IntegerField(validators=[validate_cost])
    occupier = models.ForeignKey(Occupier, on_delete=models.SET_NULL,null=True, blank=True)
    comment = models.TextField()

class DebtLog(models.Model):
    occupier = models.ForeignKey(Occupier, on_delete=models.CASCADE,null=True, blank=True)
    booked = models.DateField()