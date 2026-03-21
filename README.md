# AI Chatbot API (RAG + Semantic Search + Admin Knowledge)

Backend API for an AI-powered customer support chatbot using Node.js, MongoDB, and OpenAI.

This project demonstrates a production-style architecture including authentication, role-based AI behavior, Retrieval-Augmented Generation (RAG), semantic search with embeddings, and admin-controlled knowledge management.

---

## Features

- JWT Authentication
- Protected API routes
- Role-based AI responses (user / support / admin)
- Intent classification using OpenAI
- Conversation history storage
- Escalation rules
- Retrieval-Augmented Generation (RAG)
- Chunk-based knowledge storage
- Semantic retrieval with embeddings
- Admin knowledge management API
- MongoDB + Mongoose models
- Clean service/controller architecture

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- OpenAI API
- JWT
- bcryptjs

---

## API Routes

### Auth

POST /api/auth/register  
POST /api/auth/login

### Chat

POST /api/chat  
GET /api/chat/:id

### Knowledge (Admin only)

GET /api/knowledge  
POST /api/knowledge  
PUT /api/knowledge/:id  
DELETE /api/knowledge/:id

---

## Project Structure
src/
config/
controllers/
middlewares/
models/
routes/
services/
utils/
app.js
server.js

## Environment Variables

Create `.env`

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
OPENAI_API_KEY=your_openai_key

## Install

npm install
Run dev server
npm run dev


## Seed knowledge data

npm run seed
npm run seed:chunks
npm run embed:chunks


---

## Architecture

User → API → Intent → Retrieval → Context → OpenAI → Response

- Knowledge stored as chunks
- Embeddings generated for each chunk
- Cosine similarity search
- Context injected into prompt

---

## Status

Project includes:

✔ Authentication  
✔ Role-based AI  
✔ RAG  
✔ Semantic search  
✔ Admin routes  
✔ Conversation memory  
✔ OpenAI integration  

This project is built for AI backend engineering practice.