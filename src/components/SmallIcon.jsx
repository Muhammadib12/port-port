export default function SmallIcon() {
    return (
      <div
        style={{
          width: "25px",
          height: "25px",
          backgroundColor: "#808080", // Gray background
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "14px",
          fontFamily: "Arial, sans-serif",
          color: "white",
          position: "relative",
          borderRadius: "50%", // Optional rounded edges
        }}
      >
        <span style={{ color: "white", marginRight: "2px" }}>A</span>
        <span style={{ color: "orange" }}>J</span>
      </div>
    );
  }

  