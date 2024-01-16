from rest_framework import serializers
from ..models import Occupier

class OccupierCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupier
        fields = ['occupier_name', 'address', 'phone_number', 'turning_day', 'payment_method', 'debt']

    def create(self, validated_data):
        occupier_name = validated_data.get('occupier_name')
        
        if Occupier.objects.filter(occupier_name=occupier_name).exists():
            raise serializers.ValidationError({'occupier_name': 'Occupier with this name already exists.'})

        return Occupier.objects.create(**validated_data)

class OccupierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupier
        fields = ['id', 'occupier_name', 'address', 'phone_number', 'turning_day', 'payment_method', 'debt','refreshed']

class OccupierUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupier
        fields = ['occupier_name', 'address', 'phone_number', 'turning_day', 'payment_method','debt', 'refreshed']
