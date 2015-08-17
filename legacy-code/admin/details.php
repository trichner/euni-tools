<?
	require('../includes/requires.php');
	define('PAGE_ID', 'admin_charInfo');
	$currentTab = 'Admin';
	
	$loggedIn = checkLogin();
	$fGroups = getFGroups($loggedIn);
	$permissions = getPermissions($fGroups);
	if (sizeof($fGroups) == 0) { header('Location: '.SITEROOT.'/'); exit; }
	
	$adminID = intval($_SESSION['characterID']);
	$vCharacterID = intval($_GET['characterID']);
	if ($adminID == $vCharacterID && in_array('Managers', $fGroups) == FALSE && in_array('Assistant Recruitment Managers', $fGroups) == FALSE) {
		
		header('Location: '.SITEROOT.'/admin/'); exit;
	}
    if (in_array('Personnel Officers', $fGroups) == FALSE  && in_array('Title Staff', $fGroups) == FALSE && in_array('Directors', $fGroups) == FALSE){
        header('Location: '.SITEROOT.'/admin/'); exit;
    }

	$charInfo = $mysql->query("SELECT characters.characterID, characters.charSheetCache, characters.charName, accounts.accountID, accounts.userID, accounts.keyID, accounts.vCode, accounts.charListCache FROM characters LEFT JOIN accounts ON characters.accountID = accounts.accountID WHERE characters.characterID = $vCharacterID");
	if ($charInfo->rowCount()) {
		$charInfo = $charInfo->fetch();
		$vInUni = $fmysql->query("SELECT groups.group_id FROM phpbb_user_group memberships, phpbb_groups groups WHERE memberships.group_id = groups.group_id AND memberships.user_id = $vCharacterID AND groups.group_id = 252");
		$vInUni = $vInUni->rowCount()?TRUE:FALSE;
		$apiPulls = $mysql->query("SELECT c.charName, ap.pullDate, ap.name, ap.DoB, ap.race, ap.gender, ap.corpName, ap.corpID, ap.allianceName, ap.allianceID, ap.cloneName, ap.cloneSP, ap.balance, ap.memoryImplant, ap.memoryBonus, ap.willpowerImplant, ap.willpowerBonus, ap.charismaImplant, ap.charismaBonus, ap.perceptionBonus, ap.perceptionImplant, ap.intelligenceBonus, ap.intelligenceImplant, ap.intelligence, ap.memory, ap.charisma, ap.perception, ap.willpower, ap.totalSP, sp.standingID FROM apiPulls ap INNER JOIN characters c ON ap.pulledBy = c.characterID LEFT JOIN standingPulls sp ON ap.pullID = sp.pullID WHERE ap.characterID = {$vCharacterID} ORDER BY ap.pullID DESC");
	} else { header('Location: '.SITEROOT.'/admin/'); exit; }
	
	$dnr = $mysql->query("SELECT * FROM dnr WHERE characterID = $vCharacterID LIMIT 1");
?>
<!DOCTYPE html>
<html>
<head>
<title><?=$charInfo['charName']?></title>
<? require_once(FILEROOT.'/meta.php'); ?>

<? require_once(FILEROOT.'/styles/styles.php'); ?>

<? require_once(FILEROOT.'/javascript/js.php'); ?>

<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $( "#datepicker" ).datepicker();
});
</script>

</head>

<? require_once(FILEROOT.'/header.php'); ?>
	<input id="characterID" type="hidden" value="<?=$vCharacterID?>">
	<input id="userID" type="hidden" value="<?=$charInfo['accountID']?>">
	
