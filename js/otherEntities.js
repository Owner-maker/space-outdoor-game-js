game.spaceship = {
    x: 80,
    y: 140,
    width: 168,
    height: 109,
    frame: 0,
    frames: 8,
    frequency: 90,
    animate(){
        
        window.timerSpaceShip = setInterval(() => {
            this.frame++;
            if(this.frame ==this.frames){
                this.frame=0;
            }
        },this.frequency)
    }
}

game.layer3 = {
    x: 0,
    dyOnCanvas: 880,
    maxX: 4762
}

game.layer2 = {
    x: 0,
    dyOnCanvas: 440,
    maxX: 2260
}

game.layer1 = {
    x: 0,
    dyOnCanvas: 0,
    maxX: 1130
}

game.blocks = [
    block1 = {
        number: 0,
        begX: 0,
        endX: 1010,
        y: 265
    },
    block2 = {
        number: 1,
        begX: 1174,
        endX: 1755,
        y: 224
    },
    block3 = {
        number: 2,
        begX: 1919,
        endX: 2210,
        y: 265
    },
    block4 = {
        number: 3,
        begX: 2374,
        endX: 3394,
        y: 224
    },
    block5 = {
        number: 4,
        begX: 3558,
        endX: 3705,
        y: 265
    },
    block6 = {
        number: 5,
        begX: 3869,
        endX: 4233,
        y: 224
    },
    block7 = {
        number: 6,
        begX: 4398,
        endX: 4762,
        y: 265
    }
    

]