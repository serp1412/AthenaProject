import FormViewModel from "./FormViewModel";

test("validatePropertyValue - when value is undefined - should return error", () => {
    const viewModel = new FormViewModel()
    const result = viewModel.validatePropertyValue(undefined);
    expect(result).toEqual("Required field");
});

test("validatePropertyValue - when below 100.000 - should return error", () => {
    const viewModel = new FormViewModel()
    const result = viewModel.validatePropertyValue(80000);
    expect(result).toEqual("Property value should be bigger than $100,000");
});

test("validatePropertyValue - when above 2.500.000 - should return error", () => {
    const viewModel = new FormViewModel()
    const result = viewModel.validatePropertyValue(2500001);
    expect(result).toEqual("Property value should be smaller than $2,500,000");
});

test("validatePropertyValue - when within acceptable range - should return undefined", () => {
    const viewModel = new FormViewModel()
    const result = viewModel.validatePropertyValue(400000);
    expect(result).toBeUndefined();
});

test("validateBorrowAmount - when value is undefined - should return error", () => {
    const viewModel = new FormViewModel()
    const result = viewModel.validateBorrowAmount(undefined);
    expect(result).toEqual("Required field");
});

test("validateBorrowAmount - when below $80.000 - should return error", () => {
    const viewModel = new FormViewModel()
    const result = viewModel.validateBorrowAmount(40000);
    expect(result).toEqual('Borrow amount should be bigger than $80,000');
});

test("validateBorrowAmount - when above 2.000.000 - should return error", () => {
    const viewModel = new FormViewModel()
    const result = viewModel.validateBorrowAmount(3000000);
    expect(result).toEqual('Borrow amount value should be smaller than $2,000,000');
});

test("validateBorrowAmount - when within acceptable range - should return undefined", () => {
    const viewModel = new FormViewModel()
    const result = viewModel.validateBorrowAmount(1000000);    
    expect(result).toBeUndefined()
});

test("validateResult - when borrow is biggern then loan - should return error", () => {
    const viewModel = new FormViewModel()
    const result = viewModel.validateResult(1000000, 2000000);
    expect(result).toEqual('Borrow amount should be smaller than the property value')
});

test("validateResult - when data is within range - should return undefined", () => {
    const viewModel = new FormViewModel()
    const result = viewModel.validateResult(2000000, 1000000);
    expect(result).toBeUndefined()
});

test("calculateLVR - when data is within range - should return correct LVR", () => {
    const viewModel = new FormViewModel()
    const result = viewModel.calculateLVR(2000000, 1000000);
    expect(result).toEqual(50)
});

