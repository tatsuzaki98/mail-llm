import { SWRMutationResponse } from "swr/mutation";


export interface State {
  query: string;
  response: string;
  record: {
    '受信メッセージ': {value: string};
    '送信メッセージ': {value: string};
    '対応者': {value: string};
    'お客様名': {value: string};
    'カテゴリ': {value: string};
  };
}

export interface Props {
  state: State;
  geminiCache: SWRMutationResponse<string, string, "gemini", {
      query: string;
      context: {
          text: string;
      }[];
  }>;
  handlers: {
    inputQuery: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    editResponse: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    inputRecord: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submitGemini: () => void;
    submitKintone: (e: React.FormEvent) => void;
  };
}

