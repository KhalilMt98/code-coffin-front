import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import Output from "./Output";
import axios from 'axios';
import "./styles.css";

const fetchSuggestions = async (code, language) => {
  try {
    const response = await axios.post('http://localhost:8000/api/suggestion', { code, language });
    const suggestions = response.data.suggestions || []; // Default to an empty array if suggestions are not available
    return suggestions;
  } catch (error) {
    console.error('Error fetching suggestions:', error.response ? error.response.data : error.message);
    return [];
  }
};
const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  useEffect(() => {
    if (value) {
      const fetchAndSetSuggestions = async () => {
        const fetchedSuggestions = await fetchSuggestions(value, 'python');
        console.log(fetchedSuggestions);
        setSuggestions(fetchedSuggestions);
      };
      fetchAndSetSuggestions();
    }
  }, [value]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange = (value) => {
    setValue(value);
  };

  return (
    <div className="container">
      <div className="editor-container">
        <p className="language-selector">Language:</p>
        <p className="language-selector-text">python</p>
        <Editor
          className="editor"
          options={{
            minimap: {
              enabled: false,
            },
          }}
          theme="vs-dark"
          language="python"
          onMount={onMount}
          value={value}
          onChange={handleEditorChange}
        />
        <button onClick={toggleSuggestions} className="suggestions-button">
          {showSuggestions ? "Hide Suggestions" : "Show Suggestions"}
        </button>
        {showSuggestions && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion">
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <Output editorRef={editorRef} language="python" />
    </div>
  );
};


export default CodeEditor;
