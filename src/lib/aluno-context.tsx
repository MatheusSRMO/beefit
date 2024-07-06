import { useAuth } from '@clerk/clerk-expo';
import axios from 'axios';
import React, { createContext, useState } from 'react';

// Create the context
const AlunoContext = createContext<Aluno | null>(null);

// Create the provider component
const AlunoProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [aluno, setAluno] = useState<Aluno | null>(null);

  React.useEffect(() => {
    (
      async () => {
        if (!isLoaded) return;

        const url = `https://beefit-admin.vercel.app/api/aluno/${userId}`;
        console.log(url)

        const response = await axios.get(url);

        console.log(response.data)

        if (response.data.status !== 200) {
          console.error('Failed to fetch the data from the server');
          return;
        }

        setAluno(response.data.body);
      }
    )();
  }, [isLoaded, isSignedIn, userId]);

  // if (!aluno) {
  //   (
  //     async () => {
  //       if (!isLoaded) return;

  //       console.log(userId);

  //       const url = `https://beefit-admin.vercel.app/api/aluno/${userId}`;
  //       const response = await axios.get(url);

  //       console.log(response.data)

  //       if (response.data.status !== 200) {
  //         console.error('Failed to fetch the data from the server');
  //         return;
  //       }

  //       setAluno(response.data.body);
  //     }
  //   )();
  // }

  return (
    <AlunoContext.Provider value={aluno}>
      {children}
    </AlunoContext.Provider>
  );
};

export { AlunoContext, AlunoProvider };