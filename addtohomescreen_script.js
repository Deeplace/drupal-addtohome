
/**
 * Drupal.settings.addToHome - object with properties:
 *   addtohome_app_name -
 *   addtohome_display_times -
 *   addtohome_actions -
 *   addtohome_second_time -
 *   addtohome_show_after -
 *   addtohome_lifespan -
 *   addtohome_display_pace -
 *   addtohome_message -
 *   addtohome_detect -
 *   addtohome_andr_message-
 *   addtohome_andr_link -
 *   addtohome_ios_icon -
 *   image_paths -
 *   path -
 *  ios_use_msgbox -
 */
Drupal.behaviors.addToHome = function(context){
  var settings = Drupal.settings.addToHome;
  console.log(settings.image_paths);
  var isAndroid = /android/i.test(navigator.userAgent.toLowerCase()),
      isIOS = /iphone|ipad.*safari/i.test(navigator.userAgent.toLowerCase()),
      isStandAlone = (("standalone" in window.navigator) && !window.navigator.standalone) ? true : false; 
  
  if(isAndroid){
    insertMes(settings.path, settings.addtohome_app_name, settings.addtohome_andr_message, settings.image_paths.addtohome_andr_icon, settings.andr_link);
  }else if(isIOS){
    jQuery("head",context).append('<meta name="apple-mobile-web-app-title" content="'+settings.addtohome_app_name+'">');
    addMeta(settings.image_paths.addtohome_ios_icon,'0');
    addMeta(settings.image_paths.addtohome_ios_ipad_icon,'76');
    addMeta(settings.image_paths.addtohome_ios_iphone_retina,'120');
    addMeta(settings.image_paths.addtohome_ios_ipad_retina,'152');

    if(settings.addtohome_ios_use_msgbox){
      if(isStandAlone){
        //detect if we are in full screen mode
        insertMes(settings.path, settings.addtohome_app_name, settings.addtohome_message, settings.image_paths.addtohome_andr_icon, null);
      }
    }else{
      
      addToHomescreen({  
        appID: settings.addtohome_app_name,  // local storage name (no need to change)
        fontSize: 15,       // base font size, used to properly resize the popup based on viewport scale factor
        debug: false,       // override browser checks
        modal: settings.addtohome_actions,       // prevent further actions until the message is closed
        mandatory: false,     // you can't proceed if you don't add the app to the homescreen
        autostart: true,      // show the message automatically
        skipFirstVisit: settings.addtohome_second_time,    // show only to returning visitors (ie: skip the first time you visit)
        startDelay: parseInt(settings.addtohome_show_after),        // display the message after that many seconds from page load
        addtohome_lifespan:parseInt(settings.addtohome_lifespan),      // life of the message in seconds
        displayPace:parseInt(settings.addtohome_display_pace),      // minutes before the message is shown again (0: display every time, default 24 hours)
        maxDisplayCount: parseInt(settings.addtohome_display_times),     // absolute maximum number of times the message will be shown to the user (0: no limit)
        icon: true,         // add touch icon to the message
        message:settings.addtohome_message,        // the message can be customized
        validLocation: [],      // list of pages where the message will be shown (array of regexes)
        onInit: null,       // executed on instance creation
        onShow: null,       // executed when the message is shown
        onRemove: null,       // executed when the message is removed
        onAdd: null,        // when the application is launched the first time from the homescreen (guesstimate)
        onPrivate: null,      // executed if user is in private mode
        detectHomescreen: settings.addtohome_detect // try to detect if the site has been added to the homescreen (false | true | 'hash' | 'queryString' | 'smartURL')
      
      });
    }
  }



  function addMeta($x, $size){
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

  function insertMes($path, $addtohome_app_name, $message, $imagePaths, $link){
  var msgMob = '<div class="mobile-suggest">';
    msgMob+=    '<div class="mobile-suggest-input">';
    msgMob+=       '<div class="refuse-mobile-cont">'
    msgMob+=          '<img class="refuse-mobile" src="'+$path+'/img/exit-mob-install.png" alt="" title=""/>';
    msgMob+=        '</div>';
    msgMob+=       '<div class="mobile-suggest-text">';
    msgMob+=         '<h5>'+$addtohome_app_name+'</h5>';
    if($link==null){
      msgMob+=         '<p>'+$message+'</p>';
    }
    else{
      msgMob+=         '<p><a href="'+$link+'" target="_blank">'+$message+'</p>';
    }
    msgMob+=       '</div>';
    msgMob+=     '</div>';
    msgMob+=   '</div>';


    jQuery("body", context).prepend(msgMob);
    if($imagePaths != null){
      jQuery(".mobile-suggest .mobile-suggest-text",context)
        .css("background","url("+$imagePaths+") no-repeat center right");
    }
    jQuery('img.refuse-mobile',context).bind('click',function(){
      jQuery('div.mobile-suggest',context).hide();
    });
  }
}


