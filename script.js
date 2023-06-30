const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true;
  recognition.lang = 'ko-KR';

  const button = document.querySelector('.speech-recognition');
  const speechResult = document.querySelector('.result');
  const imageContainer = document.querySelector('.image-container');
  const imageWords = [
    { word: '사과', imageSrc: 'https://github.com/Sungyh305/voiceimage/blob/main/%EC%82%AC%EA%B3%BC.jpg' },
    { word: '바나나', imageSrc: 'https://github.com/Sungyh305/voiceimage/blob/main/%EB%B0%94%EB%82%98%EB%82%98.jpg' },
    { word: '감자', imageSrc: 'https://github.com/Sungyh305/voiceimage/blob/main/%EA%B0%90%EC%9E%90.jpg' },
    { word: '고구마', imageSrc: 'https://github.com/Sungyh305/voiceimage/blob/main/%EA%B3%A0%EA%B5%AC%EB%A7%88.jpg' },
    // Add more words and image paths as needed
  ];

  let hideTimeout = null;

  // Show two initial images on the screen
  showInitialImages();

  button.addEventListener('click', () => {
    recognition.start();
    button.textContent = 'Listening...';
  });

  recognition.onresult = (event) => {
    for (const result of event.results) {
      const transcript = result[0].transcript.toLowerCase();
      speechResult.textContent = transcript;

      for (const word of imageWords) {
        if (transcript.includes(word.word)) {
          removeImages();
          showImage(word.imageSrc);
          removeImageBackgroundDelayed();
          break;
        }
      }
    }
  };

  function showInitialImages() {
    for (let i = 0; i < 2; i++) {
      if (imageWords[i]) {
        showImage(imageWords[i].imageSrc);
      }
    }
  }

  function showImage(imageSrc) {
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.width = 100; // Set the width of the image
    imageElement.height = 100; // Set the height of the image
    imageElement.onerror = function () {
      this.style.display = 'none'; // Hide the image if loading fails
    };
    imageContainer.appendChild(imageElement);
  }

  function removeImages() {
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }
  }

  function removeImageBackgroundDelayed() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      removeImages();
      showRandomImage();
    }, 3000);
  }

  function showRandomImage() {
    const randomIndex = Math.floor(Math.random() * imageWords.length);
    const randomWord = imageWords[randomIndex];
    showImage(randomWord.imageSrc);
    removeImageBackgroundDelayed();
  }
}
