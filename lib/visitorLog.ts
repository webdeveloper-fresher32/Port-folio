import { existsSync, mkdirSync, appendFileSync, readFileSync } from 'fs'
import path from 'path'

const DATA_DIR = process.env.VISITOR_LOG_DIR ?? path.join(process.cwd(), '.visitor-data')
const LOG_FILE = path.join(DATA_DIR, 'visits.log')

function ensureLogFile() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function logVisit({ page, userAgent, ip }: { page: string; userAgent: string; ip: string }) {
  ensureLogFile()
  const line = [new Date().toISOString(), page, userAgent, ip].join('\t')
  appendFileSync(LOG_FILE, `${line}\n`)
  return getVisitCount()
}

export function getVisitCount() {
  if (!existsSync(LOG_FILE)) return 0
  const contents = readFileSync(LOG_FILE, 'utf-8')
  return contents.split('\n').filter((line) => line.trim().length > 0).length
}