<?
//$_SESSION['mail'] = "tfr"; //For Testing

    if (isset($_SESSION['mail'])){

        if($_SESSION['mail'] == "tfr"){
            $responce = getMail('trejectFresh');
            echo "
                <script type=\"text/javascript\">
                var subject = ".json_encode($responce[0]).";
                var header = 'Dear ' + '<url=showinfo:1377//".$vCharacterID.">' + ".json_encode($charInfo['charName'])." + '</url>';
                var body = ".json_encode($responce[1]).";
                var interviewer = '<url=showinfo:1377//".$adminID.">' + ".json_encode($_SESSION['charName'])." + '</url>';
                var footer = ".json_encode($responce[2]).";
                CCPEVE.sendMail($vCharacterID,subject,header+body+interviewer+footer);
                </script>
                ";
        }elseif($_SESSION['mail'] == "tso") {
            $responce = getMail('trejectSop');
            echo "
                <script type=\"text/javascript\">
                var subject = ".json_encode($responce[0]).";
                var header = 'Dear ' + '<url=showinfo:1377//".$vCharacterID.">' + ".json_encode($charInfo['charName'])." + '</url>';
                var body = ".json_encode($responce[1]).";
                var interviewer = '<url=showinfo:1377//".$adminID.">' + ".json_encode($_SESSION['charName'])." + '</url>';
                var footer = ".json_encode($responce[2]).";
                CCPEVE.sendMail($vCharacterID,subject,header+body+interviewer+footer);
                </script>
                ";
        }elseif($_SESSION['mail'] == "tgr") {
            $responce = getMail('trejectGrad');
            echo "
                <script type=\"text/javascript\">
                var subject = ".json_encode($responce[0]).";
                var header = 'Dear ' + '<url=showinfo:1377//".$vCharacterID.">' + ".json_encode($charInfo['charName'])." + '</url>';
                var body = ".json_encode($responce[1]).";
                var interviewer = '<url=showinfo:1377//".$adminID.">' + ".json_encode($_SESSION['charName'])." + '</url>';
                var footer = ".json_encode($responce[2]).";
                CCPEVE.sendMail($vCharacterID,subject,header+body+interviewer+footer);
                </script>
                ";
        }elseif($_SESSION['mail'] == "reject"){
            $responce = getMail('reject');
            echo "
                <script type=\"text/javascript\">
                var subject = ".json_encode($responce[0]).";
                var header = 'Dear ' + '<url=showinfo:1377//".$vCharacterID.">' + ".json_encode($charInfo['charName'])." + '</url>';
                var body = ".json_encode($responce[1]).";
                var interviewer = '<url=showinfo:1377//".$adminID.">' + ".json_encode($_SESSION['charName'])." + '</url>';
                var footer = ".json_encode($responce[2]).";
                CCPEVE.sendMail($vCharacterID,subject,header+body+interviewer+footer);
                </script>
                ";

        }elseif (!checkstatus($vCharacterID)){
            switch ($_SESSION['mail']){
                case "po":
                case "spo":
                    $responce = getMail('rPO');
                echo "
                    <script type=\"text/javascript\">
                    var subject = ".json_encode($responce[0]).";
                    var header = 'Dear ' + '<url=showinfo:1377//".$vCharacterID.">' + ".json_encode($charInfo['charName'])." + '</url>';
                    var body = ".json_encode($responce[1].$responce[3].$responce[4]).";
                    var interviewer = '<url=showinfo:1377//".$adminID.">' + ".json_encode($_SESSION['charName'])." + '</url>';
                    var footer = ".json_encode($responce[5]).";
                    CCPEVE.sendMail($vCharacterID,subject,header+body+interviewer+footer);
                    </script>
                    ";
                    break;
                case "rpo":
                case "rspo":
                    $responce = getMail('rPO');
                    echo "
                    <script type=\"text/javascript\">
                    var subject = ".json_encode($responce[0]).";
                    var header = 'Dear ' + '<url=showinfo:1377//".$vCharacterID.">' + ".json_encode($charInfo['charName'])." + '</url>';
                    var body = ".json_encode($responce[1].$responce[2].$responce[3].$responce[4]).";
                    var interviewer = '<url=showinfo:1377//".$adminID.">' + ".json_encode($_SESSION['charName'])." + '</url>';
                    var footer = ".json_encode($responce[5]).";
                    CCPEVE.sendMail($vCharacterID,subject,header+body+interviewer+footer);
                    </script>
                    ";
                    break;
            }
        }else{
            switch ($_SESSION['mail']){
                case "po":
                case "spo":
                    $responce = getMail('stPO');
                echo "
                    <script type=\"text/javascript\">
                    var subject = ".json_encode($responce[0]).";
                    var header = 'Dear ' + '<url=showinfo:1377//".$vCharacterID.">' + ".json_encode($charInfo['charName'])." + '</url>';
                    var body = ".json_encode($responce[1]).";
                    var interviewer = '<url=showinfo:1377//".$adminID.">' + ".json_encode($_SESSION['charName'])." + '</url>';
                    var footer = ".json_encode($responce[2]).";
                    CCPEVE.sendMail($vCharacterID,subject,header+body+interviewer+footer);
                    </script>
                    ";
                    break;
                case "rpo":
                case "rspo":
                    $responce = getMail('rPO');
                echo "
                    <script type=\"text/javascript\">
                    var subject = ".json_encode($responce[0]).";
                    var header = 'Dear ' + '<url=showinfo:1377//".$vCharacterID.">' + ".json_encode($charInfo['charName'])." + '</url>';
                    var body = ".json_encode($responce[1].$responce[2].$responce[4]).";
                    var interviewer = '<url=showinfo:1377//".$adminID.">' + ".json_encode($_SESSION['charName'])." + '</url>';
                    var footer = ".json_encode($responce[5]).";
                    CCPEVE.sendMail($vCharacterID,subject,header+body+interviewer+footer);
                    </script>
                    ";
                    break;
            }


        }


        unset($_SESSION['mail']);

    }


	if ($dnr->rowCount()) {
		$dnr = $dnr->fetch();
		$agentInfo = $mysql->query("SELECT characters.charName FROM characters WHERE characters.characterID = ".$dnr['actedBy']);
		$agentInfo = $agentInfo->fetch();
		
?>
	<div class="alertBox_info">
		<p>This character has been marked for DNR/suspension by: <?=$agentInfo['charName']?></p>
		<p>Reason: <?=$dnr['reason']?></p>
		<p>At: <?=$dnr['actedOn']?></p>
	</div>
	
	
<? } 

	if ($queuetype['queueType'] == 'AFK'){
		$waitingApp = $mysql->query("SELECT * FROM joinApps WHERE submitted = 1 AND accepted = 0 AND characterID = $characterID");
		if ($waitingApp->rowCount()) {$waitingApp = $waitingApp->fetch();}
?>
	<div class="alertBox_info">
		<p>This character was sent to the AFK Queue at:</p>
		<p><?=$waitingApp['AFKtime']?></p>
	</div>

<?}?>

