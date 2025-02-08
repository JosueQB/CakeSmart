// components/ThoughtBubble.js

export default function ThoughtBubble({ children }) {
    const bubbleStyle = {
      backgroundColor: '#87CEEB',
      borderRadius: '25px',
      padding: '15px 25px',
      maxWidth: '550px',
      position: 'relative',
      fontSize: '16px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
      fontWeight: 'bold',
    };
  
    const arrowStyle = {
      content: "''",
      position: 'absolute',
      bottom: '-10px',
      left: '30px',
      borderWidth: '10px',
      borderStyle: 'solid',
      borderColor: '#f1f1f1 transparent transparent transparent',
    };
  
    return (
      <span style={bubbleStyle}>
        {children}
        <div style={arrowStyle}></div>
      </span>
    );
  }
  