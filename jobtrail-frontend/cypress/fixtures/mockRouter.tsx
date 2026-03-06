import { NextRouter } from "next/router"
import { ReactNode } from "react"
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime"


const createRouter = (params: Partial<NextRouter>) => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    defaultLocale: 'en',
    domainLocales: [],
    isLocaleDomain: false,
    push: cy.spy().as('push'),
    replace: cy.spy().as('replace'),
    reload: cy.spy().as('reload'),
    back: cy.spy().as('back'),
    forward: cy.spy().as('forward'),
    prefetch: cy.stub().as('prefetch').resolves(),
    beforePopState: cy.spy().as('beforePopState'),
    events: {
        emit: cy.spy().as('emit'),
        off: cy.spy().as('off'),
        on: cy.spy().as('on'),
    },
    isFallback: false,
    isReady: true,
    isPreview: false,
    ...params
})

interface MockRouterProps extends Partial<NextRouter> {
    children: ReactNode
}

export function MockRouter (props: MockRouterProps) {
    const { children, ...rest } = props

    const router = createRouter(rest)
    
    return (
        <AppRouterContext.Provider value={router}>
            {children}
        </AppRouterContext.Provider>
    )
}