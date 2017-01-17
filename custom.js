/**
 * This file is optionnal.  If present, that .js file will be included in the markdown php script so that you can
 * intervene during, f.i., the display of the notes.
 */

/**
 * The custominiFiles() function is called when the php script has finished to retrieve the list of files.
 *  
 * This function has no return value
 */
function custominiFiles() {
   //if (markdown.settings.debug) console.log('List of files, #'+$('#tblFiles tr').length+' files retrieved');;
}

/*
 * The customafterDisplay() function is called once the clicked document has been displayed .
 * You can use this function for manipulating DOM objects f.i. the "$('h1').css('color','red');"
 * line will put the heading one in red.
 *
 * With jQuery, you can easily target objects and add classes, change css on-the-fly, ...
 * 
 * @param {string} $filename   Fully qualified filename (on the Operating system)
 * 
 * This function has no return value
 */
function customafterDisplay($filename) {
   //if (markdown.settings.debug) console.info('The note '+ $filename+ ' has been displayed');
}

/**
 * Called when the user has type a keyword in the search engine and before that the search is fired
 * 
 * @param {string} $keywords   The searched pattern
 * @returns {Boolean}        True : the search can be done, False : the search will be cancelled
 */
function customonChangeSearch($keywords) {
   //if (markdown.settings.debug) console.info('Search for '+$keywords);
   return true;   // true : the search can be fired, false : the search will be cancelled
}

/**
 * Called once the search event has been fired and once the list has been restricted to display only
 * matched notes
 * 
 * @param {string} $keywords  The searched pattern
 * @param {array} $data       Array with the list of files matching that 
 * 
 *  This function has no return value
 */
function customafterSearch($keywords, $data) {
	//if (markdown.settings.debug) console.log($data);
}