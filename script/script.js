let loginBtn = document.getElementById('loginBtn')
let registerBtn = document.getElementById('registerBtn')
let profileBtn = document.getElementById('profileBtn')
let logoutBtn = document.getElementById('logoutBtn')
let userLogin = localStorage.getItem("token");
let loginUser = document.getElementById('loginUser');

let adminBtn = document.getElementById("adminButton");
let productCatalogue = document.getElementById("productCatalogue");
let cardfooter;
let isAdmin = localStorage.getItem("token-isAdmin") === "true";


if(!userLogin){
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






loginUser.addEventListener('submit', (e) => {

	e.preventDefault();

	let token = localStorage.getItem("token");
	

	email = document.querySelector('#email').value;
	password = document.querySelector('#password').value;

	if(email === "" || password ===""){
		alert (`please input required field`)
	}
	else {
		fetch("https://murmuring-atoll-05490.herokuapp.com/api/users/login", {
		    method: "post",
		    headers: { "Content-Type": "application/json" },
		    body: JSON.stringify({ 
		    	email: email, 
		    	password: password 
		    })
		})
		.then(result => result.json())
		.then(result => {

			localStorage.setItem("token", result.access);
			if(result.access){
				fetch("https://murmuring-atoll-05490.herokuapp.com/api/users/details", {
					method: "GET",
					headers: {
						"Authorization": `bearer ${result.access}`
					}
				})
				.then(result => result.json())
				.then(result => {
					localStorage.setItem("token-id", result._id);
					localStorage.setItem("token-isAdmin", result.isAdmin);

					alert("Logged in Successfully")
					window.location.replace('./../pages/index.html')

				})

			}
			else {
				alert("Wrong Credentials")
				localStorage.clear();
				window.location.replace('./../pages/index.html')
			}

		})
	}
})


if (isAdmin === true){
	fetch ("https://murmuring-atoll-05490.herokuapp.com/api/products/all",{
	method: "GET",
	})	
	.then (result => result.json())
	.then (result => {
		console.log(result)
		if(result.length < 1){
			productData = `No products available`
		}
		else {
			productData = result.map ((products) => {

				if(isAdmin === false || !isAdmin){

					if(!userLogin){
						cardfooter = ``
					}
					else {
						cardfooter =
						`
							<a href="./addToCart.html?productId=${products._id}" class="btn btn-dark text-white btn-block">
								Add to Cart
							</a>

							<a href="./purchase.html?productId=${products._id}" class="btn btn-dark text-white btn-block">
								Buy Now
							</a>


							
						`
					}
					
				}
				else {
					if(products.isActive == true){
						cardfooter =
						`
							<a href="./editProduct.html?productId=${products._id}" class="btn btn-dark text-white btn-block editButton">
								Edit Product
							</a>

							<a href="./archiveProduct.html?productId=${products._id}" class="btn btn-dark text-white btn-block archiveButton">
								Archive Product
							</a>
						`
					}
					else
					{
						cardfooter =
						`
						<a href="./editProduct.html?productId=${products._id}" class="btn btn-dark text-white btn-block editButton">
								Edit Product
							</a>

						<a href="./unArchiveProduct.html?productId=${products._id}" class="btn btn-dark text-white btn-block unarchiveButton">
							Un-archive Product
						</a>

						<a href="./deleteProduct.html?productId=${products._id}" class="btn btn-dark text-white btn-block unarchiveButton">
							Delete Product
						</a>
						`
					}
					
				}

				return(
					`

						<div class="col-md-6 my-5">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">
										${products.productName}
									</h5>
									<p class="card-text text-left">
									${products.description}
									</p>
									<p class="card-text text-left">
									₱ ${products.price}
									</p>
									<p class="card-text text-left">
									remaining stock : ${products.inventory}
									</p>
								</div>
								<div class="card-footer">
									${cardfooter}
								</div>
							</div>
						</div>	

					`

					)
			}).join('')
		}

		productCatalogue.innerHTML = productData
	})
}
else {

	fetch ("https://murmuring-atoll-05490.herokuapp.com/api/products/active",{
		method: "GET",
		
	})
	.then (result => result.json())
	.then (result => {
		if(result.length < 1){
			productData = `No products available`
		}
		else {
			productData = result.map ((products) => {
				

				if(isAdmin === false || !isAdmin){

					if(!userLogin){
						cardfooter = ``
					}
					else {
						cardfooter =
						`
							<a href="./addToCart.html?productId=${products._id}" class="btn btn-dark text-white btn-block">
								Add to Cart
							</a>

							<a href="./purchase.html?productId=${products._id}" class="btn btn-dark text-white btn-block">
								Buy Now
							</a>
						`
					}
					
				}
				else {
					if(products.isActive == true){
						cardfooter =
						`
							<a href="./editCourse.html?productId=${products._id}" class="btn btn-dark text-white btn-block editButton">
								Edit Course
							</a>

							<a href="./archiveProduct.html?productId=${products._id}" class="btn btn-dark text-white btn-block archiveButton">
								Archive Course
							</a>
						`
					}
					else
					{
						cardfooter =
						`
						<a href="./unarchiveCourse.html?productId=${products._id}" class="btn btn-dark text-white btn-block unarchiveButton">
							Un-archive Course
						</a>

						<a href="./deleteProduct.html?productId=${products._id}" class="btn btn-dark text-white btn-block unarchiveButton">
							Delete
						</a>
						`
					}
					
				}

				return(
					`

						<div class="col-md-6 my-5">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">
										${products.productName}
									</h5>
									<p class="card-text text-left">
									${products.description}
									</p>
									<p class="card-text text-left">
									₱ ${products.price}
									</p>
									<p class="card-text text-left">
									remaining stock : ${products.inventory}
									</p>
								</div>
								<div class="card-footer">
									${cardfooter}
								</div>
							</div>
						</div>	

					`

					)
			}).join('')
		}

		productCatalogue.innerHTML = productData
	})
}

