'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/providers/AuthProvider'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { submitPost } from '@/app/actions/submit-post'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
  content: z.string().min(1, 'Content is required'),
})

export default function SubmitForm() {
  const router = useRouter()
  const { user, loading } = useAuth()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      url: '',
      content: '',
    },
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Double-check user is logged in
      if (!user) {
        router.push('/login')
        return
      }
      
      await submitPost({
        ...values,
        userId: user.id
      })
      
      toast.success('Post submitted successfully!')
      form.reset()
      router.push('/')
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the post.')
    }
  }

  // Show loading state or nothing while checking auth
  if (loading || !user) {
    return null // Or return a loading spinner if you prefer
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>Share any helpful links (optional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write more context..." className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Give us some more detail about your post</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Show the post will be submitted by this user */}
        <div className="text-sm text-muted-foreground">
          Posting as: <span className="font-medium">{user.email}</span>
        </div>

        <Button type="submit" className="cursor-pointer">Submit</Button>
      </form>
    </Form>
  )
}