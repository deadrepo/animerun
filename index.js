devhk.windowResize()
const canvas=document.getElementById('canvas1')
var ctx=canvas.getContext('2d')

canvas.width=1024
canvas.height=600
let gameSpeed=2
let arrayBlocks = [];
let enemySpeed1 = 2;
let enemySpeed = 2;
let score=0
let frame=0
let nb_click=0
let int1
let int2
let scoreIncrement = 0;
let canScore = true;
const card = document.getElementById("score1");
const cardScore = document.getElementById("score");
const gravity=0.35

const obstacle1=new Image()
obstacle1.src="./media/obs.png"
const bg=new Image()
bg.src="./media/building.png"
const bg1=new Image()
bg1.src="./media/sky.png"
const obstacle2=new Image()
obstacle2.src="./media/Barrel.png"
const coin=new Image()
coin.src="./media/coin.png"
const deco1=new Image()
deco1.src="./media/shrine.png"

let obstacles=[{
    image:obstacle1
    ,width:80,height:84,cropw:563,croph:567,frame:0,y:430
},{
    image:obstacle2
    ,width:100,height:70,cropw:781,croph:547,frame:0,y:450
}]

let all_coins=[
    {
        name:coin,width:74,height:74,orrwid:100,orrhei:100
    }]
    let val=Math.floor(Math.random()*all_coins.length)
const layer3=new Image()
layer3.src="./media/clouds.png"
const layer2=new Image()
layer2.src="./media/layer2.png"

const layer4=new Image()
layer4.src="./media/layer4.png"
const floor=new Image()
floor.src="./media/3te.png"
const runr=new Image()
runr.src='./media/playerrun.png'
const jumpp=new Image()
jumpp.src='./media/jump.png'

const plat1=new Image()
plat1.src='./media/plat1.png'
const plat2=new Image()
plat2.src='./media/plat2.png'
const plat3=new Image()
plat3.src='./media/plat3.png'
const plat4=new Image()
plat4.src='./media/plat4.png'
const plat5=new Image()
plat5.src='./media/plat5.png'


let plat=[{image:plat1,cropw:482,croph:58,width:482,height:58},{image:plat2,cropw:368,croph:53,width:368,height:53},{image:plat3,cropw:269,croph:57,width:269,height:57},{image:plat4,cropw:129,croph:54,width:129,height:54},{image:plat5,cropw:67,croph:58,width:67,height:58}]


class Player{
    constructor(){
   
        this.position={
            y:338,
            x:200
        }
        this.y=this.position.y
        this.velocity={
            x:0,
            y:0
        }
        this.width=104.1
        this.height=176
        
        this.frames=0
        this.framee=8
        this.canJump=true
        
        this.sprites={
      
          run:{
            right:runr,
            cropWidth:200,
            cropHeight:171,
            width:200,
            height:171
          },
          jum:{
            right:jumpp,
            cropWidth:200,
            cropHeight:187,
            width:200,
            height:187
          }
        }
        this.currentSprite= this.sprites.run.right
        this.currentCropWidth=this.sprites.run.cropWidth
        this.currentCropHeight=this.sprites.run.cropHeight
        this.currentWidth=this.sprites.run.width
        this.currentHeight=this.sprites.run.height
    }
    draw(){
        //c.fillStyle = "blue";
        //c.fillRect(this.position.x,this.position.y,this.width,this.height)
        ctx.beginPath()
        ctx.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frames,
            0 ,
            this.currentCropWidth,
            this.currentCropHeight,
            this.position.x,
            this.position.y,
            this.currentWidth,
            this.currentHeight)
        ctx.closePath()
 
    }
    update(){
      
      //this.position.y=370
        //console.log(this.velocity.y)
        if (frame%this.framee==0) {
            this.frames++
           }
      if(this.frames>5 ) {
          this.frames=0
        }

        this.position.y+=this.velocity.y
        this.position.x+=this.velocity.x
        if (this.position.y+this.height+this.velocity.y<=canvas.height-80 || jump_avail==false && this.position.y<=canvas.offsetTop+60) {
           this.velocity.y+=gravity
        }else{
            this.velocity.y=0
        }
        this.draw()

    }
}

