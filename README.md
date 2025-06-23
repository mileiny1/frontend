Auth Route
HTTP	Controller	Response	URI	Use Case
POST	Auth.js	200	/Signup	Create users
POST	Auth.js	200	/Login	To sign in
  
Dessert Route
HTTP	Controller	Response	URL	Use Cases
GET	Dessert.js	200	/id	Get a specific dessert
POST	Dessert.js	200	/id/login	User can login and make new orders


Orders Route
HTTP	Controller	Response	URL	Use Cases
GET	Orders.jsx	200	Id:/Orders	Users are going to see the orders after they make the request
POST	Orders.jsx	200	Id:/orders	Users can request their own orders
				

🔐 Authentication & Security
•	JWT Tokens: Secure authentication with expiring tokens
•	Role-Based Access: User and Admin roles with appropriate permissions
•	Password Protection: Bcrypt hashing with salt rounds
•	Ownership Validation: Users can only access their own data
•	Admin Safeguards: Admins and users cannot delete themselves or change other admin roles.
•	Password Confirmation: Required for sensitive operations like user deletion.

•	Tech Stack

•	🟢 Node.js with Express.js framework
•	🍃 MongoDB with Mongoose ODM
•	🔐 JWT for secure authentication
•	🔑 Bcrypt for password hashing
•	🌐 CORS for cross-origin requests for front end session.
•	🔧 Dotenv for environment variables
•	 Features

-	Users can order different types of desserts in the real time and track theirs orders in the real time.
About the project

📈 This project is a webpage built using the MERN stack that allows users to place orders for different desserts available in the store and track their orders.
![image](https://github.com/user-attachments/assets/0fcc0609-e5b7-427b-a3b5-8fb671f2a688)
