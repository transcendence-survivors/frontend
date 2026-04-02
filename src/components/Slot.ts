import React from 'react';

export type SlotProps = {
	children: React.ReactElement;
} & React.HTMLAttributes<HTMLElement>;

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
	({ children, ...props }, ref) => {
		if (!React.isValidElement(children)) {
			return null;
		}

		const child = children as React.ReactElement<
			React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>
		>;

		return React.cloneElement(child, {
			...child.props,
			...props,
			ref,
			className: [child.props.className, props.className]
				.filter(Boolean)
				.join(' '),
			style: { ...child.props.style, ...props.style },
		});
	},
);

Slot.displayName = 'Slot';
