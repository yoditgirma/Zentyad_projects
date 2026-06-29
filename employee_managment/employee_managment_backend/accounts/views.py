from django.shortcuts import render
from  django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import User
# Create your views here.

@csrf_exempt
def register_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            username = data.get("username")
            first_name = data.get("first_name")
            last_name = data.get("last_name")
            email = data.get("email")
            password = data.get("password")
            confirm_password = data.get("confirm_password")
            phone = data.get("phone")
            role = data.get("role", "Employee")
            employee_id = data.get("employee_id")

            #  Basic validation
            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists"}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email already exists"}, status=400)
            
            if not employee_id:
                return JsonResponse(
        {"error": "Employee ID is required"},
        status=400
    )
            
            if password != confirm_password:
                return JsonResponse(
        {"error": "Passwords do not match"},
        status=400
    )

            if User.objects.filter(employee_id=employee_id).exists():
                return JsonResponse(
        {"error": "Employee ID already exists"},
        status=400
    )

            # Create user safely
            user = User.objects.create_user(
    username=username,
    first_name=first_name,
    last_name=last_name,
    email=email,
    password=password,
    employee_id=employee_id,
    phone=phone,
    role=role,
)

            # extra fields
            user.phone = phone
            user.role = role
            user.employee_id = employee_id
            user.save()

            return JsonResponse({"message": "User registered successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST method allowed"}, status=405)