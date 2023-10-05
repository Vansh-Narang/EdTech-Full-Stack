import React from 'react'
import ContactForm from '../../ContactPage/ContactForm'
function ContactFormSection() {
    return (
        <div className='mx-auto'>
            <h1>
                Get in touch
            </h1>
            <p>
                We'd love to here for you . Plase fill out this form
            </p>
            <div>
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactFormSection