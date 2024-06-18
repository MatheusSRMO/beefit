import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const exercicioUpdate = await prisma.exercicio.update({
            where: { id: 1},
            data:{
                id: 1,
                nome: "LegPress",
            }
        })
    
    console.log(exercicioUpdate);
    
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