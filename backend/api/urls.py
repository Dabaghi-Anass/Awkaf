from django.urls import path
from .views import InputFieldListCreate, InputFieldUpdateDelete

urlpatterns = [
    # InputField URLs
    path("inputfields/", InputFieldListCreate.as_view(), name="inputfield-list-create"),
    path("inputfields/<int:pk>/", InputFieldUpdateDelete.as_view(), name="inputfield-update-delete"),
]