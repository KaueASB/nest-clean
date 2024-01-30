import request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Fetch recent questions (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          authorId: user.id,
          title: 'Question 01',
          content: 'Content 01',
          slug: 'question-01',
        },
        {
          authorId: user.id,
          title: 'Question 02',
          content: 'Content 02',
          slug: 'question-02',
        },
      ],
      skipDuplicates: true,
    })

    const response = await request(app.getHttpServer())
      .get('/questions?page=1')
      .auth(accessToken, { type: 'bearer' })

    expect(response.status).toBe(200)
    expect(response.body.questions).toHaveLength(2)
  })
})
