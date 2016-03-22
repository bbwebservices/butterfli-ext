chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);





		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		var imgsEl = document.getElementsByTagName('img');
		for(var z =0; z < imgsEl.length; z++){
		    var elem = imgsEl[z];   
		    contextMenuListener(elem);
				elem.onclick = function(){
					console.log('wow');
				}
		}

		var menuStr = '<nav class="context-menu"><ul class="context-menu__items"><li class="context-menu__item"><a href="#" class="context-menu__link"><i class="fa fa-eye"></i>Add to Butterfli</a></li></ul></nav>';
		var z = document.createElement('div');
		z.innerHTML = menuStr;
		document.body.appendChild(z);
		var menuState = 0;
		var active = "context-menu--active";
		function contextMenuListener(el) {
		  el.addEventListener( "contextmenu", function(e) {

			var menu = document.querySelector(".context-menu");		  	
		    // console.log(e, el);
		  	console.log(el.src);
		    e.preventDefault();
		    toggleMenuOn();
		    positionMenu(e);
		  });
		}

		function toggleMenuOn() {
		  if ( menuState !== 1 ) {
		    menuState = 1;
		    menu.classList.add(active);
		  }
		}

var menuPosition;
var menuPositionX;
var menuPositionY;
var menuWidth;
var menuHeight;
var windowWidth;
var windowHeight;

function getPosition(e) {
  var posx = 0;
  var posy = 0;

  if (!e) var e = window.event;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + 
                       document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + 
                       document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  }
}
var menu = document.querySelector(".context-menu");
var clickCoords;
var clickCoordsX;
var clickCoordsY;

// updated positionMenu function
function positionMenu(e) {
  clickCoords = getPosition(e);
  clickCoordsX = clickCoords.x;
  clickCoordsY = clickCoords.y;

  menuWidth = menu.offsetWidth + 4;
  menuHeight = menu.offsetHeight + 4;

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  if ( (windowWidth - clickCoordsX) < menuWidth ) {
    menu.style.left = windowWidth - menuWidth + "px";
  } else {
    menu.style.left = clickCoordsX + "px";
  }

  if ( (windowHeight - clickCoordsY) < menuHeight ) {
    menu.style.top = windowHeight - menuHeight + "px";
  } else {
    menu.style.top = clickCoordsY + "px";
  }
}


		}
	}, 10);
});