import { type AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import { useSession } from "next-auth/react";

type UserAvatarProps = AvatarProps;

export function UserAvatar({ ...props }: UserAvatarProps) {
  const { data: session } = useSession();
  return (
    <Avatar {...props}>
      {session?.user?.image ? (
        <div className="relative aspect-square h-full w-full">
          <img
            width="100%"
            height="100%"
            src={session.user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
            className="min-h-full min-w-full object-cover"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{session?.user?.name}</span>
          <User2 className="size-5 stroke-black" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
