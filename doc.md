## E-Commerce API Documentation - GDG Mini Task
``` bash
Base URL: http://localhost:5000

```

This API provides a complete flow for managing products, a persistent shopping cart system, and order fulfillment with automated inventory reduction.

 ## 1. Product Management

Handles the catalog of items available for purchase.

 ### **Create Product**

**Method:** `POST`

**URL:** `/products`

**Body Skeleton:**
```json
{
  "name": "string",
  "description": "string",
  "price": number,
  "category": "string",
  "stock": number,
  "imageurl": "string"
}
```

**Test Example:**
```json

{
  "name": "pc_bag", 
  "description": "Elegant leather high quality bag",
  "price": 120, 
  "category": "Accessories",
  "stock": 100, 
  "imageurl": "http://img.com/pc_bag.jpg" 
}

```
.h