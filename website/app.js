/* Global Variables */

// const { json } = require("stream/consumers");

// Create a new date instance dynamically with JS
let mDate = new Date();
let myDate = mDate.toDateString();

// the url to retreive weather info
const mainUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API key
// units=metric for celsius temp
const myKey = ",&appid=8f080f38af862779a9bcf7ae827b1afc&units=metric"

// our server
const myServer = "http://localhost:8000";

// error for user
const err = document.getElementById("err");

// Generate Data

const generateOurData=() => {
  const myZip = document.getElementById("zip").value;
  const feel = document.getElementById("feel").value;

  weatherData(myZip)
  .then((data)=>{
    if (data) {
      const {
        main: { temp },
        name: city,
        // weather: [{ description }],
      }= data;

      const inf = {
        myDate,
        city,
        temp: Math.round(temp),
        feel,
      };

      postNewData(myServer+"/add", inf);
      updateMyUi();
      document.getElementById("entry").style.opacity = 1;
    }
  })
};

// Function to post data
const postNewData = async (url = "", inf = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(inf),
  });

  try{
    const newData = await res.json();
    console.log("you just saved ", newData);
    return newData;
  }catch(error){
    console.log(error);
  }
};

// btn event
document.getElementById('generate').addEventListener('click', generateOurData);

// function to get API data
const weatherData = async (myZip) => {
  try{
    const res = await fetch(mainUrl+myZip+myKey);
    const data = await res.json();

    if(data.cod != 200) {
      err.innerHTML = data.message;
      setTimeout(_=> err.innerHTML = '', 2000)
      throw '${data.message}';
    }
    return data ;
  }catch (error){
    console.log(error);
  }
};

// Function to get data and update ui
const updateMyUi = async () => {
  const res = await fetch(myServer+ "/all");
  try{
    const dataSaved = await res.json();

    document.getElementById("date").innerHTML = dataSaved.myDate;
    document.getElementById("city").innerHTML = dataSaved.city;
    // document.getElementById("descrip").innerHTML = dataSaved.description;
    document.getElementById("myTemp").innerHTML = dataSaved.temp + "&degC";
    document.getElementById("feeling").innerHTML = dataSaved.feel;
  }catch(error){
    console.log(error);
  }
};