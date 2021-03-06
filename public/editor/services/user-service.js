'use strict';
/** The User Service
 *  Deals with the user object & Draft claims
 */

angular.module('Editor')
.factory('userService',['$http', '$rootScope',
	function($http, $rootScope){
		var service = {
			getCurrentUserLists: function(){
				
				/** getCurrentUserLists
				 * asks the server for the claims / drafts / trash created by the user
				 * Sets them on the $rootScope
				 */
				return $http.get('/user/myWork').success(function(data, status, headers, config) {

					$rootScope.user.meta.unPublished = data.drafts;
					$rootScope.user.meta.published = data.published;
					$rootScope.user.meta.trashed = data.trashed;

				}).error(function(data, status, headers, config) {
					console.log('Getting current user lists failed.');
				});

			},
			getDraftClaim: function(draftClaim){

				/*
				 * for when a user decides to get into editing one of their drafts, 
				 * this service deals with getting all the supporting / opposing reasons (claims)
				 * specific to that draft
				 */
				return $http.post('/draft-claim/get-draft', {'draftClaim':draftClaim}).success(function(data, status, headers, config) {
					service.myData = data;
				}).error(function(data, status, headers, config) {
					console.log('Getting draft claim data failed - http request error in the service');
				});

			}
		};
		return service;
	}]
);