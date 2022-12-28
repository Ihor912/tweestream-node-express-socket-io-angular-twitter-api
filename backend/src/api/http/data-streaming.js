import * as url from "url";
import dStreaming from "../../service/twitter-data-streaming.js";
import handleError from "../../service/http/error-handler.js";
import { API_ENDPOINTS } from "../../service/http/api.endpoints.js";

export default (app) => {
  app.post(API_ENDPOINTS.setRules, async (req, res) => {
    try {
      await dStreaming.setRules(req.body?.rules);
      await res.status(200).json({ status: "OK" });
    } catch (error) {
      handleError(error, res);
    }
  });

  app.delete(API_ENDPOINTS.deleteRules, async (req, res) => {
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
};
