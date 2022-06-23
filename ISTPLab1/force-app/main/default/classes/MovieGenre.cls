public with sharing class MovieGenreController {
    @AuraEnabled(cacheable=true)
    public static List<Movie_Genre__c> getMovieGenres(){
        return [
            SELECT Id, Movie__c, Genre__c
            FROM Movie_Genre__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }

    @AuraEnabled
    public static void deleteMovieGenre(Id userId) {
        Movie_Genre__c user = [SELECT Id FROM Movie_Genre__c WHERE Id = :userId];
        delete user;
    }
}