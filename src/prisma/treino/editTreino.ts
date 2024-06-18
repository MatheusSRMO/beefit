import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const treinoUpdate = await prisma.treino.update({
            where: { id: 1},
            data:{
                id: 1,
            }
        })
    
    console.log(treinoUpdate);
    
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