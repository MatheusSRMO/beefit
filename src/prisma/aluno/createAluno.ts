import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const numAluno = await prisma.aluno.count();
    const aluno = await prisma.aluno.create({
            data:{
                nome: "Murilo",
                email: `Murilo${numAluno}@gmail.com`,
                senha: "Murilo123",
            }
        })
    
    console.log(aluno);
    
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })