const loadPage = () => {
  devTest();
};
const users = [];
const getUsers = async () => {
  await fetch("http://localhost:8080/users")
    .then((response) => response.json())
    .then((json) => {
      for (let i = 0; i < json.length; i++) {
        users.push(json[i]);
      }
    });
};

getUsers();

const lightColors = [
  "#FFD9D9",
  "#FFD9FF",
  "#E6D9FF",
  "#D9E6FF",
  "#D9F2FF",
  "#D9FFFF",
  "#D9FFE6",
];
document.addEventListener("DOMContentLoaded", loadPage);

const devTest = async () => {
  await fetch("http://localhost:8080/packages")
    .then((response) => response.json())
    .then((json) => {
      displayPackages(json);
    });
};
const photoContainer = document.getElementById("container");
const displayPackages = (packages) => {
  if (packages.length === 0) {
    photoContainer.innerHTML = "No Package Booked";
    return;
  }
  photoContainer.innerHTML = "";
  for (let i = 0; i < packages.length; i++) {
    photoContainer.appendChild(createPhotoContainer(packages[i]));
  }
};

function createPhotoContainer(photo) {
  const titleElement01 = document.createElement("div");
  titleElement01.innerHTML = `Number of Days: ${photo.numberOfDays}`;

  const titleElement02 = document.createElement("div");
  titleElement02.innerHTML = `Number of Nights: ${photo.numberOfNights}`;

  const titleElement03 = document.createElement("b");
  titleElement03.innerHTML = photo.hotelName;

  const titleElement04 = document.createElement("div");
  titleElement04.innerHTML = `${photo.destinationCity}, ${photo.destinationCountry}`;

  const titleElement05 = document.createElement("div");
  titleElement05.innerHTML = `Price: ${photo.price} CAD`;
  const button = document.createElement("button");
  button.innerHTML = "Book Now";
  button.classList.add("btn");
  button.classList.add("btn-primary");
  button.classList.add("btn-block");
  button.addEventListener("click", assignUserToPackage);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  cardBody.appendChild(titleElement03);
  cardBody.appendChild(titleElement01);
  cardBody.appendChild(titleElement02);
  cardBody.appendChild(titleElement04);
  cardBody.appendChild(titleElement05);
  cardBody.appendChild(button);

  const titleElement = document.createElement("p");
  titleElement.innerHTML = photo.name;
  titleElement.classList.add("card-title");
  const imageElement = document.createElement("div");
  imageElement.classList.add("card-img-top");

  const i1 = document.createElement("i");
  i1.setAttribute("id", "edit");
  i1.classList.add("fas");
  i1.classList.add("fa-edit");

  i1.addEventListener("click", editPackage);

  const i2 = document.createElement("i");
  i2.setAttribute("id", "delete");
  i2.classList.add("fas");
  i2.classList.add("fa-trash");

  i2.addEventListener("click", deletePackage);

  imageElement.appendChild(titleElement);
  imageElement.appendChild(i1);
  imageElement.appendChild(i2);
  imageElement.style.backgroundColor =
    lightColors[Math.floor(Math.random() * lightColors.length)];

  const card = document.createElement("div");
  card.setAttribute("id", photo.id);
  card.classList.add("card");
  card.style.width = "17rem";
  card.appendChild(imageElement);
  card.appendChild(cardBody);
  return card;
}

const addPackage = document.getElementById("addPackage");
const createPackage = document.getElementById("createPackage");
addPackage.addEventListener("click", () => {
  createPackage.style.display = "block";
  photoContainer.style.opacity = "0.3";
});

const newPackage = document.getElementById("newPackage");
if (newPackage) {
  newPackage.addEventListener("click", (e) => {
    createPackage.style.display = "none";
    photoContainer.style.opacity = "1";

    const p1 = document.getElementById("p1").value;
    const p2 = document.getElementById("p2").value;
    const p3 = document.getElementById("p3").value;
    const p4 = document.getElementById("p4").value;
    const p5 = document.getElementById("p5").value;
    const p6 = document.getElementById("p6").value;
    const p7 = document.getElementById("p7").value;

    const data = {
      name: p1,
      hotelName: p2,
      numberOfDays: p3,
      numberOfNights: p4,
      destinationCity: p5,
      destinationCountry: p6,
      price: p7,
    };

    const id = e.target.getAttribute("data-editable");
    if (id) {
      data.id = id;
      fetch(`http://localhost:8080/packages`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => devTest());
      return;
    }

    fetch("http://localhost:8080/packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        devTest();
      });
  });
}

