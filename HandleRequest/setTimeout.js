// setTimeout(function(){
//     console.log("Saya ditampilkan dengan jeda 3 detik");
// }, 3000);

/*
    setTimeout adalah fungsi untuk menjalankan program dengan jeda yang sudah di tentukan
*/

function Order(idOrder, timeOut){
    console.log("ID Order "+idOrder);
    ProsesOrder(idOrder, timeOut);
}

function ProsesOrder(idOrder, timeOut){
    setTimeout(function(){
        console.log("ID Order "+idOrder+" Proccessed");
    }, timeOut);
}

//Multiple request
Order(101, 5000);
Order(102, 1000);
Order(103, 3000);