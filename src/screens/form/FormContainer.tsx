import React, { useCallback, useMemo, useState } from "react"
import Form from "./Form"
import FormViewModel from "./FormViewModel"

const FormContainer = ({ navigation }) => {
    const [propertyValue, setPropertyValue] = useState<string | undefined>(undefined)
    const [borrowAmount, setBorrowAmount] = useState<string | undefined>(undefined)
    const [propertyNumber, setPropertyNumber] = useState<number | undefined>(undefined)
    const [borrowNumber, setBorrowNumber] = useState<number | undefined>(undefined)
    const [propertyError, setPropertyError] = useState<string | undefined>(undefined)
    const [borrowError, setBorrowError] = useState<string | undefined>(undefined)
    const [topError, setTopError] = useState<string | undefined>(undefined)

    const viewModel = useMemo(() => {
        return new FormViewModel()
    }, [])

    const calculate = useCallback(() => {
        const propertyError = viewModel.validatePropertyValue(propertyNumber)
        const borrowError = viewModel.validateBorrowAmount(borrowNumber)
        setPropertyError(propertyError)
        setBorrowError(borrowError)
        if (propertyError || borrowError) {
            return
        }

        if (propertyNumber && borrowNumber) {
            const error = viewModel.validateResult(propertyNumber, borrowNumber)
            setTopError(error)
            if (error) {
                return
            }

            const lvr = viewModel.calculateLVR(propertyNumber, borrowNumber)

            navigation.navigate('Result', { lvr: lvr });
        }

    }, [propertyNumber,
        borrowNumber,
        setPropertyError,
        setBorrowError,
        setTopError])

    return (
        <Form
            propertyValue={propertyValue}
            borrowAmount={borrowAmount}
            setPropertyValue={setPropertyValue}
            setBorrowAmount={setBorrowAmount}
            setPropertyNumber={setPropertyNumber}
            setBorrowNumber={setBorrowNumber}
            topError={topError}
            propertyError={propertyError}
            borrowError={borrowError}
            calculate={calculate} />
    )
}

export default FormContainer;