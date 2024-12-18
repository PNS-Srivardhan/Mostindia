# staff/forms.py
from django import forms
from .models import Staff
from .models import Attendance

class StaffForm(forms.ModelForm):
    class Meta:
        model = Staff
        fields = ['name', 'designation', 'qualification', 'joining_date', 
                  'dob', 'blood_group', 'id_no', 'aadhar', 'pan', 
                  'email', 'mobile', 'emergency_contact', 'address', 
                  'insurance_policy_no', 'insurance_expiry', 
                  'basic_salary', 'hra', 'conveyance', 'spl_allowance']
    basic_salary = forms.DecimalField(max_digits=10, decimal_places=2)
    hra = forms.DecimalField(max_digits=10, decimal_places=2)
    conveyance = forms.DecimalField(max_digits=10, decimal_places=2)
    spl_allowance = forms.DecimalField(max_digits=10, decimal_places=2)

    def clean_basic_salary(self):
        data = self.cleaned_data['basic_salary']
        if data < 0:
            raise forms.ValidationError("Basic salary must be a positive number.")
        return data

class AttendanceForm(forms.ModelForm):
    staff = forms.ModelChoiceField(queryset=Staff.objects.all(), label="Staff Member")
    attendance_type = forms.ChoiceField(choices=[
        ('Onsite', 'Onsite'),
        ('Offsite', 'Offsite'),
        ('WFH', 'Work from Home'),
        ('Leave', 'Leave'),
        ('Others', 'Others')
    ])

from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(max_length=150, label="Username")
    password = forms.CharField(widget=forms.PasswordInput, label="Password")


from django import forms

from .models import Staff



class StaffForm(forms.ModelForm):

    class Meta:

        model = Staff

        fields = [

            'name', 'designation', 'qualification', 'joining_date', 'dob', 'blood_group', 'aadhar', 'pan', 'email', 

            'mobile', 'emergency_contact', 'address', 'insurance_policy_no', 'insurance_expiry', 'photo', 'basic_salary', 

            'hra', 'conveyance', 'spl_allowance', 'totalleaves'

        ]

from django import forms

class BackupForm(forms.Form):
    email = forms.EmailField(label='Email ID', required=True)
    
    db_path = forms.CharField(
        label='Database File Path', 
        required=False, 
        initial=r'C:\Users\ploke\OneDrive\Documents\Pictures\SMS\mos-main\myproject\db.sqlite3',
        widget=forms.HiddenInput()  # Hides the field from the front end
    )
    
    backup_path = forms.CharField(
        label='Backup Directory Path', 
        required=False, 
        initial=r'C:\Users\ploke\OneDrive\Documents\Pictures\SMS\mos-main\myproject\backups',
        widget=forms.HiddenInput()  # Hides the field from the front end
    )
    
    max_backups = forms.IntegerField(
        label='Maximum Backups', 
        required=False, 
        initial=5,  # Automatically set to 5
        widget=forms.HiddenInput()  # Hides the field from the front end
    )
