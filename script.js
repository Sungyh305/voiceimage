const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true;
  recognition.lang = 'ko-KR';

  const button = document.querySelector('.speech-recognition');
  const speechResult = document.querySelector('.result');
  const images = document.querySelectorAll('img');
  const hiddenClass = 'hidden';

  button.addEventListener('click', () => {
    recognition.start();
    button.textContent = 'Listening...';
  });

  recognition.onresult = (event) => {
    const spokenText = event.results[event.results.length - 1][0].transcript;
    speechResult.textContent = spokenText;

    for (const image of images) {
      if (image.alt.toLowerCase().includes(spokenText.toLowerCase())) {
        image.classList.add(hiddenClass);
      } else {
        image.classList.remove(hiddenClass);
      }
    }
  };
}
