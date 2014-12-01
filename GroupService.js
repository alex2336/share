app
	.factory("GroupService", ['UserService',
		function(UserService) {
			var Group = Parse.Object.extend('Group'):
			return {
				createGroup : function onCreateGroup(groupName){
					var group = new Group();
					var currentUser = UserService.getCurrent();
					group.set('createdBy', currentUser);
					group.set('name', groupName);
					group.set('leader', currentUser);
					return group.save();
				},
				inviteToGroup : function onInviteToGroup(user){

				},
				requestToJoinGroup : function onRequestToJoinGroup(group){

				},
				renameGroup : function onRenameGroup(group, newGroupName){
					group.set('name',newGroupName);
					return group.save();
				}
			}
			
	}]);