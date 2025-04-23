import React, { useEffect, useRef, useState } from "react";

function UseRefDemo2() {
  const [value, setValue] = useState("Janak");
  const inputRef = useRef();
  const red = useRef();
  const green = useRef();
  const display = useRef();
  const divRef = useRef();

  const colorChange = () => {
    red.current.style.color = "red";
    green.current.style.color = "green";
    display.current.style.display = "";
    divRef.current.title = "This is title";
  };

  useEffect(() => {
    inputRef.current.value = "Gita";
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" value={value} />
      <h1 ref={green} style={{ color: "red" }}>
        Hello
      </h1>
      <h1 ref={red}>Hello</h1>
      <button ref={display} style={{ display: "none" }}>
        Hide Button
      </button>
      <br />
      <div ref={divRef}>Hello</div>
      <br />
      <button onClick={colorChange}>Click</button>
    </div>
  );
}

export default UseRefDemo2;
