"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const ConfirmUserForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.refresh();
          router.push('/vendor-register')
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    } catch (error) {
      console.error("Error during Confirming User:", error);
      toast.error("Something went wrong");
    } finally {
      router.push("/");
    }
  };

  return (
    <div className=" h-full w-full">
      <div className="flex flex-col items-start w-full gap-5">
        <h1 className="text-slate-700 text-2xl">Confirm User</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter password" {...field} type="password"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button
              className="w-full md:w-auto"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Submit
            </Button>
          </form>
        </Form>
        <p>
          Don&apos;t Have an Account ?{" "}
          <Link href={"/register"} className="underline text-blue-400">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ConfirmUserForm;
