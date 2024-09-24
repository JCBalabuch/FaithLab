# FAITHLAB API

REST API created for the School for catechists "Laboratory of Faith", to manage the database of catechists of the Diocese of Ciudad Guayana, by parishes and Pastoral Zones.

## Tech Stack

**Server:** Node.js, Express.js, MongoDB.

## Dependencies

Bcrypt, Crypto, CSV-Parser, Dotenv, Express, Jsonwebtoken, Mongoose, NOdemailer

## Files Structure

<img src='Images\1.General-Structure.png' alt='Files general structure'/>

<img src='Images\2.API-Structure.png' alt='API files structure'/>

<img src='Images\3.Config-Middlew-Utils-Structure.png' alt='Config, Middlewares and Utils files structure'/>

## Instalation

### Clone project

```bash
https://github.com/JCBalabuch/FaithLab.git
```

### Install

```bash
npm install
```

### Execution

```bash
npm run start
```

or

```bash
npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

For your Data Base

`DDBB_URL`: Your Mongo url

For sending emails:

`EMAIL_USER`: the email address you want to send emails from (in this case a GMAIL address is used)

`EMAIL_PASS`: the password you have enabled for sending emails

And for Jsonwebtoken

`JWT_SECRET`: your Jsonwebtoken password

## Usage

### Creating seeds

Start with the CSV files of the collections: users, parishes and pastoral zones, located in the seeds folder.

Run

```bash
npm run seeds
```

## Users

We have three roles for users: "Master", "Admin" and "User".
All users are created with the "User" role. Only Parish Priests and Parish Coordinators have the "Admin" role, which is assigned by the "Master".
There are only two "Master" roles: Diocesan Advisor and Diocesan Coordinator

## Endpoints

This section describes the API endpoints available for managing collections in the project.

| COLLECTION         | Method | Enpoints           | Query Params    | Authorization         | Description                                                                          |
| ------------------ | ------ | ------------------ | --------------- | --------------------- | ------------------------------------------------------------------------------------ |
| **USERS**          | POST   | /register          | Request body    |                       | Register a new user (register)                                                       |
|                    | POST   | /login             | Request body    |                       | Log in a user (login)                                                                |
|                    | GET    | /                  |                 | Master                | Retrieves a list of all users in the database (getUsers)                             |
|                    | GET    | /get-user          | Query or Body   |                       | Retrive a user by id or by email (getUser)                                           |
|                    | GET    | /users-by-iter     | Request body    | Master                | Retrieve all users according to their user itinerary (getUsersByIter)                |
|                    | GET    | /users-by-pz       | Request body    | Master                | Retrieve all users according to their Pastoral Zone (getUsersByPZ)                   |
|                    | GET    | /users-by-parish   | Request body    | Master or Admin       | Retrieve all users according to their Parish (getUsersByParish)                      |
|                    | PUT    | /update-user/:id   | Params and Body | Master or Admin       | Update an existing user based on its ID (updateUser)                                 |
|                    | PUT    | /update-itself/:id | Params and Body | User                  | Update an existing user based on its ID (userUpdateItself)                           |
|                    | DELETE | /delete-user/:id   | Params and Body | Master, Admin or User | Delete an existing user based on its ID (deleteUser)                                 |
| **USERS**          | POST   | /create-parish     | Request body    | Master                | Create a new Parish (createParish)                                                   |
|                    | GET    | /                  |                 | Master                | Retrive all Parishes in the DB. Populate Users (getParishes)                         |
|                    | GET    | /get-parish/:id    |                 | Params request        | Retrive an existing Parish by its ID (getParish)                                     |
|                    | PUT    | /update-parish/:id | Params and Body | Master                | Update an existing Parish based on its ID (updateParish)                             |
|                    | DELETE | /delete-parish/:id | Params request  | Master                | Delete an existing Parish based on its ID (deleteParish)                             |
| **PASTORAL ZONES** | POST   | /create-zone       | Request body    | Master                | Create a new Pastoral Zone (createPastoralZone)                                      |
|                    | GET    | /                  |                 | Master                | Retrive all Pastoral Zones in the DB. Populate Parishes and Users (getPastoralZones) |
|                    | GET    | /get-zone/:id      |                 | Params request        | Retrive an existing Pastoral Zone by its ID (getPastoralZone)                        |
|                    | PUT    | /update-zone/:id   | Params and Body | Master                | Update an existing Pastoral Zone based on its ID (updatePastoralZone)                |
|                    | DELETE | /delete-parish/:id | Params request  | Master                | Delete an existing Pastoral Zone based on its ID (deletePastoralZone)                |

_Error Handling:_

All endpoints use appropriate HTTP status codes to indicate success or failure. Common status codes include:

200 (OK): Successful request.

201 (Created): Resource created successfully (e.g., creating a new user).

400 (Bad Request): Invalid request body or query parameters.

403 (Forbidden): Requested resource (e.g., unauthorized).

404 (Not Found): Requested resource (e.g., user not found).

500 (Internal Server Error): Unexpected error during operation.

## Author

- Jeniffer Balabuch // [Github](https://www.github.com/JCBalabuch) - [Linkedin](https://www.linkedin.com/in/jenifferbalabuch/) - [Portfolio](https://portfoliojcbs.netlify.app/)

## Feedback

If you have any feedback, please reach out with me to the Linkedin or Github.
