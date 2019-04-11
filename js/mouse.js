/* global helpDialogOpen, optionsDialogOpen, fileDialogOpen, findPos, notationArea, hScrollOffset, gridWidth, hScrollUnits, vScrollOffset, gridHeight, vScrollUnits, shiftKeyDown, cursor, mouseIsDown, closeButtonCenterX, closeButtonCenterY, dialogButtonLeft, dialogButtonRight, dialogButtonTop, dialogButtonHeight, drawAllDots, setCellHeight, showPageBreaks, setPageSize, pageWidth, pageHeight, confirm, clearDocument, resetCursorAndScroll, fileUploader, downloadFile, parseOnImport, drawTitle, drawNotation, updateScreenreader, window, autoScroller, autoScrollXDir, autoScrollYDir, notationWidth, notationHeight, startDragX, startDragY, vScroll, hScroll, chu, controlArea, resizeBarHeight, resizeBarDrag, resizeBarDragOrigin, container, whichKeyboard, keyboardOriginX, keyboardOriginY, keyboardCoordinates, interpretKeyCode, keyCodes, drawControls, controlHelp, keyHelp, resizeBarPosition, initializeCanvases, titleArea, titleWidth, titleHeight, toggleHelpDialog, toggleOptionsDialog, toggleFileDialog, thu, kbu, nu, kUnsavedChangesDialogMessage, currentControlModule, currentCellFont, kTitleAreaHeight, kDialogWidth: true */
/* jshint -W020 */


