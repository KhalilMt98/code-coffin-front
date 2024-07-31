import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Output from "./Output";
import { useNavigate } from "react-router-dom";
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

const getCodeExplanation = async (code) => {
  try {
    const response = await axios.post('http://localhost:8000/api/explanation', { code });
    const explanation = response.data.suggestions 
    return explanation  || "No explanation available.";
  } catch (error) {
    console.error('Error fetching code explanation:', error.response ? error.response.data : error.message);
    return "Error fetching explanation.";
  }
};

const CodeEditor = () => {
  const { id } = useParams();
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          verifyToken(token);
        }
      }, [navigate]);
    
      const verifyToken = async (token) => {
        try {
          const response = await axios.get("http://localhost:8000/api/verify-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.status === "success") {
            const userRole = response.data.user.role;
            if (userRole !== "user") {
              navigate("/admin");
            }
          } else {
            localStorage.removeItem("token");
            navigate("/login");
          }
        } catch (error) {
          console.error("Token verification error:", error);
          localStorage.removeItem("token");
          navigate("/login")
        }
      };
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
        if (project.source_code.code==="empty"){
          setValue("");
        }
        else{
        setValue(project.source_code.code);
        }
      } catch (error) {
        console.error('Error fetching project code:', error);
        setValue("");
      }
    };

    fetchProjectCode();
  }, [id]);

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (value) {
        const fetchedSuggestions = await fetchSuggestions(value, 'python');
        setSuggestions(fetchedSuggestions);
      }
    }, 300); 
    return () => {
      clearTimeout(debounceTimeout);
    };
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
      await axios.put(`http://localhost:8000/api/source-codes/${id}`, { code: value, title: title }, {
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

  const handleExplainCode = async () => {
    try {
      const explanation = await getCodeExplanation(value);

      const response = await axios.post('http://localhost:8000/api/speech', {
        text: explanation
      }, {
        responseType: 'blob'
      });
      const audioUrl = URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error generating speech:', error.response ? error.response.data : error.message);
      console.log('Error response:', error.response);
    }
  };
  
  return (
    <div className="container">
      <div className="editor-container">
        <p className="language-selector">Language:</p>
        <p className="language-selector-text">python</p>
        <button onClick={handleExplainCode} className="explain-button">
          Explain Code
        </button>
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
