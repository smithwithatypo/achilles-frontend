import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const Translate: React.FC = () => { 
    const [inputText, setInputText] = useState<string>("");
    const [outputText, setOutputText] = useState<string>("output text");
    const [selectedText, setSelectedText] = useState<string>("");
    const [menuPosition, setMenuPosition] = useState<{ x: number, y: number } | null>(null);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const outputRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    
    // Update window width on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
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
                
                // Calculate position - this will be adjusted when rendering to ensure it's on screen
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
        switch (action) {
            case "reverso":
                window.open(`https://context.reverso.net/translation/french-english/${encodeURIComponent(selectedText)}`, '_blank');
                break;
            case "conjugeur":
                window.open(`https://leconjugueur.lefigaro.fr/php5/index.php?l=uk&verbe=${encodeURIComponent(selectedText)}`, '_blank');
                break;
            case "google_translate":
                window.open(`https://translate.google.com/?sl=fr&tl=en&text=${encodeURIComponent(selectedText)}`, '_blank');
                break;
            case "chatgpt":
                window.open(`https://chat.openai.com/?prompt=${encodeURIComponent(`Translate this French text to English: "${selectedText}"`)}`, '_blank');
                break;
            default:
                console.log(`Action '${action}' performed on: "${selectedText}"`);
                break;
        }
        setMenuPosition(null);
    };

    return (
    <>
      <div>
        <div className="inputText w-full max-w-2xl mx-2 mt-4">
            <Card>
                <CardHeader>
                    <CardTitle> Input </CardTitle>
                </CardHeader>
                <CardContent className="min-h-48">
                    <Textarea 
                    placeholder="Your text goes here" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-48"
                    />
                </CardContent>
            <Button 
                onClick={handleButtonClick}
                className="max-w-lg mx-auto"
            > Ready for learning </Button>
            </Card>
        </div>
        <div 
            className="outputText w-full max-w-2xl mx-2 mt-10" 
            ref={outputRef}
        >
            <Card>
                <CardHeader>
                    <CardTitle> Highlight anything! </CardTitle>
                </CardHeader>
                <CardContent>
                    {outputText}
                </CardContent>
            </Card>
        </div>

        {menuPosition && selectedText && (
            <div 
                className="floating-menu"
                ref={menuRef}
                style={{
                    position: 'absolute',
                    left: `${Math.min(menuPosition.x, windowWidth - (menuRef.current?.offsetWidth || 300) - 20)}px`,
                    top: `${menuPosition.y}px`,
                    transform: 'translate(-25%, -100%)',
                    background: 'white',
                    padding: '2px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    zIndex: 1000,
                    display: 'flex',
                    gap: '5px'
                }}
            >
                <Button size="sm" onClick={() => handleMenuAction('reverso')}>Rev</Button>
                <Button size="sm" onClick={() => handleMenuAction('conjugeur')}>Conj</Button>
                <Button size="sm" onClick={() => handleMenuAction('google_translate')}>Google</Button>
                <Button size="sm" onClick={() => handleMenuAction('chatgpt')}>Chat</Button>
                <Button size="sm" variant="destructive" onClick={() => setMenuPosition(null)}>✕</Button>
            </div>
        )}
      </div>
    </>
    )
 }

export default Translate;