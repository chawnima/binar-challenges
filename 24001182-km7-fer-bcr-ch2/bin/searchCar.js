const tanggal = document.getElementById("tanggal");
const jumlahPenumpang = document.getElementById("jumlah-penumpang");
const submitBtn = document.getElementById("submit");
const searchForm = document.getElementById("search-form");
const output = document.getElementById("output");

const randomDate = (start, end) => {
  return new Date(+start + Math.random() * (end - start));
};

const renderData = (data) => {
  output.innerHTML += `
      <div class="card col-md-4 p-3" style="width: 18rem;">
        <img src="${data.image}" class="card-img-top img-fluid object-fit-cover border rounded card-img" alt="...">
        <div class="card-body gap-3">
          <h5 class="card-title">${data.type}</h5>
          <h4>Rp. ${data.rentPerDay} / hari</h1>
          <p class="card-text">${data.description}</p>
          <div class="container row gap-2 align-items-center justify-content-center mb-2">
            <div class="col-3">
              <img class="img-fluid" src="../assets/available-calendar-date-svgrepo-com.svg">
            </div>
            <p class="col-8 m-0">Tersedia ${new Date(data.availableAt).toLocaleDateString()}</p>
          </div>
          <div class="container row gap-2 align-items-center justify-content-center mb-2">
            <div class="col-3">
              <img class="img-fluid" src="../assets/group-svgrepo-com.svg">
            </div>
            <p class="col-8 m-0">${data.capacity} orang</p>
          </div>
          <div class="container row gap-2 align-items-center justify-content-center mb-2">
            <div class="col-3">
              <img class="img-fluid" src="../assets/setting-svgrepo-com.svg">
            </div>
            <p class="col-8 m-0">${data.transmission}</p>
          </div>
          <div class="container row gap-2 align-items-center justify-content-center mb-2">
            <div class="col-3">
              <img class="img-fluid" src="../assets/date-svgrepo-com.svg">
            </div>
            <p class="col-8 m-0">Tahun ${data.year}</p>
          </div>
          <a href="#" class="btn btn-success mt-3">Pilih Mobil</a>
        </div>
      </div>`;
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

//required form validator
tanggal.addEventListener("change", (e) => {
  submitBtn.classList.add("disabled");
  if (e.target.value) {
    submitBtn.classList.remove("disabled");
  }
});

//render
submitBtn.addEventListener("click", async () => {
  const fetchData = await fetch("../data/cars.json");
  const response = await fetchData.json();
  //random date
  const data = response.map((each) => {
    each.availableAt = randomDate(new Date(), new Date(2024, 10, 30));
    return each;
  });
  output.innerHTML = "";
  //render ketika jumlah penumpang diisi
  if (jumlahPenumpang.value) {
    data.map((car) => {
      const d1 = new Date(car.availableAt);
      const d2 = new Date(tanggal.value);

      if (d1 <= d2 && car.capacity >= jumlahPenumpang.value) {
        renderData(car);
      }
    });
    return;
  }
  //render ketika jumlah penumpang tidak diisi
  data.map((car) => {
    const d1 = new Date(car.availableAt);
    const d2 = new Date(tanggal.value);

    if (d1 <= d2) {
      renderData(car);
    }
  });
});
