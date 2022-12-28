import { Server } from "socket.io";
import * as dotenv from "dotenv";
dotenv.config();
import dStreaming from "../../service/twitter-data-streaming.js";
import { SOCKET_ENDPOINTS } from "../../service/socket/socket.endpoints.js";

export default (server) => {
  const io = new Server(server, {
    cors: {
      origins: [process.env.SOCKET_CONNECTION_CORS_ORIGIN],
    },
  });

  io.on(SOCKET_ENDPOINTS.dataStreamConnectionEvent, async (socket) => {
    console.log("Client connected.");

    const defaultRules = [{ value: "world" }];

    try {
      await dStreaming.setRules(defaultRules);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

    const filteredStream = await dStreaming.streamTweets(io);
    filteredStream.on(SOCKET_ENDPOINTS.dataStreamTimeoutEvent, async () => {
      // Reconnect on error
      console.warn("A connection error occurred. Reconnecting…");
      await dStreaming.streamTweets(io);
    });

    socket.on(SOCKET_ENDPOINTS.clientDisconnectEvent, () => {
      console.log("Client disconnected");
    });
  });
};
