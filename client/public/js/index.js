const improvCheckpoint =
  "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv";
const improvRNN = new mm.MusicRNN(improvCheckpoint);

const synth = new Tone.Synth().toMaster();
const { midi, Note } = Tonal;

/* 
  Set webcam to video in DOM. Consulted on 05/01/2021
  https://www.youtube.com/watch?v=DvlyzDZDEq4&t=1293s
*/

const myVideo = document.getElementById("video");

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  addVideoStream(myVideo, stream);
});

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
};

const disableCamera = () => {
  const stream = myVideo.srcObject;
  if (stream) {
    const tracks = stream.getTracks();
    tracks[0].stop();
  }
};

const fileInput = document.querySelector("#fileInput");
const webcamBtn = document.querySelector("#webcamBtn");
const uploadPhotoBtn = document.querySelector("#uploadPhotoBtn");

const uploadIcon = document.querySelector('#uploadIcon');

const divLabel = document.querySelector('#divLabel');
const takePictureDiv = document.querySelector('#takePictureDiv');
const uploadPictureDiv = document.querySelector('#uploadPictureDiv');

const previewPhotoView = document.querySelector('#previewPhotoView');
const photoPreview = document.querySelector('#photoPreview');

webcamBtn.addEventListener("click", (e) => {
  e.preventDefault();
  divLabel.innerText = "Take your picture";

  webcamBtn.classList.add("active");
  uploadPhotoBtn.classList.remove("active");

  takePictureDiv.classList.remove("d-none");
  uploadPictureDiv.classList.add("d-none");

  previewPhotoView.classList.add("d-none");
  video.classList.remove("d-none");

  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    addVideoStream(myVideo, stream);
  });
});

uploadPhotoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
  // Disable camera
  disableCamera();

  divLabel.innerText = "Upload your picture";

  webcamBtn.classList.remove("active");
  uploadPhotoBtn.classList.add("active");

  takePictureDiv.classList.add("d-none");
  uploadPictureDiv.classList.remove("d-none");

  previewPhotoView.classList.remove("d-none");
  video.classList.add("d-none");
});

uploadIcon.addEventListener('click', (e) => {
  e.preventDefault();
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  console.log('file input changed');
  // Show image in canvas
  if (e.target.files) {
    const imageFile = e.target.files[0];
    let reader = new FileReader();

    photoPreview.src = URL.createObjectURL(imageFile);
    reader.onload = () => {
      photoPreview.src = e.target.files;
    }
  }
})

/*
    Chords. Consulted on 05/01/2021
    https://www.edmprod.com/different-chord-types/
    http://www.piano-keyboard-guide.com/piano-chords.html
*/

Happy = [
  "Db5",
  "G7",
  "G5",
  "Db6",
  "F8",
  "C5",
  "Ab5",
  "Db5",
  "F8",
  "G4",
  "Db5",
  "F8",
];
Sad = [
  "Gb1",
  "Ab3",
  "G4",
  "Ab2",
  "F4",
  "Eb2",
  "Ab3",
  "Gb4",
  "Ab3",
  "G4",
  "Ab4",
  "F3",
];
Angry = [
  "Ab2",
  "Ab1",
  "Ab3",
  "Gb2",
  "C5",
  "Eb7",
  "Ab4",
  "Gb2",
  "Ab9",
  "G6",
  "Ab2",
  "F3",
];
Confused = [
  "Ab2",
  "Ab1",
  "Ab3",
  "Gb2",
  "F3",
  "Eb7",
  "Gb1",
  "C5",
  "G4",
  "Ab2",
  "F4",
  "Eb2",
];
Disgusted = [
  "F9",
  "Gb2",
  "F3",
  "Eb7",
  "Ab3",
  "Gb4",
  "Ab3",
  "G4",
  "G4",
  "Ab2",
  "F4",
  "Eb2",
];
Surprised = [
  "Ab4",
  "Ab5",
  "Ab4",
  "Ab5",
  "C5",
  "Ab5",
  "Ab4",
  "Ab5",
  "Ab4",
  "Ab5",
  "Ab4",
  "Ab5",
];
Calm = [
  "Ab4",
  "F3",
  "Ab4",
  "C5",
  "F3",
  "Ab4",
  "Ab4",
  "CDF",
  "Ab4",
  "Ab4",
  "F3",
  "Ab4",
];
Unknown = [
  "F3",
  "F3",
  "C5",
  "F3",
  "F3",
  "C5",
  "F3",
  "F3",
  "F3",
  "C5",
  "F3",
  "F3",
];
Fear = [
  "Bm",
  "Bbm",
  "Gb7",
  "F7",
  "Ab",
  "Ab7",
  "G7",
  "Gb7",
  "C5",
  "Bb7",
  "Eb7",
  "AM7",
];

