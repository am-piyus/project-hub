// Engineering profile — the creator behind the published work (Droplet 0.1.4.5).
//
// Deliberately modeled as DATA separate from the page template: this is the seed of
// the future profile system (user accounts → public profiles → creator portfolios,
// see docs/Project_Hub_Vision_Log.md §10). A future multi-user platform turns this
// single record into a collection; the portfolio template stays the same.

export interface EngineeringProfile {
  name: string;
  headline: string;
  mission: string;
  disciplines: string[];
  /** What is actively being explored — shown as the current focus. */
  exploring: string[];
  links: Array<{ label: string; url: string }>;
}

export const siteProfile: EngineeringProfile = {
  name: 'Piyus Patra',
  headline: 'Engineer — building, debugging, and documenting the path.',
  mission:
    'I build engineering projects, document them properly — including the failures, ' +
    'root causes, and fixes — and publish the lessons learned so they survive beyond ' +
    'the build. Project Hub is that public engineering notebook.',
  disciplines: [
    'Robotics',
    'Embedded Systems',
    'Electronics',
    'Mechatronics',
    'Engineering Learning',
    'Documentation Systems',
  ],
  exploring: ['STM32 dual-core development', 'Model-based design', 'Knowledge publishing'],
  links: [{ label: 'GitHub', url: 'https://github.com/am-piyus/project-hub' }],
};
