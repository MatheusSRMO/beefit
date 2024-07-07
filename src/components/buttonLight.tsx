import { cn } from '@/lib/utils'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
  icon?: React.ReactNode
  title?: string
  onPress?: () => void,
  className?: string
}

export default function ButtonLight({ title, icon, onPress, className }: ButtonProps) {
  return (
    <TouchableOpacity className={
      cn(
        'bg-primary',
        'p-4',
        'rounded-2xl',
        'flex',
        'items-center',
        'justify-center',
        className
      )
    } onPress={onPress}>
      {/* Renderiza um icone se tiver */}
      {icon && icon}
      <Text 
        style={{
          fontFamily: 'Roboto_700Bold',
          fontSize: 36
        }}
        className='text-[#080835] py-2 rounded-2xl'
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}
