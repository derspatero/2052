<!DOCTYPE html>
<html style="width=100%">
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <title>Sample Client-Server Web App</title>
</head>
<body>
    <h1>Data Retrieved</h1>

<?php
 $arr = array();
$file = fopen('data.json', "r")           // open file
        or exit('Data not found.');       // or give err msg and exit
while(!feof($file))                       // while eof not reached
{
    $line = fgets($file);                 // get one line
    $data = json_decode($line, TRUE);     // json-decode it, $assoc
    if (is_array($data)) {                // if decoded data is an array
        foreach ($data as $key => $value) // iterate through assoc array
        {
            if ($value != '0') {
              echo $key.'='.$value.' ';
              array_push($arr, $value);      // show key=value pairs
            }
        }
    }
}
print_r($arr);
fclose($file);                            // close file handle
?>



</body>
</html>