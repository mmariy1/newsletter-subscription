const subscribeBtn = document.getElementById("subscribe-btn");

const dismissBtn = document.getElementById("dismiss-btn");

const container = document.getElementsByClassName("container")[0];

const subscribed = document.getElementsByClassName("subscribed")[0];

const emailInput = document.getElementById("email-input")

const emailConfirm = document.getElementById("email-confirm")

const incorrectEmail = document.getElementById("incorrect-email")

localStorage.setItem("subscribedHidden", "true") 

if (localStorage.getItem("containerHidden") === "true"){
    container.style.display = "none"
}

if (localStorage.getItem("subscribedHidden") === "true"){
    subscribed.style.display = "none"
} else {
    subscribed.style.display = "flex"
}


emailInput.addEventListener("input", function(){
    if (isValidEmail(emailInput.value)) {
        subscribeBtn.disabled = false;
    }
});

function isValidEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

subscribeBtn.addEventListener("click", function(event){
    if (!isValidEmail(emailInput.value)) {
        incorrectEmail.textContent = "Valid email required"
        emailInput.style.borderColor = "hsl(4, 100%, 67%)"
        emailInput.style.backgroundColor = "rgba(255, 97.92, 86.7, .2)"
        subscribeBtn.disabled = true
        event.preventDefault()
    }else {
        event.preventDefault()
        localStorage.setItem("email", emailInput.value)
        container.style.display = "none"
        subscribed.style.display = "flex"
        localStorage.setItem("containerHidden", "true")
        localStorage.setItem("subscribedHidden", "false")
        emailInput.value = ""
        emailConfirm.innerHTML = `A confirmation email has been sent to <span id="bold">${localStorage.getItem("email")}</span>. Please open it and click the button inside to confirm your subscription.`
    }
    
})
dismissBtn.addEventListener("click", function(){
    container.style.display = "flex";
    subscribed.style.display = "none";
    localStorage.setItem('containerHidden', "false")
    localStorage.setItem("subscribedHidden", "true")

})

window.onload = function(){
    if (localStorage.getItem("containerHidden") === "true"){
        container.style.display = "flex"
        subscribed.style.display = "none"
    }
}
