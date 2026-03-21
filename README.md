# AI Chatbot API

AI-powered chatbot backend built with Node.js, MongoDB, and OpenAI.

## Features

- JWT authentication
- Intent classification
- AI response generation
- Conversation history
- Escalation rules
- Protected routes
- MongoDB storage

## Tech

Node.js
Express
MongoDB
Mongoose
OpenAI API
JWT

## Endpoints

POST /api/auth/register
POST /api/auth/login
POST /api/chat
GET /api/chat/:id

## Updates

- Added system prompt design
- Improved intent classifier (JSON output)
- Added conversation history support
- OpenAI integration improved

## RAG Support

This chatbot now supports Retrieval Augmented Generation (RAG).

Features:
- Knowledge base stored in MongoDB
- Context retrieval using keyword search
- Injected context into LLM prompt
- Improved factual responses