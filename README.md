# MOSTINDIA-STAFF-MANAGEMENT-SYSTEM
 
developed using django framework 



----------------------------------------------------CMD TO RUN THE PROGRAM------------------------------------------------------------------------

** cd path to myproject folder 
** create a virtual enviroment
** python manage.py runserver


---------------------------------------------------STARTUP SCRIPT------------------------------------------------------------------------------------

Create a file name startserver.bat

startserver.bat
  ||
  ||
  ||
  @echo off
  cd C:\Users\ploke\OneDrive\Documents\Pictures\SMS\mos-main\myproject   # replace with path with your "myproject" folder 
  call C:\Users\ploke\OneDrive\Documents\Pictures\SMS\mos-main\venv\Scripts\activate.bat   # replace with path with your "activate.bat"  file
  python manage.py runserver


Create a file name startserver.vbs

startserver.vbs
  ||
  ||
  Set WshShell = CreateObject("WScript.Shell")
  WshShell.Run """C:\Users\ploke\OneDrive\Documents\Pictures\SMS\mos-main\start_server.bat""", 0, False  # replace the path with your "start_server.bat" file


STEP 1 : Windows+r
STEP 2 : shell:startup
STEP 3 : Place the startserver.vbs in the startupfolder 


server will start running when we start the system


----------------------------------------------------------------------END---------------------------------------------------------------------------


