import { SkillCategory } from './types'

export const skills: SkillCategory[] = [
  { label: 'Languages', skills: ['HTML5', 'CSS3', 'Javascript', 'TypeScript', 'Python', 'Java'] },
  { label: 'Frameworks', skills: ['React.js', 'Next.js', 'Angular', 'Tailwind.css', 'Shadcn', 'Material UI'] },
  { label: 'Backend', skills: ['Node.js', 'Express.js', 'Spring Boot', 'FastAPI', 'REST APIs', 'OAuth', 'Webhooks'] },
  { label: 'Databases', skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Qdrant'] },
  { label: 'Cloud & DevOps', skills: ['Azure Blob Storage', 'AWS (S3)', 'Docker', 'CI/CD Pipelines'] },
  { label: 'AI / Agentic Tools', skills: ['Claude Code', 'LangChain', 'LangGraph', 'LangSmith', 'RAG Pipelines', 'Vector Databases (Qdrant)'] },
  { label: 'Core CS', skills: ['Data Structures & Algorithms (DSA)', 'Low Level Design (LLD)', 'System Design (HLD)', 'Microservices'] },
  { label: 'Tools', skills: ['VS Code', 'Git', 'GitHub', 'IntelliJ IDEA'] },
]
