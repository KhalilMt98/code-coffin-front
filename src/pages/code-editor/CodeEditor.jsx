import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Output from "./Output";
import "./styles.css";

const fetchSuggestions = async (code, language) => {
  try {
    const response = await axios.post('http://localhost:8000/api/suggestion', { code, language });
    const suggestions = response.data.suggestions || [];
    return suggestions;
  } catch (error) {
    console.error('Error fetching suggestions:', error.response ? error.response.data : error.message);
    return [];
  }
};

const CodeEditor = () => {
  const { id } = useParams();
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [title,setTitle]=useState("");

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  useEffect(() => {
    const fetchProjectCode = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/source-codes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const project = response.data;
        setTitle(project.source_code.title);
        setValue(project.source_code.code || "");
      } catch (error) {
        console.error('Error fetching project code:', error);
        setValue("");
      }
    };

    fetchProjectCode();
  }, [id]);

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

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      saveCode();
    }, 2000); 

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [value]);

  const saveCode = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/source-codes/${id}`, { code: value,title:title }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Code saved successfully');
    } catch (error) {
      console.error('Error saving code:', error);
    }
  };

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
