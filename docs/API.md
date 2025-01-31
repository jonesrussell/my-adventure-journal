# Adventure Journal API Documentation

## Overview
The Adventure Journal API allows you to interact with the adventure data, including creating, fetching, updating, and deleting adventures.

## Base URL
```
http://localhost:3000/api/adventures
```

## Endpoints

### 1. Get All Adventures
- **Method:** `GET`
- **Endpoint:** `/api/adventures`
- **Description:** Fetches a list of all adventures.
- **Response:**
  - **200 OK**
    ```json
    [
      {
        "_id": "string",
        "name": "string",
        "location": "string",
        "description": "string"
      }
    ]
    ```

### 2. Create a New Adventure
- **Method:** `POST`
- **Endpoint:** `/api/adventures`
- **Description:** Creates a new adventure.
- **Request Body:**
  ```json
  {
    "name": "string",
    "location": "string",
    "description": "string"
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
      "_id": "string",
      "name": "string",
      "location": "string",
      "description": "string"
    }
    ```

### 3. Get Adventure by ID
- **Method:** `GET`
- **Endpoint:** `/api/adventures/{id}`
- **Description:** Fetches a specific adventure by its ID.
- **Response:**
  - **200 OK**
    ```json
    {
      "_id": "string",
      "name": "string",
      "location": "string",
      "description": "string"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "Adventure not found"
    }
    ```

### 4. Update an Adventure
- **Method:** `PUT`
- **Endpoint:** `/api/adventures/{id}`
- **Description:** Updates an existing adventure.
- **Request Body:**
  ```json
  {
    "name": "string",
    "location": "string",
    "description": "string"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "_id": "string",
      "name": "string",
      "location": "string",
      "description": "string"
    }
    ```

### 5. Delete an Adventure
- **Method:** `DELETE`
- **Endpoint:** `/api/adventures/{id}`
- **Description:** Deletes an adventure by its ID.
- **Response:**
  - **204 No Content**
