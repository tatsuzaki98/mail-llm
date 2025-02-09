import React from 'react';
import useSWR from 'swr';
import {getMailLogRecords, postMailLogRecord} from '@/client';
import { performGemini } from '@/client/geminiApi';
import useSWRMutation from 'swr/mutation';
import { State } from './types';
import View from './view';



const ChatComponent = (): React.JSX.Element => {
  /**
   * State
   **/
  const [state, setState] = React.useState<State>({
    query: '',
    response: '',
    record: {
      '受信メッセージ': {value: ''},
      '送信メッセージ': {value: ''},
      '対応者': {value: ''},
      'お客様名': {value: ''},
      'カテゴリ': {value: ''},
    }
  });

  /**
   * SWR
   **/
  const kintoneCache = useSWR(
    `/records.json?app=${import.meta.env.VITE_MAILLOG_APP_ID}`,
    getMailLogRecords,
  );
  const geminiCache = useSWRMutation('gemini', performGemini);

  /**
   * Event Handlers
   **/
  const handlers = {
    inputQuery: (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setState({...state, query: e.target.value});
    },
    editResponse: (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setState({...state, response: e.target.value});
    },
    inputRecord: (e: React.ChangeEvent<HTMLInputElement>): void => {
      setState({
        ...state,
        record: {
          ...state.record,
          [e.target.name]: {value: e.target.value},
        },
      });
    },
    submitGemini: (): void => {
      const res = kintoneCache.data?.records.map((record) => {
        return [
          {text: `input: ${record.お問合せ内容.value}`},
          {text: `output: ${record.返信内容.value}`},
        ]
      }).flat() || [];
      geminiCache.trigger({query: state.query, context: res});
    },
    submitKintone: (e: React.FormEvent): void => {
      e.preventDefault();
      const res: PostRecord = {
        app: parseInt(import.meta.env.VITE_MAILLOG_APP_ID),
        record: {
          ...state.record,
          "お問合せ内容": {value: state.query},
          "返信内容": {value: state.response},
        },
      };
      if (postMailLogRecord !== null) {
        postMailLogRecord(res)
          .then(() => {
            console.log('Success');
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  };

  /**
   * Effects
   */
  React.useEffect(() => {
    if (geminiCache.data && state.response !== geminiCache.data) {
      setState({...state, response: geminiCache.data});
      console.log(geminiCache.data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geminiCache.data]);

  /**
   * Render
   */
  if (kintoneCache.isLoading) return <div>Loading...</div>;
  return <View {...{state, setState, geminiCache, handlers}} />;
};

export default ChatComponent;
