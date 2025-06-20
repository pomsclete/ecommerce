// Recuperation de l'ID
function getId () {
    let url = new URL(window.location.href)
    let id = url.searchParams.get("id")
    return id

}


// Recuperation des données du produit selon l'ID
//API: http://127.0.0.1:3000/api/products/1234
async function getDataById () {
    try {
        let data = await fetch(`http://127.0.0.1:3000/api/products/${getId()}`)
        let dataC = await data.json()
        return dataC
    } catch (error) {
        console.log(`Une erreur a été détecté : ${error}`);

    }

}

// Ajout des informations sur le DOM
(async function fillProduct () {
    let produit = await getDataById()
    document.querySelector(".item__img").innerHTML =
        `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
    document.querySelector("#title").innerHTML = produit.name
    document.querySelector("#price").innerHTML = produit.price
    document.querySelector("#description").innerHTML = produit.description

    produit.colors.map(color => {
        document.querySelector("#colors").innerHTML +=
            `<option value="${color}">${color}</option>`
    })

})()

function pushDataToStorage () {
    const btn = document.querySelector("#addToCart")
    btn.addEventListener("click", () => {
        const id = getId()
        const color = document.querySelector("#colors").value
        const quantite = document.querySelector("#quantity").value

        let produit = {
            id: id,
            color: color,
            quantite: quantite
        }
        let storageStatus = JSON.parse(localStorage.getItem("produit"))
        let storagePush = () => {
            if (color === "") {
                alert("Merci de selectionner une couleur")
            } else if (quantite < 1 || quantite > 100) {
                alert("Merci de choisir une quantité compris entre 1 et 100")
            } else {

                storageStatus.push(produit)
                localStorage.setItem('produit', JSON.stringify(storageStatus))
                alert("Produit ajouté au panier avec succés")
            }
        }

        if (storageStatus) {
            storageStatus.forEach((productFromLocal, index) => {
                if (produit.id === productFromLocal.id
                    && produit.color === productFromLocal.color) {
                    produit.quantite = parseInt(produit.quantite) + parseInt(productFromLocal.quantite)
                    storageStatus.splice(index, 1)
                }
            })
            storagePush()

        } else {
            storageStatus = []
            storagePush()
        }


    })

}
pushDataToStorage()