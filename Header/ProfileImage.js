import clsx from "clsx";
import NextImage from "next/image";

const ProfileImage = ({ onClick }) => {
	return (
		<div
			className={clsx(
				"h-[36px] w-[36px] cursor-pointer overflow-hidden rounded-full",
				"bg-white shadow-default"
			)}
			onClick={onClick}
		>
			<NextImage
				className='h-full w-full object-cover'
				src='/images/avatar.jpg'
				width={36}
				height={36}
				alt='defaultProfile'
			/>
		</div>
	);
};

export default ProfileImage;
