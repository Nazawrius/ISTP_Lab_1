public with sharing class ActorController {
    @AuraEnabled(cacheable=true)
    public static List<Actor__c> getActors(){
        return [
            SELECT Id, Name, Gender__c, Birth_Date__c, Birth_Place__c, Biography__c
            FROM Actor__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }

    @AuraEnabled
    public static void deleteActor(Id actorId) {
        Actor__c actor = [SELECT Id FROM Actor__c WHERE Id = :actorId];
        delete actor;
    }
}