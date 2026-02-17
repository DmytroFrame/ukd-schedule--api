import { env } from 'cloudflare:workers';

export const BASE_API_URL = env.BASE_API_URL || 'http://195.162.83.28/cgi-bin/timetable.cgi';
