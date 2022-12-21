**Pre-requisites:**  
  
Following are the pre-requisite applications that are required:  
  
**Visual Studio Code:** https://code.visualstudio.com/

  

**Node.js/NPM:** [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

  

**MySQL/Workbench:**

  

-   For Mac:

  

MySQL - https://dev.mysql.com/doc/refman/5.7/en/macos-installation-pkg.html

Workbench - [https://dev.mysql.com/doc/workbench/en/wb-installing-mac.html](https://dev.mysql.com/doc/workbench/en/wb-installing-mac.html)

  

-   For Windows:

MySQL - [https://dev.mysql.com/doc/refman/5.7/en/windows-installation.html](https://dev.mysql.com/doc/refman/5.7/en/windows-installation.html)

Workbench - [https://dev.mysql.com/doc/workbench/en/wb-installing-windows.html](https://dev.mysql.com/doc/workbench/en/wb-installing-windows.html)

  

  

**Setup Instructions:**  

**Frontend and Backend Repo Setup:**

-   Following are the two repos for the backend and the frontend.

Backend: [https://github.com/anujtuteja1993/CapstoneBackend.git](https://github.com/anujtuteja1993/CapstoneBackend.git)

Frontend: [https://github.com/anujtuteja1993/CapstoneFrontend.git](https://github.com/anujtuteja1993/CapstoneFrontend.git)

Either clone the repos or download them as zip.

-   Change the directory to the git repos using the terminal and enter the following command for both the repos:
npm install

-   For backend, create a .env and add the following to it if it doesn’t exist:

PORT=8000

GAMES_API_ENDPOINT="https://api.rawg.io/api/"

GAMES_API_KEY="f2b65746f0874d129d3550dd301e2b74"

ACCESS_TOKEN_SECRET = jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225

REFRESH_TOKEN_SECRET = 825y8i3hnfjmsbv7gwajbl7fobqrjfvbs7gbfj2q3bgh8f42

DB_PASSWORD=admin

DB_NAME=capstone_database

DB_USER=root

DB_HOST=localhost

DB_PORT=3306

**MySQL Setup:**
-   Open MySQL Workbench and connect to localhost.
-   To import the data, use the ‘capstone_database.sql’ in the backend repo folder.
-   Click on Server -> Data Import:
-   Then select ‘Import from Self-Contained File’ and browse to the ‘capstone_database.sql’ file and select it.
-   For the Default Target Schema, click on the button ‘..New’ and set the name as ‘capstone_database’.

***You can give it any name but remember to change DB_NAME in the .env file set up in the previous steps.**

-   Also, change the DB_USER and DB_PASSWORD to your MySQL Server root Username and Password.
**Launching the App:**
-   To launch the app, open two separate terminal windows and change the directory to CapstoneFrontend and CapstoneBackend folders.
-   Type ‘npm start’ in the backend terminal, followed by ‘npm start’ in the frontend terminal and a browser window should automatically open and you should see the website. If it doesn’t automatically open the browser window, type in [http://localhost:3000/](http://localhost:3000/) in the browser’s address bar.# Welcome to StackEdit!
