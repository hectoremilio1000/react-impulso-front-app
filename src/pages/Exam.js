import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Exam = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const apiUrl = process.env.REACT_APP_API_URL;
  // Obtener los parámetros individuales

  const puesto = searchParams.get("puesto"); // "mozo"
  const [preguntasPsicometrico, setPreguntasPsicometrico] = useState([]);
  const [preguntasConocimiento, setPreguntasConocimiento] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const opciones = [
    { opcion: "a", label: "optionA" },
    { opcion: "b", label: "optionB" },
    { opcion: "c", label: "optionC" },
    { opcion: "d", label: "optionD" },
    { opcion: "e", label: "optionE" },
  ];
  const handleRespuesta = (preguntaId, respuestaSeleccionada) => {
    if (respuestas[preguntaId]) return; // Evitar seleccionar de nuevo

    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: { seleccionada: respuestaSeleccionada },
    }));
  };
  const buscar_preguntas_puesto = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/examsQuery?puesto=${puesto}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const data = response.data;
      console.log(data);
      if (data.status === "success") {
        return data.data;
      } else {
        console.log(response.data.message);
        return [];
      }
    } catch (error) {
      console.error("Error al obtener los modulos:", error);
      return [];
    }
  };
  const buscar_preguntas_name = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/examsQuery?type_exam=Psicométrico`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const data = response.data;
      console.log(data);
      if (data.status === "success") {
        return data.data;
      } else {
        console.log(response.data.message);
        return [];
      }
    } catch (error) {
      console.error("Error al obtener los modulos:", error);
      return [];
    }
  };
  useEffect(() => {
    const buscar_preguntas = async () => {
      const preguntasPuesto = await buscar_preguntas_puesto();
      const preguntasName = await buscar_preguntas_name();
      setPreguntasConocimiento(preguntasPuesto);
      setPreguntasPsicometrico(preguntasName);
      console.log(preguntasPuesto);
      console.log(preguntasName);
    };
    buscar_preguntas();
  }, []);
  console.log(respuestas);

  return (
    <div className="p-12 max-w-[1080px] mx-auto w-full">
      <h1 className="text-3xl font-bold">Examen</h1>
      <h2 className="text-4xl font-bold mb-6">Preguntas Psicométricas</h2>

      {/* Preguntas Psicométricas */}
      {preguntasPsicometrico.map((pregunta) =>
        pregunta?.questions_candidates.map((q, index) => {
          return (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
              }}
            >
              <h3 className="font-bold text-lg mb-4">
                {index + 1}. {q.text}
              </h3>
              <div className="flex gap-4">
                {opciones.map((o) => (
                  <button
                    className="text-sm"
                    key={o.opcion}
                    onClick={() => handleRespuesta(q.id, o.label)}
                    disabled={!!respuestas[q.id]} // Deshabilitar después de seleccionar
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      backgroundColor:
                        respuestas[q.id]?.seleccionada === o.label
                          ? "#d4edda"
                          : "#fff",
                      cursor: respuestas[q.id] ? "not-allowed" : "pointer",
                    }}
                  >
                    {q[o.label]}
                  </button>
                ))}
              </div>
            </div>
          );
        })
      )}
      <h2 className="text-4xl font-bold mb-6">Preguntas Puesto</h2>

      {/* Preguntas Psicométricas */}
      {preguntasConocimiento.map((pregunta) =>
        pregunta?.questions_candidates.map((q, index) => {
          return (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
              }}
            >
              <h3 className="font-bold text-lg mb-4">
                {index + 1}. {q.text}
              </h3>
              <div className="flex gap-4">
                {opciones.map((o) => (
                  <button
                    className="text-sm"
                    key={o.opcion}
                    onClick={() => handleRespuesta(q.id, o.label)}
                    disabled={!!respuestas[q.id]} // Deshabilitar después de seleccionar
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      backgroundColor:
                        respuestas[q.id]?.seleccionada === o.label
                          ? "#d4edda"
                          : "#fff",
                      cursor: respuestas[q.id] ? "not-allowed" : "pointer",
                    }}
                  >
                    {q[o.label]}
                  </button>
                ))}
              </div>
            </div>
          );
        })
      )}
      <button
        // onClick={finalizarExamen}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Finalizar Examen
      </button>
    </div>
  );
};

export default Exam;
