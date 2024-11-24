/**
 * Timinig chart
 * 
 *                  0  .  1  .  2  .  3  .  4  .  5  .  6  .  7  .  8  .  9  .  10  .  11  .  12  .  13  .  14  .  15
 * 
 * Page loaded:     1
 * 
 * Layout shown:    0  1
 * 
 * Title shown:     0     1
 * 
 * Switch content:  1                                            1                                           1
 * 
 * Center text:     H        I          (V)          O          (H) I           (V)            O            (H)
 * 
 * Button:          H                 I (V)                   O (H)          I  (V)                      O  (H)
 * 
 * Button enabled:  F                 T                          F           T                               F
 */
const TIMINGS = {
  init: [
    { name: 'PAGE_LOADED', duration: 0, tillNext: 500 },
    { name: 'LAYOUT_VISIBLE', duration: 500, tillNext: 500 },
    { name: 'TITLE_VISIBLE', duration: 1000, tillNext: 500 },
  ],
  loop: [
    { name: 'CENTER_TEXT_FADE_IN', duration: 2000, tillNext: 1500 },
    { name: 'BUTTON_FADE_IN', duration: 500, tillNext: 0 },
    { name: 'BUTTON_ENABLED', duration: 0, tillNext: 2500 },
    { name: 'CENTER_TEXT_FADE_OUT', duration: 2000, tillNext: 1500 },
    { name: 'BUTTON_FADE_OUT', duration: 500, tillNext: 500 },
    { name: 'BUTTON_DISABLED', duration: 0, tillNext: 0 },
    { name: 'SWITCH_CONTENT', duration: 0, tillNext: 500 },
  ]
} as const
export default TIMINGS
