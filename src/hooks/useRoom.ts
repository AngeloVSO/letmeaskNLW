import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
};

type FirbaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}>

export const useRoom = (roomId:string) => {
  const [dataQuestions, setDataQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");
  
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const dbRoom = room.val();
      const resultQuestions: FirbaseQuestions = dbRoom.questions ?? {};
      const parsedQuestions = Object.entries(resultQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        }
      );
      setTitle(dbRoom.title);
      setDataQuestions(parsedQuestions);
    });
  }, [roomId]);

  return { dataQuestions, title }
}