class Bonus {
    constructor({speed,valeur}){
        this.x = canvas.width;
        this.size = 54;
        this.y = Math.random()*(64-490)+490//Math.random()*((canvas.height-this.size)-player.position.y)+player.position.y;
        this.width=all_coins[valeur].width
        this.height=all_coins[valeur].height
        this.val=valeur
        this.color = "yellow";
        this.slideSpeed = speed;
        this.collided=false
        this.frames=0
    }

    draw() {
        //c.fillStyle = this.color;
        //c.fillRect(this.x,this.y,this.size,this.size);
        ctx.drawImage(
            all_coins[this.val].name,
            0,
            0 ,
            all_coins[this.val].orrwid,
            all_coins[this.val].orrhei,
            this.x-5,
            this.y,
            this.width,
            this.height)
    }

    slide() {
       
       if (frame%10==0) {
        this.frames++
       }
        if (this.frames>5 ) {
          this.frames=0
        }
        this.draw();
        this.x -= this.slideSpeed;
    }
    
}

class Platform{
    constructor({image,cropw,croph,width,height}){
        this.position={
            x:canvas.width,
            y:Math.random()*(400-100)+100
        }
        this.image=image
        this.width=width
        this.height=height
        this.slideSpeed = 0.2;
        this.cropwidth=cropw
        this.cropheight=croph
        this.frames=0
    }
    draw(){
        ctx.beginPath()
       // c.fillStyle = 'black';
       // c.fillRect(this.position.x,this.position.y,this.width,this.height)
       ctx.drawImage(
         this.image,
         this.cropwidth*this.frames ,
          0 ,
          this.cropwidth,
          this.cropheight,
          this.position.x,
          this.position.y,
          this.width,
          this.height)
  
    }
    slide() {
        if (frame%15==0) {
            this.frames++
           }
            if (this.frames>0 ) {
              this.frames=0
            }
        this.draw();
        this.position.x -= this.slideSpeed;
    }
}


class AvoidBlock {
    constructor({size, speed,image,cropw,croph,width,height,frame,y}){
        this.x = canvas.width + size;
        this.size = size;
        this.y = y
  
        this.color = "pink";
        this.slideSpeed = speed;
        this.collided=false
        this.image=image
        this.cropwidth=cropw
        this.cropheight=croph
        this.width=width
        this.height=height
        this.frames=0
        this.frame=frame
    }

    draw() {
    //ctx.fillStyle = "red";
    //ctx.fillRect(this.x,this.y,this.size,this.height);
        ctx.drawImage(
          this.image,
           this.cropwidth * this.frames,
            0 ,
            this.cropwidth,
            this.cropheight,
            this.x,
            this.y,
            this.size,
            this.height)
    }

    slide() {
       if (frame%15==0) {
        this.frames++
       }
        if (this.frames>this.frame ) {
          this.frames=0
        }
        this.draw();
        this.x -= this.slideSpeed;
    }
    
}


class Layer{
    constructor(image,speedModifier){
        this.x=0
        this.y=0
    }
}

