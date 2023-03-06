# HOTEL API

# Overview
This API is designed to manage hotel operations by providing services for managing users, rooms, and room types.

## The API has three main components:

- Users: Allows for creating, updating, getting a user, getting all users, loging in a user, logging out a user and deleting users who can access the API.
- Rooms: Allows for creating, updating, getting a room, filtering all rooms and deleting rooms in the hotel.
- Room Types: Allows for creating, getting a room type, getting all room types, and deleting different types of rooms available in the hotel.


# How To Use
- Clone the repo 
- cd into the directory such that you are in `hotel api`.
- Create a new MongoDB database and copy your DATABASE_URI
- Create a .env file at the root of the folder and include your DATABASE_URI and a secret_key to generate tokens in the file in the format below
```
DATABASE_URI = {The DATABASE_URI you created}
SECRET = {Your secret keyword}

```
- To run the solution, make sure you have [nodejs](https://nodejs.org/) installed.
- Use the following command in your terminal to initialize the applicationa and to install the necessary dependencies.
```
npm install
nodemon src/app
```

# Testing Endpoints
- You need to have Postman or any other similar app or extension installed to test this API.
- You can make a request from you local computer or through the live endpoint
- If you're using the live endpoint then your {base url} is
```
https://jesshotels.onrender.com
```
- If you're using your cloned app then your {base url} is
```
https://localhost:5000
```

# API Documentation
## Create User
- endpoint: {base url}/api/v1/users/signup
- method: post

Sample Request:
```
{
  "fullName": "Adaobi Aginam",
  "email": "nzubechukwu4151@gmail.com",
  "password": "nzubechukwu",
  "age": "20",
  "nationality": "Nigeria",
  "role": "admin"
}
```
Sample Response:
```
{
  "message": "User created successfully",
  "success": true,
  "data": {
    "createdUser": {
      "fullName": "Adaobi Aginam",
      "email": "nzubechukwu4151@gmail.com",
      "password": "$2b$10$tjuJXnWI1hi9k9ocL.s5uuDA8frqNXsNvICopAzSxnsi7cxMNFVP6",
      "age": 20,
      "nationality": "Nigeria",
      "role": "admin",
      "_id": "63fd137ddb27a40e34543b39",
      "createdAt": "2023-02-27T20:33:01.013Z",
      "updatedAt": "2023-02-27T20:33:01.013Z",
      "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkFkYW9iaSBBZ2luYW0iLCJlbWFpbCI6Im56dWJlY2h1a3d1NDE1MUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzc1Mjk5ODEsImV4cCI6MTY3Nzc4OTE4MX0.UgmuhwPf87H4ziFPISPIYSQF_kTWHw4Z0yT1hM4vWtM"
  }
}
```
## Get all Users
- endpoint: {base url}/api/v1/users
- method: get

Sample Response:
```
{
  "success": true,
  "message": "User fetched successfully",
  "data": [
    {
      "_id": "63fcc2405e66fef5311aa3ea",
      "fullName": "Adaobi Aginam",
      "email": "nzubechukwu11@gmail.com",
      "password": "$2b$10$hmDmPEUxa86P1srLA0kOTuuStAh.lb1MEkExp279/u.Qkk57v0422",
      "age": 20,
      "nationality": "Nigeria",
      "role": "admin",
      "createdAt": "2023-02-27T14:46:24.175Z",
      "updatedAt": "2023-02-27T14:46:24.175Z"
    },
    {
      "_id": "63fd137ddb27a40e34543b39",
      "fullName": "Nzube Aginam",
      "email": "nzubechukwu4151@gmail.com",
      "password": "$2b$10$tjuJXnWI1hi9k9ocL.s5uuDA8frqNXsNvICopAzSxnsi7cxMNFVP6",
      "age": 20,
      "nationality": "Nigeria",
      "role": "admin",
      "createdAt": "2023-02-27T20:33:01.013Z",
      "updatedAt": "2023-02-27T20:33:01.013Z"
    }
  ]
}
```
## Get a User
- endpoint: {base url}/api/v1/users/:id
- method: get

Sample Response:
```
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "_id": "63f49559acc13efe758bbece",
    "fullName": "Nzube Chuks",
    "email": "nzube21@google.com",
    "password": "$2b$10$hsvJW6pPJx7QRBqPstB21.SRY/MuFWy/PyGe8fSpdm1fpRUD/aRwW",
    "age": 20,
    "nationality": "Nigeria",
    "role": "admin",
    "createdAt": "2023-02-21T09:56:41.346Z",
    "updatedAt": "2023-02-27T14:56:33.024Z"
  }
}
```
## Edit a User's Details
- endpoint: {base url}/api/v1/users/:id
- method: patch

Sample Request(Any fields can be added or omitted):
```
{
  "fullName": "Nzube Chuks",
  "password": "nzubechukwu",
  "email": "nzube251@google.com",
  "nationality": "Nigeria"
}
```
Sample Response:
```
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "63f49559acc13efe758bbece",
    "fullName": "Nzube Chuks",
    "email": "nzube21@google.com",
    "password": "$2b$10$Bl9TbOzH.iIoNYlyOKFLt.j8zm/fjknGf1RQLCC0DCcPBIkMJ.MdW",
    "age": 20,
    "nationality": "Nigeria",
    "role": "admin",
    "createdAt": "2023-02-21T09:56:41.346Z",
    "updatedAt": "2023-02-27T14:56:33.024Z",
    "__v": 0
  }
}
```
## Delete a User
- endpoint: {base url}/api/v1/users/:id
- method: delete

Sample Response:
```
{
  "message": "User deleted successfully",
  "success": true,
  "data": {
    "_id": "63f49559acc13efe758bbece",
    "fullName": "Nzube Chuks",
    "email": "nzube21@google.com",
    "password": "$2b$10$Bl9TbOzH.iIoNYlyOKFLt.j8zm/fjknGf1RQLCC0DCcPBIkMJ.MdW",
    "age": 20,
    "nationality": "Nigeria",
    "role": "admin",
    "createdAt": "2023-02-21T09:56:41.346Z",
    "updatedAt": "2023-02-27T14:56:33.024Z",
    "__v": 0
  }
}
```
## Login a User
- endpoint: {base url}/api/v1/users/login
- method: post

Sample Request:
```
{
  "email": "nzube21@google.com",
  "password": "nzubechukwu"
}
```
Sample Response:
```
{
  "success": true,
  "message": "Login was successfull",
  "data": {
    "user": {
      "_id": "63fcc2405e66fef5311aa3ea",
      "fullName": "Adaobi Aginam",
      "email": "nzubechukwu11@gmail.com",
      "password": "$2b$10$hmDmPEUxa86P1srLA0kOTuuStAh.lb1MEkExp279/u.Qkk57v0422",
      "age": 20,
      "nationality": "Nigeria",
      "role": "admin",
      "createdAt": "2023-02-27T14:46:24.175Z",
      "updatedAt": "2023-02-27T14:46:24.175Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkFkYW9iaSBBZ2luYW0iLCJlbWFpbCI6Im56dWJlY2h1a3d1MTFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc3NTM2MTg2LCJleHAiOjE2Nzc3OTUzODZ9.1Y7-rj0q1n3qzi1dWhc4jVW-wsJGXnDFbK90WIOpBaQ"
  }
}
```
## Logout a User
- endpoint: {base url}/api/v1/users/logout
- method: get

Sample Response:
```
{
  "success": true,
  "message": "Logout was successfull",
}
```
## Create Room
- endpoint: {base url}/api/v1/rooms
- method: post

Sample Request:
```
{
  "name": "400",
  "roomType": "63f4a4582e855d5dc2ee22b3",
  "floor": 5,
  "capacity": 2,
  "price": 500000
}
```
Sample Response:
```
{
  "message": "Room created successfully",
  "success": true,
  "data": {
    "name": "4005",
    "roomType": "63f4a4582e855d5dc2ee22b3",
    "price": 500000,
    "floor": 5,
    "capacity": 2,
    "amenities": [],
    "booked": false,
    "_id": "63fd30c566428610c8c2d080",
    "__v": 0
  }
}
```
## Get all Rooms
- endpoint: {base url}/api/v1/rooms
- method: get

Sample Response:
```
{
  "message": "Rooms fetched successfully",
  "success": true,
  "data": [
    {
      "_id": "63fcd72798e3986a5f57f219",
      "name": "400",
      "roomType": "63f4a4582e855d5dc2ee22b3",
      "price": 500000,
      "floor": 5,
      "capacity": 2,
      "amenities": [],
      "booked": false
    },
    {
      "_id": "63fd30c566428610c8c2d080",
      "name": "4005",
      "roomType": "63f4a4582e855d5dc2ee22b3",
      "price": 500000,
      "floor": 5,
      "capacity": 2,
      "amenities": [],
      "booked": false
    }
  ]
}
```
## Get a Room
- endpoint: {base url}/api/v1/rooms/:id
- method: get

Sample Response:
```
{
  "message": "Room fetched successfully",
  "success": true,
  "data": {
    "_id": "63fcd72798e3986a5f57f219",
    "name": "400",
    "roomType": "63f4a4582e855d5dc2ee22b3",
    "price": 500000,
    "floor": 5,
    "capacity": 2,
    "amenities": [],
    "booked": false
  }
}
```
## Edit a Room Details with id
- endpoint: {base url}/api/v1/rooms/:id
- method: patch

Sample Request(Any fields can be added or omitted):
```
{
  "name": "4000",
  "price": 500000
}
```
Sample Response:
```
{
  "success": true,
  "message": "Room updated successfully",
  "data": {
    "_id": "63fcd72798e3986a5f57f219",
    "name": "4000",
    "roomType": "63f4a4582e855d5dc2ee22b3",
    "price": 500000,
    "floor": 5,
    "capacity": 2,
    "amenities": [],
    "booked": false,
    "__v": 0
  }
}
```
## Delete a Room
- endpoint: {base url}/api/v1/rooms/:id
- method: delete

Sample Response:
```
{
  "message": "Room deleted successfully",
  "success": true,
  "data": {
    "_id": "63fcd72798e3986a5f57f219",
    "name": "4000",
    "roomType": "63f4a4582e855d5dc2ee22b3",
    "price": 500000,
    "floor": 5,
    "capacity": 2,
    "amenities": [],
    "booked": false,
    "__v": 0
  }
}
```
## Create Room Type
- endpoint: {base url}/api/v1/rooms-types
- method: post

Sample Request:
```
{
  "name":"Deluxe"
}
```
Sample Response:
```
{
  "message": "Roomtype created successfully",
  "success": true,
  "data": {
    "name": "deluxe",
    "_id": "63fd32f266428610c8c2d08a",
    "__v": 0
  }
}
```
## Get all Rooms Types
- endpoint: {base url}/api/v1/rooms-types
- method: get

Sample Response:
```
{
  "message": "Roomtype fetched successfully",
  "success": true,
  "data": [
    {
      "_id": "63f4a4582e855d5dc2ee22b3",
      "name": "Standard"
    },
    {
      "_id": "63fd32f266428610c8c2d08a",
      "name": "deluxe"
    }
  ]
}
```
## Get a Room Type
- endpoint: {base url}/api/v1/rooms-type/:id
- method: get

Sample Response:
```
{
  "success": true,
  "message": "Roomtype fetched successfully",
  "data": {
    "_id": "63fd32f266428610c8c2d08a",
    "name": "deluxe"
  }
}
```
## Delete a Room Type
- endpoint: {base url}/api/v1/rooms-type/:id
- method: delete

Sample Response:
```
{
  "message": "Roomtype deleted successfully",
  "success": true,
  "data": {
    "_id": "63fd32f266428610c8c2d08a",
    "name": "deluxe",
    "__v": 0
  }
}
```