function doNotationMouseDown(e) {
  	
	var x = e.clientX-findPos(notationArea).x;
    var y = e.clientY-findPos(notationArea).y;

    if (y > kTitleAreaHeight+4) {

        y = y + kTitleAreaHeight+4;

        if ((!optionsDialogOpen && !fileDialogOpen) || x < kDialogWidth) {

            startDragX = Math.floor((x+hScrollOffset)/gridWidth)+hScrollUnits;
            startDragY = Math.floor((y+vScrollOffset)/gridHeight)+vScrollUnits;
            if (shiftKeyDown) {

                var currentX = startDragX;
                var currentY = startDragY;
                var prevCursorX = cursor.x;
                var prevCursorY = cursor.y;

                if (currentX<=cursor.x) {
                    cursor.x=currentX;
                    cursor.width=prevCursorX-currentX+1;
                    cursor.pinnedLeft=false;
                } else {
                        cursor.width = currentX-prevCursorX+1;
                        cursor.pinnedLeft=true;
                }

                if (currentY<=cursor.y) {
                    cursor.y=currentY;
                    cursor.height=prevCursorY-currentY+1;
                    cursor.pinnedTop=false;
                } else {
                    cursor.height = currentY-prevCursorY+1;
                    cursor.pinnedTop=true;
                }
            } else {
                cursor.x = startDragX;
                cursor.y = startDragY;
                cursor.width = 1;
                cursor.height = 1;
            }

            mouseIsDown = true;

//        } else {
//
//            if (x>closeButtonCenterX-(nu*3) && x<closeButtonCenterX+(nu*3) && y>closeButtonCenterY-(nu*3) && y<closeButtonCenterY+(nu*3)) {
//                optionsDialogOpen = false;
//                fileDialogOpen = false;
//            } else if (optionsDialogOpen) {
//                if (x>dialogButtonLeft && x<dialogButtonRight) {
//                    if (y>dialogButtonTop[1] && y<dialogButtonTop[1]+dialogButtonHeight) {
//                        currentCellFont.interpretBraille=!currentCellFont.interpretBraille;
//                    } else if (y>dialogButtonTop[2] && y<dialogButtonTop[2]+dialogButtonHeight) {
//                        drawAllDots = !drawAllDots;
//                    } else if (y>dialogButtonTop[3] && y<dialogButtonTop[3]+dialogButtonHeight) {
//                        if (x>dialogButtonLeft+(nu*47.5) && x<dialogButtonLeft+(nu*57.5)) {
//                            if (y>dialogButtonTop[3]+(nu*1) && y<dialogButtonTop[3]+(nu*6)) { // +
//                                setCellHeight(gridHeight+10);
//                            } else if (y>dialogButtonTop[3]+(nu*6) && y<dialogButtonTop[3]+(nu*11)) { // -
//                                setCellHeight(Math.max(10,gridHeight-10));
//                            }
//                        }
//                    } else if (y>dialogButtonTop[4] && y<dialogButtonTop[4]+dialogButtonHeight) {
//                        showPageBreaks = !showPageBreaks;
//                    } else if (y>dialogButtonTop[5] && y<dialogButtonTop[5]+dialogButtonHeight) {
//                        if (x>dialogButtonLeft+(nu*32.5) && x<dialogButtonLeft+(nu*42.5)) {
//                            if (y>dialogButtonTop[5]+(nu*1) && y<dialogButtonTop[5]+(nu*6)) { // +
//                                setPageSize(pageWidth+1,pageHeight);
//                            } else if (y>dialogButtonTop[5]+(nu*6) && y<dialogButtonTop[5]+(nu*11)) { // -
//                                setPageSize(Math.max(1,pageWidth-1),pageHeight);
//                            }
//                        } else if (x>dialogButtonLeft+(nu*72.5) && x<dialogButtonLeft+(nu*82.5)) {
//                            if (y>dialogButtonTop[5]+(nu*1) && y<dialogButtonTop[5]+(nu*6)) { // +
//                                setPageSize(pageWidth,pageHeight+1);
//                            } else if (y>dialogButtonTop[5]+(nu*6) && y<dialogButtonTop[5]+(nu*11)) { // -
//                                setPageSize(pageWidth,Math.max(1,pageHeight-1));
//                            }
//                        }
//                    }
//                }
//            } else { // fileDialogOpen
//                if (x>dialogButtonLeft && x<dialogButtonRight) {
//                    if (y>dialogButtonTop[1] && y<dialogButtonTop[1]+dialogButtonHeight) { // new file
//                        if (confirm(kUnsavedChangesDialogMessage)) {
//                            clearDocument();
//                            resetCursorAndScroll();
//                            fileDialogOpen=false;
//                        }
//                    } else if (y>dialogButtonTop[2] && y<dialogButtonTop[2]+dialogButtonHeight) {
//                        if (confirm(kUnsavedChangesDialogMessage)) {
//                            fileUploader.click();
//                            resetCursorAndScroll();
//                            fileDialogOpen=false;
//                        }
//                    } else if (y>dialogButtonTop[3] && y<dialogButtonTop[3]+dialogButtonHeight) {
//                        downloadFile(false);
//                        fileDialogOpen=false;
//                    } else if (y>dialogButtonTop[4] && y<dialogButtonTop[4]+dialogButtonHeight) {
//                        downloadFile(true);
//                        fileDialogOpen=false;
//                    } else if (y>dialogButtonTop[5] && y<dialogButtonTop[5]+dialogButtonHeight) {
//                        parseOnImport = !parseOnImport;
//                    }
//                }
//            }
//            drawTitle();
        }

        drawNotation();
        updateScreenreader("");

    } else {

        titleWidth = notationArea.clientWidth;
        titleHeight = kTitleAreaHeight;

        thu = titleHeight/100; // title height unit

        if (y>=thu*10 && y<=thu*80) {
            if (x>=titleWidth-((thu*300)+1) && x<=titleWidth-((thu*0)+1)) {
                toggleHelpDialog();
            } else if (x>=titleWidth-((thu*600)+5) && x<=titleWidth-((thu*300)+5)) {
                toggleOptionsDialog();
            } else if (x>=titleWidth-((thu*900)+10) && x<=titleWidth-((thu*600)+10)) {
                toggleFileDialog();
            }
        }

        drawTitle();
        drawNotation();
        drawControls();

    }
	
}

function doNotationMouseUp(e) {
	mouseIsDown = false;
	window.clearInterval(autoScroller);
	
}

function doNotationMouseMove(e) {
	if (mouseIsDown) {
		doNotationMouseDrag(e);
	}
}

function doNotationMouseDrag(e) {

	var localX = e.clientX-findPos(notationArea).x;
	var localY = e.clientY-findPos(notationArea).y;
	
	var onEdge = false;
	if (localX<20) {
		autoScrollXDir = -1; // west
		onEdge = true;
	} else {
        if (localX>notationArea.clientWidth-20) {
            autoScrollXDir = 1; // east
            onEdge = true;
        } else {
            autoScrollXDir = 0;
        }
    }
	if (localY<20) {
		autoScrollYDir = -1; // north
		onEdge = true;
	} else {
        if (localY>notationArea.clientHeight-20) {
            autoScrollYDir = 1; // south
            onEdge = true;
        } else {
            autoScrollYDir = 0;
        }
    }
	
	if (onEdge) {
		autoScroller = window.setInterval(function() { autoScroll(); },1000);
	} else {
	
		var currentX = Math.floor((localX+hScrollOffset)/gridWidth)+hScrollUnits;
		var currentY = Math.floor((localY+vScrollOffset)/gridHeight)+vScrollUnits;
		
		if (currentX<=startDragX) {
			cursor.x=currentX;
			cursor.width=startDragX-currentX+1;
		} else {
			cursor.width = currentX-startDragX+1;
		}
		
		if (currentY<=startDragY) {
			cursor.y=currentY;
			cursor.height=startDragY-currentY+1;
		} else {
			cursor.height = currentY-startDragY+1;
		}
	}

	drawNotation();	
}

