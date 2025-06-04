from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import RegisterSerializer, ContactSerializer

def home(request):
    return HttpResponse("OsWall Backend Home Page")

def users(request):
    return HttpResponse("OsWall Hello World")
# Create your views here.

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Successful user registration"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# This view returns the profile of the authenticated user    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    return Response({
        "username": user.username,
        "email": user.email,
    })

#This view is for submitting a message through the contact form
@api_view(['POST'])
def contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        #Here I can save to database or send an email
        return Response({"message": "Contact form message sent"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)