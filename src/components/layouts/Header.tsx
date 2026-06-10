'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import PhoneHeader from './Headers/Phone';
import PcHeader from './Headers/Pc';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const AutoHeader = (props: HeaderProps) => {
	const isPhone = useMediaQuery('(max-width: 640px)');
	return <>{isPhone ? <PhoneHeader {...props} /> : <PcHeader {...props} />}</>;
};

export default AutoHeader;
