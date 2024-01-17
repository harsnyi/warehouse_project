from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from ..models import Occupier
from datetime import date
from json.decoder import JSONDecodeError

from ..serializer.occupier_serializer import (
    OccupierCreateSerializer,
    OccupierSerializer,
    OccupierUpdateSerializer,
)

class AddNewOccupierView(APIView):
    def post(self, request):
        serializer = OccupierCreateSerializer(data=request.data)

        if serializer.is_valid():
            refresh_time = date(date.today().year,date.today().month,serializer.validated_data.get('turning_day'))
            serializer.validated_data['refreshed'] = refresh_time
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        error_response = {
            'message': 'Validation failed',
            'errors': serializer.errors
        }
        return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

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
            return Response({'error': 'No such occupier'}, status=status.HTTP_404_NOT_FOUND)

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

class UpdateOccupierDebtView(APIView):
    def put(self, request, pk):
        try:
            occupier = Occupier.objects.get(pk=pk)
        except Occupier.DoesNotExist:
            return Response({'error': 'Occupier not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            data = JSONParser().parse(request)
            booked_value = int(data.get('booked'))
            
            if booked_value is not None:
                occupier.debt -= booked_value
                occupier.save()

                serializer = OccupierSerializer(occupier)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'error': 'Key "booked" not found in JSON data'}, status=status.HTTP_400_BAD_REQUEST)

        except JSONDecodeError:
            return Response({'error': 'Invalid JSON data'}, status=status.HTTP_400_BAD_REQUEST)
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

