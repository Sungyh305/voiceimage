const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true;
  recognition.lang = 'ko-KR';

  const button = document.querySelector('.speech-recognition');
  const speechResult = document.querySelector('.result');
  const mainImage = document.getElementById('mainImage');
  const secondaryImage = document.getElementById('secondaryImage');
  const imageUrls = ['고구마.jpg', '감자.jpg', '사과.jpg', '바나나.jpg'];
  let currentImageIndex = 0;
  let timer;

  button.addEventListener('click', () => {
    recognition.start();
    button.textContent = 'Listening...';
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    speechResult.textContent = transcript;
    changeImage(transcript);
  };

  function changeImage(transcript) {
    const matchingImageIndex = imageUrls.findIndex(url => transcript.includes(url.replace('.jpg', '')));

    if (matchingImageIndex !== -1) {
      clearTimeout(timer);
      imageUrls.splice(matchingImageIndex, 1);
      mainImage.src = imageUrls[currentImageIndex];
      mainImage.classList.add('highlighted');
      secondaryImage.style.opacity = 0;
      timer = setTimeout(() => {
        mainImage.classList.remove('highlighted');
        secondaryImage.style.opacity = 1;
      }, 3000);
      currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
    }
  }
}
