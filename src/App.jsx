
import { useState } from "react";
import { TodoProvider } from "./context/TodoContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Sidebar } from "./Components/Layout/SideBar";
import { MainPanel } from "./Components/Layout/MainPanel";
import "./App.css";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [darkMode, setDarkMode] = useLocalStorage(
    "nexus-dark-mode",
    false
  );

  return (
    <TodoProvider>
      <div className={`app-layout ${darkMode ? "dark" : ""}`}>

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <MainPanel
          onOpenSidebar={() => setSidebarOpen(true)}
        />

      </div>
    </TodoProvider>
  );
}
