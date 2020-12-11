import { List } from 'immutable'

export const ICONS = {
  ACCOUNT: List([
    'M10,10.52c2.93,0 5.32,-2.37 5.32,-5.26c0,-2.89 -2.39,-5.26 -5.32,-5.26c-2.93,0 -5.32,2.37 -5.32,5.26c0,2.89 2.39,5.26 5.32,5.26zM15.19,11.73c-1.15,-0.63 -2.34,-0.2 -3.38,0.15c-0.64,0.23 -1.25,0.43 -1.83,0.43c-0.59,0 -1.2,-0.2 -1.83,-0.43c-1.04,-0.35 -2.24,-0.78 -3.41,-0.15c-3.08,1.71 -4.73,4.98 -4.73,9.49v0.78h20v-0.78c-0.03,-4.51 -1.68,-7.8 -4.81,-9.49z',
  ]),

  ADD_REMOVE_TAG: List([
    'M14.24,7.97h4.07c0.38,0 0.69,0.28 0.69,0.64c0,0.36 -0.3,0.64 -0.69,0.64h-4.07v4.07c0,0.38 -0.28,0.69 -0.64,0.69c-0.36,0 -0.64,-0.3 -0.64,-0.69v-4.07h-4.27c-0.38,0 -0.69,-0.28 -0.69,-0.64c0,-0.36 0.33,-0.64 0.69,-0.64h4.27v-4.28c0,-0.38 0.28,-0.69 0.64,-0.69c0.36,0 0.64,0.33 0.64,0.69zM8.5,0h28c4.69,0 8.5,3.81 8.5,8.5c0,4.69 -3.81,8.5 -8.5,8.5h-28c-4.69,0 -8.5,-3.81 -8.5,-8.5c0,-4.69 3.81,-8.5 8.5,-8.5zM8.5,1c-4.14,0 -7.5,3.36 -7.5,7.5c0,4.14 3.36,7.5 7.5,7.5h28c4.14,0 7.5,-3.36 7.5,-7.5c0,-4.14 -3.36,-7.5 -7.5,-7.5zM26.43,8.6c0,-0.36 0.33,-0.64 0.69,-0.64h9.63c0.38,0 0.69,0.28 0.69,0.64c0,0.36 -0.3,0.64 -0.69,0.64h-9.62c-0.38,0 -0.69,-0.28 -0.69,-0.64z',
  ]),

  ALPHABET: List([
    'M2.62,3.54l0.09,-0.42c0.07,-0.29 0.13,-0.61 0.2,-0.95c0.06,-0.34 0.13,-0.67 0.19,-0.98h0.03c0.07,0.31 0.14,0.63 0.2,0.97c0.07,0.34 0.14,0.66 0.2,0.95l0.09,0.42zM4.17,6.08h1.54l-1.67,-6.08h-1.76l-1.67,6.08h1.49l0.27,-1.29h1.54zM7.56,14h4.06v-1.35h-2.27l2.25,-3.76v-0.97h-3.82v1.35h2.03l-2.25,3.76zM-0.14,12.58l0.99,0.99l11.83,-11.83l-0.99,-0.99z',
  ]),

  ARCHIVE: List([
    'M26,8.83v14.02l-12,3.98v-13.97zM0,8.83l12,4.03v13.97l-12,-3.98zM17.19,6.09l-4.37,4.37l-4.37,-4.37v-2.88l3.32,3.32l0,-6.53l2.12,0l0,6.51l3.31,-3.31z',
  ]),

  ARCHIVED: List([
    'M17,3.6v8.88l-7.85,2.52v-8.85zM0,3.6l7.85,2.55v8.85l-7.85,-2.52zM8.5,0l7.5,2.5l-7.5,2.5l-7.5,-2.5z',
  ]),

  ARROW_DOUBLE_DOWN: List([
    'M5.47,6.5l-0.03,0.03l-5.44,-5.44l1.09,-1.09l4.91,4.91l4.91,-4.91l1.09,1.09l-5.93,5.93c0,0 -0.03,-0.01 -0.06,-0.03c-0.02,-0.01 -0.04,-0.03 -0.06,-0.05c-0.03,-0.03 -0.16,-0.14 -0.28,-0.25c-0.07,-0.06 -0.14,-0.12 -0.19,-0.17zM5.47,13.5l-0.03,0.03l-5.44,-5.44l1.09,-1.09l4.91,4.91l4.91,-4.91l1.09,1.09l-5.93,5.93c0,0 -0.03,-0.01 -0.06,-0.03c-0.02,-0.01 -0.04,-0.03 -0.06,-0.05c-0.03,-0.03 -0.16,-0.14 -0.28,-0.25c-0.07,-0.06 -0.14,-0.12 -0.19,-0.17z',
  ]),

  ARROW_LEFT: List([
    'M10.41 2.04l-5.9 5.9h18.01v2.16h-18l5.9 5.9-1.52 1.52L.49 9.11s.01-.04.05-.09c.01-.01.02-.03.03-.04.01-.02.03-.03.05-.05.05-.05.19-.22.35-.39.08-.1.17-.19.24-.27l-.03-.03L8.9.52z',
  ]),

  ARROW_SIMPLE_LEFT: List([
    'M0.7,7.75l-0.03,-0.03l7.72,-7.72l1.52,1.52l-6.98,6.98l6.98,6.98l-1.52,1.52l-8.41,-8.41c0,0 0.01,-0.04 0.05,-0.09c0.02,-0.03 0.04,-0.06 0.08,-0.09c0.05,-0.05 0.19,-0.22 0.35,-0.39c0.08,-0.1 0.17,-0.19 0.24,-0.27z',
  ]),

  ARROW_SIMPLE_RIGHT: List([
    'M9.43,9.25l0.03,0.03l-7.72,7.72l-1.52,-1.52l6.98,-6.98l-6.98,-6.98l1.52,-1.52l8.41,8.41c0,0 -0.01,0.04 -0.05,0.09c-0.02,0.03 -0.04,0.06 -0.08,0.09c-0.05,0.05 -0.19,0.22 -0.35,0.39c-0.08,0.1 -0.17,0.19 -0.24,0.27z',
  ]),

  ARROW_UNDO: List([
    'M5.9 5.16v2.99L0 4.08 5.9.01V3h7.3c4.96 0 8.8 3.8 8.8 8.51s-3.93 8.51-8.8 8.51H5.9v-2.08h7.3c3.65 0 6.65-2.9 6.65-6.43s-3-6.33-6.65-6.33z',
  ]),

  CALENDAR: List([
    'M3.06,3.38c0.53,0 0.96,-0.42 0.96,-0.93v-1.52c0,-0.51 -0.43,-0.93 -0.96,-0.93c-0.53,0 -0.96,0.42 -0.96,0.93v1.52c0,0.51 0.43,0.93 0.96,0.93zM10.94,3.38c0.53,0 0.96,-0.42 0.96,-0.93v-1.52c0,-0.51 -0.43,-0.93 -0.96,-0.93c-0.53,0 -0.96,0.42 -0.96,0.93v1.52c0,0.51 0.43,0.93 0.96,0.93zM13.13,1.52h-0.7v1.1c0,0.79 -0.67,1.44 -1.49,1.44c-0.82,0 -1.49,-0.64 -1.49,-1.44v-1.1h-4.9v1.1c0,0.79 -0.67,1.44 -1.49,1.44c-0.82,0 -1.49,-0.64 -1.49,-1.44v-1.1h-0.7c-0.48,0 -0.87,0.38 -0.87,0.84v9.79c0,0.47 0.39,0.84 0.88,0.84h11.03l2.1,-2.03v-8.61c0,-0.47 -0.39,-0.84 -0.87,-0.84z',
  ]),

  COLOR_PENCIL: List([
    'M5.88 8.34l-1.76 1.69c-.08.08-.11.2-.08.31.03.11.12.19.23.22l1.71.4c.11.03.22 0 .3-.08L7.39 9.8 5.88 8.34zM6.36 5.9l-.35 1.98 1.85 1.79 2.05-.33L6.36 5.9z',
    'M14.57.65l.76.74c.79.77.79 2.01 0 2.78l-5.07 4.92-3.64-3.53L11.69.65c.8-.77 2.08-.77 2.88 0zm-.4 2.37c.12.12.32.12.45 0s.13-.32 0-.44l-1.29-1.24c-.12-.12-.32-.11-.44 0-.12.12-.13.31-.01.44l1.29 1.24z',
    'M0 10h7v1H0v-1z',
  ]),

  COG_WHEEL: List([
    'M21,14.62l-2.15,3.75c-2,-1.14 -4.5,-0.47 -5.65,1.53c-0.38,0.67 -0.56,1.4 -0.56,2.1h-4.27c-0.03,-2.33 -1.87,-4.19 -4.14,-4.19c-0.77,0 -1.46,0.21 -2.07,0.57l-2.15,-3.75c2,-1.16 2.69,-3.73 1.53,-5.72c-0.38,-0.65 -0.92,-1.16 -1.53,-1.53l2.15,-3.75c1.97,1.16 4.5,0.49 5.63,-1.5c0.38,-0.67 0.56,-1.4 0.56,-2.12h4.27c0,2.33 1.87,4.22 4.14,4.22c0.74,0 1.46,-0.21 2.07,-0.57l2.15,3.75c-2,1.16 -2.69,3.73 -1.53,5.72c0.38,0.65 0.92,1.16 1.56,1.5zM14.89,11c0,-2.46 -1.97,-4.45 -4.4,-4.45c-2.43,0 -4.4,1.99 -4.4,4.45c0,2.46 1.97,4.45 4.4,4.45c2.43,0 4.4,-1.99 4.4,-4.45z',
  ]),

  COMMENT: List([
    'M26,9.48c0,2 -0.88,3.87 -2.26,5.47c-0.68,0.76 -1.5,1.55 -2.57,2.37c-4.26,3.33 -8.53,5.67 -8.53,5.67v-4.06c-5.96,-0.14 -10.9,-3.19 -12.22,-7.25c-0.28,-0.76 -0.42,-1.58 -0.42,-2.4c0,-4.54 4.49,-8.33 10.42,-9.09c0.82,-0.14 1.69,-0.2 2.6,-0.2c7.17,0 12.96,4.23 12.99,9.48zM20.5,16.48c0.99,-0.79 1.78,-1.52 2.4,-2.23c1.3,-1.55 1.98,-3.16 1.98,-4.77c0,-2.17 -1.19,-4.23 -3.33,-5.81c-2.26,-1.67 -5.28,-2.57 -8.5,-2.57c-0.85,0 -1.67,0.06 -2.46,0.17c-2.68,0.37 -5.11,1.38 -6.86,2.88c-0.82,0.73 -1.47,1.52 -1.92,2.4c-0.45,0.87 -0.68,1.81 -0.68,2.74c0,0.68 0.11,1.35 0.37,2v0.06c0.56,1.75 1.95,3.36 3.9,4.52c2.06,1.24 4.57,1.92 7.28,1.98l1.07,0.03v3.22c1.61,-0.99 4.18,-2.62 6.75,-4.6z',
  ]),

  COMMENT_FILL: List([
    'M8 12.08V10.3l-.59-.02c-1.5-.03-2.9-.41-4.04-1.1-1.08-.64-1.85-1.53-2.16-2.5v-.04c-.14-.36-.2-.74-.2-1.11 0-.52.13-1.03.38-1.52S2 3.09 2.45 2.68c.97-.83 2.32-1.39 3.8-1.6.44-.06.89-.09 1.36-.09 1.78 0 3.46.5 4.71 1.42 1.19.88 1.85 2.02 1.85 3.22 0 .89-.38 1.78-1.1 2.65-.34.39-.78.8-1.33 1.24-1.42 1.1-2.85 2-3.74 2.55z',
  ]),

  CONTACT_EXIST: List([
    'M10.5 21C16.299 21 21 16.299 21 10.5S16.299 0 10.5 0 0 4.701 0 10.5 4.701 21 10.5 21z',
    'M13.85 6.148a3.358 3.358 0 0 1-3.35 3.348 3.358 3.358 0 0 1-3.35-3.348A3.358 3.358 0 0 1 10.5 2.8a3.358 3.358 0 0 1 3.35 3.348zm-2.166 4.197c.646-.22 1.381-.472 2.086-.08 1.972 1.073 3.014 3.171 3.03 6.038v.497H4.2v-.497c0-2.867 1.042-4.95 2.982-6.038.737-.401 1.49-.129 2.148.096.244.088.483.17.715.22.15.033.295.052.439.052.369 0 .753-.128 1.154-.272l.046-.016z',
  ]),

  CONTACT_NO_EXIST: List([
    'M10.5 23C16.3 23 21 18.3 21 12.5S16.3 2 10.5 2 0 6.7 0 12.5 4.7 23 10.5 23z',
    'M10.5 4.8c-1.84 0-3.35 1.51-3.35 3.35s1.51 3.35 3.35 3.35 3.35-1.51 3.35-3.35S12.34 4.8 10.5 4.8zm1.14 7.56c-.4.14-.79.27-1.15.27-.15 0-.3-.02-.46-.06-.23-.05-.46-.13-.7-.22l-.05-.02c-.65-.22-1.38-.47-2.1-.08-1.94 1.09-2.98 3.17-2.98 6.04v.5h12.6v-.5c-.02-2.87-1.06-4.97-3.03-6.04-.7-.39-1.44-.14-2.09.08zM21 12c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z',
    'M18.25 8.75c.17.17.39.25.61.25.23 0 .44-.09.61-.25l2.02-2.03 2.02 2.02c.17.17.39.25.61.25.23 0 .44-.09.61-.25.33-.33.33-.88 0-1.22L22.7 5.5l2.02-2.02c.33-.33.33-.88 0-1.22a.875.875 0 0 0-1.22 0l-2.02 2.02-2.02-2.03a.875.875 0 0 0-1.22 0c-.33.33-.33.88 0 1.22l2.02 2.03-2.03 2.02c-.33.34-.33.88 0 1.23z',
  ]),

  CONTACTS: List([
    'M21.55 8.6c2.46 0 4.47-1.94 4.47-4.3 0-2.37-2.01-4.3-4.47-4.3s-4.47 1.94-4.47 4.3c0 2.37 2.01 4.3 4.47 4.3zM9.71 10.78c2.84 0 5.16-2.31 5.16-5.14C14.87 2.81 12.55.5 9.71.5 6.87.5 4.55 2.81 4.55 5.64c0 2.83 2.32 5.14 5.16 5.14zm12.95-.85c-.37.11-.73.2-1.08.2-.49 0-1-.17-1.54-.35-.88-.29-1.88-.64-2.86-.12-.59.32-1.11.7-1.57 1.15 2.6 1.45 4.25 3.95 4.87 7.29h9.53v-.64c-.02-3.7-1.41-6.41-4.04-7.8-.96-.52-1.97-.17-2.84.12-.16.05-.31.11-.46.15zM9.68 12.52c-.57 0-1.16-.2-1.78-.42l-.07-.02c-1-.34-2.13-.73-3.24-.12-2.99 1.67-4.6 4.87-4.6 9.28V22h19.42v-.76c-.02-4.41-1.63-7.63-4.67-9.28-1.11-.62-2.27-.2-3.29.15-.62.22-1.21.42-1.78.42z',
  ]),

  CROSS_SIMPLE: List([
    'M7.02,5.82l-5.41,-5.41l-1.2,1.2l5.41,5.41l-5.41,5.41l1.2,1.2l5.41,-5.41l5.41,5.41l1.2,-1.2l-5.41,-5.41l5.41,-5.41l-1.2,-1.2z',
  ]),

  DASHBOARD: List([
    'M1.5 6.13c.83 0 1.5-.7 1.5-1.56 0-.86-.67-1.56-1.5-1.56S0 3.71 0 4.57c0 .86.67 1.56 1.5 1.56z',
    'M5.5 3.13c.83 0 1.5-.7 1.5-1.56C7 .71 6.33.01 5.5.01S4 .71 4 1.57c0 .86.67 1.56 1.5 1.56z',
    'M9.5 6.13c.83 0 1.5-.7 1.5-1.56 0-.86-.67-1.56-1.5-1.56S8 3.71 8 4.57c0 .86.67 1.56 1.5 1.56z',
    'M2.7 8v2.15H0V8z',
    'M6.7 6.15v4H4v-4z',
    'M10.7 8v2.15H8V8z',
    'M1 4.15l4.39-3.14.58.81-4.39 3.14z',
    'M5.58 1l4.39 3.15-.58.81L5 1.81z',
  ]),

  DUE_DATE: List([
    'M3.45 2c0 .42-.37.76-.83.76-.46 0-.83-.34-.83-.76V.76c0-.42.37-.76.83-.76.46 0 .83.34.83.76zm6.75 0c0 .42-.37.76-.82.76-.46 0-.83-.34-.83-.76V.76c0-.42.37-.76.83-.76.46 0 .82.34.82.76zm1.8-.07v9.38c0 .38-.34.69-.75.69H.75c-.41 0-.75-.31-.75-.69V1.93c0-.38.34-.69.75-.69h.6v.9c0 .65.57 1.17 1.27 1.17.7 0 1.27-.52 1.27-1.17v-.9h4.2v.9c0 .65.57 1.17 1.27 1.17.7 0 1.27-.52 1.27-1.17v-.9h.6c.41 0 .75.31.75.69zM1.5 10.76H3V9.38H1.5zM3 7.03H1.5v1.38H3zm-1.5-1.1H3V4.55H1.5zm4.05 3.45h-1.5v1.38h1.5zm-1.5-.97h1.5V7.03h-1.5zm1.5-3.86h-1.5v1.38h1.5zm1.05 6.21h1.5V9.38H6.6zm1.5-3.73H6.6v1.38h1.5zm-1.5-1.1h1.5V4.55H6.6zm4.05 1.1h-1.5v1.38h1.5zm-1.5-1.1h1.5V4.55h-1.5z',
  ]),

  ERROR: List([
    'M11.2,2.44c0,7.52 -0.94,8.47 -5.6,11.56c-4.66,-3.09 -5.6,-4.05 -5.6,-11.56l5.6,-2.44zM4.9,8.23h1.4l0.35,-4.9h-2.1zM4.9,9.63c0,0.39 0.31,0.7 0.7,0.7c0.39,0 0.7,-0.31 0.7,-0.7c0,-0.39 -0.31,-0.7 -0.7,-0.7c-0.39,0 -0.7,0.31 -0.7,0.7z',
  ]),

  EXPORT: List([
    'M16,18c0.26,0 0.51,-0.1 0.71,-0.29l10.29,-10.29v35.59c0,0.55 0.45,1 1,1c0.55,0 1,-0.45 1,-1v-35.59l10.29,10.29c0.2,0.2 0.45,0.29 0.71,0.29c0.26,0 0.51,-0.1 0.71,-0.29c0.39,-0.39 0.39,-1.02 0,-1.41l-12,-12c-0.09,-0.09 -0.2,-0.17 -0.33,-0.22c-0.24,-0.1 -0.52,-0.1 -0.76,0c-0.12,0.05 -0.23,0.12 -0.33,0.22l-12,12c-0.39,0.39 -0.39,1.02 0,1.41c0.2,0.2 0.45,0.29 0.71,0.29z',
    'M55,38c-0.55,0 -1,0.45 -1,1v11h-52v-11c0,-0.55 -0.45,-1 -1,-1c-0.55,0 -1,0.45 -1,1v13h56v-13c0,-0.55 -0.45,-1 -1,-1z',
  ]),

  FILE_EMPTY: List([
    'M28,5.58v26.42h-24v-32h18.41zM22,6h3.59l-3.59,-3.59c0,0 0,3.59 0,3.59zM26,8h-6v-6h-14v28h20z',
  ]),

  FILTER: List([
    'M0,0h18l-6.6,10.54v14.46l-4.8,-3.12v-11.34zM15,11h8v2h-8zM15,15h8v2h-8zM15,19h8v2h-8z',
  ]),

  FOLLOWER_ACCEPTED: List([
    'M16 8c0-4.42-3.58-8-8-8S0 3.58 0 8s3.58 8 8 8 8-3.58 8-8z',
    'M8 14.86c3.79 0 6.86-3.07 6.86-6.86 0-3.79-3.07-6.86-6.86-6.86-3.79 0-6.86 3.07-6.86 6.86 0 3.79 3.07 6.86 6.86 6.86z',
    'M3.68 9.79l2.46 2.52c.34.34.89.34 1.23 0l4.95-5.08c.34-.34.34-.92 0-1.26a.87.87 0 0 0-1.23 0l-4.33 4.44-1.85-1.9a.872.872 0 0 0-1.24.01c-.34.34-.34.91 0 1.26z',
  ]),

  FOLLOWER_INBOX: List([
    'M16 8c0-4.42-3.58-8-8-8S0 3.58 0 8s3.58 8 8 8 8-3.58 8-8z',
    'M8 15c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7 3.13 7 7 7z',
    'M11 5c.46 0 .89.24 1.1.65l1.13 2.3c.03.04.04.09.04.15v2.48c0 .79-.66 1.42-1.48 1.42H4.48C3.66 12 3 11.36 3 10.58V8.1c0-.05.01-.11.04-.15l1.13-2.29c.21-.42.63-.66 1.1-.66zM9.84 8.03c.04-.16.18-.27.35-.27v-.01h2.17l-.89-1.81a.526.526 0 0 0-.46-.27H5.26c-.2 0-.38.11-.46.28l-.89 1.81h2.18c.17 0 .32.11.35.27v.01c.03.1.34 1.36 1.7 1.36 1.37 0 1.67-1.25 1.7-1.36v-.01z',
  ]),

  FOLLOWER_NEW: List([
    'M15.19 12.357c-1.144-.654-2.34-.21-3.383.157-.636.235-1.247.444-1.832.444-.586 0-1.196-.21-1.833-.444-1.043-.366-2.239-.81-3.41-.157C1.655 14.134 0 17.533 0 22.212v.81h20v-.81c-.025-4.68-1.68-8.104-4.81-9.855zM10 11c3.026 0 5.5-2.474 5.5-5.5S13.026 0 10 0 4.5 2.474 4.5 5.5 6.974 11 10 11',
  ]),

  FOLLOWER_PENDING: List([
    'M16 8c0-4.42-3.58-8-8-8S0 3.58 0 8s3.58 8 8 8 8-3.58 8-8z',
    'M8 14.86c3.79 0 6.86-3.07 6.86-6.86 0-3.79-3.07-6.86-6.86-6.86-3.79 0-6.86 3.07-6.86 6.86 0 3.79 3.07 6.86 6.86 6.86z',
    'M8.62 9.07c-.02-.22 0-.41.07-.59.08-.18.18-.34.3-.49.12-.15.25-.3.4-.44.15-.14.29-.3.41-.46.13-.16.24-.33.32-.52.09-.19.13-.41.13-.65 0-.38-.06-.7-.19-.96-.12-.27-.29-.49-.5-.66-.22-.17-.47-.29-.76-.37-.29-.08-.6-.12-.92-.12-.48 0-.92.1-1.33.31-.4.21-.75.48-1.04.82l1.13 1.03c.16-.14.31-.26.46-.36.14-.1.32-.14.53-.14.18 0 .34.05.47.14.14.09.2.24.2.46 0 .13-.04.26-.13.38-.08.12-.18.25-.3.38-.12.14-.25.28-.4.43-.14.15-.26.32-.37.5-.1.18-.18.37-.24.59-.06.22-.06.45-.02.71zm-.04 2.71c.22-.24.34-.54.34-.89s-.11-.65-.34-.89c-.22-.24-.51-.36-.86-.36s-.64.12-.86.36c-.22.24-.34.54-.34.89s.11.65.34.89c.22.24.51.36.86.36s.64-.12.86-.36z',
  ]),

  FOLLOWER_REJECTED: List([
    'M16 8c0-4.42-3.58-8-8-8S0 3.58 0 8s3.58 8 8 8 8-3.58 8-8z',
    'M8 14.86c3.79 0 6.86-3.07 6.86-6.86 0-3.79-3.07-6.86-6.86-6.86-3.79 0-6.86 3.07-6.86 6.86 0 3.79 3.07 6.86 6.86 6.86z',
    'M4.82 11.19c.17.17.38.24.6.24.22 0 .43-.08.6-.24L8 9.2l1.98 1.98c.17.17.38.24.6.24.22 0 .43-.08.6-.24.33-.33.33-.86 0-1.19L9.19 8.01l1.98-1.98c.33-.33.33-.86 0-1.19a.839.839 0 0 0-1.19 0L8 6.82 6.02 4.83a.839.839 0 0 0-1.19 0c-.33.33-.33.86 0 1.19l1.98 1.99-1.99 1.98c-.33.34-.33.86 0 1.2z',
  ]),

  IMPORTANT: List([
    'M32.56 65.14C14.57 65.13 0 50.55 0 32.56S14.59-.01 32.57 0c17.99 0 32.57 14.58 32.57 32.57-.02 17.98-14.6 32.55-32.58 32.57zm.46-13.25c2.19 0 3.97-1.78 3.97-3.97 0-2.19-1.78-3.97-3.97-3.97-2.19 0-3.97 1.78-3.97 3.97 0 2.19 1.78 3.97 3.97 3.97zm3.08-15.28l3-18.15c0-7.27-12.1-7.27-12.1 0l3 18.15c0 .81.32 1.58.89 2.16a3.056 3.056 0 0 0 5.21-2.16z',
  ]),

  INCOMING: List([
    'M13 0c1.66 0 3 1.34 3 3v6c0 1.66-1.34 3-3 3H3c-1.66 0-3-1.34-3-3V3c0-1.66 1.34-3 3-3h10zM3 1c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2H3z',
    'M1.13 10.23l4.95-4.95.71.71-4.95 4.95-.71-.71zM7.45 7.02L13.92.55l.71.71-6.48 6.47-.7-.71z',
    'M2.17.46L8.8 7.09l-.71.71-6.63-6.63.71-.71zM10 5.29l5.21 5.21-.71.71L9.29 6l.71-.71z',
  ]),

  INBOX: List([
    'M30.87 9.15c.08.13.13.29.13.46v7.68a4.41 4.41 0 0 1-4.41 4.41H4.76a4.41 4.41 0 0 1-4.41-4.41V9.61c0-.17.04-.34.13-.46l3.36-7.09A3.6 3.6 0 0 1 7.11 0h17.12c1.39 0 2.64.76 3.27 2.01zm-9.06-.63h6.46L25.63 2.9c-.25-.5-.8-.84-1.39-.84H7.07c-.59 0-1.13.34-1.39.88L3.04 8.56h6.51c.5 0 .97.34 1.05.84.04.17.92 4.24 5.08 4.24 4.2 0 5.04-4.07 5.08-4.24.13-.5.55-.84 1.05-.84z',
  ]),

  INFO: List([
    'M14 7.08c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7 7 3.14 7 7zM5.81 3.46c0 .59.42 1.07 1.01 1.07.59 0 1.07-.36 1.07-.95 0-.65-.47-1.07-1.07-1.07-.59 0-1.01.42-1.01.95zm-.29 6.88v1.19h2.97v-1.25H7.9V5.53H5.53v.77h.59v4.03z',
  ]),

  LIST: List([
    'M3.25.81h8.94v1.63H3.25V.81zm0 3.25h8.94v1.63H3.25V4.06zm0 3.25h8.94v1.63H3.25V7.31zm-.81 4.07c0 .44-.37.81-.81.81-.45 0-.82-.37-.82-.81 0-.45.37-.82.82-.82.44 0 .81.37.81.82zm9.75.81H3.25v-1.63h8.94v1.63zM2.44 8.13c0 .44-.37.81-.81.81-.45 0-.82-.37-.82-.81 0-.45.37-.82.82-.82.44 0 .81.37.81.82zm0-3.25c0 .44-.37.81-.81.81-.45 0-.82-.37-.82-.81 0-.45.37-.82.82-.82.44 0 .81.37.81.82zm0-3.25c0 .44-.37.81-.81.81-.45 0-.82-.37-.82-.81 0-.45.37-.82.82-.82.44 0 .81.37.81.82z',
  ]),

  LOCK: List([
    'M4.32 6.01c0-2.23 1.31-3.78 3.18-3.78s3.18 1.56 3.18 3.78v1.64h2.14V6.01C12.82 2.59 10.53 0 7.5 0 4.47 0 2.18 2.58 2.18 6.01v1.64h2.14zM2.8 9.17h9.4c1.55 0 2.8 1.3 2.8 2.9v5.03c0 1.6-1.25 2.9-2.8 2.9H2.8C1.25 20 0 18.7 0 17.1v-5.03c0-1.6 1.25-2.9 2.8-2.9zm5.43 7.84v-2.2c.73-.36 1.13-1.19.95-2.01-.18-.82-.88-1.4-1.68-1.4-.81 0-1.51.58-1.68 1.4-.18.82.22 1.65.95 2.01v2.2c0 .27.14.52.37.66.23.14.5.14.73 0 .23-.14.37-.39.37-.66z',
  ]),

  LOGO: List([
    'M21 15.35c0-2.24 1.67-3.49 3.77-3.8l3.1-.46c.72-.1.95-.46.95-.89 0-.89-.69-1.63-2.13-1.63-1.49 0-2.31.94-2.41 2.04l-3.02-.64c.21-1.96 2.02-4.13 5.41-4.13 4 0 5.48 2.24 5.48 4.77v6.17c0 .66.08 1.56.15 1.99h-3.13c-.08-.33-.13-1.02-.13-1.5-.64.99-1.85 1.86-3.72 1.86-2.69 0-4.33-1.81-4.33-3.77zm5.05 1.25c1.44 0 2.77-.69 2.77-2.91v-.56l-2.84.43c-.87.13-1.56.61-1.56 1.58 0 .74.54 1.45 1.64 1.45zm8.63 2.86l3.08-.82c.23 1.38 1.33 2.37 2.95 2.37 2.15 0 3.36-1.07 3.36-3.49v-.92c-.51.82-1.69 1.61-3.51 1.61-3.36 0-5.87-2.58-5.87-6.1 0-3.32 2.41-6.12 5.87-6.12 2 0 3.15.87 3.59 1.71V6.22h3.28v11.2c0 3.44-1.87 6.58-6.61 6.58-3.46 0-5.77-2.14-6.12-4.54zm6.46-4.16c1.74 0 2.97-1.25 2.97-3.19s-1.33-3.16-2.97-3.16c-1.69 0-3.02 1.22-3.02 3.16 0 1.96 1.26 3.19 3.02 3.19zm9.33-13.18c0-1.17.95-2.12 2.1-2.12 1.18 0 2.1.94 2.1 2.12 0 1.12-.92 2.07-2.1 2.07-1.15 0-2.1-.94-2.1-2.07zm6.38 13.16l2.92-.64c.08.99.82 1.91 2.31 1.91 1.13 0 1.67-.59 1.67-1.25 0-.56-.38-1.02-1.36-1.22l-1.67-.38c-2.43-.54-3.54-1.99-3.54-3.75 0-2.24 2-4.11 4.72-4.11 3.59 0 4.79 2.27 4.95 3.62l-2.84.64c-.1-.74-.64-1.68-2.08-1.68-.9 0-1.61.54-1.61 1.25 0 .61.46.99 1.15 1.12l1.79.38c2.49.51 3.74 2.01 3.74 3.85 0 2.04-1.59 4.13-4.89 4.13-3.79 0-5.1-2.45-5.25-3.88zM0 2.92c0 1.22.99 2.21 2.21 2.21h7.14a2.21 2.21 0 0 0 0-4.42H2.21C.99.71 0 1.7 0 2.92zM0 9.83c0 1.22.99 2.21 2.21 2.21h7.14a2.21 2.21 0 0 0 0-4.42H2.21C.99 7.62 0 8.61 0 9.83zM0 16.74c0 1.22.99 2.21 2.21 2.21h.91a2.21 2.21 0 0 0 0-4.42h-.91c-1.22 0-2.21.99-2.21 2.21zM16.55.53c-.98 0-1.78.79-1.78 1.78v14.9c0 .98.79 1.78 1.78 1.78.98 0 1.78-.79 1.78-1.78V2.31c0-.98-.79-1.78-1.78-1.78zM52.68 6.38c-.98 0-1.78.79-1.78 1.78v9.05c0 .98.79 1.78 1.78 1.78.98 0 1.78-.79 1.78-1.78V8.16c0-.98-.79-1.78-1.78-1.78z',
  ]),

  LOG_OUT: List([
    'M11.82,14v2h-11.82v-16h11.82v2h-9.82v12zM10,4l6,4l-6,4v-2h-6v-4h6z',
  ]),

  MAGNIFIER: List([
    'M9.57,12.45c-0.9,0.46 -1.91,0.72 -2.99,0.72c-3.64,0 -6.58,-2.95 -6.58,-6.58c0,-3.64 2.95,-6.58 6.58,-6.58c3.64,0 6.58,2.95 6.58,6.58c0,1.36 -0.41,2.63 -1.12,3.68l4.61,4.61c0,0 0.78,0.78 0,1.55l-0.78,0.78c-0.78,0.78 -1.55,0 -1.55,0zM6.58,10.97c2.42,0 4.39,-1.96 4.39,-4.39c0,-2.42 -1.96,-4.39 -4.39,-4.39c-2.42,0 -4.39,1.96 -4.39,4.39c0,2.42 1.96,4.39 4.39,4.39z',
  ]),

  NON_ARCHIVE: List([
    'M26,10.83v14.02l-12,3.98v-13.97zM0,10.83l12,4.03v13.97l-12,-3.98zM17.19,5.21l0,2.89l-3.31,-3.31l0,6.51l-2.12,0l0,-6.53l-3.32,3.32v-2.88l4.37,-4.37z',
  ]),

  NO_INCOMING: List([
    'M9.5 4C8.18 4 7.11 5.08 7.11 6.39a2.39 2.39 0 104.78 0C11.89 5.08 10.82 4 9.5 4zm.81 5.4c-.28.1-.56.19-.82.19-.26 0-.54-.09-.83-.19-.01 0-.02-.01-.03-.01-.46-.16-.99-.34-1.5-.06C5.74 10.11 5 11.6 5 13.65c0 2.04 9.01 2.04 9 0-.01-2.05-.76-3.55-2.16-4.32-.51-.28-1.03-.1-1.5.06-.01 0-.02.01-.03.01z',
    'M0 9.5C0 4.25 4.25 0 9.5 0S19 4.25 19 9.5 14.75 19 9.5 19 0 14.75 0 9.5zM9.5 17c4.14 0 7.5-3.36 7.5-7.5C17 5.36 13.64 2 9.5 2 5.36 2 2 5.36 2 9.5 2 13.64 5.36 17 9.5 17z',
    'M14.41 1.75l1.62 1.17L5.62 17.39 4 16.22 14.41 1.75z',
  ]),

  NO_TAGS: List([
    'M10.9,4l-7.88,7.88c-1.74,-0.44 -3.02,-2.01 -3.02,-3.88c0,-2.21 1.79,-4 4,-4zM13.46,4.27c1.49,0.58 2.54,2.03 2.54,3.73c0,2.21 -1.79,4 -4,4h-6.27z',
  ]),

  NOTIFICATIONS: List([
    'M15.05 9.5c0 3.01.41 3.79 1.26 4.61.99.96.99 2.35-.45 2.35h-4.15c-.29 1.44-1.63 2.53-3.2 2.53-1.57 0-2.89-1.1-3.2-2.53H1.16c-1.45 0-1.45-1.4-.45-2.35.83-.82 1.26-1.6 1.26-4.61 0-2.73 1.28-4.95 3.28-6.11v-.86C5.25 1.13 6.43 0 7.87 0h1.3c1.45 0 2.62 1.14 2.62 2.53v.86c1.98 1.16 3.26 3.37 3.26 6.11zM16 15c.02.04.04.06.06.08a.138.138 0 0 1-.03-.04c-.01-.01-.02-.03-.03-.04zm.06.08z',
  ]),

  OPTIONS: List([
    'M0.5,19.7c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,0 2.5,1.12 2.5,2.5c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,0 -2.5,-1.12 -2.5,-2.5zM0.5,11.35c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,0 2.5,1.12 2.5,2.5c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,0 -2.5,-1.12 -2.5,-2.5zM0.5,3c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,0 2.5,1.12 2.5,2.5c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,0 -2.5,-1.12 -2.5,-2.5z',
  ]),

  PENCIL: List([
    'M5.79,13.43l-5.79,1.57l1.57,-5.8l8.74,-8.77c0.29,-0.29 0.68,-0.43 1.06,-0.43c0.38,0 0.77,0.14 1.06,0.43l2.12,2.11c0.59,0.59 0.59,1.53 0,2.12zM4.46,12.26l-1.71,-1.71l-0.63,2.32zM5.72,11.4l7.77,-7.78l-2.12,-2.12l-7.77,7.78z',
  ]),

  PIN: List([
    'M6.1,25.09c-1.62,0 -3.18,-0.64 -4.31,-1.81c-2.39,-2.39 -2.39,-6.27 0,-8.66l13.55,-13.4c0.76,-0.76 1.87,-1.22 3,-1.22c1.13,0 2.23,0.46 3.03,1.25c1.68,1.68 1.68,4.38 0,6.06l-13.55,13.4c-0.46,0.46 -1.07,0.7 -1.71,0.7c-0.64,0 -1.25,-0.24 -1.74,-0.7c-0.95,-0.95 -0.95,-2.51 0,-3.46l6.82,-6.67c0.24,-0.24 0.64,-0.24 0.86,0c0.24,0.24 0.24,0.64 0,0.86l-6.79,6.67c-0.46,0.46 -0.46,1.25 0,1.71c0.24,0.24 0.55,0.37 0.86,0.37c0.34,0 0.64,-0.12 0.86,-0.37l13.55,-13.4c1.19,-1.19 1.19,-3.12 0,-4.31c-0.58,-0.58 -1.35,-0.89 -2.17,-0.89c-0.83,0 -1.59,0.31 -2.17,0.89l-13.52,13.4c-1.9,1.9 -1.9,5.02 0,6.91c0.92,0.92 2.14,1.44 3.46,1.44c1.32,0 2.54,-0.52 3.46,-1.44l11.72,-11.57c0.24,-0.24 0.64,-0.24 0.86,0c0.24,0.24 0.24,0.64 0,0.86l-11.72,11.6c-1.13,1.13 -2.69,1.77 -4.31,1.77z',
  ]),

  PLUS: List([
    'M13.05,13.05h-13.05v2.9h13.05v13.05h2.9v-13.05h13.05v-2.9h-13.05v-13.05l-2.9,0z',
  ]),

  REMINDER_DATE: List([
    'M12.37.22c1.13-.01 2.13.75 2.41 1.84.28 1.09-.22 2.23-1.22 2.76.54 2.15-.09 4.43-1.67 6l1.12 1.47-.83.62-1.1-1.42a6.413 6.413 0 0 1-7.47 0l-1.09 1.42-.83-.62 1.12-1.47a6.295 6.295 0 0 1-1.67-6A2.449 2.449 0 0 1 0 2.53C.08 1.62.67.83 1.53.48 2.39.14 3.37.3 4.07.9 6.09-.3 8.62-.3 10.64.9c.46-.45 1.08-.7 1.72-.7zM1.49 3.81c.39-.88.98-1.66 1.72-2.28-.43-.33-1.02-.39-1.51-.15-.49.24-.8.74-.8 1.28 0 .45.22.88.59 1.15zm.91 4.56a5.372 5.372 0 0 0 4.96 3.29c2.95 0 5.35-2.37 5.36-5.3.01-2.15-1.29-4.1-3.3-4.93-2-.83-4.31-.38-5.85 1.14s-2 3.81-1.17 5.8zm11.11-6.54c-.48-.63-1.38-.76-2.02-.29.74.62 1.33 1.41 1.72 2.29.64-.47.77-1.37.29-2zm-6.74.73H7.8v3.75l2.07 1.66-.66.8-2.45-1.98z',
  ]),

  SELECT: List([
    'M0,1.42c0,-0.8 0.62,-1.42 1.42,-1.42h2.41v1.23h-2.43c-0.1,0 -0.19,0.08 -0.19,0.19v2.43h-1.21zM13.58,0c0.78,0 1.42,0.62 1.4,1.42v2.41h-1.21v-2.43c0,-0.1 -0.08,-0.19 -0.19,-0.19h-2.43v-1.21zM5.47,0h4.05v1.21h-4.05zM13.77,13.58h0.02v-2.43h1.21v2.41c0,0.78 -0.64,1.42 -1.42,1.42h-2.43v-1.21h2.43c0.1,0 0.19,-0.08 0.19,-0.19zM13.77,5.47h1.21v4.05h-1.21zM1.21,13.58c0,0.1 0.1,0.19 0.21,0.21h2.43v1.21h-2.43c-0.78,0 -1.42,-0.64 -1.42,-1.42v-2.43h1.21zM5.47,13.77h4.05v1.21h-4.05zM0,5.47h1.21v4.05h-1.21z',
  ]),

  SEND_INVITE: List([
    'M16.83 5.56l.03.04c.02.03.04.06.07.12.04.09.06.19.06.28v7.69c0 1.27-1.02 2.3-2.27 2.3H2.26c-1.25 0-2.27-1.03-2.27-2.3V6c0-.1.02-.19.08-.32.01-.02.02-.03.03-.05.01-.01.02-.03.03-.04l.03-.04.03-.04.02-.02.03-.03 2-1.67v-.81c0-1.27 1.02-2.3 2.27-2.3h7.96c1.25 0 2.27 1.03 2.27 2.3v.81l2.02 1.7.03.03zm-2.08.75l.44-.33-.44-.37zM3.63 2.98v4.38L8.44 11c.02.01.04.02.06.02.02 0 .04-.01.06-.02l4.81-3.64V2.98c0-.5-.4-.9-.89-.9H4.52c-.49 0-.89.4-.89.9zM2.25 6.31v-.7l-.44.37zm13.37 7.39V7.39l-1.05.8c-.06.07-.14.13-.22.17l-4.96 3.75c-.53.4-1.25.4-1.78 0L2.65 8.37a.723.723 0 0 1-.22-.17l-1.05-.8v6.29c0 .5.4.9.89.9h12.46c.49 0 .89-.4.89-.89zM7.75 6.85h-.74c-.38 0-.69-.31-.69-.7 0-.39.31-.7.69-.7h.74V4.7c0-.39.31-.7.69-.7.38 0 .69.31.69.7v.75h.74c.38 0 .69.31.69.7 0 .39-.31.7-.69.7h-.74v.75c0 .39-.31.7-.69.7-.38 0-.69-.31-.69-.7z',
  ]),

  SORT_ALPHABET: List([
    'M8.4,19.44v-19.44h-2.4v19.44l-4.32,-4.32l-1.68,1.68l7.2,7.2l7.32,-7.2l-1.68,-1.68z',
    'M13.62,3.54l0.09,-0.42c0.07,-0.29 0.13,-0.61 0.2,-0.95c0.06,-0.34 0.13,-0.67 0.19,-0.98h0.03c0.07,0.31 0.14,0.63 0.2,0.97c0.07,0.34 0.14,0.66 0.2,0.95l0.09,0.42zM15.17,6.08h1.54l-1.67,-6.08h-1.76l-1.67,6.08h1.49l0.27,-1.29h1.54zM18.56,14h4.06v-1.35h-2.27l2.25,-3.76v-0.97h-3.82v1.35h2.03l-2.25,3.76zM10.86,12.58l0.99,0.99l11.83,-11.83l-0.99,-0.99z',
  ]),

  SORT_DEFAULT: List([
    'M8.4 0v19.44l4.44-4.32 1.68 1.68L7.2 24 0 16.8l1.68-1.68L6 19.44V0zm10.8 2.4h-8.4V0h8.4zm-8.4 2.4h8.4v2.4h-8.4zm8.4 7.2h-8.4V9.6h8.4z',
  ]),

  SORT_DUE_DATE: List([
    'M8.4,19.44v-19.44h-2.4v19.44l-4.32,-4.32l-1.68,1.68l7.2,7.2l7.32,-7.2l-1.68,-1.68z',
    'M12.95,2.17v-1.34c0,-0.45 0.4,-0.82 0.89,-0.82c0.49,0 0.89,0.37 0.89,0.82v1.34c0,0.45 -0.4,0.82 -0.89,0.82c-0.49,0 -0.89,-0.37 -0.89,-0.82zM20.26,2.17v-1.34c0,-0.45 0.4,-0.82 0.89,-0.82c0.49,0 0.89,0.37 0.89,0.82v1.34c0,0.45 -0.4,0.82 -0.89,0.82c-0.49,0 -0.89,-0.37 -0.89,-0.82zM24,2.09v10.16c0,0.41 -0.36,0.75 -0.81,0.75h-11.38c-0.45,0 -0.81,-0.33 -0.81,-0.75v-10.16c0,-0.41 0.36,-0.75 0.81,-0.75h0.65v0.97c0,0.7 0.62,1.27 1.38,1.27c0.76,0 1.38,-0.57 1.38,-1.27v-0.97h4.55v0.97c0,0.7 0.62,1.27 1.38,1.27c0.76,0 1.38,-0.57 1.38,-1.27v-0.97h0.65c0.45,0 0.81,0.33 0.81,0.75zM14.25,10.16h-1.63v1.49h1.63zM14.25,7.62h-1.63v1.49h1.63zM14.25,4.93h-1.63v1.49h1.63zM17.01,10.16h-1.63v1.49h1.63zM17.01,7.62h-1.63v1.49h1.63zM17.01,4.93h-1.63v1.49h1.63zM19.77,10.16h-1.63v1.49h1.63zM19.77,7.62h-1.63v1.49h1.63zM19.77,4.93h-1.63v1.49h1.63zM22.54,7.62h-1.63v1.49h1.63zM22.54,4.93h-1.63v1.49h1.63z',
  ]),

  SORT_IMPORTANT: List([
    'M8.4 19.44V0H6v19.44l-4.32-4.32L0 16.8 7.2 24l7.32-7.2-1.68-1.68z',
    'M14.3 10.77c0-.68-.59-1.23-1.31-1.23-.72 0-1.31.55-1.31 1.23 0 .68.59 1.23 1.31 1.23.72 0 1.31-.55 1.31-1.23zm.7-9.09c0-2.24-4-2.24-4 0l.99 5.6c0 .25.11.49.3.67.19.18.45.28.71.28.56 0 1.01-.42 1.01-.94z',
  ]),

  SORT_INCOMPLETE: List([
    'M15.66,8.89l-3.66,-3.93v3.11l2.94,3.15l0.72,0.78l7.34,-7.89v-3.11zM8.4,0h-2.4v19.44l-4.32,-4.32l-1.68,1.68l7.2,7.2l7.32,-7.2l-1.68,-1.68l-4.44,4.32z',
  ]),

  START_DATE: List([
    'M3.45 2c0 .42-.37.76-.83.76-.46 0-.83-.34-.83-.76V.76c0-.42.37-.76.83-.76.46 0 .83.34.83.76zm6.75 0c0 .42-.37.76-.82.76-.46 0-.83-.34-.83-.76V.76c0-.42.37-.76.83-.76.46 0 .82.34.82.76zm1.8-.07v9.38c0 .38-.34.69-.75.69H.75c-.41 0-.75-.31-.75-.69V1.93c0-.38.34-.69.75-.69h.6v.9c0 .65.57 1.17 1.27 1.17.7 0 1.27-.52 1.27-1.17v-.9h4.2v.9c0 .65.57 1.17 1.27 1.17.7 0 1.27-.52 1.27-1.17v-.9h.6c.41 0 .75.31.75.69zM11 4H1v7h10z',
  ]),

  TAG: List([
    'M0,5.8v0c0,2.88 2.32,5.2 5.2,5.2h8.82c2.88,0 5.2,-2.32 5.2,-5.2v0c0,-2.88 -2.32,-5.2 -5.2,-5.2h-8.82c-2.88,0 -5.2,2.32 -5.2,5.2z',
  ]),

  TAG_FILTER: List([
    'M0.1,1.02c-0.28,-0.44 0.05,-1.02 0.59,-1.02h13.62c0.54,0 0.87,0.57 0.59,1.02l-4.89,7.71v10.61c0,0.53 -0.61,0.85 -1.07,0.56l-3.63,-2.33c-0.19,-0.12 -0.31,-0.33 -0.31,-0.56v-8.28zM6.27,8.18c0.07,0.11 0.1,0.23 0.1,0.35v8.11l2.26,1.45v-9.56c0,-0.12 0.04,-0.24 0.1,-0.35l4.35,-6.85h-11.16z',
  ]),

  TAG_HALF: List([
    'M2.27,0.85c-1.31,0.89 -2.17,2.4 -2.17,4.1v0c0,2.74 2.22,4.96 4.96,4.96h8.96c1.14,0 2.2,-0.39 3.04,-1.04z',
    'M5,0h9c2.76,0 5,2.24 5,5c0,2.76 -2.24,5 -5,5h-9c-2.76,0 -5,-2.24 -5,-5c0,-2.76 2.24,-5 5,-5zM5.03,0.96c-2.23,0 -4.04,1.81 -4.04,4.04c0,2.23 1.81,4.04 4.04,4.04h8.94c2.23,0 4.04,-1.81 4.04,-4.04c0,-2.23 -1.81,-4.04 -4.04,-4.04z',
  ]),

  TAG_INACTIVE: List([
    'M5,0h9c2.76,0 5,2.24 5,5c0,2.76 -2.24,5 -5,5h-9c-2.76,0 -5,-2.24 -5,-5c0,-2.76 2.24,-5 5,-5zM5.03,0.96c-2.23,0 -4.04,1.81 -4.04,4.04c0,2.23 1.81,4.04 4.04,4.04h8.94c2.23,0 4.04,-1.81 4.04,-4.04c0,-2.23 -1.81,-4.04 -4.04,-4.04z',
  ]),

  TAG_MULTI: List([
    'M0,7.2v0c0,2.65 2.15,4.8 4.8,4.8h8.01c2.65,0 4.8,-2.15 4.8,-4.8v0c0,-2.65 -2.15,-4.8 -4.8,-4.8h-8.01c-2.65,0 -4.8,2.15 -4.8,4.8z',
    'M2.38,4.8c0,-2.65 2.14,-4.8 4.8,-4.8h8.01c2.65,0 4.8,2.15 4.8,4.8c0,2.65 -2.14,4.8 -4.8,4.8h-8.01c-2.65,0 -4.8,-2.15 -4.8,-4.8zM3.15,4.8c0,2.2 1.79,4 3.99,4h8.08c2.2,0 3.99,-1.79 3.99,-4c0,-2.2 -1.79,-4 -3.99,-4h-8.08c-2.2,0 -3.99,1.79 -3.99,4z',
  ]),

  TASK_COMPLETED: List([
    'M18 0C20.21 0 22 1.79 22 4L22 18C22 20.21 20.21 22 18 22L4 22C1.79 22 0 20.21 0 18L0 4C0 1.79 1.79 0 4 0L18 0ZM10.01 12.44L7.81 10.26C7.4 9.86 6.74 9.86 6.33 10.27L6.31 10.28C5.9 10.69 5.9 11.36 6.3 11.76L8.5 13.94L9.26 14.69C9.67 15.1 10.34 15.1 10.75 14.69L11.52 13.94L16.69 8.8C17.1 8.4 17.1 7.73 16.69 7.32L16.67 7.31L16.67 7.31C16.26 6.9 15.59 6.9 15.18 7.3L10.01 12.44Z',
  ]),

  TASK_UNCOMPLETED: List([
    'M0 4C0 1.79 1.79 0 4 0L18 0C20.21 0 22 1.79 22 4L22 18C22 20.21 20.21 22 18 22L4 22C1.79 22 0 20.21 0 18L0 4ZM1 18C1 19.66 2.34 21 4 21L18 21C19.66 21 21 19.66 21 18L21 4C21 2.34 19.66 1 18 1L4 1C2.34 1 1 2.34 1 4L1 18ZM15.18 7.3C15.59 6.9 16.26 6.9 16.67 7.31L16.67 7.31L16.69 7.32C17.1 7.73 17.1 8.4 16.69 8.8L11.52 13.94L10.75 14.69C10.34 15.1 9.67 15.1 9.26 14.69L8.5 13.94L6.3 11.76C5.9 11.36 5.9 10.69 6.31 10.28L6.33 10.27C6.74 9.86 7.4 9.86 7.81 10.26L10.01 12.44L15.18 7.3Z',
  ]),

  TASKS: List([
    'M7,0h18v4h-18zM7,8h18v4h-18zM7,16h18v4h-18zM0,0h4v4h-4zM0,8h4v4h-4zM0,16h4v4h-4z',
  ]),

  TIME_LINE: List([
    'M3 0h2v2.13C6.73 2.57 8 4.14 8 6c0 1.86-1.27 3.43-3 3.87v4.25c1.73.44 3 2.01 3 3.87 0 1.86-1.27 3.43-3 3.87v2.13H3v-2.13c-1.73-.44-3-2.01-3-3.87 0-1.86 1.27-3.43 3-3.87V9.87C1.27 9.43 0 7.86 0 6c0-1.86 1.27-3.43 3-3.87zm1 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM4 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0h18v4H12zm18 16H12v-4h18z',
  ]),

  TRASH: List([
    'M22.35,4.22c0,0.39 -0.3,0.69 -0.69,0.69h-1.29l-0.88,18.06c-0.05,1.27 -1.07,2.26 -2.34,2.26h-11.79c-1.26,0 -2.28,-0.99 -2.34,-2.26l-0.85,-18.06h-1.29c-0.38,0 -0.69,-0.3 -0.69,-0.69c0,-0.39 0.3,-0.69 0.69,-0.69h5.66v-1.6c0,-0.99 0.8,-1.79 1.79,-1.79h5.88c0.99,0 1.79,0.8 1.79,1.79v1.6h5.66c0.38,0 0.69,0.3 0.69,0.69zM7.92,1.93v1.6h6.74v-1.6c0,-0.22 -0.19,-0.41 -0.41,-0.41h-5.91c-0.25,0 -0.41,0.19 -0.41,0.41zM19,4.91h-15.45l0.85,18c0.03,0.52 0.44,0.94 0.96,0.94h11.82c0.52,0 0.93,-0.41 0.96,-0.94z',
    'M11.27,8.77c-0.38,0 -0.69,0.3 -0.69,0.69v9.65c0,0.39 0.3,0.69 0.69,0.69c0.38,0 0.69,-0.3 0.69,-0.69v-9.65c0,-0.36 -0.3,-0.69 -0.69,-0.69z',
    'M8.03,8.96c-0.14,-0.14 -0.3,-0.19 -0.49,-0.19v0.14v-0.14c-0.19,0 -0.36,0.08 -0.47,0.22c-0.14,0.14 -0.19,0.3 -0.19,0.5l0.33,9.65c0,0.39 0.33,0.66 0.71,0.66v0c0.19,0 0.36,-0.08 0.47,-0.22c0.14,-0.14 0.19,-0.3 0.19,-0.5l-0.33,-9.65c0,-0.17 -0.08,-0.36 -0.22,-0.47z',
    'M15.01,8.77v0.14v-0.14c-0.38,0 -0.69,0.28 -0.71,0.66l-0.33,9.65c0,0.19 0.05,0.36 0.19,0.5c0.14,0.14 0.3,0.22 0.49,0.22c0.38,0 0.69,-0.3 0.69,-0.66l0.33,-9.65c0,-0.19 -0.05,-0.36 -0.19,-0.5c-0.11,-0.14 -0.27,-0.19 -0.47,-0.22z',
  ]),

  TRIANGLE: List(['M5.5 5L0 0h11z']),

  UNIMPORTANT: List([
    'M9 0a9 9 0 019 9c-.01 4.97-4.03 9-9 9A9 9 0 019 0zm0 17c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z',
    'M9.12 14.34c-.6 0-1.09-.49-1.09-1.1a1.095 1.095 0 112.19 0c0 .61-.49 1.1-1.1 1.1z',
    'M9.98 10.12l.82-5.02c0-2.01-3.34-2.01-3.34 0l.83 5.02c0 .22.09.43.25.59.15.16.37.25.59.25.47 0 .85-.38.85-.84z',
  ]),
}
