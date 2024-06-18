import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const id = 4;

    await prisma.exercicio.delete({
        where: { id: id }
    });
    
    console.log("Exercicio deleted sucessfully!");
    
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