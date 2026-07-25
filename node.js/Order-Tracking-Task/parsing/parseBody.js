const { sendJson } = require('./sendJson');

async function parseBody(req, res) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        sendJson(res, 400, { error: "Invalid JSON", message: err.message });
        reject(err);
      }
    });
  });
}

module.exports = { parseBody };
