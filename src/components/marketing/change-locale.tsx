"use client";

import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useServerAction } from "@/hooks/use-server-action";
import { setLocale } from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  locale: z.enum(["en", "id"]),
});

export default function ChangeLocale({ className }: { className?: string }) {
  const [runAction] = useServerAction(setLocale);

  const handleChangeLocalization = async (data: z.infer<typeof formSchema>) => {
    await runAction(data.locale);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locale: "en",
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="transparent"
          className={"duration-75 hover:bg-black/10 " + className}
          size="icon"
        >
          <Languages />
          <span className="sr-only">Toggle Localization</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Form {...form}>
          <form>
            <DropdownMenuItem
              onClick={() =>
                handleChangeLocalization({
                  locale: "en",
                })
              }
            >
              EN
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleChangeLocalization({
                  locale: "id",
                })
              }
            >
              ID
            </DropdownMenuItem>
          </form>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
