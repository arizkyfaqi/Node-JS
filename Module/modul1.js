var name = "Rizal Afani";
var age = 30;

//Menjadikan varibale bisa di akses di file lain
module.exports.name = name;
module.exports.age = age;

//Mengexport banyak file caranya dengan menjadikan JSON
module.exports = {
    nama : "Rizal",
    umur : 20,
    jurusan : "Multimedia",
    print : function(){
        console.log("Nama " + this.nama, + this.umur + " thn " + "jurusan " + this.jurusan);
    }
};
