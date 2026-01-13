"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone, MessageCircle, Copy, Check } from "lucide-react";
import { useState, type ReactNode } from "react";

interface ContactDialogProps {
  children: ReactNode;
  asChild?: boolean;
}

export default function ContactDialog({ children, asChild = true }: ContactDialogProps) {
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

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">联系我们</DialogTitle>
          <DialogDescription className="text-center">
            欢迎咨询 Murphy 云服务，我们将竭诚为您服务
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* 邮箱 */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">邮箱</p>
                <p className="font-medium">{email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(email, "email")}
              >
                {copiedEmail ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button size="sm" asChild>
                <a href={`mailto:${email}`}>
                  发送邮件
                </a>
              </Button>
            </div>
          </div>

          {/* 电话/微信 */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">电话 / 微信</p>
                <p className="font-medium">{phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(phone, "phone")}
              >
                {copiedPhone ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button size="sm" asChild className="bg-green-600 hover:bg-green-700">
                <a href={`tel:${phone}`}>
                  拨打电话
                </a>
              </Button>
            </div>
          </div>

          {/* 提示信息 */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <MessageCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 dark:text-amber-300">温馨提示</p>
              <p className="text-amber-700 dark:text-amber-400">
                工作时间：周一至周五 9:00 - 18:00，其他时间可发送邮件或添加微信咨询
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
