import Fastfy from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'

const prisma = new PrismaClient({
    log: ['query'],    
})


async function bootstrap(){
    const fastify = Fastfy({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    fastify.get('/pools/count', async () => {
        
        const pools = await prisma.pool.count()
        
        
        return { pools }
    })

    
    await fastify.listen({port: 4000, host: "0.0.0.0"})
}


bootstrap()