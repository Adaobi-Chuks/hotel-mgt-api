export default {
    DATABASE_URI: process.env.DATABASE_URI,

    PORT: process.env.PORT,

    SECRET: process.env.SECRET!,

    ZERO: 0,

    I: "i",

    SALTROUNDS: 10,

    MAXAGE: 3 * 24 * 60 * 60,

    ENUM: {
        GUEST: "guest",
        ADMIN: "admin"
    },

    DATABASES: {
        ROOMTYPE: "roomType",
        ROOM: "room",
        USER: "user"
    },

    MESSAGES: {
        ROOMTYPE: {
            CREATED: "Roomtype created successfully",
            FETCHED: "Roomtype fetched successfully",
            DELETED: "Roomtype deleted successfully",
            DUPLICATE_ERROR: "Roomtype already exists",
            INVALID_ID_ERROR: "Invalid id"
        },
        ROOM: {
            CREATED: "Room created successfully",
            FETCHED: "Room fetched successfully",
            FETCHEDALL: "Rooms fetched successfully",
            UPDATED: "Room updated successfully",
            DELETED: "Room deleted successfully",
            DUPLICATE_ERROR: "Room already exists",
            INVALID_ID_ERROR: "Invalid id"
        },
        USER: {
            CREATED: "User created successfully",
            FETCHED: "User fetched successfully",
            FETCHEDALL: "User fetched successfully",
            UPDATED: "User updated successfully",
            DELETED: "User deleted successfully",
            DUPLICATE_ERROR: "Email already exists",
            INVALID_ID_ERROR: "Invalid id",
            INVALID_EMAIL_ERROR: "Invalid email",
            INVALID_PASSWORD_ERROR: "Invalid password",
            LOGIN: "Login was successfull"
        },
        DATABASE: {
            CONNECTED: "MongoDB is connected",
            ERROR: "There was an error while connecting to the database."
        },
        AUTH: {
            DENIED: 'Access Denied: Unauthorized request',
            TOKENERROR: 'Access Denied: Token not provided'
        }
    }
};