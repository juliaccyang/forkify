//goal of this file: store the functions that are reused frequently by us
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          //the fucking 's' you forgot to add:) dumb ass ju:)
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    //API return the data we just send
    const data = await res.json();
    //console.log(res, data);
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);
    return data;
  } catch (err) {
    //rethrow the error
    throw err;
  }
};

/* export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    //console.log(res, data);
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);
    return data;
  } catch (err) {
    //rethrow the error
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      //the fucking 's' you forgot to add:) dumb ass ju:)
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    //API return the data we just send
    const data = await res.json();
    //console.log(res, data);
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);
    return data;
  } catch (err) {
    //rethrow the error
    throw err;
  }
};
 */
