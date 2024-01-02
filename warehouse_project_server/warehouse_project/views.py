from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


class Hello_view(APIView):
    def get(self, request):
        data = {'message': 'Hello World !'}
        return Response(data)
