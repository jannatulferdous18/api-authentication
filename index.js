import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

app.use(express.static("public"));

const myUsername = "jackbauerM";
const myPassword = "iLovewebdev12";
const myAPIKey = "35a0d440-297d-415e-96cd-fb3f7bbdf1b9";
const myBearerToken = "57914fa4-565e-415e-8729-57d29bfebafe";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}random`);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/basicAuth", async(req, res) => {
  const response = await axios.get(`${API_URL}all?page=2`, {
      auth: {
        username: myUsername,
        password: myPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
});

app.get("/apiKey", async(req, res) => {
  try {
    const response = await axios.get(`${API_URL}filter`, {
      params:{
        score: 5,
        'apiKey' : myAPIKey
      }
    });
    res.render("index.ejs", { content: JSON.stringify(response.data)});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

const config = {
  headers: { Authorization: `Bearer ${myBearerToken}`},
};

app.get("/bearerToken", async(req, res) => {
  try {
    const response = await axios.get(`${API_URL}secrets/2`, config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
      res.status(404).send("Error:", error.message);
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
