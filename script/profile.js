let token = localStorage.getItem("token");
let tokenId = localStorage.getItem("token-id");
let cart = document.getElementById("cart");
let purchaseHistory = document.getElementById('purchaseHistory')

let name = document.getElementById("name");
let email = document.getElementById('email');
let address = document.getElementById('address');
let total = document.getElementById('total')


fetch ("http://localhost:3000/api/orders/myOrders",{
	method: "GET",
	headers: {
		"Authorization": `bearer ${token}`
	}
	
})
.then (result => result.json())
.then (result => {

	if(result.length < 1){
		productData = `<h4 class="text-white">No products available</h3>`
	}
	else {
		productData = result.map ((products) => {
			return(
				`

					<div class="col-md-6 my-5">
						<div class="card">
							<div class="card-body">
								<h5 class="card-title">
									${products.itemName}
								</h5>
								<p class="card-text text-left">
									Description : ${products.description}
								</p>
								<p class="card-text text-left">
									Price : ${products.price}
								</p>
							</div>
							
						</div>
					</div>	

				`

				)
			
		}).join('')
	}

	cart.innerHTML = productData
})


fetch ("http://localhost:3000/api/orders/purchaseHistory",{
	method: "GET",
	headers: {
		"Authorization": `bearer ${token}`
	}
	
})
.then (result => result.json())
.then (result => {

	if(result.length < 1){
		historyData = `<h4 class="text-white">No past purchase</h3>`
	}
	else {
		historyData = result.map ((products) => {
			return(
				`

					<div class="col-md-6 my-5">
						<div class="card">
							<div class="card-body">
								<h5 class="card-title">
									${products.itemName}
								</h5>
								<p class="card-text text-left">
									Description : ${products.description}
								</p>
								<p class="card-text text-left">
									Price : ${products.price}
								</p>
							</div>
						</div>
					</div>	

				`

				)
			
		}).join('')
	}

	purchaseHistory.innerHTML = historyData
})




fetch(`http://localhost:3000/api/users/details`,
	{
		method : "GET",
		headers : {	
			"Authorization": `Bearer ${token}`
		}
	}
)
.then( result => result.json())
.then( result => {

	name.innerHTML = 
	`
		<h2 class="mt-5 text-white">Welcome ${result.lastName}, ${result.firstName}</h2>
	`
	address.innerHTML = 
	`
		<h3 class="text-white">Address : ${result.address}</h3>
	`

	email.innerHTML = 
	`
		<h3 class="text-white">Email : ${result.email}</h3>
	`
})


fetch(`http://localhost:3000/api/users/cartTotal`,
	{
		method : "GET",
		headers : {	
			"Authorization": `Bearer ${token}`
		}
	}
)
.then( sum => sum.json())
.then( sum => {

	total.innerHTML = 
	`
		<h4 class="mt-2 text-white">total value of items in cart: ₱ ${sum}</h4>
	`
	
})