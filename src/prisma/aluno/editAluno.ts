import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const alunoUpdate = await prisma.aluno.update({
            where: { id: 1},
            data:{
                id: 1,
                nome: "Murilo",
                senha: "Murilo123",
            }
        })
    
    console.log(alunoUpdate);
    
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