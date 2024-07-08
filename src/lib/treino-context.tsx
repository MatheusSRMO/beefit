import React, { createContext, useState } from 'react';

interface TreinoContextType {
	exercisesDone: number;
	setExercisesDone : React.Dispatch<React.SetStateAction<number>>;
}
  
const TreinoContext = createContext<TreinoContextType>({
	exercisesDone: 0,
  setExercisesDone : () => {},
});

const TreinoProvider = ({ children }: { children: React.ReactNode }) => {
	const [exercisesDone, setExercisesDone] = useState<number>(0);

	const incrementExercisesDone = () => {
		console.log("oi", exercisesDone)
		setExercisesDone(prev => prev + 1);
		console.log("hey", exercisesDone)
	};

	return (
		<TreinoContext.Provider value={{ exercisesDone, setExercisesDone  }}>
		{children}
		</TreinoContext.Provider>
	);
};

export { TreinoContext, TreinoProvider };