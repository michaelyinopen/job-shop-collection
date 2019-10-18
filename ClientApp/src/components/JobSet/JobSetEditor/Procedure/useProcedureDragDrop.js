import { useCallback, useEffect } from 'react';
import { throttle } from 'lodash';
import { useDrag, useDrop } from 'react-dnd';
import itemTypes from './itemTypes';

const wait = 200;
// only support same height
const useProcedureDragDrop = (
  id,
  sequence,
  ref,
  handleRef,
  getProcedureSequence,
  moveProcedure
) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: itemTypes.PROCEDURE, id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })
  const throttledHoverCallback = useCallback(
    throttle(
      item => {
        if (!ref.current) {
          return;
        }
        const { id: dragId } = item;
        const dragSequence = getProcedureSequence(dragId);
        const hoverSequence = sequence;
        // Don't replace items with themselves
        if (dragSequence === hoverSequence) {
          return;
        }
        moveProcedure(dragId, hoverSequence);
      },
      wait,
      { leading: true, trailing: true }
    ),
    [ref, getProcedureSequence, sequence]
  );
  useEffect(
    () => {
      return () => {
        if (throttledHoverCallback && throttledHoverCallback.cancel) {
          throttledHoverCallback.cancel();
        }
      }
    },
    [ref, getProcedureSequence, sequence, throttledHoverCallback]
  );
  const [, drop] = useDrop({
    accept: itemTypes.PROCEDURE,
    hover: throttledHoverCallback
  });
  preview(drop(ref));
  drag(handleRef);
  return [isDragging];
};

export default useProcedureDragDrop;