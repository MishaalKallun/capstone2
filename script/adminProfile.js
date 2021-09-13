let makeRevoke = document.getElementById('makeRevoke')
let newProduct = document.getElementById('newProduct')



makeRevoke.addEventListener('submit', (e) => {
	e.preventDefault();
	
	acctId = document.getElementById('acctId').value;
	token = localStorage.getItem("token");

	fetch(`http://localhost:3000/api/users/setAdmin/${acctId}`, {
		
		method: "GET",
		headers :{
			"Content-Type": "Application/json",
			"Authorization": `bearer ${token}`
		}
	})
	.then( result => result.json())
	.then( result => {

			alert(`Admin Status granted to ${acctId}`)
		
	})
})


makeRevoke.addEventListener('reset', (e) => {
	e.preventDefault();
	
	acctId = document.getElementById('acctId').value;
	token = localStorage.getItem("token");

	fetch(`http://localhost:3000/api/users/setNotAdmin/${acctId}`, {
		
		method: "GET",
		headers :{
			"Content-Type": "Application/json",
			"Authorization": `bearer ${token}`
		}
	})
	.then( result => result.json())
	.then( result => {

			alert(`Admin Status revoked from ${acctId}`)
		
	})
})

			
newProduct.addEventListener('submit', (e) => {
	e.preventDefault();
	
	productName = document.getElementById('productName').value;
	productDesc = document.getElementById('productDesc').value;
	productPrice = document.getElementById('productPrice').value;
	inventory = document.getElementById('inventory').value;

	token = localStorage.getItem("token");

	fetch ("http://localhost:3000/api/users/details",{
		method: "GET",
		headers: {
			"Authorization": `bearer ${token}`
		}
		
	})
	.then( result => result.json())
	.then (result => {
		fetch(`http://localhost:3000/api/products/addProduct`, {
				
			method: "POST",
			headers :{
				"Content-Type": "Application/json",
				"Authorization": `bearer ${token}`
			},
			body:JSON.stringify({
				productName: productName,
				description: productDesc,
				price: productPrice,
				inventory: inventory
			})
		})
		.then( result => result.json())
		.then( result => {

				alert(`Product has been added`)
			
		})
	})
})

restock.addEventListener('submit', (e) => {
	e.preventDefault();
	
	pId = document.getElementById('pId').value;
	qty = document.getElementById('qty').value;
	token = localStorage.getItem("token");

	fetch(`http://localhost:3000/api/products/${pId}/restock`, {
		
		method: "PUT",
		headers :{
			"Content-Type": "Application/json",
			"Authorization": `bearer ${token}`
		},
		body: JSON.stringify({
					inventory: qty
				})
	})
	.then( result => result.json())
	.then( result => {

			alert(`Product restocked`)
		
	})
})


	




