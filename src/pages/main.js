const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");
const qrcode = require("qrcode-terminal");

// Configuración personalizada (ajusta según tus necesidades)
const saludoInicial = "¡Encantado de conocerte! ¿Cuál es tu nombre?";
const mensajeSeguimiento =
  "¡Hola! este mensaje es programado por el bot de Maicol para invitarte a una visita para el proyecto villa hermosa me encuentro en la plaza de pocollay y estare hasta las 6 de la tarde podrias venir?";
const tiempoSeguimiento = 300000; // 5 minutos en milisegundos
const archivoClientes = "clientes.txt";

const clientsData = {}; // Objeto para almacenar datos de los clientes

const client = new Client({
  authStrategy: new LocalAuth(),
});

// Manejo del código QR para autenticación
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Código QR recibido. Escanéalo con WhatsApp.");
});

// Confirmación de que el bot está listo
client.on("ready", () => {
  console.log("El bot está listo");
});

// Responder a mensajes
client.on("message", async (msg) => {
  const { from, body } = msg;

  try {
    const clientData = clientsData[from] || {};
    console.log(clientData.name);
    if (clientData.name) {
      if (body.toLowerCase() === "hola") {
        await msg.reply(saludoInicial);
        return;
      }

      clientData.name = body;
      clientData.number = from;
      clientsData[from] = clientData;

      await msg.reply(
        "¡Gracias, ${clientData.name}! He guardado tu nombre y tu número."
      );

      // Guardar en archivo (opcional)
      fs.appendFile(
        archivoClientes,
        "${clientData.name},${clientData.number}\n",
        (err) => {
          if (err) {
            console.error("Error al guardar en archivo:", err);
          }
        }
      );

      // Programar mensaje de seguimiento
      setTimeout(async () => {
        await client.sendMessage(from, mensajeSeguimiento);
      }, tiempoSeguimiento);
    } else {
      switch (body.toLowerCase()) {
        case "1":
          // ... (aqui va la info de precios)
          break;
        case "2":
          // ... (código para enviar información de ubicación)
          break;
        // ... (otros casos)
        default:
          await msg.reply(
            "Opción no válida. Por favor, elige una opción válida."
          );
      }
    }
  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
    await msg.reply("Lo siento, hubo un error. Intenta nuevamente.");
  }
});

client.initialize();
