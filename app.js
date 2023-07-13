// SELECT ITEMS
const alert = document.querySelector('.alert');
const form = document.querySelector('.todo-form');
const todo = document.getElementById('action');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.list-container');
const list = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-btn');

// EDIT OPTION
let editElement;
let editFlag = false;
let editID = "";

// EVENT LISTENERS
// submit form
form.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener("click", clearItems);

// load items
window.addEventListener('DOMContentLoaded', setupItems);


// FUNCTIONS
function addItem(e) {
	e.preventDefault();
	const value = action.value
	const id = new Date().getTime().toString()
	if(value && !editFlag) {
		createListItem(id, value);
        // display alert
        displayAlert("item added to the list", "success");
        // show container
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();

	} else if(value && editFlag){
		editElement.innerHTML = value;
		displayAlert('value changed', 'success');
		// edit local storage
		editLocalStorage(editID, value);
		setBackToDefault();
	} else {
		displayAlert('please enter value', 'danger');

	}
}

// display alert
function displayAlert(text, a) {
	alert.textContent = text;
	alert.classList.add(`alert-${a}`);

// remove alert
setTimeout(function() {
	alert.textContent = "";
	alert.classList.remove(`alert-${a}`);
	}, 1000);
}

// clear items
function clearItems() {
	const items = document.querySelectorAll('.list-item');

	if(items.length > 0) {
		items.forEach(function(item) {
			list.removeChild(item);
		});
	}
	container.classList.remove("show-container");
	displayAlert("empty list", "danger");
	setBackToDefault();
	localStorage.removeItem('list');
}

// edit function
function editItem(e) {
	const element = e.currentTarget.parentElement.parentElement;
	// set edit item
	editElement = e.currentTarget.parentElement.previousElementSibling;
	// set from value
	action.value = editElement.innerHTML;
	editFlag = true;
	editID = element.dataset.id;
	submitBtn.textContent = "edit";
}
// delete function
function deleteItem(e) {
	const element = e.currentTarget.parentElement.parentElement;
	const id = element.dataset.id;
	list.removeChild(element);
	if(list.children.length === 0) {
		container.classList.remove("show-container");
	}
	displayAlert('item removed', 'danger');
	setBackToDefault();
	// remove from local storage
	removeFromLocalStorage(id);
}

// set back to default
function setBackToDefault() {
	action.value = "";
	editFlag = false;
	editID = "";
	submitBtn.textContent = "submit";
}
// LOCAL STORAGE
function addToLocalStorage(id, value) {
	const action = {id:id, value:value};
	let items = localStorage.getItem("list")
	?JSON.parse(localStorage.getItem('list'))
	:[];
items.push(action);
localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id) {
	let items = getLocalStorage();

	items = items.filter(function(item) {
		if(item.id !==id) {
			return item
		}
	})
	localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
	let items = getLocalStorage();
	items = items.map(function(item) {
		if(item.id === id) {
			item.value = value;
		}
		return item;
	});
	localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
	return localStorage.getItem("list")
	?JSON.parse(localStorage.getItem('list'))
	:[];
}

// localStorage API
// setItem
// getItem
// removeItem
// save as strings
// localStorage.setItem('orange', JSON.stringify(["item", "item2"]));
// const oranges = JSON.parse(localStorage.getItem("orange"));
// localStorage.removeItem("orange");

// SETUP ITEMS
function setupItems() {
	let items = getLocalStorage();
	if(items.length > 0) {
	items.forEach(function(item){
		createListItem(item.id,item.value)
	})
	container.classList.add('show-container');
	}
}

function createListItem(id, value) {
	const element = document.createElement('article');
		// add class
		element.classList.add('list-item');
		// add id
		const attr = document.createAttribute('data-id');
		attr.value = id;
		element.setAttributeNode(attr);
		element.innerHTML =`<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        // append child
        list.appendChild(element);
}

// the shadow grows when the content grows
const sectionCenter = document.querySelector('.section-center');
const decorativeShadow = document.querySelector('.decorative-shadow');

// Observador de cambios en la altura de section-center
const observer = new ResizeObserver(entries => {
  const height = entries[0].contentRect.height;
  decorativeShadow.style.height = height + 'px';
});

// Observa cambios en la altura de section-center
observer.observe(sectionCenter);

