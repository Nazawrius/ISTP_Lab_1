public with sharing class MovieController {
    @AuraEnabled(cacheable=true)
    public static List<Movie__c> getMovies(){
        return [
            SELECT Id, Name, Length__c, Release_Date__c, Synopsis__c, Box_Office__c, Budget__c
            FROM Movie__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }

    @AuraEnabled
    public static void deleteMovie(Id movieId) {
        Movie__c movie = [SELECT Id FROM Movie__c WHERE Id = :movieId];
        delete movie;
    }
}
