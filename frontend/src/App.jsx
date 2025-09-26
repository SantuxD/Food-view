import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";


function App() {
  const [theme, setTheme] = useState("light");
   useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
    <Navbar theme={theme} setTheme={setTheme} />
    <main className="p-4">
      <AppRoutes />
       </main>
   
     </div>
    </>
  );
}

export default App;
