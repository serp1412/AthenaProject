
export enum PropertyError {
    Required = 'Required field',
    BelowMin = 'Property value should be bigger than $100,000',
    AboveMax = 'Property value should be smaller than $2,500,000'
}

export enum BorrowError {
    Required = 'Required field',
    BelowMin = 'Property value should be bigger than $80,000',
    AboveMax = 'Property value should be smaller than $2,000,000'
}

export enum TopError {
    BorrowTooHigh = 'Borrow amount should be smaller than the property value'
}

class FormViewModel {
    validatePropertyValue(propertyValue: number | undefined): PropertyError | undefined {
        if (!propertyValue) {
            return PropertyError.Required
        }

        if (propertyValue < 100000) {
            return PropertyError.BelowMin
        }

        if (propertyValue > 2500000) {
            return PropertyError.AboveMax
        }

        return undefined
    }
    
    validateBorrowAmount(borrowAmount: number | undefined): BorrowError | undefined {
        if (!borrowAmount) {
            return BorrowError.Required
        }

        if (borrowAmount < 80000) {
            return BorrowError.BelowMin
        }

        if (borrowAmount > 2000000) {
            return BorrowError.AboveMax
        }

        return undefined
    }

    validateResult(propertyValue: number, borrowAmount: number): TopError | undefined {
        if (borrowAmount > propertyValue) {
            return TopError.BorrowTooHigh
        }
    }

    calculateLVR(propertyValue: number, borrowAmount: number): number {
        return (borrowAmount / propertyValue) * 100
    }
}

export default FormViewModel;