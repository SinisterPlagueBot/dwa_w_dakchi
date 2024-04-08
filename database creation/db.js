const axios = require("axios");
const mongoose = require("mongoose");
const Medicament = require("./medicModel");
const defaultMedics = require("./medicsList");
const uri = "mongodb://127.0.0.1:27017/medics";
const GOOGLE_API = "AIzaSyBVQL5guWFv7Bzy0BniXYfiV9l42psR-uo";
const CX = "541f575d4841340e1";

async function fetchData() {
  try {
    await mongoose.connect(uri);
    console.log(`mongoDb server connected`);

    for (let medic of defaultMedics) {
      const options = {
        method: "GET",
        url: "https://drug-info-and-price-history.p.rapidapi.com/1/druginfo",
        params: { drug: medic },
        headers: {
          "X-RapidAPI-Key":
            "5c884fb3a6mshd59364a1537d559p104b93jsnb9c83f0f7aaa",
          "X-RapidAPI-Host": "drug-info-and-price-history.p.rapidapi.com",
        },
      };

      const responseImg = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API}&cx=${CX}&q=${medic}&searchType=image`
      );
      const imageLink = responseImg.data.items[0].link;

      const responseInfo = await axios.request(options);

      const medicamentData = new Medicament({
        name: medic,
        image_url: imageLink,
        info: responseInfo.data[0],
      });

      await medicamentData.save();
    }
  } catch (e) {
    console.log("Error:", e);
  }
}

fetchData();
