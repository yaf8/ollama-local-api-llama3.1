import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when API call starts
    setResponse(""); // Optionally clear the previous response

    try {
      const res = await axios.post("http://localhost:11434/api/chat", {
        model: "llama3.1",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        stream: false,
      });

      setResponse(res.data.message.content); // Set the response when data is fetched
    } catch (error) {
      console.error("Error connecting to Ollama API:", error);
      setResponse("Error: Unable to fetch response from Llama.");
    } finally {
      setLoading(false); // Set loading to false once the API call is done
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
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Send"}
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
