/**
 * Letter copy, taken verbatim from the design reference. Edit here; the
 * bracketed captions are the design's placeholders until real ones are written.
 */
export const LETTER = {
  greeting: 'To My Everything,',
  intro: 'On your special day, I just want to remind you how much you mean to me.',
  caption1: '[PHOTO CAPTION — e.g. My favorite place is with you]',
  main: {
    eyebrow: 'A letter for you',
    title: 'Happy Birthday, my love',
    paragraphs: [
      'Today is a celebration of you — your kindness, your strength, your big heart, and all the little things that make you, you.',
      'I feel so lucky to walk through life with you. You make the ordinary moments feel special, and the hard days a little easier.',
      'I hope this year brings you the same warmth, courage, and happiness you give to the people around you. I will always be cheering for you.',
    ],
    sign: ['Always,', 'Me'],
  },
  caption2: '[PHOTO CAPTION — a place, date, or private joke]',
  moments: {
    eyebrow: 'Our little moments',
    title: 'The moments I treasure',
    body: 'I still remember the first time we met, and how everything just felt right. Since then, every moment with you has been a gift — big or small.',
  },
  know: {
    eyebrow: 'Something I want you to know',
    title: 'You make life so much brighter',
    body: 'You have this beautiful way of making the people around you feel seen, loved, and important. I admire your courage, your dreams, and the way you keep showing up — even when it is hard.',
  },
  caption3: '[PHOTO CAPTION — what this memory means to you]',
  closing: {
    title: 'Until our next chapter…',
    body: 'Thank you for being you. I’m so grateful for every memory, every laugh, and every dream we get to share. Happy birthday, my love. Here’s to more adventures, more memories, and a lifetime together.',
    sign: ['With all my heart,', 'Me'],
  },
  caption4: '[FINAL PHOTO — choose your favorite together]',
  end: { title: 'Thank you for being you.', sub: 'Today, tomorrow, and always.' },
} as const;
