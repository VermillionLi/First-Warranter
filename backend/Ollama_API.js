//server communicate to Ollama
async function askRAG(question) {
    try {
        const response = await fetch("http://localhost:8000/test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        return data.answer;

    } catch (error) {
        console.error("RAG request failed:", error);
        throw error;
    }
}

export {askRAG}