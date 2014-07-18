
Drupal.behaviors.addToHome = function(context){
  var app_name =  Drupal.settings.addToHome.app_name;
  var display_times =  Drupal.settings.addToHome.display_times;
  var actions =  Drupal.settings.addToHome.actions;
  var second_time =  Drupal.settings.addToHome.second_time;
  var show_after =  Drupal.settings.addToHome.show_after;
  var lifespan =  Drupal.settings.addToHome.lifespan;
  var display_pace =  Drupal.settings.addToHome.display_pace;
  var message =  Drupal.settings.addToHome.message;
  var detect =  Drupal.settings.addToHome.detect;
  var andr_message=  Drupal.settings.addToHome.andr_message;
  var andr_link =  Drupal.settings.addToHome.andr_link;
  var ios_icon = Drupal.settings.addToHome.ios_icon;
  var imagePaths =  Drupal.settings.addToHome.image_paths;

  var path = Drupal.settings.addToHome.path;
  var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());

  if(isAndroid){
    var msgMob = '<div class="mobile-suggest">';
    msgMob+=    '<div class="mobile-suggest-input">';
    msgMob+=       '<div class="refuse-mobile-cont">'
    msgMob+=          '<img class="refuse-mobile" src="'+path+'/img/exit-mob-install.png" alt="" title=""/>';
    msgMob+=        '</div>';
    msgMob+=       '<div class="mobile-suggest-text">';
    msgMob+=         '<h5>'+app_name+'</h5>';
    msgMob+=         '<p><a href="'+andr_link+'" target="_blank">'+andr_message+'</p>';
    msgMob+=       '</div>';
    msgMob+=     '</div>';
    msgMob+=   '</div>';

    jQuery("body", context).prepend(msgMob);
    if(imagePaths.and_icon != null){
      jQuery(".mobile-suggest .mobile-suggest-text",context)
        .css("background","url("+imagePaths.and_icon+") no-repeat center right");
    }

  }else{
    addToHomescreen.removeSession();
    addMeta(imagePaths.ios_icon,'0');
    addMeta(imagePaths.ios_ipad_icon,'76');
    addMeta(imagePaths.ios_iphone_retina,'120');
    addMeta(imagePaths.ios_ipad_retina,'152');
    jQuery("head",context).append('<meta name="apple-mobile-web-app-capable" content="yes">')
    jQuery("head",context).append('<meta name="mobile-web-app-capable" content="yes">')
    jQuery("head",context).append('<meta name="apple-mobile-web-app-title" content="'+app_name+'">')
  
    addToHomescreen({  
      appID: app_name,  // local storage name (no need to change)
      fontSize: 15,       // base font size, used to properly resize the popup based on viewport scale factor
      debug: false,       // override browser checks
      modal: actions,       // prevent further actions until the message is closed
      mandatory: false,     // you can't proceed if you don't add the app to the homescreen
      autostart: true,      // show the message automatically
      skipFirstVisit: second_time,    // show only to returning visitors (ie: skip the first time you visit)
      startDelay: parseInt(show_after),        // display the message after that many seconds from page load
      lifespan:parseInt(lifespan),      // life of the message in seconds
      displayPace:parseInt(display_pace),      // minutes before the message is shown again (0: display every time, default 24 hours)
      maxDisplayCount: parseInt(display_times),     // absolute maximum number of times the message will be shown to the user (0: no limit)
      icon: true,         // add touch icon to the message
      message:message,        // the message can be customized
      validLocation: [],      // list of pages where the message will be shown (array of regexes)
      onInit: null,       // executed on instance creation
      onShow: null,       // executed when the message is shown
      onRemove: null,       // executed when the message is removed
      onAdd: null,        // when the application is launched the first time from the homescreen (guesstimate)
      onPrivate: null,      // executed if user is in private mode
      detectHomescreen: detect // try to detect if the site has been added to the homescreen (false | true | 'hash' | 'queryString' | 'smartURL')
      
    });
  }
  jQuery('img.refuse-mobile',context).live('click',function(){
    jQuery('div.mobile-suggest',context).hide();
  })


  function addMeta($x,$size){
    if($x!=null){
      if($size!='0'){
        jQuery("head",context)
          .append("<link rel='apple-touch-icon' sizes="+$size+"x"+$size+" href="+$x+">");
      }else{
        jQuery("head",context)
          .append("<link rel='apple-touch-icon' href="+$x+">");
      }
    }
  }
}


