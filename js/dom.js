const BELUM_SELESAI_BACA = "incompleteBookshelfList";
const SELESAI_BACA = "completeBookshelfList";
const ItemBookshelf = "itemId";

function buatBuku(judulBuku, penulisBuku, tahunBuku, isCompleted){

    const textTitle = document.createElement("h3");
    textTitle.innerText = judulBuku;

    const textAuthor = document.createElement("h4");
    textAuthor.innerText = penulisBuku;

    const textYear = document.createElement("h5");
    textYear.innerText = tahunBuku;

    const containerArticle = document.createElement("article");
    containerArticle.classList.add("book_item");
    
    containerArticle.append(textTitle, textAuthor, textYear,);

    if(isCompleted){
        containerArticle.append(
            buatTombolBacaLagi(), 
            buatTombolHapusBuku()
        );
    } else {
        containerArticle.append(
            buatTombolSelesaiBaca() 
        );
    }

    return containerArticle;
}

function buatTombolBacaLagi(){
    return buatTombol("undo-button", "baca lagi", function(event){
        bacaLagi(event.target.parentElement);
    });
}


function buatTombolHapusBuku(){
    return buatTombol("trash-button","hapus buku", function(event){
        const konfirmasiHapus = confirm("Apakah anda yakin akan menghapusnya?")

        if (konfirmasiHapus == true) {
            hapusBuku(event.target.parentElement);
            alert("Data berhasil dihapus");
        }
    });
}

function buatTombolSelesaiBaca(){
    return buatTombol("check-button","selesai baca", function(event){
        selesaiBaca(event.target.parentElement);
    });
}

function buatTombol(namaKelas, teksTombol, eventListener) {
    const tombol = document.createElement("button");
    tombol.classList.add(namaKelas);
    tombol.innerText = teksTombol;
    tombol.addEventListener("click", function (event) {
        eventListener(event);
    });
    return tombol;
}

function masukkanBuku(){
    const uncompletedTODOList = document.getElementById(BELUM_SELESAI_BACA);
    const judulBukunya = document.getElementById("inputBookTitle").value;
    const penulisBukunya = document.getElementById("inputBookAuthor").value;
    const tahunBukunya = document.getElementById("inputBookYear").value;

    const book = buatBuku(judulBukunya, penulisBukunya, tahunBukunya, false);
    const books = buatObjekBuku(judulBukunya, penulisBukunya, tahunBukunya, false);

    book[ItemBookshelf] = books.id;
    rakBuku.push(books);

    uncompletedTODOList.append(book);
    updateDataToStorage();
    alert("data buku sudah ditambahkan!");
}

function selesaiBaca(taskElement){
    const listCompleted = document.getElementById(SELESAI_BACA);
    const judulBuku = taskElement.querySelector(".book_item > h3").innerText;
    const penulisBuku = taskElement.querySelector(".book_item > h4").innerText;
    const tahunBuku = taskElement.querySelector(".book_item > h5").innerText;

    const bukuBaru = buatBuku(judulBuku, penulisBuku, tahunBuku, true);

    const buku = cariBuku(taskElement[ItemBookshelf]);
    buku.isCompleted = true;
    bukuBaru[ItemBookshelf] = buku.id;

    listCompleted.append(bukuBaru);
    taskElement.remove();

    updateDataToStorage();
}

function hapusBuku(taskElement) {
 
    const posisiBuku = cariIndeksBuku(taskElement[ItemBookshelf]);
    rakBuku.splice(posisiBuku, 1);
  
    taskElement.remove();
    updateDataToStorage();
}

function bacaLagi(taskElement){
    const listUncompleted = document.getElementById(BELUM_SELESAI_BACA);
    const judulBuku = taskElement.querySelector(".book_item > h3").innerText;
    const penulisBuku = taskElement.querySelector(".book_item > h4").innerText;
    const tahunBuku = taskElement.querySelector(".book_item > h5").innerText;

    const bukuBaru = buatBuku(judulBuku, penulisBuku, tahunBuku, false);

    const buku = cariBuku(taskElement[ItemBookshelf]);
    buku.isCompleted = false;
    bukuBaru[ItemBookshelf] = buku.id;

    listUncompleted.append(bukuBaru);
    taskElement.remove();

    updateDataToStorage();
}

function searchData(judulBuku) {

    const daftarBuku = document.querySelectorAll("article")

    let i = 0;
    for(buku of daftarBuku){
        if(judulBuku != ""){
            let listBuku = daftarBuku[i].childNodes[0].innerText;
            if(listBuku != judulBuku){
                daftarBuku[i].setAttribute("hidden", "hidden");
            }
        } else {
                judulBuku[i].removeAttribute("hidden"); 
        }
        i++;
    } 
}

function refreshDataRakBuku(){
    const listUncompleted = document.getElementById(BELUM_SELESAI_BACA);
    let listCompleted = document.getElementById(SELESAI_BACA);

    for(buku of rakBuku){
        const bukuBaru = buatBuku(buku.title, buku.author, buku.year, buku.isCompleted);
        bukuBaru[ItemBookshelf] = buku.id;

        if(buku.isCompleted){
            listCompleted.append(bukuBaru);
        } else {
            listUncompleted.append(bukuBaru);
        }
    }
}

