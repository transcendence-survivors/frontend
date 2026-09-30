import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GamePlayerAttributes } from './GamePlayerAttributes';
import { GamePlayerStatsDetails } from '../../types/game';
import Kicker from '@/components/ui/kicker';
import { AvatarProfile } from '@/features/user/components/Avatar/AvatarProfile';
import { UserIdentityLink } from '@/features/user/components/Identity/UserIdentity';
import GameWeapon from '../GameWeapon';

interface Props {
	player: GamePlayerStatsDetails;
}

export const GamePlayerCard = ({ player }: Props) => {
	const t = useTranslations('game');

	return (
		<Card className='bg-card/60 border-border shadow-sm py-0 gap-0'>
			<CardHeader className='flex flex-row items-center justify-between py-3!  px-2 border-b border-border bg-muted/20'>
				<CardTitle className='text-sm font-bold text-card-foreground'>
					{player.user?.id ? (
						<UserIdentityLink
							avatar={{
								img: {
									alt: player.user.username,
									src: player.user.avatarUrl ?? 'placeholder.png',
								},
							}}
							user={{
								username: player.user.username,
								displayName: player.user.displayName,
								id: player.user.id,
								as: 'sub-titles',
							}}
							className='flex items-center gap-2'
						/>
					) : (
						<AvatarProfile
							img={{
								src: t('playerFallback'),
								alt: t('playerFallback'),
							}}
						/>
					)}
				</CardTitle>
				<Badge variant='destructive' className='font-bold text-sm p-3'>
					{player.killAmount.toLocaleString()} {t('labels.playerKills')}
				</Badge>
			</CardHeader>

			<CardContent className='p-4 space-y-5'>
				<article className='space-y-2.5'>
					<Kicker className='text-xs font-bold'>
						<h3>{t('playerBuild')}</h3>
					</Kicker>
					<GamePlayerAttributes playerStats={player} />
				</article>

				<article className='space-y-2.5'>
					<Kicker className='text-xs font-bold'>
						<h3>{t('weaponsUsed')}</h3>
					</Kicker>

					{player.weapons.length === 0 ? (
						<p className='text-xs text-muted-foreground italic'>
							{t('noWeapons')}
						</p>
					) : (
						<ul className='grid grid-cols-1 gap-2'>
							{player.weapons.map((weapon) => (
								<li key={weapon.id}>
									<GameWeapon
										key={weapon.id}
										mode='single'
										weapon={weapon}
									/>
								</li>
							))}
						</ul>
					)}
				</article>
			</CardContent>
		</Card>
	);
};
