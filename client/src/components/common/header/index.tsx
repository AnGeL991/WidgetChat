import { FC } from "react";

export const HeaderChat: FC = () => {
  return (
    <header className="widget__header">
      <div className='widget__imgWrapper'>
      <img
        src="https://scontent-frx5-1.xx.fbcdn.net/v/t31.18172-8/17504333_1947328018822736_4971666958044418282_o.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=tbhaoX8JARcAX8mhbUY&_nc_ht=scontent-frx5-1.xx&oh=70926f017701f5a96b1a6a9a544b6bb8&oe=609A9CB8"
        alt="support foto"
        className='widget__img'
      />
      </div>
      <span className='widget__online'></span>
      <h3 className='widget__title'>Adrian Markuszewski</h3>
      <span className='widget__description'> Typically replies within a few minutes </span>
    </header>
  );
};
