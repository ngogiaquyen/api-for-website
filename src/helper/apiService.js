const BASE_URL = "https://ngogiaquyen.id.vn/server/";
// const BASE_URL = "http://localhost/my-profile/server/";

console.log("base: " + BASE_URL);

const getData = async (endpoint, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}${queryString ? '?' + queryString : ''}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postData = async (endpoint, payload) => {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  } 
};

// Export module CommonJS
module.exports = {
  BASE_URL,
  getData,
  postData
};
