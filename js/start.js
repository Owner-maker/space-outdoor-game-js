
window.addEventListener("load", () => {
    let temp = document.getElementById('play')
    temp.addEventListener('click', function(){
    
        event.preventDefault();
        let name = document.getElementById('field').value;
        if(name){
            document.getElementById('block').style.display = 'none';
            localStorage.setItem('name', name);
            game.running = true;


            game.musicAllow = document.getElementById('music')
            game.easyAllow = document.getElementById('easy');
            

        game.start()
        }
    })
    
    
    let menu = document.getElementById('menu')
    menu.addEventListener('click', function(){
        window.location.reload();
    })

    let menuFromCup = document.getElementById('menuFromCup');
    menuFromCup.addEventListener('click', function(){
        window.location.reload();
    })

    let toCups = document.getElementById('toCups');
    toCups.addEventListener('click', function(){
        document.getElementById('block').style.display = 'none';
        document.getElementById('cupp').style.display = 'block';
    })

    if(localStorage.getItem('highscore')!=null){
        let highscores = JSON.parse(localStorage.getItem('highscore'));
        for (let i=0;i<5;i++){
            if(highscores[i]!=undefined){
                let temp = i+1;
                let nameid = 'name' + temp;
                let typeid = 'type' + temp;
                let timeid = 'time' + temp;
                document.getElementById(nameid).innerText = highscores[i].name;
                document.getElementById(typeid).innerText = highscores[i].type;
                document.getElementById(timeid).innerText = highscores[i].time;
            }
        }
    }







    let again = document.getElementById('again')
    again.addEventListener('click', function(){
        event.preventDefault();



        game.animationPermission=true;
        game.running= true;
        game.leftPressed= false;
        game.rightPressed= false;
        game.jumpPressed= false;
        game.shootPressed= false;
        game.shootPressedG= false;
        game.currentButton= 68;
        game.mainthemeRunning=true;
        
        
        game.time= '00:00';
        game.timerPermission=true;

        game.shootCommonPermission= true;
        game.shootBigPermission=true;
        game.setTurretPermission= true;

        game.aliens1.length=0;
        game.aliens2.length=0;


        game.wave1Permission=true;

        game.wave1WordSecondPermission = true;
        game.wave2Permission=true;
        game.wave2WordPermission=false;
        game.wave2WordTimerPermission=true;

        game.wave3Permission=true;
        game.wave3WordPermission=false;
        game.wave3WordTimerPermission=true;

        game.wave1CurrentWord=0;
        game.wave1CurrentSize = '82px MKARCADECAPS';

        game.waveCurrentMaxAliens1=0;
        game.waveCurrentMaxAliens2=0;

        game.winning=true;
        game.winningWordsPermission=false;

        game.alien1CreatePermission=true;
        game.alien2CreatePermission=true;
        game.amountAliensPerOnce=null;
        game.currentAmountOfAliens1=0;
        game.currentAmountOfAliens2=0;

        game.spacemarine.healthItem= 5;
        game.spacemarine.healthRegenPermision= true;
        game.spacemarine.velocity= 6;
        game.spacemarine.dx= 0;
        game.spacemarine.x= 405;
        game.spacemarine.y= 265;
        game.spacemarine.width= 70;
        game.spacemarine.height= 77;
        game.spacemarine.jumpCount= 0;
        game.spacemarine.jumpLength= 36;
        game.spacemarine.jumpHeight= 0;
        game.spacemarine.health.width= 205;

        game.spacemarine.currNumberOfBlock=0;
        game.spacemarine.stayingOnBlock=true;
        game.spacemarine.checkingBlock=true;
        game.spacemarine.landing=true;
        game.spacemarine.fallingPermission=true;
        game.spacemarine.deathPermission=true;

        game.spacemarine.commonBullets.splice(0,game.spacemarine.commonBullets.length);
        game.spacemarine.turretBullets.splice(0,game.spacemarine.turretBullets.length);
        game.spacemarine.bigBullets.splice(0,game.spacemarine.bigBullets.length);
        game.spacemarine.bigBulletsAmount= 35;
        game.spacemarine.turretsAmount= 6;
        game.spacemarine.currentTurret= null;

        game.layer3.x=0;
        game.layer2.x=0;
        game.layer1.x=0;

        game.amountAliensPerOnce=null;
        game.currentWave=null;

        game.spaceship.frame=0;

        document.getElementById('death').style.display = 'none';
        
        game.start()
    })


    
});
