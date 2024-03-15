import React, { useEffect, useState } from 'react'
import axios from "axios"
import './Table.css'
import {FaRegChartBar,FaLevelUpAlt, FaLevelDownAlt} from 'react-icons/fa'

const PercentageBar = ({ pctChange }) => {
    // Style the bar based on positive or negative percentage change
    const barStyle = {
        width: Math.abs(pctChange) + '%',
        backgroundColor: pctChange >= 0 ? '#4CAF50' : '#F44336',
        height: '10px',
        borderRadius: '10px'
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100px', backgroundColor: 'lightgray', marginRight: '5px', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={barStyle}></div>
            </div>
            <span>{pctChange}%</span>
        </div>
    );
};

function Table() {
    let [users,setUsers]=useState(null);
    const fetchdata=async()=>{
        try{
            let response=await axios.get("https://intradayscreener.com/api/openhighlow/cash");
            console.log(response.data);
            setUsers(response.data);
        }
        catch(err)
        {
            console.log(err);
        }
    };
    useEffect(()=>{
        fetchdata();
    },[])

    const handleCheckboxChange = (symbol) => {
        console.log("Checkbox for symbol", symbol, "changed");
    };

  return (
    <div>
        <table>
            <tr id='head'>
                <th className='item'>SYMBOL</th>
                <th className='item'>LTP  <i className="fas fa-info-circle"></i></th>
                <th className='item'>Momentum  <i className="fas fa-info-circle"></i></th>
                <th className='item'>OPEN <i className="fas fa-info-circle"></i></th>
                <th className='item'>Deviation from Pivots</th>
                <th className='item'>TODAYS RANGE <i className="fas fa-info-circle"></i></th>
                <th className='item'>OHL <i className="fas fa-info-circle"></i></th>
            </tr>
        </table>
        {users&&
        users.map((item)=>(
            <table id='body'>
                <tr id='row'>
                    <td className='item1' style={{ padding: "10px", border: "1px solid black", fontWeight: 'bolder', position: 'relative' }}>
                    <input type="checkbox" onChange={() => handleCheckboxChange(item.symbol)} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }} />
                        <span>{item.symbol}</span> <FaRegChartBar style={{ marginLeft: '20px', color: 'lightash' }} size={23} />
                    </td>
                    <td className='item2'>
                        <span>{item.ltp}</span>
                    </td>
                    <td className='item3'>{item.open}</td>
                    <td className='item4'>{item.high}</td>
                    <td className='item5'>{item.close}</td>
                    <td className='item6'>
                                {item.open} <PercentageBar pctChange={item.pctChange} />
                            </td>
                    <td style={{ padding: "10px", fontWeight: 'normal', fontSize: '13px' }} className='item7'>
                                <span style={{ backgroundColor: item.openHighLowSignal === 'Open=Low' ? '#abf7b1' : item.openHighLowSignal === 'Open=High' ? '#FF8A8A' : 'inherit', borderRadius: '80px', padding: '5px', color: item.openHighLowSignal === 'Open=Low' ? '#228C22' : item.openHighLowSignal === 'Open=High' ? '#DA012D' : 'inherit' }}>
                                    {item.openHighLowSignal === 'Open=Low' && <FaLevelUpAlt style={{ color: 'green' }} />}
                                    {item.openHighLowSignal === 'Open=High' && <FaLevelDownAlt style={{ color: 'red' }} />}
                                    {item.openHighLowSignal}
                                </span>
                            </td>
                </tr>
            </table>
        ))
        }
    </div>
  )
}

export default Table