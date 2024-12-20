# myApp/urls.py
from django.urls import path,re_path
from . import views
from django.conf import settings as django_settings
from django.conf.urls.static import static
from .views import staff_detail, attendance_success, login_view
from .views import edit_staff , manage_staff_view, add_staff, edit_staff, delete_staff
from .views import attendance_view
from django.urls import path
from .views import chart_view, chart_data
from .views import chart_view, work_mode_chart_data, individual_work_mode_data, staff_workmode_data
from myApp import views
from .views import generate_pay_slip, pay_slip, view_pay_slip
from django.urls import path
from django.contrib.auth import views as auth_views
from .views import home, daily_attendance, staff_profiles, view_bio, staff_success, attendance, view_attendance, attendance_staff_detail, attendance_menu, weekly_attendance, monthly_attendance, error, edit_earnings, settings, master_view, staff_attendance_view, add_user, leave_limit, send_pay_slip   
app_name = 'myApp'  # This app_name should match in your templates

from . import views 

urlpatterns = [
    
    #______________________________________________LOGIN___________________________________________________________

    path('', views.login_view, name='login'),
    path('home/', views.home, name='home'),
    path('master/', views.master_view, name='master'),
    path('add_user/', views.add_user, name='add_user'),

    #________________________________HOME________________________________________________________________
    path('daily-attendance/', views.daily_attendance, name='daily_attendance'), 
    path('attendance-chart/', chart_view, name='attendance-chart'),
    path('attendance-chart-data/', chart_data, name='attendance-chart-data'),
    path('work-mode-chart-data/', work_mode_chart_data, name='work-mode-chart-data'),
    path('attendance-chart-data/<str:work_mode>/', individual_work_mode_data, name='individual-work-mode-data'),
    path('staff-workmode-data/', views.staff_workmode_data, name='staff_workmode_data'),
    path('staff-workmode-data-week/', views.staff_workmode_data_week, name='staff_workmode_data_week'),
    path('update-backup/', views.update_backup, name='update_backup'),
    path('update-backup/', views.update_backup, name='update_backup'),
    path('run-backup/', views.run_backup_script, name='run-backup'),
    path('run-script/', views.run_script, name='run_script'),

      
    #______________________________________________MANAGE_STAFF_______________________________________________________
    path('manage_staff/', views.manage_staff_view, name='manage_staff'),
    path('staff/<int:staff_id>/', staff_detail, name='staff_detail'),
    path('manage_staff/', views.manage_staff, name='manage_staff'),  # Main view for managing staff
    path('add/', views.add_staff, name='add_staff'),    # View for adding new staff
    path('edit/<str:id_no>/', views.edit_staff, name='edit_staff'),  # View for editing staff
    path('delete_staff/', views.delete_staff, name='delete_staff'),




    #______________________________________________STAFF_PROFILES_______________________________________________________
    path('staff_profiles/', views.staff_profiles, name='staff_profiles'),
    path('staff_profiles/view/<str:id_no>/', views.view_bio, name='view_bio'),
    path('bio/<int:id_no>/', views.view_bio, name='view_bio'),
    path('staff/sucess/', views.staff_success, name='staff_success'),
    path('leave_limit/', views.leave_limit, name='leave_limit'),
    # path('', views.home, name='home'),  # Duplicate path removed

    #______________________________________________ATTENDANCE___________________________________________________________
    
    path('attendance/', views.attendance, name='attendance'),
    path('view_attendance/', views.view_attendance, name='view_attendance'),
    path('attendance/staff/<int:staff_id>/', views.attendance_staff_detail, name='attendance_staff_detail'),
    path('attendance_view/', views.attendance_view, name='attendance_view'),  # Ensure this matches
    path('attendance/success/', views.attendance_success, name='attendance_success'),
    path('attendance_menu/', views.attendance_menu, name='attendance_menu'),
    path('weekly_attendance/', views.weekly_attendance, name='weekly_attendance'),
    path('month/', views.monthly_attendance, name='monthly_attendance'),
    path('error/', views.error, name='error'),
    path('staff_attendance/', views.staff_attendance_view, name='staff_attendance_view'),



    #______________________________________________PAY_SLIP___________________________________________________________

    path('pay_slip/', views.pay_slip, name='pay_slip'),
    re_path(r'^generate_pay_slip/(?P<id_no>.+)/$', views.generate_pay_slip, name='generate_pay_slip'),
    re_path(r'^view_pay_slip/(?P<id_no>.+)/$', views.view_pay_slip, name='view_pay_slip'),
    re_path(r'^edit_earnings/(?P<id_no>.+)/$', views.edit_earnings, name='edit_earnings'),
    path('staff_detail/<int:staff_id>/', views.staff_detail, name='staff_detail'),
    re_path(r'^send_pay_slip/(?P<id_no>.+)/$', views.send_pay_slip, name='send_pay_slip'),
    
    
    #______________________________________________settings___________________________________________________________
    path('settings/', views.settings, name='settings'),
] + static(django_settings.MEDIA_URL, document_root=django_settings.MEDIA_ROOT)
