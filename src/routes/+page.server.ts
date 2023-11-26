import type { PageServerLoad } from './$types';

export const load = (async () => {
	const trains = await fetch('https://search.railyatri.in/mobile/trainsearch?callback=&q=mumbai&slip_type=&');
	const response = trains.json()
	return {
		response
	};
}) satisfies PageServerLoad;
