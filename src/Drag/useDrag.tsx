import React, { useRef, useState } from 'react';
import { Item, data1, data2 } from './data';
import { set } from 'lodash';
import DragItem from '../DragItem';
// this hook need to seperate these two area
function useDrag() {
  const [list1, setList1] = useState<Item[]>(data1);
  const [list2, setList2] = useState<Item[]>(data2);
  const recordDragIdUp = useRef<string | null>(null);
  const recordDragIdDown = useRef<string | null>(null);

  function findeIndexAndInsertOrPush(
    _list: Item[],
    _DragItem: Item,
    targetId: string,
  ) {
    const _index = _list.findIndex((item) => item.id == targetId);
    // if cannot find the item, then push it to the end
    if (!targetId) {
      _list = _list.filter((item) => item.id !== _DragItem.id);
      _list.push(_DragItem);
      return _list;
    } else {
      _list = _list.filter((item) => item.id !== _DragItem.id);
      _list.splice(_index, 0, _DragItem);
      return _list;
    }
  }

  

  // on this time you can put a hover effect, when you done, remove it automatically
  const onDragOverUp = (e: any) => {
    e.preventDefault();
    console.log(e, 'eee');
    //
    const _DragItemUp = list1.find((item) => item.id == recordDragIdUp.current);
    if (recordDragIdUp.current && _DragItemUp) {
      const list = findeIndexAndInsertOrPush(list1, _DragItemUp, e.target.id);
      setList1(list);
      return;
    }

    const _DragItemDown = list2.find(
      (item) => item.id == recordDragIdDown.current,
    );
    if (recordDragIdDown.current && _DragItemDown) {
      const list = findeIndexAndInsertOrPush(list1, _DragItemDown, e.target.id);
      setList1(list);
      return;
    }
  };
  const onDragLeaveUp = () => {
    if (recordDragIdDown.current) {
      setList1(list1.filter((item) => item.id !== recordDragIdDown.current));
    }
  };

  const onDragEndUp = () => {
    setList1([...new Set(list1)]);
    recordDragIdUp.current = null;
    recordDragIdDown.current = null;
  };

  const onDropUp = (ev: any) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    if (recordDragIdUp.current) {
      recordDragIdUp.current = null;
      return;
    }
    if (recordDragIdDown.current) {
      recordDragIdDown.current = null;
      setList2(
        list2.map((item) => {
          if (item.id == data) {
            return {
              ...item,
              status: 'null',
            };
          }
          return item;
        }),
      );
      return;
    }

    // ev.target.appendChild(document.getElementById(data));
  };
  return {
    list1,
    setList1,
    list2,
    recordDragIdUp,
    recordDragIdDown,
    onDragOverUp,
    onDragLeaveUp,
    setList2,
    onDragEndUp,
    onDropUp,
  };
}
export default useDrag;
