# Groq JS Chatbot

A simple terminal chatbot in JavaScript that calls the Groq API.

## Prerequisites

- Node.js 18+
- A Groq API key

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and add your key:

```bash
cp .env.example .env
```

Then edit `.env` and set `GROQ_API_KEY`.

## Run

```bash
npm start
```

Type `exit` to quit.

## Notes

- Default model is `llama-3.1-8b-instant`.
- You can change model in `.env` using `GROQ_MODEL`.
