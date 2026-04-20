import https from "https";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.TUYA_CLIENT_ID;
const CLIENT_SECRET = process.env.TUYA_CLIENT_SECRET;
const HOST = process.env.TUYA_BASE_HOST;
const DEVICE_ID = process.env.DEVICE_ID;

const EMPTY_HASH =
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

function sign({ t, method, path, token }) {
  const str = token
    ? CLIENT_ID + token + t + `${method}\n${EMPTY_HASH}\n\n${path}`
    : CLIENT_ID + t + `${method}\n${EMPTY_HASH}\n\n${path}`;

  return crypto
    .createHmac("sha256", CLIENT_SECRET)
    .update(str)
    .digest("hex")
    .toUpperCase();
}

export function getToken() {
  return new Promise((resolve, reject) => {
    const t = Date.now().toString();
    const path = "/v1.0/token?grant_type=1";

    const options = {
      hostname: HOST,
      path,
      method: "GET",
      headers: {
        client_id: CLIENT_ID,
        sign_method: "HMAC-SHA256",
        t,
        sign: sign({ t, method: "GET", path })
      }
    };

    https.get(options, res => {
      let data = "";
      res.on("data", d => (data += d));
      res.on("end", () => {
        const json = JSON.parse(data);
        if (!json.success) return reject(json);
        resolve(json.result.access_token);
      });
    }).on("error", reject);
  });
}

export function getDeviceStatus(token) {
  return new Promise((resolve, reject) => {
    const t = Date.now().toString();
    const path = `/v1.0/iot-03/devices/${DEVICE_ID}/status`;

    const options = {
      hostname: HOST,
      path,
      method: "GET",
      headers: {
        client_id: CLIENT_ID,
        access_token: token,
        sign_method: "HMAC-SHA256",
        t,
        sign: sign({ t, method: "GET", path, token })
      }
    };

    https.get(options, res => {
      let data = "";
      res.on("data", d => (data += d));
      res.on("end", () => {
        const json = JSON.parse(data);
        if (!json.success) return reject(json);
        resolve(json.result);
      });
    }).on("error", reject);
  });
}