
let tables = []
let dishes = []

const loadTables = async () => {
     await fetch("./tables.json")
     .then(response => response.json())
     .then(data => {
         tables = data
     })
     renderTables()
 }

const loadDishes = async () => {
    await fetch("./dishes.json")
    .then(response => response.json()) 
    .then(data => {
        dishes = data
    })
    renderDishes()
}

loadTables()
loadDishes()

const renderTables = () => {
    let cards = tables.map(table => {
        return `
        <div id="table${table.id}" class="card" ondrop="drop(event, this)" ondragover="allowDrop(event)">
            <div class="content">
                <div class="header">Table ${table.id}</div>
                <div class="meta">Total Price : ${table.total}</div>
                <div class="description">
                    Table ${table.id} is still active
                </div>
            </div>
        </div>
        `
    })
    let temp = "";
    for(let i = 0; i < cards.length; i++){
        temp += cards[i]
    }
    document.getElementById("tables").innerHTML = temp
}

const renderDishes = () => {
    let cards = dishes.map(dish => {
        return `
        <div id="dish${dish.id}" class="card" draggable="true" ondragstart="drag(event)">
            <div class="content">
                <div class="header">${dish.name}</div>
                <div id="dish${dish.id}" class="image">
                    <img src=${dish.image} style="width:260px; height:225px" id="dish${dish.id}" draggable="true" ondragstart="drag(event)">
                </div>
                <img class="meta" style="width:30px; height:30px; margin-top : 5px" src=${dish.veg}></img>
                <div class="description">
                    Price : ${dish.price}
                </div>
            </div>
        </div>
        `
    })
    let temp = "";
    for(let i = 0; i < cards.length; i++){
        temp += cards[i]
    }
    document.getElementById("dishes").innerHTML = temp
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log(ev.target)
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, el) {
    ev.preventDefault();
    let dishId = parseInt(ev.dataTransfer.getData("text").substr(4));
    let tableId = parseInt(el.id.substr(5));
    console.log(el);
    console.log(tableId);
    console.log(dishId);
    console.log(ev.dataTransfer.getData("text"))
    // ev.target.appendChild(document.getElementById(data));
    dishes.map((dish) => {
        if(dish.id === dishId) {
            tables[tableId - 1].items.push(dish);
            tables[tableId - 1].total += dish.price;
            renderTables();
        }
    });
}

function filterDishes () {
    console.log("Inside")
}

