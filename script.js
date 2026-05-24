let webcamStream = null;
let screenStream = null;

// Webcam Elements
const webcamVideo = document.getElementById("webcamVideo");
const cameraStatus = document.getElementById("cameraStatus");

// Screen Share Elements
const screenVideo = document.getElementById("screenVideo");
const screenStatus = document.getElementById("screenStatus");


// ===================================
// START CAMERA + MICROPHONE
// ===================================

async function startCamera() {

    try {

        webcamStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        webcamVideo.srcObject = webcamStream;

        cameraStatus.innerHTML = "Camera Status: ON";

        console.log("Camera and Microphone Access Granted");

    } catch (error) {

        console.error("Error Accessing Camera:", error);

        alert("Camera or Microphone Permission Denied");
    }
}


// ===================================
// STOP CAMERA
// ===================================

function stopCamera() {

    if (webcamStream) {

        webcamStream.getTracks().forEach(track => {
            track.stop();
        });

        webcamVideo.srcObject = null;

        cameraStatus.innerHTML = "Camera Status: OFF";

        console.log("Camera Stopped");
    }
}


// ===================================
// START SCREEN SHARING
// ===================================

async function startScreenShare() {

    try {

        screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });

        screenVideo.srcObject = screenStream;

        screenStatus.innerHTML = "Screen Share Status: ON";

        console.log("Screen Sharing Started");

        // Detect if user stops sharing manually
        screenStream.getVideoTracks()[0].onended = () => {
            stopScreenShare();
        };

    } catch (error) {

        console.error("Error Sharing Screen:", error);

        alert("Screen Share Permission Denied");
    }
}


// ===================================
// STOP SCREEN SHARING
// ===================================

function stopScreenShare() {

    if (screenStream) {

        screenStream.getTracks().forEach(track => {
            track.stop();
        });

        screenVideo.srcObject = null;

        screenStatus.innerHTML = "Screen Share Status: OFF";

        console.log("Screen Sharing Stopped");
    }
}