<? if ($_GET['update'] != 0) { ?>
	<div class="alertBox_success">
		Character succesfully modified.
	</div>
<? } elseif ($_GET['noteEdited'] == 1) { ?>
	<div class="alertBox_success">
		Note edited.
	</div>
<? } elseif ($_GET['logEdited'] == 1) { ?>
	<div class="alertBox_success">
		Log edited.
	</div>
<? } elseif ($_GET['noteDeleted'] == 1) { ?>
	<div class="alertBox_success">
		Note deleted.
	</div>
<? } elseif ($_GET['logDeleted'] == 1) { ?>
	<div class="alertBox_success">
		Log deleted.
	</div>
<? } elseif ($_GET['apiDeleted'] == 1) { ?>
	<div class="alertBox_success">
		API deleted.
	</div>
<? } elseif (isset($_GET['apiDiff'])) {
	$apiDiff = 3600 - intval($_GET['apiDiff']);
	$apiTime = array(floor($apiDiff / 60),$apiDiff % 60);
?>
	<div class="alertBox_success">
		<form id="pullAPIForm" method="post" action="<?=SITEROOT?>/admin/process/api.php">
			<input type="hidden" name="characterID" value="<?=$charInfo['characterID']?>">
			<input type="hidden" name="force" value="1">
			API pull too soon. Please wait another: <?=$apiTime[0]?> Minutes <?=$apiTime[1]?> Seconds <?if (in_array('Assistant Recruitment Managers', $fGroups)) {?><button type="submit" name="submit" class="btn_text">Force Pull API</button><?}?>
		</form> 
	</div>
<? } elseif ($_GET['dnr'] == 1) { ?>
	<div class="alertBox_success">
		DNR applied.
	</div>
<? } elseif ($_GET['dnr'] == 2) { ?>
	<div class="alertBox_success">
		DNR removed.
	</div>
<? } elseif (isset($_GET['dnr']) && $_GET['dnr'] == 0) { ?>
	<div class="alertBox_error">
		DNR failed.
	</div>
<? } elseif ($_GET['APIError'] == 1) { ?>
	<div class="alertBox_error">
		API has been deleted or is no longer accessible.
	</div>
<? } elseif ($_GET['invalidMask'] == 1) { ?>
	<div class="alertBox_error">
		Invalid API mask.
	</div>
<? } elseif ($_GET['apiSuccess'] == 1) { ?>
	<div class="alertBox_success">
		API successfully saved.
	</div>
<? } elseif ($_GET['invalidMask'] == 1) { ?>
	<div class="alertBox_error">
		Invalid API Mask.
	</div>
<? } elseif ($_GET['charAPI'] == 1) { ?>
	<div class="alertBox_error">
		API set to Character only.
	</div>
<? } elseif ($_GET['expires'] == 1) { ?>
	<div class="alertBox_error">
		API set to expire.
	</div>
<? } 
$checkstandings = checkstandings($vCharacterID);
if ($checkstandings) { ?>
	<div class="alertBox_error">
		<p>Standings with jumpclone corporations below 8.0:</p>
		<?
		foreach ($checkstandings as $key => $value) {
			echo "<p>$key : $value</p>";
		}
		?>
	</div>
<? } ?>
<?
	$dnrInfo = $mysql->query("SELECT type FROM dnr WHERE characterID = $vCharacterID OR accountID = ".($apiInfo['userID']?$apiInfo['userID']:'NULL'));
	if ($dnrInfo->rowCount()) { foreach ($dnrInfo as $info) {
		echo "\t\n";
		echo "\t<div class=\"alertBox_".($info['type'] == 'Suspension'?'info':'error')."\">\n";
		if ($info['type'] == 'Suspension') echo "\t\tThis account has been suspended.\n";
		elseif ($info['type'] == 'DNR') echo "\t\tThis account has been DNRed.\n";
		elseif ($info['type'] == 'Departed') echo "\t\tThis account has been departed.\n";
		echo "\t</div>\n";
	} }
?>
	
	<h1><?=$charInfo['charName'].($inGame?' <a href="" onclick="CCPEVE.showInfo(1377, '.$vCharacterID.')">(Show Info)</a>':'')?></h1>
	
	<div id="linkSet" class="tr">
