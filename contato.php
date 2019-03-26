<?php  
 $nome = $_POST['nome'];
 $replyto = $_POST['email'];
 $telefone = $_POST['telefone'];
 $assunto = $_POST['assunto'];
 $mensagem_form = $_POST['mensagem'];
 $mail_name = "Omêga: Mensagem de " . $nome . " - " . $replyto;

 $to = "contato@omega.com";
 $remetente = "contato@omega.com";
  
 /* Cabeçalho da mensagem  */
 $boundary = "XYZ-" . date("dmYis") . "-ZYX";
 $headers = "MIME-Version: 1.0\n";
 $headers.= "From: $remetente\n";
 $headers.= "Reply-To: $replyto\n";
 $headers.= "Content-type: multipart/mixed; boundary=\"$boundary\"\r\n";  
 $headers.= "$boundary\n"; 
  
 /* Layout da mensagem  */
 $corpo_mensagem = " 
 <br>Formulário via Omêga site
 <br>--------------------------------------------<br>
 <br><strong>Nome:</strong> $nome
 <br><strong>Email:</strong> $replyto
 <br><strong>Telefone:</strong> $telefone
 <br><strong>Assunto:</strong> $assunto
 <br><strong>Mensagem:</strong> $mensagem_form
 <br><br>--------------------------------------------
 ";
  
 $mensagem = "--$boundary\n"; 
 $mensagem.= "Content-Transfer-Encoding: 8bits\n"; 
 $mensagem.= "Content-Type: text/html; charset=\"utf-8\"\n\n";
 $mensagem.= "$corpo_mensagem\n";
  
 /* Função que envia a mensagem  */
 if($nome !== '' AND
    ($replyto !== '' OR
     $telefone !== '') AND
    $assunto !== '' AND
    $mensagem_form !== '' AND
    mail($to, $mail_name, $mensagem, $headers)) {
   http_response_code(200);
 } else {
   http_response_code(400);
 }
 ?>