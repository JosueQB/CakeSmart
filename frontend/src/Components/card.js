export const Card = ({ children  }) => {
    return (
      <div className="bg-white shadow rounded-xl p-2">
        {children}
      </div>
    );
  };
  
  export const CardContent = ({ children  }) => {
    return <div className="flex flex-col ">{children}</div>;
  };