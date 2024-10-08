# File Upload with Express.js and Prisma
##### This project demonstrates how to upload files using express-fileupload and store file paths in a MySQL database using Prisma ORM. The project includes a simple API for handling file uploads, saving the files on the server, and storing the file paths in a database.

###
###
##

## Features

- Upload files using express-fileupload.
- Store file paths in MySQL database with Prisma.
- Simple React frontend for file selection and upload.
- RESTful API with Express.js.

## Prerequisites
Ensure you have the following installed:
- Node.js (>= 14.x)
- MySQL Server
- Prisma CLI
- Express.js


## Getting Started
1.Clone the repository:

```sh
git clone https://github.com/your-username/file-upload-prisma.git
cd file-upload-prisma
```
2. Install Dependencies:

```sh
npm install
```
3. Set Up MySQL Database:

```sh
DATABASE_URL="mysql://user:password@localhost:3306/mydatabase"
```
4. Set Up Prisma:

   Generate the Prisma client by running the following command:
```sh
npx prisma migrate dev --name init
npx prisma generate
```
5. Running the Project:

```sh
npm run dev
```
The server should be running at http://localhost:5030 and the frontend at http://localhost:5173.

## API Endpoints
#### POST /api/v1/uploadFile
Upload a file and store its path in the database.
#### Request
- Content-Type: multipart/form-data
- 400 Bad Request: If no file is uploaded.
#### Response
- 200 OK: If the file is uploaded successfully and the path is stored.
- files: The file to upload
#### Sample Request (Frontend):
```sh
const formData = new FormData();
formData.append('file', file);
axios.post(`${BASE_URL}/api/v1/uploadFile`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
```

## Technology Stack
- Backend: Node.js, Express.js, Prisma
- Frontend: React.js, Axios
- Database: MySQL
- File Upload: express-fileupload

