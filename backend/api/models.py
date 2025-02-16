from django.db import models
from django.contrib.auth.models import User

# Ensure email is unique in the User model
User._meta.get_field('email')._unique = True  

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} works at {self.company}"

class InputField(models.Model):
    INPUT_TYPE_CHOICES = [
        ('text', 'Text'),
        ('telephone', 'Telephone'),
        ('radio', 'Radio'),
        ('checkbox', 'Checkbox'),
        ('number', 'Number'),
        ('email', 'Email'),
        ('date', 'Date'),
        ('file', 'File'),
    ]

    label = models.CharField(max_length=255)
    placeholder = models.CharField(max_length=255, blank=True)
    input_type = models.CharField(max_length=50, choices=INPUT_TYPE_CHOICES)
    is_required = models.BooleanField(default=False)
    max_characters = models.IntegerField(null=True, blank=True)
    min_characters = models.IntegerField(null=True, blank=True)
    file = models.FileField(upload_to='uploads/', null=True, blank=True)  # For file uploads

    def __str__(self):
        return self.label
class ZakatHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    liquidites = models.FloatField()
    stocks = models.FloatField()
    investissements = models.FloatField()
    bien_location = models.FloatField()
    creances_clients = models.FloatField()
    bien_usage_interne = models.FloatField()
    fonds_non_dispo = models.FloatField()
    stocks_invendable = models.FloatField()
    zakat_amount = models.FloatField()
    created_at = models.DateTimeField()

    def __str__(self):
        return f"ZakatHistory({self.user.username} - {self.created_at})"