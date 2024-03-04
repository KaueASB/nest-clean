import { User as PrismaUser, Prisma } from '@prisma/client'

import { Student } from '@/domain/forum/enterprise/entities/student'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class PrismaStudentMapper {
  static toDomain(student: PrismaUser): Student {
    return Student.create(
      {
        name: student.name,
        email: student.email,
        password: student.password,
      },
      new UniqueEntityID(student.id),
    )
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}