<? if (in_array('Personnel Officers', $fGroups)) { ?>
		<a href="http://forum.eveuniversity.org/search.php?keywords=<?=$charInfo['charName']?>&terms=all&author=&fid[]=145&sc=1&sf=all&sr=posts&sk=t&sd=d&st=0&ch=300&t=0&submit=Search" target="_blank">PO Forums</a>
<? } ?>
<? if (in_array('Title Staff', $fGroups) || in_array('Assistant Recruitment Managers', $fGroups)) { ?>
		<a href="http://forum.eveuniversity.org/search.php?keywords=<?=$charInfo['charName']?>&terms=all&author=&fid[]=140&sc=1&sf=all&sr=posts&sk=t&sd=d&st=0&ch=300&t=0&submit=Search" target="_blank">Member Records</a>
<? } ?>
<? if (in_array('Title Staff', $fGroups)) { ?>
		<a href="http://wiki.eveuniversity.org/Special:Contributions/<?=strtolower($charInfo['charName'])?>" target="_blank">Wiki Contributions</a>
		<a href="http://tools.eveuniversity.org/title_lookup/?u=<?=str_replace(' ', '+', $charInfo['charName'])?>" target="_blank">Title Lookup</a>
<? } ?>
		<a href="http://forum.eveuniversity.org/search.php?keywords=&terms=all&author=<?=$charInfo['charName']?>&sc=1&sf=all&sr=posts&sk=t&sd=d&st=0&ch=300&t=0&submit=Search" target="_blank">E-UNI Forums</a>
		<a href="http://tools.eveuniversity.org/classlog/?u=<?=str_replace(' ', '+', $charInfo['charName'])?>" target="_blank">Class Log</a>
		<a href="http://www.eve-search.com/search/%22<?=$charInfo['charName']?>%22" target="_blank">Eve Search</a>
		<a href="http://www.eve-search.com/stats/<?=$charInfo['charName']?>" target="_blank">Eve Search Stats</a>
		<a href="http://killboard.eveuniversity.org/?a=search&searchtype=pilot&searchphrase=<?=$charInfo['charName']?>" target="_blank">E-UNI KB</a>
		<a href="http://eve.battleclinic.com/killboard/combat_record.php?type=player&name=<?=$charInfo['charName']?>" target="_blank">Battleclinic KB</a>
		<a href="http://zkillboard.com/character/<?=$charInfo['characterID']?>" target="_blank">zKillboard</a>
		<a href="http://www.google.com/search?q=%22<?=$charInfo['charName']?>%22 %22EVE Online%22" target="_blank">Google</a>
<? if (in_array('Personnel Officers', $fGroups)) { ?>
		<a href="http://eveuniapp.appspot.com/api?userID=<?=$apiInfo['userID']?>&apikey=<?=$apiInfo['apiKey']?>&submit=1#tab-2" target="_blank">Old Tool Lookup</a>
<? } ?>
	</div>
	
	<hr>
	
	<h2>Alts On Account</h2>
<?
	$curAlts = array();
	$oldAlts = array();
	if ($charInfo['accountID'] != 0) {
		$altInfos = $mysql->query("SELECT characterID, charName, firstPull, latestPull FROM characters WHERE accountID = {$charInfo['accountID']} AND characterID != $vCharacterID ORDER BY latestPull DESC, charName");
		if ($altInfos->rowCount()) {
			$altInfo = $altInfos->fetch();
			$latestPull = $altInfo['latestPull'];
			do {
				if ($altInfo['latestPull'] == $latestPull) $curAlts[] = '<a href="?characterID='.$altInfo['characterID']."\">{$altInfo['charName']}</a>";
				else $oldAlts[$altInfo['charName']] = '<a href="?characterID='.$altInfo['characterID']."\">{$altInfo['charName']}</a>";
			} while ($altInfo = $altInfos->fetch());
			ksort($oldAlts);
		}
	}
?>
	<p><span class="bold">Current Alts:</span> <?=sizeof($curAlts)?implode(', ', $curAlts):'None'?></p>
	<p><span class="bold">Old Alts:</span> <?=sizeof($oldAlts)?implode(', ', $oldAlts):'None'?></p>
	
	<hr>
	

<?
	if ($charInfo['accountID'] != 0) {
		?><h2>Linked Accounts</h2><?
		$linkinfo = $mysql->query("SELECT linkedTo FROM linkedAccounts where accountID = {$charInfo['accountID']}");
		if ($linkinfo->rowcount()) {
			foreach ($linkinfo as $key => $accountrow) {
				$acccharinfo = $mysql->query("SELECT characterID,charName FROM characters where accountID = {$accountrow['linkedTo']}");
				$charhead = "<p><span class=\"bold\">Linked account ".convert_number_to_words($key + 1).": </span>";
				$charcur = array();
				foreach ($acccharinfo as $key2 => $charrow) {
					$charcur[] = "<a href=\"?characterID={$charrow['characterID']}\">{$charrow['charName']}</a>";
					
				}
				echo sizeof($charcur)?$charhead.implode(', ', $charcur):'None';?></p><?
			}
		}
		echo "<button id=\"linkaccount\" class=\"btn_text\">Link Account</button> ";
		echo sizeof($acccharinfo)?"<button id=\"unlinkaccount\" class=\"btn_text\">Unlink This Account</button>":"";
		echo "<hr>";

	}
?>

	
<?
	$activeApps = $mysql->query("SELECT joinAppDetails.*, joinQueue.inInterview FROM joinApps LEFT JOIN joinAppDetails USING (appID) LEFT JOIN joinQueue USING (characterID) WHERE joinApps.characterID = $vCharacterID AND joinApps.accepted = 0 ORDER BY joinAppDetails.detailsID DESC");
	$activeApps = $activeApps->fetchAll();
	$appInfo = $activeApps[0];
