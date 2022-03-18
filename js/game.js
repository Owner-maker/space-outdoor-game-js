const KEYS = {
    LEFT_WASD: 65,
    LEFT: 37,
    RIGHT_WASD: 68,
    RIGHT: 39,
    SPACE: 32,
    SHIFT: 16,
    G: 71,
    T: 84
};


let game = {
    animationPermission:true,
    name:null,
    running: true,
    ctx: null,
    spacemarine: null,
    spaceship: null,
    layer3: null,
    width: 880,
    height: 440,
    leftPressed: false,
	rightPressed: false,
    jumpPressed: false,
    shootPressed: false,
    shootPressedG: false,
    currentButton: 68,
    mainthemeRunning:true,
    
    time: '00:00',
    timerPermission:true,

    shootCommonPermission: true,
    shootBigPermission:true,
    setTurretPermission: true,
    aliens1:[],
    aliens2:[],


    wave1Permission:true,

    wave1WordPermission:true,
    wave2Permission:true,
    wave2WordPermission:false,
    wave2WordTimerPermission:true,

    wave3Permission:true,
    wave3WordPermission:false,
    wave3WordTimerPermission:true,

    wave1Words:[
        'Волна 1',
        'Зачищайте врагов по всей карте.',
        'Регенерация здоровья раз в 5 секунд.',
        'Упадете в пропасть - проиграете.',
        'Потеряте все сердца - проиграете.',
        'Особые умения ограничены. Удачи.'
    ],
    wave1CurrentWord: 0,
    wave1CurrentSize: '82px MKARCADECAPS',

    wave2Words:'Волна 2',
    wave3Words:'Волна 3',

    currentWave: null,
    waveCurrentMaxAliens1:0,
    waveCurrentMaxAliens2:0,

    alien1CreatePermission:true,
    alien2CreatePermission:true,
    amountAliensPerOnce:null,
    currentAmountOfAliens1:0,
    currentAmountOfAliens2:0,
    wave1WordSecondPermission:false,

    winning:true,
    winningWordsPermission:false,
    winningWords: 'Вы прошли все волны!',
    
    sprites: {
        background: null,
        spacemarine: null,
        spaceship: null,
        aliens:null,
    },
    sounds: {
        gameover: null,
        maintheme:null,
    },
    wave1:{
        alien1Max: 20,
        alien2Max:0,
        amountPerOnce:10
    },
    wave2:{
        alien1Max: 20,
        alien2Max: 10,
        amountPerOnce:10
    },
    wave3:{
        alien1Max: 28,
        alien2Max: 14,
        amountPerOnce:7
    },

    alien1Right:{
        width: 95,
        height: 66,
        offsetForY: 355
    },
    alien1Left:{
        width: 95,
        height: 69,
        offsetForY: 423
    },
    alien1AttackRight:{
        width: 95.5,
        height: 67,
        offsetForY: 222
    },
    alien1AttackLeft:{
        width: 96,
        height: 67,
        offsetForY: 289
    },
    alien2Right:{
        width: 112,
        height: 111,
        offsetForY: 0
    },
    alien2Left:{
        width: 111,
        height: 111,
        offsetForY: 111
    },
    alienDeathAnimation:{
        width:91,
        height: 74,
        offsetForY: 510,
        frames:6,
    },
    init() {
        this.ctx = document.getElementById('canvas').getContext('2d');
        this.setEvents();
        this.spaceship.animate();
        this.spacemarine.currentStyle = this.spacemarine.calmStyleRight;
        this.spacemarine.animate();
        this.name = localStorage.getItem('name');
        
        
    },
    preload(callback) {
        let loaded = 0;
        let required = Object.keys(this.sprites).length;
        required += Object.keys(this.sounds).length;

        let onResourceLoad = () => {
            ++loaded;
            if (loaded >= required) {
                callback();
            }
        };

        this.preloadSprites(onResourceLoad);
        this.preloadSounds(onResourceLoad);
    },
    preloadSprites(onResourceLoad) {
        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = "images/" + key + ".png";
            this.sprites[key].addEventListener("load", onResourceLoad);
        }
    },
    preloadSounds(onResourceLoad) {
        for (let key in this.sounds) {
            this.sounds[key] = new Audio('sounds/' + key + '.mp3');
            this.sounds[key].addEventListener("canplaythrough", onResourceLoad, {once: true});
        }
    },
    timer(){
        if(this.timerPermission){
            this.timerPermission = false;
            window.timerClock = setInterval(() => {
                var arr = this.time.split(":");
                var m = arr[0];
                var s = arr[1];
                if((m==59)&&(s==59)){
                    clearInterval(window.timerClock);
                }
                else if ((s>=0)&&(s<=8)){
                    s++;
                    s="0"+s;
                }
                else if ((s>=9)&&(s<=58)){
                    s++;
                }
                else{
                    s="00";
                    if ((m>=0)&&(m<=8)){
                        m++;
                        m="0"+m;
                    }
                    else if ((m>=9)&&(m<=58)){
                        m++;
                    }
                    
                }
                this.time = m + ":" + s;
            }, 1000); 
        }
    },

    random(min, max){
        return Math.floor(Math.random() * (max - min +1) + min);
    },
    randomBlockForAlien1(min,max){
        while(true){
            var rand = Math.floor(Math.random() * (max - min +1) + min);
            if((rand!=4)&&(rand!=this.spacemarine.currNumberOfBlock)){
                break;
            }
        }
        return rand;
    },
    randomBlockForAlien2(min,max){
        while(true){
            var rand = Math.floor(Math.random() * (max - min +1) + min);
            if((rand!=6)&&(rand!=4)&&(rand!=2)&&(rand!=this.spacemarine.currNumberOfBlock)){
                break;
            }
        }
        return rand;
    },
    createAliens1(){
        if((this.currentAmountOfAliens1==0)&&(this.waveCurrentMaxAliens1%this.amountAliensPerOnce==0)&&(this.waveCurrentMaxAliens1!=0)&&(this.alien1CreatePermission)){
            
            this.currentAmountOfAliens1 = this.amountAliensPerOnce;
            this.aliens1.splice(0,this.currentAmountOfAliens1)
            this.alien1CreatePermission = false;
            
            for (let i=0;i<this.amountAliensPerOnce;i++){
                if(this.easyAllow.checked){
                    var health = 1;
                }
                else{
                    var health = this.random(5,7);
                }
                let rand = this.randomBlockForAlien1(1,6);
                let alien1 = new Enemy(
                    this.random(this.blocks[rand].begX,this.blocks[rand].endX - this.alien1Right.width),
                    this.blocks[rand].y - this.alien1Right.height,
                    health,
                    this.random(8,12),
                    this.alien1Right.width,
                    this.alien1Right.height,
                    this.alien1Right.offsetForY,
                    rand,
                    true,
                    0,
                    true,
                    false
                );
                this.aliens1.push(alien1);
            }
        }
    },

    createAliens2(){
        if((this.currentAmountOfAliens2==0)&&(this.waveCurrentMaxAliens2%this.amountAliensPerOnce==0)&&(this.waveCurrentMaxAliens2!=0)&&(this.alien2CreatePermission)){
            
            this.currentAmountOfAliens2 = this.amountAliensPerOnce;
            this.aliens2.splice(0,this.currentAmountOfAliens2)
            this.alien2CreatePermission = false;
            
            for (let i=0;i<this.amountAliensPerOnce;i++){
                if(this.easyAllow.checked){
                    var health = 1;
                }
                else{
                    var health = this.random(6,8);
                }
                let rand = this.randomBlockForAlien2(0,6)
                
                let alien2 = new Enemy(
                    this.random(this.blocks[rand].begX,this.blocks[rand].endX - this.alien1Right.width),
                    this.blocks[rand].y - this.alien2Right.height - 20,
                    health,
                    this.random(6,12),
                    this.alien2Right.width,
                    this.alien2Right.height,
                    this.alien2Right.offsetForY,
                    rand,
                    true,
                    0,
                    true,
                    false
                );
                this.aliens2.push(alien2);
            }
        }
    },

    moveAliens1(){
        if((this.spacemarine.deathPermission)&&(this.aliens1.length!=0)){
        for (let i=0;i< this.aliens1.length;i++){
            if((this.aliens1[i]!=undefined)&&(this.aliens1.length!=0)){
                
                if(this.spacemarine.currNumberOfBlock == this.aliens1[i].currentBlock){
                    if((this.spacemarine.currentStyle == this.spacemarine.calmStyleRight)||(this.spacemarine.currentStyle == this.spacemarine.runStyleRight)||(this.spacemarine.currentStyle == this.spacemarine.jumpStyleRight)||(this.spacemarine.currentStyle == this.spacemarine.shootStyleRight)){
                        this.aliens1[i].x2OfPlayer = this.layer3.x + this.spacemarine.x + this.spacemarine.currentStyle.width -13;
                        this.aliens1[i].x1OfPlayer = this.layer3.x + this.spacemarine.x;
                    }
                    else if((this.spacemarine.currentStyle == this.spacemarine.calmStyleLeft)||(this.spacemarine.currentStyle == this.spacemarine.runStyleLeft)||(this.spacemarine.currentStyle == this.spacemarine.jumpStyleLeft)||(this.spacemarine.currentStyle == this.spacemarine.shootStyleLeft)){
                        this.aliens1[i].x2OfPlayer = this.layer3.x + this.spacemarine.x + this.spacemarine.currentStyle.width - 13;
                        this.aliens1[i].x1OfPlayer = this.layer3.x + this.spacemarine.x + 13;
                    }
                }

                if((this.aliens1[i]!=undefined)&&(this.aliens1[i].alienMove)){
                    var newX = this.random(this.blocks[this.aliens1[i].currentBlock].begX,this.blocks[this.aliens1[i].currentBlock].endX - this.alien1Right.width);
                    if (newX != this.aliens1[i].x){
                            this.aliens1[i].newX = newX;
                            this.aliens1[i].alienMove = false;
                        if ((this.aliens1[i]!=undefined)&&(this.aliens1[i].newX < this.aliens1[i].x)){
                            this.aliens1[i].timerAlien1Move = setInterval(() => {
                                this.aliens1[i].x -= this.aliens1[i].speed;
                                this.aliens1[i].width = this.alien1Left.width;
                                this.aliens1[i].offsetForY = this.alien1Left.offsetForY;
                                this.aliens1[i].frame++;

                                if(this.aliens1[i].frame == 6){
                                    this.aliens1[i].frame=0;
                                }
                                if (this.aliens1[i].newX >= this.aliens1[i].x){
                                    this.aliens1[i].alienMove = true;
                                    clearInterval(this.aliens1[i].timerAlien1Move)
                                }
                                if((this.aliens1[i].x - this.aliens1[i].speed/2 <= this.aliens1[i].x2OfPlayer)&&(this.aliens1[i].x1OfPlayer < this.aliens1[i].x)&&(this.spacemarine.currNumberOfBlock == this.aliens1[i].currentBlock)&&(this.spacemarine.y  - this.spacemarine.jumpHeight == game.blocks[this.aliens1[i].currentBlock].y)){
                                    clearInterval(this.aliens1[i].timerAlien1Move)
                                    this.aliens1[i].alienMove = false;
                                    this.aliens1[i].frame = 0;
                                    this.aliens1[i].timerAlien1Move = setInterval(() => {
                                        this.aliens1[i].width = this.alien1AttackLeft.width;
                                        this.aliens1[i].offsetForY = this.alien1AttackLeft.offsetForY;
                                        this.aliens1[i].frame++;

                                        if((this.aliens1[i]!=undefined)&&(this.aliens1[i].alienAttack)){
                                            
                                            if((this.spacemarine.healthItem!=0)&&(this.spacemarine.health.width!=0)){
                                                this.spacemarine.healthItem--;
                                                this.spacemarine.health.width-=41;
                                                this.aliens1[i].alienAttack = false;
                                            }
                                            this.aliens1[i].timerAttack = setTimeout(() => {
                                                if(this.aliens1[i]!=undefined){
                                                    if((this.spacemarine.healthItem!=0)&&(this.spacemarine.health.width!=0)){
                                                        this.spacemarine.healthItem--;
                                                        this.spacemarine.health.width-=41;
                                                        this.spacemarine.healthRegenPermission = false;
                                                        this.aliens1[i].alienAttack = false;
                                                    }
                                                    this.aliens1[i].alienAttack = true;
                                                }
                                            }, 900); 
                                        }

                                        if(this.aliens1[i].frame == 4){
                                            this.aliens1[i].frame=0;
                                        }

                                        if(((this.aliens1[i].x - this.aliens1[i].speed/2 < this.aliens1[i].x2OfPlayer)&&(this.aliens1[i].x - this.aliens1[i].speed/2 < this.aliens1[i].x1OfPlayer))||((this.aliens1[i].x - this.aliens1[i].speed/2 > this.aliens1[i].x2OfPlayer)&&(this.aliens1[i].x - this.aliens1[i].speed/2 > this.aliens1[i].x1OfPlayer))){
                                            clearInterval(this.aliens1[i].timerAlien1Move)
                                            clearTimeout(this.aliens1[i].timerAttack)
                                            this.spacemarine.healthRegenPermission = true;
                                            this.aliens1[i].alienMove = true;
                                            this.aliens1[i].frame = 0;
                                            this.aliens1[i].alienAttack = true;
                                        }
                                    }, 145);
                                }
                            }, 50);
                            
                        }
                        else if ((this.aliens1[i]!=undefined)&&(this.aliens1[i].newX > this.aliens1[i].x)){
                            // this.aliens1[i].frame = 0;
                            this.aliens1[i].timerAlien1Move = setInterval(() => {
                                if(this.aliens1[i]!=undefined){
                                    this.aliens1[i].x += this.aliens1[i].speed;
                                    this.aliens1[i].width = this.alien1Right.width;
                                    this.aliens1[i].offsetForY = this.alien1Right.offsetForY;
                                    this.aliens1[i].frame++;
                                }

                                if(this.aliens1[i].frame == 6){
                                    this.aliens1[i].frame=0;
                                }
                                if (this.aliens1[i].newX <= this.aliens1[i].x){
                                    this.aliens1[i].alienMove = true;
                                    clearInterval(this.aliens1[i].timerAlien1Move)
                                }
                                if((this.aliens1[i].x + this.aliens1[i].width>= this.aliens1[i].x1OfPlayer)&&(this.aliens1[i].x2OfPlayer > this.aliens1[i].x + this.aliens1[i].width)&&(this.spacemarine.currNumberOfBlock == this.aliens1[i].currentBlock)&&(this.spacemarine.y  - this.spacemarine.jumpHeight == game.blocks[this.aliens1[i].currentBlock].y)){
                                    clearInterval(this.aliens1[i].timerAlien1Move)
                                    this.aliens1[i].alienMove = false;
                                    this.aliens1[i].frame = 0;
                                    this.aliens1[i].timerAlien1Move = setInterval(() => {
                                        this.aliens1[i].width = this.alien1AttackRight.width;
                                        this.aliens1[i].offsetForY = this.alien1AttackRight.offsetForY;
                                        this.aliens1[i].frame++;

                                        if(this.aliens1[i].alienAttack){
                                            if((this.spacemarine.healthItem!=0)&&(this.spacemarine.health.width!=0)){
                                                this.spacemarine.healthItem--;
                                                this.spacemarine.health.width-=41;
                                                this.aliens1[i].alienAttack = false;
                                            }
                                            this.aliens1[i].alienAttack = false;
                                            this.aliens1[i].timerAttack = setTimeout(() => {
                                                if(this.aliens1[i]!=undefined){
                                                    if((this.spacemarine.healthItem!=0)&&(this.spacemarine.health.width!=0)){
                                                        this.spacemarine.healthItem--;
                                                        this.spacemarine.health.width-=41;
                                                        this.spacemarine.healthRegenPermission = false;
                                                        this.aliens1[i].alienAttack = false;
                                                    }
                                                    this.aliens1[i].alienAttack = true;
                                                }
                                            }, 900); 
                                        }

                                        if(this.aliens1[i].frame == 4){
                                            this.aliens1[i].frame=0;
                                        }

                                        if(((this.aliens1[i].x + this.aliens1[i].width  < this.aliens1[i].x2OfPlayer)&&(this.aliens1[i].x  + this.aliens1[i].width< this.aliens1[i].x1OfPlayer))||((this.aliens1[i].x  + this.aliens1[i].width> this.aliens1[i].x2OfPlayer)&&(this.aliens1[i].x  + this.aliens1[i].width> this.aliens1[i].x1OfPlayer))){
                                            clearInterval(this.aliens1[i].timerAlien1Move)
                                            clearTimeout(this.aliens1[i].timerAttack)
                                            this.spacemarine.healthRegenPermission = true;
                                            this.aliens1[i].alienMove = true;
                                            this.aliens1[i].alienAttack = true;
                                            this.aliens1[i].frame = 0;
                                        }
                                    }, 145);
                                }
                            }, 50);
                        }
                    }
                }
            }
        }        
    }
    },
    moveAliens2(){
        if((this.spacemarine.deathPermission)&&(this.aliens2.length!=0)){
        for (let i=0;i< this.aliens2.length;i++){
            if((this.aliens2[i]!=undefined)&&(this.aliens2.length!=0)){
                
                if(this.spacemarine.currNumberOfBlock == this.aliens2[i].currentBlock){
                    if((this.spacemarine.currentStyle == this.spacemarine.calmStyleRight)||(this.spacemarine.currentStyle == this.spacemarine.runStyleRight)||(this.spacemarine.currentStyle == this.spacemarine.jumpStyleRight)||(this.spacemarine.currentStyle == this.spacemarine.shootStyleRight)){
                        this.aliens2[i].x2OfPlayer = this.layer3.x + this.spacemarine.x + this.spacemarine.currentStyle.width -13;
                        this.aliens2[i].x1OfPlayer = this.layer3.x + this.spacemarine.x;
                    }
                    else if((this.spacemarine.currentStyle == this.spacemarine.calmStyleLeft)||(this.spacemarine.currentStyle == this.spacemarine.runStyleLeft)||(this.spacemarine.currentStyle == this.spacemarine.jumpStyleLeft)||(this.spacemarine.currentStyle == this.spacemarine.shootStyleLeft)){
                        this.aliens2[i].x2OfPlayer = this.layer3.x + this.spacemarine.x + this.spacemarine.currentStyle.width - 13;
                        this.aliens2[i].x1OfPlayer = this.layer3.x + this.spacemarine.x + 13;
                    }
                }

                if((this.aliens2[i]!=undefined)&&(this.aliens2[i].alienMove)){
                    if((this.aliens2[i].currentBlock==1)||(this.aliens2[i].currentBlock==3)||(this.aliens2[i].currentBlock==5)){
                        var newX = this.random(this.blocks[this.aliens2[i].currentBlock].begX,this.blocks[this.aliens2[i].currentBlock+1].endX - this.alien1Right.width);
                    }
                    else{
                        var newX = this.random(this.blocks[this.aliens2[i].currentBlock].begX,this.blocks[this.aliens2[i].currentBlock].endX - this.alien1Right.width);
                    }
                    if (newX != this.aliens2[i].x){
                            this.aliens2[i].newX = newX;
                            this.aliens2[i].alienMove = false;
                        if ((this.aliens2[i]!=undefined)&&(this.aliens2[i].newX < this.aliens2[i].x)){
                            this.aliens2[i].frame = 0;
                            this.aliens2[i].timerAlien2Move = setInterval(() => {
                                this.aliens2[i].x -= this.aliens2[i].speed;
                                this.aliens2[i].width = this.alien2Left.width;
                                this.aliens2[i].offsetForY = this.alien2Left.offsetForY;
                                this.aliens2[i].frame++;

                                if(this.aliens2[i].frame == 8){
                                    this.aliens2[i].frame=0;
                                }
                                if (this.aliens2[i].newX >= this.aliens2[i].x){
                                    this.aliens2[i].alienMove = true;
                                    clearInterval(this.aliens2[i].timerAlien2Move)
                                }
                                if((this.aliens2[i].x - this.aliens2[i].speed/2 <= this.aliens2[i].x2OfPlayer)&&(this.aliens2[i].x1OfPlayer < this.aliens2[i].x)&&(this.spacemarine.currNumberOfBlock == this.aliens2[i].currentBlock)&&(this.spacemarine.y  - this.spacemarine.jumpHeight == game.blocks[this.aliens2[i].currentBlock].y)){

                                        if((this.aliens2[i]!=undefined)&&(this.aliens2[i].alienAttack)){
                                            
                                            if((this.spacemarine.healthItem!=0)&&(this.spacemarine.health.width!=0)){
                                                this.spacemarine.healthItem-=2;
                                                this.spacemarine.health.width-=82;
                                                this.aliens2[i].alienAttack = false;
                                            }
                                        }


                                        if(((this.aliens2[i].x - this.aliens2[i].speed/2 < this.aliens2[i].x2OfPlayer)&&(this.aliens2[i].x - this.aliens2[i].speed/2 < this.aliens2[i].x1OfPlayer))||((this.aliens2[i].x - this.aliens2[i].speed/2 > this.aliens2[i].x2OfPlayer)&&(this.aliens2[i].x - this.aliens2[i].speed/2 > this.aliens2[i].x1OfPlayer))){
                                            this.aliens2[i].alienAttack = true;
                                            console.log('asd')
                                        }
                                }
                            }, 50);
                            
                        }
                        else if ((this.aliens2[i]!=undefined)&&(this.aliens2[i].newX > this.aliens2[i].x)){
                            this.aliens2[i].frame = 0;
                            this.aliens2[i].timerAlien2Move = setInterval(() => {
                                if(this.aliens2[i]!=undefined){
                                    this.aliens2[i].x += this.aliens2[i].speed;
                                    this.aliens2[i].width = this.alien2Right.width;
                                    this.aliens2[i].offsetForY = this.alien2Right.offsetForY;
                                    this.aliens2[i].frame++;
                                }

                                if(this.aliens2[i].frame == 8){
                                    this.aliens2[i].frame=0;
                                }
                                if (this.aliens2[i].newX <= this.aliens2[i].x){
                                    this.aliens2[i].alienMove = true;
                                    clearInterval(this.aliens2[i].timerAlien2Move)
                                }
                                if((this.aliens2[i].x + this.aliens2[i].width>= this.aliens2[i].x1OfPlayer)&&(this.aliens2[i].x2OfPlayer > this.aliens2[i].x + this.aliens2[i].width)&&(this.spacemarine.currNumberOfBlock == this.aliens2[i].currentBlock)&&(this.spacemarine.y  - this.spacemarine.jumpHeight == game.blocks[this.aliens2[i].currentBlock].y)){
                                    
                                        if(this.aliens2[i].alienAttack){
                                            if((this.spacemarine.healthItem!=0)&&(this.spacemarine.health.width!=0)){
                                                this.spacemarine.healthItem-=2;
                                                this.spacemarine.health.width-=82;
                                                this.aliens2[i].alienAttack = false;
                                            }
                                            
                                        }

                                        if(((this.aliens2[i].x + this.aliens2[i].width  < this.aliens2[i].x2OfPlayer)&&(this.aliens2[i].x  + this.aliens2[i].width< this.aliens2[i].x1OfPlayer))||((this.aliens2[i].x  + this.aliens2[i].width> this.aliens2[i].x2OfPlayer)&&(this.aliens2[i].x  + this.aliens2[i].width> this.aliens2[i].x1OfPlayer))){
                                            this.aliens2[i].alienAttack = true;
                                            console.log('asd')
                                        }
                                    
                                }
                            }, 50);
                        }
                    }
                }
            }
        }      
    }  
    },
    playMainTheme(){
        if((this.mainthemeRunning)&&(this.running)&&(this.musicAllow.checked)){
            this.mainthemeRunning = false;
            this.sounds.maintheme.loop = true;
            this.sounds.maintheme.play();
            this.timer();
        }
        else{
            this.timer();
        }
    },
    
    checkCurrentWaveInfo(){
        if(this.currentWave){
            this.waveCurrentMaxAliens1=this.currentWave.alien1Max;
            this.waveCurrentMaxAliens2=this.currentWave.alien2Max;
            this.amountAliensPerOnce = this.currentWave.amountPerOnce;
        }
        if((this.currentWave == this.wave1)&&(this.waveCurrentMaxAliens1==0)&&(this.waveCurrentMaxAliens2==0)&&(this.wave2Permission==true)){
            this.wave2Permission=false;
            this.spacemarineX = this.spacemarine.qurrentX2;
            this.wave2WordPermission = true;
            this.currentWave = this.wave2;
            this.waveCurrentMaxAliens1=this.currentWave.alien1Max;
            this.waveCurrentMaxAliens2=this.currentWave.alien2Max;
            this.waveY = this.spacemarine.y-11;
        }
        else if((this.currentWave == this.wave2)&&(this.waveCurrentMaxAliens1==0)&&(this.waveCurrentMaxAliens2==0)&&(this.wave3Permission==true)){
            this.wave3Permission=false;
            this.wave3WordPermission = true;
            this.currentWave = this.wave3;
            this.spacemarineX = this.spacemarine.qurrentX2;
            this.waveCurrentMaxAliens1=this.currentWave.alien1Max;
            this.waveCurrentMaxAliens2=this.currentWave.alien2Max;
            this.waveY = this.spacemarine.y-11;
        }
        else if((this.currentWave == this.wave3)&&(this.waveCurrentMaxAliens1==0)&&(this.waveCurrentMaxAliens2==0)&&(this.winning)){
            this.winning = false;
            this.winningWordsPermission = true;
            this.spacemarineX = this.spacemarine.qurrentX2;
            clearInterval(window.timerClock);
            setTimeout(() => {
                this.sounds.maintheme.pause();
                this.saveResults();
                this.running = false;
                window.location.reload();
            }, 5000);
        }
    },
    setEvents() {
        
        window.addEventListener("keydown", e => {
            
            if(this.spacemarine.deathPermission){
                if(((e.keyCode == KEYS.RIGHT_WASD)||(e.keyCode == KEYS.RIGHT))&&(this.leftPressed == false)&&(this.shootPressed == false)){
                    this.playMainTheme();
                    this.rightPressed = true;
                    this.currentButton = e.keyCode;
                    this.spacemarine.currentStyle = this.spacemarine.runStyleRight;
                    
                    if(this.animationPermission){
                        clearInterval(window.timerId)
                        this.spacemarine.animate();
                        this.animationPermission = false
                    }
                    
                    
                }
                if(((e.keyCode == KEYS.LEFT_WASD)||(e.keyCode == KEYS.LEFT))&&(this.rightPressed == false)&&(this.shootPressed ==false)){
                    this.playMainTheme();
                    this.leftPressed = true;
                    this.currentButton = e.keyCode;
                    this.spacemarine.currentStyle = this.spacemarine.runStyleLeft;
                    
                    if(this.animationPermission){
                        clearInterval(window.timerId)
                        
                        this.spacemarine.animate();
                        this.animationPermission = false
                    }
                }
                if((e.keyCode == KEYS.SPACE)&&(this.shootPressed == false) ){
                    this.playMainTheme();
                    this.jumpPressed = true;
                    if((this.rightPressed == false)&&((this.currentButton == KEYS.RIGHT)||(this.currentButton == KEYS.RIGHT_WASD))){
                        this.spacemarine.currentStyle = this.spacemarine.jumpStyleRight;
                    }
                    else if ((this.leftPressed == false)&&((this.currentButton == KEYS.LEFT)||(this.currentButton == KEYS.LEFT_WASD))){
                        this.spacemarine.currentStyle = this.spacemarine.jumpStyleLeft
                    }
                    
                    this.spacemarine.frame=2;
                    if(this.animationPermission){
                        
                        clearInterval(window.timerId)
                        
                        this.animationPermission = false
                    }
                    
                }
                if((e.keyCode == KEYS.SHIFT)&&(this.rightPressed==false)&&(this.leftPressed == false)&&(this.jumpPressed == false)&&(this.shootPressedG==false)){
                    this.playMainTheme();
                    this.shootPressed = true;
                    
                    if((this.currentButton == KEYS.RIGHT)||(this.currentButton == KEYS.RIGHT_WASD)){
                        this.spacemarine.currentStyle = this.spacemarine.shootStyleRight;
                        this.spacemarine.bulletRight.x = this.spacemarine.x + this.spacemarine.currentStyle.width/2;
                        this.spacemarine.bulletRight.y = this.spacemarine.y - this.spacemarine.currentStyle.height + 30;
                        var currentBullet = this.spacemarine.bulletRight;
                    }
                    else if((this.currentButton == KEYS.LEFT)||(this.currentButton == KEYS.LEFT_WASD)){
                        this.spacemarine.currentStyle = this.spacemarine.shootStyleLeft;
                        this.spacemarine.bulletLeft.x = this.spacemarine.x ;
                        this.spacemarine.bulletLeft.y = this.spacemarine.y - this.spacemarine.currentStyle.height + 28;
                        var currentBullet = this.spacemarine.bulletLeft;
                    }

                    if(this.shootCommonPermission){
                        let bullet = new Bullet(
                            currentBullet.x,
                            currentBullet.y,
                            currentBullet.speed,
                            currentBullet.width,
                            currentBullet.height,
                            currentBullet.offsetForY
                        )
                        this.spacemarine.commonBullets.push(bullet)
                        this.shootCommonPermission = false;
                        window.timerCommonShoot = setInterval(() => {
                            let bullet = new Bullet(
                                currentBullet.x,
                                currentBullet.y,
                                currentBullet.speed,
                                currentBullet.width,
                                currentBullet.height,
                                currentBullet.offsetForY
                            )
                            this.spacemarine.commonBullets.push(bullet)
                            // this.spacemarine.animateBullet(bullet);
                        }, 150);
                    }
                    this.spacemarine.frame=0;
                    if(this.animationPermission){
                        clearInterval(window.timerId)
                        this.spacemarine.animate();
                        this.animationPermission = false
                    }
                }

                if((e.keyCode == KEYS.G)&&(this.rightPressed==false)&&(this.leftPressed == false)&&(this.jumpPressed == false)&&(this.shootPressed==false)&&(this.spacemarine.bigBulletsAmount!=0)){
                    this.playMainTheme();
                    this.shootPressedG = true;
                    
                    if((this.currentButton == KEYS.RIGHT)||(this.currentButton == KEYS.RIGHT_WASD)){
                            this.spacemarine.currentStyle = this.spacemarine.shootStyleRight;
                        
                        this.spacemarine.bigBulletRight.x = this.spacemarine.x + this.spacemarine.currentStyle.width/2;
                        this.spacemarine.bigBulletRight.y = this.spacemarine.y - this.spacemarine.currentStyle.height + 30;
                        var currentBullet = this.spacemarine.bigBulletRight;
                    }
                    else if((this.currentButton == KEYS.LEFT)||(this.currentButton == KEYS.LEFT_WASD)){
                        this.spacemarine.currentStyle = this.spacemarine.shootStyleLeft;
                        this.spacemarine.bigBulletLeft.x = this.spacemarine.x - this.spacemarine.currentStyle.width/2+35;
                        this.spacemarine.bigBulletLeft.y = this.spacemarine.y - this.spacemarine.currentStyle.height + 30;
                        var currentBullet = this.spacemarine.bigBulletLeft;
                    }
                    if(this.shootBigPermission){
                        this.spacemarine.bigBulletsAmount--;
                        let bullet = new Bullet(
                            currentBullet.x,
                            currentBullet.y,
                            currentBullet.speed,
                            currentBullet.width,
                            currentBullet.height,
                            currentBullet.offsetForY
                        )
                        this.spacemarine.bigBullets.push(bullet)
                        this.shootBigPermission = false;
                    }
                
                    this.spacemarine.frame=0;
                    if(this.animationPermission){
                        clearInterval(window.timerId)
                        this.spacemarine.animate();
                        this.animationPermission = false;
                    }
                }

                if((e.keyCode == KEYS.T)&&(this.rightPressed==false)&&(this.leftPressed == false)&&(this.jumpPressed == false)&&(this.setTurretPermission)&&(this.spacemarine.turretsAmount!=0)){
                    this.playMainTheme();
                    if(((this.spacemarine.x +this.layer3.x+this.spacemarine.currentStyle.width/2 + this.spacemarine.turretRight.width < game.blocks[this.spacemarine.currNumberOfBlock].endX)&&((this.currentButton == KEYS.RIGHT)||(this.currentButton == KEYS.RIGHT_WASD)))||((this.spacemarine.x +this.layer3.x+this.spacemarine.currentStyle.width/2 - this.spacemarine.turretRight.width> game.blocks[this.spacemarine.currNumberOfBlock].begX)&&((this.currentButton == KEYS.LEFT)||(this.currentButton == KEYS.LEFT_WASD)))){
                        if((this.currentButton == KEYS.RIGHT)||(this.currentButton == KEYS.RIGHT_WASD)){
                            this.spacemarine.turretsAmount--;
                            this.spacemarine.turretRight.x = this.spacemarine.x + this.layer3.x +  this.spacemarine.currentStyle.width;
                            this.spacemarine.turretRight.y = game.blocks[this.spacemarine.currNumberOfBlock].y - this.spacemarine.turretRight.height

                            this.spacemarine.bulletTurretRight.x = this.spacemarine.x + this.layer3.x +  this.spacemarine.currentStyle.width + 60;
                            this.spacemarine.bulletTurretRight.y = game.blocks[this.spacemarine.currNumberOfBlock].y - this.spacemarine.turretRight.height/2 -20;

                            this.spacemarine.currentTurret = this.spacemarine.turretRight;
                            this.spacemarine.currentTurret.currNumberOfBlock = this.spacemarine.currNumberOfBlock;
                            var currentBullet = this.spacemarine.bulletTurretRight;
                            this.spacemarine.animateTurret(currentBullet);
                            
                            }
                            else if((this.currentButton == KEYS.LEFT)||(this.currentButton == KEYS.LEFT_WASD)){
                                this.spacemarine.turretsAmount--;
                                this.spacemarine.turretLeft.x = this.spacemarine.x + this.layer3.x - this.spacemarine.currentStyle.width*0.75;
                                this.spacemarine.turretLeft.y = game.blocks[this.spacemarine.currNumberOfBlock].y - this.spacemarine.turretLeft.height;
                                
                                this.spacemarine.bulletTurretLeft.x = this.spacemarine.x + this.layer3.x - this.spacemarine.currentStyle.width*0.75;
                                this.spacemarine.bulletTurretLeft.y = game.blocks[this.spacemarine.currNumberOfBlock].y - this.spacemarine.turretLeft.height +10;
                                
                                this.spacemarine.currentTurret = this.spacemarine.turretLeft; 
                                this.spacemarine.currentTurret.currNumberOfBlock = this.spacemarine.currNumberOfBlock;
                                var currentBullet = this.spacemarine.bulletTurretLeft;
                                this.spacemarine.animateTurret(currentBullet);
                                            
                            }
                    }
                    
                }
            }
        });   
        window.addEventListener("keyup", e => {
            
            if(this.spacemarine.deathPermission){
                if(((e.keyCode == KEYS.RIGHT_WASD)||(e.keyCode == KEYS.RIGHT))&&(this.shootPressed == false)){
                    this.rightPressed = false;
                    this.spacemarine.dx=0;
                    this.currentButton = e.keyCode;
                    this.animationPermission = true;

                    clearInterval(window.timerId)
                    this.spacemarine.currentStyle = this.spacemarine.calmStyleRight;
                    this.spacemarine.frame=0;
                    this.spacemarine.animate();
                        
                    
                }
                if(((e.keyCode == KEYS.LEFT_WASD)||(e.keyCode == KEYS.LEFT))&&(this.shootPressed == false)){
                    this.leftPressed = false;
                    this.spacemarine.dx=0;
                    clearInterval(window.timerId);
                    this.animationPermission = true;
                    this.currentButton = e.keyCode;
                    this.spacemarine.currentStyle = this.spacemarine.calmStyleLeft
                    this.spacemarine.frame=0;
                    this.spacemarine.animate();
                }
                if(e.keyCode == KEYS.SHIFT){
                    this.shootPressed = false;
                    clearInterval(window.timerId);
                    clearInterval(window.timerCommonShoot);
                    this.shootCommonPermission = true;
                    this.animationPermission = true;
                    this.spacemarine.frame=0;
                    if((this.currentButton == KEYS.RIGHT)||(this.currentButton == KEYS.RIGHT_WASD)){
                        this.spacemarine.currentStyle = this.spacemarine.calmStyleRight;
                        
                    }
                    else if((this.currentButton == KEYS.LEFT)||(this.currentButton == KEYS.LEFT_WASD)){
                        this.spacemarine.currentStyle = this.spacemarine.calmStyleLeft;
                    }
                    
                    this.spacemarine.animate();
                }

                if(e.keyCode == KEYS.G){
                    this.shootPressedG = false;
                    clearInterval(window.timerId);
                    
                    this.shootCommonPermissionG = true;
                    this.animationPermission = true;
                    this.spacemarine.frame=0;
                    if((this.currentButton == KEYS.RIGHT)||(this.currentButton == KEYS.RIGHT_WASD)){
                        this.spacemarine.currentStyle = this.spacemarine.calmStyleRight;
                        
                    }
                    else if((this.currentButton == KEYS.LEFT)||(this.currentButton == KEYS.LEFT_WASD)){
                        this.spacemarine.currentStyle = this.spacemarine.calmStyleLeft;
                    }
                    
                    this.spacemarine.animate();
                }

                if(e.keyCode == KEYS.SPACE){
                    
                    setTimeout(()=>{ 
                        clearInterval(window.timerId);
                        this.animationPermission = true;
                        
                        if((this.rightPressed==true)&&(this.leftPressed == false)){
                            this.spacemarine.currentStyle = this.spacemarine.runStyleRight;
                        }
                        else if ((this.leftPressed == true)&&(this.rightPressed == false)){
                            this.spacemarine.currentStyle = this.spacemarine.runStyleLeft;
                        }
                        else{
                            if((this.currentButton == KEYS.RIGHT)||(this.currentButton == KEYS.RIGHT_WASD)){
                                this.spacemarine.currentStyle = this.spacemarine.calmStyleRight;
                            }
                            else if((this.currentButton == KEYS.LEFT)||(this.currentButton == KEYS.LEFT_WASD)){
                                this.spacemarine.currentStyle = this.spacemarine.calmStyleLeft;
                            }
                        }
                        
                        this.spacemarine.animate();
                    },200)
                }
            }
        
        });  
        
        
        
    },
    update(){
        this.spacemarine.commonBulletMove();
        this.moveAliens1();
        this.moveAliens2();
        this.spacemarine.bigBulletMove();
        this.spacemarine.turretBulletMove();
        this.spacemarine.death();                      
        this.checkCurrentWaveInfo();
        this.spacemarine.healthRegen();
        this.createAliens1();
        this.createAliens2();
        this.spacemarine.checkStayingOnBlocks();
        this.spacemarine.move();
        this.spacemarine.moveLayer1();
        this.spacemarine.moveLayer2();
        this.spacemarine.moveLayer3();
    },
    run() {
        if (this.running) {
            window.requestAnimationFrame(() => {
                this.update();
                this.render();
                this.run();
            });
        }
    },
    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(this.sprites.background, this.layer1.x, this.layer1.dyOnCanvas, this.width, this.height, 0, 0, this.width, this.height);
        this.ctx.drawImage(this.sprites.background, this.layer2.x, this.layer2.dyOnCanvas, this.width, this.height, 0, 0, this.width, this.height);
        if(this.wave1Permission){
            this.currentWave = this.wave1;
            this.ctx.font = this.wave1CurrentSize;
            
            this.ctx.fillText(this.wave1Words[this.wave1CurrentWord], this.wave1Words[this.wave1CurrentWord].length + 250 - this.layer3.x,150)
            if((this.wave1WordPermission==false)&&(this.wave1WordSecondPermission)){
                this.wave1WordSecondPermission = false;
                setTimeout(() => {
                    this.wave1Permission=false;
                }, 2000);
            }
            if(this.wave1WordPermission){
                
                this.wave1WordPermission = false
                window.timerWave1 = setInterval(() => {
                    this.wave1CurrentWord++;
                    if(this.wave1CurrentWord>=1){
                        this.wave1CurrentSize = '26px MKARCADECAPS'
                    }
                    if(this.wave1CurrentWord==6){
                        clearInterval(window.timerWave1)
                        
                        this.wave1Permission=false
                    }
        
                }, 2000);
            }
        }

        
            
        
        this.ctx.drawImage(this.sprites.background, this.layer3.x, this.layer3.dyOnCanvas, this.width, this.height, 0, 0, this.width, this.height);
        this.ctx.drawImage(this.sprites.spacemarine, 0, this.spacemarine.health.offsetForY, this.spacemarine.health.width, this.spacemarine.health.height, 15,7, this.spacemarine.health.width, this.spacemarine.health.height )
        this.ctx.drawImage(this.sprites.spacemarine, 0, this.spacemarine.abilities.offsetForY, this.spacemarine.abilities.width, this.spacemarine.abilities.height, 14,55,this.spacemarine.abilities.width, this.spacemarine.abilities.height )
        this.ctx.drawImage(this.sprites.spacemarine, 0, this.spacemarine.heads.offsetForY, this.spacemarine.heads.width, this.spacemarine.heads.height, 823, 80, this.spacemarine.heads.width, this.spacemarine.heads.height )

        if(this.wave2WordPermission){
            this.ctx.font = '82px MKARCADECAPS';
            this.ctx.fillText(this.wave2Words, this.spacemarineX - this.layer3.x-200,this.waveY)
            if(this.wave2WordTimerPermission){
                this.wave2WordTimerPermission = false;
                window.timerWave2 = setTimeout(() => {
                    this.wave2WordPermission=false;
                    clearTimeout(window.timerWave2);
                }, 2000);
            }
        }

        if(this.wave3WordPermission){
            this.ctx.font = '82px MKARCADECAPS';
            this.ctx.fillText(this.wave3Words, this.spacemarineX - this.layer3.x-200,this.waveY)
            if(this.wave3WordTimerPermission){
                this.wave3WordTimerPermission = false;
                window.timerWave3 = setTimeout(() => {
                    this.wave3WordPermission=false;
                    clearTimeout(window.timerWave3);
                }, 2000);
            }
        }


        this.ctx.font = '22px MKARCADECAPS';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(this.spacemarine.bigBulletsAmount, 100,85);
        this.ctx.fillText(this.spacemarine.turretsAmount, 180, 85);
        this.ctx.fillText(this.name, 870 - this.name.length*14,30);
        this.ctx.fillText(this.waveCurrentMaxAliens1, 798,110);
        this.ctx.fillText(this.waveCurrentMaxAliens2, 798,156);
        this.ctx.fillText(this.time,819,66);

        if(this.winningWordsPermission){
            this.ctx.font = '72px MKARCADECAPS';
            this.ctx.fillText(this.winningWords, this.spacemarineX - this.layer3.x - 320,100)
        }

        this.ctx.drawImage(this.sprites.spaceship,this.spaceship.frame*this.spaceship.width,0,this.spaceship.width,this.spaceship.height,this.spaceship.x - this.layer3.x,this.spaceship.y,this.spaceship.width,this.spaceship.height)
        if((this.spacemarine.currentTurret)&&(this.spacemarine.currentTurret.bullets!=this.spacemarine.currentTurret.maxBullets)){
            this.ctx.drawImage(this.sprites.spacemarine, this.spacemarine.currentTurret.frame * this.spacemarine.currentTurret.width, this.spacemarine.currentTurret.offsetForY, this.spacemarine.currentTurret.width, this.spacemarine.currentTurret.height, this.spacemarine.currentTurret.x - this.layer3.x, this.spacemarine.currentTurret.y, this.spacemarine.currentTurret.width, this.spacemarine.currentTurret.height)
        }
        else if((this.spacemarine.currentTurret)&&(this.spacemarine.currentTurret.bullets==this.spacemarine.currentTurret.maxBullets)){
            this.ctx.drawImage(this.sprites.spacemarine, 0 * this.spacemarine.currentTurret.width, this.spacemarine.currentTurret.offsetForY, this.spacemarine.currentTurret.width, this.spacemarine.currentTurret.height, this.spacemarine.currentTurret.x - this.layer3.x, this.spacemarine.currentTurret.y, this.spacemarine.currentTurret.width, this.spacemarine.currentTurret.height)
        }

        
        for (let i=0;i< this.aliens1.length; i++){
            if(this.aliens1[i]!=undefined){
                this.ctx.drawImage(this.sprites.aliens, this.aliens1[i].frame * this.aliens1[i].width ,this.aliens1[i].offsetForY, this.aliens1[i].width, this.aliens1[i].height, this.aliens1[i].x - this.layer3.x, this.aliens1[i].y, this.aliens1[i].width, this.aliens1[i].height )
            }
        }

        for (let i=0;i< this.aliens2.length; i++){
            if(this.aliens2[i]!=undefined){
                this.ctx.drawImage(this.sprites.aliens, this.aliens2[i].frame * this.aliens2[i].width ,this.aliens2[i].offsetForY, this.aliens2[i].width, this.aliens2[i].height, this.aliens2[i].x - this.layer3.x, this.aliens2[i].y, this.aliens2[i].width, this.aliens2[i].height )
            }
        }


        for (let i=0;i< this.spacemarine.turretBullets.length; i++){
            
            if((this.spacemarine.turretBullets[i].stopX)&&(this.spacemarine.turretBullets[i].speed>0)){
                this.ctx.drawImage(this.sprites.spacemarine, 0, this.spacemarine.bulletStopRight.offsetForY,this.spacemarine.bulletStopRight.width, this.spacemarine.bulletStopRight.height, this.spacemarine.turretBullets[i].stopX -this.layer3.x- this.spacemarine.bulletStopRight.width/2, this.spacemarine.turretBullets[i].stopY - 20, this.spacemarine.bulletStopRight.width, this.spacemarine.bulletStopRight.height) 
                this.spacemarine.turretBullets.splice(i,1);
            }
            else if((this.spacemarine.turretBullets[i].stopX)&&(this.spacemarine.turretBullets[i].speed<0)){
                this.ctx.drawImage(this.sprites.spacemarine, 0, this.spacemarine.bulletStopRight.offsetForY+55,this.spacemarine.bulletStopRight.width, this.spacemarine.bulletStopRight.height, this.spacemarine.turretBullets[i].stopX -this.layer3.x+ this.spacemarine.bulletStopRight.width-22, this.spacemarine.turretBullets[i].stopY - 20, this.spacemarine.bulletStopRight.width, this.spacemarine.bulletStopRight.height) 
                this.spacemarine.turretBullets.splice(i,1);
            }
            else{
                this.ctx.drawImage(this.sprites.spacemarine, 0, this.spacemarine.turretBullets[i].offsetForY, this.spacemarine.turretBullets[i].width, this.spacemarine.turretBullets[i].height, this.spacemarine.turretBullets[i].x - this.layer3.x, this.spacemarine.turretBullets[i].y, this.spacemarine.turretBullets[i].width, this.spacemarine.turretBullets[i].height  )
            }
       
        }
        
        this.ctx.drawImage(this.sprites.spacemarine, this.spacemarine.frame*this.spacemarine.currentStyle.width, this.spacemarine.currentStyle.offsetForY,this.spacemarine.currentStyle.width, this.spacemarine.currentStyle.height, this.spacemarine.x, this.spacemarine.y - this.spacemarine.height - this.spacemarine.jumpHeight, this.spacemarine.currentStyle.width, this.spacemarine.currentStyle.height);
        
        

        for (let i=0;i< this.spacemarine.commonBullets.length;i++){
            if((this.spacemarine.commonBullets[i].stopX)&&(this.spacemarine.commonBullets[i].speed>0)){
                this.ctx.drawImage(this.sprites.spacemarine, 0, this.spacemarine.bulletStopRight.offsetForY,this.spacemarine.bulletStopRight.width, this.spacemarine.bulletStopRight.height, this.spacemarine.commonBullets[i].stopX - this.spacemarine.bulletStopRight.width/2, this.spacemarine.commonBullets[i].stopY - 20, this.spacemarine.bulletStopRight.width, this.spacemarine.bulletStopRight.height) 
                this.spacemarine.commonBullets.splice(i,1);
            }
            else if((this.spacemarine.commonBullets[i].stopX)&&(this.spacemarine.commonBullets[i].speed<0)){
                this.ctx.drawImage(this.sprites.spacemarine, 0, this.spacemarine.bulletStopRight.offsetForY+55,this.spacemarine.bulletStopRight.width, this.spacemarine.bulletStopRight.height, this.spacemarine.commonBullets[i].stopX + this.spacemarine.bulletStopRight.width-10, this.spacemarine.commonBullets[i].stopY - 20, this.spacemarine.bulletStopRight.width, this.spacemarine.bulletStopRight.height) 
                this.spacemarine.commonBullets.splice(i,1);
            }
            else{
                this.ctx.drawImage(this.sprites.spacemarine, 0, this.spacemarine.commonBullets[i].offsetForY,this.spacemarine.commonBullets[i].width, this.spacemarine.commonBullets[i].height, this.spacemarine.commonBullets[i].x, this.spacemarine.commonBullets[i].y, this.spacemarine.commonBullets[i].width, this.spacemarine.commonBullets[i].height)
            }
        }

        for (let i=0;i< this.spacemarine.bigBullets.length;i++){
            if((this.spacemarine.bigBullets[i].stopX)&&((this.spacemarine.bigBullets[i].speed>0)||(this.spacemarine.bigBullets[i].speed<0))){

                let frame =0;
                var x = this.spacemarine.bigBullets[i].stopX;
                var y = this.spacemarine.bigBullets[i].stopY;

                 window.timerExplosion = setInterval(() => {
                    window.requestAnimationFrame(() => {
                    this.ctx.drawImage(this.sprites.spacemarine, frame * this.spacemarine.bigExplosion.width, this.spacemarine.bigExplosion.offsetForY,this.spacemarine.bigExplosion.width, this.spacemarine.bigExplosion.height, x - this.spacemarine.bigExplosion.width/2.5 - this.layer3.x, y - 50, this.spacemarine.bigExplosion.width, this.spacemarine.bigExplosion.height) 
                    })
                    frame++;
                    
                    
                    if(frame==this.spacemarine.bigExplosion.frames){
                        clearInterval(window.timerExplosion)
                    }
                }, 30);
                this.spacemarine.bigBullets.splice(i,1);
                if(this.spacemarine.bigBullets.length==0){
                    this.shootBigPermission =true
                }
            }
            else{
                if(this.spacemarine.bigBullets.length==0){
                    this.shootBigPermission =true
                }
                this.ctx.drawImage(this.sprites.spacemarine, 25, this.spacemarine.bigBullets[i].offsetForY,this.spacemarine.bigBullets[i].width, this.spacemarine.bigBullets[i].height, this.spacemarine.bigBullets[i].x, this.spacemarine.bigBullets[i].y, this.spacemarine.bigBullets[i].width, this.spacemarine.bigBullets[i].height)
            }
        }
        
        


    },
    gameOver(){
        this.sounds.maintheme.pause();
        this.spacemarine.healthItem=0;
        this.spacemarine.health.width = 0;
        clearInterval(window.timerClock);
        clearInterval(window.timerSpaceShip);
        clearInterval(window.timerWave1)
        clearInterval(window.timerId);
        clearTimeout(window.timerCommonShoot);

        game.running=false;
        this.waveCurrentMaxAliens1=0;
        this.waveCurrentMaxAliens2=0;

        this.wave1.alien1Max=20;
        this.wave1.alien2Max=0;

        this.wave2.alien1Max=20;
        this.wave2.alien2Max=10;
        
        this.wave3.alien1Max=28;
        this.wave3.alien2Max=14;

        if(this.spacemarine.commonBullets!=0){
            for (let i=0;i<this.spacemarine.commonBullets.length; i++){
                if((this.spacemarine.commonBullets[i])&&(this.spacemarine.commonBullets[i].timer)){
                    clearInterval(this.spacemarine.commonBullets[i].timer);
                }
            }
        }
        
        if(this.spacemarine.turretBullets!=0){
            
            for (let i=0;i<this.spacemarine.turretBullets.length; i++){
                if((this.spacemarine.turretBullets[i])&&(this.spacemarine.turretBullets[i].timer)){
                    clearInterval(this.spacemarine.turretBullets[i].timer);
                }
            }
        }

        if(this.spacemarine.bigBullets!=0){
            for (let i=0;i<this.spacemarine.bigBullets.length; i++){
                if((this.spacemarine.bigBullets[i])&&(this.spacemarine.bigBullets[i].timer)){
                    clearInterval(this.spacemarine.bigBullets[i].timer);
                }
            }
        }

        if(window.timerAlienDeath){
            clearInterval(window.timerAlienDeath);
        }
        
        this.spacemarine.commonBullets.length = 0;
        this.spacemarine.turretBullets.length = 0;
        this.spacemarine.bigBullets.length = 0;

        if(this.spacemarine.currentTurret){
            clearInterval(window.timerTurretShoot);
        }

        if(window.timerExplosion){
            clearInterval(window.timerExplosion);
        }


        for (let i=0;i<this.aliens1.length;i++){
            if(this.aliens1[i]){
                clearInterval(this.aliens1[i].timerAlien1Move);
                clearInterval(this.aliens1[i].timerAttack);
                if(this.aliens1[i].timerAlienDeath){
                    clearInterval(this.aliens1[i].timerAlienDeath);
                }
            }
        }

        for (let i=0;i<this.aliens2.length;i++){
            if(this.aliens2[i]){
                clearInterval(this.aliens2[i].timerAlien2Move);
                clearInterval(this.aliens2[i].timerAttack);
                if(this.aliens2[i].timerAlienDeath){
                    clearInterval(this.aliens2[i].timerAlienDeath);
                }
            }
        }

        this.aliens1.length=0;
        this.aliens2.length =0;
        if (this.musicAllow.checked){
            game.sounds.gameover.play();
        }
        document.getElementById('death').style.display = 'flex';
        
    },
    start() {
        this.init();
        this.preload(() => {
            this.run();
        });
    },

    saveResults(){
        if(this.easyAllow.checked){
            var type = 'Трениров. режим';
        }
        else{
            var type = 'Обычный режим';
        }

        let result = {
            name: this.name,
            type: type,
            time: this.time
        }
        var savedScores = localStorage.getItem('highscore') || '[]';
        var highscores = [...JSON.parse(savedScores),result];
        for (let i = 0, endI = highscores.length - 1; i < endI; i++) {
            let wasSwap = false;
            for (let j = 0, endJ = endI - i; j < endJ; j++) {
                if((highscores[j]!=undefined)&&(highscores[j+1]!=undefined)){
                    var arr1 = highscores[j].time.split(":");
                    var time1 = arr1[0]*60+arr1[1];

                    var arr2 = highscores[j+1].time.split(":");
                    var time2 = arr2[0]*60+arr2[1];

                    if (time1 < time2) {
                        [highscores[j], highscores[j + 1]] = [highscores[j + 1], highscores[j]];
                        wasSwap = true;
                    }
                }

            }
            if (!wasSwap) break;
        }
        highscores.slice(0,5);
        localStorage.setItem('highscore',JSON.stringify(highscores));   
    }
};