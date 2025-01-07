Student To-Do List Application (MERN Stack)

This is a Full Stack To-Do List application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to manage their tasks by adding, editing, marking as completed, and deleting them. The tasks are persisted in MongoDB, so they remain available even after page reloads or when accessed from different devices.


---

Features

Add, Edit, and Delete Tasks: Users can manage tasks with basic CRUD (Create, Read, Update, Delete) operations.

Mark Tasks as Completed: Users can mark tasks as completed, and completed tasks will be visually indicated with a strikethrough.

Filter Tasks: Filter tasks based on completion status (All, Completed, or Pending).

Persistent Data: Tasks are stored in MongoDB and persist even after page reloads.



---

Technologies Used

Front-End:

React: A JavaScript library for building the user interface, managing state, and rendering tasks dynamically.

HTML5: Used for the structure of the application.

CSS3: For styling the application with a responsive design.

Axios: A promise-based HTTP client used for making API requests.


Back-End:

Node.js: A JavaScript runtime environment used for building the back-end API.

Express.js: A web framework for Node.js used to create routes and handle HTTP requests.

MongoDB: A NoSQL database used for storing task data.

Mongoose: An Object Data Modeling (ODM) library for MongoDB to manage schema-based data.



---

How It Works

Front-End:

The React application handles user interactions, displays tasks, and sends HTTP requests to the back-end API to manage task data.

Task Operations: Add, edit, delete, and mark tasks as completed.

Task Filtering: Tasks can be filtered by their completion status.



Back-End:

The Node.js and Express.js server exposes a RESTful API with CRUD routes.

Create: Adds new tasks.

Read: Fetches tasks from the database.

Update: Modifies existing tasks.

Delete: Removes tasks from the database.




---

Front-End Usage

Add a Task:

1. Enter a Title and Description (optional) for the task.


2. Click Add Task to send the task to the back-end API and store it in MongoDB.



Mark a Task as Completed:

1. Click the checkbox next to a task.


2. The task will be marked with a strikethrough, and the change will be updated in the database.



Edit a Task:

1. Click the Edit button next to a task.


2. Modify the task title or description and save the changes. The task will be updated in MongoDB.



Delete a Task:

1. Click the Delete button next to the task.


2. The task will be removed from the front-end and the MongoDB database.



Filter Tasks:

1. Use the filter option to view tasks based on their completion status:

All: View all tasks.

Completed: View only completed tasks.

Pending: View only pending tasks.





---

Back-End Setup

Prerequisites

Node.js and npm installed.

MongoDB set up locally or using a cloud service like MongoDB Atlas.


Installing Dependencies:

1. Clone the repository:

git clone <repository-url>


2. Navigate to the back-end directory:

cd backend


3. Install the required dependencies:

npm install



Running the Back-End:

1. Start the Express.js server:

npm start

The back-end will run at http://localhost:5000.




---

Front-End Setup

Prerequisites

Node.js and npm installed.

React CLI installed globally:

npm install -g create-react-app


Installing Dependencies:

1. Navigate to the front-end directory:

cd frontend


2. Install the required dependencies:

npm install



Running the Front-End:

1. Start the React application:

npm start

The front-end will run at http://localhost:3000.




---

Acknowledgements

This project was built using the MERN stack (MongoDB, Express.js, React, Node.js) to showcase full-stack development.

The app focuses on demonstrating basic CRUD operations, RESTful APIs, and state management in React.



---

License

This project is licensed under the MIT License. See the LICENSE file for more details.