?>
	<h2>API Info</h2>
	
	<div id="apiControls">
<?		if (($charInfo['userID'] != 0 || $charInfo['keyID'] != 0) && strlen($charInfo['vCode']) != 0) { ?>
		<form id="pullAPIForm" method="post" action="<?=SITEROOT?>/admin/process/api.php">
			<input type="hidden" name="characterID" value="<?=$charInfo['characterID']?>">
			<button type="submit" name="submit" class="btn_text">Pull API</button>
		</form>
<?
		}
?>
		<button id="modAPI" class="btn_text">Mod API Details</button>
<?		if (in_array('Managers', $fGroups) || in_array('Assistant Recruitment Managers', $fGroups)) { ?>
			<button id="delAPI" class="btn_text">Delete API</button>
<?		
		}
?>
		
		<div class="floatRight"><button id="accountAPIs" class="btn_text">Account APIs</button></div>
	</div>
	
<?	
		if ($apiPulls->rowCount()) { foreach ($apiPulls as $apiPull) {
			echo "	<div class=\"apiPull\">\n";
			echo "		<h3 class=\"pulledBy\">\n";
			echo "			<span class=\"bold\">Pulled by:</span> {$apiPull['charName']}, {$apiPull['pullDate']}\n";
			echo "			<a href=\"standings.php?standingID={$apiPull['standingID']}\">Standings</a>\n";
			echo "		</h3>\n";
			echo "		<div class=\"apiInfo\">\n";
			echo "			<p class=\"dob\"><span class=\"bold\">Created on:</span> ".$apiPull['DoB']."</p>\n";
			echo "			<p class=\"curCorp\"><span class=\"bold\">Current corporation:</span> ".$apiPull['corpName']."</p>\n";
			$totalSP = 0;
			echo "			<p class=\"totalSP\"><span class=\"bold\">Current SP:</span> ".number_format($apiPull['totalSP'])."</p>\n";
			echo "			<p class=\"curBalance\"><span class=\"bold\">Current balance:</span> ".number_format(intval($apiPull['balance']), 2)."</p>\n";
			$implants = array();
			foreach (array('Cha' => 'charismaBonus', 'Int' => 'intelligenceBonus', 'Per' => 'perceptionBonus', 'Will' => 'willpowerBonus', 'Mem' => 'memoryBonus') as $short => $stat) if ($apiPull[$stat] > 0) $implants[] = "$short +".$apiPull[$stat];
			echo "			<p class=\"implants\"><span class=\"bold\">Implants:</span> ".implode(', ', $implants)."</p>\n";
			echo "		</div>\n";
			echo "	</div>\n";
		} } else echo "	<div id=\"noAPI\">No API Pulls</div>\n";
?>
	
	<hr>
	
