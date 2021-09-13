let params = new URLSearchParams(window.location.search);
let token = localStorage.getItem("token");
let productId = params.get('productId')

fetch(`http://localhost:3000/api/products/${productId}`,
	{
		method : "GET",
		headers : {	
			"Authorization": `Bearer ${token}`
		}
	}
)
.then(result => result.json())
.then( result => {
	console.log(productId)
	fetch('http://localhost:3000/api/users/checkOut',
	{
		method : "POST",	
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify({
			productId: productId
		})
	})
	.then( result => result.json())
	.then( result => {
		if (result) {
			alert("Item added to cart")
		}
		else {
			alert("Something went wrong")
		}
	})
})