import axios from 'axios';
import { useState } from 'react';
import './Forge.css';

function Forge(props) {
  const imageName = props.item.img.split('/');
  const [name, setName] = useState(props.item.name);
  const [des, setDes] = useState(props.item.description);
  const [special, setSpecial] = useState(props.item.special);
  const [image, setImage] = useState(imageName[imageName.length-1]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = window.location.href.split('/');
    const formData = new FormData();
    const itemID = props.item._id;
    const statsKeys = [];
    const statsVal = [];
    formData.append('id', props.item._id);
    formData.append('name', name);
    formData.append('quality', props.item.quality);
    formData.append('description', des);
    formData.append('special', special);
    formData.append('item-image', image);
    console.log(image);
    props.item.stats.forEach(stat => 
      Object.keys(stat).forEach(key => {
        statsKeys.push([key]);
        statsVal.push(stat[key]);
      })
    );
      
    formData.append('stats_keys', statsKeys);
    formData.append('stats_values', statsVal);

    axios.post(`http://localhost:9000/testAPI/${itemID}/update`,formData, {
      onUploadProgress: progressEvent => {
        console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
      }
    }).then(res => {
      console.log(res);
      window.location.assign(`${url[0]}//${url[2]}`);
    }).catch((error) => {
      console.log(error.response.data);
    });
  }


  return (
    <div className="forge">
      <div>
        <button onClick={handleDelete}> Delete</button>
      </div>
      {!props.item ? 'loading' : 
        <form encType="multipart/form-data" 
        onSubmit={handleSubmit}>  
          <label>
            <input onChange={(e)=> setName(e.target.value)} type='text' value={name}/>
          </label>
          <img src={props.item.img} alt={props.item.img}/>
          <label>
            <input type="file" name="item-image" onChange={(e)=> setImage(e.target.files[0])}/>
          </label>
          <label>
            <textarea onChange={(e)=> setDes(e.target.value)} className='des' value={des} type='text'/>
          </label>
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
          <label>
          {props.item.special === 'no special effect' ? 
            <p className='specialfx'>{props.item.special}</p>
            :
            <textarea onChange={(e)=> setSpecial(e.target.value)} className='specialfx' 
            defaultValue={props.item.special} />
          }
          </label>
          <button type="submit">Reforge</button>
        </form>
      }    
    </div>
  )
}

export default Forge;