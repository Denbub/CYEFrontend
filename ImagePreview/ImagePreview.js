import AvatarEditor from "react-avatar-editor";

const ImagePreview = ({ imageSrc, width, height, borderRadius, editorRef, ...props }) => {
	if (!imageSrc) {
		return null;
	}

	return (
		<div className='relative mb-[30px] flex w-full items-center justify-center '>
			<AvatarEditor
				ref={editorRef}
				image={imageSrc}
				width={width}
				height={height}
				borderRadius={borderRadius}
				color={[0, 0, 0, 0.6]}
				{...props}
			/>
		</div>
	);
};

export default ImagePreview;
