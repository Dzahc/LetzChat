var apiKey = "AIzaSyCeJljhj9ChaPHoDuYr5O1RzljzjP9S040";

function translate(txtSource, sourceLang) {
    var deviceLanguage = localStorage.getItem("device_language");
    if (deviceLanguage == null) {
        var deviceLanguage = "EN";
    }

    console.log("sourceLang = " + sourceLang);
    console.log("deviceLang = " + deviceLanguage);

    if (deviceLanguage !== sourceLang) {
        console.log("Attempting to translate \'" + txtSource + "\'");
        var url = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey;
        url += "&source=" + sourceLang;
        url += "&target=" + deviceLanguage;
        url += "&q=" + escape(txtSource);
        console.log("url = " + url);
        $.get(url, function (data, status) {
            console.log("returned: " + data.data.translations[0].translatedText);
            return data.data.translations[0].translatedText;
        });
    } else {
        console.log("Source and Target language are the same");
        console.log("returned: " + txtSource);
        return txtSource;
    }
}