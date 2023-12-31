const Quotation = ({ component }) => {
	const { text, author } = component;

	return (
		<div className='container'>
			<div className='px-l xl:px-xxxl '>
				<div className='typographyLeadRegular'>{text}</div>
				<div className='typographyCaptionRegular text-fg-subtle'>{author}</div>
			</div>
		</div>
	);
};

export default Quotation;
