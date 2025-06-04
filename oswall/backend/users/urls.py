from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns =[
    path('users/', views.users, name='users'),
    path('', views.home, name='home'),
    path('register/', views.register, name='register'), #User registration endpoint
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Login endpoint
    path('profile/', views.profile, name='profile'), #User profile endpoint
    path('contact/', views.contact, name='contact'), #Contact form endpoint
]