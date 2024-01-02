import React from 'react';
import styles from '../index.less';
function DragItem(props: any) {
  return <div {...props}>{props.name}</div>;
}
export default DragItem;
