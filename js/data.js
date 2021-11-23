
const STORAGE_KEY = "BOOKSHELF_APPS"

let rakBuku = [];

function isStorageExist(){
    if (typeof(Storage) === undefined) {
        alert("Browser tidak support local storage!");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(rakBuku);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function muatDataDariStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null ) 
        rakBuku = data;
    
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function buatObjekBuku(title, author, year, isCompleted){
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

function cariBuku(bukuId){
    for(buku of rakBuku){
        if(buku.id === bukuId)
        return buku;
    }
    return null;
}

function cariIndeksBuku(bukuId){
    let index = 0
    for (buku of rakBuku){
        if (buku.id === bukuId)
            return index;
        index++
    }

    return -1;
}



