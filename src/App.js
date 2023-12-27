import React, {useState} from 'react'
import './App.css';
// import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const getItem = () =>{
    return JSON.parse(localStorage.getItem("local")) || [];
}
  const notify = () => toast.success("Item added to the list", {
    position: toast.POSITION.TOP_CENTER
  });
 
  const notify1 = () =>  toast.success("Item deleted", {
    position: toast.POSITION.TOP_CENTER
  });
  const [userText, setUserText]=useState("");
  const [data ,setData]=useState(getItem());
  const onInputChange=(e)=>{
    // console.log(e.target.value);
    setUserText(e.target.value);
  }
  const diplayData=()=>{
    let newData=[...data,{
      text:userText,  
      check:false
   

    }];
    setData(newData);
    localStorage.setItem("local",JSON.stringify(newData));
    setUserText("")
  }
  const checked=(idx)=>{
    let newData=[...data];
    newData[idx].check=!newData[idx].check
    setData(newData)
    localStorage.setItem("local",JSON.stringify(newData));

  }
  const removeItem=(idx)=>{
    let newData=[...data];
    newData.splice(idx,1);
    setData(newData)
    localStorage.setItem("local",JSON.stringify(newData));
  }
  return (
    <div className="App">
    <ToastContainer />
    <h1>Grocery Bud
    </h1>
    <div className='input_btn_container'>
    <input type="text" value={userText} onChange ={e => onInputChange(e)}/>
    <button onClick={()=>{diplayData();notify()}}>Add Item</button>
    </div>
    {data.map((item,idx)=>{
      return (<div  key={idx} className='hide_display'>
        <div className='display'><p style={{textDecoration:(item.check)?"line-through":"none"}}>{item.text}</p>
        <input type="checkbox" checked ={item.check} onChange={()=>checked(idx)}/></div>
        
      <button onClick={()=>{
        removeItem(idx);
        notify1()
      }} >Delete</button>
        </div>
      )
    })
  
    }

  
    </div>
  );
}

export default App;
