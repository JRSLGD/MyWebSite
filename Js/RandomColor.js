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
    red = red.toString(16).padStart(2,"0")
    green = green.toString(16).padStart(2,"0")
    blue = blue.toString(16).padStart(2,"0")
    alpha = Math.round(alpha*255)
    alpha = alpha.toString(16).padStart(2,"0")
    let code = ("#"+red + green + blue +alpha);
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
        let alpha = random_float();
        element.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        element.children[0].innerHTML = GiveHex(red,green,blue,alpha)
        }
    }
}



for (let index = 0; index < container.children.length; index++)
{
    let element = container.children[index]
    element.addEventListener("click", function () {
        element.classList.toggle("locked")
    })


}



window.addEventListener("keyup", function (event) 
{
    if (event.key === " " || event.key === "Spacebar")
        {
            generate_palette(  )
        } 
}
)

