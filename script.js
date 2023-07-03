const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true; // 연속적인 음성 입력을 허용합니다.
  recognition.lang = 'ko-KR'; // 인식할 언어를 설정합니다. 여기서는 한국어로 설정되어 있습니다.

  const button = document.querySelector('.speech-recognition');
  const speechResult = document.querySelector('.result');
  const mainImage = document.getElementById('mainImage');
  const imageUrls = ['고구마.jpg', '감자.jpg', '사과.jpg', '바나나.jpg'];
  let currentImageIndex = 0;

  button.addEventListener('click', () => {
    recognition.start(); // 음성 인식을 시작합니다.
    button.textContent = 'Listening...';
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript; // 음성 인식 결과에서 변환된 텍스트를 가져옵니다.
    speechResult.textContent = transcript;
    changeImage(transcript);
  };

  function changeImage(transcript) {
    const matchingImageIndex = imageUrls.findIndex(url => transcript.includes(url.replace('.jpg', '')));
    // 음성 인식 결과와 이미지 파일명을 비교하여 일치하는 이미지의 인덱스를 찾습니다.

    if (matchingImageIndex !== -1) {
      imageUrls.splice(matchingImageIndex, 1); // 일치하는 이미지를 배열에서 제거합니다.
      const newImageIndex = currentImageIndex % imageUrls.length;
      mainImage.src = imageUrls[newImageIndex];
      currentImageIndex = newImageIndex;
      // 일치하는 이미지를 현재 이미지로 설정하고, 이미지 인덱스를 업데이트합니다.
    }
  }
}
