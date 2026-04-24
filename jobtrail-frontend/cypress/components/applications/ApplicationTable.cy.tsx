import React from 'react'
import { ApplicationTable } from '@/components/ui/view/applications/ApplicationTable'
import { MockRouter } from "../../fixtures/mockRouter"
import { ReactQueryClientProvider } from '@/providers/PersistQueryClientProvider'
import { TestProviders } from '../../fixtures/TestProviders'

describe('<ApplicationTable />', () => {

    before((() => {
        cy.mount(
            <TestProviders>
                <ApplicationTable />
            </TestProviders>
            
        )
    }))

    it("should have appropriate caption text when no applications exist'", () => {
        cy.get("caption").should("have.text", "You have no applications. Click the button to create one")
    })
})