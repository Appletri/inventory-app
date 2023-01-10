import { useState } from 'react';
import './Discover.css';
import unknownIcon from '../assets/question.png';
import axios from 'axios';
import rollStats from './HelperFunctions/rollStats';
import findQuality from './HelperFunctions/findQuality';

function Discover(props) {
  const [item, setItem] = useState();
  const [rarityClass, setRarityClass] = useState('item');

  const handleClick = () => {
    const stats = rollStats();
    const quality = findQuality(stats);
    const special = () => { 
      if (quality === 'Epic' || quality === 'Legendary') {
        return 'this artifact can have a special effect' 
      } 
      return 'no special effect'
    };

    setRarityClass(quality)
    setItem({
      name: 'Unknown Artifact',
      quality: quality,
      description: 'this artifact needs a description',
      date_of_creation: new Date(),
      stats: stats,
      special: special(),
    })
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = item;
    const url = window.location.href.split('/');

    axios.post("http://localhost:9000/testAPI/create", { newItem })
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.assign(`${url[0]}//${url[2]}`);
      })
    
  }

  return (
    <div className='discover'>
      <button onClick={handleClick}>{!item ? 'Find Something' : 'Find Something Else'} </button>
      {!item ? null : <button onClick={handleSubmit}> Keep Item </button>}
      
      {!item ? null : 
        <div className={`item ${rarityClass}`}>
          <div className='item-info'>
            <h3>{item.name}</h3>
            <img src={unknownIcon} alt={'unknown item'}/>
            <p className='des'>{item.description}</p>
          </div>
          <div className="stats">
            {!item.stats ? null : item.stats.map((stat, index) => {
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
      }
      
      
      
    </div>
  )
}

export default Discover;