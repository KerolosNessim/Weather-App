let searchInput = document.getElementById("searchInput");
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let monthes =["January","February","March","April","May","June","July","August","September","October","November","December"];
let day = new Date().getDay();
let monthe = new Date().getMonth();
let date = new Date().getDate();
searchInput.addEventListener('keyup', function () {
    getData(searchInput.value);
})
// function to get data
async function getData(city) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=99deb9c908b54f9f93d155505242304&q=${city}&days=3`);
    let {current,location,forecast}  = await res.json();
    // console.log(current, location, forecast);
  displayCurrent(current,location.name)
  displayNext(forecast.forecastday[1])
  displayAfterNext(forecast.forecastday[2])
}
getData("cairo")
// function to display current day
function displayCurrent(current,city) {
  let cartona = ``;  
  cartona += `
    <div
              class="header rounded-top-3 drakColor d-flex justify-content-between p-2"
            >
              <span id="currentDay">${days[day]}</span>
              <span id="currentDate">${date}${monthes[monthe]}</span>
            </div>
            <div class="body rounded-bottom-3 lightColor px-2 py-4">
              <p id="currentCity">${city}</p>
              <div class="row justify-content-between align-items-center">
              <div class="col-8 ">
                <h3 id="currentTemp" class="text-white">${current.temp_c}<sup>o</sup>C</h3>
              </div>
               <div class="col-4">
                <img id="currentImg" class="w-50" src=${current.condition.icon}  />
               </div>
              </div>
              <span id="currentStatues" class="text-info">${current.condition.text}</span>
              <div class="d-flex align-items-center mt-3">
                <div class="d-flex align-items-center me-3">
                  <img src="./images/icon-umberella@2x.png" class="me-2" />
                  <span id="humidity">${current.humidity}%</span>
                </div>
                <div class="d-flex align-items-center me-3">
                  <img src="./images/icon-wind@2x.png" class="me-2" />
                  <span id="wind">${current.wind_kph}Kph</span>
                </div>
                <div class="d-flex align-items-center me-3">
                  <img src="./images/icon-compass@2x.png" class="me-2" />
                  <span id="windDirection">${current.wind_dir}</span>
                </div>
              </div>
            </div>
    `
    document.getElementById('currentCard').innerHTML=cartona
}
// function to display after next day
function displayNext(next) {
  let nextDate = new Date(next.date).getDay();
  let cartona = ``;
  cartona += `
   <div class="header rounded-top-3 lightColor py-2">
              <span id="nextDay">${days[nextDate]}</span>
            </div>
            <div class="body rounded-bottom-3 drakColor py-5 px-2">
              <img id="nextDayImg"  src=${next.day.condition.icon} />
              <h4 id="nextDayMax" class="text-white fw-bold fs-2">${next.day.maxtemp_c}<sup>o</sup>C </h4>
              <p id="nextDayMin">${next.day.mintemp_c}<sup>o</sup>C</p>
              <span id="nextDayStatues" class="text-info">${next.day.condition.text}</span>
            </div>
  `
  document.getElementById('nextCard').innerHTML = cartona;
}
// function to display after next day
function displayAfterNext(afterNext) {
  let afterNextDate = new Date(afterNext.date).getDay();
  let cartona = ``;
  cartona += `
   <div class="header rounded-top-3 lightColor py-2">
              <span id="nextDay">${days[afterNextDate]}</span>
            </div>
            <div class="body rounded-bottom-3 drakColor py-5 px-2">
              <img id="nextDayImg"  src=${afterNext.day.condition.icon} />
              <h4 id="nextDayMax" class="text-white fw-bold fs-2">${afterNext.day.maxtemp_c}<sup>o</sup>C </h4>
              <p id="nextDayMin">${afterNext.day.mintemp_c}<sup>o</sup>C</p>
              <span id="nextDayStatues" class="text-info">${afterNext.day.condition.text}</span>
            </div>
  `
  document.getElementById('afterNextCard').innerHTML = cartona;
}