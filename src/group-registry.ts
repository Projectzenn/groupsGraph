import {
  CompanyAccepted as CompanyAcceptedEvent,
  CompanyRejected as CompanyRejectedEvent,
  CompanyRemoved as CompanyRemovedEvent,
  GroupCreated as GroupCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/GroupRegistry/GroupRegistry"
import {
  CompanyAccepted,
  CompanyRejected,
  CompanyRemoved,
  GroupCreated,
  OwnershipTransferred
} from "../generated/schema"

export function handleCompanyAccepted(event: CompanyAcceptedEvent): void {
  let entity = new CompanyAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accepted = event.params.accepted
  entity.company = event.params.company

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCompanyRejected(event: CompanyRejectedEvent): void {
  let entity = new CompanyRejected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.companyId = event.params.companyId
  entity.name = event.params.name

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCompanyRemoved(event: CompanyRemovedEvent): void {
  let entity = new CompanyRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.companyId = event.params.companyId
  entity.company = event.params.company
  entity.remover = event.params.remover

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGroupCreated(event: GroupCreatedEvent): void {
  let entity = new GroupCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.companyId = event.params.companyId
  entity.name = event.params.name
  entity.image = event.params.image
  entity.details = event.params.details
  entity.creator = event.params.creator
  entity.addr = event.params.addr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
