GOALSENSE PERFORMANCE DATA - ONE-CLICK EXPORT

WHAT THIS DOES
This tool reads your GoalSense Excel workbook and refreshes:
  data\goalsense-performance-data.json

It does NOT edit the Excel workbook and does NOT connect to Supabase.

ONE-TIME SETUP
1. Copy the scripts folder, update-performance-data.bat and requirements.txt
   into the ROOT of your existing my-app project folder.
2. Make sure your project already has:
   data\goalsense-performance-data.json
3. Double-click update-performance-data.bat.
4. Select your latest GoalSense_Automatic_Match_Workbook_Main.xlsx file.
5. Wait for the success message. The JSON data file will be refreshed.

EACH TIME YOU UPDATE THE WORKBOOK
1. Open the workbook in Excel.
2. Let Excel finish calculating, then save and close the workbook.
3. Double-click update-performance-data.bat in your my-app folder.
4. Select the saved workbook.
5. After the export succeeds, run these commands in Command Prompt from my-app:

   git add data/goalsense-performance-data.json
   git commit -m "Update GoalSense performance data"
   git push origin main

Vercel will deploy the updated data with your normal GitHub deployment.

IMPORTANT
- The exporter reads the Match Analysis sheet.
- It recognises completed records from a valid Final Score, matching the
  workbook's COMPLETE status formula.
- It reads the formula results for Best Market, Overall Score and Final Decision.
  For accurate results, open the workbook in Excel, allow calculations to finish,
  and save it before exporting.
- If calculated values are missing, the script stops and leaves the existing
  website JSON file unchanged.
- The original Excel workbook is never saved or modified by this script.
- No Supabase settings, tables, policies, authentication or API routes are touched.

COMMAND-LINE OPTION
You can also run:
  py -3 scripts\export_performance.py "C:\path\to\GoalSense_Automatic_Match_Workbook_Main.xlsx"

The first run may install openpyxl. Python 3 and an internet connection are
needed for that one-time dependency installation.
