roject Overview This is a web application that allows users to submit and view ratings for various stores. It features a single login system with three distinct user roles: System Administrator, Normal User, and Store Owner. Each role has access to specific functionalities tailored to their permissions.

Tech Stack Frontend: ReactJS, Tailwind CSS

Backend: Node.js (with ExpressJs/Loopback/NestJs)

Database: PostgreSQL/MySQL

Authentication & Data Storage: Firebase (for authentication, Firestore for data storage)

User Roles & Functionalities System Administrator Dashboard: A comprehensive dashboard that displays the total number of users, stores, and submitted ratings.

User Management: Can add new users with specified roles (Normal User, Store Owner, Admin). Can view a list of all users with details including Name, Email, Address, and Role. For Store Owners, their overall rating is also displayed.

Store Management: Can add new stores. Can view a list of all stores with their Name, Address, and Overall Rating.

Data Filtering: Can apply filters on user and store listings based on Name, Email, Address, and Role.

Session Management: Can log out from the system.

Normal User Authentication: Can sign up and log in to the platform.

Profile: Can update their password after logging in.

Store Interaction: Can view a list of all registered stores, search for stores by Name and Address, and submit or modify ratings for individual stores.

Session Management: Can log out from the system.

Store Owner Authentication: Can log in to the platform.

Profile: Can update their password after logging in.

Dashboard: Can view a dashboard with a list of users who have submitted ratings for their specific store and the average rating of their store.

Session Management: Can log out from the system.

Form Validations The application enforces the following validation rules on all forms:

Name: Minimum 20 characters, maximum 60 characters.

Address: Maximum 400 characters.

Password: Must be 8-16 characters long and include at least one uppercase letter and one special character.

Email: Must follow a standard email format.
