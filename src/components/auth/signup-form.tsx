"use client";
import { CredentialsAction, UserSignup } from "@/actions/auth.actions";
import { SignUpSchema } from "@/lib/zod/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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

interface IFormStatus {
	message?: string;
	status?: boolean | null;
}

export default function SignupForm() {
	const [formStatus, setFormStatus] = useState<IFormStatus>({
		message: "",
		status: null,
	});

	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const handleLogin = async (formData: z.infer<typeof SignUpSchema>) => {
		try {
			const result = await SignUpSchema.safeParseAsync(formData);

			if (!result.success) {
				throw new Error("Invalid form data");
			}

			const response = await UserSignup(formData);

			if (!response.status) {
				setFormStatus(response);
				return false;
			}

			setFormStatus(response);
			await CredentialsAction(formData);
		} catch (_error) {
			// biome-ignore lint/suspicious/noConsoleLog: <needed here>
			console.log(_error);
			throw _error;
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-4 px-2"
					onSubmit={form.handleSubmit(handleLogin)}
				>
					<FormField
						name="username"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your username"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
									<Input
										placeholder="Enter your password"
										type="password"
										{...field}
									/>
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
						Create Account
					</Button>
				</form>
			</Form>
		</>
	);
}
