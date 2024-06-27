import { cn } from '@/lib/utils'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface ButtonProps {
    icon?: React.ReactNode
    title?: string
    onPress?: () => void,
    className?: string
}

export default function ButtonLogin({ title, icon, onPress, className }: ButtonProps) {
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
                fontSize: 20
            }} 
            className='text-[#080835] text-xl'>{title}</Text>
    </TouchableOpacity>
  )
}
