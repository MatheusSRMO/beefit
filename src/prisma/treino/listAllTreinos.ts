import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const allTreinos = await prisma.treino.findMany();

    if( allTreinos.length === 0 )
        console.log("No treino found on database.");
    else    
        console.log(allTreinos);
    
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