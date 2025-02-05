import React from 'react';
import logo from '@assets/logo.png';

const Footer: React.FC = () => {
    return (
        <footer className='flex bg-black py-10 sm:py-9 lg:py-8 xl:py-6 mt-auto'>

            <div >
            <img src={logo} alt="Logo" className='w-32 h-32 ms-5'  />
            </div>

            <div className="flex w-full justify-around text-white">

                <div>
                    <h3 className='text-xl mb-3 font-semibold'>Location</h3>
                    <p>Lac 3 Le Kram<br />Bon lieu, Tunisie</p>
                </div>

                <div>
                    <h3 className='text-xl mb-3 font-semibold'>On Accepte</h3>
                    <p>D17<br />Paypal<br />Cash<br />Crypto</p>
                </div>

                <div className='flex flex-col'>
                   <h3 className='text-xl mb-3 font-semibold'>Contact</h3>

                   <a href="#" className='hover:text-green-green'>Facebook</a>
                   <a href="#" className='hover:text-green-green'>Insta</a>
                   <a href="#" className='hover:text-green-green'>LinkedIn</a>
                    
                </div>

            </div>
        </footer>
    );
};

export default Footer;
