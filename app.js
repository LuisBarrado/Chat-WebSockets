// Importamos los módulos necesarios
import { createServer } from "http";
import { Server } from "socket.io";
// HAY QUE CREAR ESTA CONSTANTE PARA QUE
// LEA EL PUERTO POR EL QUE SALE EL SERVIDOR   


// Creamos un servidor HTTP
const server = createServer((req, res) => {
    // Cuando se recibe una solicitud, respondemos con un estado 200 y un mensaje
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Chat en tiempo real!\n");
});

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
// Cuando un cliente se conecta al servidor...
io.on("connection", (socket) => {
    console.log("Usuario conectado!");
    // Cuando ese cliente envía un mensaje de chat...
    socket.on("Mensaje de chat", (msg) => {
        // Emitimos ese mensaje a todos los clientes conectados
        io.emit("Mensaje de chat", msg);
        console.log("Mensaje de chat: " + msg);
    });
    // Cuando ese cliente se desconecta...
    socket.on("Desconectado!", () => {
        console.log("Usuario desconectado!");
    });
});

const PORT = process.env.PORT || 3000;

// USAMOS ESTE ESCUCHADOR DEL SERVIDOR PARA MODO ONLINE
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); 
});
export default { server, io };