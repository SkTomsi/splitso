import { getInviteCode } from "@/actions/invite.actions";
import JoinButton from "@/features/invite/components/join-button";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{ code: string }>;
}) {
	const { code } = await params;

	if (!code) {
		return <div>No code found</div>;
	}

	const session = await auth();

	if (!session?.user) {
		redirect(`/signup?code=${code}`);
	}

	const invite = await getInviteCode();

	if (invite.data?.userId === session.user.id) {
		redirect("/home");
	}

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-10 bg-gradient-to-b from-primary/5 to-primary/20 px-20 py-10">
			<div className="flex h-full w-full flex-col items-center justify-center gap-4">
				<div className="space-y-4">
					<h1 className="text-center font-bold text-6xl text-primary tracking-tighter">
						welcome to splitfast
					</h1>
					<p className="text-center">{`Hey ${session.user.name},you have been invited to join SplitFast, click the button below to join`}</p>
				</div>
				<JoinButton code={code} />
			</div>
		</div>
	);
}
