import { FC } from "react";

export const HeaderChat: FC = () => {
  return (
    <header className="widget__header">
      <div className='widget__imgWrapper'>
      <img
        src='image/User.png'
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
