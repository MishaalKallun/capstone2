
let params = new URLSearchParams(window.location.search);
let productId = params.get('productId');

let token = localStorage.getItem('token');

fetch(`http://localhost:3000/api/products/${productId}/activate`,
	{
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`
		},
	}
)
.then( result => {
	console.log(result)

	if(result){		
		window.location.replace('./index.html');
	} else {
		alert("Something went wrong");
	}
})

