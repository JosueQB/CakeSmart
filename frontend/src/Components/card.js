export const Card = ({ children, className }) => {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        {children}
      </div>
    );
  };
  
  export const CardContent = ({ children, className }) => {
    return <div className="flex flex-col ">{children}</div>;
  };