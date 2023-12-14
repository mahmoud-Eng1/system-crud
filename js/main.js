let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discont = document.getElementById("discont");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creat = document.getElementById("creat");
let myclick = "create";
let elem_i;
//plus input.value to get total
function get_total() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) -discont.value;
        total.innerHTML = result;
        total.style.background = "green";
    }else {
        total.innerHTML = ""
        total.style.background = "rgb(216, 10, 10)";
    }
}
//creat prodect and add in localstorage
let dataprodect;
if(localStorage.prodect != null) {
    dataprodect = JSON.parse(localStorage.prodect )
}else {
    dataprodect = [];
}
creat.onclick = function() {
    let objectdata = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes:taxes.value,
        ads:ads.value,
        discont:discont.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if (title.value != "" &&price.value != "" && category.value != ""){

        if (myclick === "create"){
    
            if(objectdata.count > 1){
                for(let i =0; i < objectdata.count; i++) {
        
                    dataprodect.push(objectdata);
                }
            }else {
                dataprodect.push(objectdata);
            }
        }else {
            dataprodect[elem_i] = objectdata;
            creat.innerHTML = "create";
            count.style.display = "block";
        }

        cleardata();
    } 
        
    
    localStorage.setItem("prodect",JSON.stringify(dataprodect));

    add_data() ;
}
//this function to clear data in input
function cleardata() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discont.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";

}
function add_data() {

let table ="" ;
for(let i = 0;i < dataprodect.length; i++ ) {
    table +=`
    <tr>
                <td>${i}</td>
                <td>${dataprodect[i].title}</td>
                <td>${dataprodect[i].price}</td>
                <td>${dataprodect[i].taxes}</td>
                <td>${dataprodect[i].ads}</td>
                <td>${dataprodect[i].discont}</td>
                <td>${dataprodect[i].total}</td>
                <td>${dataprodect[i].category}</td>
                <td> <button onclick="updatedata(${i})" id="update">Update</button> </td>
                <td> <button onclick="deletedata(${i})" id="delete">delete</button> </td>
            </tr>`
}  
document.getElementById("tbody").innerHTML = table;
let butt = document.getElementById("deletAll");
if (dataprodect.length > 0){
    butt.innerHTML = `
    <button onclick="deleteall()"> delet All</button>
    `
} else {
    butt.innerHTML ="";
}
get_total()
}

add_data() 

function deletedata(i) {
    
    dataprodect.splice(i,1);
    localStorage.prodect = JSON.stringify(dataprodect);
add_data()
 }

 function deleteall() {
    localStorage.clear();
    dataprodect.splice(0);
    add_data()
 }

function updatedata(i) {
    title.value =dataprodect[i].title;
    price.value =dataprodect[i].price;
    taxes.value =dataprodect[i].taxes;
    ads.value =dataprodect[i].ads;
    discont.value =dataprodect[i].discont;
    category.value =dataprodect[i].category;
     get_total();
    count.style.display = "none";
    creat.innerHTML = "update";
    myclick = "update"
    elem_i = i;
    scroll({
        top:0,
        behavior:"smooth" 
    })
}

let moodsearch = "";

function serchbytwo(id) {
    let search = document.getElementById("search");
    if(id === "buttitle"){
        moodsearch = "title";
    }else {
        moodsearch = "category";
    }
    search.placeholder = "search by "+moodsearch;
    search.focus()
    search.value = "";
    add_data();

}
function searchtitle(value) {
    table = "";
    for (let i =0; i<dataprodect.length; i++) {
        if(moodsearch === "title") {
            if(dataprodect[i].title.includes(value)) {
                table +=`
    <tr>
                <td>${i}</td>
                <td>${dataprodect[i].title}</td>
                <td>${dataprodect[i].price}</td>
                <td>${dataprodect[i].taxes}</td>
                <td>${dataprodect[i].ads}</td>
                <td>${dataprodect[i].discont}</td>
                <td>${dataprodect[i].total}</td>
                <td>${dataprodect[i].category}</td>
                <td> <button onclick="updatedata(${i})" id="update">Update</button> </td>
                <td> <button onclick="deletedata(${i})" id="delete">delete</button> </td>
            </tr>`
            }
        } else {
            if(dataprodect[i].category.includes(value)) {
                table +=`
    <tr>
                <td>${i}</td>
                <td>${dataprodect[i].title}</td>
                <td>${dataprodect[i].price}</td>
                <td>${dataprodect[i].taxes}</td>
                <td>${dataprodect[i].ads}</td>
                <td>${dataprodect[i].discont}</td>
                <td>${dataprodect[i].total}</td>
                <td>${dataprodect[i].category}</td>
                <td> <button onclick="updatedata(${i})" id="update">Update</button> </td>
                <td> <button onclick="deletedata(${i})" id="delete">delete</button> </td>
            </tr>`
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

