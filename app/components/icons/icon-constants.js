import { List } from 'immutable'

export const ICONS = {
  ACCOUNT: List([
    'M10,10.52c2.93,0 5.32,-2.37 5.32,-5.26c0,-2.89 -2.39,-5.26 -5.32,-5.26c-2.93,0 -5.32,2.37 -5.32,5.26c0,2.89 2.39,5.26 5.32,5.26zM15.19,11.73c-1.15,-0.63 -2.34,-0.2 -3.38,0.15c-0.64,0.23 -1.25,0.43 -1.83,0.43c-0.59,0 -1.2,-0.2 -1.83,-0.43c-1.04,-0.35 -2.24,-0.78 -3.41,-0.15c-3.08,1.71 -4.73,4.98 -4.73,9.49v0.78h20v-0.78c-0.03,-4.51 -1.68,-7.8 -4.81,-9.49z'
  ]),

  ADD_REMOVE_TAG: List([
    'M14.24,7.97h4.07c0.38,0 0.69,0.28 0.69,0.64c0,0.36 -0.3,0.64 -0.69,0.64h-4.07v4.07c0,0.38 -0.28,0.69 -0.64,0.69c-0.36,0 -0.64,-0.3 -0.64,-0.69v-4.07h-4.27c-0.38,0 -0.69,-0.28 -0.69,-0.64c0,-0.36 0.33,-0.64 0.69,-0.64h4.27v-4.28c0,-0.38 0.28,-0.69 0.64,-0.69c0.36,0 0.64,0.33 0.64,0.69zM8.5,0h28c4.69,0 8.5,3.81 8.5,8.5c0,4.69 -3.81,8.5 -8.5,8.5h-28c-4.69,0 -8.5,-3.81 -8.5,-8.5c0,-4.69 3.81,-8.5 8.5,-8.5zM8.5,1c-4.14,0 -7.5,3.36 -7.5,7.5c0,4.14 3.36,7.5 7.5,7.5h28c4.14,0 7.5,-3.36 7.5,-7.5c0,-4.14 -3.36,-7.5 -7.5,-7.5zM26.43,8.6c0,-0.36 0.33,-0.64 0.69,-0.64h9.63c0.38,0 0.69,0.28 0.69,0.64c0,0.36 -0.3,0.64 -0.69,0.64h-9.62c-0.38,0 -0.69,-0.28 -0.69,-0.64z'
  ]),

  ALPHABET: List([
    'M2.62,3.54l0.09,-0.42c0.07,-0.29 0.13,-0.61 0.2,-0.95c0.06,-0.34 0.13,-0.67 0.19,-0.98h0.03c0.07,0.31 0.14,0.63 0.2,0.97c0.07,0.34 0.14,0.66 0.2,0.95l0.09,0.42zM4.17,6.08h1.54l-1.67,-6.08h-1.76l-1.67,6.08h1.49l0.27,-1.29h1.54zM7.56,14h4.06v-1.35h-2.27l2.25,-3.76v-0.97h-3.82v1.35h2.03l-2.25,3.76zM-0.14,12.58l0.99,0.99l11.83,-11.83l-0.99,-0.99z'
  ]),

  ARCHIVE: List([
    'M26,8.83v14.02l-12,3.98v-13.97zM0,8.83l12,4.03v13.97l-12,-3.98zM17.19,6.09l-4.37,4.37l-4.37,-4.37v-2.88l3.32,3.32l0,-6.53l2.12,0l0,6.51l3.31,-3.31z'
  ]),

  ARCHIVED: List([
    'M17,3.6v8.88l-7.85,2.52v-8.85zM0,3.6l7.85,2.55v8.85l-7.85,-2.52zM8.5,0l7.5,2.5l-7.5,2.5l-7.5,-2.5z'
  ]),

  ARROW_DOUBLE_DOWN: List([
    'M5.47,6.5l-0.03,0.03l-5.44,-5.44l1.09,-1.09l4.91,4.91l4.91,-4.91l1.09,1.09l-5.93,5.93c0,0 -0.03,-0.01 -0.06,-0.03c-0.02,-0.01 -0.04,-0.03 -0.06,-0.05c-0.03,-0.03 -0.16,-0.14 -0.28,-0.25c-0.07,-0.06 -0.14,-0.12 -0.19,-0.17zM5.47,13.5l-0.03,0.03l-5.44,-5.44l1.09,-1.09l4.91,4.91l4.91,-4.91l1.09,1.09l-5.93,5.93c0,0 -0.03,-0.01 -0.06,-0.03c-0.02,-0.01 -0.04,-0.03 -0.06,-0.05c-0.03,-0.03 -0.16,-0.14 -0.28,-0.25c-0.07,-0.06 -0.14,-0.12 -0.19,-0.17z'
  ]),

  ARROW_LEFT: List([
    'M10.41 2.04l-5.9 5.9h18.01v2.16h-18l5.9 5.9-1.52 1.52L.49 9.11s.01-.04.05-.09c.01-.01.02-.03.03-.04.01-.02.03-.03.05-.05.05-.05.19-.22.35-.39.08-.1.17-.19.24-.27l-.03-.03L8.9.52z'
  ]),

  ARROW_SIMPLE_LEFT: List([
    'M0.7,7.75l-0.03,-0.03l7.72,-7.72l1.52,1.52l-6.98,6.98l6.98,6.98l-1.52,1.52l-8.41,-8.41c0,0 0.01,-0.04 0.05,-0.09c0.02,-0.03 0.04,-0.06 0.08,-0.09c0.05,-0.05 0.19,-0.22 0.35,-0.39c0.08,-0.1 0.17,-0.19 0.24,-0.27z'
  ]),

  ARROW_SIMPLE_RIGHT: List([
    'M9.43,9.25l0.03,0.03l-7.72,7.72l-1.52,-1.52l6.98,-6.98l-6.98,-6.98l1.52,-1.52l8.41,8.41c0,0 -0.01,0.04 -0.05,0.09c-0.02,0.03 -0.04,0.06 -0.08,0.09c-0.05,0.05 -0.19,0.22 -0.35,0.39c-0.08,0.1 -0.17,0.19 -0.24,0.27z'
  ]),

  ARROW_UNDO: List([
    'M5.9 5.16v2.99L0 4.08 5.9.01V3h7.3c4.96 0 8.8 3.8 8.8 8.51s-3.93 8.51-8.8 8.51H5.9v-2.08h7.3c3.65 0 6.65-2.9 6.65-6.43s-3-6.33-6.65-6.33z'
  ]),

  BOLD: List([
    'M0 0h4.21c.61 0 1.19.04 1.73.14.54.09 1.01.24 1.4.46.4.22.71.51.94.89.23.38.35.85.35 1.43 0 .25-.04.51-.11.77s-.19.5-.35.74c-.16.23-.37.44-.61.62-.25.18-.54.31-.87.4v.07c.83.17 1.45.47 1.86.91.41.44.62 1.05.62 1.83 0 .6-.12 1.12-.37 1.56-.25.44-.58.8-.99 1.08-.41.28-.9.49-1.47.62-.56.13-1.16.2-1.78.2H-.01zm4.14 4.61c.5 0 .88-.11 1.12-.34.24-.23.36-.52.36-.88s-.12-.62-.36-.77c-.24-.16-.61-.23-1.12-.23H3.1v2.23zm.22 4.71c1.2 0 1.8-.44 1.8-1.33 0-.43-.15-.74-.44-.94-.29-.19-.75-.29-1.36-.29H3.1v2.56z'
  ]),

  CALENDAR: List([
    'M3.06,3.38c0.53,0 0.96,-0.42 0.96,-0.93v-1.52c0,-0.51 -0.43,-0.93 -0.96,-0.93c-0.53,0 -0.96,0.42 -0.96,0.93v1.52c0,0.51 0.43,0.93 0.96,0.93zM10.94,3.38c0.53,0 0.96,-0.42 0.96,-0.93v-1.52c0,-0.51 -0.43,-0.93 -0.96,-0.93c-0.53,0 -0.96,0.42 -0.96,0.93v1.52c0,0.51 0.43,0.93 0.96,0.93zM13.13,1.52h-0.7v1.1c0,0.79 -0.67,1.44 -1.49,1.44c-0.82,0 -1.49,-0.64 -1.49,-1.44v-1.1h-4.9v1.1c0,0.79 -0.67,1.44 -1.49,1.44c-0.82,0 -1.49,-0.64 -1.49,-1.44v-1.1h-0.7c-0.48,0 -0.87,0.38 -0.87,0.84v9.79c0,0.47 0.39,0.84 0.88,0.84h11.03l2.1,-2.03v-8.61c0,-0.47 -0.39,-0.84 -0.87,-0.84z'
  ]),

  COG_WHEEL: List([
    'M21,14.62l-2.15,3.75c-2,-1.14 -4.5,-0.47 -5.65,1.53c-0.38,0.67 -0.56,1.4 -0.56,2.1h-4.27c-0.03,-2.33 -1.87,-4.19 -4.14,-4.19c-0.77,0 -1.46,0.21 -2.07,0.57l-2.15,-3.75c2,-1.16 2.69,-3.73 1.53,-5.72c-0.38,-0.65 -0.92,-1.16 -1.53,-1.53l2.15,-3.75c1.97,1.16 4.5,0.49 5.63,-1.5c0.38,-0.67 0.56,-1.4 0.56,-2.12h4.27c0,2.33 1.87,4.22 4.14,4.22c0.74,0 1.46,-0.21 2.07,-0.57l2.15,3.75c-2,1.16 -2.69,3.73 -1.53,5.72c0.38,0.65 0.92,1.16 1.56,1.5zM14.89,11c0,-2.46 -1.97,-4.45 -4.4,-4.45c-2.43,0 -4.4,1.99 -4.4,4.45c0,2.46 1.97,4.45 4.4,4.45c2.43,0 4.4,-1.99 4.4,-4.45z'
  ]),

  COMMENT: List([
    'M26,9.48c0,2 -0.88,3.87 -2.26,5.47c-0.68,0.76 -1.5,1.55 -2.57,2.37c-4.26,3.33 -8.53,5.67 -8.53,5.67v-4.06c-5.96,-0.14 -10.9,-3.19 -12.22,-7.25c-0.28,-0.76 -0.42,-1.58 -0.42,-2.4c0,-4.54 4.49,-8.33 10.42,-9.09c0.82,-0.14 1.69,-0.2 2.6,-0.2c7.17,0 12.96,4.23 12.99,9.48zM20.5,16.48c0.99,-0.79 1.78,-1.52 2.4,-2.23c1.3,-1.55 1.98,-3.16 1.98,-4.77c0,-2.17 -1.19,-4.23 -3.33,-5.81c-2.26,-1.67 -5.28,-2.57 -8.5,-2.57c-0.85,0 -1.67,0.06 -2.46,0.17c-2.68,0.37 -5.11,1.38 -6.86,2.88c-0.82,0.73 -1.47,1.52 -1.92,2.4c-0.45,0.87 -0.68,1.81 -0.68,2.74c0,0.68 0.11,1.35 0.37,2v0.06c0.56,1.75 1.95,3.36 3.9,4.52c2.06,1.24 4.57,1.92 7.28,1.98l1.07,0.03v3.22c1.61,-0.99 4.18,-2.62 6.75,-4.6z'
  ]),

  COMMENT_ADDED: List([
    'M8,12.08v-1.19v-0.59l-0.59,-0.02c-1.5,-0.03 -2.9,-0.41 -4.04,-1.1c-1.08,-0.64 -1.85,-1.53 -2.16,-2.5v-0.02v-0.02c-0.14,-0.36 -0.2,-0.74 -0.2,-1.11c0,-0.52 0.13,-1.03 0.38,-1.52c0.25,-0.49 0.61,-0.92 1.06,-1.33c0.97,-0.83 2.32,-1.39 3.8,-1.6v0v0c0.44,-0.06 0.89,-0.09 1.36,-0.09c1.78,0 3.46,0.5 4.71,1.42c1.19,0.88 1.85,2.02 1.85,3.22c0,0.89 -0.38,1.78 -1.1,2.65c-0.34,0.39 -0.78,0.8 -1.33,1.24c-1.42,1.1 -2.85,2 -3.74,2.55z'
  ]),

  CONTACT_EXIST: List([
    'M10.5 21C16.299 21 21 16.299 21 10.5S16.299 0 10.5 0 0 4.701 0 10.5 4.701 21 10.5 21z',
    'M13.85 6.148a3.358 3.358 0 0 1-3.35 3.348 3.358 3.358 0 0 1-3.35-3.348A3.358 3.358 0 0 1 10.5 2.8a3.358 3.358 0 0 1 3.35 3.348zm-2.166 4.197c.646-.22 1.381-.472 2.086-.08 1.972 1.073 3.014 3.171 3.03 6.038v.497H4.2v-.497c0-2.867 1.042-4.95 2.982-6.038.737-.401 1.49-.129 2.148.096.244.088.483.17.715.22.15.033.295.052.439.052.369 0 .753-.128 1.154-.272l.046-.016z'
  ]),

  CONTACT_NO_EXIST: List([
    'M10.5 23C16.3 23 21 18.3 21 12.5S16.3 2 10.5 2 0 6.7 0 12.5 4.7 23 10.5 23z',
    'M10.5 4.8c-1.84 0-3.35 1.51-3.35 3.35s1.51 3.35 3.35 3.35 3.35-1.51 3.35-3.35S12.34 4.8 10.5 4.8zm1.14 7.56c-.4.14-.79.27-1.15.27-.15 0-.3-.02-.46-.06-.23-.05-.46-.13-.7-.22l-.05-.02c-.65-.22-1.38-.47-2.1-.08-1.94 1.09-2.98 3.17-2.98 6.04v.5h12.6v-.5c-.02-2.87-1.06-4.97-3.03-6.04-.7-.39-1.44-.14-2.09.08zM21 12c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z',
    'M18.25 8.75c.17.17.39.25.61.25.23 0 .44-.09.61-.25l2.02-2.03 2.02 2.02c.17.17.39.25.61.25.23 0 .44-.09.61-.25.33-.33.33-.88 0-1.22L22.7 5.5l2.02-2.02c.33-.33.33-.88 0-1.22a.875.875 0 0 0-1.22 0l-2.02 2.02-2.02-2.03a.875.875 0 0 0-1.22 0c-.33.33-.33.88 0 1.22l2.02 2.03-2.03 2.02c-.33.34-.33.88 0 1.23z'
  ]),

  CONTACTS: List([
    'M21.55 8.6c2.46 0 4.47-1.94 4.47-4.3 0-2.37-2.01-4.3-4.47-4.3s-4.47 1.94-4.47 4.3c0 2.37 2.01 4.3 4.47 4.3zM9.71 10.78c2.84 0 5.16-2.31 5.16-5.14C14.87 2.81 12.55.5 9.71.5 6.87.5 4.55 2.81 4.55 5.64c0 2.83 2.32 5.14 5.16 5.14zm12.95-.85c-.37.11-.73.2-1.08.2-.49 0-1-.17-1.54-.35-.88-.29-1.88-.64-2.86-.12-.59.32-1.11.7-1.57 1.15 2.6 1.45 4.25 3.95 4.87 7.29h9.53v-.64c-.02-3.7-1.41-6.41-4.04-7.8-.96-.52-1.97-.17-2.84.12-.16.05-.31.11-.46.15zM9.68 12.52c-.57 0-1.16-.2-1.78-.42l-.07-.02c-1-.34-2.13-.73-3.24-.12-2.99 1.67-4.6 4.87-4.6 9.28V22h19.42v-.76c-.02-4.41-1.63-7.63-4.67-9.28-1.11-.62-2.27-.2-3.29.15-.62.22-1.21.42-1.78.42z'
  ]),

  CROSS_SIMPLE: List([
    'M7.02,5.82l-5.41,-5.41l-1.2,1.2l5.41,5.41l-5.41,5.41l1.2,1.2l5.41,-5.41l5.41,5.41l1.2,-1.2l-5.41,-5.41l5.41,-5.41l-1.2,-1.2z'
  ]),

  DASHBOARD: List([
    'M1.5 6.13c.83 0 1.5-.7 1.5-1.56 0-.86-.67-1.56-1.5-1.56S0 3.71 0 4.57c0 .86.67 1.56 1.5 1.56z',
    'M5.5 3.13c.83 0 1.5-.7 1.5-1.56C7 .71 6.33.01 5.5.01S4 .71 4 1.57c0 .86.67 1.56 1.5 1.56z',
    'M9.5 6.13c.83 0 1.5-.7 1.5-1.56 0-.86-.67-1.56-1.5-1.56S8 3.71 8 4.57c0 .86.67 1.56 1.5 1.56z',
    'M2.7 8v2.15H0V8z',
    'M6.7 6.15v4H4v-4z',
    'M10.7 8v2.15H8V8z',
    'M1 4.15l4.39-3.14.58.81-4.39 3.14z',
    'M5.58 1l4.39 3.15-.58.81L5 1.81z'
  ]),

  ERROR: List([
    'M11.2,2.44c0,7.52 -0.94,8.47 -5.6,11.56c-4.66,-3.09 -5.6,-4.05 -5.6,-11.56l5.6,-2.44zM4.9,8.23h1.4l0.35,-4.9h-2.1zM4.9,9.63c0,0.39 0.31,0.7 0.7,0.7c0.39,0 0.7,-0.31 0.7,-0.7c0,-0.39 -0.31,-0.7 -0.7,-0.7c-0.39,0 -0.7,0.31 -0.7,0.7z'
  ]),

  EXPORT: List([
    'M16,18c0.26,0 0.51,-0.1 0.71,-0.29l10.29,-10.29v35.59c0,0.55 0.45,1 1,1c0.55,0 1,-0.45 1,-1v-35.59l10.29,10.29c0.2,0.2 0.45,0.29 0.71,0.29c0.26,0 0.51,-0.1 0.71,-0.29c0.39,-0.39 0.39,-1.02 0,-1.41l-12,-12c-0.09,-0.09 -0.2,-0.17 -0.33,-0.22c-0.24,-0.1 -0.52,-0.1 -0.76,0c-0.12,0.05 -0.23,0.12 -0.33,0.22l-12,12c-0.39,0.39 -0.39,1.02 0,1.41c0.2,0.2 0.45,0.29 0.71,0.29z',
    'M55,38c-0.55,0 -1,0.45 -1,1v11h-52v-11c0,-0.55 -0.45,-1 -1,-1c-0.55,0 -1,0.45 -1,1v13h56v-13c0,-0.55 -0.45,-1 -1,-1z'
  ]),

  FILE_EMPTY: List([
    'M28,5.58v26.42h-24v-32h18.41zM22,6h3.59l-3.59,-3.59c0,0 0,3.59 0,3.59zM26,8h-6v-6h-14v28h20z'
  ]),

  FILTER: List([
    'M0,0h18l-6.6,10.54v14.46l-4.8,-3.12v-11.34zM15,11h8v2h-8zM15,15h8v2h-8zM15,19h8v2h-8z'
  ]),

  FOLLOWER_ACCEPTED: List([
    'M10.294 11.216c3.012 0 5.474-2.523 5.474-5.608C15.768 2.522 13.306 0 10.294 0S4.82 2.522 4.82 5.608c0 3.085 2.462 5.608 5.474 5.608zm5.343 1.284c-1.152-.656-2.354-.235-3.41.136l-.074.025c-.655.242-1.283.456-1.885.456-.603 0-1.232-.215-1.886-.456l-.073-.025c-1.056-.37-2.26-.792-3.437-.136C1.702 14.325 0 17.813 0 22.616v.416H11.386c.448-3.377 3.245-5.977 6.628-5.977.574 0 1.131.075 1.663.216-.817-2.111-2.173-3.73-4.04-4.771z',
    'M13.999 24.115a.743.743 0 0 1 1.114-.01l1.663 1.823 3.892-4.268a.74.74 0 0 1 1.106 0 .926.926 0 0 1 0 1.212l-4.459 4.88a.74.74 0 0 1-1.105 0l-2.211-2.425a.926.926 0 0 1 0-1.212z'
  ]),

  FOLLOWER_NEW: List([
    'M15.19 12.357c-1.144-.654-2.34-.21-3.383.157-.636.235-1.247.444-1.832.444-.586 0-1.196-.21-1.833-.444-1.043-.366-2.239-.81-3.41-.157C1.655 14.134 0 17.533 0 22.212v.81h20v-.81c-.025-4.68-1.68-8.104-4.81-9.855zM10 11c3.026 0 5.5-2.474 5.5-5.5S13.026 0 10 0 4.5 2.474 4.5 5.5 6.974 11 10 11'
  ]),

  FOLLOWER_PENDING: List([
    'M15.318 5.5c0 3.026-2.392 5.5-5.318 5.5-2.926 0-5.318-2.474-5.318-5.5S7.074 0 10 0c2.926 0 5.318 2.474 5.318 5.5zm-.127 6.763c-1.12-.643-2.287-.23-3.314.133l-.07.025c-.637.237-1.247.447-1.832.447-.586 0-1.196-.21-1.832-.447l-.07-.025c-1.027-.363-2.196-.776-3.34-.133C1.654 14.053 0 17.473 0 22.184V23h12.107c.276-3.447 3.255-6.176 6.924-6.27-.8-1.967-2.09-3.48-3.84-4.467z',
    'M17.672 24.316a1.59 1.59 0 0 1 .022-.649c.051-.198.125-.378.22-.539.103-.169.216-.323.341-.462.132-.14.253-.271.363-.396a3.34 3.34 0 0 0 .275-.352.618.618 0 0 0 .121-.352c0-.198-.062-.337-.187-.418a.694.694 0 0 0-.429-.132.853.853 0 0 0-.484.132 3.712 3.712 0 0 0-.418.33l-1.034-.946c.271-.308.59-.557.957-.748.374-.19.781-.286 1.221-.286.3 0 .583.037.847.11.264.073.495.187.693.341.198.154.352.356.462.605.117.242.176.535.176.88 0 .22-.04.418-.121.594-.08.169-.18.326-.297.473a3.32 3.32 0 0 1-.374.418 4.663 4.663 0 0 0-.363.407c-.11.14-.202.29-.275.451a1.087 1.087 0 0 0-.066.539h-1.65zm.814 2.816c-.323 0-.587-.11-.792-.33a1.148 1.148 0 0 1-.308-.814c0-.323.103-.594.308-.814.205-.22.47-.33.792-.33.323 0 .587.11.792.33.205.22.308.491.308.814 0 .323-.103.594-.308.814-.205.22-.47.33-.792.33z'
  ]),

  FOLLOWER_REJECTED: List([
    'M10.199 11.216c2.984 0 5.424-2.522 5.424-5.608S13.183 0 10.199 0C7.215 0 4.775 2.522 4.775 5.608s2.44 5.608 5.424 5.608zm5.294 1.288c-1.142-.656-2.333-.235-3.38.135l-.072.026c-.648.241-1.271.456-1.868.456-.597 0-1.22-.215-1.869-.456l-.07-.026c-1.048-.37-2.24-.791-3.407-.135C1.687 14.328 0 17.816 0 22.619V23h11.285c.457-3.36 3.221-5.945 6.563-5.945.568 0 1.12.075 1.646.215-.81-2.109-2.153-3.725-4.001-4.766z',
    'M15.824 27.767a.761.761 0 0 0 .561.233.803.803 0 0 0 .561-.233l1.851-1.915 1.852 1.905a.761.761 0 0 0 .56.233.803.803 0 0 0 .562-.233.83.83 0 0 0 0-1.145l-1.86-1.905 1.85-1.905a.83.83 0 0 0 0-1.145.775.775 0 0 0-1.112 0l-1.852 1.905-1.85-1.915a.775.775 0 0 0-1.113 0 .83.83 0 0 0 0 1.145l1.85 1.915-1.86 1.905a.843.843 0 0 0 0 1.155z'
  ]),

  INBOX: List([
    'M30.87 9.15c.08.13.13.29.13.46v7.68a4.41 4.41 0 0 1-4.41 4.41H4.76a4.41 4.41 0 0 1-4.41-4.41V9.61c0-.17.04-.34.13-.46l3.36-7.09A3.6 3.6 0 0 1 7.11 0h17.12c1.39 0 2.64.76 3.27 2.01zm-9.06-.63h6.46L25.63 2.9c-.25-.5-.8-.84-1.39-.84H7.07c-.59 0-1.13.34-1.39.88L3.04 8.56h6.51c.5 0 .97.34 1.05.84.04.17.92 4.24 5.08 4.24 4.2 0 5.04-4.07 5.08-4.24.13-.5.55-.84 1.05-.84z'
  ]),

  LOCK: List([
    'M33.03,18.72v13.67c0,2.63 -2.66,4.76 -5.93,4.76h-17.05c-3.28,0 -5.93,-2.13 -5.93,-4.76v-13.67c0,-1.88 1.37,-3.48 3.34,-4.26v-6.89c0,-4.18 4.99,-7.58 11.12,-7.58c6.13,0 11.12,3.4 11.12,7.58v6.89c1.97,0.77 3.33,2.38 3.34,4.26zM13.39,7.58v6.39h10.38v-6.39c0,-1.53 -2.38,-2.82 -5.19,-2.82c-2.81,0 -5.19,1.29 -5.19,2.82z'
  ]),

  LOGO: List([
    'M0.1,9.89h2.01v-4.51c0,-2.95 2.16,-5.13 4.79,-5.13c1.7,0 2.78,0.78 2.78,0.78l-1.08,2.95c0,0 -0.62,-0.62 -1.39,-0.62c-0.93,0 -1.7,0.78 -1.7,2.02v4.51h3.24v3.11h-3.24v9.64h-3.4v-9.64h-2.01zM11.53,1.5h3.4v21.14h-3.4zM23.12,17.67c-1.08,0 -1.7,0.62 -1.7,1.24c0,0.62 0.62,1.24 2.01,1.24c2.32,0 2.94,-2.33 2.94,-2.33c0,0 -1.39,-0.16 -3.24,-0.16zM29.76,15.18v7.46h-3.4v-1.24h-0.31c0,0 -1.08,1.87 -3.55,1.87c-2.78,0 -4.64,-1.87 -4.64,-4.35c0,-2.55 2.01,-4.35 5.25,-4.35c1.85,0 3.24,0.62 3.24,0.62c0,-1.55 -1.24,-2.8 -2.63,-2.8c-1.55,0 -2.63,1.09 -2.63,1.09l-2.01,-2.33c0,0 1.55,-1.87 4.64,-1.87c3.4,0 6.03,2.64 6.03,5.91zM38.88,13c-1.39,0 -2.47,1.09 -2.47,2.18c0,1.09 1.08,2.18 2.47,2.18c1.39,0 2.47,-1.09 2.47,-2.18c0,-1.09 -1.08,-2.18 -2.47,-2.18zM36.56,21.09c0,0.62 0.62,0.78 0.62,0.78c0,0 0.93,-0.16 1.7,-0.16c4.33,0 6.8,2.49 6.8,5.13c0,2.64 -2.47,5.13 -6.8,5.13c-4.33,0 -6.8,-2.49 -6.8,-5.13c0,-2.33 2.32,-3.73 2.32,-3.73v-0.31c0,0 -1.24,-0.62 -1.24,-1.87c0,-1.24 1.24,-1.87 1.24,-1.87v-0.31c0,0 -1.55,-1.09 -1.55,-3.58c0,-2.8 2.47,-5.29 6.03,-5.29h6.95v3.11h-1.7v0.31c0,0 0.77,0.93 0.77,2.18c0,2.49 -2.47,4.98 -6.03,4.98c-0.77,0 -1.7,-0.19 -1.7,-0.19c0,0 -0.62,0.19 -0.62,0.81zM38.88,24.82c-2.16,0 -3.24,1.09 -3.24,2.02c0,0.93 1.08,2.02 3.24,2.02c2.16,0 3.24,-1.09 3.24,-2.02c0,-0.93 -1.08,-2.02 -3.24,-2.02zM48.3,9.89h3.4v12.75h-3.4zM50,5.54c-1.08,0 -2.01,-0.93 -2.01,-2.02c0,-1.09 0.93,-2.02 2.01,-2.02c1.08,0 2.01,0.93 2.01,2.02c0,1.09 -0.93,2.02 -2.01,2.02zM61.28,18.75c0,-1.71 -6.49,-0.78 -6.49,-5.6c0,-1.87 2.01,-3.89 4.94,-3.89c3.4,0 5.1,2.18 5.1,2.18l-2.32,2.18c0,0 -0.93,-1.24 -2.47,-1.24c-1.08,0 -1.55,0.47 -1.55,1.09c0,1.71 6.49,0.78 6.49,5.6c0,2.18 -2.01,4.2 -5.25,4.2c-3.71,0 -5.72,-2.49 -5.72,-2.49l2.32,-2.18c0,0 1.24,1.55 3.09,1.55c1.24,0 1.85,-0.62 1.85,-1.4z',
    'M29.7,4.98l-14.7,-3.47v6.94z'
  ]),

  LOG_OUT: List([
    'M11.82,14v2h-11.82v-16h11.82v2h-9.82v12zM10,4l6,4l-6,4v-2h-6v-4h6z'
  ]),

  MAGNIFIER: List([
    'M9.57,12.45c-0.9,0.46 -1.91,0.72 -2.99,0.72c-3.64,0 -6.58,-2.95 -6.58,-6.58c0,-3.64 2.95,-6.58 6.58,-6.58c3.64,0 6.58,2.95 6.58,6.58c0,1.36 -0.41,2.63 -1.12,3.68l4.61,4.61c0,0 0.78,0.78 0,1.55l-0.78,0.78c-0.78,0.78 -1.55,0 -1.55,0zM6.58,10.97c2.42,0 4.39,-1.96 4.39,-4.39c0,-2.42 -1.96,-4.39 -4.39,-4.39c-2.42,0 -4.39,1.96 -4.39,4.39c0,2.42 1.96,4.39 4.39,4.39z'
  ]),

  NON_ARCHIVE: List([
    'M26,10.83v14.02l-12,3.98v-13.97zM0,10.83l12,4.03v13.97l-12,-3.98zM17.19,5.21l0,2.89l-3.31,-3.31l0,6.51l-2.12,0l0,-6.53l-3.32,3.32v-2.88l4.37,-4.37z'
  ]),

  NO_TAGS: List([
    'M10.9,4l-7.88,7.88c-1.74,-0.44 -3.02,-2.01 -3.02,-3.88c0,-2.21 1.79,-4 4,-4zM13.46,4.27c1.49,0.58 2.54,2.03 2.54,3.73c0,2.21 -1.79,4 -4,4h-6.27z'
  ]),

  NOTIFICATIONS: List([
    'M18.68 20.11h-4.9c-.34 1.75-1.93 3.09-3.78 3.09-1.85 0-3.41-1.34-3.78-3.09h-4.9c-1.71 0-1.71-1.71-.54-2.88.97-1 1.49-1.95 1.49-5.63 0-3.34 1.51-6.04 3.87-7.46V3.09C6.14 1.38 7.53 0 9.23 0h1.54c1.71 0 3.09 1.39 3.09 3.09v1.05c2.34 1.41 3.85 4.12 3.85 7.46 0 3.68.49 4.63 1.49 5.63 1.17 1.17 1.17 2.88-.54 2.88zm-.35-1.56c-.02-.02-.05-.07-.07-.1.02.05.05.07.07.1z'
  ]),

  OPTIONS: List([
    'M0.5,19.7c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,0 2.5,1.12 2.5,2.5c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,0 -2.5,-1.12 -2.5,-2.5zM0.5,11.35c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,0 2.5,1.12 2.5,2.5c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,0 -2.5,-1.12 -2.5,-2.5zM0.5,3c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,0 2.5,1.12 2.5,2.5c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,0 -2.5,-1.12 -2.5,-2.5z'
  ]),

  PENCIL: List([
    'M5.79,13.43l-5.79,1.57l1.57,-5.8l8.74,-8.77c0.29,-0.29 0.68,-0.43 1.06,-0.43c0.38,0 0.77,0.14 1.06,0.43l2.12,2.11c0.59,0.59 0.59,1.53 0,2.12zM4.46,12.26l-1.71,-1.71l-0.63,2.32zM5.72,11.4l7.77,-7.78l-2.12,-2.12l-7.77,7.78z'
  ]),

  PIN: List([
    'M6.1,25.09c-1.62,0 -3.18,-0.64 -4.31,-1.81c-2.39,-2.39 -2.39,-6.27 0,-8.66l13.55,-13.4c0.76,-0.76 1.87,-1.22 3,-1.22c1.13,0 2.23,0.46 3.03,1.25c1.68,1.68 1.68,4.38 0,6.06l-13.55,13.4c-0.46,0.46 -1.07,0.7 -1.71,0.7c-0.64,0 -1.25,-0.24 -1.74,-0.7c-0.95,-0.95 -0.95,-2.51 0,-3.46l6.82,-6.67c0.24,-0.24 0.64,-0.24 0.86,0c0.24,0.24 0.24,0.64 0,0.86l-6.79,6.67c-0.46,0.46 -0.46,1.25 0,1.71c0.24,0.24 0.55,0.37 0.86,0.37c0.34,0 0.64,-0.12 0.86,-0.37l13.55,-13.4c1.19,-1.19 1.19,-3.12 0,-4.31c-0.58,-0.58 -1.35,-0.89 -2.17,-0.89c-0.83,0 -1.59,0.31 -2.17,0.89l-13.52,13.4c-1.9,1.9 -1.9,5.02 0,6.91c0.92,0.92 2.14,1.44 3.46,1.44c1.32,0 2.54,-0.52 3.46,-1.44l11.72,-11.57c0.24,-0.24 0.64,-0.24 0.86,0c0.24,0.24 0.24,0.64 0,0.86l-11.72,11.6c-1.13,1.13 -2.69,1.77 -4.31,1.77z'
  ]),

  PLUS: List([
    'M13.05,13.05h-13.05v2.9h13.05v13.05h2.9v-13.05h13.05v-2.9h-13.05v-13.05l-2.9,0z'
  ]),

  SELECT: List([
    'M0,1.42c0,-0.8 0.62,-1.42 1.42,-1.42h2.41v1.23h-2.43c-0.1,0 -0.19,0.08 -0.19,0.19v2.43h-1.21zM13.58,0c0.78,0 1.42,0.62 1.4,1.42v2.41h-1.21v-2.43c0,-0.1 -0.08,-0.19 -0.19,-0.19h-2.43v-1.21zM5.47,0h4.05v1.21h-4.05zM13.77,13.58h0.02v-2.43h1.21v2.41c0,0.78 -0.64,1.42 -1.42,1.42h-2.43v-1.21h2.43c0.1,0 0.19,-0.08 0.19,-0.19zM13.77,5.47h1.21v4.05h-1.21zM1.21,13.58c0,0.1 0.1,0.19 0.21,0.21h2.43v1.21h-2.43c-0.78,0 -1.42,-0.64 -1.42,-1.42v-2.43h1.21zM5.47,13.77h4.05v1.21h-4.05zM0,5.47h1.21v4.05h-1.21z'
  ]),

  SEND_INVITE: List([
    'M16.83 5.56l.03.04c.02.03.04.06.07.12.04.09.06.19.06.28v7.69c0 1.27-1.02 2.3-2.27 2.3H2.26c-1.25 0-2.27-1.03-2.27-2.3V6c0-.1.02-.19.08-.32.01-.02.02-.03.03-.05.01-.01.02-.03.03-.04l.03-.04.03-.04.02-.02.03-.03 2-1.67v-.81c0-1.27 1.02-2.3 2.27-2.3h7.96c1.25 0 2.27 1.03 2.27 2.3v.81l2.02 1.7.03.03zm-2.08.75l.44-.33-.44-.37zM3.63 2.98v4.38L8.44 11c.02.01.04.02.06.02.02 0 .04-.01.06-.02l4.81-3.64V2.98c0-.5-.4-.9-.89-.9H4.52c-.49 0-.89.4-.89.9zM2.25 6.31v-.7l-.44.37zm13.37 7.39V7.39l-1.05.8c-.06.07-.14.13-.22.17l-4.96 3.75c-.53.4-1.25.4-1.78 0L2.65 8.37a.723.723 0 0 1-.22-.17l-1.05-.8v6.29c0 .5.4.9.89.9h12.46c.49 0 .89-.4.89-.89zM7.75 6.85h-.74c-.38 0-.69-.31-.69-.7 0-.39.31-.7.69-.7h.74V4.7c0-.39.31-.7.69-.7.38 0 .69.31.69.7v.75h.74c.38 0 .69.31.69.7 0 .39-.31.7-.69.7h-.74v.75c0 .39-.31.7-.69.7-.38 0-.69-.31-.69-.7z'
  ]),

  SORT_ALPHABET: List([
    'M8.4,19.44v-19.44h-2.4v19.44l-4.32,-4.32l-1.68,1.68l7.2,7.2l7.32,-7.2l-1.68,-1.68z',
    'M13.62,3.54l0.09,-0.42c0.07,-0.29 0.13,-0.61 0.2,-0.95c0.06,-0.34 0.13,-0.67 0.19,-0.98h0.03c0.07,0.31 0.14,0.63 0.2,0.97c0.07,0.34 0.14,0.66 0.2,0.95l0.09,0.42zM15.17,6.08h1.54l-1.67,-6.08h-1.76l-1.67,6.08h1.49l0.27,-1.29h1.54zM18.56,14h4.06v-1.35h-2.27l2.25,-3.76v-0.97h-3.82v1.35h2.03l-2.25,3.76zM10.86,12.58l0.99,0.99l11.83,-11.83l-0.99,-0.99z'
  ]),

  SORT_BOLD: List([
    'M8.4 19.44V0H6v19.44l-4.32-4.32L0 16.8 7.2 24l7.32-7.2-1.68-1.68z',
    'M11 0h3.21c.47 0 .91.03 1.32.1.41.07.77.19 1.07.35.3.17.54.39.72.69.18.29.27.66.27 1.1 0 .19-.03.39-.08.59-.05.2-.14.39-.27.57-.12.18-.28.34-.47.48-.19.14-.41.24-.67.3v.06c.63.13 1.1.36 1.42.7.32.34.47.81.47 1.41 0 .46-.09.86-.28 1.2-.19.34-.44.61-.75.83-.32.22-.69.38-1.12.48-.43.1-.88.15-1.36.15h-3.49zm3.16 3.54c.38 0 .67-.09.85-.26.18-.18.27-.4.27-.68s-.09-.48-.27-.6c-.18-.12-.47-.18-.85-.18h-.8v1.72zm.16 3.63c.92 0 1.37-.34 1.37-1.02 0-.33-.11-.57-.34-.72-.22-.15-.57-.22-1.04-.22h-.96v1.97z'
  ]),

  SORT_DEFAULT: List([
    'M8.4 0v19.44l4.44-4.32 1.68 1.68L7.2 24 0 16.8l1.68-1.68L6 19.44V0zm10.8 2.4h-8.4V0h8.4zm-8.4 2.4h8.4v2.4h-8.4zm8.4 7.2h-8.4V9.6h8.4z'
  ]),

  SORT_DUE_DATE: List([
    'M8.4,19.44v-19.44h-2.4v19.44l-4.32,-4.32l-1.68,1.68l7.2,7.2l7.32,-7.2l-1.68,-1.68z',
    'M12.95,2.17v-1.34c0,-0.45 0.4,-0.82 0.89,-0.82c0.49,0 0.89,0.37 0.89,0.82v1.34c0,0.45 -0.4,0.82 -0.89,0.82c-0.49,0 -0.89,-0.37 -0.89,-0.82zM20.26,2.17v-1.34c0,-0.45 0.4,-0.82 0.89,-0.82c0.49,0 0.89,0.37 0.89,0.82v1.34c0,0.45 -0.4,0.82 -0.89,0.82c-0.49,0 -0.89,-0.37 -0.89,-0.82zM24,2.09v10.16c0,0.41 -0.36,0.75 -0.81,0.75h-11.38c-0.45,0 -0.81,-0.33 -0.81,-0.75v-10.16c0,-0.41 0.36,-0.75 0.81,-0.75h0.65v0.97c0,0.7 0.62,1.27 1.38,1.27c0.76,0 1.38,-0.57 1.38,-1.27v-0.97h4.55v0.97c0,0.7 0.62,1.27 1.38,1.27c0.76,0 1.38,-0.57 1.38,-1.27v-0.97h0.65c0.45,0 0.81,0.33 0.81,0.75zM14.25,10.16h-1.63v1.49h1.63zM14.25,7.62h-1.63v1.49h1.63zM14.25,4.93h-1.63v1.49h1.63zM17.01,10.16h-1.63v1.49h1.63zM17.01,7.62h-1.63v1.49h1.63zM17.01,4.93h-1.63v1.49h1.63zM19.77,10.16h-1.63v1.49h1.63zM19.77,7.62h-1.63v1.49h1.63zM19.77,4.93h-1.63v1.49h1.63zM22.54,7.62h-1.63v1.49h1.63zM22.54,4.93h-1.63v1.49h1.63z'
  ]),

  SORT_INCOMPLETE: List([
    'M15.66,8.89l-3.66,-3.93v3.11l2.94,3.15l0.72,0.78l7.34,-7.89v-3.11zM8.4,0h-2.4v19.44l-4.32,-4.32l-1.68,1.68l7.2,7.2l7.32,-7.2l-1.68,-1.68l-4.44,4.32z'
  ]),

  TAG: List([
    'M0,5.8v0c0,2.88 2.32,5.2 5.2,5.2h8.82c2.88,0 5.2,-2.32 5.2,-5.2v0c0,-2.88 -2.32,-5.2 -5.2,-5.2h-8.82c-2.88,0 -5.2,2.32 -5.2,5.2z'
  ]),

  TAG_FILTER: List([
    'M0.1,1.02c-0.28,-0.44 0.05,-1.02 0.59,-1.02h13.62c0.54,0 0.87,0.57 0.59,1.02l-4.89,7.71v10.61c0,0.53 -0.61,0.85 -1.07,0.56l-3.63,-2.33c-0.19,-0.12 -0.31,-0.33 -0.31,-0.56v-8.28zM6.27,8.18c0.07,0.11 0.1,0.23 0.1,0.35v8.11l2.26,1.45v-9.56c0,-0.12 0.04,-0.24 0.1,-0.35l4.35,-6.85h-11.16z'
  ]),

  TAG_HALF: List([
    'M2.27,0.85c-1.31,0.89 -2.17,2.4 -2.17,4.1v0c0,2.74 2.22,4.96 4.96,4.96h8.96c1.14,0 2.2,-0.39 3.04,-1.04z',
    'M5,0h9c2.76,0 5,2.24 5,5c0,2.76 -2.24,5 -5,5h-9c-2.76,0 -5,-2.24 -5,-5c0,-2.76 2.24,-5 5,-5zM5.03,0.96c-2.23,0 -4.04,1.81 -4.04,4.04c0,2.23 1.81,4.04 4.04,4.04h8.94c2.23,0 4.04,-1.81 4.04,-4.04c0,-2.23 -1.81,-4.04 -4.04,-4.04z'
  ]),

  TAG_INACTIVE: List([
    'M5,0h9c2.76,0 5,2.24 5,5c0,2.76 -2.24,5 -5,5h-9c-2.76,0 -5,-2.24 -5,-5c0,-2.76 2.24,-5 5,-5zM5.03,0.96c-2.23,0 -4.04,1.81 -4.04,4.04c0,2.23 1.81,4.04 4.04,4.04h8.94c2.23,0 4.04,-1.81 4.04,-4.04c0,-2.23 -1.81,-4.04 -4.04,-4.04z'
  ]),

  TAG_MULTI: List([
    'M0,7.2v0c0,2.65 2.15,4.8 4.8,4.8h8.01c2.65,0 4.8,-2.15 4.8,-4.8v0c0,-2.65 -2.15,-4.8 -4.8,-4.8h-8.01c-2.65,0 -4.8,2.15 -4.8,4.8z',
    'M2.38,4.8c0,-2.65 2.14,-4.8 4.8,-4.8h8.01c2.65,0 4.8,2.15 4.8,4.8c0,2.65 -2.14,4.8 -4.8,4.8h-8.01c-2.65,0 -4.8,-2.15 -4.8,-4.8zM3.15,4.8c0,2.2 1.79,4 3.99,4h8.08c2.2,0 3.99,-1.79 3.99,-4c0,-2.2 -1.79,-4 -3.99,-4h-8.08c-2.2,0 -3.99,1.79 -3.99,4z'
  ]),

  TASK_CHECKED: List([
    'M22,0l-14.68,15.05l-7.32,-7.5v5.95l5.88,6.01l1.44,1.49l14.68,-15.05z'
  ]),

  TASKS: List([
    'M7,0h18v4h-18zM7,8h18v4h-18zM7,16h18v4h-18zM0,0h4v4h-4zM0,8h4v4h-4zM0,16h4v4h-4z'
  ]),

  TIME_LINE: List([
    'M3 0h2v2.13C6.73 2.57 8 4.14 8 6c0 1.86-1.27 3.43-3 3.87v4.25c1.73.44 3 2.01 3 3.87 0 1.86-1.27 3.43-3 3.87v2.13H3v-2.13c-1.73-.44-3-2.01-3-3.87 0-1.86 1.27-3.43 3-3.87V9.87C1.27 9.43 0 7.86 0 6c0-1.86 1.27-3.43 3-3.87zm1 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM4 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0h18v4H12zm18 16H12v-4h18z'
  ]),

  TRASH: List([
    'M22.35,4.22c0,0.39 -0.3,0.69 -0.69,0.69h-1.29l-0.88,18.06c-0.05,1.27 -1.07,2.26 -2.34,2.26h-11.79c-1.26,0 -2.28,-0.99 -2.34,-2.26l-0.85,-18.06h-1.29c-0.38,0 -0.69,-0.3 -0.69,-0.69c0,-0.39 0.3,-0.69 0.69,-0.69h5.66v-1.6c0,-0.99 0.8,-1.79 1.79,-1.79h5.88c0.99,0 1.79,0.8 1.79,1.79v1.6h5.66c0.38,0 0.69,0.3 0.69,0.69zM7.92,1.93v1.6h6.74v-1.6c0,-0.22 -0.19,-0.41 -0.41,-0.41h-5.91c-0.25,0 -0.41,0.19 -0.41,0.41zM19,4.91h-15.45l0.85,18c0.03,0.52 0.44,0.94 0.96,0.94h11.82c0.52,0 0.93,-0.41 0.96,-0.94z',
    'M11.27,8.77c-0.38,0 -0.69,0.3 -0.69,0.69v9.65c0,0.39 0.3,0.69 0.69,0.69c0.38,0 0.69,-0.3 0.69,-0.69v-9.65c0,-0.36 -0.3,-0.69 -0.69,-0.69z',
    'M8.03,8.96c-0.14,-0.14 -0.3,-0.19 -0.49,-0.19v0.14v-0.14c-0.19,0 -0.36,0.08 -0.47,0.22c-0.14,0.14 -0.19,0.3 -0.19,0.5l0.33,9.65c0,0.39 0.33,0.66 0.71,0.66v0c0.19,0 0.36,-0.08 0.47,-0.22c0.14,-0.14 0.19,-0.3 0.19,-0.5l-0.33,-9.65c0,-0.17 -0.08,-0.36 -0.22,-0.47z',
    'M15.01,8.77v0.14v-0.14c-0.38,0 -0.69,0.28 -0.71,0.66l-0.33,9.65c0,0.19 0.05,0.36 0.19,0.5c0.14,0.14 0.3,0.22 0.49,0.22c0.38,0 0.69,-0.3 0.69,-0.66l0.33,-9.65c0,-0.19 -0.05,-0.36 -0.19,-0.5c-0.11,-0.14 -0.27,-0.19 -0.47,-0.22z'
  ]),
}
