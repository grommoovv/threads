import * as z from 'zod'

const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: 'Minimum 3 characters.' })
    .max(30, { message: 'Maximum 30 caracters.' }),
  username: z
    .string()
    .min(3, { message: 'Minimum 3 characters.' })
    .max(30, { message: 'Maximum 30 caracters.' }),
  bio: z
    .string()
    .min(3, { message: 'Minimum 3 characters.' })
    .max(1000, { message: 'Maximum 1000 caracters.' }),
})

const ThreadValidation = z.object({
  thread: z.string().nonempty().min(3, { message: 'Minimum 3 characters.' }),
  accountId: z.string(),
})

const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: 'Minimum 3 characters.' }),
})

export { UserValidation, ThreadValidation, CommentValidation }
