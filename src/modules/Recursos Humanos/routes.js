import { Routes, Route } from "react-router-dom";
import Main from ".";
import LayoutRecursosH from "./components/Layout";
import NotFoundPage from "../../pages/NotFoundPage";
import Contratados from "./pages/Contratados";
import Candidatos from "./pages/PorContratar";
import CandidateExam from "./pages/CandidatosExam";
import CandidateResults from "./pages/CandidatosResults";

function RecursosHRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <LayoutRecursosH>
            <Main />
          </LayoutRecursosH>
        }
      />
      <Route
        path="/contratados"
        element={
          <LayoutRecursosH>
            <Contratados />
          </LayoutRecursosH>
        }
      />
      <Route
        path="/candidatos"
        element={
          <LayoutRecursosH>
            <Candidatos />
          </LayoutRecursosH>
        }
      />
      <Route
        path="/candidatos/:id/examen"
        element={
          <LayoutRecursosH>
            <CandidateExam />
          </LayoutRecursosH>
        }
      />
      <Route
        path="/candidatos/:id/resultados"
        element={
          <LayoutRecursosH>
            <CandidateResults />
          </LayoutRecursosH>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default RecursosHRoutes;