<?
//	}
	if (in_array('Personnel Officers', $fGroups)) {


        ?><h2>IP Tracking</h2><?

        $result = $fmysql->prepare("SELECT phpbb_log.log_time, phpbb_log.user_id , phpbb_users.username, phpbb_users.user_id, phpbb_log.log_ip  FROM phpbb_log, phpbb_users where phpbb_users.user_id = phpbb_log.user_id AND phpbb_users.username = ? AND phpbb_log.log_operation = \"LOG_USER_IP\" order by log_time desc");
        $result->execute(array($charInfo['charName']));
        $string = "";
        if ($result->rowCount()){
            $result = $result->fetchAll();
            foreach ($result as $temp){
                $string .= "\"".$temp["log_ip"]."\",";
            }
            $string = substr($string,0,-1);
        }
        $ipsearch = $fmysql->prepare("select * from (SELECT phpbb_log.log_time, phpbb_users.username, phpbb_log.log_ip  FROM phpbb_log, phpbb_users where phpbb_users.user_id = phpbb_log.user_id AND phpbb_log.log_operation = \"LOG_USER_IP\" AND phpbb_log.log_ip IN (".$string.") order by log_time desc) x group by username order by log_time asc");
        $ipsearch->execute();
        $characterlist = array();
        if ($ipsearch->rowCount()) {
            $ipsearch = $ipsearch->fetchAll();
            $ipsearch = array_reverse($ipsearch);
            foreach ($ipsearch as $temp){
                if ($temp["username"] != "Anonymous"){
                    $characterlist[$temp["username"]] = array($temp["log_time"],$temp["log_ip"]);
                }

            }
            ?>
            <div id="ipTableHeader">
                <div class="tr headers clearfix">
                    <div class="charName">Character</div>
                    <div class="time">Time Of Last IP Use</div>
                </div>
            </div>
            <div id="ipTable">
            <?
            $sixmonths = (time() - 15778000);
            foreach ($characterlist as $character => $timeIpData){
                if (intval($timeIpData[0])>$sixmonths){
                    ?>
                        <div class="tr clearfix">
                            <div class="charName"><?=printReady($character)?></div>
                            <div class="time"><?=gmdate('M j, Y g:i A', $timeIpData[0])?></div>
                        </div>
                    <?
                } else {
                    ?>
                    <div class="redboxed">
                        <div class="tr clearfix">
                            <div class="charName"><?=printReady($character)?></div>
                            <div class="time"><?=gmdate('M j, Y g:i A', $timeIpData[0])?></div>
                            <div class="time">Longer Than Six Months Ago</div>
                        </div>
                    </div>
                    <?
                }
            }
            ?></div><?


        } else {
            echo "<h3>No other accounts have used this characters IP</h3>";
        }

        ?><hr><?




?>
	<h2>Join Applications</h2>
	
<?
		if ($appInfo !== NULL) {
			foreach ($appInfo as $key => $value) if (strlen($value) == 0) $appInfo[$key] = '&nbsp;';

			require './questionnaire/'.$appInfo['appVersion'].'.php';
			
			echo "<br>";
			
			if (sizeof($activeApps) > 1) {
				$count = sizeof($activeApps) - 1;
				echo "\t\t<h4>Resubmissions</h4>\n";
				foreach ($activeApps as $key => $info) if ($key != 0) echo "\t\t<p><a id=\"details_{$info['detailsID']}\" href=\"\" class=\"resubApp\">Version ".$count--.", Submitted on ".date('M j, Y H:i:s', strtotime($info['submittedOn']))."</a></p>\n";
			}

		}
		
		$oAppInfos = $mysql->query("SELECT joinApps.appID, characters.charName, joinAppActions.actedOn, joinApps.accepted FROM joinApps, joinAppActions, characters WHERE joinAppActions.actedBy = characters.characterID AND joinAppActions.appID = joinApps.appID AND (joinAppActions.action = 'accept' || joinAppActions.action = 'reject') AND joinApps.characterID = $vCharacterID AND joinApps.accepted != 0");
		foreach ($oAppInfos as $oAppInfo) {
?>
	<div class="joinApp">
		<h3 id="app_<?=$oAppInfo['appID']?>" class="actedOn"><?=$oAppInfo['accepted'] == 1?'Accepted':'Rejected'?> by: <?=$oAppInfo['charName']?> on <?=date('M j, Y H:i:s', strtotime($oAppInfo['actedOn']))?></h3>
	</div>
<?
		}
?>
	
	<hr>
	
<?
	}
	
	if (in_array('Title Staff', $fGroups)) {
?>
	<a name="titles"></a>
	<h2>Title Applications</h2>
	
<?
	$titleApps = $mysql->query("SELECT titleApps.*, GREATEST(titleApps.moveddate, titleApps.submitted) AS datesort, titles.interviewed FROM titleApps, titles WHERE titleApps.characterID = $vCharacterID AND titleApps.characterID = titles.characterID ORDER BY titleApps.submitted DESC");
	if ($titleApps->rowCount()) {
		$titleInterview = FALSE;
		$curApps = array();
		$oldApps = array();
		foreach ($titleApps as $info) {
			if ($info['approved'] == 0 && $info['title'] != 'interview') $curApps[] = $info;
			elseif ($info['title'] != 'interview') $oldApps[] = $info;
			elseif ($info['approved'] == 0) $titleInterview = $info;
		}
		
		$activeTitleApp = 0;
		foreach ($curApps as $app) {
			if ($app['submitted'] != $app['datesort']) {
				?>
				<div class="boxed"><h3>Application delayed to: <?=date('M j, Y H:i:s', strtotime($app['moveddate']))?></h3>
				<?
			}
			if ($app['processing'] == $adminID) $activeTitleApp = $app['appID'];
?>
	
	<div id="titleApp_<?=$app['appID']?>" class="titleApp"><form method="post" action="<?=SITEROOT?>/admin/process/titles.php">
		<input type="hidden" name="appID" value="<?=$app['appID']?>">
		<input type="hidden" name="characterID" value="<?=$vCharacterID?>">
		<h3>Application for: <?=ucwords($app['title'])?>, Submitted on <?=date('M j, Y H:i:s', strtotime($app['submitted']))?></h3>
		<div class="appInfo<?=$app['processing'] != $adminID?' hideDiv':''?>">
<?				if ($app['processing'] == 0) { ?>
			<div class="startProcessing"><button type="submit" name="process" class="btn_text">Process</button></div>
			
<?	} ?>
<?
			if ($inGame) echo "			".igLink('char', 'Character Info', $app['characterID'])."\n";
			$titleReqs = array(/*array('label' => 'Interviewed', 'col' => 'interviewed', 'button' => 'interview'), */array('label' => 'API Check', 'col' => 'apiCheck', 'button' => 'API'), array('label' => 'OOG Requirements', 'col' => 'oogCheck', 'button' => 'OOG'), array('label' => 'IG Requirements', 'col' => 'igCheck', 'button' => 'IG')
			);
?>
			<div class="tr">
				<label>Interviewed:</label>
				<div><?='<img src="'.SITEROOT.'/images/'.($app['interviewed'] == 1?'check':'cross').'.png">'?></div>
			</div>
<?
			foreach ($titleReqs as $titleReq) {
?>
			<div class="tr">
				<label><?=$titleReq['label']?>:</label>
				<div><? if ($app[$titleReq['col']] == 0) echo '&nbsp;'; else echo '<img src="'.SITEROOT.'/images/'.($app[$titleReq['col']] == 1?'check':'cross').'.png">'; ?></div>
<?				if ($app['processing'] == $adminID) { ?>
				<div class="buttons">
					<button type="submit" name="reject<?=$titleReq['button']?>" class="btn_text">Reject</button>
					<button type="submit" name="approve<?=$titleReq['button']?>" class="btn_text">Approve</button>
				</div>
<? 				} ?>
			</div>
<?			} ?>
			<div class="tr">
				<div>Additional Info:</div>
				<div><?=strlen($app['additionalInfo'])?printReady($app['additionalInfo']):'&nbsp;'?></div>
			</div>
		</div>
	</form></div>
<?

			if ($app['submitted'] != $app['datesort']) {
				?>
				</div>
				<?
			}
		}
		
		foreach ($oldApps as $app) {
?>
	<div id="titleApp_<?=$app['appID']?>" class="titleApp"><form method="post" action="<?=SITEROOT?>/admin/process/titles.php">
		<input type="hidden" name="appID" value="<?=$app['appID']?>">
		<input type="hidden" name="characterID" value="<?=$vCharacterID?>">
		<h3>Application for: <?=ucwords($app['title'])?>, <?=$app['approved'] == 1?'Approved':'Rejected'?> <? if ($app['submitted'] == '2000-01-01 00:00:00') echo '(Old System)'; else echo 'on '.date('M j, Y H:i:s', strtotime($app['completed'])); ?></h3>
		<div class="appInfo hideDiv">
<?				if (in_array('Directors', $fGroups) || in_array('Title Manager', $fGroups)) { ?>
			<div class="applyTitle"><button type="submit" name="undo" class="btn_text">Undo</button></div>
			
<?	} ?>

			<p>Submitted: <?=date('M j, Y H:i:s', strtotime($app['submitted']))?></p>
			<p>Completed: <?=date('M j, Y H:i:s', strtotime($app['completed']))?></p>
			<div class="tr">
				<div>Additional Info:</div>
				<div><?=strlen($app['additionalInfo'])?printReady($app['additionalInfo']):'&nbsp;'?></div>
			</div>
		</div>
	</form></div>
<?
		}
	} else echo "	<div id=\"noTitleApps\">No Title Apps</div>\n";
?>
	
	<hr>
	
<?
	}
