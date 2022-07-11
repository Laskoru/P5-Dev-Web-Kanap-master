panier.forEach((p) => {
  p.addEventListener("change", () => {
// boucle pour modifier la quantité du produit du panier grace à la nouvelle valeur    
  let panier = JSON.parse(localStorage.getItem("produit"));  
    if (
      p.dataset._id == panier._id &&
      p.dataset.couleur == panier.couleur
    ) 
    return(
      panier.quantite = p.value,
      localStorage.setItem("produit", JSON.stringify(panier))
      //console.log(localStorage.setItem("produit", JSON.stringify(panier.quantite)))
    )
  }); 
});