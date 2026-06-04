import { HTMLAttributes } from "react"

interface DisplayNameProps extends HTMLAttributes<HTMLSpanElement> {
	displayName: string
}

const DisplayName = ({displayName, ...props}: DisplayNameProps) => {
	return (
		<div>
			<span {...props}>
				{displayName}
			</span>
		</div>
	)
}

export default DisplayName