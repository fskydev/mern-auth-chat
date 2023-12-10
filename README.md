# MERN Auth & Chat App

### NodeJS - Express - JWT -  Socket.io - MongoDB - React - React Router - Context API - TailwindCSS

This is a perfect example for a MERN stack real-time chat application with authentication & authorization.

Basically, it consists of 2 parts as the follows:
- Real-time chat application using socket.io in node.js(Express)
- JWT Authentication & Authorization stored in HTTP-only cookie

## Demo url
https://mern-auth-chat.onrender.com/

![Screenshot 10](https://github.com/fskydev/mern-auth-chat/assets/61609164/8221d394-1d09-485a-8411-2d3ab3067f42)


## Usage
- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
### Clone the project

```
git clone git@github.com:fskydev/mern-auth-chat.git
```

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
### Run locally

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
## Build & Deploy
```
cd client/ && npm install && npm run build && cd .. && cd server/ && npm install && npm run start
```

## Screenshots
#### Private Chat
![Screenshot 10](https://github.com/fskydev/mern-auth-chat/assets/61609164/8221d394-1d09-485a-8411-2d3ab3067f42)
![Screenshot 01](https://github.com/fskydev/mern-auth-chat/assets/61609164/462a575f-aa61-4438-b04e-a60e55dffa38)

#### Login & Register

![Screenshot 02](https://github.com/fskydev/mern-auth-chat/assets/61609164/51573ef8-157d-42ff-a56c-05675955af0f)
![Screenshot 03](https://github.com/fskydev/mern-auth-chat/assets/61609164/83c359a7-76a4-4def-9d0b-e29b75317030)

#### Mobile Responsiveness, Notifications, Potential Chats

![Screenshot 05](https://github.com/fskydev/mern-auth-chat/assets/61609164/8773b161-aab8-4214-bafb-1524c32f2566)
![Screenshot 06](https://github.com/fskydev/mern-auth-chat/assets/61609164/3fbc2c50-3a78-4d44-af82-d5dd775ab8a0)
![Screenshot 07](https://github.com/fskydev/mern-auth-chat/assets/61609164/14c0185f-f1c8-4be7-8591-275feedee005)
![Screenshot 08](https://github.com/fskydev/mern-auth-chat/assets/61609164/0e9952a8-9b89-4676-871f-4b21e1527656)
![Screenshot 09](https://github.com/fskydev/mern-auth-chat/assets/61609164/1662c49e-5ee5-4ede-8e7d-69f1da180fb6)

Happy coding 🔥
