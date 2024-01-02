from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import OccupierSerializer


class Hello_view(APIView):
    def get(self, request):
        data = {'message': 'Hello World !'}
        return Response(data)

class Add_new_occupier_view(APIView):
    def post(self, request):
        serializer = OccupierSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        error_response = {
            'message': 'Validation failed',
            'errors': serializer.errors
        }
        return Response(error_response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)