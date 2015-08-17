<!DOCTYPE html>
<html>
<head>
<? require_once(FILEROOT.'/meta.php'); ?>

<? require_once(FILEROOT.'/styles/styles.php'); ?>

<? require_once(FILEROOT.'/javascript/js.php'); ?>
</head>

<body onLoad="CCPEVE.requestTrust('http://*.eveuniversity.org/*')">
<header>
	<a id="logo" href="<?=SITEROOT?>/"><img src="<?=SITEROOT?>/images/logo.jpg"></a>

	<div id="menu">
		<div class="floatRight">
<? if (!$loggedIn) { ?>
			<a href="<?=SITEROOT?>/login.php">Login</a><?=$inGame?' | <a href="http://forum.eveuniversity.org/register" target="_blank">Register</a>':''?>
<? } else { ?>
			<a href="<?=SITEROOT?>/process/logout.php">Logout [ <?=$_SESSION['charName']?> ]</a>
<? } ?>
		</div>
		<div class="floatLeft">
<?
	$menu = array('Home' => array('url' => '/', 'id' => 'home'));
	if ($inUni) $menu = array_merge($menu, array('Titles' => array('url' => '/titles.php', 'id' => 'titles')), array('Update API' => array('url' => '/api.php', 'id' => 'api')));
	elseif ($loggedIn) $menu = array_merge($menu, array('Apply to the Uni' => array('url' => '/apply.php', 'id' => 'apply')), array('Update API' => array('url' => '/api.php', 'id' => 'api')));
//	else $menu = array_merge($menu, array('Apply to the Uni' => array('url' => '/apply.php', 'id' => 'apply', 'width' => 185)));
	
	foreach($menu as $tab => $details) {
		echo "			".'<a href="'.SITEROOT.$details['url'].'"'.($currentTab == $tab?' class="current"':'').">{$tab}</a>\n";
	}
	if (sizeof($fGroups)) {
		echo "			<a href=\"".SITEROOT."/admin\"".($currentTab == 'Admin'?' class="currentTab"':'').">Admin</a>\n";
		echo "			<a href=\"".SITEROOT."/admin/APIChecker.php\"".($currentTab == 'API Checker'?' class="currentTab"':'').">API Checker</a>\n";
	}
?>
		</div>
	</div>
</header>

<div id="content"><div id="page_<?=PAGE_ID?>">
