<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

/**
 * Template Name: A00892244 Retrieve Data
 */
?>
<?php get_header(); ?>

<div id="content" class="grid col-620">
<h1>User Data</h1>

<div id="piechart">here is a piechart</div>

<?php
$sql = "SELECT * FROM wp_options WHERE option_name LIKE 'A00892244%' ORDER BY option_name";
$options = $wpdb->get_results($sql);
foreach ($options as $option) {
    echo '<p><b>'.$option->option_name.'</b> = '
         .esc_attr($option->option_value).'</p>'.PHP_EOL;
}
?>

<?php $data = json_decode(get_option($option), TRUE); ?>
<canvas id="piechart1" width="100" height="100"></canvas>
<script src="<?php echo get_stylesheet_directory_uri().'/piechart.js'; ?>"></script>
<script>
    var chartId = "piechart1";
    var colours = ["#f00", "#0f0", "#00f"];
    var angles = [120,120,120]
    // var angles =  [<?php echo $data['key1'].','.$data['key2'].','.$data['key3']; ?>];
    piechart(chartId, colours, angles);

</script>


</div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>

