import React from 'react';
import TableComponent from './table';
import ChatComponent from './chat';

const IndexComponent = (): React.JSX.Element => {
  return (
    <div className='flex flex-col space-y-8 w-screen p-8'>
      <TableComponent />
      <ChatComponent />
    </div>
  );
}

export default IndexComponent;
