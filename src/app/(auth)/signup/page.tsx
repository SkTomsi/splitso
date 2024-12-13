import GoogleLogin from "@/components/auth/google-login";
import SignupForm from "@/components/auth/signup-form";
import Link from "next/link";

export default function SignInPage() {
	return (
		<div className="padded-container flex h-full w-full flex-col gap-10">
			<div className="flex flex-col gap-1">
				<h1 className="font-bold text-3xl tracking-tighter">
					Welcome to SplitFast
				</h1>
				<p className="text-base text-muted-foreground">
					Create an account and simplify bill splitting with friends
				</p>
			</div>

			<GoogleLogin />
			<div className="flex items-center gap-4">
				<div className="h-1 w-full border-b" />
				<div>Or</div>
				<div className="h-1 w-full border-b" />
			</div>
			<SignupForm />
			<div className="">
				<p className="text-center">
					Already have an account?{" "}
					<Link href="/login" className="underline underline-offset-4">
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
}
