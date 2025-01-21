import React from 'react';
import useSWR from 'swr';
import {getMailLogRecords} from '@/client';
import { performGemini } from '@/client/geminiApi';
import useSWRMutation from 'swr/mutation';

const ChatComponent = (): React.JSX.Element => {
  /**
   * State
   **/
  const [query, setQuery] = React.useState('');

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
    trigger({query: query, context: res});
  };

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
          `}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
            <div
              className={`
                bg-blue-100 rounded text-gray-700 px-4 py-3 shadow-md
                flex
              `}
              role="alert"
            >
              <p className="text-sm">
                {gData}
              </p>
            </div>
          </div>
          <div>
            <textarea
              className={`
                block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                border border-gray-300 focus:ring-blue-500 focus:border-blue-500
              `}
              value={gData}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </>
      )}

    </section>
  );
}

export default ChatComponent;
