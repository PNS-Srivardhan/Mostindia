<h1>Staff Management System</h1>

<p><strong>Project Overview:</strong> <br>
The <strong>Staff Management System</strong> is a web-based application designed to streamline employee record-keeping, attendance tracking, and payroll management. It helps businesses efficiently manage staff details, monitor attendance, and generate salary reports.
</p>

<h2>Features</h2>
<ul>
  <li><strong>Employee Management</strong> – Add, update, and remove employees with details like name, ID, and contact information.</li>
  <li><strong>Attendance Tracking</strong> – Log employee check-in and check-out times using an RFID-based system.</li>
  <li><strong>Payroll Management</strong> – Automatically calculate salaries based on attendance and working hours.</li>
  <li><strong>Role-Based Access</strong> – Admins can manage employees, while staff can view their own records.</li>
  <li><strong>Data Storage</strong> – Uses <strong>SQLite3</strong> for efficient data management.</li>
</ul>

<h2>Technology Stack</h2>
<ul>
  <li><strong>Frontend:</strong> HTML, CSS</li>
  <li><strong>Backend:</strong> Django (Python)</li>
  <li><strong>Database:</strong> SQLite3</li>
</ul>

<h2>Installation Guide</h2>
<ol>
  <li><strong>Clone the Repository:</strong> 
    <pre><code>git clone https://github.com/PNSSVARDHAN/Staff-Management-System.git
cd Staff-Management-System</code></pre>
  </li>
  <li><strong>Set Up a Virtual Environment (Optional but Recommended):</strong> 
    <pre><code>python -m venv env  
source env/bin/activate  # On Windows: env\Scripts\activate</code></pre>
  </li>
  <li><strong>Install Dependencies:</strong> 
    <pre><code>pip install -r requirements.txt</code></pre>
  </li>
  <li><strong>Run Migrations:</strong> 
    <pre><code>python manage.py migrate</code></pre>
  </li>
  <li><strong>Start the Development Server:</strong> 
    <pre><code>python manage.py runserver</code></pre>
    <pre><code>username and password --- abc & abc </code></pre>
  </li>
</ol>

<p>Access the system at <a href="http://127.0.0.1:8000/" target="_blank">http://127.0.0.1:8000/</a></p>

<h2>Usage Instructions</h2>
<ul>
  <li><strong>Admin Dashboard:</strong> Manage employees, view attendance, and process payroll.</li>
  <li><strong>Employee Panel:</strong> View attendance history and profile details.</li>
</ul>

<h2>Future Enhancements</h2>
<ul>
  <li>Integration with Biometrics or Fingerprint Scanners</li>
  <li>Automated Leave Management System</li>
  <li>Detailed Payroll Reports and Analytics</li>
</ul>

<h2>Contributing</h2>
<p>If you’d like to contribute, feel free to fork the repository and submit a pull request.</p>

<h2>License</h2>
<p>This project is open-source under the <strong>MIT License</strong>.</p>
