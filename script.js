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
    const transcript = event.results[0][0].transcript;
    speechResult.textContent = transcript;
    changeImage(transcript);
  };

  function preloadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = reject;
      image.src = url;
    });
  }

  async function changeImage(transcript) {
    await preloadImage(imageUrls[currentImageIndex]);

    const images = Array.from(imageContainer.querySelectorAll('img'));
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
      images[matchingImageIndex].parentNode.removeChild(images[matchingImageIndex]);
      currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
    }

    if (images.length < 2) {
      const newImageIndex = currentImageIndex;
      await preloadImage(imageUrls[newImageIndex]);
      const newImage = document.createElement('img');
      newImage.src = imageUrls[newImageIndex];
      imageContainer.appendChild(newImage);
      currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
    }
  }
}
