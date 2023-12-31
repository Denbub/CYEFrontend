const Loader = () => {
	return (
		<div className=' absolute left-[40%] inset-y-center'>
			<svg xmlns='http://www.w3.org/2000/svg' width='150' viewBox='0 0 100 100'>
				<path fill='red' d='M20 50h4v10h-4z'>
					<animateTransform
						attributeName='transform'
						attributeType='xml'
						begin='0'
						dur='0.6s'
						repeatCount='indefinite'
						type='translate'
						values='0 0; 0 20; 0 0'
					/>
				</path>
				<path fill='red' d='M30 50h4v10h-4z'>
					<animateTransform
						attributeName='transform'
						attributeType='xml'
						begin='0.2s'
						dur='0.6s'
						repeatCount='indefinite'
						type='translate'
						values='0 0; 0 20; 0 0'
					/>
				</path>
				<path fill='red' d='M40 50h4v10h-4z'>
					<animateTransform
						attributeName='transform'
						attributeType='xml'
						begin='0.4s'
						dur='0.6s'
						repeatCount='indefinite'
						type='translate'
						values='0 0; 0 20; 0 0'
					/>
				</path>
			</svg>
		</div>
	);
};

export default Loader;
