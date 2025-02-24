function Card({ extra, children, ...rest }) {
    return (
      <div
        className={`relative flex flex-col rounded-[20px] bg-white shadow-lg ${extra}`}
        {...rest}
      >
        {children}
      </div>
    );
  }
  
  export default Card;
  