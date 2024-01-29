import {
  // Body,
  // ConflictException,
  Controller,
  Post,
  // UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
// import { hash } from 'bcrypt'
// import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
// import { z } from 'zod'

// const createAccountBodySchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string(),
// })

// type CreateAccountBodyDTO = z.infer<typeof createAccountBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  // @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(/* @Body() body: CreateAccountBodyDTO */) {
    const token = this.jwt.sign({
      sub: 'user-01',
    })

    return token
  }
}
