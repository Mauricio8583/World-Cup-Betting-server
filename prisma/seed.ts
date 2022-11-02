import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'http://github.com/Mauricio8583.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
        
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.436Z',
            firstTeamCode: 'DE',
            secondTeamCode: 'BR'
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-04T12:00:00.436Z',
            firstTeamCode: 'BR',
            secondTeamCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 0,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                },

                
            }
        }
    })
}

main()