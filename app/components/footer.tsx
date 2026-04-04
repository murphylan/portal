"use client";

import { Mail, Sparkles } from "lucide-react";
import { CHESS_URL, SIGN_URL, WORKSYNC_URL } from "@/lib/product-urls";

// GitHub 图标
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

const products = [
  { id: "worksync", title: "WorkSync（文档与协作）", url: WORKSYNC_URL },
  { id: "sign", title: "Murphy 互动工具集", url: SIGN_URL },
  { id: "chess", title: "中国象棋辅助工具", url: CHESS_URL },
];

interface FooterProps {
  showContactId?: boolean;
}

export default function Footer({ showContactId = true }: FooterProps) {
  return (
    <footer
      id={showContactId ? "contact" : undefined}
      className="py-16 bg-muted/30 border-t"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & 简介 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Murphy 云</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              WorkSync
              项目文档与协作平台为主力产品；并提供活动现场互动工具与象棋辅助等在线服务。
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:murphylan@hotmail.com"
                className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/10 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/murphylan"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/10 transition-colors"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* 产品链接 */}
          <div>
            <h4 className="font-semibold mb-4">产品</h4>
            <ul className="space-y-3 text-muted-foreground">
              {products.map((product) => (
                <li key={product.id}>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {product.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/products"
                  className="hover:text-foreground transition-colors"
                >
                  产品总览
                </a>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h4 className="font-semibold mb-4">联系我们</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a
                  href="mailto:murphylan@hotmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  murphylan@hotmail.com
                </a>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors">
                  15871352105(微信同号)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="mb-2">
            © {new Date().getFullYear()} Murphy Cloud. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              鄂ICP2024043283号-2
            </a>
            <span className="text-muted-foreground/50">|</span>
            <span>Made with ❤️ by Murphy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
