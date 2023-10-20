import {
  Achievement,
  AchievementContract,
  AchievementReward,
  GroupCreated,
  Member
} from "../generated/schema";
import {
  AchievementAdded,
  AchievementContractCreated,
  AchievementRewarded,
  GroupUpdated,
  MemberCreated
} from "../generated/templates/GroupToken/GroupToken";

  
  export function handleAchievementAdded(event: AchievementAdded): void {
    let group = GroupCreated.load(event.address.toHex())
    if (group == null) return;
    
    let achievement = new Achievement(event.params.achievementId.toHex())
    achievement.group = group.id
    achievement.description = event.params.description
    achievement.locked = event.params.locked
    achievement.save()
  }
  
  export function handleMemberCreated(event: MemberCreated): void {
    let group = GroupCreated.load(event.address.toHex())
    if (group == null) return;
    
    let member = new Member(event.params.member.toHex())
    member.group = group.id
    member.address = event.params.member
    member.tokenboundAccount = event.params.tokenboundAccount
    member.save()
  }
  
  export function handleGroupUpdated(event: GroupUpdated): void {
    let group = GroupCreated.load(event.address.toHex())
    if (group != null) {
      group.name = event.params.name.toString()
      group.image = event.params.image.toString()
      group.details = event.params.details.toString()
      group.save()
    }
  }
  
  export function handleAchievementContractCreated(event: AchievementContractCreated): void {
    let group = GroupCreated.load(event.address.toHex())
    if (group == null) return;
    
    let achievementContract = new AchievementContract(event.params.achievementContract.toHex())
    achievementContract.group = group.id
    achievementContract.creationTime = event.params.creationTime
    achievementContract.save()
  }
  
  export function handleAchievementRewarded(event: AchievementRewarded): void {
    let member = Member.load(event.params.member.toHex())
    if (member == null) return;
    
    let achievement = Achievement.load(event.params.achievementId.toHex())
    if(achievement == null) return;
    
    let reward = new AchievementReward(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
    reward.member = member.id
    reward.achievementId = event.params.achievementId
    reward.achievement = achievement.id
    reward.amount = event.params.amount
    reward.save()
  }
  
/*   export function handleAchievementBatchRewarded(event: AchievementBatchRewarded): void {
    let member = Member.load(event.params.member.toHex())
    if (member == null) return;
  
    let reward = new AchievementBatchReward(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
    reward.member = member.id
    reward.achievementIds = event.params.achievementIds
    reward.amounts = event.params.amounts
    reward.save()
  } */
  
  