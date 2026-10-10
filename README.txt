GUJARAT CAREER HUB — STARTER WEBSITE
====================================

FILES
- index.html       Home page
- jobs.html        Job updates page
- quiz.html        Daily MCQ quiz page
- materials.html   Study materials page
- admin.html       Add/manage jobs, quiz questions and materials
- css/style.css    Responsive desktop + mobile design
- js/app.js        Page rendering, search, quiz scoring and local storage
- js/admin.js      Admin forms and local content management

HOW TO OPEN (NO TERMINAL)
1. Download and unzip Gujarat_Career_Hub.zip on your computer.
2. Open the extracted folder.
3. Double-click index.html to view the site in your browser.
4. Open admin.html to add job updates, quiz questions and study materials.
5. Refresh the relevant page to see the new content.

IMPORTANT LIMITATION
This starter project uses browser localStorage. Content is saved only in the same browser profile on the same computer. It does NOT publish your updates to every visitor, sync across devices, or provide secure admin authentication.
For a real public website where visitors all see your new updates, connect a shared backend/database such as Firebase or Supabase and deploy the website to a hosting service. Do not store private credentials in frontend HTML/JavaScript.

SAMPLE CONTENT
Cards labelled Sample / Demo are placeholders, not verified live recruitment notifications. Replace them with official verified job information before publishing.

SECURITY
The Admin Panel is a demo and has no password protection. Do not publish this version as a production admin system.


ADMIN LOGIN (DEMO ONLY)
=======================
Admin ID: admin
Password: Gch@2026

You can change ADMIN_ID and ADMIN_PASSWORD near the top of js/admin.js.
This is only a browser-side demo gate. Anyone with access to the website source can inspect the credentials or bypass the check. It does NOT provide real security and must not be used as production authentication on a public website.
For a secure public admin panel, implement server-side authentication (for example Firebase Authentication) and database security rules.
