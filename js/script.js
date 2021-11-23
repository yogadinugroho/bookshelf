document.addEventListener("DOMContentLoaded", function(){

    const tombolSubmit = document.getElementById("inputBook");

    tombolSubmit.addEventListener("submit", function(event){
        event.preventDefault();
        masukkanBuku();
    });

    const searchButton = document.getElementById("searchSubmit");

    searchButton.addEventListener("click", function(event){
        event.preventDefault();
        const judulBuku = document.getElementById("searchBookTitle").value; 
        searchData(judulBuku);
    })

    if (isStorageExist()){
        muatDataDariStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });
 document.addEventListener("ondataloaded", () => {
    refreshDataRakBuku();
 });