import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import OutputText from "@/components/OutputText"

const Translate: React.FC = () => { 
    const [inputText, setInputText] = useState<string>("");
    const [outputText, setOutputText] = useState<string>("");
    
    const handleButtonClick = () => {
        setOutputText(inputText);
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
        
        <OutputText text={outputText} />
        
      </div>
    </>
    )
 }

export default Translate;