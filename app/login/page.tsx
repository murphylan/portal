import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("Login");

  return (
    <iframe
      allowFullScreen
      scrolling="no"
      src="/visme/form.html"
      title={t("iframeTitle")}
      className="vismeForms"
      style={{
        border: "none",
        maxWidth: "100%",
        position: "fixed",
        zIndex: 999999,
        top: 0,
        left: 0,
        background: "rgba(255, 255, 255, 0.78)",
        minHeight: "100vh",
        width: "100%",
        height: "100vh",
      }}
    />
  );
}
