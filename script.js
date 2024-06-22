const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;
function onAddItemSubmit(e) {
    e.preventDefault();
  
    const newItem = itemInput.value;
  
    // Validate Input
    if (newItem === '') {
      alert('Please add an item');
      return;
    }

    addItemToDOM(newItem);
    addItemToStorage(newItem);
  
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
    checkUI();
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
  

  function addItemToStorage(item) {
    let itemsFromStorage ;
    if(localStorage.getItem('items')===null){
        itemsFromStorage=[];
    }
    else{
        itemsFromStorage=JSON.parse(localStorage.getItem('items'));
    }

    itemsFromStorage.push(item);

    localStorage.setItem('items',JSON.stringify(itemsFromStorage)); 
  }
  
  

  function getItemsFromStorage() {
    
    let itemsFromStorage;
    if(localStorage.getItem('items')===null){
        itemsFromStorage=[];
    }
    else{
        itemsFromStorage=JSON.parse(localStorage.getItem('items'));
    } 
    itemsFromStorage.forEach((item)=>{
        addItemToDOM(item);
    })
  }

  function onCliclItem(e) {
    if (e.target.tagName === 'I') {
    removeItem(e.target.parentElement.parentElement);
    }
    else if (e.target.tagName === 'LI') {
        setItemToEdit(e.target);
    }
  }

    function setItemToEdit(item) {
        isEditMode = true;
        itemList.querySelectorAll('li').forEach((i) => {i.classList.remove('edit-mode');});

        item.classList.add('edit-mode');
        formBtn.innerHTML = '<i class="fa-solid fa-pencil"></i> Edit Item';
        formBtn.style.backgroundColor = 'green';
        itemInput.value = item.textContent;

    }
  function removeItem(item) {
        if (confirm('Are you sure?')) {
        // Remove from DOM
            item.remove();
        // Remove from storage

        removeItemFromStorage(item.textContent);

        checkUI();
      }
  }
function removeItemFromStorage(item) {
    let itemsFromStorage;
    if(localStorage.getItem('items')===null){
        itemsFromStorage=[];
    }
    else{
        itemsFromStorage=JSON.parse(localStorage.getItem('items'));
    }
    console.log(itemsFromStorage);
    itemsFromStorage=itemsFromStorage.filter((i)=>{
   return i!==item;
    })
    console.log(itemsFromStorage);
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

    function clearItems(e) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
          }

          // Clear from storage
            localStorage.removeItem('items');
          checkUI();


        
    }

    function filterItems(e) {
        const items =itemList.querySelectorAll('li');
        const text=e.target.value.toLowerCase();
        items.forEach((item)=>{
            const textContent=item.firstChild.textContent.toLowerCase();
            if(textContent.indexOf(text)!=-1){
                item.style.display='flex';
        }
    
        else{      
            item.style.display='none';
         }
        })
    

      }

    
    function checkUI() {
      
        const items = itemList.querySelectorAll('li');
      
        if (items.length === 0) {
          clearBtn.style.display = 'none';
          itemFilter.style.display = 'none';
        } else {
          clearBtn.style.display = 'block';
          itemFilter.style.display = 'block';
        }
      
        formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
        formBtn.style.backgroundColor = '#333';
      
      }
function init() {
    checkUI();  
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onCliclItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', getItemsFromStorage);
}
init();