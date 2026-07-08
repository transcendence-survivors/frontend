'use client';

import { useQueryState } from 'nuqs';
import BlockHeader from './BlockHeader';
import BlocksData from './BlocksData';

type BlocksProps = React.HTMLAttributes<HTMLElement>;

const Blocks = ({ ...props }: BlocksProps) => {
	const [search] = useQueryState('search', { defaultValue: '' });
	const params = { search };

	return (
		<>
			<BlockHeader params={params} {...props} />
			<BlocksData params={params} />
		</>
	);
};

export default Blocks;
