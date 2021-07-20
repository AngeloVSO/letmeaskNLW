import { ReactNode } from "react";
import "../styles/question.scss";

type QuestionProp = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

const Question = ({
  isAnswered = false,
  isHighlighted = false,
  children,
  content,
  author,
}: QuestionProp) => {
  return (
    <div
      className={`question ${isAnswered ? "answered" : ""} 
      ${isHighlighted && !isAnswered ? "highlighted" : ""}`}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
};

export default Question;
