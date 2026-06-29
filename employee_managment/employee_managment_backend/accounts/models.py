from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):

    ROLE_CHOICES = [
        ("Admin", "Admin"),
        ("Employee", "Employee"),
    ]

    employee_id = models.CharField(max_length=20, unique=True)
    phone = models.CharField(max_length=15)
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="Employee",
    )

    def __str__(self):
        return f"{self.employee_id} - {self.username}"