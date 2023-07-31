import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { v4 } from "uuid"
import axios from 'axios';

import Popup from 'reactjs-popup';
const MainList = ()  => {
    const[nameChannel,setNameChannel]=useState(
    {
    name:''}
    )
     let [channel,setChannel]=useState(null)

    const [open, setOpen] = useState(false);

     let navigate = useNavigate();
 let CreateChannel = ()=>{
     axios.post('/my_app/channels/all',nameChannel)
        .then((response)=>{
            if(!response.status==201){
                alert("not added")
            }else{
            alert('added')
            setChannel(response.data.id)}
        }
        ).catch((e)=>{alert('added')});
    navigate('/channel/'+channel?.id)
 }


return (
		<div id="popup1" >
		<br/>
		<h1>Messenger app</h1>
		<br/>
		<table>
		<tbody>
            <thead>
                <tr>
				    <th></th>
				    <th>Channel</th>
				    <th>Number of users</th>
			    </tr>
			</thead>
			<tbody>
			    <tr>
			        <td>1</td>
			        <td></td>
			        <td></td>
			    </tr>
			    <tr>
			        <td>2</td>
			        <td></td>
			        <td></td>
			    </tr>

			</tbody>
        </tbody>

        </table>
        <br/>

 <Popup trigger=
                {<button>CreateChannel</button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>

                                <form onSubmit={CreateChannel}>

                    <label>Can you give a name to this channel?Thanks! </label>
                    <input
                        type='text'
                        className='form-control'
                        type='text'
                        placeholder='Name Channel *'
                        name='text'
                        value={nameChannel.name}
                        onChange={(event) => setNameChannel({...nameChannel, name: event.target.value})}
                        required

                    />

                <input  type='submit' text="send" />
            </form>
                            </div>
                            <div>

                                <button className='exit' onClick=
                                    {() => close()}>
                                        Cancel
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
		</div>
		)
};
export default MainList