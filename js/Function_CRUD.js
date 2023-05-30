let products = []
let idEditing = null;


const codProd = document.getElementById('txtCodProd');

const nameProd = document.getElementById('txtpNameProd');

const descProd = document.getElementById('txtpDescProd');

const stockProd = document.getElementById('txtStockProd');

const unitPriceProd = document.getElementById('txtUnitPriceProd');

const table = document.getElementById('bodyTable');


readStorage();
createTable();

function addProduct(){
    //e.preventDefault()

    let id = Date.now();
    if(idEditing){
        console.log("exits product");
        const index = products.findIndex((el) => el.id == idEditing);
        const product= {
            id,
            codProd: codProd.value,
            nameProd: nameProd.value,
            descProd: descProd.value,
            stockProd: stockProd.value,
            unitPriceProd: unitPriceProd.value
      }; 
      products[index] = product;
      idEditing = null;
    } else{
        console.log("not exits product");
        const product= {
              id,
              codProd: codProd.value,
              nameProd: nameProd.value,
              descProd: descProd.value,
              stockProd: stockProd.value,
              unitPriceProd: unitPriceProd.value
        }; 
        
        products.push(product);
        idEditing = null;
    }
    clearForm();
    saveStorage();
    createTable();
}

function saveStorage () {
    localStorage.setItem('products',JSON.stringify(products));
}

function createTable(){
    products.forEach( product => {
        table.innerHTML += `
        <td>${product.codProd}</td>
        <td>${product.nameProd}</td>
        <td>${product.descProd}</td>
        <td>${product.stockProd}</td>
        <td>${product.unitPriceProd}</td>
        <td>
          <button onclick="editProduct(${product.id})" class="btn btn-primary">Editar</button>
        </td>
        <td>
          <button onclick="deleteProduct(${product.id})" class="btn btn-primary">Eliminar</button>
        </td>
        `
      });
}
function editProduct(id){
  const index = products.findIndex((el) => el.id == id);
  idEditing = id;
  console.log("index: " + index);
  const product = products[index];
  console.log("product: " + product.id);
  if(product){

  }

  codProd.value = product.codProd;
  nameProd.value = product.nameProd;
  descProd.value = product.descProd;
  unitPriceProd.value = product.unitPriceProd;
  stockProd.value = product.stockProd;

}
function readStorage(){
  console.log(`>>>readStorage()`);
  table.innerHTML = '';
  products = JSON.parse(localStorage.getItem('products'));

  if(products) {
    products = products;
  } else {
    products = [];
  }
  console.log(`<<<readStorage()`);
}
function deleteProduct(id){
    console.log(`>>>deleteProduct()`);
    const index = products.findIndex((x) => x.id == id);

    products.splice(index, 1);
    clearForm();
    saveStorage();
    createTable();
    console.log(`<<<deleteProduct()`);
}
function clearForm() {
    const form = document.getElementById('form');
    form.reset();
  }
