from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User 
        fields = ['username', 'email', 'password', 'name', 'address']

    def create(self, validated_data):
        name = validated_data.pop('name')
        address = validated_data.pop('address', '')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        UserProfile.objects.create(user=user, name=name, address=address)
        return user
    
class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    message = serializers.CharField(max_length=500)