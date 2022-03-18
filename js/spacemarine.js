game.spacemarine = {
    healthItem: 5,
    healthRegenPermision: true,
    velocity: 6,
    dx: 0,
    x: 405,
    y: 265,
    width: 70,
    height: 77,
    jumpCount: 0,
	jumpLength: 38,
    jumpHeight: 0,

    currNumberOfBlock:0,
    stayingOnBlock:true,
    checkingBlock:true,
    landing:true,
    fallingPermission:true,
    deathPermission:true,

    commonBullets: [],
    turretBullets: [],
    bigBullets: [],
    bigBulletsAmount: 35,
    turretsAmount: 6,
    currentTurret: null,
    animateBullet(bullet) {
        if(bullet.animationPermission){
            bullet.animationPermission = false;
            bullet.timer =  setInterval(() => {
                bullet.x+=bullet.speed;
            }, 25);
        }
    },
    animateTurret(currentBullet){
        if(game.setTurretPermission){
            game.setTurretPermission = false;
            this.currentTurret.bullets = 0;
            this.currentTurret.frame = 1;
            this.currentTurret.maxBullets = 15;
            window.timerTurretShoot = setInterval(() => {
                let bullet = new Bullet(
                    currentBullet.x,
                    currentBullet.y,
                    currentBullet.speed,
                    currentBullet.width,
                    currentBullet.height,
                    currentBullet.offsetForY
                )
                this.animateBullet(bullet);
                this.turretBullets.push(bullet);
                

                this.currentTurret.bullets ++;
                this.currentTurret.frame++;
                if(this.currentTurret.frame ==3){
                    this.currentTurret.frame=1;
                }
                if(this.currentTurret.bullets == this.currentTurret.maxBullets){
                    clearInterval(window.timerTurretShoot);
                    game.setTurretPermission = true;
                }
            },110)
        }
    },
    commonBulletMove(){
        if(this.commonBullets.length!=0){
            for (let i=0;i<this.commonBullets.length;i++){
                this.animateBullet(this.commonBullets[i]);
                if((this.currNumberOfBlock!=6)&&(this.commonBullets[i].speed>0)&&(this.commonBullets[i].x + game.layer3.x + this.bulletStopRight.width/2>game.blocks[this.currNumberOfBlock+1].begX)&&(this.commonBullets[i].y + this.currentStyle.height>game.blocks[this.currNumberOfBlock+1].y)){
                    this.commonBullets[i].stopX = this.commonBullets[i].x;
                    this.commonBullets[i].stopY = this.commonBullets[i].y;
    
                }
                else if((this.currNumberOfBlock!=0)&&(this.commonBullets[i].speed<0)&&(this.commonBullets[i].x + game.layer3.x + this.commonBullets[i].width/2<game.blocks[this.currNumberOfBlock-1].endX)&&(this.commonBullets[i].y + this.currentStyle.height>game.blocks[this.currNumberOfBlock-1].y)){
                    this.commonBullets[i].stopX = this.commonBullets[i].x;
                    this.commonBullets[i].stopY = this.commonBullets[i].y;
                }
                else if ((this.commonBullets[i].x>game.width)||(this.commonBullets[i].x<-this.commonBullets[i].width)){              
                    this.commonBullets.splice(i,1)
                    
                }
                else{
                    for (let j=0; j<game.aliens1.length;j++){
                        
                        if((game.aliens1[j]!=undefined)&&(this.commonBullets[i])){
                            if ((game.blocks[this.currNumberOfBlock].y==game.blocks[game.aliens1[j].currentBlock].y)&&(((this.commonBullets[i].speed>0)&&(this.commonBullets[i].x + game.layer3.x >= game.aliens1[j].x)&&(this.commonBullets[i].x + game.layer3.x < game.aliens1[j].x + game.aliens1[j].width))||((this.commonBullets[i].speed<0)&&(this.commonBullets[i].x + game.layer3.x > game.aliens1[j].x)&&(this.commonBullets[i].x + game.layer3.x + this.commonBullets[i].width*1.5<= game.aliens1[j].x + game.aliens1[j].width)))){
                                if(game.aliens1[j].health!=0){
                                    game.aliens1[j].health--;
                                    if(game.aliens1[j].health==0){
                                        let x = game.aliens1[j].x;
                                        let y = game.aliens1[j].y;
                                        clearInterval(game.aliens1[j].timerAlien1Move)
                                        game.aliens1[j].deletePermission = true
                                        delete game.aliens1[j]

                                        var frame = 0;
                                        window.timerAlienDeath = setInterval(() => {
                                            window.requestAnimationFrame(() => {
                                                game.ctx.drawImage(game.sprites.aliens, frame * game.alienDeathAnimation.width, game.alienDeathAnimation.offsetForY,game.alienDeathAnimation.width, game.alienDeathAnimation.height, x  - game.layer3.x, y, game.alienDeathAnimation.width, game.alienDeathAnimation.height) 
                                            })
                                            frame++;
                                            
                                            
                                            if(frame==6){
                                                clearInterval(window.timerAlienDeath)
                                            }
                                        }, 35);

                                        game.currentWave.alien1Max--;
                                        game.currentAmountOfAliens1--;
                                        if(game.currentAmountOfAliens1==0){
                                            game.alien1CreatePermission = true;
                                        }
                                    }
                                }
                                
                                this.commonBullets.splice(i,1);
                            }
                        }
                    }

                    for (let j=0; j<game.aliens2.length;j++){
                        
                        if((game.aliens2[j]!=undefined)&&(this.commonBullets[i])){
                            if ((game.blocks[this.currNumberOfBlock].y==game.blocks[game.aliens2[j].currentBlock].y)&&(((this.commonBullets[i].speed>0)&&(this.commonBullets[i].x + game.layer3.x >= game.aliens2[j].x)&&(this.commonBullets[i].x + game.layer3.x < game.aliens2[j].x + game.aliens2[j].width))||((this.commonBullets[i].speed<0)&&(this.commonBullets[i].x + game.layer3.x > game.aliens2[j].x)&&(this.commonBullets[i].x + game.layer3.x + this.commonBullets[i].width*1.5<= game.aliens2[j].x + game.aliens2[j].width)))){
                                if(game.aliens2[j].health!=0){
                                    game.aliens2[j].health--;
                                    if(game.aliens2[j].health==0){
                                        let x = game.aliens2[j].x;
                                        let y = game.aliens2[j].y+35;
                                        clearInterval(game.aliens2[j].timerAlien2Move)
                                        game.aliens2[j].deletePermission = true
                                        delete game.aliens2[j]

                                        var frame = 0;
                                        window.timerAlienDeath = setInterval(() => {
                                            window.requestAnimationFrame(() => {
                                                game.ctx.drawImage(game.sprites.aliens, frame * game.alienDeathAnimation.width, game.alienDeathAnimation.offsetForY,game.alienDeathAnimation.width, game.alienDeathAnimation.height, x  - game.layer3.x, y, game.alienDeathAnimation.width, game.alienDeathAnimation.height) 
                                            })
                                            frame++;
                                            
                                            
                                            if(frame==6){
                                                clearInterval(window.timerAlienDeath)
                                            }
                                        }, 35);

                                        game.currentWave.alien2Max--;
                                        game.currentAmountOfAliens2--;
                                        if(game.currentAmountOfAliens2==0){
                                            game.alien2CreatePermission = true;
                                        }
                                    }
                                }
                                
                                this.commonBullets.splice(i,1);
                            }
                        }
                    }
                }
                

                
            }
        }
    },
    turretBulletMove(){
        if(this.turretBullets.length!=0){
            for (let i=0;i<this.turretBullets.length;i++){
                if((this.currentTurret.currNumberOfBlock!=6)&&(this.turretBullets[i].speed>0)&&(this.turretBullets[i].x + this.turretBullets[i].width/1.5>game.blocks[this.currentTurret.currNumberOfBlock+1].begX)&&(this.turretBullets[i].y + this.currentStyle.height>game.blocks[this.currentTurret.currNumberOfBlock+1].y)){
                    
                    this.turretBullets[i].stopX = this.turretBullets[i].x;
                    this.turretBullets[i].stopY = this.turretBullets[i].y;
                }
                else if((this.currentTurret.currNumberOfBlock!=0)&&(this.turretBullets[i].speed<0)&&(this.turretBullets[i].x<game.blocks[this.currentTurret.currNumberOfBlock-1].endX)&&(this.turretBullets[i].y + this.currentStyle.height>game.blocks[this.currentTurret.currNumberOfBlock-1].y)){
                    this.turretBullets[i].stopX = this.turretBullets[i].x;
                    this.turretBullets[i].stopY = this.turretBullets[i].y;
                }
                else if ((this.turretBullets[i].x+this.turretBullets[i].width<0)||(this.turretBullets[i].x> game.layer3.maxX)||(this.turretBullets[i].x+this.turretBullets[i].width < game.layer3.x)||(this.turretBullets[i].x > game.layer3.x + game.width)){              
                    this.turretBullets.splice(i,1)
                }
                else{
                    for (let j=0; j<game.aliens1.length;j++){
                        
                        if((game.aliens1[j]!=undefined)&&(this.turretBullets[i])){
                            if ((this.currentTurret.y+this.currentTurret.height==game.blocks[game.aliens1[j].currentBlock].y)&&(((this.turretBullets[i].speed>0)&&(this.turretBullets[i].x  >= game.aliens1[j].x)&&(this.turretBullets[i].x  < game.aliens1[j].x + game.aliens1[j].width))||((this.turretBullets[i].speed<0)&&(this.turretBullets[i].x  > game.aliens1[j].x)&&(this.turretBullets[i].x  + this.turretBullets[i].width*1.5<= game.aliens1[j].x + game.aliens1[j].width)))){
                               
                                if(game.aliens1[j].health!=0){
                                    game.aliens1[j].health--;
                                    if(game.aliens1[j].health==0){
                                        let x = game.aliens1[j].x;
                                        let y = game.aliens1[j].y;
                                        clearInterval(game.aliens1[j].timerAlien1Move)
                                        game.aliens1[j].deletePermission = true
                                        delete game.aliens1[j]

                                        var frame = 0;
                                        window.timerAlienDeath = setInterval(() => {
                                            window.requestAnimationFrame(() => {
                                                game.ctx.drawImage(game.sprites.aliens, frame * game.alienDeathAnimation.width, game.alienDeathAnimation.offsetForY,game.alienDeathAnimation.width, game.alienDeathAnimation.height, x  - game.layer3.x, y, game.alienDeathAnimation.width, game.alienDeathAnimation.height) 
                                            })
                                            frame++;
                                            
                                            
                                            if(frame==6){
                                                clearInterval(window.timerAlienDeath)
                                            }
                                        }, 35);

                                        game.currentWave.alien1Max--;
                                        game.currentAmountOfAliens1--;
                                        if(game.currentAmountOfAliens1==0){
                                            game.alien1CreatePermission = true;
                                        }
                                    }
                                }
                                
                                this.turretBullets.splice(i,1);
                            }
                        }
                    }

                    for (let j=0; j<game.aliens2.length;j++){
                        
                        if((game.aliens2[j]!=undefined)&&(this.turretBullets[i])){
                            if ((this.currentTurret.y+this.currentTurret.height==game.blocks[game.aliens2[j].currentBlock].y)&&(((this.turretBullets[i].speed>0)&&(this.turretBullets[i].x  >= game.aliens2[j].x)&&(this.turretBullets[i].x  < game.aliens2[j].x + game.aliens2[j].width))||((this.turretBullets[i].speed<0)&&(this.turretBullets[i].x  > game.aliens2[j].x)&&(this.turretBullets[i].x  + this.turretBullets[i].width*1.5<= game.aliens2[j].x + game.aliens2[j].width)))){
                               
                                if(game.aliens2[j].health!=0){
                                    game.aliens2[j].health--;
                                    if(game.aliens2[j].health==0){
                                        let x = game.aliens2[j].x;
                                        let y = game.aliens2[j].y+35;
                                        clearInterval(game.aliens2[j].timerAlien2Move)
                                        game.aliens2[j].deletePermission = true
                                        delete game.aliens2[j]

                                        var frame = 0;
                                        window.timerAlienDeath = setInterval(() => {
                                            window.requestAnimationFrame(() => {
                                                game.ctx.drawImage(game.sprites.aliens, frame * game.alienDeathAnimation.width, game.alienDeathAnimation.offsetForY,game.alienDeathAnimation.width, game.alienDeathAnimation.height, x  - game.layer3.x, y, game.alienDeathAnimation.width, game.alienDeathAnimation.height) 
                                            })
                                            frame++;
                                            
                                            
                                            if(frame==6){
                                                clearInterval(window.timerAlienDeath)
                                            }
                                        }, 35);

                                        game.currentWave.alien2Max--;
                                        game.currentAmountOfAliens2--;
                                        if(game.currentAmountOfAliens2==0){
                                            game.alien2CreatePermission = true;
                                        }
                                    }
                                }
                                
                                this.turretBullets.splice(i,1);
                            }
                        }
                    }
                }
                
            }
        }
    },
    bigBulletMove(){
        if(this.bigBullets.length!=0){
            for (let i=0;i<this.bigBullets.length;i++){
                this.animateBullet(this.bigBullets[i]);
                
                if((this.currNumberOfBlock!=6)&&(this.bigBullets[i].speed>0)&&(this.bigBullets[i].x + game.layer3.x + this.bulletStopRight.width/2>game.blocks[this.currNumberOfBlock+1].begX)&&(this.bigBullets[i].y + this.currentStyle.height>game.blocks[this.currNumberOfBlock+1].y)){
                    this.bigBullets[i].stopX = this.bigBullets[i].x + game.layer3.x;
                    this.bigBullets[i].stopY = this.bigBullets[i].y;
    
                }
                else if((this.currNumberOfBlock!=0)&&(this.bigBullets[i].speed<0)&&(this.bigBullets[i].x + game.layer3.x + this.bigBullets[i].width/2<game.blocks[this.currNumberOfBlock-1].endX)&&(this.bigBullets[i].y  + this.currentStyle.height>game.blocks[this.currNumberOfBlock-1].y)){
                    this.bigBullets[i].stopX = this.bigBullets[i].x + game.layer3.x;
                    this.bigBullets[i].stopY = this.bigBullets[i].y;
                }
                else if ((this.bigBullets[i].x>game.width)||(this.bigBullets[i].x<-this.bigBullets[i].width)){              
                    this.bigBullets.splice(i,1)
                    if(this.bigBullets.length==0){
                        game.shootBigPermission =true;
                    }
                }
                else{
                    for (let j=0; j<game.aliens1.length;j++){
                        
                        if((game.aliens1[j]!=undefined)&&(this.bigBullets[i])){
                            if ((game.blocks[this.currNumberOfBlock].y==game.blocks[game.aliens1[j].currentBlock].y)&&(((this.bigBullets[i].speed>0)&&(this.bigBullets[i].x + game.layer3.x >= game.aliens1[j].x)&&(this.bigBullets[i].x + game.layer3.x < game.aliens1[j].x + game.aliens1[j].width))||((this.bigBullets[i].speed<0)&&(this.bigBullets[i].x + game.layer3.x > game.aliens1[j].x)&&(this.bigBullets[i].x + game.layer3.x + this.bigBullets[i].width*1.5<= game.aliens1[j].x + game.aliens1[j].width)))){
                               
                                if(game.aliens1[j].health!=0){
                                    game.aliens1[j].health-=6;
                                    if(game.aliens1[j].health<=0){
                                        let x = game.aliens1[j].x;
                                        let y = game.aliens1[j].y;
                                        clearInterval(game.aliens1[j].timerAlien1Move)
                                        game.aliens1[j].deletePermission = true
                                        delete game.aliens1[j]

                                        var frame = 0;
                                        window.timerAlienDeath = setInterval(() => {
                                            window.requestAnimationFrame(() => {
                                                game.ctx.drawImage(game.sprites.aliens, frame * game.alienDeathAnimation.width, game.alienDeathAnimation.offsetForY,game.alienDeathAnimation.width, game.alienDeathAnimation.height, x  - game.layer3.x, y, game.alienDeathAnimation.width, game.alienDeathAnimation.height) 
                                            })
                                            frame++;
                                            
                                            
                                            if(frame==6){
                                                clearInterval(window.timerAlienDeath)
                                            }
                                        }, 35);

                                        game.currentWave.alien1Max--;
                                        game.currentAmountOfAliens1--;
                                        if(game.currentAmountOfAliens1==0){
                                            game.alien1CreatePermission = true;
                                        }
                                    }
                                }
                                
                                this.bigBullets[i].stopX = this.bigBullets[i].x + game.layer3.x;
                                this.bigBullets[i].stopY = this.bigBullets[i].y;
                            }
                        }
                    }

                    for (let j=0; j<game.aliens2.length;j++){
                        
                        if((game.aliens2[j]!=undefined)&&(this.bigBullets[i])){
                            if ((game.blocks[this.currNumberOfBlock].y==game.blocks[game.aliens2[j].currentBlock].y)&&(((this.bigBullets[i].speed>0)&&(this.bigBullets[i].x + game.layer3.x >= game.aliens2[j].x)&&(this.bigBullets[i].x + game.layer3.x < game.aliens2[j].x + game.aliens2[j].width))||((this.bigBullets[i].speed<0)&&(this.bigBullets[i].x + game.layer3.x > game.aliens2[j].x)&&(this.bigBullets[i].x + game.layer3.x + this.bigBullets[i].width*1.5<= game.aliens2[j].x + game.aliens2[j].width)))){
                               
                                if(game.aliens2[j].health!=0){
                                    game.aliens2[j].health-=6;
                                    if(game.aliens2[j].health<=0){
                                        let x = game.aliens2[j].x;
                                        let y = game.aliens2[j].y+35;
                                        clearInterval(game.aliens2[j].timerAlien2Move)
                                        game.aliens2[j].deletePermission = true
                                        delete game.aliens2[j]

                                        var frame = 0;
                                        window.timerAlienDeath = setInterval(() => {
                                            window.requestAnimationFrame(() => {
                                                game.ctx.drawImage(game.sprites.aliens, frame * game.alienDeathAnimation.width, game.alienDeathAnimation.offsetForY,game.alienDeathAnimation.width, game.alienDeathAnimation.height, x  - game.layer3.x, y, game.alienDeathAnimation.width, game.alienDeathAnimation.height) 
                                            })
                                            frame++;
                                            
                                            
                                            if(frame==6){
                                                clearInterval(window.timerAlienDeath)
                                            }
                                        }, 35);

                                        game.currentWave.alien2Max--;
                                        game.currentAmountOfAliens2--;
                                        if(game.currentAmountOfAliens2==0){
                                            game.alien2CreatePermission = true;
                                        }
                                    }
                                }
                                
                                this.bigBullets[i].stopX = this.bigBullets[i].x + game.layer3.x;
                                this.bigBullets[i].stopY = this.bigBullets[i].y;
                            }
                        }
                    }
                }
            }
        }
    },
    healthRegen(){
        if((this.healthItem !=5)&&(this.health.width!=205)&&(this.healthRegenPermision)){
            this.healthRegenPermision = false;
            window.timerHealthRegen = setTimeout(() => {
                this.healthItem++;
                this.health.width+=41;
                this.healthRegenPermision=true;
                if((this.healthItem==5)&&(this.health.width == 205)){
                    clearTimeout(window.timerHealthRegen)
                    this.healthRegenPermision=true;
                }
            }, 5000);
        }
    },
    death(){   
                                                     
        if((this.healthItem==0)&&(this.deathPermission)){
            this.deathPermission = false;
            clearTimeout(window.timerHealthRegen)
            if((game.currentButton == KEYS.RIGHT)||(game.currentButton == KEYS.RIGHT_WASD)){
                this.currentStyle = this.deathStyleRight;
            }
            else if((game.currentButton == KEYS.LEFT)||(game.currentButton == KEYS.LEFT_WASD)){
                this.currentStyle = this.deathStyleLeft
            }
            clearInterval(window.timerId)
            this.frame=0;
            window.cannot = setInterval(() => {
                this.dx=0;
                game.jumpPressed = false;
                game.leftPressed = false;
                game.rightPressed = false;
            },5);
            

            window.timerDeathSpacemarine = setInterval(() => {
                if(this.frame!=3){
                    this.frame++;
                }
                this.commonBullets.length=0
                this.y += this.velocity+6;
                if(this.y>530){
                    clearInterval(window.timerDeathSpacemarine);
                    clearInterval(window.timerIdFalling);
                    clearInterval(window.cannot)
                    game.gameOver();
                }
            }, 30);
            
        }
        
    },
    health: {
        width: 205,
        height: 44,
        offsetForY: 1144  
    },
    abilities:{
        width: 208,
        height: 45,
        offsetForY: 1188
    },
    heads:{
        width:43,
        height: 81,
        offsetForY: 1233
    },
    turretRight: {
        width: 88,
        height: 62,
        offsetForY: 1017
    },
    turretLeft: {
        width: 88,
        height: 62,
        offsetForY: 1081
    },
    bigBulletRight: {
        speed:15,
        width:32,
        height: 12,
        offsetForY: 806
    },
    bigBulletLeft: {
        speed:-15,
        width:32,
        height: 12,
        offsetForY: 818
    },
    bulletRight: {
        speed:15,
        width:25,
        height: 11,
        offsetForY: 806
    },
    bulletLeft: {
        speed:-15,
        width:25,
        height: 11,
        offsetForY: 817
    },
    bulletTurretRight: {
        speed:15,
        width:25,
        height: 11,
        offsetForY: 806
    },
    bulletTurretLeft: {
        speed:-15,
        width:25,
        height: 11,
        offsetForY: 817
    },
    bulletStopRight:{
        width: 28,
        height: 55,
        frames: 2,
        offsetForY: 828,
    },
    bulletStopLeft:{
        width: 28,
        height: 55,
        frames: 2,
        offsetForY: 883,
    },
    calmStyleRight :{
        width:76,
        height:83,
        frames:4,
        offsetForY:0,
        frequency: 240
    },
    calmStyleLeft : {
        width:92,
        height:81,
        frames:4,
        offsetForY:83,
        frequency: 240
    },
    runStyleRight: {
        width: 76,
        height: 76,
        frames: 10,
        offsetForY: 164,
        frequency: 60
    },
    runStyleLeft: {
        width: 76,
        height: 77,
        frames: 10,
        offsetForY: 239,
        frequency: 60
    },
    jumpStyleRight: {
        width: 82,
        height: 83,
        frames: 5,
        offsetForY: 316,
        frequency: 260
    },
    jumpStyleLeft: {
        width: 84,
        height: 83,
        frames: 5,
        offsetForY: 399,
        frequency: 260
    },
    deathStyleRight: {
        width: 71,
        height: 79,
        frames: 4,
        offsetForY: 482,
        frequency: 200
    },
    deathStyleLeft: {
        width: 71,
        height: 79,
        frames: 4,
        offsetForY: 561,
        frequency: 140
    },
    shootStyleRight: {
        width: 93,
        height: 83,
        frames: 2,
        offsetForY: 642,
        frequency: 60
    },
    shootStyleLeft: {
        width: 89,
        height: 81,
        frames: 2,
        offsetForY: 725,
        frequency: 60
    },
    bigExplosion: {
        width: 90,
        height: 79,
        frames: 9,
        offsetForY: 930,
        frequency: 60
    },
    frame:0,
    currentStyle:null,
    
    
    getMiddleCoord(){
        return game.width/2-game.spacemarine.width/2;
    },
    animate(){
     
        if((this.currentStyle == this.jumpStyleLeft)||(this.currentStyle == this.jumpStyleRight)){

            window.timerId = setInterval(() => {
                this.frame++;
                if(this.frame ==3){
                    this.frame=0;
                }
            },300)
        }
        else if((this.currentStyle != this.jumpStyleLeft)&&(this.currentStyle != this.jumpStyleRight)){
            window.timerId = setInterval(() => {
        
                this.frame++;
                if(this.frame ==this.currentStyle.frames){
                    this.frame=0;
                }
            },this.currentStyle.frequency)
        }
        
    },
    move(){
        let x = this.x + this.dx;
        let spacemarineLeft = this.x;
        
        let spacemarineRight = spacemarineLeft + this.width;
        let worldLeft = 0;
        let worldRight = game.width;
        if((game.rightPressed)&&(spacemarineRight < worldRight)){
            this.dx = this.velocity;
            this.x += this.dx;
        }
        else if((game.leftPressed)&&(spacemarineLeft > worldLeft)){
            this.dx = -this.velocity;
            this.x += this.dx;
        }
        if(game.jumpPressed){
            this.jumpCount++;
            
            this.jumpHeight = 4*this.jumpLength*Math.sin(Math.PI*this.jumpCount/this.jumpLength);
        }
        if(this.jumpCount>this.jumpLength){
            this.jumpCount=0;
            game.jumpPressed=false;
            this.jumpHeight=0;
        }
        
    },
    
    moveLayer3(){
        let middleOnScreen = this.getMiddleCoord();
        if(((this.x >= middleOnScreen)&&(game.layer3.x<=game.layer3.maxX-game.width))
        ||((this.x < middleOnScreen)&&(game.layer3.x>=0)&&(game.layer3.x<=game.layer3.maxX))){
            this.x=middleOnScreen;
            game.layer3.x+=this.dx;
        }
    },
    moveLayer2(){
        let middleOnScreen = this.getMiddleCoord();
        if(((this.x >= middleOnScreen)&&(game.layer2.x<=game.layer2.maxX-game.width))
        ||((this.x < middleOnScreen)&&(game.layer2.x>=0)&&(game.layer2.x<=game.layer2.maxX))){
            game.layer2.x+=this.dx/2.5;
        }
    },
    moveLayer1(){
        let middleOnScreen = this.getMiddleCoord();
        if(((this.x >= middleOnScreen)&&(game.layer1.x<=game.layer1.maxX-game.width))
        ||((this.x < middleOnScreen)&&(game.layer1.x>=0)&&(game.layer1.x<=game.layer1.maxX))){
            game.layer1.x+=this.dx/14;
        }
    },

    checkStayingOnBlocks(){
        this.qurrentX2 = game.layer3.x + this.x + this.currentStyle.width -16;
        this.qurrentX1 = game.layer3.x + this.x +5;
        
        if(this.checkingBlock){
            game.blocks.forEach(block => {
                if ((this.qurrentX2 > block.begX)&&(this.qurrentX1 < block.endX )){
                    this.currNumberOfBlock = block.number;
                    this.stayingOnBlock = true;
                    this.checkingBlock = false;
                    return;
                }
                
            });
        }
        

        if ((this.qurrentX2 < game.blocks[this.currNumberOfBlock].begX)||(this.qurrentX1 > game.blocks[this.currNumberOfBlock].endX )){
            this.stayingOnBlock = false;
        }
        

        if(((this.dx>0)&&(this.stayingOnBlock == false)&&(this.qurrentX2+10>=game.blocks[this.currNumberOfBlock+1].begX)&&(game.blocks[this.currNumberOfBlock+1].y ==224)&&(this.y-this.jumpHeight<224))||((this.dx<0)&&(this.stayingOnBlock == false)&&(this.qurrentX1-10<=game.blocks[this.currNumberOfBlock-1].endX)&&(game.blocks[this.currNumberOfBlock-1].y ==224)&&(this.y-this.jumpHeight<224))){
            if(this.landing){
                this.landing = false;
                window.timerFalling = setInterval(() => {
                    this.y+=0.5;
                    this.dx+=2.5;
                    if(this.y>=224){
                        clearInterval(window.timerFalling);
                        this.y=224
                        this.dx=0;
                        this.checkingBlock =true;
                        this.landing = true;
                    }
                }, 200);
            }
        }
        else if(((this.dx>0)&&(this.stayingOnBlock == false)&&(this.qurrentX2>=game.blocks[this.currNumberOfBlock+1].begX)&&(game.blocks[this.currNumberOfBlock+1].y ==265)&&(this.y-this.jumpHeight<265))||((this.dx<0)&&(this.stayingOnBlock == false)&&(this.qurrentX1<=game.blocks[this.currNumberOfBlock-1].endX)&&(game.blocks[this.currNumberOfBlock-1].y ==265)&&(this.y-this.jumpHeight<265))){
            if(this.landing){
                this.landing = false;
                window.timerFalling = setInterval(() => {
                    this.y+=6;
                    this.dx+=0.001;
                    if(this.y>=265){
                        clearInterval(window.timerFalling);
                        this.y=265
                        this.dx=0;
                        this.checkingBlock =true;
                        this.landing = true;
                    }
                }, 30);
            }
        } 
        else if((((this.dx>=0)&&(this.fallingPermission)&&(this.stayingOnBlock == false)&&(game.jumpPressed == false)&&(((game.blocks[this.currNumberOfBlock+1].y ==265)&&(this.y-this.jumpHeight<265))||((game.blocks[this.currNumberOfBlock+1].y ==224)&&(this.y-this.jumpHeight-25>224)))))  ||  (((this.dx<=0)&&(this.fallingPermission)&&(this.stayingOnBlock == false)&&(game.jumpPressed == false)&&(((game.blocks[this.currNumberOfBlock-1].y ==265)&&(this.y-this.jumpHeight<265))||((game.blocks[this.currNumberOfBlock-1].y ==224)&&(this.y-this.jumpHeight-25>224)))))){
            this.fallingPermission = false;
            window.timerIdFalling = setInterval(() => {
                this.dx=0;
                game.jumpPressed = false;
                game.leftPressed = false;
                game.rightPressed = false;
                this.y += this.velocity+6;
                if(this.y>530){
                    clearInterval(window.timerIdFalling);
                    game.gameOver();
                }
            },  15);
        }
    }
    
};