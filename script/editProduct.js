let editProduct = document.getElementById('editProductForm');

editProduct.addEventListener('submit', (e) => {
	e.preventDefault();

	let productName = document.getElementById('productName').value;
	let productDesc = document.getElementById('productDesc').value;
	let productPrc = document.getElementById('productPrc').value;

	let params = new URLSearchParams(window.location.search);
	let token = localStorage.getItem("token");
	let productId = params.get('productId')

		fetch(`http://localhost:3000/api/products/${productId}/edit`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					productName: productName,
					description: productDesc,
					price: productPrc
				})
			}
		)
		.then(result => result.json())
		.then( result => {
			console.log(result)
	    if(result !== "undefined"){
				alert (`Product Successfully Updated`)
				window.location.replace('./index.html');
			} else {
				alert ("Something Went Wrong")
			}
		})
	})
