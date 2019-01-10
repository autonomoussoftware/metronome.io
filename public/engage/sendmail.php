<?php
if(isset($_POST['submit'])){
	$to = "dariusz@metronome.io";
	$_POST['email']?$from = filter_var($_POST['email'],FILTER_VALIDATE_EMAIL):$from = null;
	$from?$email = $from:$email = null;
	$_POST['name']?$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING):$name = null;
	$_POST['location']?$location = filter_var($_POST['location'], FILTER_SANITIZE_STRING):$location = null;
	$_POST['url']?$url = filter_var($_POST['url'], FILTER_SANITIZE_STRING):$url = null;
	$_POST['comment']?$comment = filter_var($_POST['comment'], FILTER_SANITIZE_STRING):$comment = null;
	$subject = "New Form submission from metronome.io!";
	$message = "<strong>Someone wants to connect!</strong> <br>
		Name: " .$name. "<br>
		Email: " .$email. "<br>
		Location: " .$location. "<br>
		Event/Meet Up Link: " .$url. "<br>
		Comment: " .$comment;
	$redirect = "/thank-you/";
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	$headers .= 'From: metronome.io <connect@metronome.io>' . "\r\n";
	ob_start();
	mail($to,$subject,$message,$headers);
	ob_end_clean();
	header("Location: " .$redirect);
}
?>