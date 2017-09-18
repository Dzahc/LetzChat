var apiKey = "AIzaSyCeJljhj9ChaPHoDuYr5O1RzljzjP9S040";

function translate(txtSource, sourceLang, classname, avatar, date, user_id) {

    if ((navigator.platorm) == "Win32" || "MacIntel") {

        var deviceLanguage = navigator.language
       
    }

    else { 

        var deviceLanguage = localStorage.getItem("device_language");
    }

    if (deviceLanguage == null) {

        var deviceLanguage = "en";

    }  

    if (sourceLang == null || sourceLang == "") {

        var sourceLang = "en";

    }  

    //
    //  trim the language
    //
    sourceLang = sourceLang.substring(0, 2).toLowerCase();

    deviceLanguage = deviceLanguage.substring(0, 2).toLowerCase();



    console.log("sourceLang = " + sourceLang);
    console.log("deviceLang = " + deviceLanguage);

    if (deviceLanguage != sourceLang) {
        var transtext="";
        // console.log("Attempting to translate \'" + txtSource + "\'");

        var url = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey;
        url += "&source=" + sourceLang;
        url += "&target=" + deviceLanguage;
        url += "&q=" + escape(txtSource);

       

        
        $.get(url, function (data, status) {

            console.log("returned: " + data.data.translations[0].translatedText);
            transtext = data.data.translations[0].translatedText;

        }).done (function() {

                message = '<li class="' + classname + '"><div class="avatar"><img src=' + avatar + ' draggable="false"/></div><div class="msg"><p>' + user_id + ' says: </p><p>' + transtext + ' </p><time>' + date + '</time></div></li>';

                //
                //  Add the message to the view
                //
                $(".chat").append(message);

            return false;
            });

    } else {
        console.log("Source and Target language are the same");
        console.log("returned: " + txtSource);

                message = '<li class="' + classname + '"><div class="avatar"><img src=' + avatar + ' draggable="false"/></div><div class="msg"><p>' + user_id + ' says: </p><p>' + txtSource + ' </p><time>' + date + '</time></div></li>';

                //
                //  Add the message to the view
                //
                $(".chat").append(message);

        return false;
    }


}
