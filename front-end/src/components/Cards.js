import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Dear Visitors!</h1>

      <p>&nbsp;&nbsp; &nbsp;Explore museums like never before! Scan exhibit QR codes for virtual descriptions,
      uncovering fascinating stories and historical context. Engage with interactive features and multimedia content
       at your own pace. Whether a museum enthusiast or newcomer, our platform offers a personalized and enriching experience,
        seamlessly blending the physical and digital worlds.
       Unveil the hidden wonders of the past during your visit</p>

      <div className='cards__container'>
        <div className='cards__wrapper'>


        </div>
      </div>
    </div>
  );
}

export default Cards;
