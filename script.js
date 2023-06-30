const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true;
  recognition.lang = 'ko-KR';

  const button = document.querySelector('.speech-recognition');
  const speechResult = document.querySelector('.result');
  const container = document.querySelector('.container');
  const visibleImages = ['고구마.jpg', '감자.jpg'];
  const hiddenImages = ['사과.jpg', '바나나.jpg'];

  let currentVisibleIndex = 0;

  button.addEventListener('click', () => {
    recognition.start();
    button.textContent = 'Listening...';
  });

  recognition.onresult = (event) => {
    const spokenText = event.results[event.results.length - 1][0].transcript;
    speechResult.textContent = spokenText.toLowerCase();

    if (spokenText.toLowerCase() === 'next') {
      currentVisibleIndex++;
      if (currentVisibleIndex >= visibleImages.length) {
        currentVisibleIndex = 0;
      }
    }

    updateVisibleImages();
  };

  function updateVisibleImages() {
    container.innerHTML = '';

    const visibleImageSrc = visibleImages[currentVisibleIndex];
    const visibleImage = createImageElement(visibleImageSrc);
    container.appendChild(visibleImage);

    for (const hiddenImageSrc of hiddenImages) {
      const hiddenImage = createImageElement(hiddenImageSrc);
      hiddenImage.classList.add('hidden');
      container.appendChild(hiddenImage);
    }
  }

  function createImageElement(src) {
    const img = document.createElement('img');
    img.src = 'images/' + src;
    img.alt = src;
    return img;
  }
}
