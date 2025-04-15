<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="index.css">
    <title>Document</title>
    <script src="./lib/jquery.js"></script>
    <link rel="stylesheet" href="./lib/Roboto-Black_1.ttf">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

</head>
<body>
  <div style="display:none">
    <audio id="jump-audio"><source src="media/jump.wav" type="audio/wav" ></audio>
    <audio  id="over-audio"><source src="media/over.mp3" type="audio/mp3" ></audio>
     <audio id="popup-audio"><source src="media/popup.wav" type="audio/wav" ></audio>
    <audio id="yes-audio"><source src="media/yes.wav" type="audio/wav" ></audio>
     <audio id="no-audio"><source src="media/no.wav" type="audio/wav" ></audio>
    <audio loop id="bg-audio"><source src="media/bgson.mp3" type="audio/mp3" ></audio>
    <audio id="coin"><source src="media/coin.mp3" type="audio/mp3" ></audio>
    <img src="media/3te.png" alt="">
    <img src="media/Barrel.png" alt="">
    <img src="media/building.png" alt="">
    <img src="media/clouds.png" alt="">
    <img src="media/coin.mp3" alt="">
    <img src="media/exit.png" alt="">
    <img src="media/jump.png" alt="">
    <img src="media/obs.png" alt="">
    <img src="media/restart.png" alt="">
    <img src="media/playerrun.png" alt="">
    <img src="media/shrine.png" alt="">
    <img src="media/sky.png" alt="">
    <img src="media/title.png" alt="">
    </div>

    <div id="full-area">

  <div id="game-area">
    <button style="position: absolute;
    z-index: 9999999999;" id="full-screen"><svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
  <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
</svg></button>

<div id="home_page">
  <h4 id="g_title"></h4>
  <div id="btnplay" onclick="play1(this)">Play</div>
  <a href="./leaderboard.php"><div id="btnlead">Leaderboard</div></a>
</div>

<div id="username1">
  <div id="black"></div>
  <div id="exit" onclick="home()"> </div> 
<div id="username">
  <p id="twitter">Enter $handle <br> / Wallet Address</p>
  <div id="name"><input type="text" id="name1"></div>
  <div id="submit" >Submit</div>
  
</div>
</div>

<div id="lost">
  <div id="black"></div>
  <div id="exit" onclick="home()"> </div> 
  <div id="lost_text"> 
    <div id="score1">
      Your Score is: <div id="score">0</div>
    </div>
  </div>
 <button id="pa" class="play" onclick="play1(this)"></button>
</div>
<div id="pause" onclick="pause()">
  

</div>
<div id="pause_screen">
  <h3 id="resume">Resume?</h3>
  <svg id="continue" onclick="resume()" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
  </svg>
  <svg id="home" onclick="home()" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
  </svg>

  <svg id="restart" onclick="play1(this)" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
  </svg>
</div>
<canvas id="canvas1"></canvas>
</div>  


</div>
  <script src="./lib/respo.js"></script>
    <script src="index.js"></script>
</body>
</html>