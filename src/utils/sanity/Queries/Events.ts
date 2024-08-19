
import { Event, EventShort } from "@/types/Event";
import { createClient } from "@sanity/client";
import clientConfig from "../../../../sanity.config"

interface GetEventsParams {
	eventId?: string;
	slug?: string;
	count?: number;
	shortVersion?: boolean;
}

export async function getEvents({
	eventId = undefined,
	slug = undefined,
	count = undefined,
	shortVersion = false,
}: GetEventsParams): Promise<(Event | EventShort)[]> {
	const fields = shortVersion
		? `
            id,
			title,
			"date": dates.start,
			"time": dates.start,
			description,
			"imageUrl": poster.asset->url
		`
		: `
			title,
			"dates": {
				"start": dates.start,
				"end": dates.end
			},
			organizer,
			categories,
			"posterURL": poster.asset->url,
			"posterAlt": poster.alt,
			attendanceCap,
			description,
			article,
			photos,
			link,
			textLocation,
			locationLink,
			"slug": slug.current
		`;

	const limit = count ? ` | order(_createdAt desc)[0...${count}]` : "";

	const events = await createClient(clientConfig).fetch(
		`
			*[_type == "event" ${
				eventId ? `&& _id == "${eventId}"` : slug ? `&& slug.current == "${slug}"` : ""
			}] {
				${fields}
			} ${limit}
		`,
		{}
	);

	if (shortVersion) {
		return events.map((event: any) => ({
			id: event._id,
			title: event.title,
			date: new Date(event.date).toLocaleDateString(),
			time: new Date(event.time).toLocaleTimeString(),
			imageUrl: event.imageUrl,
			description: event.description,
		})) as EventShort[];
	}

	return events as Event[];
}

export async function getEvent({ id, slug }: { id?: string; slug?: string }): Promise<Event> {
	let events = await getEvents({ eventId: id, slug: slug });
	return events[0] as Event;
}
