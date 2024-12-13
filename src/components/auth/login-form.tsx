"use client";
import { CredentialsAction } from "@/actions/auth.actions";
import { LoginSchema } from "@/lib/zod/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FormError } from "./form-status";
import { Loader2 } from "lucide-react";

interface IFormStatus {
	message?: string;
	status?: boolean | null;
}

export default function LoginForm() {
	const [formStatus, setFormStatus] = useState<IFormStatus>({
		message: "",
		status: null,
	});

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function handleLogin(formData: z.infer<typeof LoginSchema>) {
		const result = await LoginSchema.safeParseAsync(formData);

		if (!result.success) {
			throw new Error("Invalid form data");
		}

		const res = await CredentialsAction(formData);

		if (!res.status) {
			setFormStatus(res);
		}

		setFormStatus(res);
	}

	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-4 px-2"
					onSubmit={form.handleSubmit(handleLogin)}
				>
					<FormField
						name="email"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Enter your email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="password"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder="Enter your password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormError message={formStatus.message} status={formStatus.status} />
					<Button className="h-12 w-full">
						{form.formState.isSubmitting && (
							<Loader2 className="mr-1 h-5 w-5 animate-spin" />
						)}
						Login
					</Button>
				</form>
			</Form>
		</>
	);
}
