import React from 'react'
import { TouchableOpacity, View } from 'react-native'

interface ButtonProps {
    title: string
    onPress: () => void
}

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity className='' onPress={onPress}>
        {title}

    </TouchableOpacity>
  )
}
