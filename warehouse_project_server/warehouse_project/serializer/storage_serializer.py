from rest_framework import serializers
from ..models import Storage
from .occupier_serializer import OccupierSerializer


class StorageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ['name', 'area', 'cost', 'occupier', 'comment']
    
    def create(self, validated_data):
        name = validated_data.get('name')
        
        if Storage.objects.filter(name=name).exists():
            raise serializers.ValidationError({'name': 'Storage with this name already exists.'})

        return Storage.objects.create(**validated_data)
        

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
    

class StorageUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ['name', 'area', 'cost', 'occupier', 'comment']