<template>
  <div id="app">
    <header class="header">
      <h1>縦書きツール</h1>
    </header>

    <main class="main-content">
      <div class="input-section">
        <h2>入力</h2>
        <textarea
          v-model="textStore.inputText"
          @input="handleInput"
          placeholder="ここに文字を入力してください&#10;例： 愛知県名古屋市"
          rows="8"
          class="input-textarea"
        />

        <div class="conversion-options">
          <h3>変換オプション</h3>
          <label class="checkbox-label">
            <input type="checkbox" v-model="textStore.enableNumberConversion" />
            数字を漢数字に変換
          </label>

          <label class="checkbox-label">
            <input type="checkbox" v-model="textStore.enableDashConversion" />
            伸ばし棒(ハイフン)を全角変換
          </label>
        </div>
      </div>

      <div class="output-section">
        <h2>縦書きプレビュー</h2>
        <div class="vertical-text-container">
          <div class="vertical-text">
            {{ textStore.convertedText }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useTextStore } from "./stores/textStore";

const textStore = useTextStore();

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  textStore.updateInputText(target.value);
};
</script>

<style scoped>
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Hiragino Sans", "Yu Gothic", sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.header p {
  color: #7f8c8d;
  font-size: 14px;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.input-section,
.output-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.input-section h2,
.output-section h2 {
  color: #495057;
  margin-bottom: 15px;
  font-size: 18px;
}

.input-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  min-height: 200px;
  box-sizing: border-box;
}

.input-textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.conversion-options {
  margin-top: 20px;
}

.conversion-options h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #495057;
}

.checkbox-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  cursor: pointer;
}

.checkbox-label input {
  margin-right: 8px;
}

.vertical-text-container {
  background: white;
  min-height: 300px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-size: 24px;
  line-height: 1.8;
  color: #212529;
  white-space: pre-wrap;
  min-height: 100%;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
