const input_labels = document.querySelectorAll(".input_field");
console.log(input_labels)
input_labels.forEach((input) => {
    input.addEventListener("focus",() => {
        input.classList.add("active");    });
        
    input.addEventListener("blur",() => {
        if(input.value != "") {return;}
        input.classList.remove("active");
    })
})