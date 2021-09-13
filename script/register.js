let registerForm = document.getElementById('registerUser');

registerForm.addEventListener('submit', (e) => {

	e.preventDefault();

	firstName = document.getElementById('firstName').value;
	lastName = document.getElementById('lastName').value;
	address = document.getElementById('address').value;
	email = document.getElementById('email').value;
	password = document.getElementById('password').value;
	password2 = document.getElementById('password2').value;

		if( password === password2 && password !== "" && password2 !==""){

			fetch("http://localhost:3000/api/users/checkEmail", {

				method: "POST",
				headers :{
					"Content-Type": "Application/json"
				},
				body: JSON.stringify({
					email: email
				})
			})
			.then( result => result.json())
			.then( result => {

				if(result === false){
					fetch("http://localhost:3000/api/users/register",{
						method: "POST",
						headers: {
							"Content-Type":"Application/json"
						},
						body: JSON.stringify({
							firstName: firstName,
							lastName : lastName,
							address: address,
							email: email,
 							password: password
						})
					})
					.then( result => result.json())
					.then( result => {
						console.log(result)
						if (result === true) {
							alert("Something went wrong")
						}
						else {
							alert("Registered Successfully")
							window.location.replace('./index.html')
						}
					})
				}
				else {
					alert("Email Already Exists")
				}
			})
		}
});