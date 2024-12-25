import { InviteJoinAction } from "@/actions/invite.actions";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export function useInviteJoin() {
	return useMutation({
		mutationFn: async (code: string) => {
			const res = await InviteJoinAction(code);

			if (!res?.status) {
				throw new Error("Something went wrong");
			}

			return res;
		},
		onSuccess: () => {
			redirect("/home");
		},
	});
}
