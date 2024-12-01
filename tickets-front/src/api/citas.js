import {queryGet, queryPost} from './const.js'

export const getAllCitas = async () => {
    try {
        const response = await queryGet('citas')
        return response
    } catch (error) {
        console.log(error)
    }
}

export const addCita = async (data) => {
    try {
        const response = await queryPost('citas', data)
        return response
    } catch (error) {
        console.log(error)
    }
}