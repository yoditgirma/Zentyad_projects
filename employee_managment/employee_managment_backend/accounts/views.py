# from django.shortcuts import render
from  django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.db.models import Count, Q
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



@csrf_exempt
def login_user(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)
    
    try:
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return JsonResponse(
                {"error": "Email and password are required"},
                status=400
            )
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid credentials"},
                status=401
            )
        
        from django.contrib.auth import authenticate, login
        user = authenticate(request, username=user.username, password=password)
        
        if user is not None:
            login(request, user)
            
            return JsonResponse({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "employee_id": user.employee_id,
                    "phone": user.phone,
                    "role": user.role,
                }
            }, status=200)
        else:
            return JsonResponse(
                {"error": "Invalid credentials"},
                status=401
            )
            
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@login_required
def admin_dashboard_stats(request):
    """Get statistics for admin dashboard"""
    if request.user.role != 'Admin':
        return JsonResponse({"error": "Unauthorized - Admin access required"}, status=403)
    
    try:
        total_employees = User.objects.filter(role='Employee').count()
        total_admins = User.objects.filter(role='Admin').count()
        total_users = User.objects.count()
        
        recent_employees = User.objects.filter(role='Employee').order_by('-date_joined')[:10]
        
        recent_employees_data = []
        for emp in recent_employees:
            recent_employees_data.append({
                'id': emp.id,
                'username': emp.username,
                'first_name': emp.first_name,
                'last_name': emp.last_name,
                'email': emp.email,
                'employee_id': emp.employee_id,
                'phone': emp.phone,
                'role': emp.role,
                'date_joined': emp.date_joined.strftime('%Y-%m-%d'),
                'is_active': emp.is_active,
            })
        
        return JsonResponse({
            'success': True,
            'total_employees': total_employees,
            'total_admins': total_admins,
            'total_users': total_users,
            'recent_employees': recent_employees_data,
        }, status=200)
        
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@login_required
def employee_dashboard_stats(request):
    """Get statistics for employee dashboard"""
    if request.user.role != 'Employee':
        return JsonResponse({"error": "Unauthorized - Employee access required"}, status=403)
    
    try:
        user = request.user
        
        total_employees = User.objects.filter(role='Employee').count()
        total_admins = User.objects.filter(role='Admin').count()
        
        return JsonResponse({
            'success': True,
            'user': {
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'employee_id': user.employee_id,
                'phone': user.phone,
                'role': user.role,
                'date_joined': user.date_joined.strftime('%Y-%m-%d'),
            },
            'company_stats': {
                'total_employees': total_employees,
                'total_admins': total_admins,
            }
        }, status=200)
        
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@login_required
def get_all_employees(request):
    """Get all employees with search (Admin only)"""
    if request.user.role != 'Admin':
        return JsonResponse({"error": "Unauthorized - Admin access required"}, status=403)
    
    try:
        search = request.GET.get('search', '')
        
        employees = User.objects.filter(role='Employee')
        
        if search:
            employees = employees.filter(
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(email__icontains=search) |
                Q(employee_id__icontains=search)
            )
        
        employees = employees.order_by('-date_joined')
        
        employees_data = []
        for emp in employees:
            employees_data.append({
                'id': emp.id,
                'username': emp.username,
                'first_name': emp.first_name,
                'last_name': emp.last_name,
                'email': emp.email,
                'employee_id': emp.employee_id,
                'phone': emp.phone,
                'role': emp.role,
                'date_joined': emp.date_joined.strftime('%Y-%m-%d'),
                'is_active': emp.is_active,
            })
        
        return JsonResponse({
            'success': True,
            'employees': employees_data,
            'total': len(employees_data)
        }, status=200)
        
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)