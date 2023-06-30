const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true;
  recognition.lang = 'ko-KR';

  const button = document.querySelector('.speech-recognition');
  const speechResult = document.querySelector('.result');
  const imageContainer = document.querySelector('.image-container');
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

    const matchingImage = images.find(image => image.toLowerCase().includes(spokenText.toLowerCase()));
    if (matchingImage) {
      images.splice(images.indexOf(matchingImage), 1);
    }

    imageContainer.innerHTML = '';

    for (const image of images) {
      const imgElement = document.createElement('img');
      imgElement.src = image;
      imageContainer.appendChild(imgElement);
    }

    if (images.length === 0) {
      imageContainer.textContent = 'No more images';
    }
  };
}
