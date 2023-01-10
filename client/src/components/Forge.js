import axios from 'axios';
import { useState } from 'react';
import './Forge.css';

function Forge(props) {
  const [item, setItem] = useState(props.item);

  const handleDelete = (e) => {
    e.preventDefault();
    const itemID = props.item._id;
    const url = window.location.href.split('/');
    
    axios.post(`http://localhost:9000/testAPI/${itemID}/delete`, { itemID })
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.assign(`${url[0]}//${url[2]}`);
      })
    
  }

  const handleChangeName = (e) => {
    setItem({
      _id: item._id,
      name: e.target.value,
      quality: item.quality,
      description: item.description,
      stats: item.stats,
      special: item.special,
    })
  };

  const handleChangeDes = (e) => {
    setItem({
      _id: item._id,
      name: item.name,
      quality: item.quality,
      description: e.target.value,
      stats: item.stats,
      special: item.special,
    })
  };

  const handleChangeSpecial = (e) => {
    setItem({
      _id: item._id,
      name: item.name,
      quality: item.quality,
      description: item.description,
      stats: item.stats,
      special: e.target.value,
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemID = props.item._id;
    const url = window.location.href.split('/');
    const forgedItem = item;
    console.log(forgedItem);
    
    axios.post(`http://localhost:9000/testAPI/${itemID}/update`, { forgedItem })
    .then(res => {
      console.log(res);
      console.log(res.data);
      window.location.assign(`${url[0]}//${url[2]}`);
      })
    
  }

  return (
    <div className="forge">
      <div>
        <button onClick={handleDelete}> Delete</button>
        <button onClick={handleSubmit}> Submit </button>
      </div>
      {!props.item ? 'loading' : 
        <form>  
          <input onChange={handleChangeName} type='text' defaultValue={props.item.name}/>
          <img src={props.img} alt={props.imgtext}/>
          <textarea onChange={handleChangeDes} className='des' defaultValue={props.item.description}/>
          <div className="form-stats">
            {props.item.stats.map((stat, index) => {
              return(
                <div key={index}>
                  {Object.entries(stat).map((key, index) => {
                  return(
                    <p key={index} className='form-stat'>{`${key[0]}: ${key[1]}`}</p>
                  )
                  })}
                </div>
              )
            })}
          </div>
          {props.item.special === 'no special effect' ? 
            <p className='specialfx'>{props.item.special}</p>
            :
            <textarea onChange={handleChangeSpecial} className='specialfx' 
            defaultValue={props.item.special} />
          }
        </form>
      }    
    </div>
  )
}

export default Forge;