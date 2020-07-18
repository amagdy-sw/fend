/* Global Variables */

//holds the temperature value we get from weather api
let tempInKelvin = 0;
//error flag for error handling
let errorFlag = false;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
const apikey = '&appid=25b00c590db39731c92ba851662212de';


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener("click", GetWebAPIData);

/* Function called by event listener */

/* Function to GET Web API Data*/
function GetWebAPIData(){
    const zip= document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const zipCode = `zip=${zip}`;
    const callURL = `${baseURL}${zipCode}${apikey}`;
    callWeatherAPI(callURL).then(function(data){
        //in case no error and temperature in kelvin is retrieved
        if(errorFlag === false){
          //using then to post data we recieve from weather api + user input and date to our server endpoint
          postData('/addentry', {temp: tempInKelvin, feeling : feelings, date: newDate})
          //using then to retrieve data from our server endpoint
          .then(function(data){
            getData('/all');
          });
        }
    });
}

//async functiom to GET weather api data
const callWeatherAPI = async (url)=>{
    const res = await fetch(url)
    try {
      const data = await res.json();
      //handle error response when zip code is invalid 
      if(data.cod === '404' || data.cod === '400'){
        //in case of error set json message of error to our "error" element
        document.getElementById('error').innerText = data.message;
        errorFlag = true;
      }else{ 
        //in case of success and no error is returned reset "error" element inner text
        document.getElementById('error').innerText = '';
        //read the temperature value from json
        tempInKelvin = data.main.temp;
        errorFlag = false;
      }
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
      document.getElementById('error').innerText = 'error in calling weather api';
      errorFlag = true;
    }
  }
  

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json'
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data)
    });
    return response.json();
  }

/* Function to GET Project Data */
const getData = async (url)=>{
    const res = await fetch(url)
    try {
      const data = await res.json();
      //fill our last entry elements from data we recieve from server endpoint
      document.getElementById('date').innerHTML = `<strong>Date:</strong> <em>${data.date}</em>`;
      document.getElementById('temp').innerHTML = `<strong>Temperature:</strong> ${data.temp} Kelvin`;
      document.getElementById('content').innerHTML = `<strong>Feelings:</strong> ${data.feeling}`;  
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
      document.getElementById('error').innerText = 'error in getting data from server endpoint';
      errorFlag = true;
    }
  }

