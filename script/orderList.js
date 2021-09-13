let orderCatalogue = document.getElementById("orderCatalogue");
let cardfooter;
let token = localStorage.getItem("token");
let isAdmin = localStorage.getItem("token-isAdmin") === "true";


fetch ("http://localhost:3000/api/orders/allOrders",{
	method: "GET",
	headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
})
.then (result => result.json())
.then (result => {
	console.log(result)
	if(result.length < 1){
		orderData = `No orders available`
	}
	else {
		orderData = result.map ((orders) => {
			console.log (result)
			if(isAdmin === false || !isAdmin){

				return
				
			}

			else {
				return(
					`
						<div class="col-md-6 my-5">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">
									transaction id : ${orders._id}
									</h5>
									<p class="card-text text-left">
									customer id : ${orders.customerName}
									</p>
									<p class="card-text text-left">
									address : ${orders.customerAddress}
									</p>
									<p class="card-text text-left">
									price : ${orders.price}
									</p>
								</div>
								<div class="card-footer">
									${JSON.stringify(orders.itemsPurchased)}
								</div>
							</div>
						</div>	

					`
					)
			}

			
		}).join('')
	}

	orderCatalogue.innerHTML = orderData
})

if(!token){
	loginBtn.innerHTML = 
	`
		<li class="nav-item">
			<a href="./login.html" class="nav-link text-white" data-toggle="modal" data-target="#loginModal">Login</a>
		</li>

		

	`
	registerBtn.innerHTML = 
	`
		<li class="nav-item">
			<a href="./register.html" class="nav-link text-white">Register</a>
		</li>

	`
}
else {

	if (isAdmin === true) {
		profileBtn.innerHTML = 
	`
		<li class="nav-item">
			<a href="./adminProfile.html" class="nav-link text-white">profile</a>
		</li>

	`
	}
	else{
		profileBtn.innerHTML = 
	`
		<li class="nav-item">
			<a href="./profile.html" class="nav-link text-white">profile</a>
		</li>

	`
	}
	
	logoutBtn.innerHTML = 
	`
		<li class="nav-item">
			<a href="./logout.html" class="nav-link text-white">Logout</a>
		</li>

	`
}