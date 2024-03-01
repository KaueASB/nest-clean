import { Question as PrismaQuestion, Prisma } from '@prisma/client'

import { Question } from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export class PrismaQuestionMapper {
  static toDomain(question: PrismaQuestion): Question {
    return Question.create(
      {
        title: question.title,
        content: question.content,
        slug: Slug.create(question.slug),
        authorId: new UniqueEntityID(question.authorId),
        bestAnswerId: question.bestAnswerId
          ? new UniqueEntityID(question.bestAnswerId)
          : null,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      },
      new UniqueEntityID(question.id),
    )
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
