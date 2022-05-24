
class FormViewModel {
    validatePropertyValue(propertyValue: number | undefined): string | undefined {
        if (!propertyValue) {
            return 'Required field'
        }

        if (propertyValue < 100000) {
            return 'Property value should be bigger than $100,000'
        }

        if (propertyValue > 2500000) {
            return 'Property value should be smaller than $2,500,000'
        }

        return undefined
    }
    
    validateBorrowAmount(borrowAmount: number | undefined): string | undefined {
        if (!borrowAmount) {
            return 'Required field'
        }

        if (borrowAmount < 80000) {
            return 'Borrow amount should be bigger than $80,000'
        }

        if (borrowAmount > 2000000) {
            return 'Borrow amount value should be smaller than $2,000,000'
        }

        return undefined
    }

    validateResult(propertyValue: number, borrowAmount: number): string | undefined {
        if (borrowAmount > propertyValue) {
            return 'Borrow amount should be smaller than the property value'
        }
    }

    calculateLVR(propertyValue: number, borrowAmount: number): number {
        return (borrowAmount / propertyValue) * 100
    }
}

export default FormViewModel;