const addUser = document.getElementById("addUser");
const createUser = document.getElementById("createUser");
addUser.addEventListener("click", () => {
  createUser.style.display = "block";
  photoContainer.style.opacity = "0.3";
});

const newUser = document.getElementById("newUser");
if (newUser) {
  newUser.addEventListener("click", () => {
    createUser.style.display = "none";
    photoContainer.style.opacity = "1";

    const u1 = document.getElementById("u1");
    const u2 = document.getElementById("u2");
    const u3 = document.getElementById("u3");
    const u4 = document.getElementById("u4");

    const data = {
      firstName: u1.value,
      lastName: u2.value,
      dateOfBirth: u3.value,
      email: u4.value,
    };
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => users.push(responseData));
  });
}

const deletePackage = (event) => {
  const id = event.target.parentNode.parentNode.id;
  fetch(`http://localhost:8080/packages/${id}`, {
    method: "DELETE",
  }).then((response) => devTest());
};

const editPackage = (event) => {
  const id = event.target.parentNode.parentNode.id;
  fetch(`http://localhost:8080/packages/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => {
      createPackage.style.display = "block";
      photoContainer.style.opacity = "0.3";

      const p = document.getElementById("tt");
      p.innerHTML = "Edit Travel Package";

      const btn = document.getElementById("newPackage");
      btn.innerHTML = "Edit Package";
      btn.setAttribute("data-editable", id);

      const p1 = document.getElementById("p1");
      p1.value = json.name;
      const p2 = document.getElementById("p2");
      p2.value = json.hotelName;
      const p3 = document.getElementById("p3");
      p3.value = json.numberOfDays;
      const p4 = document.getElementById("p4");
      p4.value = json.numberOfNights;
      const p5 = document.getElementById("p5");
      p5.value = json.destinationCity;
      const p6 = document.getElementById("p6");
      p6.value = json.destinationCountry;
      const p7 = document.getElementById("p7");
      p7.value = json.price;
    });
};

const assignUserToPackage = (event) => {
  const id = event.target.parentNode.parentNode.id;
  fetch(`http://localhost:8080/packages/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => {
      assignUser.style.display = "block";
      photoContainer.style.opacity = "0.3";
      document.getElementById("packageName").innerHTML = "Name: " + json.name;
      const selectUser = document.getElementById("selectUser");
      if (selectUser) {
        selectUser.innerHTML = "";
        for (let i = 0; i < users.length; i++) {
          const option = document.createElement("option");
          option.value = users[i].id;
          option.setAttribute("id", users[i].id);
          option.innerHTML = `${users[i].firstName} ${users[i].lastName}`;
          selectUser.appendChild(option);
        }
      }
      const assUser = document.getElementById("assignUserNow");
      assUser.setAttribute("data-id", id);
      assUser.setAttribute("data-user", selectUser.value);
    });
};

const assignUser = document.getElementById("assignUser");
const assignUserNow = document.getElementById("assignUserNow");
assignUserNow.addEventListener("click", (e) => {
  assignUser.style.display = "none";
  photoContainer.style.opacity = "1";
  const a3 = document.getElementById("a3");
  const id = e.target.getAttribute("data-id");
  const user = document.getElementById("selectUser").value;
  if (id && user && a3.value) {
    console.log(id.selectUser);
    const data = {
      packageId: id,
      userId: user,
      departureDate: a3.value,
    };
    fetch("http://localhost:8080/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => console.log(responseData));
  }
});

const bookingBtn = document.getElementById("booking");
bookingBtn.addEventListener("click", () => {
  window.location.href = "booking.html";
});

const reportBtn = document.getElementById("report");
reportBtn.addEventListener("click", () => {
  window.location.href = "report.html";
});
