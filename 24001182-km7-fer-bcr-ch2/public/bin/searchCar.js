const tanggal = document.getElementById("tanggal");
const tipeDriver=document.getElementById("tipe-driver");
const jumlahPenumpang = document.getElementById("jumlah-penumpang");
const submitBtn = document.getElementById("submit");
const searchForm = document.getElementById("search-form");
const output = document.getElementById("output");

const randomDate = (start, end) => new Date(+start + Math.random() * (end - start));

const renderData = (data) => {
  output.innerHTML += `
      <div class="card col-md-4 p-3" style="width: 18rem;">
        <div class="card-img-top ratio ratio-4x3">
          <img src="${data.image}" class="img-fluid object-fit-cover border rounded " alt="...">
        </div>
        
        <div class="card-body gap-3">
          <h5 class="card-title">${data.manufacture} / ${data.type}</h5>
          <h4>Rp. ${data.rentPerDay.toLocaleString('id-ID')} / hari</h1>
          <p class="card-text">${data.description}</p>
          <div class="container row gap-2 align-items-center justify-content-center mb-2">
            <div class="col-3">
              <img class="img-fluid" src="./assets/available-calendar-date-svgrepo-com.svg">
            </div>
            <p class="col-8 m-0">Tersedia ${new Date(data.availableAt).toLocaleDateString()}</p>
          </div>
          <div class="container row gap-2 align-items-center justify-content-center mb-2">
            <div class="col-3">
              <img class="img-fluid" src="./assets/group-svgrepo-com.svg">
            </div>
            <p class="col-8 m-0">${data.capacity} orang</p>
          </div>
          <div class="container row gap-2 align-items-center justify-content-center mb-2">
            <div class="col-3">
              <img class="img-fluid" src="./assets/setting-svgrepo-com.svg">
            </div>
            <p class="col-8 m-0">${data.transmission}</p>
          </div>
          <div class="container row gap-2 align-items-center justify-content-center mb-2">
            <div class="col-3">
              <img class="img-fluid" src="./assets/date-svgrepo-com.svg">
            </div>
            <p class="col-8 m-0">Tahun ${data.year}</p>
          </div>
          <div class="d-grid">
            <a href="#" class="btn btn-success mt-3">Pilih Mobil</a>
          </div>
        </div>
      </div>`;
};

const getData = async ()=>{
  const fetchData = await fetch("./data/cars.json");
  const response = await fetchData.json();
  //random date
  const data = response.map((each) => {
    let weekAhead=new Date();
    weekAhead.setDate(weekAhead.getDate()+7);
    each.availableAt = randomDate(new Date(), weekAhead);
    return each;
  });
  return data;
}
const data=await getData();

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

//required form validator
tanggal.addEventListener("change", (e) => {
  submitBtn.classList.add("disabled");
  if (e.target.value && tipeDriver.value) {
    submitBtn.classList.remove("disabled");
  }
});
tipeDriver.addEventListener("change",(e)=>{
  submitBtn.classList.add("disabled");
  if(e.target.value && tanggal.value){
    submitBtn.classList.remove("disabled");
  }
})
//render
submitBtn.addEventListener("click", () => {
  output.innerHTML = "";
  //render ketika jumlah penumpang diisi
  if (jumlahPenumpang.value) {
    data.map((car) => {
      const d1 = new Date(car.availableAt).toLocaleDateString();
      const d2 = new Date(tanggal.value).toLocaleDateString();
      const isAvailable=tipeDriver.value == "1";
      if (d1 == d2 && car.capacity >= jumlahPenumpang.value && car.available == isAvailable) {
        renderData(car);
      }
    });
    return;
  }
  //render ketika jumlah penumpang tidak diisi
  data.map((car) => {
    const d1 = new Date(car.availableAt).toLocaleDateString();
    const d2 = new Date(tanggal.value).toLocaleDateString();
    const isAvailable=tipeDriver.value == "1";
    if (d1 == d2 && car.available == isAvailable) {
      renderData(car);
    }
  });
});
