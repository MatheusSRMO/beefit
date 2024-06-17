import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const email = "Murilo1}@gmail.com";

    const aluno = await prisma.aluno.findUnique({
            where: { email: email},
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