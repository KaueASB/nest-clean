import request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

describe('Create account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  it('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toBe(201)

    const user = await prisma.user.findMany()

    expect(user[0].name).toBe('John Doe')
    expect(user).toHaveLength(1)
  })
})
