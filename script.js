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
      changeImage(result[0].transcript);
    }
  };

  function changeImage(transcript) {
    const images = imageContainer.querySelectorAll('img');
    let matchingImageFound = false;
    let matchingImageIndex = -1;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.src.includes(transcript)) {
        matchingImageFound = true;
        matchingImageIndex = i;
        break;
      }
    }

    if (matchingImageFound) {
      imageContainer.removeChild(images[matchingImageIndex]);
    }

    if (images.length < 2) {
      const newImageIndex = (currentImageIndex + 1) % 4;
      const newImage = document.createElement('img');
      newImage.src = imageUrls[newImageIndex];
      imageContainer.appendChild(newImage);
      currentImageIndex = newImageIndex;
    }
  }
}
