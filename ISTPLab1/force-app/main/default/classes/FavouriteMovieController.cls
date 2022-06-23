public with sharing class FavouriteMovieController {
    @AuraEnabled(cacheable=true)
    public static List<Favourite_Movie__c> getFavouriteMovies(){
        return [
            SELECT Id, Movie__c, User__c
            FROM Favourite_Movie__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }

    @AuraEnabled
    public static void deleteFavouriteMovie(Id favouriteMovieId) {
        Favourite_Movie__c favouriteMovie = [SELECT Id FROM Favourite_Movie__c WHERE Id = :favouriteMovieId];
        delete favouriteMovie;
    }
}