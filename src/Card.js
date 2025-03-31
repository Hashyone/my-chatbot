function Card({ children, className }) {
    return (
      <div className={`border p-4 rounded-md ${className}`}>
        {children}
      </div>
    );
  }
  
  export default Card;

  
  //export function CardContent({ children, className }) {
   // return (
    //  <div className={`p-2 ${className}`}>
    //    {children}
     // </div>
   // );
 // } 