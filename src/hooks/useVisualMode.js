import { useState } from "react";

/* allows a component to manage its own visual state. */

const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory(prev => [...prev].slice(0, -1));
    }
    setHistory(prev => [...prev, newMode]);
    setMode(newMode);
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };

};

export default useVisualMode;