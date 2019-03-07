/* global versionString, devMode, container, document, notationArea, window, doKeyDown, doKeyUp, doWindowMouseUp, doWindowMouseMove, handleClipboard, fileUploader, doFileOpen, doNotationMouseDown, doNotationMouseUp, doNotationMouseMove, doNotationDragOver, doNotationDragEnter, doNotationDragLeave, doNotationDrop, doNotationMouseWheel, controlArea, doControlMouseDown, doControlMouseMove, doControlMouseOut, titleArea, doTitleMouseDown, cctx, tctx, ctx, clipboardArea, cursor, loadCookie, initializeTitle, initializeNotation, initializeControls, resizeBarPosition, localize, currentFileName, kDefaultFilename: true */
/* jshint -W020 */

function initialize() {
	versionString = "0.9.3b";
	devMode = false;
	
    localize('en');
	container = document.getElementById("container");
	notationArea = document.getElementById("notationAreaCanvas");
	window.addEventListener("keydown",doKeyDown,false); //if we need to deal with focus, check out stackoverflow.com/questions/12886286
	window.addEventListener("keyup",doKeyUp,false);
	window.addEventListener("resize",initializeCanvases,false);
	window.addEventListener("mouseup",doWindowMouseUp,false);
	window.addEventListener("mousemove",doWindowMouseMove,false);
	document.addEventListener("cut",handleClipboard,false);
	document.addEventListener("copy",handleClipboard,false);
	document.addEventListener("paste",handleClipboard,false);
	fileUploader = document.getElementById("fileUpload");
	fileUploader.addEventListener("change",doFileOpen,false);
	notationArea.addEventListener("mousedown",doNotationMouseDown,false);
	notationArea.addEventListener("mouseup",doNotationMouseUp,false);
	notationArea.addEventListener("mousemove",doNotationMouseMove,false);
	notationArea.addEventListener("dragover",doNotationDragOver,false);
	notationArea.addEventListener("dragenter",doNotationDragEnter,false);
	notationArea.addEventListener("dragleave",doNotationDragLeave,false);
	notationArea.addEventListener("drop",doNotationDrop,false);
	notationArea.addEventListener("mousewheel",doNotationMouseWheel,false);
	notationArea.addEventListener("DOMMouseScroll",doNotationMouseWheel,false); // because Firefox doesn't do mousewheel
	controlArea = document.getElementById("controlCanvas");
	controlArea.addEventListener("mousedown",doControlMouseDown,false);
	controlArea.addEventListener("mousemove",doControlMouseMove,false);
	controlArea.addEventListener("mouseout",doControlMouseOut,false);
	titleArea = document.getElementById("titleCanvas");
	titleArea.addEventListener("mousedown",doTitleMouseDown,false);
	tctx = titleArea.getContext("2d");
	ctx = notationArea.getContext("2d");
	clipboardArea = document.getElementById("clipboard");
	cursor.x=0;
	cursor.y=0;
	cursor.height=1;
	cursor.width=1;
	cursor.pinnedLeft=true;
	cursor.pinnedTop=true;
    currentFileName = kDefaultFilename;
	
	var totalHeight=notationArea.clientHeight+controlArea.clientHeight;
	var newY=totalHeight-(controlArea.clientWidth/5.4);
		
	if (newY<(totalHeight/2)) {
		newY = totalHeight/2;
	} else if (newY>(totalHeight*0.9)) {
		newY = totalHeight*0.9;
	}
	notationArea.style.height=newY+"px";
	controlArea.style.top=newY+"px";
	controlArea.style.height=(totalHeight-newY)+"px";
		
	loadCookie();

	initializeCanvases();
}
	
function initializeCanvases() {
	initializeTitle();
	recalculateSectionHeights();
	initializeNotation();
	initializeControls();
}

function recalculateSectionHeights() {
	var totalHeight=document.getElementById("container").clientHeight;
	var newY = totalHeight * resizeBarPosition;
	notationArea.style.height=newY+"px";
	controlArea.style.top=newY+"px";
	controlArea.style.height=(totalHeight-newY)+"px";	
}
