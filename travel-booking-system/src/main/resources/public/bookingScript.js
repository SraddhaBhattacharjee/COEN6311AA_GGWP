const lightColors = [
  "#FFD9D9",
  "#FFD9FF",
  "#E6D9FF",
  "#D9E6FF",
  "#D9F2FF",
  "#D9FFFF",
  "#D9FFE6",
];

const seePackageBtn = document.getElementById("seePackage");
seePackageBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

const addUser = document.getElementById("addUser");
const createUser = document.getElementById("createUser");
const photoContainer = document.getElementById("container");
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
      .then((responseData) => {
        users.push(responseData);
        showUsers();
      });
  });
}

const users = [];
const getUsers = async () => {
  await fetch("http://localhost:8080/users")
    .then((response) => response.json())
    .then((json) => {
      for (let i = 0; i < json.length; i++) {
        users.push(json[i]);
      }
    });

  showUsers();
  devTest(users[0].id);
};
const selectUser = document.getElementById("selectUserFromDrop");
const showUsers = () => {
  if (selectUser) {
    selectUser.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
      const option = document.createElement("option");
      option.value = users[i].id;
      option.setAttribute("id", users[i].id);
      option.innerHTML = `${users[i].firstName} ${users[i].lastName}`;
      selectUser.appendChild(option);
    }
    selectUser.addEventListener("change", () => {
      const selectedUser = selectUser.options[selectUser.value].id;
      devTest(selectedUser);
    });
  }
};

const devTest = async (id) => {
  await fetch(`http://localhost:8080/bookings/${id}`)
    .then((response) => response.json())
    .then((json) => {
      displayPackages(json);
    });
};
getUsers();

const displayPackages = (packages) => {
    if(packages.length === 0) {
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
  titleElement01.innerHTML = `Departure Date: ${
    photo.departureDate.split("T")[0]
  }`;

  const titleElement02 = document.createElement("div");
  titleElement02.innerHTML = `Booked To: ${photo.customer.firstName} ${photo.customer.lastName}`;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  cardBody.appendChild(titleElement01);
  cardBody.appendChild(titleElement02);

  const titleElement = document.createElement("p");
  titleElement.innerHTML = photo.travelPackage.name;
  titleElement.classList.add("card-title");
  const imageElement = document.createElement("div");
  imageElement.classList.add("card-img-top");

  const i1 = document.createElement("i");
  i1.setAttribute("data-userId", photo.customer.id);
  i1.setAttribute("data-packageId", photo.travelPackage.id);
  i1.classList.add("fas");
  i1.classList.add("fa-edit");

  i1.addEventListener("click", editPackage);

  const i2 = document.createElement("i");
  i2.setAttribute("data-userId", photo.customer.id);
  i2.setAttribute("data-packageId", photo.travelPackage.id);
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
  card.classList.add("cd");
  card.style.width = "17rem";
  card.appendChild(imageElement);
  card.appendChild(cardBody);
  return card;
}

const deletePackage = (event) => {
  const userId = +event.target.getAttribute("data-userId");
  const packageId = +event.target.getAttribute("data-packageId");
  const data = {
    userId: userId,
    packageId: packageId,
  };
  fetch(`http://localhost:8080/bookings`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => devTest(users[0].id));
};
const editPackageEle = document.getElementById("editPackage");
const editPackage = (event) => {
    const id = event.target.parentNode.parentNode.id;
    fetch(`http://localhost:8080/bookings/book/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        editPackageEle.style.display = "block";
        photoContainer.style.opacity = "0.3";
  
        const p = document.getElementById("tt");
        p.innerHTML = "Edit Booking Package";

        const divEle = document.getElementById("bookingName");
        divEle.innerHTML = `Booking Package: ${json.travelPackage.name}`;

        const selectUser = document.getElementById("selectUserForBooking");
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
        const saveEditBooking = document.getElementById("saveEditBooking");
        saveEditBooking.addEventListener("click", () => {
            const selectedUser = selectUser.options[selectUser.value].id;
            const data = {
                id,
                userId: selectedUser,
                packageId: json.travelPackage.id,
            };
            fetch(`http://localhost:8080/bookings`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((response) => {
                editPackageEle.style.display = "none";
                photoContainer.style.opacity = "1";
                devTest(users[0].id);
            });
            
      });
  });
};

const reportBtn = document.getElementById("report");
reportBtn.addEventListener("click", () => {
  window.location.href = "report.html";
});
