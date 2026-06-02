import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { ImageProps } from '@libs/types';

export interface AvatarProfileProps extends React.ComponentProps<typeof Avatar> {
	img: ImageProps;
}

const AvatarProfile = ({ img, ...props }: AvatarProfileProps) => {
	return (
		<Avatar {...props}>
			<AvatarImage src={img.src} alt={img.alt} />
			<AvatarFallback>{img.alt.substring(0, 2)}</AvatarFallback>
		</Avatar>
	);
};

export default AvatarProfile;
