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
    { word: '고구마', imageSrc: 'https://github.com/Sungyh305/voiceimage/blob/main/%EA%B3%A0%EA%B5%AC%EB%A7%88.jpg' }
  ];

  let hideTimeout = null;
  let displayedImages = []; // 현재 표시 중인 이미지들의 배열

  // 초기에 2개의 이미지를 표시합니다.
  displayInitialImages();

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
          removeImage();
          showImage(word.imageSrc);
          removeImageBackgroundDelayed();
          break;
        }
      }
    }
  };

  function displayInitialImages() {
    const initialImages = imageWords.slice(0, 2);
    for (const image of initialImages) {
      showImage(image.imageSrc);
    }
  }

  function showImage(imageSrc) {
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.width = 200;
    imageElement.height = 200;
    imageElement.onerror = function () {
      this.style.display = 'none';
    };
    imageContainer.appendChild(imageElement);
    displayedImages.push(imageElement); // 표시 중인 이미지 배열에 추가
  }

  function removeImage() {
    if (displayedImages.length > 0) {
      const removedImage = displayedImages.shift(); // 첫 번째 이미지를 제거
      imageContainer.removeChild(removedImage);
    }
  }

  function removeImageBackgroundDelayed() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      removeImage();
    }, 3000);
  }
}
