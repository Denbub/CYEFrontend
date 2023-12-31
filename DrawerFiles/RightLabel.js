import { useEffect, useState } from "react";

import FileArrowDown from "icons/fileArrowDown.svg";
import FileArrowUp from "icons/fileArrowUp.svg";

import { generateShortName } from "utilities";

const RightLabel = ({ id, uploadedFile = {}, onChangeAction, children }) => {
	const { id: uploadId = null, name = "" } = uploadedFile;
	const [fileName, setFileName] = useState(name);
	const [fileShortName, setFileShortName] = useState(name);

	useEffect(() => {
		setFileShortName(generateShortName(fileName));
	}, [fileName, name]);
	const handleOnChange = e => {
		onChangeAction(e, uploadId);
		setFileName(e.target.files[0]?.name);
	};
	return (
		<div className='flex flex-col'>
			{fileName && (
				<div
					className='typographyInputNormalRegular flex justify-between pb-[14px] pr-[14px]'
					title={fileName}
				>
					{fileShortName} <FileArrowDown alt='' />
				</div>
			)}
			<input
				type='file'
				accept='application/pdf'
				onChange={handleOnChange}
				id={id}
				className='hidden'
			/>
			<label
				htmlFor={id}
				className='typographyButtonNormalBold flex w-[316px] cursor-pointer items-center justify-between rounded-[99px] bg-grey-950 py-[6px] px-[16px] text-white'
			>
				{children} <FileArrowUp alt='' />
			</label>
		</div>
	);
};

export default RightLabel;
