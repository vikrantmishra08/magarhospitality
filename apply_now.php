<?php
function reCaptcha($recaptcha){
    $secret = "6Lfp1JYoAAAAAAXNnzG2U72igI_YXn3PpghEcLyT";
    $ip = $_SERVER['REMOTE_ADDR'];
  
    $postvars = array("secret"=>$secret, "response"=>$recaptcha, "remoteip"=>$ip);
    $url = "https://www.google.com/recaptcha/api/siteverify";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postvars);
    $data = curl_exec($ch);
    curl_close($ch);
  
    return json_decode($data, true);
  }
  $recaptcha = $_POST['g-recaptcha-response'];
$res = reCaptcha($recaptcha);
if($res['success']){
    $statusMsg='';
if(isset($_FILES["file"]["name"])){
   $email = $_POST['email'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
$fromemail =  'hrdesk@magarhospitality.com';
//$fromemail =  $email;
$subject="Careers Request from MCRPL Website";
$email_message = '<p>Hello Administrator, <br>We have recorded the following "Careers request" mail for you:</p>
                    <p><b>Name:</b> '.$name.'</p>
                    <p><b>Email:</b> '.$email.'</p>
                    <p><b>Phone:</b> '.$phone.'</p>
                    <p><b>Positions:</b> '.$message.'</p>';
$email_message.="Please find the attachment Resume <br />&nbsp;&nbsp; <br />Thanks & Regards, <br />Technical Support Team<br /> Magarpatta Clubs & Resorts Pvt. Ltd.";

$semi_rand = md5(uniqid(time()));
$headers = "From: ".$fromemail;
$headers = "Bcc: yuvraj@pivotaldesign.biz";
$mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";
 
    $headers .= "\nMIME-Version: 1.0\n" .
    "Content-Type: multipart/mixed;\n" .
    " boundary=\"{$mime_boundary}\"";
 
if($_FILES["file"]["name"]!= ""){  
	$strFilesName = $_FILES["file"]["name"];  
	$strContent = chunk_split(base64_encode(file_get_contents($_FILES["file"]["tmp_name"])));  
	
	
    $email_message .= "This is a multi-part message in MIME format.\n\n" .
    "--{$mime_boundary}\n" .
    "Content-Type:text/html; charset=\"iso-8859-1\"\n" .
    "Content-Transfer-Encoding: 7bit\n\n" .
    $email_message .= "\n\n";
 
 
    $email_message .= "--{$mime_boundary}\n" .
    "Content-Type: application/octet-stream;\n" .
    " name=\"{$strFilesName}\"\n" .
    //"Content-Disposition: attachment;\n" .
    //" filename=\"{$fileatt_name}\"\n" .
    "Content-Transfer-Encoding: base64\n\n" .
    $strContent  .= "\n\n" .
    "--{$mime_boundary}--\n";
}
$toemail="hrdesk@magarhospitality.com";
//$toemail="yuvraj@pivotaldesign.biz";

if(mail($toemail, $subject, $email_message, $headers)){
   $statusMsg= "Email send successfully with attachment";
   ?>
			<script language="javascript">
                alert('Thank You! Your request has been sent successfully.');
                parent.window.location = "careers.html";
            </script>
        <?
        exit;
}else{
   $statusMsg= "Not sent";
   ?>
			<script language="javascript">
                alert('Request not completed. Please try again later.');
                parent.window.location = "careers.html";
            </script>
        <?
        exit;
}
}
  }else{
    $statusMsg= "Not sent";
   ?>
			<script language="javascript">
                alert('The reCAPTCHA verification failed, please try again.');
                parent.window.location = "careers.html";
            </script>
        <?
        exit;
  }


   ?>