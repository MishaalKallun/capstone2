fetch(`https://murmuring-atoll-05490.herokuapp.com/api/orders/${productId}/request`,
	{
		method : "PUT",	
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify({
			qty: qty
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