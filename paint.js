class Paint{
    constructor(){
        
        this.x = null;
        this.y=null;
        this.color=null
        
    }

    setColor(color){
        this.color=color;
    }
    getColor(){
       return this.color;
    }

    setXCoord(x_coord){
        this.x=x_coord;
    }
    getXCoord(){
       return this.x;
    }

    setYCoord(y_coord){
        this.y = y_coord;
    }
    getYCoord(){
       return this.y;
    }
}



const canvas =document.getElementById("canvas");

const ctx =canvas.getContext("2d");


export {Paint}