'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'


type SubmitPostData = {
  title: string;
  url?: string;
  content: string;
  userId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
  url: z.string().optional(),
  content: z.string().min(1),
})

export async function submitPost(data: SubmitPostData) {
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
      userId: data.userId,
    },
  })
}