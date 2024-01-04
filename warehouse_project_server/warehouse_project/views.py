from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Occupier, Storage
from .serializers import (
    OccupierSerializer,
    OccupierCreateSerializer,
    OccupierUpdateSerializer,
    StorageCreateSerializer,
    StorageSerializer,
    StorageWithoutOccupierCreateSerializer
)

class AddNewOccupierView(APIView):
    def post(self, request):
        serializer = OccupierCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Use appropriate status code
        error_response = {
            'message': 'Validation failed',
            'errors': serializer.errors
        }
        return Response(error_response, status=status.HTTP_400_BAD_REQUEST)  # Use appropriate status code


class GetAllOccupiersView(APIView):
    def get(self, request):
        occupiers = Occupier.objects.all()
        serializer = OccupierSerializer(occupiers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetOccupierView(APIView):
    def get(self, request, pk):
        try:
            occupier = Occupier.objects.get(pk=pk)
        except Occupier.DoesNotExist:
            return Response({'error': 'No such occupier'}, status=status.HTTP_404_NOT_FOUND)  # Use appropriate status code

        serializer = OccupierSerializer(occupier)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateOccupierView(APIView):
    def put(self, request, pk):
        try:
            occupier = Occupier.objects.get(pk=pk)
        except Occupier.DoesNotExist:
            return Response({'error': 'Occupier not found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = OccupierUpdateSerializer(occupier, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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