import {animate, state, style, transition, trigger} from "@angular/animations";

type Direction = 'ltr' | 'rtl';

export interface AnimationDomContext {
  window?: Pick<Window, 'getComputedStyle'>;
  document?: Pick<Document, 'documentElement' | 'body'>;
}

export const resolveDirection = (context?: AnimationDomContext): Direction => {
  const win = context?.window ?? (typeof window !== 'undefined' ? window : undefined);
  const doc = context?.document ?? (typeof document !== 'undefined' ? document : undefined);

  if (win?.getComputedStyle && doc?.documentElement) {
    try {
      const computedDirection = win.getComputedStyle(doc.documentElement).direction;

      if (computedDirection === 'rtl') {
        return 'rtl';
      }

      if (computedDirection === 'ltr') {
        return 'ltr';
      }
    } catch {
      // Ignored – fall back to attribute lookup/default direction.
    }
  }

  const attributeDirection =
    doc?.documentElement?.getAttribute?.('dir') ??
    doc?.body?.getAttribute?.('dir');

  return attributeDirection === 'rtl' ? 'rtl' : 'ltr';
};

export const animations = (context?: AnimationDomContext) => {
  const isRtl = resolveDirection(context) === 'rtl';
  const val1 = isRtl ? ['-100%', '0%'] : ['100%', '0%'];
  const val2 = isRtl ? ['100%', '0%'] : ['-100%', '0%'];
  return [

    trigger('slideInOut', [
      /*    state('in', style({
            transform: 'translateX(0)'
          })),
          state('out', style({
            transform: 'translateX(-100%)',
            display: 'none'
          })),*/
      transition(':enter', [
        style({ transform: `translateX(${val1[0]})` }),
        animate('150ms ease-in-out', style({ transform: `translateX(${val1[1]})` }))
      ]),
      transition(':leave', [
        animate('150ms ease-in-out', style({ transform: `translateX(${val1[0]})` }))
      ]),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ]),

    trigger('slideInOutStart', [
      // state('in', style({
      //   transform: 'translateX(0)'
      // })),
      // state('out', style({
      //   transform: 'translateX(100%)',
      //   display: 'none'
      // })),
      transition(':enter', [
        style({ transform: `translateX(${val2[0]})` }),
        animate('150ms ease-in-out', style({ transform: `translateX(${val2[1]})` }))
      ]),
      transition(':leave', [
        animate('150ms ease-in-out', style({ transform: `translateX(${val2[0]})` }))
      ]),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ]),





    trigger('show', [
      state('in', style({
        opacity: '1'
      })),
      state('out', style({
        opacity: '0',
        display: 'none'
      })),
      transition('in => out', animate('200ms ease-out')),
      transition('out => in', animate('200ms ease-in'))
    ]),
    trigger('remove', [
      state('in', style({})),
      state('out', style({
        display: 'none'
      })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ])

  ];
};

