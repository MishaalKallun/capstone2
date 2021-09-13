let restockModal = document.getElementById('restockModal')
let productOOS = document.getElementById("productOOS");

let params = new URLSearchParams(window.location.search);
let token = localStorage.getItem("token");
let productId = params.get('productId')

if (isAdmin === true){
	fetch ("https://murmuring-atoll-05490.herokuapp.com/api/products/inactive",{
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
							<a href="./restock.html?productId=${products._id}" class="btn btn-dark text-white btn-block">
								Request for Restock
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

		productOOS.innerHTML = productData
	})
}
else {

	fetch ("https://murmuring-atoll-05490.herokuapp.com/api/products/inactive",{
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
						<a href="./editProduct.html?productId=${products._id}" class="btn btn-dark text-white btn-block editButton">
								Edit Product
							</a>

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

		productOOS.innerHTML = productData
	})
}



/*restockModal.addEventListener('submit', (e)=> {
	e.preventDefault();

	let qty = document.getElementById('qty')

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
})*/