import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTextStore = defineStore("text", () => {
  // 状態
  const inputText = ref("");
  const enableNumberConversion = ref(true);
  const enableDashConversion = ref(true);

  // 変換ロジック
  const convertedText = computed(() => {
    let result = inputText.value;

    if (enableNumberConversion.value) {
      result = convertNumbers(result);
    }

    if (enableDashConversion.value) {
      // ハイフンを全角ハイフンに変換
      // 記号は縦表示になるため、全角ハイフンに変換することで綺麗に表示される
      result = result.replace(/[-]/g, "ー");
    }

    return result;
  });

  // アクション
  const updateInputText = (text: string) => {
    inputText.value = text;
  };

  const toggleNumberConversion = () => {
    enableNumberConversion.value = !enableNumberConversion.value;
  };

  const toggleDashConversion = () => {
    enableDashConversion.value = !enableDashConversion.value;
  };

  return {
    // 状態
    inputText,
    enableNumberConversion,
    enableDashConversion,
    // 計算プロパティ
    convertedText,
    // アクション
    updateInputText,
    toggleNumberConversion,
    toggleDashConversion,
  };
});

// 数字変換関数
function convertNumbers(text: string): string {
  const numberMap: { [key: string]: string } = {
    "0": "〇",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "7": "七",
    "8": "八",
    "9": "九",
  };

  return text.replace(/[0-9]/g, (match) => numberMap[match] || match);
}
