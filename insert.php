<?php 

$name = $_POST['name'];
$headline = $_POST['headline'];
$linkedin = $_POST['linkedin'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$competences = $_POST['competences'];

$arr = array('name' => $name, 'headline' => $headline, 'linkedin' => $linkedin, 'email' => $email, 'tel' => $tel, 'competences' => $competences);

$array=json_encode($arr);

$file = 'index.json';

// Ouverture du fichier pour lire un contenu existant
$current = file_get_contents($file);

// Ajout des éléments souhaités
$current .= $array."\n";

// Écriture du résultat dans le fichier
file_put_contents($file, $current);

?>















