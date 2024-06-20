const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');

function onAddItemSubmit(e) {
    e.preventDefault();
  
    const newItem = itemInput.value;
  
    // Validate Input
    if (newItem === '') {
      alert('Please add an item');
      return;
    }

    addItemToDOM(newItem);
  
  }


function addItemToDOM(item) {
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
  
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
  
    // Add li to the DOM
    itemList.appendChild(li);
    itemInput.value = '';
  }
  
  function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
  }
  
  function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
  }

  itemForm.addEventListener('submit', onAddItemSubmit);