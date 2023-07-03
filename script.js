const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true;
  recognition.lang = 'ko-KR';

  const button = document.querySelector('.speech-recognition');
  const speechResult = document.querySelector('.result');
  const mainImage = document.getElementById('mainImage');
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
      const newImageIndex = matchingImageIndex;
      mainImage.classList.add('hidden');
      const imageElements = document.querySelectorAll('.image-container img');
      imageElements.forEach((img, index) => {
        if (index === currentImageIndex) {
          img.classList.remove('highlighted');
        }
      });
      clearTimeout(timer);
      timer = setTimeout(() => {
        mainImage.src = imageUrls[newImageIndex];
        mainImage.classList.remove('hidden');
        imageElements.forEach((img, index) => {
          if (index === newImageIndex) {
            img.classList.add('highlighted');
          }
        });
        currentImageIndex = newImageIndex;
        setTimeout(() => {
          mainImage.classList.add('hidden');
          imageElements.forEach((img, index) => {
            if (index === newImageIndex) {
              img.classList.remove('highlighted');
            }
          });
        }, 3000);
      }, 0);
    }
  }
}
