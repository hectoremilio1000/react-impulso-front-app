import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Examen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { candidate_id } = useParams();
  const [intentoId, setIntentoId] = useState(1);

  const apiUrl = process.env.REACT_APP_API_URL;
  // Obtener los parámetros individuales

  const puesto = searchParams.get("puesto"); // "mozo"
  const [preguntasPsicometrico, setPreguntasPsicometrico] = useState([]);
  const [preguntasConocimiento, setPreguntasConocimiento] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [sizeQuestions, setSizeQuestions] = useState([]);
  const opciones = [
    { opcion: "a", label: "optionA", peso: "weightA" },
    { opcion: "b", label: "optionB", peso: "weightB" },
    { opcion: "c", label: "optionC", peso: "weightC" },
    { opcion: "d", label: "optionD", peso: "weightD" },
    { opcion: "e", label: "optionE", peso: "weightE" },
  ];
  const handleRespuesta = (examen, pregunta, respuesta) => {
    if (respuestas.some((respuesta) => respuesta.question_id === pregunta.id))
      return; // Evitar seleccionar de nuevo
    const is_correct =
      `option${String(pregunta.correctAnswer).toUpperCase()}` ===
      respuesta.label;
    const peso = pregunta[`${respuesta.peso}`];
    const respuestaNew = {
      attempt: intentoId,
      candidate_id: Number(candidate_id),
      question_id: pregunta.id,
      selected_answer: respuesta.label,
      answer_weight: peso,
      is_correct: is_correct,
      exam_id: examen.id,
      exam_name: examen.name,
      question_weight: pregunta.questionWeight,
    };
    console.log(respuestaNew);
    setRespuestas((prev) => [...prev, respuestaNew]);
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
      const data = response.data;
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
      console.log(preguntasPuesto.length);
      let sumaPuesto = 0;
      let sumaPsicosometricos = 0;
      preguntasName.map((p) =>
        p.questions_candidates.map((_, index) => {
          sumaPsicosometricos = sumaPsicosometricos + 1;
        })
      );
      preguntasPuesto.map((p) =>
        p.questions_candidates.map((_, index) => {
          sumaPuesto = sumaPuesto + 1;
        })
      );
      setSizeQuestions(sumaPsicosometricos + sumaPuesto);
    };
    buscar_preguntas();
  }, []);

  useEffect(() => {
    const buscar_last_attemp_candidate = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/getAttempAnswer/${candidate_id}`,
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
          setIntentoId(data.data.last_attempt + 1);
        }
      } catch (error) {
        console.error(
          "Error al obtener el ultimo intento de respuestas del candidato:",
          error
        );
        return [];
      }
    };
    if (candidate_id) {
      buscar_last_attemp_candidate(candidate_id);
    }
  }, [candidate_id]);

  const verifySelectedAnswer = (id) => {
    return respuestas.some((respuesta) => respuesta.question_id === id);
  };
  const finalizarExamen = async () => {
    console.log(sizeQuestions);

    if (respuestas.length >= 1) {
      try {
        // store respuestas de candidatos
        const response = await axios.post(`${apiUrl}/answerCandidatesByGroup`, {
          answer_candidates: respuestas,
        });
        const data = response.data;
        console.log(data);
        if (data.status === "success") {
          // generate the results the candidates
          const response_results = await axios.post(
            `${apiUrl}/results_candidates`,
            {
              candidateId: candidate_id,
              attempt: intentoId,
              puesto: puesto,
            }
          );
          console.log(response_results);
          message.success("Se envio correctamente las respuestas");
          navigate("/thanks-candidate");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.warning(
        "Tienes que responder todas las preguntas para poder enviar tu examen"
      );
    }
  };
  return (
    <div className="p-12 max-w-[1080px] mx-auto w-full">
      <h1 className="text-3xl font-bold">Examen</h1>
      <h2 className="text-4xl font-bold mb-6">Preguntas Psicométricas</h2>

      {/* Preguntas Psicométricas */}
      {preguntasPsicometrico.map((pregunta, y) =>
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
                    onClick={() => handleRespuesta(pregunta, q, o)}
                    disabled={verifySelectedAnswer(q.id)} // Deshabilitar después de seleccionar
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      backgroundColor:
                        respuestas.find(
                          (respuesta) => respuesta.question_id === q.id
                        )?.selected_answer === o.label
                          ? "#d4edda"
                          : "#fff",
                      cursor: verifySelectedAnswer(q.id)
                        ? "not-allowed"
                        : "pointer",
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
                    onClick={() => handleRespuesta(pregunta, q, o)}
                    disabled={verifySelectedAnswer(q.id)} // Deshabilitar después de seleccionar
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      backgroundColor:
                        respuestas.find(
                          (respuesta) => respuesta.question_id === q.id
                        )?.selected_answer === o.label
                          ? "#d4edda"
                          : "#fff",
                      cursor: verifySelectedAnswer(q.id)
                        ? "not-allowed"
                        : "pointer",
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
      <div className="w-full py-3 bg-gray-200 sticky bottom-[0px] shadow-lg">
        <button
          className="px-5 py-4 rounded-md bg-dark-purple w-full text-lg font-bold text-white"
          onClick={finalizarExamen}
        >
          Finalizar Examen
        </button>
      </div>
    </div>
  );
};

export default Examen;
