const video = document.getElementById('video')
var detection;
var age = 0;
var via=0;
var sqX, sqY, sqW, sqH;

faceapi.tf.setBackend('webgl');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/Aquets/Specchio-per-GIF/master//models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/Aquets/Specchio-per-GIF/master//models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/Aquets/Specchio-per-GIF/master//models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/Aquets/Specchio-per-GIF/master//models'),
  faceapi.nets.ageGenderNet.loadFromUri('/Aquets/Specchio-per-GIF/master//models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  var canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = {width: video.width, height : video.height}
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({inputSize: 160})).withAgeAndGender()
    const resizedDetection = faceapi.resizeResults(detection, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    age = detection.age;
    via=1;

    //square POINTS
    sqX = resizedDetection.detection.box.x;
    sqY = resizedDetection.detection.box.y;
    sqW = resizedDetection.detection.box.width;
    sqH = resizedDetection.detection.box.height;

  },100)
})