// Get the emotion
function getEmotion(image) {
  fetch(`http://localhost:5000/emotion`, {
    method: "POST",
    body: image,
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

image = "";

response = getEmotion(image);

switch (response) {
  case (respose = "Happy"):
    Melody = Happy;
    break;
  case (respose = "Sad"):
    Melody = Sad;
    break;
  case (respose = "Angry"):
    Melody = Angry;
    break;
  case (respose = "Confused"):
    Melody = Confused;
    break;
  case (respose = "Disgusted"):
    Melody = Disgusted;
    break;
  case (respose = "Surprised"):
    Melody = Surprised;
    break;
  case (respose = "Calm"):
    Melody = Calm;
    break;
  case (respose = "Unknown"):
    Melody = Unknown;
    break;
  case (respose = "Fear"):
    Melody = Fear;
    break;
  default:
    Melody = Happy;
}

const sequence = {
  ticksPerQuarter: 220,
  totalTime: 58,
  timeSignatures: [
    {
      time: 0,
      numerator: 4,
      denominator: 4,
    },
  ],
  tempos: [
    {
      time: 0,
      qpm: 120,
    },
  ],
  notes: [
    { pitch: midi("Gb4"), startTime: 0, endTime: 1 },
    { pitch: midi("F4"), startTime: 1, endTime: 3.5 },
    { pitch: midi("Ab4"), startTime: 3.5, endTime: 4 },
    { pitch: midi("C5"), startTime: 4, endTime: 4.5 },
    { pitch: midi("Eb5"), startTime: 4.5, endTime: 5 },
    { pitch: midi("Gb5"), startTime: 5, endTime: 6 },
    { pitch: midi("F5"), startTime: 6, endTime: 7 },
    { pitch: midi("E5"), startTime: 7, endTime: 8 },
    { pitch: midi("Eb5"), startTime: 8, endTime: 8.5 },
    { pitch: midi("C5"), startTime: 8.5, endTime: 9 },
    { pitch: midi("G4"), startTime: 9, endTime: 11.5 },
    { pitch: midi("F4"), startTime: 11.5, endTime: 12 },
    { pitch: midi("Ab4"), startTime: 12, endTime: 12.5 },
    { pitch: midi("C5"), startTime: 12.5, endTime: 13 },
    { pitch: midi("Eb5"), startTime: 13, endTime: 14 },
    { pitch: midi("D5"), startTime: 14, endTime: 15 },
    { pitch: midi("Db5"), startTime: 15, endTime: 16 },
    { pitch: midi("C5"), startTime: 16, endTime: 16.5 },
    { pitch: midi("F5"), startTime: 16.5, endTime: 17 },
    { pitch: midi("F4"), startTime: 17, endTime: 19.5 },
    { pitch: midi("G4"), startTime: 19.5, endTime: 20 },
    { pitch: midi("Ab4"), startTime: 20, endTime: 20.5 },
    { pitch: midi("C5"), startTime: 20.5, endTime: 21 },
    { pitch: midi("Eb5"), startTime: 21, endTime: 21.5 },
    { pitch: midi("C5"), startTime: 21.5, endTime: 22 },
    { pitch: midi("Eb5"), startTime: 22, endTime: 22.5 },
    { pitch: midi("C5"), startTime: 22.5, endTime: 24.5 },
    { pitch: midi("Eb5"), startTime: 24.5, endTime: 25.5 },
    { pitch: midi("G4"), startTime: 25.5, endTime: 28.5 },
  ],
};

const quantizedSequence = mm.sequences.quantizeNoteSequence(sequence, 1);

const startProgram = async () => {
  try {
    await improvRNN.initialize();
    let improvisedMelody = await improvRNN.continueSequence(
      quantizedSequence,
      30,
      1.1,
      Melody
    );

    const playOriginalMelody = () => {
      sequence.notes.forEach((note) => {
        synth.triggerAttackRelease(
          Note.fromMidi(note.pitch),
          note.endTime - note.startTime,
          note.startTime
        );
      });
    };

    const playGeneratedMelody = () => {
      improvisedMelody.notes.forEach((note) => {
        synth.triggerAttackRelease(
          Note.fromMidi(note.pitch),
          note.quantizedEndStep - note.quantizedStartStep,
          note.quantizedStartStep
        );
      });
    };

    const originalMelodyButton = document.getElementById("original");
    const generatedMelodyButton = document.getElementById("generated");
    originalMelodyButton.onclick = () => {
      playOriginalMelody();
    };
    generatedMelodyButton.onclick = () => {
      playGeneratedMelody();
    };
  } catch (error) {
    console.error(error);
  }
};

startProgram();
