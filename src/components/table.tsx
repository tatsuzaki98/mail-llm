import React from 'react';
import useSWR from 'swr';
import {getMailLogRecords} from '@/client';

const TableComponent = (): React.JSX.Element => {
  /**
   * SWR
   */
  const {data, isLoading, error} = useSWR(
    `/records.json?app=${import.meta.env.VITE_MAILLOG_APP_ID}`,
    getMailLogRecords,
  );

  console.log(data);

  /**
   * Render
   */
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <section>
      <h3 className='font-bold text-lg'>
        過去の対応履歴
      </h3>
      <div className="overflow-x-auto overflow-y-scroll max-w-full">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">受信メッセージ</th>
              <th className="px-4 py-2">送信メッセージ</th>
              <th className="px-4 py-2">対応者</th>
              <th className="px-4 py-2">お客様名</th>
              <th className="px-4 py-2">カテゴリ</th>
            </tr>
          </thead>
          <tbody>
            {data?.records.map((record, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-2">{record.お問合せ内容.value}</td>
                <td className="px-4 py-2">{record.返信内容.value}</td>
                <td className="px-4 py-2">{record.作成者.value.name}</td>
                <td className="px-4 py-2">{record.お客様名.value}</td>
                <td className="px-4 py-2">{record.カテゴリ.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TableComponent;
