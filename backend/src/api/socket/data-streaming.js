import { Server } from "socket.io";
import dStreaming from "../../service/twitter-data-streaming.js";

export default (server) => {
  const io = new Server(server);

  io.on("connection", async () => {
    console.log("Client connected...");

    const defaultRules = [{ value: "world" }];

    try {
      await dStreaming.setRules(defaultRules);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

    const filteredStream = await dStreaming.streamTweets(io);
    filteredStream.on("timeout", async () => {
      // Reconnect on error
      console.warn("A connection error occurred. Reconnecting…");
      await dStreaming.streamTweets(io);
    });
  });
};
