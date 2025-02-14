import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { API } from "./api/Api";
import "./styles/index.scss";
import MainLayout from "./pages/MainLayout";

export const CurrentUserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [page, setPage] = useState({ sectionId: 1, pageId: 1 });

  useEffect(() => {
    const pageParams = localStorage.getItem("currentPage");

    if (!pageParams) {
      const defaultPage = { sectionId: 1, pageId: 1 };
      localStorage.setItem("currentPage", JSON.stringify(defaultPage));
      setPage(defaultPage);
    } else {
      setPage(JSON.parse(pageParams));
    }
  }, []);

  const handleCurrentUser = async () => {
    try {
      const res = await API.get("/api/user/current-user");
      setUser(res.data);
    } catch (e) {
      console.error("Error fetching current user:", e);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ user, page, setPage }}>
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
