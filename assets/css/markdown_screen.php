<?php

   header('Content-type: text/css');
   
   $imgMaxWidth=filter_input(INPUT_GET, 'imgMaxWidth', FILTER_SANITIZE_NUMBER_INT);   
   if ($imgMaxWidth != 0) echo '#CONTENT img {max-width:'.$imgMaxWidth.'px;}';
   
?>

body {overflow:hidden;}

/* Style for the scrollbars */
::-webkit-scrollbar {width:15px;}
::-webkit-scrollbar-track {-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);border-radius:10px;}
::-webkit-scrollbar-thumb {border-radius:10px;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.5);}

.error {padding:10px;margin:10px;border:1px solid red;}

/* By selecting a file from the filelist, highlight its name */
#tblFiles > tbody > tr:nth-child(odd) .selected{background-color:#90b6e2;color:white;}
#tblFiles  > tbody > tr:nth-child(even) .selected{background-color:#90b6e2;color:white;}

/* Style for the formatting of the name of the file, displayed in the content, first line */
.filename{font-style:italic;font-weight:bold;color:#dfdfe0;top:15px;position:inherit;} 

/* Default page background color */
body{background:#F7F2E9;}

/* The root folder name */
.rootfolder{display:none;}

/* The search area.  The width will be initialized by javascript */
#search{position:fixed !important;left:5px;top:5px;z-index: 1;}
#TDM .flexdatalist-multiple {position:fixed;z-index:1;display:none;border-width:1px !important;}

/* Formating of the array with the list of files */
/* The search area.  The width will be initialized by javascript */
#tblFiles{font-size:0.8em;color:#445c7b;background-color:#f5f5f5;}
#tblFiles>thead>tr{font-size:1.2em;color:#445c7b;background-color:#c7c0c0;}
/*#tblFiles>thead>tr.tablesorter-filter-row{background-color:red;color:white;}*/

/* The icons area is used f.i. for displaying a lock icon when the note contains encrypted data */
#icons {display:inline-block;position:absolute;top:5px;right:-1px;margin-right:10px;cursor:pointer;}
#icon_edit{margin-left:20px;color:lightgray;}
#icon_lock{margin-left:2px;color:#abe0ab;}
#icon_slideshow{margin-left:20px;color:lightgray;}
#icon_printer{color:lightgray;}
#icon_clipboard{margin-left:20px;color:lightgray;}
#icon_window{margin-left:20px;color:lightgray;}

.icon_file{padding-left:5px;}
.icon_encrypted{padding-left:5px;padding-right:5px;color:#abe0ab;}

/* Content if the full page : contains the list of files and the content of the select note */

#CONTENT{margin-left:10px;top:5px !important;max-height:960px;overflow-y:auto;overflow-x:auto;width:100%;left:-15px;}

/* Background image displayed on the first screen */
#IMG_BACKGROUND{width:100%;;vertical-align:middle;top:5px;left:-5px;position:relative;}

/* TDM if the left part, i.e. the container of the search area and TOC (the list of files) */
#TDM{left:5px; top:5px !important;max-height:960px;overflow-y:auto;overflow-x:auto;}
#TOC{position:inherit;top:35px;}
#TOC .folder {background:url('../../libs/jsTree/file_sprite.png') right bottom no-repeat;}
#TOC .file {background:url('../../libs/jsTree/file_sprite.png') 0 0 no-repeat;}
#TOC .file-text, #TOC .file-txt, #TOC .file-md, #TOC .file-log, #TOC .file-htaccess {background-position: -254px -18px;}

/* page is used to display the content of the selected note */
page{background:white;display:none;margin:0 auto;margin-bottom:0.5cm;box-shadow:0 0 0.5cm rgba(0,0,0,0.5);}

/* Don't display informations that are targeted for printers only */            
.onlyprint{display:none;}

.countfiles{font-size:xx-small;font-style:italic;}

/* Use by the jQuery highlight plugin, highlight searched keywords */
.highlight{background-color:yellow !important;border-radius:.125em;}  

/* ---------------------------------------------------------- */
/* Classes added by javascript during the display of the note */

/* "note" will allow to stylize links to other notes within the local website */
.note{border-bottom: 1px dotted #000;}

/* "tag" added for tags */
.tag {border-bottom: 1px dotted #000;}

.download{background-color:rgba(255, 235, 59, 0.21);text-decoration:underline;}

		#tree .file { background:url('./file_sprite.png') 0 0 no-repeat; }