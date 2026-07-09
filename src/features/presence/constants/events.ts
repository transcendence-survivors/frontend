const PRESENCE_PREFIX = 'presence:';

const PRESENCE_EVENTS = {
	SEND: {
		GO_INVISIBLE: `${PRESENCE_PREFIX}go_invisible`,
		GO_VISIBLE: `${PRESENCE_PREFIX}go_visible`,
		GO_DO_NOT_DISTURB: `${PRESENCE_PREFIX}go_do_not_disturb`,
	},

	RECEIVE: {
		GLOBAL_COUNT: `${PRESENCE_PREFIX}global_online_count`,
		STATUS_CHANGE: `${PRESENCE_PREFIX}friend_status_change`,
		CONNECTED: `${PRESENCE_PREFIX}friend_connected`,
		INITIAL_FRIENDS: `${PRESENCE_PREFIX}initial_online_friends`,
		INITIAL_STATUS: `${PRESENCE_PREFIX}initial_status`,
	},
} as const;

type PresenceEmitEvent = (typeof PRESENCE_EVENTS.SEND)[keyof typeof PRESENCE_EVENTS.SEND];
type PresenceListenEvent =
	(typeof PRESENCE_EVENTS.RECEIVE)[keyof typeof PRESENCE_EVENTS.RECEIVE];

export { PRESENCE_EVENTS };
export type { PresenceEmitEvent, PresenceListenEvent };
