public with sharing class MovieContractController {
    @AuraEnabled(cacheable=true)
    public static List<Movie_Contract__c> getMovieContracts(){
        return [
            SELECT Id, Movie__c, Actor__c, Role__c
            FROM Movie_Contract__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }

    @AuraEnabled
    public static void deleteMovieContract(Id movieContractId) {
        Movie_Contract__c movieContract = [SELECT Id FROM Movie_Contract__c WHERE Id = :movieContractId];
        delete movieContract;
    }
}