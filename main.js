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


canvas.addEventListener("mousemove",(e)=>{
    if(isClickOn){

        let x_coord =e.offsetX;
        let y_coord =e.offsetY;
        let color = paintColor.value;


        if(erase){ 
            ctx.beginPath();
            ctx.moveTo(firstEvent.offsetX, firstEvent.offsetY);
            ctx.lineTo(x_coord, y_coord);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 7;
            ctx.lineCap = 'round';
            ctx.stroke();
            firstEvent = e;       
        }
        else{
            ctx.beginPath();
            ctx.moveTo(firstEvent.offsetX, firstEvent.offsetY);
            ctx.lineTo(x_coord, y_coord);
            ctx.strokeStyle = color;
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.stroke();
            firstEvent = e;
        }

    }
})

let firstEvent;
canvas.addEventListener("mousedown",(e)=>{
    isClickOn =true;
    firstEvent =e;
})

const stopToDraw = ["mouseover","mouseup"].map((event)=>{
    canvas.addEventListener(event,()=>{
        isClickOn = false
    })
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
