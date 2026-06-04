import { ImageProps } from "@/libs/types"
import Image from "next/image"
import { HTMLAttributes } from "react"

interface BannerProps extends HTMLAttributes<HTMLDivElement>{
	img: ImageProps
}

const Banner = ({img, ...props}: BannerProps) => {
	return (
		<div>
			<img src={img.src} alt={img.alt}/>
		</div>
	)
}

export default Banner