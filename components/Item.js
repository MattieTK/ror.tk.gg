import { useState } from 'react';
import { itemBox, itemAccessible, itemInaccessible, positionText } from './Item.css';

const Item = ({
	image,
	name,
	description,
	classes,
	setHoveredItem,
	position,
	accessible = true,
}) => {
	const [hover, setHover] = useState(false);

	const itemClassName = `${itemBox} ${accessible ? itemAccessible : itemInaccessible}`;
	const backgroundImage = accessible 
		? `url(/images/${image})`
		: `url(/images/Locked_Item.png)`;

	return (
		<div
			className={itemClassName}
			style={{ backgroundImage }}
			data-image={image}
			data-name={name}
			data-description={description}
			onMouseEnter={e => {
				if (accessible) {
					setHover(true);
					setHoveredItem({
						name,
						description,
						classes,
						image,
					});
					console.log('enter', position);
				}
			}}
			onMouseOut={e => {
				if (hover) {
					setHoveredItem(null);
					// console.log("out!", e);
					setHover(false);
				} else {
				}
			}}
		>
		</div>
	);
};

export default Item;
