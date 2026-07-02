import { IconType } from 'react-icons'
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiMui,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiGit,
  SiGithub,
  SiIntellijidea,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { VscVscode } from 'react-icons/vsc'
import { TbBrandAzure, TbBinaryTree, TbSitemap } from 'react-icons/tb'

export const SKILL_ICONS: Record<string, IconType> = {
  HTML5: SiHtml5,
  CSS3: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  'React.js': SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  Shadcn: SiShadcnui,
  'Material UI': SiMui,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  'Azure Blob Storage': TbBrandAzure,
  AWS: FaAws,
  Docker: SiDocker,
  'VS Code': VscVscode,
  Git: SiGit,
  GitHub: SiGithub,
  'IntelliJ IDEA': SiIntellijidea,
  'Data Structures & Algorithms': TbBinaryTree,
  'Low Level Design': TbSitemap,
}
