import userRoutesDocs from "./user.swagger";

const swaggerDocumentation = {
    openapi: "3.0.0",
    info: {
        title: "Hotel API",
        version: "1.0.0",
        description: "A simple API for managing hotel operations. It provides services for managing rooms and room types. Documentation and code samples are available to help you get started quickly. The API has two main components: Room and Room Type."
    },
    servers: [
        {
            url: "http://localhost:5000/api/v1",
            description: "Local dev"
        },
        {
            url: "https://jesshotels.onrender.com/api/v1",
            description: "Production dev"
        }
    ],
    tags: [
        {
            name: "User",
            description: "User routes"
        }
    ],
    paths: {
        ...userRoutesDocs
    }
}

export default swaggerDocumentation;