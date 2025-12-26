export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

export const validatePhone = (phone) => {
    const re = /^[6-9]\d{9}$/
    return re.test(phone)
}

export const validatePincode = (pincode) => {
    const re = /^\d{6}$/
    return re.test(pincode)
}

export const validateOrderData = (data) => {
    const errors = []

    if (!data.customer?.name || data.customer.name.trim().length < 2) {
        errors.push('Customer name is required (minimum 2 characters)')
    }

    if (!data.customer?.email || !validateEmail(data.customer.email)) {
        errors.push('Valid email is required')
    }

    if (!data.customer?.phone || !validatePhone(data.customer.phone)) {
        errors.push('Valid 10-digit phone number is required')
    }

    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
        errors.push('Order must contain at least one item')
    }

    if (data.items) {
        data.items.forEach((item, index) => {
            if (!item.product) {
                errors.push(`Item ${index + 1}: Product ID is required`)
            }
            if (!item.quantity || item.quantity < 1) {
                errors.push(`Item ${index + 1}: Quantity must be at least 1`)
            }
        })
    }

    return errors
}

export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input
    return input.trim().replace(/[<>]/g, '')
}
