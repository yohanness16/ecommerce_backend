# chebude store Management System

 express.js web application for managing products, shopping carts, and orders. Built with Express, MongoDB, and EJS.

## Features
* Product Catalog: View, add, and manage store products.
* Session-Based Cart: Private shopping carts for users using express-session.
* Order Management: Process checkout and view order history.
* Structured Logging: Clean HTTP logs using Pino.
* Responsive UI: Clean layouts using EJS partials and custom CSS.

## Prerequisites
Before you begin, ensure you have the following installed:
* Node.js (v16 or higher)
* MongoDB Atlas account or local MongoDB

## Installation

1. Clone the project:
```bash
   git clone https://github.com/yohanness16/ecommerce_backend.git
   cd gdg_mini_project

 ```

 ## **Install dependencies:**

``` bash

    npm install
```

## **Environment Configuration**

Create a file named .env in the root directory and add the following variables:

``` bash

PORT=5000
MONGO_URI=your_mongodb_connection_string
```


## Running the App


To start the server with auto-restart and formatted logs:

``` bash
npm run dev
```


The application will be available at: http://localhost:5000/pages/products

## documentation

open the file `doc.md`