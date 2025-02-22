"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView,UserDeleteView,UserUpdateView,AdminRegisterView,AdminLoginView,CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("apif/user/register/", CreateUserView.as_view(), name="register"),
    path("apif/token/", CustomTokenObtainPairView.as_view(), name="get_token"),  # Use the custom view
    path("apif/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("apif-auth/", include("rest_framework.urls")),
    path("apif/", include("api.urls")), 
    path('apif/user/update/', UserUpdateView.as_view(), name='user-update'),
    path('apif/user/delete/', UserDeleteView.as_view(), name='user-delete'), 
    path('apif/admin/register/', AdminRegisterView.as_view(), name='admin-register'),
    path('apif/admin/login/', AdminLoginView.as_view(), name='admin-login'),  # Admin login
     
]

