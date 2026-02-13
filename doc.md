## E-Commerce API Documentation - GDG Mini Task
``` bash
Base URL: http://localhost:5000

```

This API provides a complete flow for managing products, a persistent shopping cart system, and order fulfillment with automated inventory reduction.

 ## 1. Product 

Handles the catalog of items available for purchase.

 ### **Create Product**

**Method:** `POST`

**URL:** `http://localhost:5000/products`

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
### **Get All Products**

 **Description:** Retrieves a full list of products.

   **URL:** `http://localhost:5000/products`

   **Method:** `GET`

### **Filter By Category**

Description: Retrieves products belonging to a specific category.

   **URL:**  `http://localhost:5000/products?category=Accessories`

   **Method:** `GET`

### **Update Product**

**Description:** Modifies existing product details (e.g., price or stock updates).

**URL:** `http://localhost:5000products/:id`
    **Method:** `PUT`

**Test Example:**
    
``` json

{ 
  "price": 110, 
  "stock": 15 
}

```

###  2.Cart 

Allows users to manage a temporary shopping basket before placing an order.
### **Create Cart**

**Description:** Creates a new cart session and adds the initial product.

**URL:** `http://localhost:5000/cart/`

**Method:** `POST`

**JSON Skeleton:**
    
``` json

{ 
  "productId": "string",
  "quantity": number
}

```

**Test Example:**
``` json

    { 
      "productId": "698dec7b88bd5e0bfa020cd0",
      "quantity": 2
    }
```

### **Add Item to Existing Cart**

**Description:** Adds more products to a specific cart using the cartId.

**URL:** `http://localhost:5000/cart/:cartId/add`

**Method:** `POST`

**Test Example:**
``` json

    { 
      "productId": "698dec7b88bd5e0bfa020cd0",
      "quantity": 4
    }
```

### **Update Quantity in Cart**

**Description:** Adjusts the number of items for a specific product within a cart.

**URL:** `http://localhost:5000/cart/:cartId/item/:productId`

**Method:** `PUT`

**Test Example Body:**
    
``` json

    { "quantity": 5 }
```

### 3. Order 

Handles the final checkout, stock validation, and order tracking.

### **Create Order**

**Description:** Finalizes the purchase. It validates stock, reduces product inventory, and deletes the cart.

**URL:** `http://localhost:5000/orders/`

**Method:** `POST`

**JSON Skeleton:**
    
``` json 

{
  "cartId": "string",
  "customerInfo": {
    "name": "string",
    "email": "string",
    "address": "string"
  }
}
```

**Test Example:**

``` json

    {
      "cartId": "698dd9f92cf7387a4fb65b09", 
      "customerInfo": {
        "name": "Yohannes",
        "email": "yohannes@example.com",
        "address": "Addis Ababa"
      }
    }
```

### **Get Order By ID**

**Description:** Fetches the details of a specific historical order.

**URL:** `http://localhost:5000/orders/:id`

**Method:** `GET`

### **Update Order Status**

**Description:** Updates the fulfillment status (e.g., pending, completed).

**URL:** `http://localhost:5000/orders/:id/status`

**Method:** `PUT`


**Test Example Body:**
    
``` json

    {
      "status": "completed"
    }
```