import { getInviteCode } from "@/actions/invite.actions";
import { useQuery } from "@tanstack/react-query";

export function useGetCode() {
	return useQuery({
		queryKey: ["invite-code"],
		queryFn: async () => {
			const res = await getInviteCode();

			if (!res?.status) {
				throw new Error("Something went wrong");
			}

			return res.data;
		},
		refetchOnWindowFocus: false,
	});
}
