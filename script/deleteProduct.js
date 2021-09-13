let params = new URLSearchParams(window.location.search);
let productId = params.get('productId');

let token = localStorage.getItem('token');

fetch(`https://murmuring-atoll-05490.herokuapp.com/api/products/${productId}/delete`,
	{
		method: "DELETE",
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

