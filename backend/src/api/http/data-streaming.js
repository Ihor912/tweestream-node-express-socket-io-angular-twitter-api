import dStreaming from "../../service/twitter-data-streaming.js";
import handleError from "../../service/http/error-handler.js";
import { API_ENDPOINTS } from "../../service/http/api.endpoints.js";

export default (app) => {
  app.get(API_ENDPOINTS.getRules, async (req, res) => {
    try {
      const currentRules = await dStreaming.getRules();
      if (!currentRules.data || !currentRules.data.length) {
        const defaultRules = [{ value: "world" }];
        await dStreaming.setRules(defaultRules);
        await res.status(200).json({ rules: defaultRules });
      } else {
        await res.status(200).json({ rules: currentRules });
      }
    } catch (error) {
      handleError(error, res);
    }
  });

  app.post(API_ENDPOINTS.setRules, async (req, res) => {
    try {
      // Get all existing stream rules
      const currentRules = await dStreaming.getRules();
      // Before set new rules - Delete all existing stream rules
      await dStreaming.deleteRules(currentRules);

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
