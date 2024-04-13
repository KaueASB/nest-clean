import { z } from 'zod'

import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UsePipes,
} from '@nestjs/common'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { QuestionPresenter } from '../presenters/question-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
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
      throw new BadRequestException()
    }

    const { questions } = result.value

    return { questions: questions.map(QuestionPresenter.toHttp) }
  }
}
