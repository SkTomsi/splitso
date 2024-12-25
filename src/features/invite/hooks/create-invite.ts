import { GenerateInviteLinkAction } from "@/actions/invite.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateInvite() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const res = await GenerateInviteLinkAction();

			if (!res?.status) {
				throw new Error("Something went wrong");
			}

			return res;
		},

		onSuccess: () => {
			queryClient.invalidateQueries();
		},
	});
}
