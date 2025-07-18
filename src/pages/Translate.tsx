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
      <div className="mx-5">
        <div className="inputText w-full max-w-2xl mx-2 mt-4">
            <Card>
                <CardHeader>
                    <CardTitle> French Text </CardTitle>
                </CardHeader>
                <CardContent className="min-h-48">
                    <Textarea 
                    placeholder="copy / paste your french text here" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-48"
                    />
                </CardContent>
            <Button 
                onClick={handleButtonClick}
                className="max-w-lg mx-auto"
            > Ready </Button>
            </Card>
        </div>
        
        <div className="mt-10 container">
        <p className="text-sm text-muted-foreground px-3">
            Select any words below to start learning! 😊
        </p>
        <OutputText text={outputText} />
        </div>
        
      </div>
    </>
    )
 }

export default Translate;