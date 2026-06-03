import { useEffect } from 'react';
import { is } from 'zod/v4/locales';

const useLockBodyScroll = (isLocked: boolean) => {
	useEffect(() => {
		document.body.style.overflow = isLocked ? 'hidden' : '';

		return () => {
			document.body.style.overflow = '';
		};
	}, [isLocked]);
};

export default useLockBodyScroll;
