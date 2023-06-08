let products = []
let idEditing = null;

const familiaProd = document.getElementById('cmbFamiliaProd');

const codProd = document.getElementById('txtCodProd');

const nameProd = document.getElementById('txtpNameProd');

const descProd = document.getElementById('txtpDescProd');

const stockProd = document.getElementById('txtStockProd');

const unitPriceProd = document.getElementById('txtUnitPriceProd');

const table = document.getElementById('bodyTable');

const search = document.getElementById('txtBuscar');

readStorage();
createTable();

search.addEventListener('input',searchProducts);

function addProduct(){
    //e.preventDefault()

    let id = Date.now();
    if(idEditing){
        console.log("exits product");
        const index = products.findIndex((el) => el.id == idEditing);
        const product= {
            id,
            familiaProd: familiaProd.value,
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
              familiaProd: familiaProd.value,
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
   table.innerHTML ='';
    products.forEach( product => {
        table.innerHTML += `
        <td data-label="Familia Producto">${product.familiaProd}</td>
        <td data-label="Código Producto">${product.codProd}</td>
        <td data-label="Nombre Producto">${product.nameProd}</td>
        <td data-label="Descripción Producto">${product.descProd}</td>
        <td data-label="Stock">${product.stockProd}</td>
        <td data-label="Precio Unitario">${product.unitPriceProd}</td>
        <td data-label="Editar">
          <button onclick="editProduct(${product.id})" class="btn btn-primary">Editar</button>
        </td>
        <td data-label="Eliminar">
          <button onclick="deleteProduct(${product.id})" class="btn btn-primary">Eliminar</button>
        </td>
        `
      });
}
function searchTable(prod){
  table.innerHTML ='';
  prod.forEach( product => {
       table.innerHTML += `
       <td data-label="Familia Producto">${product.familiaProd}</td>
       <td data-label="Código Producto">${product.codProd}</td>
       <td data-label="Nombre Producto">${product.nameProd}</td>
       <td data-label="Descripción Producto">${product.descProd}</td>
       <td data-label="Stock">${product.stockProd}</td>
       <td data-label="Precio Unitario">${product.unitPriceProd}</td>
       <td data-label="Editar">
         <button onclick="editProduct(${product.id})" class="btn btn-primary">Editar</button>
       </td>
       <td data-label="Eliminar">
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
  familiaProd.value = product.familiaProd;
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
    let text = "Esta seguro de Eliminar el Producto!\nAceptar o Cancelar.";
    if (confirm(text) == true) {
      const index = products.findIndex((x) => x.id == id);
      products.splice(index, 1);
      clearForm();
      saveStorage();
      createTable();
    } 
    console.log(`<<<deleteProduct()`);
}
function clearForm() {
    const form = document.getElementById('form');
    form.reset();
}
function searchProducts(e){
  console.log(`>>>searchProducts()`);
  const valor = search.value.toLowerCase(); 
  table.innerHTML ='';
  let resultProd = products.filter((prod) => prod.nameProd.toLowerCase().includes(valor));
  if(resultProd.length>0){
    searchTable(resultProd);
  } else{
    table.innerHTML = `
        <div>
        <h4>Sin resultados</h4> 
        </div>
        `;
  }
  console.log(`<<<searchProducts()`);
}
