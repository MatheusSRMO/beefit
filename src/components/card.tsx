import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import clsx from 'clsx'
import { cn } from '@/lib/utils'

interface CardProps {
  children?: React.ReactNode
  isFocused: boolean
  className?: string
}

export default function Card({ isFocused, children, className }: CardProps) {
  return (
    <View 
      className={clsx('w-[280px] h-[420px] bg-[#558fb4] rounded-3xl justify-center items-center', className)}
      style={StyleSheet.flatten([
        styles.card,
        isFocused && styles.focusedCard,
      ])}
    >
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 7.2,
    transform: [{ scale: 0.9 }],
  },
  focusedCard: {
    transform: [{ scale: 1 }],
  },
})
