from django.urls import path
from .views import (
    register_user, login_user, admin_dashboard_stats,
    employee_dashboard_stats, get_all_employees
)

urlpatterns = [
    # auth end points
    path("register/", register_user, name="register"),
    path("login/", login_user, name="login"),

    # Admin Dashboard endpoints
    path("admin-stats/", admin_dashboard_stats, name="admin_stats"),
    path("employees/", get_all_employees, name="get_employees"),
    
    # Employee Dashboard endpoints
    path("employee-stats/", employee_dashboard_stats, name="employee_stats"),
]