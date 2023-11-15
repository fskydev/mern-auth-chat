# MERN Auth & Chat App

### Express - JWT -  Socket.io - MongoDB - React - React Router - Context API - TailwindCSS - NodeJS

This is a perfect example for a MERN stack real-time chat application with authentication & authorization.

Basically, it consists of 2 parts as the follows:
- Real-time chat application using socket.io in node.js(Express)
- JWT Authentication & Authorization stored in HTTP-only cookie



### Env Variables

Rename the `server/.env.example` file to `.env` and add the following

```
PORT=5000
MONGO_URI=
JWT_SECRET_KEY=
```

Change the JWT_SECRET to what you want

### Install Dependencies (backend & frontend)

```
cd server
npm install
```
```
cd socket
npm install
```
```
cd client
npm install
```
### Run

```
# Run API server
cd server
npm run dev
```
```
# Run socket server
cd socket
npm run dev
```
```
# Run frontend
cd client
npm run dev
```
### Preview
![chat](https://github.com/fskydev/chat-app-v2/assets/61609164/f31ddf13-0ddc-4d6c-bd99-1e52807c118b)
![login](https://github.com/fskydev/chat-app-v2/assets/61609164/c9dcedf5-143a-43ee-979c-21596f950c01)
![register](https://github.com/fskydev/chat-app-v2/assets/61609164/21f9a361-e948-414b-a54f-8ada8da86b76)
