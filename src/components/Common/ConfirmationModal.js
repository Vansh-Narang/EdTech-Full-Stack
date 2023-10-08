import React from 'react'
import IconButton from "./IconButton"
function ConfiramtionModal({ modalData }) {
    return (
        <div>
            <div>
                <p>
                    {modalData.text}
                </p>
                <p>
                    {modalData.test2}
                </p>
                <div>
                    <IconButton
                        onclick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}
                    />
                    <button onClick={modalData?.btn2Handler}>
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfiramtionModal