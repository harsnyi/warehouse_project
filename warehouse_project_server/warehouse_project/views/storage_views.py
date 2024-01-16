from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Storage, Occupier

from ..serializer.storage_serializer import (
    StorageCreateSerializer,
    StorageSerializer,
    StorageWithoutOccupierSerializer
)

class AddNewStorageView(APIView):
    def post(self, request):

        serializer = StorageCreateSerializer(data = request.data)
        serializer_without_occupier = StorageWithoutOccupierSerializer(data = request.data)

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

class GetAllEmptyStorageView(APIView):
    def get(self, request):
        storages = Storage.objects.filter(occupier = None)
        serializer = StorageWithoutOccupierSerializer(storages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class GetStorageView(APIView):
    def get(self, request, pk):
        try:
            storage = Storage.objects.get(pk=pk)
        except Storage.DoesNotExist:
            return Response({'error': 'No such storage'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = StorageSerializer(storage)
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