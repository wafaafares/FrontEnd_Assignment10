//To store all the accounts we have, sotres objects
var accounts = []
if (localStorage.getItem('accounts') != null)
    accounts = JSON.parse(localStorage.getItem('accounts'))
console.log(accounts)


var NameSignUp = document.querySelector('#NameSignUp')
var emailSignUp = document.querySelector('#emailSignUp')
var passwordSignUp = document.querySelector('#passwordSignUp')

var emailLogIn = document.querySelector('#emailLogIn')
var passwordLogIn = document.querySelector('#passwordLogIn')

var logInBtn = document.querySelector('#LogInBtn')
var SignUpBtn = document.querySelector('#SignUpBtn')


var SignUpLink = document.querySelector('#SignUpLink')
var SignInLink = document.querySelector('#SignInLink')

logInBtn.addEventListener('click', logIn)
SignUpBtn.addEventListener('click', SignUp)
SignUpLink.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector('.SignUpGroup').classList.replace('d-none', 'd-flex')
    document.querySelector('.logInGroup').classList.replace('d-flex', 'd-none')
})

SignInLink.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector('.logInGroup').classList.replace('d-none', 'd-flex')
    document.querySelector('.SignUpGroup').classList.replace('d-flex', 'd-none')

})

function logIn() {
    //If one or both of inputs empty
    if (emailLogIn.value == '' || passwordLogIn.value == '') {
        document.querySelector('#LogInStatus').innerHTML = `All inputs are required`
        document.querySelector("#LogInStatus").style.cssText = `color: #DC3545;`
    } else {

        for (var i = 0; i < accounts.length; i++) {
            //Check if the eamil is exsit
            if (emailLogIn.value == accounts[i].email) {
                //Check is the password correct for the found email
                if (passwordLogIn.value == accounts[i].password) {
                    document.querySelector('#LogInStatus').innerHTML = `Success Log In`
                    document.querySelector("#LogInStatus").style.cssText = `color: #28A745;`
                    document.querySelector(".logInGroup").classList.replace('d-flex','d-none')
                    document.querySelector("#afterLogIn").classList.replace('d-none','d-block')
                    document.querySelector('#afterLogIn').innerHTML = `
                    <nav class="navbar navbar-expand-lg shadowElement p-3">
                        <div class="container">
                            <a href="#" class="navbar-brand text-white">SMART LOGIN</a>
                            <button id="logOutBtn" onclick="logOut()" class="btn btn-outline-warning">Log Out</button>
                        </div>
                    </nav>
                    <div class="container h-100 d-flex align-items-center justify-content-center">
                    <div class="container d-flex align-items-center justify-content-center text-center p-5">
                        <div class="welcoming shadowElement p-5 w-75">
                            <h1 >Hello ${accounts[i].name}</h1>
                        </div>
                    </div>
                    </div>
                    `
                    clearInputsLogIn()
                    document.querySelector('#LogInStatus').innerHTML = ''
                    return
                    //Here we should open a different page saying hello 
                }
            }
        }

        document.querySelector('#LogInStatus').innerHTML = `incorrect email or password`
        document.querySelector("#LogInStatus").style.cssText = `color: #DC3545;`
        clearInputsLogIn()
    }
}

function SignUp() {
    //If no input
    if (NameSignUp.value == '' || emailSignUp.value == '' || passwordSignUp == '') {
        document.querySelector('#SignUpStatus').innerHTML = "All inputs are required"
        document.querySelector('#SignUpStatus').style.cssText = 'color: #DC3545;'
    }

    else {

        //Check if the eamil already exsits
        for (var i = 0; i < accounts.length; i++) {
            if (emailSignUp.value == accounts[i].email) {
                document.querySelector('#SignUpStatus').innerHTML = "Email already exist!"
                document.querySelector('#SignUpStatus').style.cssText = 'color: #DC3545;'
                return //To terminate the function
            }

        }
        var newAccount = {
            name: NameSignUp.value,
            email: emailSignUp.value,
            password: passwordSignUp.value
        }
        accounts.push(newAccount)
        updateLocalStorage()
        document.querySelector('#SignUpStatus').innerHTML = "Success"
        document.querySelector('#SignUpStatus').style.cssText = 'color: #28A745;'
        clearInputsSignUp()
        console.log("Pushed in the array successfuly")
        
    }

}

function updateLocalStorage() {
    localStorage.setItem('accounts', JSON.stringify(accounts))
}

function clearInputsLogIn() {
    emailLogIn.value = ''
    passwordLogIn.value = ''
}

function clearInputsSignUp() {
    NameSignUp.value = ''
    emailSignUp.value = ''
    passwordSignUp.value = ''
}

function logOut(){
    console.log('hell')
    document.querySelector('#afterLogIn').classList.replace('d-block', 'd-none')
    document.querySelector('.logInGroup').classList.replace('d-none', 'd-flex')
}
