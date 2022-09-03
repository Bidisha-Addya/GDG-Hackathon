
window.onload = function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sharePosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
};

var cord; 

function sharePosition(position) {
  alert(
    "Latitude: " +
      position.coords.latitude +
      "<br>Longitude: " +
      position.coords.longitude + "<br>" + position
  );
}







































