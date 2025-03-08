import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Translate: React.FC = () => { 
    const [inputText, setInputText] = useState<string>("");
    const [outputText, setOutputText] = useState<string>("output text");
    const [selectedText, setSelectedText] = useState<string>("");
    const [menuPosition, setMenuPosition] = useState<{ x: number, y: number } | null>(null);
    const outputRef = useRef<HTMLDivElement>(null);
    
    const handleButtonClick = () => {
        setOutputText(inputText);
    };

    const handleTextSelection = () => {
        const selection = window.getSelection();
        
        if (selection && selection.toString() && outputRef.current?.contains(selection.anchorNode)) {
            const selectedContent = selection.toString();
            
            if (selectedContent.trim().length > 0) {
                setSelectedText(selectedContent);
                
                // Get position for the floating menu
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                
                setMenuPosition({
                    x: rect.left + window.scrollX + (rect.width / 2),
                    y: rect.top + window.scrollY - 10
                });
            } else {
                setSelectedText("");
                setMenuPosition(null);
            }
        } else {
            setSelectedText("");
            setMenuPosition(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mouseup", handleTextSelection);
        return () => {
            document.removeEventListener("mouseup", handleTextSelection);
        };
    }, []);

    const handleMenuAction = (action: string) => {
        console.log(`Action '${action}' performed on: "${selectedText}"`);
        // Implement your actions here
        setMenuPosition(null);
    };

    return (
    <>
      <div className="container">
        <div className="inputText">
            <Textarea 
                placeholder="Paste your text here" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <Button onClick={handleButtonClick}>Ready for learning</Button>
        </div>
        <div 
            className="outputText" 
            ref={outputRef}
        >
            {outputText}
        </div>

        {menuPosition && selectedText && (
            <div 
                className="floating-menu"
                style={{
                    position: 'absolute',
                    left: `${menuPosition.x}px`,
                    top: `${menuPosition.y}px`,
                    transform: 'translate(-50%, -100%)',
                    background: 'white',
                    padding: '5px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    zIndex: 1000,
                    display: 'flex',
                    gap: '5px'
                }}
            >
                <Button size="sm" onClick={() => handleMenuAction('save')}>Save</Button>
                <Button size="sm" variant="outline" onClick={() => handleMenuAction('highlight')}>Highlight</Button>
                <Button size="sm" variant="destructive" onClick={() => setMenuPosition(null)}>✕</Button>
            </div>
        )}
      </div>
    </>
    )
 }

export default Translate;