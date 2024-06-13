"use client";

import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { verifySchema } from '@/schemas/varifySchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from 'axios';
import { useParams, useRouter} from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";

const VerifyAccount = () => {

    const router = useRouter();
    const params = useParams<{username: string}>()
    const {toast} = useToast()
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
      });

      const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post<ApiResponse>(`/api/verify-code`, {
                username: params.username,
                code: data.code,
            })

            toast({
                title: "Verified Successfully",
                description: response.data.message
            })

            router.replace(`/sign-in`)
        } catch (error) {
            console.error("Error in sign up user ", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast({
              title: "Account Verification Failed",
              description: errorMessage,
              variant: "destructive",
            });
          }
      }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-3xl mb-6">
          Verify Your Account
        </h1>
        <p className="mb-4">Enter the verification code sent to your email</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit">
              verify
            </Button>
        </form>
      </Form>
    </div>
  </div>
  )
}

export default VerifyAccount