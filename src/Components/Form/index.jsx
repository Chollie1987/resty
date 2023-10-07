import React, {useState} from 'react'
import './Form.scss';

const Form = (props) => {
  const [formData, setFormData] = useState( {
    method:'GET',
    url: '',
  });

  const handleSubmit = (e) => {
      e.preventDefault();
        props.handleApiCall(formData);
    };
     
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({...formData, [name]: value });
    
  };
  console.log(formData);
  return(
  <div>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input 
          data-testid='formInput'
          onChange={handleInputChange} name='url' type='text' value={formData.url} />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <button onClick= {() => handleInputChange({target:{name:'method', value:'GET'}})}id="get">GET</button>
          <button onClick={() => handleInputChange({target:{name:'method', value:'POST'}})} id="post">POST</button>
          <button onClick={() => handleInputChange({ target: { name: 'method', value: 'PUT' } })} id="put">PUT</button>
          <button onClick={() => handleInputChange({ target: { name: 'method', value: 'DELETE' } })} id="delete">DELETE</button>
        </label>
        {(formData.method === 'POST' || formData.method === 'PUT') && (<><label htmlFor="story">Tell us your story:</label>

          <textarea id="story" name="story" rows="5" cols="33" value='Welcome'/>
          
</>)}
      </form>
    </div>
  );
};

export default Form


// import React from 'react';


// class Form extends React.Component {

//   handleSubmit = e => {
//     e.preventDefault();
//     const formData = {
//       method:'GET',
//       url: 'https://pokeapi.co/api/v2/pokemon',
//     };
//     this.props.handleApiCall(formData);
//   }

//   render() {
//     return (
//       <>
//         <form onSubmit={this.handleSubmit}>
//           <label >
//             <span>URL: </span>
//             <input name='url' type='text' />
//             <button type="submit">GO!</button>
//           </label>
//           <label className="methods">
//             <span id="get">GET</span>
//             <span id="post">POST</span>
//             <span id="put">PUT</span>
//             <span id="delete">DELETE</span>
//           </label>
//         </form>
//       </>
//     );
//   }
// }

// export default Form;
