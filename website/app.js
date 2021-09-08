/* Global Variables */

// select our element
const htmlBtn = document.getElementById('generate');
const htmlEntry = document.getElementById("entry");
const htmlDate = document.getElementById("date");
const htmlCity = document.getElementById("city");
const htmlTemp = document.getElementById("myTemp");
const htmlFeel = document.getElementById("feeling");

// Create a new date instance dynamically with JS
let mDate = new Date();
let myDate = mDate.toDateString();

// the url to retreive weather info
const mainUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API key
// units=metric for celsius temp
const myKey = ",&appid=8f080f38af862779a9bcf7ae827b1afc&units=metric"

// our server
const ourServer = "http://localhost:8000";

// error for user
const err = document.getElementById("err");

// Generate Data

const generateOurData=() => {
  const myZip = document.getElementById("zip").value;
  const myFeel = document.getElementById("feel").value;

  ourWeatherData(myZip)
  .then((data)=>{
      const { main: { temp }, name: myCity,} = data;
      const inf = {myDate, myCity, myTemp: Math.round(temp), myFeel,};
      postNewData(ourServer+"/addData", inf);
      myUi();
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
htmlBtn.addEventListener('click', generateOurData);


// function to get API data
const ourWeatherData = async (myZip) => {
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
const myUi = async (res, dataSaved) => {
    res = await fetch(ourServer + "/allData");
    dataSaved = await res.json();
    htmlDate.innerHTML = dataSaved.myDate;
    htmlCity.innerHTML = dataSaved.myCity;
    htmlTemp.innerHTML = dataSaved.myTemp + "&degC";
    htmlFeel.innerHTML = dataSaved.myFeel;
    htmlEntry.style.opacity = 1;
};