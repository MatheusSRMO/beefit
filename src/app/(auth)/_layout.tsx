import { AlunoProvider } from '@/lib/aluno-context'
import { Slot } from 'expo-router'
import React from 'react'

export default function AuthenticadedLaylout() {
  return (
    <AlunoProvider>
      <Slot />
    </AlunoProvider>
  )
}
