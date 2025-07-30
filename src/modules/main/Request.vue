<template>
  <div class="request-container">
    <div class="text-area">
      <h1 class="main-text">“ 천 개의 얼굴, 천 개의 세계”</h1>
      <p class="sub-text">
        한 사람의 얼굴은 그 사람의 세계를 나타낸다. <br />
        즈믄누리와 함께 그 세계를 만들어나가세요.
      </p>
      <button class="request-button">요청하기</button>
    </div>
    <div class="image-area">
      <img src="@/assets/request_image.png" alt="요청 이미지" />
    </div>
  </div>
</template>

<style scoped>
  .request-container {
    display: flex;
    width: 1440px;
    height: 500px;
    background-color: white;
  }

  .text-area {
    flex: 0 0 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    text-align: center;
  }

  .main-text {
    font-size: 32px;
    font-weight: 700;
    color: #2e2e2e;
    margin-bottom: 16px;
  }

  .sub-text {
    font-size: 16px;
    color: #4f4f4f;
    margin-bottom: 28px;
    line-height: 1.6;
    margin-right: 47.5px;
  }

  .request-button {
    background-color: #fff1e5;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 139px;
  }

  .image-area {
    flex: 0 0 60%;
    overflow: hidden;
    position: relative;
    clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
  }

  .image-area img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>