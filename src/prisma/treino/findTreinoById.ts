import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const id = 1;

    const treino = await prisma.treino.findUnique({
            where: { id: id},
        })
    
    console.log(treino);
    
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