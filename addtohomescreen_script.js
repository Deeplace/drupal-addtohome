
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
  var isIOS = /iphone|ipad.*safari/i.test(navigator.userAgent.toLowerCase());
  var isStandAlone = (("standalone" in window.navigator) && !window.navigator.standalone) ? true : false; 
  
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

  }else if(isIOS){
    //detect if we are in full screen mode
    if(isStandAlone){
      insertMes(path,app_name,message,imagePaths.and_icon);
      addMeta(imagePaths.ios_icon,'0');
      addMeta(imagePaths.ios_ipad_icon,'76');
      addMeta(imagePaths.ios_iphone_retina,'120');
      addMeta(imagePaths.ios_ipad_retina,'152');
      jQuery("head",context).append('<meta name="apple-mobile-web-app-title" content="'+app_name+'">')
    }
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

  function insertMes($path,$app_name,$message,$imagePaths){
  var msgMob = '<div class="mobile-suggest">';
    msgMob+=    '<div class="mobile-suggest-input">';
    msgMob+=       '<div class="refuse-mobile-cont">'
    msgMob+=          '<img class="refuse-mobile" src="'+$path+'/img/exit-mob-install.png" alt="" title=""/>';
    msgMob+=        '</div>';
    msgMob+=       '<div class="mobile-suggest-text">';
    msgMob+=         '<h5>'+$app_name+'</h5>';
    msgMob+=         '<p>'+$message+'</p>';
    msgMob+=       '</div>';
    msgMob+=     '</div>';
    msgMob+=   '</div>';

    jQuery("body", context).prepend(msgMob);
    if($imagePaths != null){
      jQuery(".mobile-suggest .mobile-suggest-text",context)
        .css("background","url("+$imagePaths+") no-repeat center right");
    }
  }
}


