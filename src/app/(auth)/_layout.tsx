import { AlunoProvider } from '@/lib/aluno-context'
import { TreinoProvider } from '@/lib/treino-context'
import { Slot } from 'expo-router'
import React from 'react'

export default function AuthenticadedLaylout() {
  return (
    <AlunoProvider>
      <TreinoProvider>
        <Slot />
      </TreinoProvider> 
    </AlunoProvider>
  )
}
