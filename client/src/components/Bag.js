import { useEffect, useState } from 'react';
import './Bag.css';
import ItemDisplay from './ItemDisplay';


function Bag(props) {
  const [selectedItem, setSelectedItem] = useState();
  const [displayItem, setDisplayItem] = useState();

  useEffect(() => {
    props.selectItem(selectedItem);
  }, [selectedItem] );

  const getInitials = (e) => {
    let initials = '';
    e.split(' ').forEach(word => {
      initials = initials + word[0];
    })
    return initials;
  }

  return (
    <div className='bag'>
      <div className="bag_display">
        {!props.bag ? 'loading' : props.bag.map((item) => {
          return (
            <div onClick={() => { setSelectedItem(item._id); 
            setDisplayItem(item);}} key={item._id} className={
            selectedItem === item._id ?`item_bagged selected ${item.quality}B` : `item_bagged ${item.quality}B`}>
              {item.img !== undefined ? 
                <img src={item.img} alt={item.img}/> : 
                <p>{getInitials(item.name)}</p>
              }
            </div>
          )
        })}
      </div>
      {!selectedItem ? null : <ItemDisplay item={displayItem}/>}
    </div>
  )
}

export default Bag;