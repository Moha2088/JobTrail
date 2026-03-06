import React from 'react'
import { ApplicationTable } from '@/components/ui/view/applications/ApplicationTable'
import { NextRouter } from "next/router"
import { MockRouter } from "../../fixtures/mockRouter"
import { TableRow } from "@/components/ui/table"

describe('<ApplicationTable />', () => {

    before((() => {
        cy.mount(
            <MockRouter asPath="../../src/components/ui/view/applications/ApplicationTable">
                <ApplicationTable />
            </MockRouter>
        )
    }))

    it("should have appropriate caption text when no applications exist'", () => {
        cy.get("caption").should("have.text", "You have no applications. Click the button to create one")
    })
})