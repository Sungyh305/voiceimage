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
    let newImageIndex = -1;

    for (let i = images.length - 1; i >= 0; i--) {
      const image = images[i];
      if (image.src.includes(transcript)) {
        matchingImageFound = true;
        imageContainer.removeChild(image);
        break;
      }
    }

    if (!matchingImageFound && images.length < 2) {
      newImageIndex = currentImageIndex;
    }

    currentImageIndex = (currentImageIndex + 1) % 4;

    if (newImageIndex !== -1) {
      const newImage = document.createElement('img');
      newImage.src = imageUrls[newImageIndex];
      imageContainer.appendChild(newImage);
    }
  }
}
