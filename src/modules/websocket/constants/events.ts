const PRESENCE_EVENTS = {
	RECEIVE: {
		GO_INVISIBLE: 'go_invisible',
		GO_VISIBLE: 'go_visible',
		FORCE_ONLINE: 'force_online',
	},

	SEND: {
		GLOBAL_COUNT: 'global_online_count',
		STATUS_CHANGE: 'friend_status_change',
		INITIAL_FRIENDS: 'initial_online_friends',
	},
} as const;

type PresenceEmitEvent =
	(typeof PRESENCE_EVENTS.RECEIVE)[keyof typeof PRESENCE_EVENTS.RECEIVE];
type PresenceListenEvent =
	(typeof PRESENCE_EVENTS.SEND)[keyof typeof PRESENCE_EVENTS.SEND];

export { PRESENCE_EVENTS };
export type { PresenceEmitEvent, PresenceListenEvent };
