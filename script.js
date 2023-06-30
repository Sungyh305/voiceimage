const API = window.SpeechRecognition || window.webkitSpeechRecognition;

if (API) {
  const recognition = new API();

  recognition.continuous = true;
  recognition.lang = 'ko-KR';

  const button = document.querySelector('.speech-recognition');
  const speechResult = document.querySelector('.result');
  const imageContainer = document.querySelector('.image-container');
  const imageUrls = [
    { word: '사과', url: 'https://cdn.mkhealth.co.kr/news/photo/202010/50970_51164_4758.jpg' },
    { word: '바나나', url: 'https://health.chosun.com/site/data/img_dir/2022/05/04/2022050401754_0.jpg' },
    { word: '오렌지', url: 'http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2016/12/13/20161213000681_0.jpg' },
    // 다양한 단어와 이미지 URL을 추가합니다.
  ];

  let hideTimeout = null;

  button.addEventListener('click', () => {
    recognition.start();
    button.textContent = 'Listening...';
  });

  recognition.onresult = (event) => {
    for (const result of event.results) {
      const transcript = result[0].transcript.toLowerCase();
      speechResult.textContent = transcript;

      for (const image of imageUrls) {
        if (transcript.includes(image.word)) {
          showImage(image.url);
          removeImageBackgroundDelayed();
          break;
        }
      }
    }
  };

  function showImage(url) {
    clearTimeout(hideTimeout);
    imageContainer.style.backgroundImage = `url(${url})`;
  }

  function removeImageBackgroundDelayed() {
    clearTimeout(hideTimeout); // 이전에 예약된 사라짐 타이머를 취소합니다.
    hideTimeout = setTimeout(() => {
      imageContainer.style.backgroundImage = 'none';
    }, 3000); // 3초 후에 그림이 사라지도록 합니다.
  }
}
