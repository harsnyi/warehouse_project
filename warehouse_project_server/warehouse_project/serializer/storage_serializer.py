from rest_framework import serializers
from ..models import Storage, Occupier

class StorageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupier
        fields = ['occupier_name', 'address', 'phone_number', 'turning_day', 'payment_method', 'debt', 'refreshed']

class StorageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ['name', 'area', 'cost', 'occupier', 'comment']

class StorageWithoutOccupierCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ['name', 'area', 'cost','comment']

class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ['name', 'area', 'cost', 'occupier', 'comment']