import { ref } from 'vue'

/* 创建一个布尔值hooks */
export default function useBoolean(initValue = false) {
  const bool = ref(initValue)

  function setBool(value: boolean) {
    bool.value = value
  }

  function setTrue() {
    setBool(true)
  }

  function setFalse() {
    setBool(false)
  }

  function toggle() {
    setBool(!bool.value)
  }

  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle
  }
}
