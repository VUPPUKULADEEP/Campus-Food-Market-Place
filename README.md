# Campus-Food-Ordering-System

This is a web-based project for the colleges which have cafetaria's. My project provides a interface to order the Food Items to reduce the queue lines and peak orders at only one time.
For now this project doesnt have a payment gateway.
futher i will integrate it.


### Table of Contents
-[About](#about)
-[Tech stack](#tech stack)
-[Getting Started](#gettingstarted)
-[Installing](#installing)
-[Usage](#usage)
-[Contributing](#contributing)

## About

The website consists of two types of users:
- Users
- Admins

Users are normal users.
Admins are restaurant/cafetaria owners.

Users can see the items and add to cart.
Users can order whole cart at a time.

Admins recieve the order details admins know the user details which are keeping in order details.
Admins can add items, edit item details also can delete it.

if order cancels by user the quantity will be restore as previous quantity.

## Tech stack
The Campus-Food-Ordering-System was developing on softwares:
- Fastapi
- React (vite)
- Mysql
- Bootstrap

Fastapi used for the Backend services which can handles the rest apis.

React is for the Frontend to create interacting web pages

mysql is for store the data

Bootstrap framework to style the elements in frontend.

## Getting Started

For running this website in your local machine.
you must have these softwares in your system.
- Python (v 3.12.2)
- npm (v 10.8.2)
- node (v 20.19.6)
- mysql(v 8.0.45)

*use nvm to manage the node,npm version*

## Installation
**clone the project**
##### if you want to make any changes make sure fork it

**for frontend**
```bash
cd frontend
```
```bash 
# to install npm packages
npm install
```
```bash 
#for development server
npm run dev
```


**for backend**

- venv is a virtual environment in the backend folder
- use requirements.txt to mention your packages
- use pip freeze > requirements.txt to update when ever needed


**for starting backend**
```bash
# to install libraries
pip install -r requirements.txt
```
```bash 
# start backend
uvicorn app.main:app --reload
```

