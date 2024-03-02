import { UseCaseError } from '@/core/errors/use-case-error'

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier?: string) {
    super(
      identifier
        ? `Student "${identifier}" already exists.`
        : 'Student with same email address already exists.',
    )
  }
}
