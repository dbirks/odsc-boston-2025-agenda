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

  // Get primary topic (first non-empty tag) for the collapsed view
  const primaryTopic = tagArray.length > 0 ? tagArray[0] : "";

  return (
    <Card className="w-full mb-4 overflow-hidden transition-all duration-300">
      {isExpanded ? (
        // Expanded view - with full details
        <>
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
                session.access === "Platinum" ? "destructive" :
                "outline"
              }>{session.access}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <span>{session.displayStartTime}</span>
              <span>•</span>
              <span>{session.duration} min</span>
              {session.subtrack && (
                <>
                  <span>•</span>
                  <span>{session.subtrack}</span>
                </>
              )}
              <span>•</span>
              <span>{session.difficulty}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{session.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {/* Show ticket type with appropriate styling */}
              <Badge variant={
                session.access === "General" ? "default" :
                session.access === "Premium" ? "secondary" :
                session.access === "Platinum" ? "destructive" :
                "outline"
              }>
                {session.access} Access
              </Badge>
              
              {/* Session type */}
              {session.subtrack && (
                <Badge variant="outline" className="bg-gray-50">{session.subtrack}</Badge>
              )}
              
              {/* Session difficulty */}
              <Badge variant="outline" className="bg-gray-50">{session.difficulty}</Badge>
              
              {/* Topic tags */}
              {tagArray.map((tag, index) => (
                <Badge key={index} variant="outline">{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </>
      ) : (
        // Compact collapsed view
        <CardHeader className="py-3">
          <div className="flex justify-between items-center">
            <div className="flex-grow">
              <h3 className="font-medium text-base">{session.talkTitle}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <span className="font-semibold">{session.displayStartTime}</span>
                <span>•</span>
                <span>{session.duration} min</span>
                {session.subtrack && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                    {session.subtrack}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {primaryTopic && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 hidden sm:inline-flex">
                  {primaryTopic}
                </Badge>
              )}
              <Badge variant={
                session.access === "General" ? "default" :
                session.access === "Premium" ? "secondary" :
                session.access === "Platinum" ? "destructive" :
                "outline"
              } className="text-[10px] px-1.5 py-0 h-4">
                {session.access}
              </Badge>
            </div>
          </div>
        </CardHeader>
      )}
      <CardFooter className="flex justify-center py-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs h-6 py-0"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </CardFooter>
    </Card>
  );
}