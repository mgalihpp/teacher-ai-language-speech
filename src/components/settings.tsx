"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { getNewLanguageSettings } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { useAiTeacher } from "@/hooks/use-ai-teacher";
import React from "react";

const options = [
  { value: "english", label: "English" },
  { value: "indonesia", label: "Indonesia" },
  { value: "japanese", label: "Japanese" },
  { value: "france", label: "France" },
];

interface SettingsProps {
  title: string;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
  label5: string;
  label1_placeholder: string;
  label2_placeholder: string;
  label3_placeholder: string;
  label4_placeholder: string;
  label5_placeholder: string;
  label1_description: string;
  label2_description: string;
  label3_description: string;
  label4_description: string;
  label5_description: string;
  btn_text: string;
}

const Settings: React.FC<SettingsProps> = ({
  title,
  label1,
  label2,
  label3,
  label4,
  label5,
  label1_placeholder,
  label2_placeholder,
  label3_placeholder,
  label4_placeholder,
  label5_placeholder,
  label1_description,
  label2_description,
  label3_description,
  label4_description,
  label5_description,
  btn_text,
}) => {
  const {
    fromLanguage,
    toLanguage,
    speech,
    teacher,
    classroom,
    setSpeech,
    setClassroom,
    setTeacher,
    setFromLanguage,
    setToLanguage,
  } = useAiTeacher();

  const formSchema = z.object({
    fromLanguage: z.enum(["english", "indonesia", "japanese", "france"]),
    toLanguage: z.enum(["english", "indonesia", "japanese", "france"]),
    speech: z.enum(["casual", "formal"]),
    classroom: z.enum(["default", "alternative"]),
    teacher: z.enum(["Nanami", "Naoki"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromLanguage,
      toLanguage,
      speech,
      classroom,
      teacher,
    },
  });

  const handleSaveChange = (data: z.infer<typeof formSchema>) => {
    const newLanguageSettings = getNewLanguageSettings(
      data.fromLanguage,
      data.toLanguage,
    );

    setSpeech(data.speech);
    setClassroom(data.classroom);
    setTeacher(data.teacher);

    if (newLanguageSettings) {
      setFromLanguage(newLanguageSettings.newFromLanguage);
      setToLanguage(newLanguageSettings.newToLanguage);
    } else {
      console.warn("Unsupported language combination");
    }
  };

  return (
    <Sheet>
      <SheetTrigger
        className="rounded-full bg-slate-900/20 px-10 
            py-4 text-4xl capitalize text-white/45 backdrop-blur-md transition-colors duration-500 hover:bg-slate-900/40 hover:text-white"
      >
        {title}
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetTitle>{title}</SheetTitle>
        <Form {...form}>
          <form
            className="mt-6 flex flex-col"
            onSubmit={form.handleSubmit(handleSaveChange)}
          >
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="fromLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label1}</FormLabel>
                    <FormDescription>{label1_description}</FormDescription>
                    <FormControl>
                      <Select
                        defaultValue={fromLanguage}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={label1_placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="toLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label2}</FormLabel>
                    <FormDescription>{label2_description}</FormDescription>
                    <FormControl>
                      <Select
                        defaultValue={toLanguage}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={label2_placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="speech"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label3}</FormLabel>
                    <FormDescription>{label3_description}</FormDescription>
                    <FormControl>
                      <Select
                        defaultValue={speech}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={label3_placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classroom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label4}</FormLabel>
                    <FormDescription>{label4_description}</FormDescription>
                    <FormControl>
                      <Select
                        defaultValue={classroom}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={label4_placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="alternative">
                            Alternative
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label5}</FormLabel>
                    <FormDescription>{label5_description}</FormDescription>
                    <FormControl>
                      <Select
                        defaultValue={teacher}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={label5_placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nanami">Nanami</SelectItem>
                          <SelectItem value="Naoki">Naoki</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="mt-8">
              {btn_text}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
