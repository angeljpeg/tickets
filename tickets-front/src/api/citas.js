import {queryGet} from './const.js'

export const getAllCitas = async () => {
    try {
        const response = await queryGet('citas')
        return response
    } catch (error) {
        console.log(error)
    }
}