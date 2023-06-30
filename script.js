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
    { word: '고구마', imageSrc: 'images/고구마.jpg ' },
    // 다양한 단어와 이미지 경로를 추가합니다.
  ];

  let hideTimeout = null;

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
          showImage(word.imageSrc);
          removeImageBackgroundDelayed();
          break;
        }
      }
    }
  };

  function showImage(imageSrc) {
    clearTimeout(hideTimeout);
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageContainer.appendChild(imageElement);
  }

  function removeImageBackgroundDelayed() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
      }
    }, 3000);
  }
}
