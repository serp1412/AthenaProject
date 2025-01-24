import FormViewModel, {
  BorrowError,
  PropertyError,
  TopError,
} from './FormViewModel';

test('validatePropertyValue - when value is undefined - should return error', () => {
  const viewModel = new FormViewModel();
  const result = viewModel.validatePropertyValue(undefined);
  expect(result).toEqual(PropertyError.Required);
});

test('validatePropertyValue - when below 100.000 - should return error', () => {
  const viewModel = new FormViewModel();
  const result = viewModel.validatePropertyValue(80000);
  expect(result).toEqual(PropertyError.BelowMin);
});

test('validatePropertyValue - when above 2.500.000 - should return error', () => {
  const viewModel = new FormViewModel();
  const result = viewModel.validatePropertyValue(2500001);
  expect(result).toEqual(PropertyError.AboveMax);
});

test('validatePropertyValue - when within acceptable range - should return undefined', () => {
  const viewModel = new FormViewModel();
  const result = viewModel.validatePropertyValue(400000);
  expect(result).toBeUndefined();
});

test('validateBorrowAmount - when value is undefined - should return error', () => {
  const viewModel = new FormViewModel();
  const result = viewModel.validateBorrowAmount(undefined);
  expect(result).toEqual(BorrowError.Required);
});

test('validateBorrowAmount - when below $80.000 - should return error', () => {
  const viewModel = new FormViewModel();
  const result = viewModel.validateBorrowAmount(40000);
  expect(result).toEqual(BorrowError.BelowMin);
});

test('validateBorrowAmount - when above 2.000.000 - should return error', () => {
  const viewModel = new FormViewModel();
  const result = viewModel.validateBorrowAmount(3000000);
  expect(result).toEqual(BorrowError.AboveMax);
});

test('validateBorrowAmount - when within acceptable range - should return undefined', () => {
  const viewModel = new FormViewModel();
  const result = viewModel.validateBorrowAmount(1000000);
  expect(result).toBeUndefined();
});

test('validateResult - when borrow is biggern then loan - should return error', () => {
  const viewModel = new FormViewModel();
  const result = viewModel.validateResult(1000000, 2000000);
  expect(result).toEqual(TopError.BorrowTooHigh);
});

test('validateResult - when data is within range - should return undefined', () => {
  const viewModel = new FormViewModel();
  const result = viewModel.validateResult(2000000, 1000000);
  expect(result).toBeUndefined();
});

test('calculateLVR - when data is within range - should return correct LVR', () => {
  const viewModel = new FormViewModel();
  const result = viewModel.calculateLVR(2000000, 1000000);
  expect(result).toEqual(50);
});
