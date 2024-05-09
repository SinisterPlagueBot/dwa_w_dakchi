import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const API_URL = "http://127.0.0.1:5000";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/submit_diabetes", async (req, res) => {
  const formData = req.body;
  console.log(formData);
  try {
    const response = await axios.post(API_URL + "/predict_diabetes", formData);
    console.log(response.data);
    res.render("response_diabetes.ejs", {
      data: response.data.diabetes_prediction,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/submit_covid", async (req, res) => {
  const formData = req.body;
  console.log(formData);
  try {
    const response = await axios.post(API_URL + "/predict_covid", formData);
    console.log(response.data);
    res.render("response_covid.ejs", {
      data: response.data.covid_prediction,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
