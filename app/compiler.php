<?php
     $language = strtolower($_POST['Language']);
     $code = $_POST['code'];

     $random = substr(md5(mt_rand(),offset:0,length 7);
     $filePath = "temp/" .$random."." . $language;
     $programFile = fopen($filePath,"w");
     fwrite($programFile, $code);
     fclose($programFile);