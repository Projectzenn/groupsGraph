import { Bytes, json } from "@graphprotocol/graph-ts";
import {
  Achievement,
  AchievementContract,
  AchievementReward,
  Attribute,
  Developer,
  GroupCreated,
  Level,
  Member,
  NFTMetadata,
  Properties,
} from "../generated/schema";
import { TokenMetadata } from "../generated/templates";
import {
  AchievementAdded,
  AchievementContractCreated,
  AchievementRewarded,
  GroupUpdated,
  MemberCreated,
} from "../generated/templates/GroupToken/GroupToken";

export function handleAchievementAdded(event: AchievementAdded): void {
  let group = GroupCreated.load(event.address.toHex());
  if (group == null) return;

  let achievement = new Achievement(event.params.achievementId.toHex());
  achievement.group = group.id;
  achievement.description = event.params.description;
  achievement.locked = event.params.locked;

  TokenMetadata.create(event.params.description);
  achievement.save();
}
export function handleMetadata(content: Bytes): void {
  let metadata = new NFTMetadata(content.toString());

  const data = json.fromBytes(content).toObject();
  
  if (data) {
    
    metadata.id = content.toString();
    let nameValue = data.get("name");
    metadata.name = nameValue ? nameValue.toString() : "";

    let descValue = data.get("description");
    metadata.description = descValue ? descValue.toString() : "";

    let imgValue = data.get("image");
    metadata.image = imgValue ? imgValue.toString() : "";

    let extUrlValue = data.get("externalUrl");
    metadata.externalUrl = extUrlValue ? extUrlValue.toString() : "";

    let animUrlValue = data.get("animationUrl");
    metadata.animationUrl = animUrlValue ? animUrlValue.toString() : "";

    let ytUrlValue = data.get("youtubeUrl");
    metadata.youtubeUrl = ytUrlValue ? ytUrlValue.toString() : "";

    let bgColorValue = data.get("backgroundColor");
    metadata.backgroundColor = bgColorValue ? bgColorValue.toString() : "";

    let createdDateValue = data.get("createdDate");
    metadata.createdDate = createdDateValue ? createdDateValue.toString() : "unknown";

    let categoryValue = data.get("category");
    metadata.category = categoryValue ? categoryValue.toString() : "no category";

    let attributes: string[] = [];
    let dataAttributes = data.get("attributes");
    if (dataAttributes && dataAttributes.kind == 2) {
      let dataArray = dataAttributes.toArray();
      for (let i = 0; i < dataArray.length; i++) {
        let attribute = new Attribute(content.toHex() + "-" + i.toString());
        let attributeData = dataArray[i].toObject();
        if (attributeData) {
          let traitValue = attributeData.get("traitType");
          attribute.traitType = traitValue ? traitValue.toString() : "trait_type";

          let valueValue = attributeData.get("value");
          attribute.value = valueValue ? valueValue.toString() : "no_value";

          attribute.save();
          attributes.push(attribute.id);
        }
      }
    }
    metadata.attributes = attributes;

    let propertiesData = data.get("properties");
    if (propertiesData && propertiesData.kind == 3) {
      let propertiesObj = propertiesData.toObject();
      let properties = new Properties(content.toHex() + "-properties");
      let levelValue = propertiesObj.get("level");
      properties.level = levelValue ? levelValue.toString() : "";

      let typeValue = propertiesObj.get("type");
      properties.type = typeValue ? typeValue.toString() : "";

      properties.save();
      metadata.properties = properties.id;
    }

    let levels: string[] = [];
    let dataLevels = data.get("levels");
    if (dataLevels && dataLevels.kind == 2) {
      let levelArray = dataLevels.toArray();
      for (let i = 0; i < levelArray.length; i++) {
        let level = new Level(content.toHex() + "-level-" + i.toString());
        let levelData = levelArray[i].toObject();
        if (levelData) {
          let levelValue = levelData.get("level");

          level.level = 0;

          let nameValue = levelData.get("name");
          level.name = nameValue ? nameValue.toString() : "no_name";

          level.save();
          levels.push(level.id);
        }
      }
    }
    metadata.levels = levels;

    let developerData = data.get("developer");
    if (developerData && developerData.kind == 3) {
      let developerObj = developerData.toObject();
      let developer = new Developer(content.toHex() + "-developer");
      let projectValue = developerObj.get("project");
      developer.project = projectValue ? projectValue.toString() : "";

      let versionValue = developerObj.get("version");
      developer.version = versionValue ? versionValue.toString() : "";

      developer.save();
      metadata.developer = developer.id;
    }

    metadata.save();
  }
}


export function handleMemberCreated(event: MemberCreated): void {
  let group = GroupCreated.load(event.address.toHex());
  if (group == null) return;

  let member = new Member(event.params.member.toHex());
  member.group = group.id;
  member.address = event.params.member;
  member.tokenboundAccount = event.params.tokenboundAccount;
  member.save();
}

export function handleGroupUpdated(event: GroupUpdated): void {
  let group = GroupCreated.load(event.address.toHex());
  if (group != null) {
    group.name = event.params.name.toString();
    group.image = event.params.image.toString();
    group.details = event.params.details.toString();
    group.save();
  }
}

export function handleAchievementContractCreated(
  event: AchievementContractCreated
): void {
  let group = GroupCreated.load(event.address.toHex());
  if (group == null) return;

  let achievementContract = new AchievementContract(
    event.params.achievementContract.toHex()
  );
  achievementContract.group = group.id;
  achievementContract.creationTime = event.params.creationTime;
  achievementContract.save();
}

export function handleAchievementRewarded(event: AchievementRewarded): void {
  let member = Member.load(event.params.member.toHex());
  if (member == null) return;

  let achievement = Achievement.load(event.params.achievementId.toHex());
  if (achievement == null) return;

  let reward = new AchievementReward(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  reward.member = member.id;
  reward.achievementId = event.params.achievementId;
  reward.achievement = achievement.id;
  reward.amount = event.params.amount;
  reward.save();
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

