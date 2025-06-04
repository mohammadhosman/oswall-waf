from django.db import models
from django.contrib.auth.models import User

#ProtectedSite model will be a table in the database
#to store information about protected sites
class ProtectedSite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='protected_sites')
    site_name = models.CharField(max_length=255) #I'm thinking 255 characters is too long. Might change this later
    site_url = models.URLField(max_length=500) #URL. Again, thinking 500 characters is too long. Might change later
    created_at = models.DateTimeField(auto_now_add=True) #Automatically set the date and time when the site is created
    
    
# Create your models here.

'''
This is the UserProfile model. This will store information
about a user profile. Originally, a Django model stores
a username, password, and email. However, I want
to store additional information so I had to create
my own UserProfile model.
'''
class UserProfile(models.Mode):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"