?>
	<h2>Character Notes</h2>
	
<?
	$charNotes = $mysql->query("SELECT characters.charName, notes.* FROM notes, characters WHERE notes.authorID = characters.characterID AND notes.characterID = $vCharacterID ORDER BY postedOn ASC");
	if ($charNotes->rowCount()) { foreach ($charNotes as $noteInfo) {
		echo "	<div class=\"note\">\n";
		echo "		<h3 class=\"author\">\n";
		if (in_array('Managers', $fGroups) || in_array('Assistant Recruitment Managers', $fGroups)) {
			echo "			<a href=\"deleteNote.php?noteID={$noteInfo['noteID']}\" class=\"deleteNote\">Delete Note</a>\n";
			echo "			<a href=\"editNote.php?noteID={$noteInfo['noteID']}\" class=\"editNote\">Edit Note</a>\n";
		}
		echo "			".ucwords($noteInfo['type']).": {$noteInfo['charName']}, {$noteInfo['postedOn']}\n";
		echo "		</h3>\n";
		echo "		<p>".printReady($noteInfo['note'])."</p>\n";
		echo "	</div>\n";
	} } else echo "	<div id=\"noNotes\">No Notes</div>\n";
?>
	<form id="noteForm" method="post" action="<?=SITEROOT?>/admin/process/addNote.php">
		<input type="hidden" name="characterID" value="<?=$vCharacterID?>">
		<div class="tr"><select name="type">
			<option<?=in_array('Directors', $fGroups)?' selected="selected"':''?>>All</option>
<?
	if ($permissions['joinApps']) echo "			<option".(!in_array('Directors', $fGroups) && (in_array('Personnel Officers', $fGroups) || in_array('Assistant Recruitment Managers', $fGroups) || in_array('Student Relations Manager', $fGroups))?' selected="selected"':'').">Recruitment</option>\n";
	if ($permissions['titleApps']) echo "			<option".(!in_array('Directors', $fGroups) && (in_array('Title Staff', $fGroups) || in_array('Title Manager', $fGroups))?' selected="selected"':'').">Titles</option>\n";
?>
		</select></div>		
		<textarea name="note"></textarea>
		<div class="alignCenter"><button type="submit" name="post" class="btn_text">Post Note</button></div>
	</form>
	
	<hr>
	
	<h2>Logs</h2>
	
