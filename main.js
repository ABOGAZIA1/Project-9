let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let disc = document.getElementById("disc")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")

let mood = "Create"
let tmp;

// get total

function getTotal(){
    if(price.value!=''){
        let resault= (+price.value + +taxes.value + +ads.value)
        -+disc.value
        total.innerHTML=resault
        total.style.background="#040"
    }else{
        total.innerHTML=''
        total.style.background="#a00d02"
    }
}
// create product
let datapro;
if(localStorage.product!=null)
{
    datapro =JSON.parse(localStorage.product)
}else{
    datapro=[]
}

submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        disc:disc.value,
        ads:ads.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }

    // count
    if(title.value != '' && price.value !='' && category.value !='' && newpro.count < 100){
        if(mood==="Create"){
            if(newpro.count > 1){
                for(let i = 0 ; i < newpro.count ; i++){
                    datapro.push(newpro)
                }
                }else{
                    datapro.push(newpro)
                }
            }else{
                datapro[tmp] = newpro
                mood = "Create"
                submit.innerHTML = "Create"
                count.style.display = "block"
            }
            cleardata()
    }



    
    // save localstorage
    localStorage.product=JSON.stringify(datapro)
    showdata()
}

// clear inputs

function cleardata(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    category.value=''
    total.innerHTML=''
    count.value=''
    disc.value=''
}

// read

function showdata()
{
    getTotal()
    let table= ''
        for(let i =0; i<datapro.length;i++){
            table+=`
            <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].disc}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick ="updateDate(${i})" id="update">Update</button></td>
                <td><button onclick = "deletedata(${i})" id="delete">Delete</button></td>
                    </tr>
                    `
        }
    document.getElementById('tbody').innerHTML=table
    let btnDelete = document.getElementById("deleteAll")
    if(datapro.length > 0){
        btnDelete.innerHTML = `
        <button onclick = "deleteAll()" >Delete All (${datapro.length})</button>
        `
    }else{
        btnDelete.innerHTML = ''
    }
}
showdata()



// delete


function deletedata(i){
    datapro.splice(i,1)
    localStorage.product = JSON.stringify(datapro)
    showdata()
}

function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}


// update

function updateDate(i){
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    disc.value = datapro[i].disc
    getTotal()
    count.style.display = "none"
    category.value = datapro[i].category
    submit.innerHTML = "Update"
    mood = "Update"
    tmp = i
    scroll({
        top :0,
        behavior: "smooth"
    })
}



// search

let search = "title"
function getsearchmood(id){
    let searchmood = document.getElementById("search")
    if(id == "searchTitle"){
        search = "title"
        searchmood.placeholder = "Search By Title"
    }else{
        search = "category"
        searchmood.placeholder = "Search By Category"
    }
    searchmood.focus()
    searchmood.value = ''
    showdata()
}

function searchDate(value){
    let table = ''
    if(search == "title"){
        for(let i = 0 ; i < datapro.length ; i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table+=`
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].disc}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick ="updateDate(${i})" id="update">Update</button></td>
                    <td><button onclick = "deletedata(${i})" id="delete">Delete</button></td>
                        </tr>
                        `
            }
        }
    }else{
        for(let i = 0 ; i < datapro.length ; i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table+=`
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].disc}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick ="updateDate(${i})" id="update">Update</button></td>
                    <td><button onclick = "deletedata(${i})" id="delete">Delete</button></td>
                        </tr>
                        `
            }
        }
    }
    document.getElementById('tbody').innerHTML=table
}

// clean data