/**
* markdown - Script that will transform your notes taken in the Markdown format (.md files) into a rich website
* @version   : 1.0.4
* @author    : christophe@aesecure.com
* @license   : MIT
* @url       : https://github.com/cavo789/markdown#readme
* @package   : 2017-02-04T11:36:02.728Z
*/
function ajaxify($params){var $data={};$data.task="undefined"===$params.task?"":$params.task,$data.param="undefined"===$params.param?"":$params.param;var $target="#"+("undefined"===$params.target?"TDM":$params.target);$.ajax({beforeSend:function(){$($target).html('<div><span class="ajax_loading">&nbsp;</span><span style="font-style:italic;font-size:1.5em;">'+markdown.message.pleasewait+"</span></div>")},async:!0,cache:!1,type:markdown.settings.debug?"GET":"POST",url:markdown.url,data:$data,datatype:"html",success:function(data){$($target).html(data);var $callback=void 0===$params.callback?"":$params.callback;""!==$callback&&eval($callback)}})}function addSearchEntry(e){if($bReset="undefined"!==e.reset&&e.reset,$current=$("#search").val().trim(),""!==$current&&$bReset===!1){var t=$current.split(",");t.push(e.keyword),$("#search").val(t.join(","))}else $("#search").val(e.keyword);return!0}function initFiles(e){var t="";if("undefined"==typeof e)return t=markdown.message.json_error,Noty({message:t.replace("%s","listFiles"),type:"error"}),!1;try{e.hasOwnProperty("count")&&(t=markdown.message.filesfound,Noty({message:t.replace("%s",e.count),type:"notification"}))}catch(e){console.warn(e.message),markdown.settings.debug&&Noty({message:e.message,type:"error"})}try{if($.isFunction($.fn.jstree))$("#TOC").on("changed.jstree",function(e,t){$("#IMG_BACKGROUND").length&&$("#IMG_BACKGROUND").remove();var a=t.instance.get_node(t.selected);if("undefined"!=typeof a.parent){markdown.settings.debug&&console.log("Tree - Selected item : "+a.parent+a.text);var n=window.btoa(encodeURIComponent(JSON.stringify(a.data.file)));ajaxify({task:a.data.task,param:n,callback:"afterDisplay($data.param)",target:"CONTENT"})}}).on("keydown.jstree",".jstree-anchor",function(e){var t=$("#TOC").jstree(!0).get_node(e.currentTarget);console.log("changed.jstree - "+t.data.file)}).jstree({core:{animation:1,data:e.tree,initially_open:["phtml_1"],sort:function(e,t){return this.get_type(e)===this.get_type(t)?this.get_text(e)>this.get_text(t)?1:-1:this.get_type(e)>=this.get_type(t)?1:-1},themes:{responsive:1,variant:"small",stripes:1},types:{default:{icon:"folder"},file:{icon:"file file-md"},folder:{icon:"folder"}},plugins:["state","dnd","sort","types","unique","wholerow"]}});else if(e.hasOwnProperty("results")){var a=document.createElement("table");a.id="tblFiles",a.setAttribute("class","table table-hover table-bordered"),a.style.width="100%";var n=document.createElement("tbody");$.each(e.results,function(e,t){var a=document.createElement("tr"),s=document.createElement("td");s.dataset.folder=t.folder,s.appendChild(document.createTextNode(t.folder)),a.appendChild(s),s=document.createElement("td"),s.dataset.file=t.file,s.appendChild(document.createTextNode(t.display)),a.appendChild(s),n.appendChild(a)}),a.appendChild(n),$("#TOC").html(a),$("#tblFiles > tbody  > tr > td").click(function(e){if($(this).attr("data-file")){$("#IMG_BACKGROUND").length&&$("#IMG_BACKGROUND").remove();var t=window.btoa(encodeURIComponent(JSON.stringify($(this).data("file"))));markdown.settings.debug&&console.log("Show note "+$(this).data("file")),ajaxify({task:"display",param:t,callback:"afterDisplay($data.param)",target:"CONTENT"}),$(this).addClass("selected")}if($(this).attr("data-folder")){var a=$(this).data("folder").replace("\\","/");markdown.settings.debug&&console.log("Apply filter for "+a),addSearchEntry({keyword:a})}})}}catch(e){console.warn(e.message),markdown.settings.debug&&Noty({message:e.message,type:"error"})}$.isFunction($.fn.flexdatalist)&&($(".flexdatalist").flexdatalist({toggleSelected:!0,minLength:2,valueProperty:"id",selectionRequired:!1,visibleProperties:["name","type"],searchIn:"name",data:"index.php?task=tags",focusFirstResult:!0,noResultsText:markdown.message.search_no_result}),""!==markdown.settings.auto_tags&&addSearchEntry({keyword:markdown.settings.auto_tags})),$("#search").css("width",$("#TDM").width()-5),$(".flexdatalist-multiple").css("width",$(".flexdatalist-multiple").parent().width()-10).show();try{$("#search-flexdatalist").focus()}catch(e){console.warn(e.message)}try{"undefined"!=typeof custominiFiles&&$.isFunction(custominiFiles)&&custominiFiles()}catch(e){console.warn(e.message),markdown.settings.debug&&Noty({message:e.message,type:"error"})}return!0}function initializeTasks(){if($.isFunction($.fn.printPreview))try{$('[data-task="printer"]').printPreview()}catch(e){console.warn(e.message)}return $("[data-task]").click(function(){$("#IMG_BACKGROUND").length&&$("#IMG_BACKGROUND").remove();var e=$(this).data("task"),t=$(this).attr("data-file")?$(this).data("file"):"",a=$(this).attr("data-tag")?$(this).data("tag").replace("\\","/"):"";switch(""!==t&&"window"!==e&&(t=window.btoa(encodeURIComponent(JSON.stringify(t)))),e){case"clipboard":if(markdown.settings.debug&&console.log("Clipboard -> copy the link of the current note in the clipboard"),"function"==typeof Clipboard){var n=new Clipboard('*[data-task="clipboard"]');n.on("success",function(e){e.clearSelection()}),Noty({message:markdown.message.copy_clipboard_done,type:"success"})}else $(this).remove();break;case"display":markdown.settings.debug&&console.log("Display -> show note ["+t+"]"),ajaxify({task:e,param:t,callback:"afterDisplay($data.param)",target:"CONTENT"});break;case"edit":markdown.settings.debug&&console.log("Edit -> show the editor and the source markdown file)"),ajaxify({task:e,param:t,callback:"afterEdit($data.param)",target:"CONTENT"});break;case"fullscreen":toggleFullScreen();break;case"link_note":markdown.settings.debug&&console.log("Clipboard -> copy the link of the current note in the clipboard"),"function"==typeof Clipboard?(new Clipboard('*[data-task="link_note"]'),Noty({message:markdown.message.copy_link_done,type:"success"})):$(this).remove();break;case"pdf":var s=$(this).data("file");$filePDF=s.substr(0,s.lastIndexOf("."))+".pdf",markdown.settings.debug&&console.log("Print -> start the print preview plugin"),console.info("Use jsPDF for the PDF exportation"),console.info("Note : this script is not really efficient.  Seems to only work if text; don't work anymore with images");var o={};o.task="display",o.param=t,$.ajax({async:!0,cache:!1,type:markdown.settings.debug?"GET":"POST",url:markdown.url,data:o,datatype:"html",success:function(e){try{var t=new jsPDF,a={"#editor":function(e,t){return!0}};t.fromHTML(e,15,15,{width:170,elementHandlers:a}),t.save($filePDF)}catch(e){console.warn(e.message)}}});break;case"printer":break;case"slideshow":slideshow(t);break;case"tag":markdown.settings.debug&&console.log("Tag -> filter on ["+a+"]"),addSearchEntry({keyword:a,reset:!0});break;case"window":window.open(t);break;default:console.warn("Sorry, unknown task ["+e+"]")}}),!0}function replaceLinksToOtherNotes(){try{markdown.settings.debug&&console.log("Replace internal links to notes");for(var e=$("#CONTENT").html(),t=location.protocol+"//"+location.host+location.pathname,a=new RegExp("<a href=['|\"]"+RegExp.quote(t)+"?.*>(.*)</a>","i"),n=a.exec(e),s=[],o="";null!==n;)s=n[0].match(/param=(.*)['|"]/),o=JSON.parse(decodeURIComponent(window.atob(s[1]))),$sNodes='<span class="note" title="'+markdown.message.display_that_note+'" data-task="display" data-file="'+o+'">'+n[1]+"</span>",e=e.replace(n[0],$sNodes),n=a.exec(e);$("#CONTENT").html(e)}catch(e){console.warn(e.message)}}function addLinksToTags(){var e=$("#CONTENT").html();try{var t=new RegExp("( |,|;|\\.|\\n|\\r|\\t)*"+markdown.settings.prefix_tag+"([(\\&amp;)\\.a-zA-Z0-9\\_\\-]+)( |,|;|\\.|\\n|\\r|\\t)*","i");markdown.settings.debug&&console.log("RegEx for finding tags : "+t);for(var a=t.exec(e);null!==a;)markdown.settings.debug&&console.log("Process tag "+a[0]),$sTags=(void 0!==a[1]?a[1]:"")+'<span class="tag" title="'+markdown.message.apply_filter_tag+'" data-task="tag" data-tag="'+a[2]+'">'+a[2]+"</span>"+(void 0!==a[3]?a[3]:""),e=e.replace(new RegExp(a[0],"g"),$sTags),a=t.exec(e);$("#CONTENT").html(e)}catch(e){console.warn(e.message)}}function forceNewWindow(){var e=location.protocol+"//"+location.host;return $('a[href^="http:"], a[href^="https:"]').not('[href^="'+e+'/"]').attr("target","_blank"),!0}function addIcons(){try{$("a").each(function(){$href=$(this).attr("href"),$sAnchor=$(this).text(),/\.doc[x]?$/i.test($href)?($sAnchor+='<i class="icon_file fa fa-file-word-o" aria-hidden="true"></i>',$(this).html($sAnchor).addClass("download")):/\.(log|md|markdown|txt)$/i.test($href)?($sAnchor+='<i class="icon_file fa fa-file-text-o" aria-hidden="true"></i>',$(this).html($sAnchor).addClass("download-link").attr("target","_blank")):/\.pdf$/i.test($href)?($sAnchor+='<i class="icon_file fa fa-file-pdf-o" aria-hidden="true"></i>',$(this).html($sAnchor).addClass("download-link").attr("target","_blank")):/\.ppt[x]?$/i.test($href)?($sAnchor+='<i class="icon_file fa fa-file-powerpoint-o" aria-hidden="true"></i>',$(this).html($sAnchor).addClass("download-link")):/\.xls[m|x]?$/i.test($href)?($sAnchor+='<i class="icon_file fa fa-file-excel-o" aria-hidden="true"></i>',$(this).html($sAnchor).addClass("download-link")):/\.(7z|gzip|tar|zip)$/i.test($href)&&($sAnchor+='<i class="icon_file fa fa-file-archive-o" aria-hidden="true"></i>',$(this).html($sAnchor).addClass("download-link"))})}catch(e){console.warn(e.message)}return!0}function NiceTable(){try{$("table").each(function(){$(this).addClass("table table-striped table-hover table-bordered"),$.isFunction($.fn.DataTable)&&($(this).addClass("display"),$(this).DataTable({scrollY:"50vh",scrollCollapse:!0,info:!0,lengthMenu:[[10,25,50,-1],[10,25,50,"All"]],language:{decimal:".",thousands:",",url:"libs/DataTables/"+markdown.settings.language+".json"}}))})}catch(e){console.warn(e.message)}return!0}function afterDisplay(e){try{"function"!=typeof Clipboard&&$('[data-task="clipboard"]').remove(),$.isFunction($.fn.printPreview)||$('[data-task="printer"]').remove(),$.isFunction($.fn.linkify)&&(markdown.settings.debug&&console.log("linkify plain text"),$("page").linkify()),"object"==typeof Prism&&Prism.highlightAll(),replaceLinksToOtherNotes(),addLinksToTags(),forceNewWindow(),addIcons(),NiceTable(),initializeTasks();var t=$("#CONTENT h1").text();""!==t&&$("title").text(t),e=$("div.filename").text(),""!==e&&$("#footer").html('<strong style="text-transform:uppercase;">'+e+"</strong>");try{$("#search").focus();var a=$("#search").val().substr(0,markdown.settings.search_max_width).trim();""!==a&&$.isFunction($.fn.highlight)&&$("#CONTENT").highlight(a)}catch(e){markdown.settings.debug&&console.warn(e.message)}"undefined"!=typeof customafterDisplay&&$.isFunction(customafterDisplay)&&customafterDisplay(e)}catch(e){console.warn(e.message)}return $("#CONTENT").fadeOut(1).fadeIn(3),!0}function afterEdit(e){var t=new SimpleMDE({autoDownloadFontAwesome:!1,autofocus:!0,element:document.getElementById("sourceMarkDown"),indentWithTabs:!1,codeSyntaxHighlighting:!1,toolbar:[{name:"Save",action:function(a){buttonSave(e,t.value())},className:"fa fa-floppy-o",title:markdown.message.button_save},{name:"Encrypt",action:function(e){buttonEncrypt(e)},className:"fa fa-user-secret",title:markdown.message.button_encrypt},"|",{name:"Exit",action:function(t){$("#sourceMarkDown").parent().hide(),ajaxify({task:"display",param:e,callback:"afterDisplay($data.param)",target:"CONTENT"})},className:"fa fa-sign-out",title:markdown.message.button_exit_edit_mode},"|","preview","side-by-side","fullscreen","|","bold","italic","strikethrough","|","heading","heading-smaller","heading-bigger","|","heading-1","heading-2","heading-3","|","code","quote","unordered-list","ordered-list","clean-block","|","link","image","table","horizontal-rule"]});return $(".editor-toolbar").addClass("fa-2x"),!0}function buttonSave(e,t){var a={};return a.task="save",a.param=e,a.markdown=window.btoa(encodeURIComponent(JSON.stringify(t))),$.ajax({async:!0,type:"POST",url:markdown.url,data:a,datatype:"json",success:function(e){Noty({message:e.status.message,type:1==e.status.success?"success":"error"})}}),!0}function buttonEncrypt(e){var t=e.codemirror,a="",n=t.getSelection(),s=n||"your_confidential_info";a="<encrypt>"+s+"</encrypt>",t.replaceSelection(a)}function onChangeSearch(){try{var e=$("#search").val().substr(0,markdown.settings.search_max_width).trim(),t=!0;"undefined"!=typeof customonChangeSearch&&$.isFunction(customonChangeSearch)&&(t=customonChangeSearch(e)),t===!0?(""!==e&&($msg=markdown.message.apply_filter,Noty({message:$msg.replace("%s",e),type:"notification"})),ajaxify({task:"search",param:window.btoa(encodeURIComponent(e)),callback:'afterSearch("'+e+'",data)'})):markdown.settings.debug&&console.log("cancel the search")}catch(e){console.warn(e.message)}return!0}function afterSearch(e,t){try{Object.keys(t).length>0?$.isFunction($.fn.jstree)?($files=t.files,$filename="",$("#TOC").jstree("open_all"),$.each($("#TOC").jstree("full").find("li"),function(e,t){$filename=$("#TOC").jstree(!0).get_path(t,markdown.settings.DS),$(t).hasClass("jstree-leaf")&&$(t).hide(),""!==$filename&&$.each($files,function(e,a){if(a===$filename+".md")return $(t).hasClass("jstree-leaf")&&($(t).addClass("highlight").show(),$("#TOC").jstree("select_node",t)),!1})}),$.each($("#TOC").jstree("full").find("li"),function(e,t){$(t).hasClass("highlight")||$("#TOC").jstree("close_node",t)}),$.each($("#TOC").jstree("full").find("li"),function(e,t){$(t).hasClass("highlight")&&$("#TOC").jstree("open_node",t,function(e,t){for(var a=0;a<e.parents.length;a++)$("#TOC").jstree("open_node",e.parents[a])})})):$("#tblFiles > tbody  > tr > td").each(function(){$(this).attr("data-file")&&($filename=$(this).data("file"),$tr=$(this).parent(),$tr.hide(),$.each(t,function(){$.each(this,function(e,t){if(t===$filename)return $tr.show(),!1})}))}):""!==e?noty({message:markdown.message.search_no_result,type:"success"}):$.isFunction($.fn.jstree)?($.each($("#TOC").jstree("full").find("li"),function(e,t){$(t).removeClass("highlight").show()}),$("#TOC").jstree("open_all")):$("#tblFiles > tbody  > tr > td").each(function(){$(this).attr("data-file")&&$(this).parent().show()});try{"undefined"!=typeof customafterSearch&&$.isFunction(customafterSearch)&&customafterSearch(e,t)}catch(e){console.warn(e.message)}}catch(e){console.warn(e.message)}}function slideshow(e){try{var t={};t.task="slideshow",t.param=e,$.ajax({async:!0,type:markdown.settings.debug?"GET":"POST",url:markdown.url,data:t,datatype:"json",success:function(e){var t=window.open(e,"slideshow");void 0===t&&Noty({message:markdown.message.allow_popup_please,type:"notification"})}})}catch(e){console.warn(e.message)}return!0}function Noty(e){if($.isFunction($.fn.noty)){if(""===e.message)return!1;$type="undefined"===e.type?"info":e.type;noty({text:e.message,theme:"relax",timeout:2400,layout:"bottomRight",type:$type})}}function isFullScreen(){return document.fullScreenElement&&null!==document.fullScreenElement||document.mozFullScreen||document.webkitIsFullScreen}function requestFullScreen(e){e.requestFullscreen?e.requestFullscreen():e.msRequestFullscreen?e.msRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen()}function exitFullScreen(){document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()}function toggleFullScreen(e){return $("#TDM").toggleClass("hidden"),$("#CONTENT").parent().toggleClass("fullwidth"),$("#icons").children("i").each(function(){"icon_fullscreen"!==this.id&&"icon_refresh"!==this.id&&"icon_edit"!==this.id&&$(this).toggleClass("hidden")}),isFullScreen()?($("#CONTENT").css("max-height",$(window).height()-10),$("#CONTENT").css("min-height",$(window).height()-10),exitFullScreen()):($("#CONTENT").css("max-height",screen.height),$("#CONTENT").css("min-height",screen.height),requestFullScreen(e||document.documentElement)),!0}var QueryString=function(){for(var e={},t=window.location.search.substring(1),a=t.split("&"),n=0;n<a.length;n++){var s=a[n].split("=");if("undefined"==typeof e[s[0]])e[s[0]]=decodeURIComponent(s[1]);else if("string"==typeof e[s[0]]){var o=[e[s[0]],decodeURIComponent(s[1])];e[s[0]]=o}else e[s[0]].push(decodeURIComponent(s[1]))}return e}();Array.prototype.contains=function(e){for(var t=0;t<this.length;t++)if(this[t]===e)return!0;return!1},Array.prototype.unique=function(){for(var e=[],t=0;t<this.length;t++)e.contains(this[t])||e.push(this[t]);return e},RegExp.quote=function(e){return(e+"").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")},$(document).ready(function(){ajaxify({task:"listFiles",callback:"initFiles(data)"}),$("#TDM").css("max-height",$(window).height()-30),$("#TDM").css("min-height",$(window).height()-30),$("#CONTENT").css("max-height",$(window).height()-10),$("#CONTENT").css("min-height",$(window).height()-10),$("#search").change(function(e){onChangeSearch()})});