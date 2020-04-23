var COOKIEPOPUP_title = "Cookies."; // Title
var COOKIEPOPUP_desc = "By using this website, you automatically accept the use of cookies."; // Description
var COOKIEPOPUP_link = '<a href="cookie-policy.html" target="_blank">See privacy policy.</a>'; // Cookiepolicy link
var COOKIEPOPUP_button = "Understood"; // Button text
var COOKIEPOPUP_bgColor = "#232323";
var COOKIEPOPUP_textColor = "#FFFFFF";
var COOKIEPOPUP_buttonColor = "#3E9B67";

function pureFadeIn(elem, display){
  var el = document.getElementById(elem);
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .05) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};
function pureFadeOut(elem){
  var el = document.getElementById(elem);
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .05) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';
}

function cookieConsent() {
  if (!getCookie('COOKIEPOPUP_Dismiss')) {
    var container = document.createElement('div');
    container.innerHTML = '<div class="cookieConsentContainer" id="cookieConsentContainer" style="background-color: ' + COOKIEPOPUP_bgColor + ';">'+
                            '<div class="cookieTitle" style="color: ' + COOKIEPOPUP_textColor + ';"><a>' + COOKIEPOPUP_title + '</a></div>'+
                            '<div class="cookieDesc" style="color: ' + COOKIEPOPUP_textColor + ';"><p>' + COOKIEPOPUP_desc + ' ' + COOKIEPOPUP_link + '</p></div>'+
                            '<div class="cookieButton"><a onClick="COOKIEPOPUP_Dismiss();" style="background-color: ' + COOKIEPOPUP_buttonColor + ';">' + COOKIEPOPUP_button + '</a></div>'+
                          '</div>';
    document.body.appendChild(container);
	  pureFadeIn("cookieConsentContainer");
  }
}

function COOKIEPOPUP_Dismiss() {
  setCookie('COOKIEPOPUP_Dismiss','1',7);
  pureFadeOut("cookieConsentContainer");
}

window.onload = function() { cookieConsent(); };
