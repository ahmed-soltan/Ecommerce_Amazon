"use client"
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    businessName:z.string().min(3,{
        message:"Business name must be at least 3 characters."
    })
})

const BusinessForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    })

  return (
    <Form {...form}>
        <form className='space-y-4'></form>
    </Form>       
  )
}

export default BusinessForm