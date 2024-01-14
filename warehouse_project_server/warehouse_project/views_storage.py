from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Occupier, Storage
from .serializers import (
    StorageCreateSerializer,
    StorageSerializer,
    StorageWithoutOccupierCreateSerializer
)

class DeleteOccupierView(APIView):
    def delete(self, request, pk):
        try:
            occupier = Occupier.objects.get(pk = pk)
            occupier.delete()
            success_message = {
                'message': 'Occupier deleted successfully',
            }
            return Response(success_message, status=status.HTTP_200_OK)
        except Occupier.DoesNotExist:
            error_message = {
                'message': 'Occupier not found',
            }
            return Response(error_message,status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddNewStorageView(APIView):
    def post(self, request):

        serializer = StorageCreateSerializer(data = request.data)
        serializer_without_occupier = StorageWithoutOccupierCreateSerializer(data = request.data)

        if serializer.is_valid():

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        elif serializer_without_occupier.is_valid():
            
            serializer_without_occupier.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            

        error_response = {
            'message': 'Validation failed',
            'errors': serializer.errors
        }
        return Response(error_response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetAllStorageView(APIView):
    def get(self, request):
        storages = Storage.objects.all()
        serializer = StorageSerializer(storages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class GetAllStorageView(APIView):
    def get(self, request):
        storages = Storage.objects.all()
        serializer = StorageSerializer(storages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteStorageView(APIView):
    def delete(self, request, pk):
        try:
            storage = Storage.objects.get(pk = pk)
            storage.delete()
            success_message = {
                'message': 'Storage deleted successfully',
            }
            return Response(success_message, status=status.HTTP_200_OK)
        except Storage.DoesNotExist:
            error_message = {
                'message': 'Storage not found',
            }
            return Response(error_message,status=status.HTTP_500_INTERNAL_SERVER_ERROR)