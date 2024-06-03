import { TextInput as RNTextInput } from 'react-native'
import React from 'react'
import { cn } from '@/lib/utils'

interface TextInputProps {
  value: string
  setValue: (value: string) => void
  type: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'twitter' | 'web-search'
  placeholder: string
  className?: string
}

export default function TextInput({ value, setValue, type, placeholder, className }: TextInputProps) {
  return (
    <RNTextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      className={cn('bg-[#21175C] text-[#FFDC98] text-xl px-10 py-3 w-9/12 rounded-3xl placeholder:text-[#FFDC98]', className)}
      keyboardType={type}
    />
  )
}