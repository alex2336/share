app
	.factory("BillService", ['UserService',
		function(UserService) {
			var Bill = Parse.Object.extend('Bill'):
			return {
				createBill : function onCreateBill(options){
					var bill = new Bill();
					var currentUser = UserService.getCurrent();
					for(var key in options){
						bill.set(key,options[key]);
					}
					return Bill.save();
				},
				editBill : function onEditBill(bill, options){
					for(var key in options){
						bill.set(key,options[key]);
					}
					return bill.save();
				},
				deleteBill : function onDelete(bill){
					return bill.destroy();
				}
			}
			
	}]);