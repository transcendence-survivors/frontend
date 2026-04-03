import Trend from './Trend';

const trends = [
	{ tag: 'NextJS', posts: 24000 },
	{ tag: 'TailwindCSS', posts: 18400 },
	{ tag: 'TypeScript', posts: 12900 },
	{ tag: 'ReactJS', posts: 9300 },
];

const TrendingWidget = () => {
	return (
		<div className='rounded-2xl bg-muted py-4'>
			<h2 className='mb-3 text-lg font-bold px-4'>Trends for you</h2>
			<ul>
				{trends.map((t) => (
					<li key={t.tag}>
						<Trend tag={t.tag} postsCount={t.posts} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default TrendingWidget;
