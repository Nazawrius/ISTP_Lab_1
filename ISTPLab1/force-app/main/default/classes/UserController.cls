public with sharing class UserController {
    @AuraEnabled(cacheable=true)
    public static List<User__c> getUsers(){
        return [
            SELECT Id, Name, Gender__c, Email__c, Age__c
            FROM User__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }

    @AuraEnabled
    public static void deleteUser(Id userId) {
        User__c user = [SELECT Id FROM User__c WHERE Id = :userId];
        delete user;
    }
}