import { Box, Image } from 'theme-ui';
import { useState } from 'react';

const Item = ({
	image,
	name,
	description,
	classes,
	setHoveredItem,
	position,
}) => {
	const [hover, setHover] = useState(false);

	return (
		<Box
			data-image={image}
			data-name={name}
			data-description={description}
			onMouseEnter={e => {
				setHover(true);
				setHoveredItem({
					name,
					description,
					classes,
					image,
				});
				console.log('enter', position);
			}}
			onMouseOut={e => {
				if (hover) {
					setHoveredItem(null);
					// console.log("out!", e);
					setHover(false);
				} else {
				}
			}}
			sx={{
				border: '#7e7f7f 1px solid',
				margin: '4px',
				padding: '2px',
				height: '128px',
				backgroundImage: `url(/images/${image})`,
				backgroundSize: 'contain',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{/* <Image
        sx={{ width: "inherit", height: "auto" }}
        src={`images/${image}`}
      ></Image> */}
			<p>{position}</p>
		</Box>
	);
};

export default Item;
