import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import useDrag from './useDrag';
import { data1, data2 } from './data';
import DragItem from './components/DragItem';
import "./index.less"
function DragCom() {
  const {
    list1,
    list2,
    recordDragIdUp,
    recordDragIdDown,
    setList1,
    setList2,
    onDragOverUp,
    onDragLeaveUp,
    onDragEndUp,
    onDropUp,
  } = useDrag();
  useEffect(() => {
    setList1(data1);
    setList2(data2);
  }, []);

  return (
    <div className='react-drag'>
      <Button
        onClick={() => {
          setList1(data1);
          setList2(data2);
          recordDragIdUp.current = null;
          recordDragIdDown.current = null;
        }}
      >
        重置
      </Button>
      {/* up area */}
      <div
        className='react-drag-inner'
        onDragOver={onDragOverUp}
        onDragLeave={onDragLeaveUp}
        onDragEnd={onDragEndUp}
        onDrop={onDropUp}
      >
        {list1.map((item) =>
          ((item) => (
            <DragItem
              key={item.id}
              className='react-drag-item'
              draggable="true"
              style={{
                opacity:
                  item.id === recordDragIdUp.current ||
                  item.id === recordDragIdDown.current
                    ? '0.3'
                    : '1',
              }}
              onDragStart={(ev: any) => {
                console.log(ev.target.id, 'onDragStart');
                recordDragIdUp.current = ev.target.id;
                ev.dataTransfer.setData('text', ev.target.id);
              }}
              {...item}
            />
          ))(item),
        )}
      </div>
      {/* down area */}
      <p style={{padding: '0 0 0 20px'}}>you can drag item into above box</p>
      <div className='react-drag-inner'>
        {list2.map((item) =>
          ((item) => (
            <DragItem
              key={item.id}
              draggable="true"
              className='react-drag-item'
              style={{
                opacity: item.status === 'null' ? '0' : '1',
              }}
              onDragStart={(ev: any) => {
                console.log(ev.target.id, 'onDragStart');
                recordDragIdDown.current = ev.target.id;
                ev.dataTransfer.setData('text', ev.target.id);
              }}
              {...item}
            />
          ))(item),
        )}
      </div>
    </div>
  );
}
export default DragCom;
