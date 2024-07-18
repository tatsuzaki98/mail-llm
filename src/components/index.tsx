import React from 'react';
import useSWR from 'swr';
import {getMailLogRecords} from '@/client';
import { performGemini } from '@/client/geminiApi';
import useSWRMutation from 'swr/mutation';

const IndexComponent = (): React.JSX.Element => {
  const [query, setQuery] = React.useState<string>('');

  const {data, isLoading, error} = useSWR(
    `/records.json?app=${import.meta.env.VITE_MAILLOG_APP_ID}`,
    getMailLogRecords,
  );

  const {trigger, data: gData, isMutating} = useSWRMutation('gemini', performGemini);

  const handleClick = () => {
    const res = data?.records.map((record) => {
      return [
        {text: `input: ${record.受信メッセージ.value}`},
        {text: `output: ${record.送信メッセージ.value}`},
      ]
    }).flat() || [];

    trigger({query: '工事費の内訳は？', context: res});
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div className='flex flex-col'>
      <section>
        <h3 className='font-bold text-lg'>
          過去の対応履歴
        </h3>
        <div className="overflow-y-scroll">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">受信メッセージ</th>
                <th className="px-4 py-2">送信メッセージ</th>
                <th className="px-4 py-2">自動生成メッセージ</th>
              </tr>
            </thead>
            <tbody>
              {data?.records.map((record, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-4 py-2">{record.受信メッセージ.value}</td>
                  <td className="px-4 py-2">{record.送信メッセージ.value}</td>
                  <td className="px-4 py-2">{record.自動生成メッセージ.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='border border-gray-300 p-2'
          />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleClick}
          >
            click
          </button>
        </div>
        {isMutating && <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>}
        {gData && <div>{gData}</div>}
      </section>
    </div>
  );
}

export default IndexComponent;
