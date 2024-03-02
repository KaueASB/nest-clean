import { z } from 'zod'

import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common'

import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(
    private fetchRecentQuestionUseCase: FetchRecentQuestionsUseCase,
  ) {}

  @Get()
  @UsePipes(new ZodValidationPipe(pageQueryParamSchema))
  async handle(@Query('page') page: PageQueryParamSchema) {
    const result = await this.fetchRecentQuestionUseCase.execute({
      page,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const { questions } = result.value

    return { questions }
  }
}
