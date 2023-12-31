import Container from "elements/v2/Container";

const RichText = ({ component }) => {
	return (
		<Container>
			<div className='rich-text' dangerouslySetInnerHTML={{ __html: component }} />
		</Container>
	);
};

export default RichText;
