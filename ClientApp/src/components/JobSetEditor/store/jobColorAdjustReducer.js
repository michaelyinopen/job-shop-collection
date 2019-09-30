import arrayEqual from '../../../functions/arrayEqual';
import getNewColor from './jobColor;

export const adjustJobColors = (state, jobColors = []) => {
  const { jobs, jobColors: jobColorsFromState } = state;
  const predefinedJobColors = [...jobColors, ...Object.values(jobColorsFromState)].filter(jc => jobs.some(j => j.id === jc.id)); // exclude orphan jobColors
  let newJobColors = {};
  for (const id of Object.keys(jobs)) {
    const predefinedJobColor = predefinedJobColors.find(jc => jc.id === id);
    const excludeColors = () => [...Object.values(newJobColors), predefinedJobColors].map(jc => jc.color);
    const [color, textColor] = predefinedJobColor ? [predefinedJobColor.color, predefinedJobColor.textColor] : getNewColor(excludeColors());
    newJobColors[id] = {
      id,
      color,
      textColor,
    };
  }
  return {
    state,
    jobColors: newJobColors
  };
};

const compareFunction = (a, b) => a - b;

const jobColorAdjustReducer = state => {
  const { jobs, jobColors } = state;
  if (arrayEqual(
    Object.keys(jobs).sort(compareFunction),
    Object.keys(jobColors).sort(compareFunction)
  )) {
    return state;
  }
  return adjustJobColors(state);
};

export default jobColorAdjustReducer;