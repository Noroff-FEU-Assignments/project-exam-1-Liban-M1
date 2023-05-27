document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contactForm");
    const nameInput = document.querySelector("#name");
    const subjectInput = document.querySelector("#subject");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");

    const nameError = document.querySelector("#nameError");
    const subjectError = document.querySelector("#subjectError");
    const emailError = document.querySelector("#emailError");
    const messageError = document.querySelector("#messageError");

    const sendButton = document.querySelector("#btn");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (nameInput.value.trim().length <= 5) {
            nameError.style.display = "block";
        } else {
            nameError.style.display = "none";
        }

        if (subjectInput.value.trim().length <= 15) {
            subjectError.style.display = "block";
        } else { 
            subjectError.style.display = "none";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
            emailInput.value.trim() === "" ||
            !emailRegex.test(emailInput.value.trim())
        ) {
            emailError.style.display = "block";
        } else { 
            emailError.style.display = "none";
        }

        if (messageInput.value.trim().length <= 25) {
            messageError.style.display = "block";
        } else { 
            messageError.style.display = "none";
        }

        if (
            nameError.style.display === "none" &&
            subjectError.style.display === "none" &&
            emailError.style.display === "none" &&
            messageError.style.display === "none"
        ) {
            alert("Message Successfully Sent!");
            form.reset();
        }
    });

    form.addEventListener("input", function () {
        sendButton.disabled = !form.checkValidity();
    });
});