import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const allAlunos = await prisma.aluno.findMany();

    if( allAlunos.length === 0 )
        console.log("No aluno found on database.");
    else    
        console.log(allAlunos);
    
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