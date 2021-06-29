
let markArray = [];

async function markers() {
  let locations = await getBusLocations();
  let i = 0;
  locations.forEach(() => {
    let markerEl = document.createElement("div");
    markerEl.id = `marker${i}`;
    markerEl.className = "marker";
    let markersDiv = document.getElementById("markers");
    markersDiv.appendChild(markerEl);
    
     let marker = new mapboxgl.Marker(markerEl)
        .setLngLat(locations[i])
        .addTo(map);
      
      markArray.push(marker);
      i++;
      console.log(markerEl);
  });
    
}
markers();

function checkForNewBuses(locations) {
  if(markArray.length !== locations.length){
    location.reload;
    } else {
    return;
  }
}

function moveMarkers(locations) {
  for(let i = 0; i < markArray.length; i++){
    markArray[i].setLngLat(locations[i]);
  }
}

async function run(){
  const locations = await getBusLocations();
  checkForNewBuses(locations);
  

  moveMarkers(locations);

  setTimeout(run, 15000);
}



// Request bus data from MBTA
async function getBusLocations(){
  //url for fetch already filtered to only Route 1 buses in MBTA
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    const data = await json.data;
    let currentLocations = [];
    await data.forEach((item) => {
      currentLocations.push([item.attributes.longitude, item.attributes.latitude]);
    });
    return currentLocations;
}


window.onload = (event) => {
  run();
};