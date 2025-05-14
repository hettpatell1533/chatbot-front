# 💬 GitHub Repo ChatBot (Powered by Gemini AI)

An AI-powered chatbot built to understand and converse about any GitHub repository using Google’s Gemini (Generative AI). Perfect for developers who want to explore codebases, ask implementation questions, or get quick summaries — all with natural language.

---

## 🚀 What is this project?

This project is an **AI-driven developer assistant** that allows users to chat with their GitHub repositories. Using the Google Gemini model, it intelligently answers your technical questions based on the source code of your project.

Once a GitHub repo is connected, the bot fetches the entire codebase, stores it in a structured format, and uses it to guide its AI responses — ensuring contextually accurate, code-specific assistance.

---

## 🎯 Why use this?

- 🤖 Ask your repo anything — no need to dig through folders and files
- 🧠 Get relevant responses grounded in your actual source code
- 🛠️ Great for onboarding, code reviews, debugging, and documentation understanding
- 💾 Saves chat history per project
- 🧩 Multiple chats per project for organized conversations
- 🔐 Secure login and session management

---

## 🛠️ How it works

### 1. Authentication

- User signs up or logs in using email and password credentials.

### 2. Project Setup

- Create a new project by providing:
  - **Project name**
  - **GitHub repository URL**
  - **GitHub Personal Access Token (PAT)** – only if the repository is private

- Once submitted, the entire repository source code is:
  - Cloned or fetched
  - Parsed and stored in the database
  - Made ready for AI interaction

### 3. Start Chatting

- The user can initiate a new chat within a project
- For every question, the system:
  - Retrieves the most relevant code from the repo
  - Injects it into the system prompt to Gemini
  - Responds with a well-formatted, context-aware reply

### 4. History & Management

- Chats are saved per project
- Sidebar displays chat history for quick access
- Users can start multiple chats per project
- Secure logout support is available

---

## 🧪 Example Use Cases

- "Add product module and make it compatible with other modules."
- "Refactor Cart logic as it is not running now."
- "Can you add a types in project."
- "Add Database connection code into db.config file."

---

## 🧰 Tech Stack

- **Frontend:** Next.js
- **Backend:** NestJS
- **Database:** PostgreSQL
- **Authentication:** JWT or session-based
- **AI Model:** Google Gemini (Generative AI)

---