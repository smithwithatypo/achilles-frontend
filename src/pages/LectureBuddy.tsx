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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



const LectureBuddy: React.FC = () => { 
    const [topic, setTopic] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [choice, setChoice] = useState<string>("sentence");
    const [outputText, setOutputText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const choices: Record<string, string> = {
        "sentence": "sentence",
        "analogy": "analogy",
        "ELI5": "ELI5",
        "paragraph": "paragraph",
    };

    const my_background = "[music performance, martial arts, teaching, piano, video games, programming]"

    const answer_guidance: Record<string, string> = {
        "sentence": "summarize in one sentence",
        "analogy": `give me an analogy for this topic. Try to use a random example from my background in ${my_background}`,
        "ELI5": "explain like I'm 5 but use adult language please",
        "paragraph": "summarize in one paragraph"
    };

    const prompt: string = `
        I'm studying the general topic of ${topic}.
        What is ${question}?
        ${answer_guidance[choice]}.
    `

    const modelChoice = "gpt-4o-mini"

    const handleButtonClick = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            // const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
            // const apiUrl = import.meta.env.VITE_API_URL;  // testing
            // const apiPort = import.meta.env.VITE_API_PORT; // testing
            // const apiFull = `http://${apiUrl}:${apiPort}`
            // const POCKETBASE_URL=http://${{pocketbase.RAILWAY_PRIVATE_DOMAIN}}:${{pocketbase.PORT}}
            // const apiFull = http://${{achilles-backend.railway.internal}}:8080
            const apiFull = import.meta.env.VITE_FULL_URL;
            // const apiFull = "https://achilles-backend-production.up.railway.app";  // works

            
            console.log("full env api is:", apiFull)  // testing
            const apiEndpoint: string = "sentences"
            
            const response = await axios.post(`${apiFull}/${apiEndpoint}`, {
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
            // const mockResponse = `Vocabulary: ${vocabulary}, Grammar: ${grammar}, Level: ${level}, Length: ${sentenceLength}`;
            const mockResponse = "something didn't go right...";
            setOutputText(mockResponse);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="container mx-auto py-8 space-y-8">
            {/* <h1 className="text-2xl font-bold mb-6">Lecture Buddy</h1> */}
            
            <Card>
                <CardHeader>
                    <CardTitle> Lecture Buddy </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        handleButtonClick();
                    }}>
                        <div className="space-y-2">
                            <Label htmlFor="topic">Topic</Label>
                            <Textarea 
                                id="topic" 
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="question">Question</Label>
                            <Textarea 
                                id="question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="choice">Type of response</Label>
                                <Select value={choice} onValueChange={setChoice}>
                                    <SelectTrigger id="choice">
                                        <SelectValue placeholder="Select a choice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(choices).map((key) => (
                                            <SelectItem key={key} value={key}>{choices[key as keyof typeof choices]}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                        <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Generating...' : 'Ask'}
                        </Button>
                        </div>
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
                    <h2 className="text-xl font-semibold mb-4">Answer</h2>
                    <OutputText text={outputText} />
                </div>
            )}
        </div>
    )
}

export default LectureBuddy;