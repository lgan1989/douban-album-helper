


$(document).ready(function(){
 
  var temp = $('#g_iframe')[0].contentWindow.document;
  temp.getElementById('m-playlist');
  var tb = temp.getElementsByTagName('table')[0];
  
  $(tb).find('.js-dis').removeClass('js-dis');

  function injectScript(source)
  {
      var elem = document.createElement("script");
      elem.type = "text/javascript";
      elem.innerHTML = 'window.GCopyrights = [];';
      return document.head.appendChild(elem);
  }
  injectScript();

});
