from django.contrib.auth.models import User
from django.db import models

# Ensure email is unique in the User model
User._meta.get_field('email')._unique = True  

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} works at {self.company}"
