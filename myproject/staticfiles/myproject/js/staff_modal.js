// staff_modal.js
function showBio(name, designation, qualification, joining_date, dob, blood_group, id_no, aadhar, pan, email, mobile, emergency_contact, address, insurance_policy_no, insurance_expiry, basic_salary, hra, conveyance, spl_allowance) {
    document.getElementById('staffName').innerText = name;
    document.getElementById('staffDesignation').innerText = designation;
    document.getElementById('staffQualification').innerText = qualification;
    document.getElementById('staffJoiningDate').innerText = joining_date;
    document.getElementById('staffDOB').innerText = dob;
    document.getElementById('staffBloodGroup').innerText = blood_group;
    document.getElementById('staffIdNo').innerText = id_no;
    document.getElementById('staffAadhar').innerText = aadhar;
    document.getElementById('staffPAN').innerText = pan;
    document.getElementById('staffEmail').innerText = email;
    document.getElementById('staffMobile').innerText = mobile;
    document.getElementById('staffEmergencyContact').innerText = emergency_contact;
    document.getElementById('staffAddress').innerText = address;
    document.getElementById('staffInsurancePolicyNo').innerText = insurance_policy_no;
    document.getElementById('staffInsuranceExpiry').innerText = insurance_expiry;
    document.getElementById('staffBasicSalary').innerText = basic_salary;
    document.getElementById('staffHRA').innerText = hra;
    document.getElementById('staffConveyance').innerText = conveyance;
    document.getElementById('staffSplAllowance').innerText = spl_allowance;

    // Display the modal
    document.getElementById('staffModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('staffModal').style.display = 'none';
}
