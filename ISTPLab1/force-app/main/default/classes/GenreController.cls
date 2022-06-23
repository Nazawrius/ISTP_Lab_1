public with sharing class GenreController {
    @AuraEnabled(cacheable=true)
    public static List<Genre__c> getGenres(){
        return [
            SELECT Id, Name, Year_Of_Creation__c, Description__c
            FROM Genre__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }

    @AuraEnabled
    public static void deleteGenre(Id genreId) {
        Genre__c genre = [SELECT Id FROM Genre__c WHERE Id = :genreId];
        delete genre;
    }
}