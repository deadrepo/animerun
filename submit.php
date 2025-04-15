<?php

	//$bdd = new PDO('mysql:host=localhost;dbname=jumping;charset=utf8', 'root', 'root');

    //$bdd = new PDO('mysql:host=localhost;dbname=u810912857_raspberry;charset=utf8','u810912857_raspberry','Nour1234' );

    //$bdd = new PDO('mysql:host=localhost;dbname=jumping;charset=utf8', 'root', 'root');

    //$bdd = new PDO('mysql:host=localhost;dbname=akanenft_minigame;charset=utf8','akanenft_tokirun','TokiRun1995' );
    
    $bdd = new PDO('mysql:host=localhost;dbname=akanenft_wizard', 'akanenft_wizzard', 'TempPass2025!');


    $username = $_POST["username"];
    $score = $_POST["score"];
    echo($score);
 $req=$bdd->prepare('INSERT INTO `minigame`(`username`,`score`) VALUES (:username,:score)');
$req->execute(array( 'username' => $username,  
'score'=> $score));

header("Location:jeu.php");
?>