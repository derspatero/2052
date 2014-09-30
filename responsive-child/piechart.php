<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

/**
 * Template Name: A00892244 assignment3
 */
?>
<?php 
	get_header(); 
?> 

<div id="content" class="grid col-620">
<h4>Edward Lambke A00892244</h4>
<h4>Assigment 3</h4>

<h2>Select your favourite campus</h2>	
<form  method="POST" id="dataform">
    <select name="campuses" id="campuses">	
        <option value="Burnaby">Burnaby Campus</option>
        <option value="Downtown">Downtown Campus</option>
        <option value="Marine">Marine Campus</option>
        <option value="Aerospace">Aerospace Technology Campus</option>
        <option value="AnnacisIsland">Annacis Island Campus</option>
        <option value="GreatNorthernWay">Great Northern Way Campus</option>
    </select>	
	<input value="Submit" type="submit" />
</form>


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

</div>

<?php get_footer(); ?>


<?php if(isset($_POST['campuses']) && !empty($_POST['campuses'])): ?>
   <?php add_option('A00892244_assignment3_'.date("ymd-His"), json_encode($_POST)); ?>
   <script>
      alert("Thanks for submitting your data!");
   </script>
<?php
   endif;
   header("Location: ".TEMPLATEPATH.'/store.php');
?>


<?php
$arr = array();
$sql = "SELECT * FROM wp_options WHERE option_name LIKE 'A00892244_assignment3%' ORDER BY option_name";
$options = $wpdb->get_results($sql);
foreach ($options as $option) {

	// echo '<p>$option->option_value: '.$option->option_value.'<p>';

    $line = get_option($option->option_name);	

    // echo 'line:'.$line.'endofstring<br />';
		
    $data = json_decode($line, TRUE);     // json-decode it, $assoc

    // echo 'data:'.$data.'endofstring 	<br />';

    if (is_array($data)) {                // if decoded data is an array
    	// echo 'is array';
        foreach ($data as $key => $value) // iterate through assoc array
        {
            // echo 'key:'.$key.'='.$value.' ';
            array_push($arr, $value);      // show key=value pairs
         
        }
    }
    else{
    	// echo 'is not an array';
    }
}
?>



   	<!-- <div id="test">js array</div> -->


	<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
	<script src="<?php echo get_stylesheet_directory_uri().'/piechart.js'; ?>"></script>


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
			// $("#test").append(selected[i]);

		}

		var burnabytotal = 360 / selected.length * campuses.Burnaby;
		var downtowntotal = 360 / selected.length * campuses.Downtown;
		var marinetotal = 360 / selected.length * campuses.Marine;
		var Aerospace = 360 / selected.length * campuses.Aerospace;
		var AnnacisIsland = 360 / selected.length * campuses.AnnacisIsland;
		var GreatNorthernWay = 360 / selected.length * campuses.GreatNorthernWay;

		// alert("burnabytotal:" + campuses.Burnaby);

	   piechart("piechart1", ["red", "yellow", "green", "blue", "purple", "orange"], [burnabytotal, downtowntotal, marinetotal, Aerospace, AnnacisIsland, GreatNorthernWay]);



	</script>





