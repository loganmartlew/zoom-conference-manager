# 🧱 Tech Stack

The technology stack we decided to use is a mix of technologies that are popular in the industry, and that we are comfortable with or interested in. This section documents the main technology elements of our application.

## Frontend

### React ⚛️

Our client application is built in React, the most popular Javascript framework. We chose React because of it's popularity, and because some of our team have previous experience with it. React's popularity means that it has a healthy community and a large ecosystem around it to help us with development.

### Typescript

Our application is written in Typescript rather than Javascript. Typescript is a superset of Javascript, meant to improve on the weak points of the language. Typescript provides many benefits over Javascript, the main one being that it provides static typing to Javascript. This helps us to structure our app better, and to catch bugs before code is even run.

### React Router v6

React router provides the client application with client-side routing to control the structure of the web app. It will also provide layout nesting with it's outlet functionality, allowing us to dynamically load parts of the page.

### Axios

Axios is our chosen HTTP library. It will provide the functionality required to set default headers for requests, manage request authorization, and make requests to our REST API.

### React Query

React Query is our solution for managing server state on the client. It includes built-in functionality for query caching, stale data revalidation, and loading/error states.

### React Hook Form

React hook form is a very popular and robust library for managing form state in React. It uses React hooks to provide components with the necessary functions and data to manage a form. It takes care of managing input values, form submission, and form validation and error handling.

### MUI (Material UI)

MUI is the component library we will be using for our UI. It will provide us with a wide range of pre-built and pre-styled components that we can drop into our app, drastically speeding up development. It will also help us maintain a consistent design across the UI.

---

## Backend

### Node.JS

We are using Node.JS as our backend runtime. This allows us to share business logic and Typescript interfaces across both back and front end of our application.

### Typescript

We are using Typescript on our backend for the same reasons we are using it on the frontend. This means we are able to share interfaces and logic for our main data structures across our application with ease.

### Express

Express is our Node framework of choice for creating our REST API that will interact with our application's client. It includes a comprehensive routing system for generating API endpoints, and middleware functionality that will allow us to insert business logic into the application.

### TypeORM

Our Object Relational Mapper of choice for this project is TypeORM. It utilises features and additions of Typescript to the fullest, and allows us to easily define the schema of our database.

### Axios

Axios is used on the backend as well to interact with the Zoom API. It provides the same benefits as it does on the frontend.

### Zoom API

The Zoom API allows our application to manage Zoom accounts, and create and schedule meetings.
