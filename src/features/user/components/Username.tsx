import { HTMLAttributes } from "react";

interface UsernameProps extends HTMLAttributes<HTMLSpanElement> {
	username: string
}

const Username = ({username, ...props}: UsernameProps) => {
	return (
		<div>
			<span {...props}>
				{`@${username}`}
			</span>
		</div>
	)
}

export default Username