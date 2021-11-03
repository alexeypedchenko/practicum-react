import { useState } from 'react'

interface ICallBacks {
  onOpen?: () => void;
  onClose?: () => void;
}

interface IDisclosure {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const useDisclosure = (initialState: boolean = false, { onOpen, onClose }: ICallBacks): IDisclosure => {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = () => {
    setIsOpen(true)
    if (typeof onOpen === 'function') {
      onOpen()
    }
  }

  const close = () => {
    setIsOpen(false)
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  const toggle = () => {
    isOpen ? close() : open()
  }

  return {
    isOpen,
    toggle,
    open,
    close
  }
}
