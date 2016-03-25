chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var userEmail = '';
		var token = '';
        var dataString = '{"user": {"email": "'+ username +'", "password": "'+ password +'"}}';

        var signInCall = function (options) {
	        var request = new XMLHttpRequest();
	        request.open('POST', 'http://localhost:3000/users/sign_in.json', true);
	        request.setRequestHeader('Content-Type', 'application/json');
	        request.send(options);
			request.onload = function (e) {
			  if (request.readyState === 4) {
			    if (request.status === 200) {
			    	var res = JSON.parse(request.responseText);
			    	token = res.token;
			    	user = res.user;
			    	console.log('token', token);
			      return res

			    } else {
			      console.error(request.statusText);
			    }
			  }
			};
			request.onerror = function (e) {
			  console.error(request.statusText);
			};
		};
		signInCall(dataString);

        var postCall = function (optarr) {
        	var url_str = 'http://localhost:3000/dashes/16/add-post?link_url='
        	var url_par = url_str + optarr[0]
	        var request = new XMLHttpRequest();
	        request.open('GET', url_par, true);
	        request.setRequestHeader('Content-Type', 'application/json');
	        request.setRequestHeader('Authorization', token);
	        request.send();
			request.onload = function (e) {
			  if (request.readyState === 4) {
			    if (request.status === 200) {
			    	var res = JSON.parse(request.responseText);
			      	return res
			    } else {
			      console.error(request.statusText);
			    }
			  }
			};
			request.onerror = function (e) {
			  console.error(request.statusText);
			};
		};

		var imgsEl = document.getElementsByTagName('img');
		for(var z =0; z < imgsEl.length; z++){
		    var elem = imgsEl[z];   
		    contextMenuListener(elem);
				elem.onclick = function(){
					console.log('wow');
				}
		}

		// Append menue to the right click menu (aka context menu)
		var menuStr = '<nav class="context-menu"><ul class="context-menu__items"><li class="context-menu__item"><a href="#" class="context-menu__link"><i class="fa fa-eye"></i>Add to Butterfli</a></li></ul></nav>';
		// create div to append menu to
		var z = document.createElement('div');
		z.innerHTML = menuStr;
		document.body.appendChild(z);
		// set menu state
		var menuState = 0;
		var active = "context-menu--active";

		function contextMenuListener(el) {
		  el.addEventListener( "contextmenu", function(e) {
			var menu = document.querySelector(".context-menu");		  	
		  	// encode url to send in ajax request
		  	var res = encodeURI(el.src);
		  	// setup array to store post data
		  	var options = [res];



		  	// post the link to butterfli!!!!
		  	postCall(options);
		  	



		  	// prevent default right click menu
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