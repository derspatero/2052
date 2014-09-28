<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

/**
 * Template Name: A00892244 Store Data
 */
?>
<?php get_header(); ?>

<div id="content" class="grid col-620">
<h1>Questionaire</h1>
	<form  method="POST" id="dataform"><pre>
	Name:          <input type="text" class="field" name="A00892244_fullName"    />
	Date of Birth: <input type="text" class="field" name="A00892244_dateOfBirth" />
	Occupation:    <input type="text" class="field" name="A00892244_occupation"  /></pre>
	<input type="submit" class="submit" name="submit" value="Submit" />
	</form>


</div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>

<?php if(isset($_POST['A00892244_fullName']) && !empty($_POST['A00892244_fullName'])): ?>
   <?php add_option('A00892244_'.date("ymd-His"), json_encode($_POST)); ?>
   <script>
      alert("Thanks for submitting your data!");
   </script>
<?php
   endif;
   header("Location: ".TEMPLATEPATH.'/store.php');
?>