"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";

export function RegisterForm (): JSX.Element
{
  const [ error, setError ] = useState<string | undefined>( "" );
  const [ success, setSuccess ] = useState<string | undefined>( "" );
  
  const [ isPending, startTransition ] = useTransition();
  
  const form = useForm<z.infer<typeof RegisterSchema>>( {
    resolver:      zodResolver( RegisterSchema ),
    defaultValues: {
      email:    "",
      password: "",
      name:     "",
    },
  } );
  
  const onSubmit = async ( values: z.infer<typeof RegisterSchema> ): Promise<void> =>
  {
    setError( "" );
    setSuccess( "" );
    
    startTransition( async (): Promise<void> =>
    {
      const response = await register( values );
      setError( response.error );
      setSuccess( response.success );
    } );
  };
  
  return (
    <CardWrapper
      headerLabel={"Create an account"}
      backButtonLabel={"Already have an account?"}
      backButtonHref={"/auth/login"}
      showSocial>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit( onSubmit )}
          className={"space-y-6"}
        >
          <div className={"space-y-4"}>
            <FormField
              control={form.control}
              name={"name"}
              render={( { field } ) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={"John Smith"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"email"}
              render={( { field } ) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={"john.smith@example.com"}
                      type={"email"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"password"}
              render={( { field } ) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={"********"}
                      type={"password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type={"submit"}
            className={"w-full"}
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}