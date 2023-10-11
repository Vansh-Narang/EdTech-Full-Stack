import React, { useEffect, useState } from 'react'

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
    const [requirments, setRequirement] = useState("")
    const [requirementList, setRequirementList] = useState([])

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList])


    const handleAddRequirement = () => {
        if (requirments) {
            setRequirementList([...requirementList, requirments])
            setRequirement("")
        }
    }
    const handleRemoveRequirement = (index) => {
        //splice method
        const updatedRequiremnetList = [...requirementList];
        updatedRequiremnetList.splice(index, 1)
        setRequirementList(updatedRequiremnetList);
    }
    return (
        <div>
            <label htmlFor={name}>{label}<sup>*</sup></label>
            <div>
                <input
                    type='text'
                    id={name}
                    value={requirments}
                    onChange={(e) => setRequirement(e.target.value)}
                    className='w-full'
                />
                <button type='button' onClick={handleAddRequirement} className='font-semibold text-yellow-50'>
                    Add
                </button>
            </div>

            {requirementList.length > 0 && (
                <ul className="mt-2 list-inside list-disc">
                    {requirementList.map((requirement, index) => (
                        <li key={index} className="flex items-center text-richblack-5">
                            <span>{requirement}</span>
                            <button
                                type="button"
                                className="ml-2 text-xs text-pure-greys-300 "
                                onClick={() => handleRemoveRequirement(index)}
                            >
                                clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    )
}

export default RequirementField
