function ItemDisplay(props) {
  return (
    <div className={`item ${props.item.quality}`}>
      <div className='item-info'>
        <h3>{props.item.name}</h3>
        <img src={props.item.img} alt={props.item.imgtext}/>
        <p className='des'>{props.item.description}</p>
      </div>
      <div className="stats">
        {props.item.stats.map((stat, index) => {
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
      <p className='specialfx'>{props.item.special === 'no special effect' ? null : props.item.special}</p>
    </div>
  )

}

export default ItemDisplay;