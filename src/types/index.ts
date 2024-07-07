declare type User = {
    id: number;
    clerkId: string;
    email: string;
    username: string;
    photo: string;
    firstName?: string | null;
    lastName?: string | null;
    role: "USER" | "TRAINER" | "ADMIN";
    createdAt: Date;
    updatedAt: Date;
    alunos: Aluno[];
};

declare type Aluno = {
    id: number;
    clerkId: string;
    firstName: string;
    lastName: string;
    age: number;
    weight: number;
    height: number;
    goal?: string | null;
    observation?: string | null;
    url?: string | null;
    createdAt: Date;
    updatedAt: Date;
    treinos: Treino[];
    user: User;
    userId: number;
};

declare type Treino = {
    id: number;
    aluno: Aluno;
    alunoId: number;
    exercicios: TreinoExercicio[];
    finalizado: boolean;
    createdAt: Date;
    updatedAt: Date;
};

declare type Exercicio = {
    id: number;
    nome: string;
    gifLink: string;
    repeticoes: number;
    series: number;
    peso: number;
    observacao?: string | null;
    treinos: TreinoExercicio[];
    createdAt: Date;
    updatedAt: Date;
};

declare type TreinoExercicio = {
    treino: Treino;
    treinoId: number;
    exercicio: Exercicio;
    exercicioId: number;
};
