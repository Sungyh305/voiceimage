const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true;
  recognition.lang = 'ko-KR';

  const button = document.querySelector('.start-listening');
  const speechResult = document.querySelector('.result');
  const mainImage = document.getElementById('mainImage');
  const secondaryImage = document.getElementById('secondaryImage');
  const imageUrls = ['고구마.jpg', '감자.jpg', '사과.jpg', '바나나.jpg'];
  let currentImageIndex = 0;

  button.addEventListener('click', () => {
    if (recognition.continuous) {
      recognition.stop();
      button.textContent = 'Start Listening!';
    } else {
      recognition.start();
      button.textContent = 'Listening...';
    }
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    speechResult.textContent = transcript;
    changeImage(transcript);
  };

  function changeImage(transcript) {
    const matchingImageIndex = imageUrls.findIndex(url => transcript.includes(url.replace('.jpg', '')));

    if (matchingImageIndex !== -1) {
      imageUrls.splice(matchingImageIndex, 1); // Remove the matching image from the array
      const newImageIndex = currentImageIndex % imageUrls.length;
      mainImage.src = imageUrls[newImageIndex];
      secondaryImage.src = imageUrls[(newImageIndex + 1) % imageUrls.length];
      currentImageIndex = newImageIndex;
    }
  }
}