let start=true
let player=new Player({imgg:runr,framee:10})
let platforms=[]
let animationId = null;
let bonuses = [];
let presetTime = Math.random()*(7000-3500)+3500;
let presetTime1 = Math.random()*(4000-3000)+3000;
let collided=false
let jump_size =110
let jump_duration = 0.05
let jump_avail =true
let jumpSecondPhase = false
let jumpEndTimeout1,jumpEndTimeout2;
let x=0
let x1=0
let x2=2048
let x3=2400
let st=true
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(bg1,x,0)
    ctx.drawImage(bg1,x2,0)
    ctx.drawImage(layer3,x,0)
    ctx.drawImage(layer3,x2,0)
    ctx.drawImage(bg,x,0)
    ctx.drawImage(bg,x2,0)
    ctx.drawImage(deco1,x,53,550,550)
    ctx.drawImage(deco1,x2,53,550,550)
  ctx.drawImage(floor,x1,-80)
  ctx.drawImage(floor,x3,-80)

 if (st==false) {
   // console.log("animated")
  animationId=requestAnimationFrame(animate)
  if (x<-2048) {
    x=2048+x2-gameSpeed
  }else  x-=gameSpeed
  if (x2<-2048) {
    x2=2048+x-gameSpeed
  }else  x2-=gameSpeed

  if (x1<-2400) {
    x1=2400+x3-gameSpeed
  }else  x1-=gameSpeed
  if (x3<-2400) {
    x3=2400+x1-gameSpeed
  }else  x3-=gameSpeed



handlebonuses()
arrayBlocks.forEach((arrayBlock, index) => {
    arrayBlock.slide();

   if (   player.position.x < arrayBlock.x + arrayBlock.width-80 &&
    player.position.x + player.width > arrayBlock.x &&
    player.position.y < arrayBlock.y + arrayBlock.height &&
    player.height + player.position.y > arrayBlock.y) {
    console.log("collide")
    if (!arrayBlock.collided) {

       cardScore.textContent = score;
       card.style.display = "block";

        cancelAnimationFrame(animationId);
        //if(game.){}
        $("#bg-audio")[0].pause()

        $("#over-audio")[0].pause(),$("#over-audio")[0].currentTime=0,$("#over-audio")[0].play()

        document.getElementById('username1').style.display = "flex"
        document.getElementById('name1').value=""
        document.getElementById("pause").style.display="none"
        //scoree=false
        console.log("fail")
        arrayBlock.collided=true
    }
}



        //User should score a point if this is the case
        if(isPastBlock(player, arrayBlock) && canScore){
            canScore = false;

        }
    //Delete block that has left the screen
    if((arrayBlock.x + arrayBlock.width) <= 0){
        setTimeout(() => {
            arrayBlocks.splice(index, 1);
        }, 0)
    }

 

})

shouldIncreaseSpeed()

  player.update()
  ctx.font="40px Press";
  ctx.fillStyle="white"
  ctx.fillText(score,(canvas.width/2),50)//ecrire text

  if (player.position.y+player.height>=canvas.height-80) {
    player.framee=25
    player.currentSprite= player.sprites.run.right
    player.currentCropWidth=player.sprites.run.cropWidth
    player.currentCropHeight=player.sprites.run.cropHeight
    player.currentWidth=player.sprites.run.width
    player.currentHeight=player.sprites.run.height
  }

  frame++
 }
}


function randomInterval(timeInterval) {
    let returnTime = timeInterval;
    if(Math.random() < 0.5){
        returnTime += getRandomNumber(presetTime / 3, presetTime * 1.5);
    }else{
        returnTime -= getRandomNumber(presetTime / 5, presetTime / 3);
    }
    return returnTime;
}

function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generateCoins() {
    if (st==false) {
    val=Math.floor(Math.random()*all_coins.length)
    let timeDelay = randomInterval(presetTime);
    bonuses.push(new Bonus({speed: gameSpeed,valeur:val}));
    int1=setTimeout(generateCoins, timeDelay);}
}


function jump1() {
    console.log("1")
    if(jump_avail ){
        console.log("2")
        $("#jump-audio")[0].pause(),$("#jump-audio")[0].currentTime=0,$("#jump-audio")[0].play()
        jumpSecondPhase = false;
        jump_avail = false
        player.velocity.y-=15
        player.framee=40
        player.currentSprite= player.sprites.jum.right
        player.currentCropWidth=player.sprites.jum.cropWidth
        player.currentCropHeight=player.sprites.jum.cropHeight
        player.currentWidth=player.sprites.jum.width
        player.currentHeight=player.sprites.jum.height
        jumpSecondPhase = true;
        jumpEndTimeout2 = setTimeout(()=>{
            if(start){
             //habta
                jumpEndTimeout2 = setTimeout(()=>{ 
                    if(start){
                        jump_avail = true;
                       
                        jumpSecondPhase = false;
                    }
                },jump_duration*4*1000)
            }
        },jump_duration*4*1000)
    }


}
function jump() {

    if(start && jump_avail==true && player.position.y+player.velocity.y>canvas.offsetTop+20 ){
        jump1()
       }
    }


    
