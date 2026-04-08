import type { Metadata } from "next";
import WorkSyncShowcase from "../components/worksync/worksync-showcase";

export const metadata: Metadata = {
  title: "WorkSync — 项目文档与协作平台",
  description:
    "文档集中、任务管理、PlantUML 技术图表、协作白板，一站式项目协作，让团队专注交付。",
};

export default function WorkSyncPage() {
  return <WorkSyncShowcase />;
}
