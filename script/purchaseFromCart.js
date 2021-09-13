let params = new URLSearchParams(window.location.search);
let token = localStorage.getItem("token");
let productId = params.get('productId')

fetch(`https://murmuring-atoll-05490.herokuapp.com/api/products/${productId}`,
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
	fetch('https://murmuring-atoll-05490.herokuapp.com/api/users/purchaseFromCart',
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
			alert("Item purchased")
		}
		else {
			alert("Something went wrong")
		}
	})
})