document.addEventListener('keydown',({key})=>{
console.log(key)
    switch(key){

          case 'ArrowUp':
            
            jump()
      
              break;

              case 'ArrowUp':
            jump()
                   break;  
                   case ' ':
                    jump()
                           break;  
          
}

})


document.addEventListener('ontouchstart',()=>{
    nb_click++
    if (nb_click>1) {
        jump()
    }
})
document.addEventListener('click',()=>{
    nb_click++
    if (nb_click>1) {
        jump()
    }
})


//Auto generate blocks
function generateBlocks() {
    if (st==false) {
    let timeDelay = randomInterval(presetTime1);
    let choix=Math.floor(Math.random()*obstacles.length)
    arrayBlocks.push(new AvoidBlock({size:obstacles[choix].width,speed:enemySpeed,image:obstacles[choix].image,
        cropw:obstacles[choix].cropw,croph:obstacles[choix].croph,width:obstacles[choix].width,height:obstacles[choix].height,frame:obstacles[choix].frame,y:obstacles[choix].y}));
    int2=setTimeout(generateBlocks, timeDelay);}
}

function shouldIncreaseSpeed() {
    //Check to see if game speed should be increased
        if(scoreIncrement + 10 === score){
            scoreIncrement = score;
            enemySpeed=enemySpeed+0.7;
            gameSpeed=enemySpeed
            bonuses.forEach((bonus, index) => {
                bonus.speed=enemySpeed
            })
            arrayBlocks.forEach((bonus, index) => {
                bonus.speed=enemySpeed
            })
            presetTime >= 100 ? presetTime -= 100 : presetTime = presetTime / 2;
            //Update speed of existing blocks
            arrayBlocks.forEach(block => {
                block.slideSpeed = enemySpeed;
            });
            console.log("Speed increased");
        }
}

//Returns true if past player past block
function isPastBlock(player, block){

    return(
        player.position.x+player.width>=block.x&& player.position.x<=block.x+block.width-30&&
        player.position.y+player.height>=block.y&&
        player.position.y<= block.y+block.height
        )
}

function handlebonuses() {
    bonuses.forEach((bonus, index) => {
        bonus.slide();

    if (player.position.x+player.width>=bonus.x && player.position.x<=bonus.x+bonus.size&&
        player.position.y+player.height>=bonus.y&&player.position.y<=bonus.y+bonus.size) {
        //console.log("collide")
        if (!bonus.collided) {
            score++
            $("#coin")[0].volume=0.3,$("#coin")[0].pause(),$("#coin")[0].currentTime=0,$("#coin")[0].play()
    
            bonus.collided=true
            //console.log('collzzz')
            bonuses.splice(index, 1);
          

        }
       
    }
    })
}
jump_avail = false
function play() {

    document.getElementById('username1').style.display="none"
    document.getElementById('lost').style.display="none"
    document.getElementById('home_page').style.display="none"
    document.getElementById('username1').style.display="none"
     player=new Player({imgg:runr,framee:10})
 bonuses = [];
 collided=false

  jumpSecondPhase = false
  jumpEndTimeout1,jumpEndTimeout2;
 jump_avail =true
  gameSpeed=2.5
   presetTime = Math.random()*(4500-3500)+3500;
 presetTime1 =  Math.random()*(4500-3500)+3500;
 arrayBlocks = [];
 start=true
 enemySpeed1 = 2.5;
 enemySpeed = 2.5;
 score=0
 frame=0
 scoreIncrement = 0;
st=false
clearTimeout(int1)
clearTimeout(int2)
int2=setTimeout(() => {
        
    if (st==false) {
      
    generateBlocks();

}
},500)

int1=setTimeout(() => {
    if (st==false) {
   generateCoins();}
}, 500)

animate()
 }

 function pause() {
    document.getElementById("pause_screen").style.display="flex"
    document.getElementById("pause").style.display="none"
   st=true
   animate()
}
function resume() {
    document.getElementById("pause_screen").style.display="none"
    document.getElementById("pause").style.display="flex"
    st=false
   animate()
}

