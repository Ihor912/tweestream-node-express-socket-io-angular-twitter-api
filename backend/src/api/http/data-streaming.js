import path from "path";
import * as url from "url";
import dStreaming from "../../service/twitter-data-streaming.js";
import handleError from "../../service/http/error-handler.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default (app) => {
  app.post("/api/setRules", async (req, res) => {
    try {
      await dStreaming.setRules(req.body?.rules);
      await res.status(200).json({ status: "OK" });
    } catch (error) {
      handleError(error, res);
    }
  });

  app.post("/api/deleteRules", async (req, res) => {
    try {
      //   Get all stream rules
      const currentRules = await dStreaming.getRules();
      // Delete all stream rules
      await dStreaming.deleteRules(currentRules);
      await res.status(200).json({ status: "OK" });
    } catch (error) {
      handleError(error, res);
    }
  });

  app.get("/", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../../../backend", "client", "index.html")
    );
  });
};
