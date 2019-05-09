function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
  }
var ID_qrcode = GetURLParameter('id');
$('#id').text(ID_qrcode);

function SetURLParameter(id){
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?id=' + id;
    window.history.pushState({path:newurl},'',newurl);
}


// Cookie setzten

var mode = 0;
checkURL();
checkAccess();

function checkURL(){
  if (GetURLParameter('w') == 1){
     mode = 1;
     setCookie("writeAccess", "1", 365);
     console.log('Schreiben');
  } else {
    mode = 0;
    console.log('Lesen');
  }
  console.log(mode);
}

function checkAccess(){
  if (getCookie('writeAccess') == 1){
    mode = 1;
    console.log("Du hast einen schreibenden Cookie. Modus auf " + mode);
  } else{
    console.log("Du hast keinen Cookie. Modus auf " + mode);
  };
};

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
