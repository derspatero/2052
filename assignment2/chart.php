<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title></title>
	<script src="piechart.js"></script>
	<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>

</head>
<body>
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
              // echo $key.'='.$value.' ';
              array_push($arr, $value);      // show key=value pairs
            }
        }
    }
}
// print_r($arr);
fclose($file);                            // close file handle
?>


	<canvas id="piechart1" width="150" height="200" style="float:left"></canvas>
    <div id="chart-key" style="float:left">
	   	<ul style="list-style-type:none;width:10em;">
   			<li style="background-color:red">Burnaby</li>
   			<li style="background-color:yellow">Downtown</li>
   			<li style="background-color:green">Marine</li>
   			<li style="background-color:blue">Aerospace</li>
   			<li style="background-color:purple">AnnacisIsland</li>
   			<li style="background-color:orange">GreatNorthernWay</li>
   		</ul>
   	</div>

	<script>
		var campuses = {
			Burnaby:0, 
			Downtown:0, 
			Marine:0,
			Aerospace:0,
			AnnacisIsland:0,
			GreatNorthernWay:0
		}
		var selected = [<?php echo '"'.implode('","', $arr).'"' ?>];
		for (i=0; i<selected.length; i++){
			campuses[selected[i]]++;

		}

		var burnabytotal = 360 / selected.length * campuses.Burnaby;
		var downtowntotal = 360 / selected.length * campuses.Downtown;
		var marinetotal = 360 / selected.length * campuses.Marine;
		var Aerospace = 360 / selected.length * campuses.Aerospace;
		var AnnacisIsland = 360 / selected.length * campuses.AnnacisIsland;
		var GreatNorthernWay = 360 / selected.length * campuses.GreatNorthernWay;


	   piechart("piechart1", ["red", "yellow", "green", "blue", "purple", "orange"], [burnabytotal, downtowntotal, marinetotal, Aerospace, AnnacisIsland, GreatNorthernWay]);



	</script>


</body>
</html>