describe("a hamhock", function(){

	it("is makes things better", function(){

		expect(true).toBeTruthy();

	});

	describe("the isDirty flag", function(){

		beforeEach(function(){

			vm = {
				one:ko.observable("one"),
				two:ko.observable(2),
				three:{
					alpha:ko.observable("alpha"),
					beta:ko.observable("beta")
				}
			};

			ko.hamhock({root: vm});

		});

		it("gives a viewmodel an isDirty flag", function(){

			expect(vm.hamhock.isDirty).toBeTruthy();

		});

		it("is not dirty when properties don't change", function(){

			expect(vm.hamhock.isDirty()).toEqual(false);

		});

		it("is dirty when properties change", function(){

			vm.one("two");

			expect(vm.hamhock.isDirty()).toEqual(true);

		});

		it("is dirty when children's properties change", function(){

			vm.three.alpha("gamma");

			expect(vm.hamhock.isDirty()).toEqual(true);

		});

	});

	describe("the reset function", function(){

		it("the dirty flag is reset when we tell it to", function(){

			vm = {
				one:ko.observable("one"),
				two:ko.observable(2),
				three:{
					alpha:ko.observable("alpha"),
					beta:ko.observable("beta")
				}
			};

			ko.hamhock({root: vm});
			vm.one("two");

			expect(vm.hamhock.isDirty()).toEqual(true);

			vm.hamhock.reset();

			expect(vm.hamhock.isDirty()).toEqual(false);
			
		});


	});

	describe("the isInitiallyDirty parameter flag", function(){

		it("isDirty when told to be initially dirty", function(){

			var newvm = {
				one:ko.observable("one"),
				two:ko.observable(2),
				three:{
					alpha:ko.observable("alpha"),
					beta:ko.observable("beta")
				}
			};

			ko.hamhock({root: newvm, isInitiallyDirty: true});

			expect(newvm.hamhock.isDirty()).toEqual(true);

		});

	});

	describe("the saveMethod callback parameter", function(){

		beforeEach(function(){

			newvm = {
				one:ko.observable("one"),
				two:ko.observable(2),
				three:{
					alpha:ko.observable("alpha"),
					beta:ko.observable("beta")
				}
			};			

		});

		it("does nothing when saveMethod is null", function(){

			ko.hamhock({root: newvm, isInitiallyDirty: true, saveMethod: null});

			newvm.one("two");

			expect(true).toEqual(true);

		});

		it("calls the callback saveMethod when something changes", function(){

			var wasCalled = false;

			ko.hamhock({
				root: newvm, 
				isInitiallyDirty: false, 
				saveMethod: function(){ wasCalled = true; }
			});

			newvm.one("two");

			expect(wasCalled).toEqual(true);

		});

		it("does not call the callback saveMethod when nothing changes", function(){

			var wasCalled = false;

			ko.hamhock({
				root: newvm, 
				isInitiallyDirty: false, 
				saveMethod: function(){ wasCalled = true; }
			});

			expect(wasCalled).toEqual(false);

		});

		it("does not reset the dirty flag if we return false from the saveMethod", function(){

			ko.hamhock({
				root: newvm, 
				isInitiallyDirty: false, 
				saveMethod: function(){ return false; }
			});

			newvm.three.alpha("omega");

			expect(newvm.hamhock.isDirty()).toEqual(true);

		});

		it("does reset the dirty flag if we dont' return false", function(){

			ko.hamhock({
				root: newvm, 
				isInitiallyDirty: false, 
				saveMethod: function(){ var x; x = 10; console.log(x); }
			});

			newvm.three.alpha("omega");

			expect(newvm.hamhock.isDirty()).toEqual(false);
		});

	});
});