import React, { useState } from 'react';
import axios from 'axios';
import OutputText from "@/components/OutputText"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const GenerateSentences: React.FC = () => { 
    const [vocabulary, setVocabulary] = useState<string>("");
    const [grammar, setGrammar] = useState<string>("");
    const [level, setLevel] = useState<string>("A1");
    const [sentenceLength, setSentenceLength] = useState<string>("medium");
    const [outputText, setOutputText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const levels = {
        "A1": "A1",
        "A2": "A2",
        "B1": "B1",
        "B2": "B2",
        "C1": "C1",
        "C2": "C2"
    };

    const length = {
        "small": "small",
        "medium": "medium",
        "large": "large",
    }

    const prompt: string = `
        Please generate 1 sentence of ${length} size in French at a ${level} level, 
        utilizing grammar rules including ${grammar}, 
        and include some of these vocabulary words at random: ${vocabulary}.
        Say something very different than my last sentence that read "${outputText}".
        `

    const modelChoice = "gpt-4o-mini"

    const handleButtonClick = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
            // if (import.meta.env.PROD) {
            //     const apiUrl = "https://backend-production-cb2a.up.railway.app"
            //     console.log("api url inside prod:", apiUrl);
            // } else {
            //     const apiUrl = "http://localhost:8080"
            //     console.log("api url inside dev:", apiUrl);
            // }
            // const apiUrl = "https://backend-production-cb2a.up.railway.app"
            // console.log("api url inside try catch:", apiUrl);
            
            const response = await axios.post(`${apiUrl}/sentences`, {
                "prompt": prompt,
                "model": modelChoice
            });
            
            // Axios automatically throws errors for non-2xx status codes
            // and parses JSON responses
            setOutputText(response.data.sentences || JSON.stringify(response.data.text));
        } catch (err) {
            // Axios error handling
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || err.message;
                setError(`Failed to generate sentences: ${errorMessage}`);
            } else {
                setError(`Failed to generate sentences: ${err instanceof Error ? err.message : 'Unknown error'}`);
            }
            console.error('API call failed:', err);
            
            // Fallback to mock response for development
            const mockResponse = `Vocabulary: ${vocabulary}, Grammar: ${grammar}, Level: ${level}, Length: ${sentenceLength}`;
            setOutputText(mockResponse);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="container mx-auto py-8 space-y-8">
            <h1 className="text-2xl font-bold mb-6">Generate Language Learning Sentences</h1>
            
            <Card>
                <CardContent className="pt-6">
                    <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        handleButtonClick();
                    }}>
                        <div className="space-y-2">
                            <Label htmlFor="vocabulary">Vocabulary</Label>
                            <Textarea 
                                id="vocabulary" 
                                placeholder="Enter vocabulary words (separated by commas)" 
                                value={vocabulary}
                                onChange={(e) => setVocabulary(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="grammar">Grammar Structures</Label>
                            <Textarea 
                                id="grammar" 
                                placeholder="Enter grammar structures to practice" 
                                value={grammar}
                                onChange={(e) => setGrammar(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="level">Proficiency Level</Label>
                                <Select value={level} onValueChange={setLevel}>
                                    <SelectTrigger id="level">
                                        <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(levels).map((key) => (
                                            <SelectItem key={key} value={key}>{levels[key as keyof typeof levels]}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="length">Sentence Length</Label>
                                <Select value={sentenceLength} onValueChange={setSentenceLength}>
                                    <SelectTrigger id="length">
                                        <SelectValue placeholder="Select length" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(length).map((key) => (
                                            <SelectItem key={key} value={key}>{length[key as keyof typeof length]}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Generating...' : 'Generate Sentences'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                    {error}
                </div>
            )}

            {outputText && !isLoading && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Generated Sentences</h2>
                    <OutputText text={outputText} />
                </div>
            )}
        </div>
    )
}

export default GenerateSentences;