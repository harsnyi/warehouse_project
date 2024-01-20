 warehouse_project

warehouse_project is a fullstack web application for SMART-STORE KFT. located in 6600 Szentes, 6600 Szentes, Rákóczi Ferenc utca 132. The application features a 
 - client-side written in React
 - server-side written in Python Django.

The main purpouse of the application is to manage the rented and available storages and link them with occupiers and therefore calculate the debts of the occupiers. 

With the application you can:

- Store and manage your Occupiers
- Manage your rented and available Storages
- Scan for transactions related to rents

## Usage

### Client

First, you have to edit the Config.js file which determines the path where the requests will be sent.

```bash
cd warehouse_project_client
npm install
npm start
```
### Server

For the server, you will need a pip envinroment with the required packages located in the server's root folder, and an env.py file with the following keys:

- API_KEY
- ALLOWED_ORIGIN (for the CORS headers)
- ALLOWED_HOST

```bash
pip install -r requirements.txt
python manage.py runserver
```
