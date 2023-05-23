const travelEle = document.getElementById("travel");
travelEle.addEventListener("click", () => {
  window.location.href = "index.html";
});


const bookingEle = document.getElementById("booking");
bookingEle.addEventListener("click", () => {
  window.location.href = "booking.html";
});

const lightColors = [
    "#FFD9D9",
    "#FFD9FF",
    "#E6D9FF",
    "#D9E6FF",
    "#D9F2FF",
    "#D9FFFF",
    "#D9FFE6",
  ];
  

  const loadPage = async () => {
    await fetch("http://localhost:8080/packages/reports")
      .then((response) => response.json())
      .then((json) => {
        displayPackages(json);
      });
  };

  document.addEventListener("DOMContentLoaded", loadPage);

  const photoContainer = document.getElementById("container");

  const displayPackages = (packages) => {
    photoContainer.innerHTML = "";
    for (let i = 0; i < packages.length; i++) {
      photoContainer.appendChild(createPhotoContainer(packages[i]));
    }
  };

  function createPhotoContainer(photo) {
    const titleElement01 = document.createElement("div");
    titleElement01.innerHTML = `Number of Bookings: ${photo.numBookings}`;
  
    const titleElement04 = document.createElement("div");
    titleElement04.innerHTML = `${photo.destinationCity}, ${photo.destinationCountry}`;
  
    const titleElement05 = document.createElement("div");
    titleElement05.innerHTML = `Total Revenue: ${photo.totalRevenue} CAD`;
  
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    cardBody.appendChild(titleElement01);
    cardBody.appendChild(titleElement04);
    cardBody.appendChild(titleElement05);
  
    const titleElement = document.createElement("p");
    titleElement.innerHTML = photo.name;
    titleElement.classList.add("card-title");
    const imageElement = document.createElement("div");
    imageElement.classList.add("card-img-top");
  
    imageElement.appendChild(titleElement);
    imageElement.style.backgroundColor =
      lightColors[Math.floor(Math.random() * lightColors.length)];
  
    const card = document.createElement("div");
    card.setAttribute("id", photo.id);
    card.classList.add("card");
    card.classList.add("ca");
    card.style.width = "17rem";
    card.appendChild(imageElement);
    card.appendChild(cardBody);
    return card;
  }
