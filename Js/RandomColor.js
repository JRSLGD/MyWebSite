function random_int(min = 0,max = 1)
{
    let randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
}

function random_float(min = 0 ,max = 1 , decimals = 1) 
{
    let randomNum = Math.random() * (max - min) + min;
    randomNum = Number(randomNum.toFixed(decimals))
    return randomNum
}

function GiveHex(red = 0, green = 0, blue = 0, alpha = 1) {
    let hex_red = red.toString(16).padStart(2,"0")
    let hex_green = green.toString(16).padStart(2,"0")
    let hex_blue = blue.toString(16).padStart(2,"0")
    alpha = Math.round(alpha*255)
    let hex_alpha = alpha.toString(16).padStart(2,"0")
    let code = ("#"+hex_red + hex_green + hex_blue + hex_alpha);
    return code.toUpperCase();
}


let container = document.getElementById("container");



function generate_palette(){
    for (let index = 0; index < container.children.length; index++) 
    {   
        let element = container.children[index]
        console.log(element.classList)
        if (element.classList.contains(`locked`)) {
            console.log(element + "is in locked state")
        } else {
        let red = random_int(0,255);
        let green = random_int(0,255);
        let blue = random_int(0,255);
        let alpha = random_float(0.3,0.8);
        element.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        element.children[0].innerHTML = GiveHex(red,green,blue,alpha)
        }
    }
}



for (let index = 0; index < container.children.length; index++)
{
    let color_box = container.children[index];
    let buttons_container = color_box.children[1];
    let lock_button = buttons_container.children[0];
    let copy_button = buttons_container.children[1];
    lock_button.addEventListener("click", function () {
        color_box.classList.toggle("locked");
    })
    copy_button.addEventListener("click", function() {
        let hex_code_label = color_box.children[0]
        try {
            navigator.clipboard.writeText(hex_code_label.textContent);
        } catch (error) {
            alert("Something went wrong... ",error);
        }
    })
    

}



window.addEventListener("keyup", function (event) 
{
    if (event.key.toLowerCase() =="r")
        {
            generate_palette()
        } 
}
)

document.addEventListener("DOMContentLoaded", generate_palette())