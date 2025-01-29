const clearBrowsingData = (minutes: number) => {
  const ms = minutes * 60 * 1000;
  const time = Date.now() - ms;
  chrome.browsingData.remove(
    {
      since: time,
    },
    {
      cache: true,
      history: true,
      downloads: true,
      formData: true,
      passwords: false,
      // 필요에 따라 다른 데이터 타입 추가 가능
    },
    () => {
      console.log(`지난 ${minutes}분 동안의 데이터가 삭제되었습니다.`);
    }
  );
};
document.getElementById('submitButton')?.addEventListener('click', () => {
  const inputElement = document.getElementById(
    'minutesInput'
  ) as HTMLInputElement | null;
  if (inputElement) {
    const minutes = parseInt(inputElement.value, 10);
    if (!isNaN(minutes)) {
      clearBrowsingData(minutes);
      inputElement.value = '';
    } else {
      console.error('유효하지 않은 숫자입니다.');
    }
  }
});
