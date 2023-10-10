import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CompanyAccepted,
  CompanyRejected,
  CompanyRemoved,
  GroupCreated,
  OwnershipTransferred
} from "../generated/GroupRegistry/GroupRegistry"

export function createCompanyAcceptedEvent(
  accepted: Address,
  company: Address
): CompanyAccepted {
  let companyAcceptedEvent = changetype<CompanyAccepted>(newMockEvent())

  companyAcceptedEvent.parameters = new Array()

  companyAcceptedEvent.parameters.push(
    new ethereum.EventParam("accepted", ethereum.Value.fromAddress(accepted))
  )
  companyAcceptedEvent.parameters.push(
    new ethereum.EventParam("company", ethereum.Value.fromAddress(company))
  )

  return companyAcceptedEvent
}

export function createCompanyRejectedEvent(
  companyId: BigInt,
  name: string
): CompanyRejected {
  let companyRejectedEvent = changetype<CompanyRejected>(newMockEvent())

  companyRejectedEvent.parameters = new Array()

  companyRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "companyId",
      ethereum.Value.fromUnsignedBigInt(companyId)
    )
  )
  companyRejectedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return companyRejectedEvent
}

export function createCompanyRemovedEvent(
  companyId: BigInt,
  company: Address,
  remover: Address
): CompanyRemoved {
  let companyRemovedEvent = changetype<CompanyRemoved>(newMockEvent())

  companyRemovedEvent.parameters = new Array()

  companyRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "companyId",
      ethereum.Value.fromUnsignedBigInt(companyId)
    )
  )
  companyRemovedEvent.parameters.push(
    new ethereum.EventParam("company", ethereum.Value.fromAddress(company))
  )
  companyRemovedEvent.parameters.push(
    new ethereum.EventParam("remover", ethereum.Value.fromAddress(remover))
  )

  return companyRemovedEvent
}

export function createGroupCreatedEvent(
  companyId: BigInt,
  name: string,
  image: string,
  details: string,
  creator: Address,
  addr: Address
): GroupCreated {
  let groupCreatedEvent = changetype<GroupCreated>(newMockEvent())

  groupCreatedEvent.parameters = new Array()

  groupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "companyId",
      ethereum.Value.fromUnsignedBigInt(companyId)
    )
  )
  groupCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  groupCreatedEvent.parameters.push(
    new ethereum.EventParam("image", ethereum.Value.fromString(image))
  )
  groupCreatedEvent.parameters.push(
    new ethereum.EventParam("details", ethereum.Value.fromString(details))
  )
  groupCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  groupCreatedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )

  return groupCreatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
