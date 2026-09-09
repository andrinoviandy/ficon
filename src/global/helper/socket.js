// import { io } from "socket.io-client";

// // const SOCKET_URL = "https://api-hub.ilcs.co.id"; // Ganti dengan URL backend
// const SOCKET_URL = "http://10.8.3.177:8443"; // Ganti dengan URL backend
// // const SOCKET_URL = "https://connect.ilcs.co.id"; // Ganti dengan URL backend
// // const SOCKET_URL = "http://localhost:3000"; // Ganti dengan URL backend

// const socket = io(SOCKET_URL, {
//     transports: ["websocket"], // Gunakan WebSocket untuk koneksi yang lebih cepat
//     reconnection: true,        // Aktifkan reconnection jika koneksi putus
//     reconnectionAttempts: 5,    // Coba reconnect maksimal 5 kali
//     reconnectionDelay: 2000,
// });
// // const socket = io(SOCKET_URL);

// export default socket;