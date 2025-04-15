<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Canvas Boilerplate | Chris Courses</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="index.css">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" ></script>
  </head>
  <body>

    <?php
    
  try
  {
    // On se connecte à MySQL
    //$mysqlClient = new PDO('mysql:host=localhost;dbname=u810912857_dricketts;charset=utf8','u810912857_dricketts','Nour1234' );
    //$bdd=new PDO('mysql:host=localhost;dbname=jumping;charset=utf8', 'root', 'root');
    //$bdd = new PDO('mysql:host=localhost;dbname=akanenft_minigame;charset=utf8','akanenft_tokirun','TokiRun1995' );

   //$bdd = new PDO('mysql:host=localhost;dbname=jumping;charset=utf8', 'root', 'root');
   
   $bdd = new PDO('mysql:host=localhost;dbname=akanenft_wizard', 'akanenft_wizzard', 'TempPass2025!');

   

  }
  catch(Exception $e)
  {
    // En cas d'erreur, on affiche un message et on arrête tout
          die('Erreur : '.$e->getMessage());
  }
  
  // Si tout va bien, on peut continuer
  
  // On récupère tout le contenu de la table recipes
  $sqlQuery = 'SELECT * FROM minigame ORDER BY score DESC;';
  $recipesStatement = $bdd->prepare($sqlQuery);
  $recipesStatement->execute();
  $recipes = $recipesStatement->fetchAll();
  
  // On affiche chaque recette une à une
  
  ?>
   
   <div id="full-area">
        <div id="game-area">
        <div class="container">
    <a href="jeu.php"> <div id="exit3"> </div> </a>
		<div class="leaderboard">
			<div class="head">
				<i class="fas fa-crown"></i>
				<h1>Leaderboard</h1>
			</div>
			<div class="dataa">
				<ol>
				<?php  for ($i=0; $i <10 ; $i++) { ?>
					<li>
						<mark><?php echo $recipes[$i]['username']; ?></mark>
						<small> <?php echo $recipes[$i]['score']; ?></small>
					</li>
					<?php  } ?>
				</ol>
			</div>
		</div>
	</div>
        </div>
    </div>
  

<script src="./lib/respo.js"></script>
<script src="index.js"></script>
    
  </body>
</html>
