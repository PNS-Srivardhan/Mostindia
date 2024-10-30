# myproject/urls.py
from django.contrib import admin
from django.urls import path, include
from myApp import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myApp.urls',namespace='myApp')),  # Ensure the namespace matches

]
