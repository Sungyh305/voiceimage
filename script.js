const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true;
  recognition.lang = 'ko-KR';

  const button = document.querySelector('.speech-recognition');
  const speechResult = document.querySelector('.result');
  const imageContainer = document.querySelector('.image-container');
  const imageWords = [
    { word: '사과', imageSrc: 'images/사과.jpg' },
    { word: '바나나', imageSrc: 'images/바나나.jpg' },
    { word: '감자', imageSrc: 'images/감자.jpg' },
    { word: '고구마', imageSrc: 'images/고구마.jpg' },
    // 다양한 단어와 이미지 경로를 추가합니다.
  ];

  let hideTimeout = null;

  // 초기에 두 개의 이미지를 표시합니다.
  showImage(imageWords[0].imageSrc);
  showImage(imageWords[1].imageSrc);

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

  function showImage(imageSrc) {
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.width = 200; // 이미지의 가로 크기를 설정합니다.
    imageElement.height = 200; // 이미지의 세로 크기를 설정합니다.
    imageElement.onerror = function () {
      this.style.display = 'none'; // 이미지 로딩에 실패하면 숨깁니다.
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
    }, 3000);
  }
}
