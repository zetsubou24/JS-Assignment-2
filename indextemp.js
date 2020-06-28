var tables = [];
var dishes = [];

const searchTables = document.querySelector('#searchTables');
const searchDishes = document.querySelector('#searchDishes');

const loadTables = () => {
    fetch('./../data/tables.json')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        tables = data;
        renderTables();
    });
}

const loadDishes = () => {
    fetch('./../data/dishes.json')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        dishes = data;
        renderDishes();
    });
}

loadEventListeners();

function loadEventListeners() {
    loadTables();
    loadDishes();
    searchTables.addEventListener('keyup', filterTables);
    searchDishes.addEventListener('keyup', filterDishes);
}

function renderTables() {
    
    let items = ''
    tables.map((item, index) => {
        items += `
            <div class="row" ondrop="drop(event, this)" ondragover="allowDrop(event)" id="${'table'+index}">
                <div class="col s12 m12">
                    <div class="card blue-grey darken-1" >
                        <div class="card-content white-text tableCard"  >
                            <span class="card-title">${item.tableName}</span>
                            <p>Rs. ${item.price}</p>
                            <p>Total Items: ${item.items.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    });

    document.querySelector('#tables').innerHTML = items;
}

function renderDishes() {
    let items = ''
    dishes.map((item, index) => {
        items += `
        <div class="col s6 m6" draggable="true" id="${'dish'+index}" ondragstart="drag(event)">
        <div class="card" id="dishCard">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${item.image}" style="height:200px">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${item.dishName}</span>
            <h6>Rs. ${item.price}/-</h6>
          </div>
        </div>
      </div>
        `
    });
    document.querySelector('#dishes').innerHTML = items;
}

function filterTables(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.tableCard').forEach(function(task) {
        const item = task.firstElementChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function filterDishes(e) {
    const text = e.target.value.toLowerCase();
    console.log(text);
    let items = '';
    dishes.map((item, index) => {
        if(item.dishName.toLowerCase().indexOf(text) != -1) {
            items += `
            <div class="col s6 m6" draggable="true" id="${'dish'+index}" ondragstart="drag(event)">
            <div class="card" id="dishCard">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${item.image}" style="height:200px">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${item.dishName}</span>
                <h6>Rs. ${item.price}/-</h6>
              </div>
            </div>
          </div>
            `;            
        }
        
    });
    document.querySelector('#dishes').innerHTML = items;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, el) {
    ev.preventDefault();
    let dishId = parseInt(ev.dataTransfer.getData("text").substr(4));
    let tableId = parseInt(el.id.substr(5));
    console.log(el);
    console.log(tableId);
    console.log(dishId);
    // ev.target.appendChild(document.getElementById(data));
    dishes.map((dish, index) => {
        if(index === dishId) {
            tables[tableId].items.push(dish);
            tables[tableId].price += dish.price;
            renderTables();
        }
    });
}