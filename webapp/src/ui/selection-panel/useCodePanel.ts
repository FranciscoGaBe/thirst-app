import { useState } from 'react'

interface UseCodePanelConfig {
  onFullCode: (code: string, clearCode: () => void) => Promise<void>
}

interface UseCodePanelOutput {
  code: string
  addKey: (key: string) => void
}

export const useCodePanel = ({ onFullCode }: UseCodePanelConfig): UseCodePanelOutput => {
  const [code, setCode] = useState('')

  const clear = (): void => {
    setCode('')
  }

  const addToCode = (code: string, key: string): void => {
    const newCode = `${code}${key}`
    setCode(newCode)
    if (newCode.length < 3) {
      return
    }
    void onFullCode(newCode, clear)
  }

  const addKey = (key: string): void => {
    if (key === 'C') {
      clear()
      return
    }
    if (code.length > 2) {
      return
    }
    if (code.length > 0 && key === 'A') {
      return
    }
    if (code.length === 0 && key !== 'A') {
      return
    }

    addToCode(code, key)
  }

  return {
    code,
    addKey
  }
}
