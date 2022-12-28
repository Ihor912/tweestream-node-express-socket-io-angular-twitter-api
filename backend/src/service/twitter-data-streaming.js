import * as dotenv from "dotenv";
dotenv.config();
import httpClient from "./http/http-client.js";
import { SOCKET_ENDPOINTS } from "../service/socket/socket.endpoints.js";

const TOKEN = process.env.TWITTER_BEARER_TOKEN;
const rulesURL = process.env.RULES_URL;
const streamURL = process.env.STREAM_URL;

const bearerHeaders = {
  Authorization: `Bearer ${TOKEN}`,
};
const jsonHeaders = {
  "content-type": "application/json",
};

// Get stream rules
async function getRules() {
  return await httpClient.GET(rulesURL, bearerHeaders);
}

// Set stream rules
async function setRules(newRules) {
  const data = {
    add: newRules,
  };

  return await httpClient.POST(
    rulesURL,
    {
      ...jsonHeaders,
      ...bearerHeaders,
    },
    data
  );
}

// Delete stream rules
async function deleteRules(rules) {
  if (!Array.isArray(rules.data)) {
    return null;
  }

  const ids = rules.data.map((rule) => rule.id);

  const data = {
    delete: {
      ids,
    },
  };

  return await httpClient.POST(
    rulesURL,
    {
      ...jsonHeaders,
      ...bearerHeaders,
    },
    data
  );
}

// get tweets stream
async function streamTweets(socket) {
  const stream = httpClient.GET_STREAM(streamURL, {
    ...bearerHeaders,
  });

  stream.on(SOCKET_ENDPOINTS.newTweetServerEvent, (data) => {
    try {
      const json = JSON.parse(data);
      socket.emit(SOCKET_ENDPOINTS.newTweetClientEvent, json);
    } catch (error) {}
  });

  return stream;
}

export default { getRules, setRules, deleteRules, streamTweets };
