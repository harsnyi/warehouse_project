from rest_framework import serializers
from ..models import Storage, Occupier
from .occupier_serializer import OccupierSerializer

class StorageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupier
        fields = ['occupier_name', 'address', 'phone_number', 'turning_day', 'payment_method', 'debt', 'refreshed']

class StorageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ['name', 'area', 'cost', 'occupier', 'comment']

class StorageWithoutOccupierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ['id','name', 'area', 'cost','comment']

class StorageSerializer(serializers.ModelSerializer):
    occupier = OccupierSerializer()
    class Meta:
        model = Storage
        fields = ['id','name', 'area', 'cost','occupier','comment']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        if representation['occupier'] is None:
            representation['occupier'] = "Jelenleg nincs bérlője"
        
        return representation
    
