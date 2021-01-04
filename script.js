window.onload = () => {
  // any code will be written here gonna be executed after the full page loaded

  // get search input
  const searchInput = document.querySelector("#searchInput");

  // add key up event listener
  searchInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      // call search function here
      search();
    }
  });

  //get search button
  const searchBtn = document.querySelector("#searchBtn");

  // add click event on search button
  searchBtn.addEventListener("click", () => {
    // call search function here
    search();
  });

  const resultDiv = document.querySelector("#resultDiv");

  // get select color element
  const selectColor = document.querySelector("#colorSelect");
  // search function
  function search() {
    const keyWord = searchInput.value;
    const url =
      "https://pixabay.com/api/?key=12000491-41fc68d8c365df909e022ceb6&q=" +
      keyWord +
      (selectColor.value ? "&colors=" + selectColor.value : "");

    fetch(url)
      .then((response) => {
        // check response code
        if (response.status === 200) {
          // response.text().then(data => {
          //     console.log(data);
          // })
          response
            .json()
            .then((data) => {
              // data to deal with
              console.log(data.hits);
              let cardsElement = "";
              data.hits.forEach((hit) => {
                cardsElement += `<div class="card pr-1 col-md-3" >
                      <img class="card-img-top" src="${hit.previewURL}" alt="Card image cap">
                      <div class="card-body">
                          <h5 class="card-title">${hit.user}</h5>
                          <p class="card-text">${hit.tags}</p>
                          <a href="#" class="btn btn-primary" onclick="showModal('${hit.largeImageURL}')">Show</a>
                      </div>
                  </div>`;
              });
              resultDiv.innerHTML = cardsElement;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
/**
 * show image modal
 * @param {String} imageUrl
 */
function showModal(imageUrl) {
  $("#imageModal").modal("show");
  document.querySelector("#largImage").src = imageUrl;
}
