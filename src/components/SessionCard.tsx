import { useState } from "react";
import type { SessionItem } from "../types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface SessionCardProps {
  session: SessionItem;
}

export function SessionCard({ session }: SessionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const tagArray = [
    session.topicTag1,
    session.topicTag2,
    session.topicTag3,
    session.topicTag4
  ].filter(tag => tag);

  return (
    <Card className="w-full mb-4 overflow-hidden transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{session.talkTitle}</CardTitle>
            <CardDescription className="mt-1">
              {session.speakerName} ({session.speakerTitle}) - {session.speakerCompany}
            </CardDescription>
          </div>
          <Badge variant={
            session.access === "General" ? "default" :
            session.access === "Premium" ? "secondary" :
            "outline"
          }>{session.access}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <span>{session.displayStartTime}</span>
          <span>•</span>
          <span>{session.duration} min</span>
          <span>•</span>
          <span>{session.difficulty}</span>
        </div>
      </CardHeader>
      <CardContent className={`transition-all duration-300 ${isExpanded ? "max-h-[1000px]" : "max-h-20 overflow-hidden"}`}>
        <p className="whitespace-pre-line">{session.description}</p>
        
        {tagArray.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tagArray.map((tag, index) => (
              <Badge key={index} variant="outline">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </CardFooter>
    </Card>
  );
}