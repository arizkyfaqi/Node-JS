var myObj = {
    name : "Rizal",
    age : 22,
    print : function(){
        console.log(this.name + " is " + this.age + " years old");
        console.log(this === myObj);
    }
};

function myFunction(){
    console.log("in my function");
    console.log(this === global);
}

myObj.print();
console.log("=====");
myFunction();