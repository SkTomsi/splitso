import { Button } from "@/components/ui/button";
import { IconBrandGoogle, IconLoader } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <IconLoader className="animate-spin" />;
  }
  return (
    <>
      {status === "authenticated" ? (
        <div className="flex items-center gap-x-2 font-bold tracking-tighter">
          <p className="hidden text-balance md:block">
            Welcome back, {data?.user?.name}
          </p>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      ) : (
        <Button onClick={() => signIn("google")} variant="default">
          <IconBrandGoogle className="mr-2" />
          Sign In
        </Button>
      )}
    </>
  );
}
