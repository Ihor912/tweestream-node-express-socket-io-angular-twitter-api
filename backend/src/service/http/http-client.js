import needle from "needle";

async function GET(url, headers) {
  const response = await needle("get", url, {
    headers,
  });

  return response.body;
}

async function POST(url, headers, body) {
  const response = await needle("post", url, body, {
    headers,
  });

  return response.body;
}

function GET_STREAM(url, headers) {
  return needle.get(url, {
    headers,
  });
}

export default { GET, POST, GET_STREAM };
