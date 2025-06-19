const item = document.getElementById("items")
/**
 * Get all data from API
 */

async function getData () {
    try {
        let data = await fetch("http://127.0.0.1:3000/api/products/")
        let dataConvert = await data.json()
        return dataConvert;

    } catch (error) {
        item.innerHTML = `<h2>Une erreur a été détécté, merci de patienter</h2>`
        console.log(`Une erreur a été détécté : ${error}`)
    }
}


/**
 * Add structure for HTML Product
 */
function addItem (produit) {
    item.innerHTML += `<a href="./product.html?id=${produit._id}">
                        <article>
                        <img src="${produit.imageUrl}" alt="${produit.altText}">
                        <h3 class="productName">${produit.name}</h3>
                        <p class="productDescription">${produit.description}</p>
                        </article>
                     </a>`

}


/**
 * View product dynamicly in page
 */
(async function showProduct () {
    let products = await getData()
    console.log(products);

    products.forEach(produit => {
        addItem(produit)
    });

})();