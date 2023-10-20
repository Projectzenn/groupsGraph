import {
  GroupCreated as GroupCreatedEvent
} from "../generated/GroupRegistry/GroupRegistry"
import {
  GroupCreated
} from "../generated/schema"

import { GroupToken } from '../generated/templates'


export function handleGroupCreated(event: GroupCreatedEvent): void {
  let entity = new GroupCreated(
    event.params.addr.toHex())
    entity.id = event.params.addr.toHex()
  entity.name = event.params.name
  entity.image = event.params.image
  entity.details = event.params.details
  entity.creator = event.params.creator
  entity.addr = event.params.addr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  
  GroupToken.create(event.params.addr)
}

