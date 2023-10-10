import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CompanyAccepted } from "../generated/schema"
import { CompanyAccepted as CompanyAcceptedEvent } from "../generated/GroupRegistry/GroupRegistry"
import { handleCompanyAccepted } from "../src/group-registry"
import { createCompanyAcceptedEvent } from "./group-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let accepted = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let company = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newCompanyAcceptedEvent = createCompanyAcceptedEvent(accepted, company)
    handleCompanyAccepted(newCompanyAcceptedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CompanyAccepted created and stored", () => {
    assert.entityCount("CompanyAccepted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CompanyAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "accepted",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CompanyAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "company",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
