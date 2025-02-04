import React from 'react';
import useSWR from 'swr';
import {getMailLogRecords, postMailLogRecord} from '@/client';
import { performGemini } from '@/client/geminiApi';
import useSWRMutation from 'swr/mutation';


interface State {
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
  const {data, isLoading, error} = useSWR(
    `/records.json?app=${import.meta.env.VITE_MAILLOG_APP_ID}`,
    getMailLogRecords,
  );
  const {trigger, data: gData, isMutating} = useSWRMutation('gemini', performGemini);

  /**
   * Event Handlers
   **/
  const handleClick = () => {
    const res = data?.records.map((record) => {
      return [
        {text: `input: ${record.受信メッセージ.value}`},
        {text: `output: ${record.送信メッセージ.value}`},
      ]
    }).flat() || [];
    trigger({query: state.query, context: res});
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = {
      app: parseInt(import.meta.env.VITE_MAILLOG_APP_ID),
      record: {
        ...state.record,
        "受信メッセージ": {value: state.query},
        "送信メッセージ": {value: state.response},
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
  }

  /**
   * Effects
   */
  React.useEffect(() => {
    if (gData && state.response !== gData) {
      setState({...state, response: gData});
      console.log(gData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gData]);

  /**
   * Render
   */
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <section>
      <form className='space-y-2'>
        <h3 className='font-bold text-lg'>
          プロンプト
        </h3>

        <textarea
          className={`
            block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
            border border-gray-300 focus:ring-blue-500 focus:border-blue-500
            h-28
          `}
          value={state.query}
          onChange={(e) => setState({...state, query: e.target.value})}
        />

        <div className='flex-col flex'>
          {!isMutating ? (
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleClick}
            >
              自動生成
            </button>
          ) : (
            <div className='flex justify-center'>
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
      </form>

      {gData && (
        <>
          <div className='mt-4'>
            <h3 className='font-bold text-lg'>
              自動生成
            </h3>
          </div>
          <form>
            <div>
              <textarea
                className={`
                  block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                  border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                  h-28
                `}
                value={state.response}
                onChange={(e) => setState({...state, response: e.target.value})}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col w-full md:w-1/3">
                <label htmlFor="customer-name" className="text-sm font-medium text-gray-700 mb-1">
                  お客様名
                </label>
                <input
                  id="customer-name"
                  type="text"
                  className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  value={state.record['お客様名'].value}
                  onChange={(e) =>
                    setState({
                      ...state,
                      record: { ...state.record, 'お客様名': { value: e.target.value } },
                    })
                  }
                />
              </div>
              <div className="flex flex-col w-full md:w-1/3">
                <label htmlFor="responsible-person" className="text-sm font-medium text-gray-700 mb-1">
                  対応者
                </label>
                <input
                  id="responsible-person"
                  type="text"
                  className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  value={state.record['対応者'].value}
                  onChange={(e) =>
                    setState({
                      ...state,
                      record: { ...state.record, '対応者': { value: e.target.value } },
                    })
                  }
                />
              </div>
              <div className="flex flex-col w-full md:w-1/3">
                <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
                  カテゴリ
                </label>
                <input
                  id="category"
                  type="text"
                  className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  value={state.record['カテゴリ'].value}
                  onChange={(e) =>
                    setState({
                      ...state,
                      record: { ...state.record, 'カテゴリ': { value: e.target.value } },
                    })
                  }
                />
              </div>
            </div>

            <div className='flex-col flex mt-4'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleSubmit}
              >
                保存
              </button>
            </div>
          </form>
        </>
      )}

    </section>
  );
}

export default ChatComponent;
