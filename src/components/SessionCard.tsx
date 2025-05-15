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

  // Use the tags array from the new format if available, otherwise use the old tag fields
  const tagArray = session.tags && session.tags.length > 0 
    ? session.tags 
    : [
        session.topicTag1,
        session.topicTag2,
        session.topicTag3,
        session.topicTag4
      ].filter(tag => tag);

  // Get primary topic (first non-empty tag) for the collapsed view
  const primaryTopic = tagArray.length > 0 ? tagArray[0] : "";

  // Truncate text function
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Card className="w-full mb-4 overflow-hidden transition-all duration-300">
      {isExpanded ? (
        // Expanded view - with full details
        <>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{session.title || session.talkTitle}</CardTitle>
                <CardDescription className="mt-1">
                  {session.speakers && session.speakers.length > 0 
                    ? `${session.speakers[0].name} (${session.speakers[0].jobTitle}) - ${session.speakers[0].company}` 
                    : `${session.speakerName || ''} ${session.speakerTitle ? `(${session.speakerTitle})` : ''} ${session.speakerCompany ? `- ${session.speakerCompany}` : ''}`
                  }
                </CardDescription>
              </div>
              <Badge variant={
                session.access === "General" ? "default" :
                session.access === "Premium" ? "secondary" :
                session.access === "Platinum" ? "destructive" :
                session.access === "Gold" ? "gold" :
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
            
            {/* Session Links Section */}
            {(session.webinarLink || session.slackUrl || session.replayLink || session.detailLink || session.prerequisite) && (
              <div className="mt-4 flex flex-col gap-2">
                <h4 className="text-sm font-medium">Session Links</h4>
                <div className="flex flex-col gap-1">
                  {session.webinarLink && (
                    <a 
                      href={session.webinarLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                      </svg>
                      Join Webinar
                    </a>
                  )}
                  {session.slackUrl && (
                    <a 
                      href={session.slackUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                      Join Slack Discussion
                    </a>
                  )}
                  {session.replayLink && (
                    <a 
                      href={session.replayLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      Watch Replay
                    </a>
                  )}
                  {session.detailLink && (
                    <a 
                      href={session.detailLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Session Details
                    </a>
                  )}
                  {session.prerequisite && (
                    <a 
                      href={session.prerequisite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Prerequisites
                    </a>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mt-4">
              {/* Show ticket type with appropriate styling */}
              <Badge variant={
                session.access === "General" ? "default" :
                session.access === "Premium" ? "secondary" :
                session.access === "Platinum" ? "destructive" :
                session.access === "Gold" ? "gold" :
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
              
              {/* Unlockable indicator */}
              {session.unlockable && (
                <Badge variant="outline" className="bg-amber-50 border-amber-300 text-amber-700">
                  Unlockable
                </Badge>
              )}
              
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
            <div className="flex-grow overflow-hidden">
              <h3 className="font-medium text-base truncate" title={session.title || session.talkTitle}>
                {session.title || session.talkTitle}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <span className="font-semibold">{session.displayStartTime}</span>
                <span>•</span>
                <span>{session.duration} min</span>
                {session.subtrack && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 max-w-16 overflow-hidden text-ellipsis whitespace-nowrap" title={session.subtrack}>
                    {truncateText(session.subtrack, 10)}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 ml-1 flex-shrink-0">
              {primaryTopic && (
                <Badge 
                  variant="outline" 
                  className="text-[10px] px-1.5 py-0 h-4 hidden sm:inline-flex max-w-16 overflow-hidden text-ellipsis whitespace-nowrap"
                  title={primaryTopic}
                >
                  {truncateText(primaryTopic, 10)}
                </Badge>
              )}
              <Badge 
                variant={
                  session.access === "General" ? "default" :
                  session.access === "Premium" ? "secondary" :
                  session.access === "Platinum" ? "destructive" :
                  session.access === "Gold" ? "gold" :
                  "outline"
                } 
                className="text-[10px] px-1.5 py-0 h-4 max-w-16 overflow-hidden text-ellipsis whitespace-nowrap"
                title={session.access}
              >
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