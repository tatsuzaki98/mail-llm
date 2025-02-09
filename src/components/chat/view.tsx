import { Props } from './types';

const View = (props: Props) => (
  <section>
    <form className='space-y-2'>
      <h3 className='font-bold text-lg'>
        お問い合わせ内容
      </h3>

      <textarea
        className={`
          block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
          border border-gray-300 focus:ring-blue-500 focus:border-blue-500
          h-28
        `}
        value={props.state.query}
        onChange={props.handlers.inputQuery}
      />

      <div className='flex-col flex'>
        {!props.geminiCache.isMutating ? (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={props.handlers.submitGemini}
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

    {props.geminiCache.data && (
      <>
        <div className='mt-4'>
          <h3 className='font-bold text-lg'>
            返信文自動生成
          </h3>
        </div>
        <form>
          {/**
           * Response Textarea
           **/}
          <div>
            <textarea
              className={`
                block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                h-28
              `}
              value={props.state.response}
              onChange={props.handlers.editResponse}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            {/**
              *  Input Customer Name
              **/}
            <div className="flex flex-col w-full md:w-1/3">
              <label htmlFor="customer-name" className="text-sm font-medium text-gray-700 mb-1">
                お客様名
              </label>
              <input
                id="customer-name"
                type="text"
                className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={props.state.record['お客様名'].value}
                name="お客様名"
                onChange={props.handlers.inputRecord}
              />
            </div>
            {/**
              *  Input Responsible Person
              **/}
            <div className="flex flex-col w-full md:w-1/3">
              <label htmlFor="responsible-person" className="text-sm font-medium text-gray-700 mb-1">
                対応者
              </label>
              <input
                id="responsible-person"
                type="text"
                className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={props.state.record['対応者'].value}
                name="対応者"
                onChange={props.handlers.inputRecord}
              />
            </div>
            {/**
              *  Input Category
              **/}
            <div className="flex flex-col w-full md:w-1/3">
              <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
                カテゴリ
              </label>
              <input
                id="category"
                type="text"
                className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={props.state.record['カテゴリ'].value}
                name="カテゴリ"
                onChange={props.handlers.inputRecord}
              />
            </div>
          </div>
          {/**
            * Submit Button for Kintone
            **/}
          <div className='flex-col flex mt-4'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={props.handlers.submitKintone}
            >
              保存
            </button>
          </div>
        </form>
      </>
    )}

  </section>
);

export default View;
