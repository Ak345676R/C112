
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
//Webcam.set is a predefined function of webcam.js library to show the live view of the webcam.
camera = document.getElementById("camera");

Webcam.attach(camera);
//Webcam.attach activates the user's webcam and asks for the permissionand begins showing a live camera image.
function takesnapshot() {
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="result_snapshot" src="'+data_uri+'">';
        //Webcam.snap to snap a picture.
    })
}

console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/3PC1z-IfP/model.json", modelLoaded);
function modelLoaded() {
    console.log("Model Loaded!");
}

function check() {
    img = document.getElementById("result_snapshot").value;
    classifier.classify(img, gotResult);
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is" + prediction1;
    speak_data2 = "And The second prediction is" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis)
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "Happy") {
            document.getElementById("update_emoji") = "&#128512;"
        }
        if (results[0].label == "Sad") {
            document.getElementById("update_emoji") = "&#128546;"
        }
        if (results[0].label == "Angry") {
            document.getElementById("update_emoji") = "&#128545;"
        }

        if (results[1].label == "Happy") {
            document.getElementById("update_emoji") = "&#128522;"
        }
        if (results[1].label == "Sad") {
            document.getElementById("update_emoji") = "&#128532;"
        }
        if (results[1].label == "Angry") {
            document.getElementById("update_emoji") = "&#128548;"
        }
    }
}