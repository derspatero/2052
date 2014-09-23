<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title></title>
</head>
<body>
<?php
$file_handle = fopen('data.json', 'a');  // a - append, w - overwrite
if($file_handle) {                       // if file is there
   fwrite(                               // write to file
      $file_handle,                      // specified by $file_handle
      json_encode($_POST).PHP_EOL);      // json-encoded POST data (terminate with end of line)
   fclose($file_handle);                 // close file stream
   // echo 'Data submitted successfully.';  // inform of success
	header('Location:test.php');         // or show another html
}
else {
   echo 'Error opening data file.';      // inform of failure
}
?>
</body>
</html>