import React, { useEffect, useState } from "react";
import Print from "./test";

// Interface for the Element component props
interface ElementProps {
    id: number;
    content: string;
  }
const Element: React.FC<ElementProps> = ({ id, content }) => (
    <div id={`element${id}`}>{content}</div>
  );

const ThreeJs: React.FC = () => {
    const [elements, setElements] = useState(Array.from({ length: 10 }, (_, i) => i + 1));

    // Function to update the content of a random element
    const updateRandomElement = () => {
        const randomIndex = Math.floor(Math.random() * 10);
        setElements(prevElements => {
            const newElements = [...prevElements];
            newElements[1] = (`Updated at ${new Date().toLocaleTimeString()}` as any);
            return newElements;
        });
    };

    useEffect(() => {
        const intervalId = setInterval(updateRandomElement, 10);
        return () => clearInterval(intervalId); // Cleanup on component unmount
      }, []);
    
      return (
        <div>
          {elements.map((content, index) => (
            <Element key={index + 1} id={index + 1} content={content.toString()} />
          ))}
        </div>
      );
}
export default ThreeJs;