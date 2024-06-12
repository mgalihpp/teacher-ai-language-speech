import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type UserDropDownProps = React.HtmlHTMLAttributes<HTMLDivElement>;

const UserDropDown: React.FC<UserDropDownProps> = ({ ...props }) => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <Skeleton className="size-8 rounded-full" />
      ) : !session?.user.id ? (
        <Button
          className="ml-4"
          onClick={async () => {
            await signIn("google")
              .then((value) => {
                if (value?.ok) {
                  toast.success("Logged in");
                }
              })
              .catch((error) => {
                toast.error("Failed to login. Please try again.");
                console.log(error);
              });
          }}
        >
          Login
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar className="size-8" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white" align="end" {...props}>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {session?.user.name && (
                  <p className="font-medium">{session.user.name}</p>
                )}
                {session?.user.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {session.user.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={async (e) => {
                e.preventDefault();

                await signOut()
                  .then(() => {
                    window.location.reload();
                  })
                  .catch((error) => {
                    toast.error("Failed to logout. Please try again.");
                    console.error(error);
                  });
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default UserDropDown;
