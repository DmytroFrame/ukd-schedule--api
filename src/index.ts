import { getGroups } from './api/getGroups';
import { getSchedules } from './api/getSchedules';
import { getTeachers } from './api/getTeachers';
import { getScheduleDto } from './dto/getScheduleDto';

const TTL_IN_MS = 1000 * 60 * 10;
const MAX_TTL_IN_SEC = 60 * 60 * 24 * 24;
const ONE_YEAR_IN_SEC = 60 * 60 * 24 * 365;
const HEADERS = {
	'content-type': 'application/json',
	'access-control-allow-origin': '*',
	'access-control-allow-methods': 'GET',
	'cache-control': `public, max-age=${ONE_YEAR_IN_SEC}`,
};

async function handler(pathname: string, query: object) {
	switch (pathname) {
		case '/schedules':
			const params = getScheduleDto(query);
			return await getSchedules(params);
		case '/groups':
			return await getGroups();
		case '/teachers':
			return await getTeachers();
	}
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		const cacheKey = url.pathname + url.search;
		const query = Object.fromEntries(url.searchParams);

		const cacheResults = await env.ukd_rozklad.getWithMetadata<any, { date?: string }>(cacheKey, 'json');

		if (cacheResults.value && cacheResults.metadata) {
			const lastDate = new Date(cacheResults.metadata['date'] ?? 0).getTime();

			if (Date.now() - lastDate < TTL_IN_MS) {
				return new Response(JSON.stringify(cacheResults.value), { headers: HEADERS });
			}
		}

		try {
			const results = await handler(url.pathname, query);

			if (typeof results === 'object') {
				await env.ukd_rozklad.put(cacheKey, JSON.stringify(results), { metadata: { date: new Date() }, expirationTtl: MAX_TTL_IN_SEC });
				return new Response(JSON.stringify(results), { headers: HEADERS });
			}
		} catch (error) {
			console.error(error);

			if (cacheResults.value) {
				return new Response(JSON.stringify(cacheResults.value), { headers: HEADERS });
			} else {
				return new Response('УКД розклад знову здох 💀', { status: 500 });
			}
		}

		return new Response('ok');
	},
} satisfies ExportedHandler<Env>;
