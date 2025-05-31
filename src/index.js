let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => {
    const collection = document.getElementById("toy-collection")
    data.forEach(toy => {
      const newToy = document.createElement("div");
      newToy.className = "card";

      const toyName = document.createElement("h2");
      toyName.textContent = toy.name; // Accesses the 'name' property of the toy object
      newToy.appendChild(toyName);

      const toyImg = document.createElement("img");
      toyImg.src = toy.image;
      toyImg.className = "toy-avatar";
      newToy.appendChild(toyImg);
      

      const toyLikes = document.createElement("p");
      toyLikes.textContent = `${toy.likes} Likes`;
      newToy.appendChild(toyLikes);

      const toyBtn = document.createElement("button");
      toyBtn.className = "like-btn";
      toyBtn.id = toy.id;
      toyBtn.textContent = "Like ❤️";
      newToy.appendChild(toyBtn);

      collection.appendChild(newToy);
    });
  });
}) 


document.getElementById("new-toy-btn").addEventListener("click", () => {
fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
     "Content-Type": "application/json",
     Accept: "application/json"
  },
  body: JSON.stringify({
    name: "Jessie",
    image: "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    "likes": 0
  })
}).then(res => {
  return res.json()
  })
.then(data => {
  const nwToy = document.createElement("div");
  nwToy.className = "card";
  collection.appendChild(nwToy);
})
.catch(error => console.log("ERROR"))
})


const IncreaseLikes = document.querySelectorAll(".toy-btn")
IncreaseLikes.forEach(button => {
  button.addEventListener("click", handleLikeButtonClick);
});

  
function handleLikeButtonClick(e){
  const button = e.target;
  const toyCard = button.closest(".card");
  const toyId = toyCard.dataset.id;
  const likesElmt = toyCard.querySelector("like")
  const currentLikes = parseInt(likesElmt.textContent)

  const newNumberOfLikes = currentLikes + 1;

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: newNumberOfLikes })
  })
  .then(response => response.json())
  .then(data => {
    likesElmt.textContent = `Likes: ${data.likes}`;

    return {toyId, currentLikes};
  })

  .catch(error => console.error("ERROR:", error));
}