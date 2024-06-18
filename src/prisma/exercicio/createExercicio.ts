import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const exercicio = await prisma.exercicio.create({
            data:{
                nome: "Agachamento",
                gifLink: "GIFLink",
            }
        })
    
    console.log(exercicio);
    
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