function doNotationMouseWheel(e) {
	var deltaX=0;
	var deltaY=0;
	var resolution=1;
	switch (e.axis) {
		case 1: // horizontal (Firefox only)
			deltaX = e.detail * resolution;
			break;
		case 2: // vertical (Firefox only)
			deltaY = e.detail * resolution;
			break;
		default: // not Firefox
			deltaX = -e.wheelDeltaX * resolution;
			deltaY = -e.wheelDeltaY * resolution;
	}
				
	vScroll = Math.max(0,vScroll + deltaY);
	hScroll = Math.max(0,hScroll + deltaX);
	
	e.preventDefault();
	
	drawNotation();
	
	return false;
}

function doControlMouseDown(e) {
	
	chu = controlArea.height/100; // controls height unit
	
	startDragY = e.clientY-findPos(controlArea).y;
	
	var x = e.clientX-findPos(controlArea).x;
	var y = e.clientY-findPos(controlArea).y-10;
	
	if (y<0) {
		resizeBarDrag = true;
		resizeBarDragOrigin = (e.clientY-findPos(container).y)-controlArea.offsetTop;
	} else {
        currentControlModule.click(x,y);
    }

    drawControls();
	
}

function doControlMouseMove(e) {
	if (e.clientY-findPos(controlArea).y<=10) {
		controlArea.style.cursor="row-resize";
	} else {
		controlArea.style.cursor="default";

		var x = e.clientX-findPos(controlArea).x;
		var y = e.clientY-findPos(controlArea).y-10;
		controlHelp = 0;

        currentControlModule.mouseOver(x,y);

		//drawControls();
	}
}
	
function doControlMouseOut(e) {
	controlArea.style.cursor="default";
}

function doWindowMouseUp(e) {
	resizeBarDrag = false;
}

function doWindowMouseMove(e) {
	if (resizeBarDrag) {
		var newY = (e.clientY-findPos(container).y)-resizeBarDragOrigin;
		var totalHeight=window.innerHeight;
		
		if (newY<(totalHeight/2)) {
			newY = totalHeight/2;
		} else if (newY>(totalHeight*0.9)) {
			newY = totalHeight*0.9;
		}
		
		notationArea.height=newY;
		controlArea.style.top=newY+"px";
		controlArea.height=totalHeight-newY-8;
		
		resizeBarPosition = newY/totalHeight;
		initializeCanvases();
        currentControlModule.updateSizes();
		drawNotation();
		drawControls();
	}
}

//function doTitleMouseDown(e) {
//
//	var x = e.clientX-findPos(titleArea).x;
//	var y = e.clientY-findPos(titleArea).y;
//
//	titleWidth = titleArea.clientWidth;
//	titleHeight = titleArea.clientHeight;
//
//	thu = titleHeight/100; // title height unit
//
//	if (y>=thu*10 && y<=thu*80) {
//		if (x>=titleWidth-((thu*300)+1) && x<=titleWidth-((thu*0)+1)) {
//			toggleHelpDialog();
//		} else if (x>=titleWidth-((thu*600)+5) && x<=titleWidth-((thu*300)+5)) {
//			toggleOptionsDialog();
//		} else if (x>=titleWidth-((thu*900)+10) && x<=titleWidth-((thu*600)+10)) {
//			toggleFileDialog();
//		}
//	}
//
//	drawTitle();
//	drawNotation();
//	drawControls();
//
//}

function autoScroll() {
	
	switch (autoScrollXDir) {
		case -1: // west
			hScroll = Math.max(0,hScroll-gridWidth);
			if (cursor.x>0) {
				cursor.x -= 1;
				cursor.width += 1;
			}
			break;
		case 1: // east
			hScroll += gridWidth;
			cursor.width += 1;
			break;
		default:
			// do nothing
	}
	switch (autoScrollYDir) {
		case -1: // north
			vScroll = Math.max(0,vScroll-gridHeight);
			if (cursor.y>0) {
				cursor.y -= 1;
				cursor.height += 1;
			}
			break;
		case 1: // south
			vScroll += gridHeight;
			cursor.height += 1;
			break;
	}
	
	drawNotation();
}
