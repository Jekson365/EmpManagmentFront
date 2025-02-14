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
    const pageParams = JSON.parse(localStorage.getItem("currentPage"));

    setPage({ sectionId: pageParams.sectionId, pageId: pageParams.pageId });
  }, []);
  const handleCurrentUser = async () => {
    try {
      await API.get("/api/user/current-user").then((res) => {
        setUser(res.data);
      });
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    handleCurrentUser();
  }, []);
  return (
    <>
      <CurrentUserContext.Provider value={{ user, page, setPage }}>
        <Routes>
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
