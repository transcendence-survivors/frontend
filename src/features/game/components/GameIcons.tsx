import React, { SVGProps } from 'react';

export type WeaponIconType = 'aura' | 'sword' | 'axe' | 'staff' | 'bow';

export type TomeIconType =
	| 'damage'
	| 'cooldown'
	| 'agility'
	| 'vitality'
	| 'armor'
	| 'blood'
	| 'range'
	| 'size'
	| 'duration'
	| 'quantity'
	| 'fortune';

export type IconType = WeaponIconType | TomeIconType;

export interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number | string;
	color?: string;
}

const SvgBase: React.FC<IconProps> = ({ size = 64, children, style, ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size}
		height={size}
		viewBox='0 0 64 64'
		fill='none'
		stroke='currentColor'
		strokeWidth='3.8'
		strokeLinecap='round'
		strokeLinejoin='round'
		style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
		{...props}>
		{children}
	</svg>
);

export const AuraIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<circle cx='32' cy='32' r='8' />
		<circle cx='32' cy='32' r='17' />
		<path d='M32 5v8M32 51v8M5 32h8M51 32h8m-46-19 6 6m26 26 6 6m0-38-6 6M19 45l-6 6' />
	</SvgBase>
);

export const SwordIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='m20 43 27-30 5-1-1 5-30 27' />
		<path d='m15 36 13 13M13 48l3 3m-7 4 8-8' />
		<path d='m42 18 4 4' />
	</SvgBase>
);

export const AxeIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='m20 55 22-45M28 15c8-5 17-3 24 4-3 12-11 18-23 17l5-10-11-3 5-8Z' />
		<path d='m16 50 9 4' />
	</SvgBase>
);

export const StaffIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='m22 55 18-39' />
		<path d='M39 17c-7-3-7-10-2-12 4-2 7 2 7 6 4-3 9-2 10 2 1 5-6 8-14 4Z' />
		<path d='m17 13 2-5 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z' />
	</SvgBase>
);

export const BowIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='M14 8c24 8 24 40 0 48 11-13 11-35 0-48Z' />
		<path d='m14 8 9 24-9 24M22 32h33m-8-7 8 7-8 7' />
	</SvgBase>
);

export const DamageIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='m14 50 8-8m-2 10-8-8 5-5 8 8-5 5Z' />
		<path d='m20 39 25-25 5 5-25 25' />
		<path d='m39 20 5 5M27 18l2-6 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z' />
	</SvgBase>
);

export const CooldownIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='M48 23a18 18 0 1 1-7-7' />
		<path d='m39 9 4 8 9-2' />
		<circle cx='32' cy='32' r='3' />
		<path d='M32 20v12l8 5' />
	</SvgBase>
);

export const AgilityIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='M27 16v18c0 4 3 7 7 7h15c3 0 5 2 5 5v4H30c-8 0-14-6-14-14V22' />
		<path d='M27 26h10M27 32h8M14 18l-7 5 9 2-8 6 9 1' />
	</SvgBase>
);

export const VitalityIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='M32 52S10 39 10 23c0-7 5-12 12-12 5 0 8 3 10 7 2-4 5-7 10-7 7 0 12 5 12 12 0 16-22 29-22 29Z' />
		<path d='M23 31h18M32 22v18' />
	</SvgBase>
);

export const ArmorIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='M32 7c7 5 13 7 21 8v15c0 13-8 22-21 28C19 52 11 43 11 30V15c8-1 14-3 21-8Z' />
		<path d='M32 16v31M20 24h24' />
	</SvgBase>
);

export const BloodIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='M32 7S17 25 17 39a15 15 0 0 0 30 0C47 25 32 7 32 7Z' />
		<path d='M27 48c-4-2-6-5-6-9M29 27l3 3 3-3' />
	</SvgBase>
);

export const RangeIcon: React.FC<IconProps> = ({ color = '#F5C158', ...props }) => (
	<SvgBase color={color} {...props}>
		<circle cx='32' cy='32' r='19' />
		<circle cx='32' cy='32' r='9' />
		<path d='M32 6v11M32 47v11M6 32h11M47 32h11' />
		<circle cx='32' cy='32' r='2' fill={color} />
	</SvgBase>
);

export const SizeIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='M25 25 11 11m0 10V11h10M39 25l14-14m-10 0h10v10M25 39 11 53m10 0H11V43M39 39l14 14V43m0 10H43' />
		<rect x='25' y='25' width='14' height='14' rx='3' />
	</SvgBase>
);

export const DurationIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='M19 9h26M19 55h26M23 10c0 10 2 15 9 22-7 7-9 12-9 22M41 10c0 10-2 15-9 22 7 7 9 12 9 22' />
		<path d='m25 48 7-7 7 7' />
	</SvgBase>
);

export const QuantityIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='m12 20 9-6 9 6-9 6-9-6Zm22 0 9-6 9 6-9 6-9-6ZM23 42l9-6 9 6-9 6-9-6Z' />
		<path d='M21 26v7m22-7v7M27 37l-4-4m14 4 4-4' />
	</SvgBase>
);

export const FortuneIcon: React.FC<IconProps> = (props) => (
	<SvgBase {...props}>
		<path d='M32 30c-4-14-18-17-21-8-3 8 7 13 21 8Zm0 0c14-4 17-18 8-21-8-3 13 7-8 21Zm0 0c4 14 18 17 21 8 3-8-7-13-21-8Zm0 0c-14 4-17 18-8 21 8 3 13-7 8-21Z' />
		<path d='M32 32v22' />
	</SvgBase>
);

export const GAME_ICON_MAP: Record<IconType, React.FC<IconProps>> = {
	aura: AuraIcon,
	sword: SwordIcon,
	axe: AxeIcon,
	staff: StaffIcon,
	bow: BowIcon,
	damage: DamageIcon,
	cooldown: CooldownIcon,
	agility: AgilityIcon,
	vitality: VitalityIcon,
	armor: ArmorIcon,
	blood: BloodIcon,
	range: RangeIcon,
	size: SizeIcon,
	duration: DurationIcon,
	quantity: QuantityIcon,
	fortune: FortuneIcon,
};

export const GameIcon: React.FC<{ name: IconType } & IconProps> = ({
	name,
	...props
}) => {
	const Component = GAME_ICON_MAP[name];
	if (!Component) return null;
	return <Component {...props} />;
};

export default GameIcon;
