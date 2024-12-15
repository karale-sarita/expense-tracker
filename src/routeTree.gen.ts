/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LandingImport } from './routes/landing'
import { Route as HomeImport } from './routes/home'
import { Route as ExpenseImport } from './routes/expense'
import { Route as AuthImport } from './routes/auth'
import { Route as IndexImport } from './routes/index'
import { Route as HomeDashboardImport } from './routes/home/dashboard'
import { Route as ExpenseOutputImport } from './routes/expense/output'
import { Route as ExpenseDashboardImport } from './routes/expense/dashboard'
import { Route as AuthRegisterIndexImport } from './routes/auth/register/index'
import { Route as AuthLoginIndexImport } from './routes/auth/login/index'
import { Route as AuthCallbackIndexImport } from './routes/auth/callback/index'

// Create/Update Routes

const LandingRoute = LandingImport.update({
  path: '/landing',
  getParentRoute: () => rootRoute,
} as any)

const HomeRoute = HomeImport.update({
  path: '/home',
  getParentRoute: () => rootRoute,
} as any)

const ExpenseRoute = ExpenseImport.update({
  path: '/expense',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const HomeDashboardRoute = HomeDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => HomeRoute,
} as any)

const ExpenseOutputRoute = ExpenseOutputImport.update({
  path: '/output',
  getParentRoute: () => ExpenseRoute,
} as any)

const ExpenseDashboardRoute = ExpenseDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => ExpenseRoute,
} as any)

const AuthRegisterIndexRoute = AuthRegisterIndexImport.update({
  path: '/register/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  path: '/login/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthCallbackIndexRoute = AuthCallbackIndexImport.update({
  path: '/callback/',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/expense': {
      id: '/expense'
      path: '/expense'
      fullPath: '/expense'
      preLoaderRoute: typeof ExpenseImport
      parentRoute: typeof rootRoute
    }
    '/home': {
      id: '/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeImport
      parentRoute: typeof rootRoute
    }
    '/landing': {
      id: '/landing'
      path: '/landing'
      fullPath: '/landing'
      preLoaderRoute: typeof LandingImport
      parentRoute: typeof rootRoute
    }
    '/expense/dashboard': {
      id: '/expense/dashboard'
      path: '/dashboard'
      fullPath: '/expense/dashboard'
      preLoaderRoute: typeof ExpenseDashboardImport
      parentRoute: typeof ExpenseImport
    }
    '/expense/output': {
      id: '/expense/output'
      path: '/output'
      fullPath: '/expense/output'
      preLoaderRoute: typeof ExpenseOutputImport
      parentRoute: typeof ExpenseImport
    }
    '/home/dashboard': {
      id: '/home/dashboard'
      path: '/dashboard'
      fullPath: '/home/dashboard'
      preLoaderRoute: typeof HomeDashboardImport
      parentRoute: typeof HomeImport
    }
    '/auth/callback/': {
      id: '/auth/callback/'
      path: '/callback'
      fullPath: '/auth/callback'
      preLoaderRoute: typeof AuthCallbackIndexImport
      parentRoute: typeof AuthImport
    }
    '/auth/login/': {
      id: '/auth/login/'
      path: '/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginIndexImport
      parentRoute: typeof AuthImport
    }
    '/auth/register/': {
      id: '/auth/register/'
      path: '/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterIndexImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRoute: AuthRoute.addChildren({
    AuthCallbackIndexRoute,
    AuthLoginIndexRoute,
    AuthRegisterIndexRoute,
  }),
  ExpenseRoute: ExpenseRoute.addChildren({
    ExpenseDashboardRoute,
    ExpenseOutputRoute,
  }),
  HomeRoute: HomeRoute.addChildren({ HomeDashboardRoute }),
  LandingRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth",
        "/expense",
        "/home",
        "/landing"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth": {
      "filePath": "auth.tsx",
      "children": [
        "/auth/callback/",
        "/auth/login/",
        "/auth/register/"
      ]
    },
    "/expense": {
      "filePath": "expense.tsx",
      "children": [
        "/expense/dashboard",
        "/expense/output"
      ]
    },
    "/home": {
      "filePath": "home.tsx",
      "children": [
        "/home/dashboard"
      ]
    },
    "/landing": {
      "filePath": "landing.tsx"
    },
    "/expense/dashboard": {
      "filePath": "expense/dashboard.tsx",
      "parent": "/expense"
    },
    "/expense/output": {
      "filePath": "expense/output.tsx",
      "parent": "/expense"
    },
    "/home/dashboard": {
      "filePath": "home/dashboard.tsx",
      "parent": "/home"
    },
    "/auth/callback/": {
      "filePath": "auth/callback/index.tsx",
      "parent": "/auth"
    },
    "/auth/login/": {
      "filePath": "auth/login/index.tsx",
      "parent": "/auth"
    },
    "/auth/register/": {
      "filePath": "auth/register/index.tsx",
      "parent": "/auth"
    }
  }
}
ROUTE_MANIFEST_END */
