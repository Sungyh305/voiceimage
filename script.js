const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true;
  recognition.lang = 'ko-KR';

  const button = document.querySelector('.speech-recognition');
  const speechResult = document.querySelector('.result');
  const images = [
    '고구마.jpg',
    '감자.jpg',
    '사과.jpg',
    '바나나.jpg'
  ];

  button.addEventListener('click', () => {
    recognition.start();
    button.textContent = 'Listening...';
  });

  recognition.onresult = (event) => {
    const spokenText = event.results[event.results.length - 1][0].transcript;
    speechResult.textContent = spokenText;

    const imageContainer = document.querySelector('.container');
    imageContainer.innerHTML = '';

    for (const image of images) {
      if (!image.toLowerCase().includes(spokenText.toLowerCase())) {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imageContainer.appendChild(imgElement);
      }
    }

    const remainingImages = imageContainer.querySelectorAll('img');

    if (remainingImages.length === 0) {
      const noImageText = document.createElement('p');
      noImageText.textContent = 'No more images';
      imageContainer.appendChild(noImageText);
    }
  };
}
