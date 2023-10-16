import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
const NestedView = () => {
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, seteditSubSection] = useState(null)

    const [confirmationModal, setConfirmationModal] = useState(null)


    return (
        <div>
            <div>
                {
                    course?.contentContent?.map((section, index) => (
                        <details key={index} open>
                            <summary>
                                <div>
                                    <RxDropdownMenu />
                                    <p>{section.sectionName}</p>
                                </div>
                            </summary>
                        </details>
                    ))
                }
            </div>
        </div>
    )
}

export default NestedView
