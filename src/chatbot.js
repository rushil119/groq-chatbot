import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;
const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

if (!apiKey) {
  console.error("Missing GROQ_API_KEY. Add it to your .env file.");
  process.exit(1);
}

const client = new Groq({ apiKey });
const rl = readline.createInterface({ input, output });

const messages = [
  {
    role: "system",
    content: "You are a helpful assistant for beginners learning AI.",
  },
];

async function main() {
  console.log("Groq Chatbot started. Type 'exit' to quit.\n");

  while (true) {
    const userInput = (await rl.question("You: ")).trim();

    if (!userInput) {
      continue;
    }

    if (userInput.toLowerCase() === "exit") {
      break;
    }

    messages.push({ role: "user", content: userInput });

    try {
      const completion = await client.chat.completions.create({
        model,
        messages,
      });

      const reply = completion.choices?.[0]?.message?.content?.trim() || "No response.";
      console.log(`Bot: ${reply}\n`);

      messages.push({ role: "assistant", content: reply });
    } catch (error) {
      const message = error?.message || "Unknown error while calling Groq API.";
      console.error(`Error: ${message}\n`);
    }
  }

  rl.close();
  console.log("Bye!");
}

main();
