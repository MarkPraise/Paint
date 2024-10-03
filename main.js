const canvas = document.getElementById("canvas");

const ctx =canvas.getContext("2d");

const paintColor =document.querySelector('input[type="color"]');

const eraseButton =document.querySelector(".eraseButton span");
const clearAll =document.querySelector(".clearAll");

// sets the bgColor
paintColor.style.backgroundColor = paintColor.value;
paintColor.addEventListener("change",()=>{
    paintColor.style.backgroundColor = paintColor.value;
})

let isClickOn = false;

let erase = false;

clearAll.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})


eraseButton.addEventListener("click",()=>{
    if(!erase){
        eraseButton.textContent ="Stop Erasing";
        erase=true;
    }
    else{
        eraseButton.textContent ="Erase";
        erase=false
    }
})


canvas.addEventListener("mousemove",(event)=>{
    if(isClickOn){

        let x_coord =event.offsetX;
        let y_coord =event.offsetY;
        let color = paintColor.value;


        if(erase){
            ctx.clearRect(x_coord,y_coord,5,5);         
        }
        else{
            ctx.fillStyle =color;
            ctx.fillRect(x_coord,y_coord,5,5);
        }
    }
})

canvas.addEventListener("mousedown",()=>{
    isClickOn =true;
})
canvas.addEventListener("mouseup",()=>{
    isClickOn =false;
})

function saveCanvas() {
    const dataURL = canvas.toDataURL(); 
    localStorage.setItem("savedCanvas", dataURL); 
}

function loadCanvas() {
    const savedData = localStorage.getItem("savedCanvas");
    if (savedData) {
      const img = new Image();
      img.src = savedData;
      img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear current canvas
        ctx.drawImage(img, 0, 0); // Redraw the image from localStorage
      };
    }
}

window.addEventListener("unload",saveCanvas)
window.addEventListener("load",loadCanvas)