<?
	$logs = $mysql->query("SELECT characters.charName, logs.* FROM logs, characters WHERE logs.converserID = characters.characterID AND logs.converseeID = $vCharacterID");
	if ($logs->rowCount()) { foreach ($logs as $logInfo) {
		echo "	<div id=\"log_{$logInfo['logID']}\" class=\"tr log\">\n";
		echo "		<span><span class=\"bold\">{$logInfo['type']}:</span> {$logInfo['charName']}, {$logInfo['hadOn']}</span>\n";
		if (in_array('Managers', $fGroups) || in_array('Assistant Recruitment Managers', $fGroups)) echo "		<a href=\"".SITEROOT."/admin/editLog.php?logID={$logInfo['logID']}\" class=\"editLog\">[ Edit ]</a>   <a href=\"".SITEROOT."/admin/deleteLog.php?logID={$logInfo['logID']}\" class=\"deleteLog\">[ Delete ]</a>\n";
		echo "		<p>".printReady($logInfo['desc'])."</p>\n";
		echo "	</div>\n";
	} } else echo "	<div id=\"noLogs\">No Logs</div>\n";
?>
	<form id="logForm" method="post" action="<?=SITEROOT?>/admin/process/addLog.php">
		<input type="hidden" name="characterID" value="<?=$vCharacterID?>">
		<div class="tr">
			<select name="type">
				<option>Interview</option>
				<option>Other</option>
			</select>
			<label class="textLabel">Description:</label>
			<input type="text" name="desc" maxlength="100">
		</div>
		<textarea name="log"></textarea>
		<div class="alignCenter"><button type="submit" name="post" class="btn_text">Post Log</button></div>
	</form>
	
<? if (in_array('Directors', $fGroups) || in_array('Assistant Recruitment Managers', $fGroups)) { ?>
	<hr>
	
	<h2>DNR</h2>
	<form id="dnrForm" method="post" action="<?=SITEROOT?>/admin/process/dnr.php">
		<input type="hidden" name="userID" value="<?=$vUserID?>">
		<input type="hidden" name="characterID" value="<?=$charInfo['characterID']?>">
		<input type="hidden" name="accountID" value="<?=$charInfo['accountID']?>">
		<div class="tr">
			<label>Type: </label>
			<select name="type">
				<option>Suspension</option>
				<option>DNR</option>
				<option>Departed</option>
			</select>
		</div>
		<div class="tr">
			<label>Reason:</label>
			<input type="text" name="reason">
			<button type="submit" name="DNR" class="btn_text">DNR</button>
			<button type="submit" name="REMOVEDNR" class="btn_text">Remove DNR</button>
		</div>
	</form>
	
<? } ?>
	
	<div id="actionMenu"><div>
<? 	$queuetypesql = $mysql->query("SELECT joinQueue.queueType FROM joinQueue WHERE joinQueue.characterID = $vCharacterID");
	$queuetype = $queuetypesql->fetch();
	$allowed = TRUE;
	if ($queuetype['queueType'] == 'SPO' && !in_array('Senior Personnel Officers', $fGroups))
	{
		$allowed = FALSE;
	} 


	if ($appInfo !== NULL && ($appInfo['inInterview'] == 0 || $appInfo['inInterview'] == $adminID || in_array('Directors', $fGroups) || in_array('Assistant Recruitment Managers', $fGroups))) { ?>
		<form id="pbuttons" method="post" action="<?=SITEROOT?>/admin/process/modUser.php">
			<input type="hidden" name="characterID" value="<?=$vCharacterID?>">
			<input type="hidden" name="appID" value="<?=$appInfo['appID']?>">
			<input type="hidden" name="characterName" value="<?=$charInfo['charName']?>">
<?
		if ($allowed == FALSE)
		{
?>		
		<div class="alertBox_info">Only Senior Personnel Officers can complete this application</div>
		</form>
<?
		} elseif ($queuetype['queueType'] == 'AFK'){
?>			<button type="submit" name="rmafk" class="btn_text">Remove AFK</button> <?
		} elseif ($appInfo['inInterview'] == 0) {
			echo "			<button type=\"submit\" name=\"start\" class=\"btn_text\">Start Interview</button>\n</form>";
		} elseif ($appInfo['inInterview'] == $adminID) {
?>
			<button type="submit" name="accept" class="btn_text">Accept</button>
			<button type="submit" name="reject" class="btn_text">Reject</button>
			<button type="submit" name="pending" class="btn_text">Pending</button>
			<button type="submit" name="afk" class="btn_text">AFK</button>
			</form>
			<button class="btn_text" id="sti">Send to Interview</button>
			<button class="btn_text" id="resub">Resub</button>
<?
		} elseif (in_array('Directors', $fGroups) || in_array('Assistant Recruitment Managers', $fGroups)) {
?>			
			<button type="submit" name="pending" class="btn_text">Unlock Applicant</button>
			</form>
<?
		}

	 } elseif ($activeTitleApp != 0) { ?>
		<form method="post" action="<?=SITEROOT?>/admin/process/titles.php">
			<input type="hidden" name="appID" id="appID" value="<?=$activeTitleApp?>">
			<input type="hidden" name="characterID" value="<?=$vCharacterID?>">
			<button type="submit" name="approve" class="approve">Approve</button>
			<button type="submit" name="defer" class="defer">Defer</button>
			<button type="button" id="delay" name="delay" class="delay">Delay</button>
			<button type="submit" name="deny" class="deny">Deny</button>
		</form>
<?
	}
?>
	</div></div>
<? require_once(FILEROOT.'/footer.php'); ?>