function play1(ele){

    document.getElementById('canvas1').style.display="flex"
    document.getElementById('pause').style.display="flex"
    document.getElementById('lost').style.display="none"
    document.getElementById('pause_screen').style.display="none"
    document.getElementById('home_page').style.display="none"
    document.getElementById('username1').style.display="none"
    if (ele.id=="restart" || ele.id=="pa") {
        nb_click=0
    }else if (ele.id=="btnplay") {
        nb_click=0
    }
    $("#bg-audio")[0].pause(),$("#bg-audio")[0].currentTime=0,$("#bg-audio")[0].play()

    play()
}
function home() {
    jump_avail = false;
    $("#bg-audio")[0].pause()
    st=true
    document.getElementById('canvas1').style.display="none"
    document.getElementById('home_page').style.display="flex"
    document.getElementById('lost').style.display="none"
    document.getElementById('pause_screen').style.display="none"
    document.getElementById('username1').style.display="none"
}

document.getElementById('submit').onclick = function(){
    console.log(document.getElementById('name1').value=="")
  if (document.getElementById('name1').value=="") {
    document.getElementById('name1').style.backgroundColor="red"
    var t=setTimeout(() => {
        document.getElementById('name1').style.backgroundColor="white"
    }, 200);
  }else{
    clearTimeout(t)
    $.ajax({
        type: "POST",
        url: 'submit.php',
        data: {
          username: document.getElementById('name1').value,
            score:score,
        },
        success: function(data){
    
        } 
    });
    $("#popup-audio")[0].volume=0.3,$("#popup-audio")[0].pause(),$("#popup-audio")[0].currentTime=0,$("#popup-audio")[0].play()

    document.getElementById('username1').style.display = "none"
    document.getElementById('lost').style.display='flex'
    document.getElementById('lost').style.zIndex=999999
    st=true
    start=false
  
  }

    }

    document.addEventListener("visibilitychange", onchange);
    var hidden = "hidden";
    if (hidden in document)
    document.addEventListener("visibilitychange", onchange);
  else if ((hidden = "mozHidden") in document)
    document.addEventListener("mozvisibilitychange", onchange);
  else if ((hidden = "webkitHidden") in document)
    document.addEventListener("webkitvisibilitychange", onchange);
  else if ((hidden = "msHidden") in document)
    document.addEventListener("msvisibilitychange", onchange);
  // IE 9 and lower:
  else if ("onfocusin" in document)
    document.onfocusin = document.onfocusout = onchange;
  // All others:
  else
    window.onpageshow = window.onpagehide
    = window.onfocus = window.onblur = onchange;

  function onchange (evt) {
    var v = "visible", h = "hidden",
        evtMap = {
          focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
        };

    evt = evt || window.event;
    if (evt.type in evtMap)
      document.body.className = evtMap[evt.type];
    else
      document.body.className = this[hidden] ? "hidden" : "visible";

      console.log(hidden)
      if (hidden=="hidden"){pause()}
  }


//full screen function
$("#full_s").click(()=>{
    let e=document.documentElement;
    e.requestFullScreen?e.requestFullScreen():e.webkitRequestFullScreen?e.webkitRequestFullScreen():
    e.mozRequestFullScreen?e.mozRequestFullScreen():
    e.msRequestFullscreen?e.msRequestFullscreen():
    e.webkitEnterFullscreen&&e.webkitEnterFullscreen(),
    document.exitFullscreen?document.exitFullscreen():
    document.webkitExitFullscreen?document.webkitExitFullscreen():
    document.msExitFullscreen&&
    document.msExitFullscreen()});




var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i)
var isTablet = navigator.userAgent.toLowerCase().match(/tablet/i)
var isAndroid = navigator.userAgent.toLowerCase().match(/android/i)
var isiPhone = navigator.userAgent.toLowerCase().match(/iphone/i)
var isiPad = navigator.userAgent.toLowerCase().match(/ipad/i);

if (isMobile||isTablet||isAndroid||isiPhone||isiPad) {
    document.getElementById("full_s").style.display="none"
    document.getElementById("exit_s").style.display="none"
}

$("#full-screen").click(()=>{let e=document.documentElement;e.requestFullScreen?e.requestFullScreen():e.webkitRequestFullScreen?e.webkitRequestFullScreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen?e.msRequestFullscreen():e.webkitEnterFullscreen&&e.webkitEnterFullscreen(),document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()});