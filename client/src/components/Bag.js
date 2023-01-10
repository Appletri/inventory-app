import { useEffect, useState } from 'react';
import './Bag.css';

function Bag(props) {
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    props.selectItem(selectedItem);
  }, [selectedItem] );

  return (
    <div className="bag">
      {!props.bag ? 'loading' : props.bag.map((item) => {
        return (
          <div onClick={() => {setSelectedItem(item._id)}} 
          key={item._id} className={selectedItem === item._id ?`item selected ${item.quality}` : `item ${item.quality}`}>
            <div className='item-info'>
              <h3>{item.name}</h3>
              <img src={props.img} alt={props.imgtext}/>
              <p className='des'>{item.description}</p>
            </div>
            <div className="stats">
              {item.stats.map((stat, index) => {
                return(
                  <div key={index}>
                    {Object.entries(stat).map((key, index) => {
                    return(
                      <p key={index} className='stat'>{`${key[0]}: ${key[1]}`}</p>
                    )
                    })}
                  </div>
                )
              })}
            </div>
            <p className='specialfx'>{item.special === 'no special effect' ? null : item.special}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Bag;