import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState(
    "Write a very short kids story about avatars."
  );
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!prompt.trim()) return;

    try {
      const res = await axios.post("http://localhost:11434/api/chat", {
        model: "llama3.1",
        messages: [
          {
            role: "user",
            content: "Write a very short kids story about avatars.",
          },
        ],
        stream: false,
      });

      // console.log("RESPONSE : ", res.data.message.content);
      setResponse(res.data.message.content);

    } catch (error) {
      console.error("Error connecting to Ollama API:", error);
      setResponse("Error: Unable to fetch response from Llama.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Chat with Llama 3.1</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Type your question..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <br />
        <button
          type="submit"
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Send
        </button>
      </form>
      <div style={{ marginTop: "2rem" }}>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
