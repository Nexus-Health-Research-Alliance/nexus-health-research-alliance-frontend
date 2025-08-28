import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    title: 'Nexus Health Research Alliance',
    loadComponent: () => import('./presentations/pages/home/home').then((m) => m.Home),
  },
  {
    path: 'who-we-are',
    title: 'Who We Are - Nexus Health Research Alliance',
    loadComponent: () =>
      import('./presentations/pages/who-we-are/who-we-are').then((m) => m.WhoWeAre),
  },
  {
    path: 'what-we-do',
    title: 'What We Do - Nexus Health Research Alliance',
    loadComponent: () =>
      import('./presentations/pages/what-we-do/what-we-do').then((m) => m.WhatWeDo),
  },
  {
    path: 'projects',
    title: 'Projects - Nexus Health Research Alliance',
    loadComponent: () => import('./presentations/pages/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'contact-us',
    title: 'Contact Us - Nexus Health Research Alliance',
    loadComponent: () =>
      import('./presentations/pages/contact-us/contact-us').then((m) => m.ContactUs),
  },
  {
    path: '**',
    title: 'Page Not Found - Nexus Health Research Alliance',
    loadComponent: () =>
      import('./presentations/pages/not-found/not-found').then((m) => m.NotFound),
  },
]
