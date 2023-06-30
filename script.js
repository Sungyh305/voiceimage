const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true;
  recognition.lang = 'ko-KR';

  const button = document.querySelector('.speech-recognition');
  const speechResult = document.querySelector('.result');
  const imageContainer = document.querySelector('.image-container');
  const imageUrls = ['고구마.jpg', '감자.jpg', '사과.jpg', '바나나.jpg'];
  let currentImageIndex = 0;

  button.addEventListener('click', () => {
    recognition.start();
    button.textContent = 'Listening...';
  });

  recognition.onresult = (event) => {
    for (const result of event.results) {
      speechResult.textContent = result[0].transcript;
      changeImage();
    }
  };

  function changeImage() {
    const images = imageContainer.querySelectorAll('img');
    if (images.length < 2) {
      const newImage = document.createElement('img');
      newImage.src = imageUrls[currentImageIndex];
      imageContainer.appendChild(newImage);
    } else if (images.length === 2) {
      images[1].src = imageUrls[currentImageIndex];
    }

    currentImageIndex = (currentImageIndex + 1) % 4;

    if (images.length > 2) {
      imageContainer.removeChild(images[0]);
    }
  }
}
