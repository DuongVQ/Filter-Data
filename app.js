let list = document.getElementById('list');
let filter = document.querySelector('.filter');
let count = document.getElementById('count');

let listProducts = [];

const addDataToHTML = () => {
    list.innerHTML = '';
    if(listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <div class="title">${product.name}</div>
                <div class="price">${product.price}</div>
            `;
            list.appendChild(newProduct);
        })
    }

    let productFilter = listProducts;

    function showProduct(productFilter) {
        count.innerText = productFilter.length;
        list.innerHTML = '';
        productFilter.forEach(item => {
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            
            // create img
            let newImg = new Image();
            newImg.src = item.image;
            newItem.appendChild(newImg);

            // create name
            let newTitle = document.createElement('div');
            newTitle.classList.add('title');
            newTitle.innerText = item.name;
            newItem.appendChild(newTitle);

            // create price
            let newPrice = document.createElement('div');
            newPrice.classList.add('price');
            newPrice.innerText = item.price.toLocaleString() + 'đ';
            newItem.appendChild(newPrice);
            
            // add product
            list.appendChild(newItem);
        });
    }

    showProduct(productFilter);

    filter.addEventListener('submit', (event) => {
        event.preventDefault();
        let valueFilter = event.target.elements;
        productFilter = listProducts.filter(item => {
            // check category
            if(valueFilter.category.value != '') {
                if(item.nature.type != valueFilter.category.value) {
                    return false;
                }
            }
            // check color
            if(valueFilter.color.value != '') {
                // nếu mảng này ko tồn tại 1 giá trị color nào trùng với value trong mảng ban đầu thì false 
                if(!item.nature.color.includes(valueFilter.color.value)) {
                    return false;
                }
            }
            // check name
            if(valueFilter.name.value != '') {
                if(!item.name.includes(valueFilter.name.value)) {
                    return false;
                }
            }
            // min price
            if(valueFilter.minPrice.value != '') {
                if(item.price < valueFilter.minPrice.value) {
                    return false;
                }
            }
            // maxprice
            if(valueFilter.maxPrice.value != '') {
                if(item.price > valueFilter.maxPrice.value) {
                    return false;
                }
            }
            return true;
        })
        showProduct(productFilter);
    })
}

const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML();
        })
}

initApp(); 
