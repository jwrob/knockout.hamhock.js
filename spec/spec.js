describe("a hamhock", function(){

	beforeEach(function(){

		vm = {
			one:ko.observable("one"),
			two:ko.observable(2),
			three:{
				alpha:ko.observable("alpha"),
				beta:ko.observable("beta")
			}
		};

		ko.hamhock(vm);

	});

	it("is makes things better", function(){

		expect(true).toBeTruthy();

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

	it("the dirty flag is reset when we tell it to", function(){

		vm.one("two");

		expect(vm.hamhock.isDirty()).toEqual(true);

		vm.hamhock.reset();

		expect(vm.hamhock.isDirty()).toEqual(false);
		
	});
});