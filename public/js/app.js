const highlightCurrentPage = () => {
  let current = 0;
  for (let i = 0; i < document.links.length; i++) {
    if (document.links[i].href === document.URL) {
      current = i;
    }
  }
  document.links[current].className = 'current';
};

window.addEventListener('load', () => {
  highlightCurrentPage();
});

function initMap(markerCoords, locationName) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 52.187106, lng: 19.006313 },
    zoom: 2,
  });

  new google.maps.Marker({
    position: markerCoords,
    map: map,
    title: locationName,
  });
}

initMap();

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  await fetch(`/weather?search=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;

        initMap({ lat: data.coords.latitude, lng: data.coords.longitude }, data.location);
      }
    });
  });
});
