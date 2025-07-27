export const DROPPABLE_SELECTORS = {
  draggable: '#draggable',
  droppable: '#droppable',
  acceptable: '#acceptable',
  notAcceptable: '#notAcceptable',
  dragBox: '#dragBox',
  notGreedyDropBox: '#notGreedyDropBox',
  notGreedyInnerDropBox: '#notGreedyInnerDropBox',
  revertable: '#revertable'
} as const;

export const VIEWPORT_SIZES = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 }
} as const;

export const TAB_NAMES = {
  simple: 'Simple',
  accept: 'Accept',
  preventPropagation: 'Prevent Propogation',
  revertDraggable: 'Revert Draggable'
} as const;

export const EXPECTED_TEXTS = {
  dropHere: 'Drop here',
  dropped: 'Dropped!',
  outerDroppable: 'Outer droppable',
  innerDroppable: 'Inner droppable'
} as const;

export const PERFORMANCE_THRESHOLDS = {
  dragAndDrop: 5000,
  pageLoad: 3000
} as const; 