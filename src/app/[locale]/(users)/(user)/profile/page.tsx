import AvatarProfile from "@/features/user/components/Avatar/AvatarProfile"
import Banner from "@/features/user/components/Banner"
import DisplayName from "@/features/user/components/DisplayName"
import Username from "@/features/user/components/Username"
import { ImageProps } from "@/libs/types"


const Page = () => {
	const bannerImg: ImageProps = { src:"https://i.pinimg.com/736x/fc/49/f1/fc49f199b54cb6393ad246d6bb7ed95b.jpg", alt:"Benoit demande une description" }
	const profileImg: ImageProps = { src:"https://upload.wikimedia.org/wikipedia/fr/archive/c/ca/20200803071009%21Batman_logo.png", alt:"I AM BATMAN" }
	const display = "dCben335"
	return (
		<div className="flex-row">
			<Banner img={bannerImg}></Banner>
			<AvatarProfile className="size-25" img={profileImg}></AvatarProfile>
			<DisplayName className="font-bold text-2xl" displayName={display}></DisplayName>
			<Username className="font-thin" username={display}></Username>
		</div>
	)
}

export default Page