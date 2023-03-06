const user = {
    "_id": "640591e5d40227509a946340",
    "fullName": "Adaobi Aginam",
    "email": "nzubechukwu@gmail.com",
    "password": "$2b$10$0dVWpqJaqNVic2CtHTEHH.5YGRnK2GEK7OxGNj6uTVflLUacR4XH6",
    "age": 20,
    "nationality": "Nigeria",
    "role": "admin",
    "createdAt": "2023-03-06T07:10:29.538Z",
    "updatedAt": "2023-03-06T07:10:29.538Z"
}

const createUser =  {
    tags: ["User"],
    description: "Create a new user with a unique email",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        fullName: {
                            type: "string",
                            description: "The full name of the user, including their first name and last name.",
                            example: "Adaobi Aginam"
                        },
                        email: {
                            type: "string",
                            description: "The email address of the user.",
                            example: "nzubechukwu@gmail.com"
                        },
                        password: {
                            type: "string",
                            description: "Password of the user, used for authentication and securing the user's account.",
                            example: "password1234$$"
                        },
                        age: {
                            type: "string",
                            description: "Age of the user in years.",
                            example: "20"
                        },
                        nationality: {
                            type: "string",
                            description: "Nationality of the user, indicating the country where the user holds citizenship.",
                            example: "Nigeria"
                        },
                        role: {
                            type: "string",
                            description: "Role of the user in the system(user or admin), indicating the user's level of access or privileges.",
                            example: "admin"
                        },
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message: "User created successfully",
                            success: true,
                            data: {
                                createdUser: user,
                                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkFkYW9iaSBBZ2luYW0iLCJlbWFpbCI6Im56enp6dWJlY2h1a2d3dTU2ZDc4czc2NXNkMTUxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODEwNjQzNiwiZXhwIjoxNjc4MzY1NjM2fQ.VObxOSZ0NxyAAuQUqfamBKsH5xBAHO8fQ_T65zb-V_I"
                            }
                        }
                    }
                }
            }
        }
    }
}

const listUsers =  {
    tags: ["User"],
    description: "Lists all the available users",
    summary: "Lists all the available users",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            success: true,
                            message: "User fetched successfully",
                            users: [user]
                        }
                    }
                }
            }
        }
    }
}

const userRoutesDocs = {
    "/users/signup": {
        post: createUser
    },
    "/users": {
        get: listUsers
    }
}
export default userRoutesDocs;