'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const formSchema = z.object({
  title: z.string().min(1),
  url: z.string().optional(),
  content: z.string().min(1),
})

export async function submitPost(data: z.infer<typeof formSchema>) {
  const validated = formSchema.safeParse(data)

  if (!validated.success) {
    throw new Error('Invalid form data')
  }

  const { title, url, content } = validated.data

  await prisma.post.create({
    data: {
      title,
      url: url || null,
      content,
    },
  })
}