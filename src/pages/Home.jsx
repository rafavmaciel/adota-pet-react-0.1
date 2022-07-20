import React from 'react';
import './style/home.css';
import Card from '../components/Card';

export default function Home() {
  return (
    <>
      <div className='Home'>
  
        <div className='Cards-home'>
          <Card
            img='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            title='Gato raguento'
            description='só come o que gosta, passa dez dias fora de casa'
          />
          <Card
            img='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            title='Gato raguento 2'
            description='só come o que gosta, passa dez dias fora de casa'
          />
          <Card
            img='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            title='Gato raguento 3'
            description='só come o que gosta, passa dez dias fora de casa'
          />
          </div>
      </div>
    </>
  );
}
