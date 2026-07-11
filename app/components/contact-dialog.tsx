"use client";

import { Check, Copy, Mail, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContactDialogProps {
  children: ReactNode;
  asChild?: boolean;
}

export default function ContactDialog({
  children,
  asChild = true,
}: ContactDialogProps) {
  const t = useTranslations("ContactDialog");
  const [mounted, setMounted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = "murphylan@hotmail.com";
  const phone = "15871352105";

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 邮箱 */}
          <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted/50 border sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 shrink-0 rounded-full bg-[#00794c]/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-[#00794c]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">
                  {t("email")}
                </p>
                <p className="font-medium break-all">{email}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(email, "email")}
              >
                {copiedEmail ? (
                  <Check className="h-4 w-4 text-[#00794c]" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-[#00794c] hover:bg-[#00925c] text-white"
              >
                <a href={`mailto:${email}`}>{t("sendEmail")}</a>
              </Button>
            </div>
          </div>

          {/* 电话/微信 */}
          <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted/50 border sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 shrink-0 rounded-full bg-[#00794c]/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-[#00794c]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">
                  {t("phone")}
                </p>
                <p className="font-medium break-all">{phone}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(phone, "phone")}
              >
                {copiedPhone ? (
                  <Check className="h-4 w-4 text-[#00794c]" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-[#00794c] hover:bg-[#00925c] text-white"
              >
                <a href={`tel:${phone}`}>{t("call")}</a>
              </Button>
            </div>
          </div>

          {/* 提示信息 */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <MessageCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 dark:text-amber-300">
                {t("tipTitle")}
              </p>
              <p className="text-amber-700 dark:text-amber-400">
                {t("tipBody")}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
